import { supabase } from '../lib/supabase';

export interface Task {
  id?: string;
  project_id?: string | null;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'waiting' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  due_date?: string;
  tags?: string[];
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_at?: string;
  task_assignees?: {
    profiles: {
      id: string;
      first_name: string;
      last_name: string;
    };
  }[];
  projects?: {
    name: string;
  } | null;
}

export interface ChecklistItem {
  id?: string;
  task_id: string;
  item_text: string;
  is_completed: boolean;
  created_at?: string;
}

export interface TaskComment {
  id?: string;
  task_id: string;
  author_id: string;
  comment: string;
  created_at?: string;
  profiles?: {
    first_name: string;
    last_name: string;
  };
}

export interface TaskAttachment {
  id?: string;
  task_id: string;
  uploader_id: string;
  file_name: string;
  file_url: string;
  created_at?: string;
}

export interface TimeLog {
  id?: string;
  staff_id: string;
  task_id?: string | null;
  duration_minutes: number;
  log_date: string;
  description?: string;
  created_at?: string;
  tasks?: {
    title: string;
  };
}

export interface LeaveRequest {
  id?: string;
  staff_id: string;
  start_date: string;
  end_date: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  created_at?: string;
}

export interface Attendance {
  id?: string;
  staff_id: string;
  date: string;
  check_in?: string;
  check_out?: string;
}

export const tasksService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, task_assignees(profiles(id, first_name, last_name)), projects(name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as any || [];
  },

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'task_assignees' | 'projects'>, assigneeIds: string[]): Promise<Task> {
    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    
    if (taskError) throw taskError;

    if (assigneeIds.length > 0) {
      const assigneeRows = assigneeIds.map(staffId => ({
        task_id: taskData.id,
        staff_id: staffId
      }));
      const { error: assignError } = await supabase
        .from('task_assignees')
        .insert(assigneeRows);
      
      if (assignError) throw assignError;
    }

    return taskData;
  },

  async updateTask(id: string, task: Partial<Task>, assigneeIds?: string[]): Promise<Task> {
    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', id)
      .select()
      .single();
    
    if (taskError) throw taskError;

    if (assigneeIds !== undefined) {
      // Clear current assignees
      const { error: clearError } = await supabase
        .from('task_assignees')
        .delete()
        .eq('task_id', id);
      
      if (clearError) throw clearError;

      // Add new ones
      if (assigneeIds.length > 0) {
        const assigneeRows = assigneeIds.map(staffId => ({
          task_id: id,
          staff_id: staffId
        }));
        const { error: assignError } = await supabase
          .from('task_assignees')
          .insert(assigneeRows);
        
        if (assignError) throw assignError;
      }
    }

    return taskData;
  },

  async softDeleteTask(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async getChecklist(taskId: string): Promise<ChecklistItem[]> {
    const { data, error } = await supabase
      .from('task_checklists')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async addChecklistItem(item: Omit<ChecklistItem, 'id' | 'created_at'>): Promise<ChecklistItem> {
    const { data, error } = await supabase
      .from('task_checklists')
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateChecklistItem(id: string, item: Partial<ChecklistItem>): Promise<ChecklistItem> {
    const { data, error } = await supabase
      .from('task_checklists')
      .update(item)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteChecklistItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('task_checklists')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getComments(taskId: string): Promise<TaskComment[]> {
    const { data, error } = await supabase
      .from('task_comments')
      .select('*, profiles(first_name, last_name)')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as any || [];
  },

  async addComment(comment: Omit<TaskComment, 'id' | 'created_at' | 'profiles'>): Promise<TaskComment> {
    const { data, error } = await supabase
      .from('task_comments')
      .insert(comment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAttachments(taskId: string): Promise<TaskAttachment[]> {
    const { data, error } = await supabase
      .from('task_attachments')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async addAttachment(attachment: Omit<TaskAttachment, 'id' | 'created_at'>): Promise<TaskAttachment> {
    const { data, error } = await supabase
      .from('task_attachments')
      .insert(attachment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTimeLogs(staffId?: string): Promise<TimeLog[]> {
    let query = supabase.from('time_logs').select('*, tasks(title)');
    if (staffId) {
      query = query.eq('staff_id', staffId);
    }
    const { data, error } = await query.order('log_date', { ascending: false });
    
    if (error) throw error;
    return data as any || [];
  },

  async addTimeLog(log: Omit<TimeLog, 'id' | 'created_at' | 'tasks'>): Promise<TimeLog> {
    const { data, error } = await supabase
      .from('time_logs')
      .insert(log)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLeaveRequests(staffId?: string): Promise<LeaveRequest[]> {
    let query = supabase.from('leave_requests').select('*');
    if (staffId) {
      query = query.eq('staff_id', staffId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async addLeaveRequest(req: Omit<LeaveRequest, 'id' | 'created_at'>): Promise<LeaveRequest> {
    const { data, error } = await supabase
      .from('leave_requests')
      .insert(req)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateLeaveRequest(id: string, status: 'approved' | 'rejected'): Promise<LeaveRequest> {
    const { data, error } = await supabase
      .from('leave_requests')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAttendance(staffId: string, dateStr: string): Promise<Attendance | null> {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('staff_id', staffId)
      .eq('date', dateStr)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async checkIn(staffId: string): Promise<Attendance> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('attendance')
      .upsert({
        staff_id: staffId,
        date: today,
        check_in: new Date().toISOString()
      }, { onConflict: 'staff_id,date' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async checkOut(staffId: string): Promise<Attendance> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('attendance')
      .update({
        check_out: new Date().toISOString()
      })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
