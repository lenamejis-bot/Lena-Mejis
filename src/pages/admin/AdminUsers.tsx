import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAppStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { Users, Shield, Crown, User, Check } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { user, setUserRole, showToast } = useAppStore();

  const [mockUserList, setMockUserList] = useState([
    { id: 'usr-101', name: 'Jordan Miller', email: 'jordan.miller@example.com', role: user.role, joined: '2026-09-12' },
    { id: 'usr-102', name: 'Emily Chen', email: 'emily.chen@example.com', role: 'premium', joined: '2026-08-20' },
    { id: 'usr-103', name: 'David Rodriguez', email: 'david.r@example.com', role: 'free', joined: '2026-10-01' },
    { id: 'usr-104', name: 'Sarah Jenkins, RD', email: 'sarah.j@nutriwise.com', role: 'dietitian', joined: '2026-07-15' },
    { id: 'usr-105', name: 'Alex Thompson (Lead)', email: 'alex.admin@nutriwise.com', role: 'admin', joined: '2026-06-01' }
  ]);

  const handleRoleChange = (id: string, newRole: UserRole) => {
    setMockUserList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    if (id === user.id) {
      setUserRole(newRole);
    }
    showToast(`Updated user role to ${newRole.toUpperCase()}`, 'success');
  };

  return (
    <AdminLayout title="User Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              User Accounts & Role Permissions
            </h1>
            <p className="text-xs text-[#4A6741]">
              Manage registered users, grant premium memberships, and assign dietitian or admin access.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E8EFE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7] border-b border-[#E8EFE6] text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4">Date Joined</th>
                  <th className="py-3 px-4 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4EF]">
                {mockUserList.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#1A2E1A]">{u.name}</td>
                    <td className="py-3.5 px-4 text-[#4A6741] font-mono">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'premium'
                          ? 'bg-amber-100 text-amber-900'
                          : u.role === 'dietitian'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">{u.joined}</td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        className="h-8 px-2.5 rounded-[8px] bg-white border border-[#D4E4D0] text-xs font-semibold cursor-pointer"
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="dietitian">Dietitian</option>
                        <option value="admin">Super Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
