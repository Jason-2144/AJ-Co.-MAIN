import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Trash2, 
  UserPlus, 
  Shield, 
  UserCheck, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { usersService } from '../../services/users';
import { UserProfile } from '../../services/auth';

export default function Team() {
  const { profile, hasPermission } = useAuth();
  const [team, setTeam] = useState<UserProfile[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Invite states (stubs for frontend invitations flow)
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');
  const [inviteRoleId, setInviteRoleId] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    loadTeamData();
  }, []);

  async function loadTeamData() {
    try {
      setLoading(true);
      const [profiles, roleList] = await Promise.all([
        usersService.getStaffProfiles(),
        usersService.getRoles()
      ]);
      setTeam(profiles);
      setRoles(roleList);
      if (roleList.length > 0) {
        setInviteRoleId(roleList[0].id);
      }
    } catch (err) {
      console.error('Error loading Team list:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleInviteStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Future: connect to Supabase invitation flow
      // We will write an audit log
      await usersService.writeAuditLog({
        user_id: profile?.id || null,
        action: `sent registration invite to staff "${inviteEmail}"`,
        module: 'Team'
      });

      setInviteSent(true);
      setTimeout(() => {
        setShowInviteModal(false);
        setInviteSent(false);
        setInviteEmail('');
        setInviteFirstName('');
        setInviteLastName('');
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchiveStaff = async (id: string, name: string) => {
    if (!profile?.id) return;
    if (id === profile.id) {
      alert("You cannot archive your own active account!");
      return;
    }
    if (!window.confirm(`Are you sure you want to archive staff profile: ${name}?`)) return;

    try {
      await usersService.softDeleteStaff(id, profile.id);

      // Write log
      await usersService.writeAuditLog({
        user_id: profile.id,
        action: `archived staff profile "${name}"`,
        module: 'Team'
      });

      setTeam(team.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateRole = async (staffId: string, roleId: string) => {
    try {
      const updated = await usersService.updateStaffProfile(staffId, { role_id: roleId });
      loadTeamData(); // Reload to refresh nesting relationship
      
      // Write log
      await usersService.writeAuditLog({
        user_id: profile?.id || null,
        action: `updated staff role assignment`,
        module: 'Team',
        new_value: updated
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasPermission('manage:staff')) {
    return (
      <div className="text-center py-20 text-gray-500 text-sm bg-[#121212] border border-white/5 rounded-2xl">
        <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
        <span>Access Denied: You do not have permissions to manage staff accounts.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-syne font-bold text-2xl text-white">Staff Management Directory</h2>
          <p className="text-gray-500 text-sm mt-1">Configure staff account levels, roles, and view workloads.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm"
        >
          <UserPlus className="w-4 h-4" /> Invite Staff
        </button>
      </div>

      <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-xs">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Assigned Role</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {team.map((staff) => (
                <tr key={staff.id} className="hover:bg-white/[0.01]">
                  <td className="py-4 font-semibold text-white">
                    {staff.first_name} {staff.last_name}
                  </td>
                  <td className="py-4 text-gray-300">{staff.email}</td>
                  <td className="py-4 font-mono text-xs uppercase">
                    <span className={`px-2 py-0.5 rounded-full ${
                      staff.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <select
                      value={staff.role_id || ''}
                      onChange={(e) => handleUpdateRole(staff.id, e.target.value)}
                      disabled={staff.roles?.name === 'owner' && profile?.roles?.name !== 'owner'}
                      className="bg-[#1A1A1A] border border-white/5 text-xs text-white rounded-lg py-1.5 px-2 focus:outline-none"
                    >
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>{r.name.charAt(0).toUpperCase() + r.name.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 text-right">
                    {staff.roles?.name !== 'owner' && (
                      <button
                        onClick={() => handleArchiveStaff(staff.id, `${staff.first_name} ${staff.last_name}`)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl w-full max-w-md shadow-2xl relative space-y-6">
            <h3 className="font-syne font-bold text-xl text-white">Invite Team Member</h3>

            {inviteSent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm">
                Staff registration invitation sent successfully!
              </div>
            ) : (
              <form onSubmit={handleInviteStaff} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={inviteFirstName}
                      onChange={(e) => setInviteFirstName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={inviteLastName}
                      onChange={(e) => setInviteLastName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none"
                    placeholder="name@ajandco.site"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Role Level</label>
                  <select
                    value={inviteRoleId}
                    onChange={(e) => setInviteRoleId(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.name.charAt(0).toUpperCase() + r.name.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="border border-white/5 hover:bg-white/[0.02] text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
