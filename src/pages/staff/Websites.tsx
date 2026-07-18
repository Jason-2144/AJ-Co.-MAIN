import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Calendar,
  Globe,
  ExternalLink,
  Shield,
  Server,
  Code
} from 'lucide-react';
import { websitesService, ClientWebsite } from '../../services/websites';
import { clientsService, Client } from '../../services/clients';
import { usersService } from '../../services/users';

export default function Websites() {
  const { profile } = useAuth();
  const [websites, setWebsites] = useState<ClientWebsite[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showAddWebsite, setShowAddWebsite] = useState(false);

  // Form states - Website
  const [clientId, setClientId] = useState('');
  const [domain, setDomain] = useState('');
  const [registrar, setRegistrar] = useState('');
  const [hosting, setHosting] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [sslExpiry, setSslExpiry] = useState('');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  useEffect(() => {
    loadWebsitesData();
  }, []);

  async function loadWebsitesData() {
    try {
      setLoading(true);
      const [wList, cList] = await Promise.all([
        websitesService.getWebsites(),
        clientsService.getClients()
      ]);
      setWebsites(wList);
      setClients(cList);
    } catch (err) {
      console.error('Error loading Websites list:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    try {
      const newWeb = await websitesService.createWebsite({
        client_id: clientId,
        domain,
        registrar,
        hosting_provider: hosting,
        dns_status: 'active',
        ssl_expiry: sslExpiry || undefined,
        repository_link: repoLink,
        deployment_platform: platform,
        maintenance_notes: maintenanceNotes
      });

      // Write log
      await usersService.writeAuditLog({
        user_id: profile?.id || null,
        action: `registered client website domain "${domain}"`,
        module: 'Websites',
        new_value: newWeb
      });

      setShowAddWebsite(false);
      resetWebsiteForm();
      loadWebsitesData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteWebsite = async (id: string, domainName: string) => {
    if (!profile?.id || !window.confirm(`Are you sure you want to delete website ${domainName}?`)) return;
    try {
      await websitesService.softDeleteWebsite(id, profile.id);
      
      // Write log
      await usersService.writeAuditLog({
        user_id: profile.id,
        action: `archived website profile "${domainName}"`,
        module: 'Websites'
      });

      setWebsites(websites.filter(w => w.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const resetWebsiteForm = () => {
    setClientId('');
    setDomain('');
    setRegistrar('');
    setHosting('');
    setRepoLink('');
    setPlatform('');
    setSslExpiry('');
    setMaintenanceNotes('');
  };

  const filteredWebsites = websites.filter(w => 
    w.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (w.clients?.company_name && w.clients.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-syne font-bold text-2xl text-white">Website Fleet Manager</h2>
          <p className="text-gray-500 text-sm mt-1">Track DNS mappings, SSL expiries, and server host configurations.</p>
        </div>
        <button
          onClick={() => setShowAddWebsite(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Website
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121212] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none"
          placeholder="Search domain or client..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebsites.map(site => (
          <div key={site.id} className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-4 relative group">
            <button
              onClick={() => handleDeleteWebsite(site.id!, site.domain)}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/5 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                {site.clients?.company_name}
              </span>
              <a 
                href={`https://${site.domain}`} 
                target="_blank" 
                rel="noreferrer" 
                className="font-syne font-bold text-lg text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                {site.domain} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate" title={site.registrar}>Registrar: {site.registrar || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Server className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate" title={site.hosting_provider}>Host: {site.hosting_provider || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Code className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate" title={site.deployment_platform}>Deploy: {site.deployment_platform || 'N/A'}</span>
              </div>
              {site.ssl_expiry && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>SSL Exp: {new Date(site.ssl_expiry).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {site.repository_link && (
              <a 
                href={site.repository_link} 
                target="_blank" 
                rel="noreferrer" 
                className="block text-center bg-[#1A1A1A] hover:bg-white/[0.03] border border-white/5 text-gray-300 py-2 rounded-xl text-xs font-semibold transition-colors mt-2"
              >
                Open Code Repository
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Add Website Modal */}
      {showAddWebsite && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative space-y-6">
            <h3 className="font-syne font-bold text-xl text-white">Add Website to Fleet</h3>
            
            <form onSubmit={handleCreateWebsite} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Corporate Client</label>
                  <select
                    required
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  >
                    <option value="">Select client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.company_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Domain URL</label>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                    placeholder="example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Domain Registrar</label>
                  <input
                    type="text"
                    value={registrar}
                    onChange={(e) => setRegistrar(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                    placeholder="Namecheap"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Hosting Provider</label>
                  <input
                    type="text"
                    value={hosting}
                    onChange={(e) => setHosting(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                    placeholder="Vercel / AWS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Repository Link</label>
                  <input
                    type="url"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">SSL Expiry</label>
                  <input
                    type="date"
                    value={sslExpiry}
                    onChange={(e) => setSslExpiry(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Deployment Platform</label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  placeholder="Vercel production edge"
                />
              </div>

              <div className="flex gap-3 justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddWebsite(false)}
                  className="border border-white/5 hover:bg-white/[0.02] text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Save Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
