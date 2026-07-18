import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Building2, 
  Settings as SettingsIcon, 
  Sliders, 
  History, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { usersService, CompanySettings, FeatureFlag, AuditLog } from '../../services/users';

export default function Settings() {
  const { profile, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'company' | 'flags' | 'logs'>('company');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Company settings states
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [invoicePrefix, setInvoicePrefix] = useState('INV-');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState(0);
  const [timezone, setTimezone] = useState('UTC');

  // Feature Flags & Audit Logs states
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    loadSettingsData();
  }, []);

  async function loadSettingsData() {
    try {
      setLoading(true);
      const [settings, flagList, logList] = await Promise.all([
        usersService.getCompanySettings(),
        usersService.getFeatureFlags(),
        usersService.getAuditLogs()
      ]);

      if (settings) {
        setCompanyName(settings.company_name);
        setLogoUrl(settings.logo_url || '');
        setGstNumber(settings.gst_number || '');
        setAddress(settings.address || '');
        setPhone(settings.phone || '');
        setEmail(settings.email || '');
        setWebsite(settings.website || '');
        setInvoicePrefix(settings.invoice_prefix);
        setCurrency(settings.currency);
        setTaxRate(Number(settings.tax_rate) || 0);
        setTimezone(settings.timezone);
      }

      setFlags(flagList);
      setLogs(logList);
    } catch (err) {
      console.error('Error loading Settings metadata:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveCompanySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await usersService.updateCompanySettings({
        company_name: companyName,
        logo_url: logoUrl || undefined,
        gst_number: gstNumber || undefined,
        address: address || undefined,
        phone: phone || undefined,
        email: email || undefined,
        website: website || undefined,
        invoice_prefix: invoicePrefix,
        currency,
        tax_rate: taxRate,
        timezone
      });

      // Write log
      await usersService.writeAuditLog({
        user_id: profile?.id || null,
        action: `updated global company branding settings`,
        module: 'Settings',
        new_value: updated
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFlag = async (flag: FeatureFlag) => {
    try {
      const nextVal = !flag.is_enabled;
      const updated = await usersService.updateFeatureFlag(flag.id!, nextVal);
      setFlags(flags.map(f => f.id === flag.id ? updated : f));

      // Write log
      await usersService.writeAuditLog({
        user_id: profile?.id || null,
        action: `toggled feature flag "${flag.name}" to ${nextVal}`,
        module: 'Settings',
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

  if (!hasPermission('manage:settings')) {
    return (
      <div className="text-center py-20 text-gray-500 text-sm bg-[#121212] border border-white/5 rounded-2xl">
        <SettingsIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
        <span>Access Denied: You do not have permissions to edit system settings.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-syne font-bold text-2xl text-white">System Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage company metadata, configure modules, and view system audits.</p>
      </div>

      {/* Subtabs switches */}
      <div className="flex border-b border-white/5 pb-2 gap-4 text-sm font-medium">
        <button
          onClick={() => setActiveSubTab('company')}
          className={`pb-2 focus:outline-none transition-colors ${activeSubTab === 'company' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
        >
          Company Information
        </button>
        <button
          onClick={() => setActiveSubTab('flags')}
          className={`pb-2 focus:outline-none transition-colors ${activeSubTab === 'flags' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
        >
          Feature Flags
        </button>
        {hasPermission('view:reports') && (
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`pb-2 focus:outline-none transition-colors ${activeSubTab === 'logs' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
          >
            System Audit Logs
          </button>
        )}
      </div>

      {/* Active panel rendering */}
      {activeSubTab === 'company' && (
        <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl max-w-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-syne font-bold text-lg text-white">Company Branding & Defaults</h3>
          </div>

          {saveSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm flex items-center gap-2">
              <Check className="w-4 h-4" /> Company settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSaveCompanySettings} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">GST / Tax Number</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  placeholder="GSTINXXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Company Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                placeholder="Branded invoices address"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Invoice Prefix</label>
                <input
                  type="text"
                  required
                  value={invoicePrefix}
                  onChange={(e) => setInvoicePrefix(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Currency</label>
                <input
                  type="text"
                  required
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">GST Rate (%)</label>
                <input
                  type="number"
                  required
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors mt-4"
            >
              Update Settings
            </button>
          </form>
        </div>
      )}

      {activeSubTab === 'flags' && (
        <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl max-w-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="font-syne font-bold text-lg text-white">Feature Flag Controls</h3>
          </div>

          <div className="divide-y divide-white/5">
            {flags.map(flag => (
              <div key={flag.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{flag.name}</p>
                  <span className="text-xs text-gray-500">{flag.description}</span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flag.is_enabled}
                    onChange={() => handleToggleFlag(flag)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-800 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-black" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'logs' && hasPermission('view:reports') && (
        <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <History className="w-5 h-5 text-emerald-400" />
            <h3 className="font-syne font-bold text-lg text-white">Security & Operation Audit Logs</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-xs">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Module</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="text-gray-300">
                    <td className="py-4 font-mono text-xs">
                      {new Date(log.created_at || '').toLocaleString()}
                    </td>
                    <td className="py-4 font-semibold text-white">
                      {log.profiles ? `${log.profiles.first_name} ${log.profiles.last_name}` : 'System'}
                    </td>
                    <td className="py-4 font-mono text-xs uppercase tracking-wider">{log.module}</td>
                    <td className="py-4 leading-relaxed">{log.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
