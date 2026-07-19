import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  Play, 
  FileText, 
  Mail, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Sliders,
  Send,
  Eye,
  Copy,
  RotateCw,
  Edit2,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { outreachService, OutreachCampaign, OutreachCompany } from '../../services/outreach';
import { usersService, CompanySettings } from '../../services/users';

export default function AIOutreach() {
  const { profile } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'research' | 'campaigns' | 'sent' | 'analytics' | 'settings'>('dashboard');
  const [loading, setLoading] = useState(true);

  // Database lists
  const [campaigns, setCampaigns] = useState<OutreachCampaign[]>([]);
  const [companies, setCompanies] = useState<OutreachCompany[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);

  // Forms - Campaign
  const [campaignName, setCampaignName] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  // Forms - Settings
  const [aiBaseUrl, setAiBaseUrl] = useState('http://localhost:1234/v1');
  const [aiModelName, setAiModelName] = useState('local-model');
  const [aiApiKey, setAiApiKey] = useState('');
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Forms - Single Research
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetWebsite, setTargetWebsite] = useState('');
  const [targetContact, setTargetContact] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [targetLinkedin, setTargetLinkedin] = useState('');

  // Pipeline Execution State
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineStatus, setPipelineStatus] = useState('');
  
  // Pipeline Results Review State
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [reviewCompany, setReviewCompany] = useState<OutreachCompany | null>(null);
  const [reviewResearch, setReviewResearch] = useState<any>(null);
  const [reviewReport, setReviewReport] = useState<any>(null);
  const [reviewEmail, setReviewEmail] = useState<any>(null);
  const [emailTone, setEmailTone] = useState('professional');
  const [emailToneLoading, setEmailToneLoading] = useState(false);

  // General state toggles
  const [emailProvider, setEmailProvider] = useState('smtp');
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    loadOutreachData();
  }, []);

  async function loadOutreachData() {
    try {
      setLoading(true);
      const [cList, compList, settings] = await Promise.all([
        outreachService.getCampaigns(),
        outreachService.getCompanies(),
        usersService.getCompanySettings()
      ]);
      setCampaigns(cList);
      setCompanies(compList);
      setCompanySettings(settings);

      if (cList.length > 0) {
        setSelectedCampaignId(cList[0].id || '');
      }
      if (settings) {
        setAiBaseUrl(settings.ai_base_url || 'http://localhost:1234/v1');
        setAiModelName(settings.ai_model_name || 'local-model');
        setAiApiKey(settings.ai_api_key || '');
      }
    } catch (err) {
      console.error('Error loading outreach datasets:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    try {
      const newCamp = await outreachService.createCampaign({
        name: campaignName,
        description: campaignDesc,
        status: 'active',
        created_by: profile.id
      });
      setCampaigns([newCamp, ...campaigns]);
      setSelectedCampaignId(newCamp.id || '');
      setShowAddCampaign(false);
      setCampaignName('');
      setCampaignDesc('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await usersService.updateCompanySettings({
        ai_base_url: aiBaseUrl,
        ai_model_name: aiModelName,
        ai_api_key: aiApiKey
      });
      setSaveSettingsSuccess(true);
      setTimeout(() => setSaveSettingsSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId || !profile?.id) return;

    setPipelineRunning(true);
    setPipelineProgress(5);
    setPipelineStatus('Initializing pipeline parameters...');
    setShowReviewScreen(false);

    try {
      // 1. Add targeted company record
      const newCompany = await outreachService.addCompany({
        campaign_id: selectedCampaignId,
        company_name: targetCompany,
        website_url: targetWebsite,
        contact_name: targetContact,
        contact_email: targetEmail,
        linkedin_url: targetLinkedin,
        created_by: profile.id
      });

      // 2. Start execution pipeline
      const results = await outreachService.startOutreachPipeline(
        newCompany,
        emailTone,
        profile.id,
        (statusText, progress) => {
          setPipelineStatus(statusText);
          setPipelineProgress(progress);
        }
      );

      // Populate review state
      setReviewCompany({ ...newCompany, id: newCompany.id });
      setReviewResearch(results.research);
      setReviewReport(results.report.report_data);
      setReviewEmail(results.email);
      setShowReviewScreen(true);
      resetResearchForm();
      loadOutreachData(); // Refresh main lists

    } catch (err: any) {
      console.error(err);
      alert(`Pipeline failed: ${err.message || 'Verification failed. Make sure your local LLM server is running.'}`);
    } finally {
      setPipelineRunning(false);
    }
  };

  const handleRegenerateEmail = async () => {
    if (!reviewCompany?.id || !reviewReport || !profile?.id) return;
    try {
      setEmailToneLoading(true);
      // Generate email using modified tone from local provider
      const response = await fetch(`${aiBaseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(aiApiKey ? { 'Authorization': `Bearer ${aiApiKey}` } : {})
        },
        body: JSON.stringify({
          model: aiModelName,
          messages: [
            {
              role: 'system',
              content: `You are a professional sales writer. Draft an email copy in a ${emailTone} tone. Output a JSON object only: {"subject": "...", "body": "..."}`
            },
            {
              role: 'user',
              content: `Company details: ${JSON.stringify(reviewReport)}`
            }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error('Failed to generate from local LLM.');
      const res = await response.json();
      const text = res.choices?.[0]?.message?.content;
      
      let cleanJson = text;
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      }
      const data = JSON.parse(cleanJson);

      // Save new generated email in database
      const { data: newEmailRecord } = await supabase
        .from('generated_emails')
        .insert({
          company_id: reviewCompany.id,
          subject: data.subject,
          body_text: data.body,
          tone: emailTone,
          status: 'draft',
          created_by: profile.id
        })
        .select()
        .single();

      setReviewEmail(newEmailRecord);
    } catch (err) {
      console.error(err);
      alert('Error regenerating email copy.');
    } finally {
      setEmailToneLoading(false);
    }
  };

  const handleSendOutreach = async () => {
    if (!reviewEmail || !reviewCompany) return;
    try {
      setLoading(true);
      await outreachService.sendOutreachEmail(
        reviewEmail.id,
        reviewCompany.id!,
        companySettings?.email || 'team@ajandco.site',
        reviewCompany.contact_email,
        reviewEmail.subject,
        reviewEmail.body_text,
        emailProvider
      );
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setShowReviewScreen(false);
        setReviewCompany(null);
      }, 3000);
      loadOutreachData();
    } catch (err) {
      console.error(err);
      alert('Error sending email.');
    } finally {
      setLoading(false);
    }
  };

  const resetResearchForm = () => {
    setTargetCompany('');
    setTargetWebsite('');
    setTargetContact('');
    setTargetEmail('');
    setTargetLinkedin('');
  };

  if (loading && campaigns.length === 0) {
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
          <h2 className="font-syne font-bold text-2xl text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" /> AI Outreach campaigns
          </h2>
          <p className="text-gray-500 text-sm mt-1">Orchestrate scrapers & generate personalized local LLM email pitches.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCampaign(true)}
            className="border border-white/5 hover:bg-white/[0.02] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Create Campaign
          </button>
          <button
            onClick={() => setActiveSubTab('research')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm"
          >
            <Play className="w-4 h-4" /> Start Outreach
          </button>
        </div>
      </div>

      {/* Subnavigation Tabs */}
      <div className="flex border-b border-white/5 pb-2 gap-4 text-sm font-medium">
        {['dashboard', 'research', 'campaigns', 'sent', 'analytics', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveSubTab(tab as any); setShowReviewScreen(false); }}
            className={`pb-2 focus:outline-none transition-colors capitalize ${activeSubTab === tab ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABS CONTAINER */}
      <div className="space-y-6">

        {/* Tab 1: Dashboard */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Researched Targets</span>
                <p className="text-3xl font-syne font-bold text-white mt-2">
                  {companies.filter(c => c.status !== 'pending').length}
                </p>
              </div>
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Active Campaigns</span>
                <p className="text-3xl font-syne font-bold text-white mt-2">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Drafted Pitches</span>
                <p className="text-3xl font-syne font-bold text-white mt-2">
                  {companies.filter(c => c.status === 'drafted').length}
                </p>
              </div>
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">Emails Sent</span>
                <p className="text-3xl font-syne font-bold text-emerald-400 mt-2">
                  {companies.filter(c => c.status === 'sent').length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl lg:col-span-2 space-y-4">
                <h3 className="font-syne font-bold text-lg text-white">Outreach Target Status Queue</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-xs">
                        <th className="pb-3">Company</th>
                        <th className="pb-3">Contact</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {companies.slice(0, 5).map(c => (
                        <tr key={c.id} className="hover:bg-white/[0.01]">
                          <td className="py-3 font-semibold text-white">{c.company_name}</td>
                          <td className="py-3 text-gray-400">{c.contact_email}</td>
                          <td className="py-3 font-mono text-xs uppercase">
                            <span className={`px-2 py-0.5 rounded-full ${
                              c.status === 'sent' ? 'bg-emerald-500/10 text-emerald-400' :
                              c.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                              'bg-gray-500/10 text-gray-400'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-gray-500">
                            {new Date(c.updated_at || c.created_at || '').toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System alerts */}
              <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-syne font-bold text-lg text-white">Local LLM Status</h3>
                <div className="p-4 bg-[#1A1A1A] rounded-xl border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Host Base Port:</span>
                    <span className="font-mono text-white">{aiBaseUrl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Model:</span>
                    <span className="font-mono text-white">{aiModelName}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex items-center gap-2 text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Configured / Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Research & Generation Flow */}
        {activeSubTab === 'research' && (
          <div className="space-y-6">
            {!showReviewScreen && (
              <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl max-w-xl mx-auto space-y-6">
                <div>
                  <h3 className="font-syne font-bold text-xl text-white">Target Research Parameters</h3>
                  <p className="text-gray-500 text-sm mt-1">Input details to trigger the automated scraping & LLM draft workflow.</p>
                </div>

                <form onSubmit={handleRunPipeline} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Campaign Container</label>
                    <select
                      value={selectedCampaignId}
                      onChange={(e) => setSelectedCampaignId(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                    >
                      {campaigns.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Company Name</label>
                      <input
                        type="text"
                        required
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                        placeholder="Company Ltd"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Website URL</label>
                      <input
                        type="url"
                        required
                        value={targetWebsite}
                        onChange={(e) => setTargetWebsite(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Contact Name (Optional)</label>
                      <input
                        type="text"
                        value={targetContact}
                        onChange={(e) => setTargetContact(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={targetEmail}
                        onChange={(e) => setTargetEmail(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">LinkedIn URL (Optional)</label>
                    <input
                      type="url"
                      value={targetLinkedin}
                      onChange={(e) => setTargetLinkedin(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pipelineRunning}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-black font-semibold py-3.5 rounded-xl transition-all mt-4 flex items-center justify-center gap-2"
                  >
                    {pipelineRunning ? 'Executing Research Pipeline...' : 'Run Pipeline'}
                  </button>
                </form>

                {pipelineRunning && (
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between text-xs text-gray-400 font-mono">
                      <span>{pipelineStatus}</span>
                      <span>{pipelineProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pipelineProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Human Review & Sending Form */}
            {showReviewScreen && reviewReport && reviewEmail && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                {/* Generated AI structured Report */}
                <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="font-syne font-bold text-lg text-white">AI Structured Opportunities Report</h3>
                    <p className="text-gray-500 text-xs mt-1">Prospect profile details calculated by Local LLM model.</p>
                  </div>

                  <div className="space-y-4 text-sm text-gray-300">
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                      <span className="block text-xs font-mono text-gray-500 uppercase mb-1">Company Description</span>
                      <p className="leading-relaxed">{reviewReport.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                        <span className="block text-xs font-mono text-gray-500 uppercase mb-1">Industry Focus</span>
                        <p>{reviewReport.industry}</p>
                      </div>
                      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                        <span className="block text-xs font-mono text-gray-500 uppercase mb-1">Confidence Score</span>
                        <p className="text-emerald-400 font-semibold">{reviewReport.confidence_score}%</p>
                      </div>
                    </div>

                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="block text-xs font-mono text-gray-500 uppercase mb-1">AI Opportunities Identified</span>
                      <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        {reviewReport.opportunities?.map((o: string, idx: number) => (
                          <li key={idx}>{o}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="block text-xs font-mono text-gray-500 uppercase mb-1">Business Pain Points</span>
                      <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        {reviewReport.pain_points?.map((p: string, idx: number) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Generated outreach draft email */}
                <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-6">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <h3 className="font-syne font-bold text-lg text-white">Outreach Email Draft</h3>
                      <p className="text-gray-500 text-xs mt-1">Review & customize before sending.</p>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(reviewEmail.body_text)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Copy email to clipboard"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>

                  {sendSuccess && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" /> Email dispatched successfully!
                    </div>
                  )}

                  {/* Tone controls */}
                  <div className="flex items-center justify-between gap-4 bg-[#1A1A1A] p-4 rounded-xl border border-white/5 text-sm">
                    <div className="flex gap-2">
                      {['professional', 'friendly', 'executive', 'casual'].map(tone => (
                        <button
                          key={tone}
                          onClick={() => setEmailTone(tone)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${emailTone === tone ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleRegenerateEmail}
                      disabled={emailToneLoading}
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${emailToneLoading ? 'animate-spin' : ''}`} /> Regenerate
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Subject</label>
                      <input
                        type="text"
                        value={reviewEmail.subject}
                        onChange={(e) => setReviewEmail({ ...reviewEmail, subject: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/5 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Body</label>
                      <textarea
                        value={reviewEmail.body_text}
                        onChange={(e) => setReviewEmail({ ...reviewEmail, body_text: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/5 text-white rounded-xl py-3 px-4 text-sm focus:outline-none h-64 font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Provider Gateway</label>
                        <select
                          value={emailProvider}
                          onChange={(e) => setEmailProvider(e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-white/5 text-white rounded-xl py-2 px-3 text-xs focus:outline-none"
                        >
                          <option value="smtp">SMTP Relay (Simulator)</option>
                          <option value="resend">Resend API (Cloud)</option>
                        </select>
                      </div>

                      <button
                        onClick={handleSendOutreach}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl py-3 px-6 transition-all mt-4 flex items-center justify-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" /> Send Email Pitch
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Tab 3: Campaigns management */}
        {activeSubTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="font-syne font-bold text-lg text-white">Active Outreach Campaigns</h3>
                <span className="text-xs text-gray-500 font-mono font-bold">{campaigns.length} campaigns</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-xs">
                      <th className="pb-3">Campaign Name</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Targets Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {campaigns.map(c => {
                      const campCompanies = companies.filter(comp => comp.campaign_id === c.id);
                      return (
                        <tr key={c.id} className="hover:bg-white/[0.01]">
                          <td className="py-4 font-semibold text-white">{c.name}</td>
                          <td className="py-4 text-gray-400">{c.description || 'N/A'}</td>
                          <td className="py-4 font-mono text-xs uppercase">
                            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 text-right font-mono font-semibold text-white">{campCompanies.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Campaign Modal */}
            {showAddCampaign && (
              <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl w-full max-w-md shadow-2xl relative space-y-6">
                  <h3 className="font-syne font-bold text-xl text-white">Create Outreach Campaign</h3>
                  <form onSubmit={handleCreateCampaign} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Campaign Name</label>
                      <input
                        type="text"
                        required
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                        placeholder="Q3 SaaS Leads"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">Description</label>
                      <textarea
                        value={campaignDesc}
                        onChange={(e) => setCampaignDesc(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-white/5 text-white rounded-xl py-3 px-4 text-sm focus:outline-none h-24"
                        placeholder="Parameters of targeted audience..."
                      />
                    </div>
                    <div className="flex gap-3 justify-end mt-8">
                      <button
                        type="button"
                        onClick={() => setShowAddCampaign(false)}
                        className="border border-white/5 hover:bg-white/[0.02] text-white px-5 py-2.5 rounded-xl text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-xl text-sm font-semibold"
                      >
                        Save Campaign
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Sent Emails Logs */}
        {activeSubTab === 'sent' && (
          <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="font-syne font-bold text-lg text-white">Email Delivery Audit Logs</h3>
              <p className="text-gray-500 text-xs mt-1">Audit status reports of outreach email broadcasts.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-xs">
                    <th className="pb-3">Recipient</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Gateway</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {companies.filter(c => c.status === 'sent' || c.status === 'failed').map(c => {
                    const email = c.generated_emails?.[0];
                    return (
                      <tr key={c.id} className="hover:bg-white/[0.01]">
                        <td className="py-4 font-semibold text-white">{c.contact_email}</td>
                        <td className="py-4 truncate max-w-xs">{email?.subject || 'Direct Pitch'}</td>
                        <td className="py-4 font-mono text-xs uppercase">SMTP</td>
                        <td className="py-4 font-mono text-xs uppercase">
                          <span className={`px-2 py-0.5 rounded-full ${c.status === 'sent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {companies.filter(c => c.status === 'sent' || c.status === 'failed').length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-500 text-sm">
                        No sent emails logged in the delivery table yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Analytics Charts */}
        {activeSubTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-syne font-bold text-lg text-white">Daily Operations Activity</h3>
              <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-white/5">
                {[2, 4, 3, 5, 8, 12, 10].map((val, idx) => (
                  <div key={idx} className="flex-grow flex flex-col items-center gap-2">
                    <div className="bg-emerald-500 w-full rounded-t-lg transition-all duration-1000" style={{ height: `${val * 15}px` }} />
                    <span className="text-[10px] font-mono text-gray-500">Day {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="font-syne font-bold text-lg text-white">Month Campaign Success</h3>
              <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-white/5">
                {[15, 30, 22, 45, 60, 50, 80, 95].map((val, idx) => (
                  <div key={idx} className="flex-grow flex flex-col items-center gap-2">
                    <div className="bg-blue-500 w-full rounded-t-lg transition-all duration-1000" style={{ height: `${val * 2}px` }} />
                    <span className="text-[10px] font-mono text-gray-500">Mo {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Settings Credentials */}
        {activeSubTab === 'settings' && (
          <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl max-w-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="font-syne font-bold text-lg text-white">Local LLM OpenAI-Compatible API Mappings</h3>
            </div>

            {saveSettingsSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> AI credentials settings saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Base URL</label>
                <input
                  type="text"
                  required
                  value={aiBaseUrl}
                  onChange={(e) => setAiBaseUrl(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  placeholder="http://localhost:1234/v1"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Compatible with LM Studio, Ollama, vLLM, LocalAI.</span>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Model Name</label>
                <input
                  type="text"
                  required
                  value={aiModelName}
                  onChange={(e) => setAiModelName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  placeholder="local-model"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Optional API Key</label>
                <input
                  type="password"
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 focus:border-emerald-500/30 text-white rounded-xl py-3 px-4 text-sm focus:outline-none"
                  placeholder="••••••••"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Leave empty if the local host server does not require authorization keys.</span>
              </div>

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors mt-4"
              >
                Save AI Credentials
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
