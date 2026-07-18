import { supabase } from '../lib/supabase';

export interface Project {
  id?: string;
  client_id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  budget: number;
  start_date?: string;
  due_date?: string;
  progress_percent: number;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_at?: string;
  clients?: {
    company_name: string;
  };
}

export interface Milestone {
  id?: string;
  project_id: string;
  name: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'completed';
}

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*, clients(company_name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as any || [];
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async softDeleteProject(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async getMilestones(projectId: string): Promise<Milestone[]> {
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('project_id', projectId)
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createMilestone(milestone: Omit<Milestone, 'id'>): Promise<Milestone> {
    const { data, error } = await supabase
      .from('milestones')
      .insert(milestone)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMilestone(id: string, milestone: Partial<Milestone>): Promise<Milestone> {
    const { data, error } = await supabase
      .from('milestones')
      .update(milestone)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMilestone(id: string): Promise<void> {
    const { error } = await supabase
      .from('milestones')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
