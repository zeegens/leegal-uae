import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import MyCompany from "./MyCompany";
import { LayoutDashboard, Building2, ClipboardList, Clock3, UsersRound, FolderOpen, FileCheck2, IdCard, Landmark, ReceiptText, MessageSquareText, CalendarDays, Bell, HelpCircle, Settings2, PanelLeft, Menu, X, ChevronDown, ChevronRight, Search, LogOut, ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, Mail, Plus, Check, ChevronsUpDown } from 'lucide-react';
import FormationApplication from './FormationApplication';
import ApplicationProgress from './ApplicationProgress';
import Documents from './Documents';
import ShareholdersUBOs from './ShareholdersUBOs';
import LicencesApprovals from './LicencesApprovals';
import AccountSettings from './AccountSettings';
import Overview from './Overview';
import AllCompanies from './AllCompanies';
import VisasImmigration from './VisasImmigration';
import BankingAssistance from './BankingAssistance';

// const groups = [
//   { title: 'WORKSPACE', items: [['companies', 'All Companies', Building2, 'companies'], ['overview', 'Overview', LayoutDashboard, ''], ['company', 'My Company', Building2, 'company'], ['progress', 'Application Progress', Clock3, 'progress']] },
//   { title: 'COMPANY SETUP', items: [['shareholders', 'Shareholders & UBOs', UsersRound, 'shareholders'], ['documents', 'Documents', FolderOpen, 'documents'], ['approvals', 'Licences & Approvals', FileCheck2, 'approvals'], ['visas', 'Visas & Immigration', IdCard, 'visas']] },
//   { title: 'ACCOUNT & SUPPORT', items: [['support', 'Help & Support', HelpCircle, 'support'], ['settings', 'Account Settings', Settings2, 'settings']] }
// ];


const groups = [
  { title: 'WORKSPACE', items: [['companies', 'All Companies', Building2, 'companies'], ['overview', 'Overview', LayoutDashboard, ''], ['company', 'My Company', Building2, 'company']] },
  { title: 'COMPANY SETUP', items: [['shareholders', 'Shareholders & UBOs', UsersRound, 'shareholders'], ['documents', 'Documents', FolderOpen, 'documents'], ['approvals', 'Licences & Approvals', FileCheck2, 'approvals'], ['visas', 'Visas & Immigration', IdCard, 'visas']] },
  { title: 'ACCOUNT & SUPPORT', items: [['support', 'Help & Support', HelpCircle, 'support'], ['settings', 'Account Settings', Settings2, 'settings']] }
];


const pages = groups.flatMap(g => g.items).map(([id, label, icon, path]) => ({ id, label, icon, path }));
function Placeholder({ page }) { const Icon = page.icon; return <section className="uc-placeholder"><div className="uc-placeholder-icon"><Icon size={28} /></div><span className="uc-eyebrow">LEEGAL UAE CLIENT PORTAL</span><h2>{page.label}</h2><p>This is your {page.label.toLowerCase()} page. We'll build its dedicated content here next.</p><span className="uc-ready"><span /> Route ready for development</span></section> }
export default function UAECustomerDashboard({ basePath = '/user/dashboard', logoSrc, user = { name: 'Your Account', email: 'Client account' }, companyName = 'My UAE Company', companies: suppliedCompanies, initialCompanyId, onAddCompany, onCompanyChange, pageComponents = {}, onLogout, onSubmitSupport }) {
  const location = useLocation(), navigate = useNavigate();
  const [companyPicker, setCompanyPicker] = useState(false), [companySearch, setCompanySearch] = useState(''), [collapsed, setCollapsed] = useState(false), [mobile, setMobile] = useState(false), [search, setSearch] = useState(false), [query, setQuery] = useState(''), [profile, setProfile] = useState(false), [notifications, setNotifications] = useState(false), [dismissed, setDismissed] = useState(false), [logoutDialog, setLogoutDialog] = useState(false), [expanded, setExpanded] = useState({ 'WORKSPACE': true, 'COMPANY SETUP': true, 'ACCOUNT & SUPPORT': true });
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: '', category: 'General enquiry', message: '' });
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportError, setSupportError] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);
  const closeSupport = () => { if (!supportSubmitting) { setSupportOpen(false); setSupportError(''); setSupportSuccess(false); } };
  const openSupport = () => { setSupportOpen(true); setSupportError(''); setSupportSuccess(false); setMobile(false); setProfile(false); setSearch(false); setQuery(''); setCompanyPicker(false); };
  const submitSupport = async e => {
    e.preventDefault();
    if (!supportForm.subject.trim() || !supportForm.message.trim()) { setSupportError('Please complete the subject and message.'); return; }
    if (!onSubmitSupport) { setSupportError('Support submission is not connected yet. Please contact your administrator.'); return; }
    setSupportSubmitting(true); setSupportError('');
    try {
      await onSubmitSupport({ ...supportForm, subject: supportForm.subject.trim(), message: supportForm.message.trim(), company: activeCompany, companyId: activeCompanyId, user });
      setSupportSuccess(true);
      setSupportForm({ subject: '', category: 'General enquiry', message: '' });
    } catch (error) { setSupportError(error?.message || 'Unable to send your request. Please try again.'); }
    finally { setSupportSubmitting(false); }
  };
  const base = '/' + basePath.replace(/^\/+|\/+$/g, '');
  // Dashboard routes are flat: /user/dashboard/documents, /user/dashboard/settings, etc.
  // Company selection is separate from the URL, allowing the same pages to serve multiple companies.
  const companies = useMemo(() => suppliedCompanies?.length ? suppliedCompanies : [{ id: 'default', name: companyName, status: 'Company workspace' }], [suppliedCompanies, companyName]);
  const [selectedId, setSelectedId] = useState(initialCompanyId || companies[0].id);
  useEffect(() => { if (!companies.some(c => String(c.id) === String(selectedId))) setSelectedId(companies[0].id) }, [companies, selectedId]);
  const relative = location.pathname.startsWith(base + '/') ? location.pathname.slice(base.length + 1).replace(/\/+$/, '') : '';
  const page = pages.find(p => p.path === relative) || pages[0];
  const activeCompany = companies.find(c => String(c.id) === String(selectedId)) || companies[0];
  const activeCompanyId = String(activeCompany.id);
  const results = useMemo(() => pages.filter(p => p.label.toLowerCase().includes(query.toLowerCase())), [query]);
  const go = p => { if (p.id === 'support') { openSupport(); return; } navigate(`${base}${p.path ? '/' + p.path : ''}`); setMobile(false); setSearch(false); setQuery(''); setProfile(false); setNotifications(false); setCompanyPicker(false) };
  const switchCompany = c => { setSelectedId(c.id); setCompanyPicker(false); setCompanySearch(''); if (onCompanyChange) onCompanyChange(c); if (page.id === 'companies') navigate(base); };
  useEffect(() => { const f = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch(true) } if (e.key === 'Escape') { setSearch(false); setMobile(false); setProfile(false); setNotifications(false); setLogoutDialog(false); closeSupport() } }; document.addEventListener('keydown', f); return () => document.removeEventListener('keydown', f) }, []);
  useEffect(() => { setMobile(false); setCompanyPicker(false) }, [location.pathname]);
  const initials = (user?.name || 'U').split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  return <><style>{css}</style><div className={'uc-root ' + (collapsed ? 'uc-collapsed' : '')}>
    {mobile && <button className="uc-scrim" aria-label="Close sidebar" onClick={() => setMobile(false)} />}
    <aside className={'uc-sidebar ' + (mobile ? 'uc-sidebar-open' : '')}>
      <div className="uc-sidebar-head"><div className="uc-brand">{logoSrc ? <img src={logoSrc} alt="Leegal" /> : <span>leegal<b>.</b></span>}{!collapsed && <small>UAE CLIENT PORTAL</small>}</div><button className="uc-collapse" aria-label="Toggle sidebar" onClick={() => setCollapsed(v => !v)}><PanelLeft size={19} /></button><button className="uc-close" onClick={() => setMobile(false)} aria-label="Close sidebar"><X size={20} /></button></div>
      {!collapsed && <div className="uc-company-picker-wrap">
        <button className="uc-company uc-company-trigger" type="button" aria-label="Switch company" aria-expanded={companyPicker} onClick={() => setCompanyPicker(v => !v)}><span className="uc-company-icon"><Building2 size={18} /></span><span><strong>{activeCompany.name}</strong><small>{activeCompany.status || 'Company workspace'}</small></span><ChevronsUpDown size={15} className="uc-switch-icon" /></button>
        {companyPicker && <div className="uc-company-dropdown"><div className="uc-company-drop-head"><strong>Switch company</strong><span>{companies.length} {companies.length === 1 ? 'company' : 'companies'}</span></div>
          <div className="uc-company-filter"><Search size={15} /><input placeholder="Find company..." value={companySearch} onChange={e => setCompanySearch(e.target.value)} /></div>
          <div className="uc-company-list">{companies.filter(c => c.name.toLowerCase().includes(companySearch.toLowerCase())).map(c => <button key={c.id} onClick={() => switchCompany(c)} className={String(c.id) === activeCompanyId ? 'uc-company-selected' : ''}><span className="uc-company-small-icon"><Building2 size={15} /></span><span><strong>{c.name}</strong><small>{c.status || 'Company workspace'}</small></span>{String(c.id) === activeCompanyId && <Check size={16} />}</button>)}{!companies.some(c => c.name.toLowerCase().includes(companySearch.toLowerCase())) && <p className="uc-no-companies">No companies found</p>}</div>
          <button className="uc-company-manage" onClick={() => go(pages.find(p => p.id === 'companies'))}>Manage all companies <ArrowRight size={15} /></button>
          {onAddCompany && <button className="uc-company-add" onClick={() => { setCompanyPicker(false); onAddCompany() }}><Plus size={16} /> Add another company</button>}
        </div>}
      </div>}
      <div className="uc-nav-scroll">{groups.map(group => <div className="uc-group" key={group.title}>{!collapsed && <button className="uc-group-label" onClick={() => setExpanded(v => ({ ...v, [group.title]: !v[group.title] }))}>{group.title}<ChevronDown size={13} style={{ transform: expanded[group.title] ? '' : 'rotate(-90deg)' }} /></button>}{(collapsed || expanded[group.title]) && <nav aria-label={group.title}>{group.items.map(([id, label, Icon, path]) => <button key={id} title={collapsed ? label : undefined} className={'uc-nav-item ' + (page.id === id ? 'uc-active' : '')} aria-current={page.id === id ? 'page' : undefined} onClick={() => go({ id, path })}><Icon size={19} strokeWidth={page.id === id ? 2.2 : 1.8} />{!collapsed && <><span>{label}</span>{page.id === id && <i />}</>}</button>)}</nav>}</div>)}</div>
      <div className="uc-sidebar-bottom"><small>{collapsed ? '©' : `© ${new Date().getFullYear()} Leegal · UAE Portal`}</small></div>
    </aside>
    <div className="uc-main"><header className="uc-topbar"><div className="uc-top-left"><button className="uc-menu" onClick={() => setMobile(true)} aria-label="Open menu"><Menu size={21} /></button><div className="uc-breadcrumb"><span>{activeCompany.name}</span><ChevronRight size={15} /><strong>{page.label}</strong></div></div><div className="uc-top-right">
      <div className="uc-search-area"><button className="uc-search-btn" onClick={() => { setSearch(v => !v); setProfile(false); setNotifications(false) }}><Search size={17} /><span>Search pages...</span><kbd>⌘ K</kbd></button>{search && <div className="uc-search-pop"><div className="uc-search-input"><Search size={18} /><input autoFocus placeholder="Find a dashboard page" value={query} onChange={e => setQuery(e.target.value)} /><button onClick={() => setSearch(false)}><X size={17} /></button></div><small>PAGES</small><div className="uc-results">{results.length ? results.map(p => { const Icon = p.icon; return <button key={p.id} onClick={() => go(p)}><Icon size={17} /><span>{p.label}</span><ArrowRight size={15} /></button> }) : <p>No matching pages</p>}</div></div>}</div>
      <div className="uc-divider" /><div className="uc-anchor"><button className="uc-bell" aria-label="Notifications" onClick={() => { setNotifications(v => !v); setProfile(false); setSearch(false) }}><Bell size={19} /><i /></button>{notifications && <div className="uc-pop uc-notifications"><strong>Notifications</strong><div className="uc-empty"><Bell size={23} /><b>You're all caught up</b><p>New updates will appear here.</p></div><button onClick={() => go(pages.find(p => p.id === 'notifications'))}>View notifications <ArrowRight size={15} /></button></div>}</div>
      <div className="uc-anchor"><button className="uc-user" onClick={() => { setProfile(v => !v); setNotifications(false); setSearch(false) }}><span className="uc-avatar">{initials}</span><span className="uc-user-text"><strong>{user?.name}</strong><small>Client account</small></span><ChevronDown size={15} /></button>{profile && <div className="uc-pop uc-profile-pop"><div className="uc-profile-head"><span className="uc-avatar">{initials}</span><span><b>{user?.name}</b><small>{user?.email}</small></span></div><button onClick={() => go(pages.find(p => p.id === 'settings'))}><Settings2 size={17} /> Account settings</button><button onClick={() => go(pages.find(p => p.id === 'support'))}><HelpCircle size={17} /> Help & support</button><hr /><button className="uc-signout" onClick={() => { setProfile(false); setLogoutDialog(true) }}><LogOut size={17} /> Sign out</button></div>}</div>
    </div>
    </header>
      <main className="uc-content">
        <div className="uc-content-width">
          {/* {page.id === 'overview' && !dismissed && <section className="uc-welcome"><div className="uc-welcome-orbit" /><span className="uc-welcome-symbol"><Sparkles size={21} /></span><div className="uc-welcome-copy"><small>WELCOME TO LEEGAL UAE</small><h2>Your business journey, beautifully organized.</h2><p>Track your formation, manage important documents, and stay connected with your team — all in one place.</p></div><button className="uc-welcome-action" onClick={() => go(pages.find(p => p.id === 'application'))}>View application <ArrowUpRight size={17} /></button><button className="uc-welcome-x" aria-label="Dismiss message" onClick={() => setDismissed(true)}><X size={16} /></button></section>} */}
          <Routes>
            <Route path="companies" element={<AllCompanies companies={companies} activeCompanyId={activeCompanyId} onSelectCompany={switchCompany} onAddCompany={onAddCompany} navigate={navigate} basePath={base} />} />
            <Route index element={<Overview company={activeCompany} companyId={activeCompanyId} navigate={navigate} onOpenSupport={openSupport} />} />
            {/* <Route path="company" element={pageComponents.company ? React.createElement(pageComponents.company, { company: activeCompany, companyId: activeCompanyId, navigate }) : <Placeholder page={pages.find(p => p.id === 'company')} />} /> */}

            <Route
              path="company"
              element={
                <MyCompany
                  // company={activeCompany}
                  // companyId={activeCompanyId}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="application"
              element={
                <FormationApplication
                  // company={activeCompany}
                  // companyId={activeCompanyId}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="progress"
              element={
                <ApplicationProgress
                  // company={activeCompany}
                  // companyId={activeCompanyId}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="documents"
              element={
                <Documents
                  // company={activeCompany}
                  // companyId={activeCompanyId}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="shareholders"
              element={
                <ShareholdersUBOs
                // company={activeCompany}
                // companyId={activeCompanyId}
                />
              }
            />
            <Route
              path="approvals"
              element={
                <LicencesApprovals
                // company={activeCompany}
                // companyId={activeCompanyId}
                />
              }
            />
            <Route
              path="settings"
              element={
                <AccountSettings
                // user={user}
                // company={activeCompany}
                // onSaveProfile={handleSaveProfile}
                // onChangePassword={handleChangePassword}
                // onSaveNotifications={handleSaveNotifications}
                // onSavePreferences={handleSavePreferences}
                // onLogout={onLogout}
                />
              }
            />
            <Route path="visas" element={pageComponents.visas ? React.createElement(pageComponents.visas, { company: activeCompany, companyId: activeCompanyId, navigate, onOpenSupport: openSupport }) : <VisasImmigration company={activeCompany} companyId={activeCompanyId} navigate={navigate} onOpenSupport={openSupport} />} />
            <Route path="banking" element={pageComponents.banking ? React.createElement(pageComponents.banking, { company: activeCompany, companyId: activeCompanyId, navigate, onOpenSupport: openSupport }) : <BankingAssistance company={activeCompany} companyId={activeCompanyId} onOpenSupport={openSupport} />} />
            <Route path="appointments" element={pageComponents.appointments ? React.createElement(pageComponents.appointments, { company: activeCompany, companyId: activeCompanyId, navigate }) : <Placeholder page={pages.find(p => p.id === 'appointments')} />} />
            <Route path="support" element={<Navigate to={base} replace />} />
            <Route path="*" element={<Navigate to={base} replace />} />
          </Routes></div></main></div>
  </div>
    {supportOpen && <div className="uc-modal-bg" onMouseDown={e => { if (e.target === e.currentTarget) closeSupport(); }}>
      <section className="uc-help-modal" role="dialog" aria-modal="true" aria-labelledby="uc-help-title">
        <div className="uc-help-head"><span className="uc-help-icon"><HelpCircle size={23} /></span><button type="button" className="uc-help-close" aria-label="Close help form" onClick={closeSupport} disabled={supportSubmitting}><X size={19} /></button></div>
        {supportSuccess ? <div className="uc-help-success"><span><Check size={26} /></span><h2 id="uc-help-title">Request submitted</h2><p>Your support request has been sent to the Leegal team.</p><button type="button" onClick={closeSupport}>Done</button></div> : <>
          <h2 id="uc-help-title">How can we help?</h2><p className="uc-help-intro">Tell us what you need assistance with. Our team will review your request.</p>
          <form className="uc-help-form" onSubmit={submitSupport}>
            <div className="uc-help-context"><Building2 size={16} /><span>Regarding <strong>{activeCompany.name}</strong></span></div>
            <label htmlFor="uc-help-category">Support category</label>
            <select id="uc-help-category" value={supportForm.category} onChange={e => setSupportForm(v => ({ ...v, category: e.target.value }))}>
              {['General enquiry', 'Company formation', 'Application progress', 'Documents & approvals', 'Shareholders & UBOs', 'Billing & payments', 'Technical issue', 'Other'].map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <label htmlFor="uc-help-subject">Subject <span>*</span></label>
            <input id="uc-help-subject" required maxLength={150} placeholder="Briefly describe your issue" value={supportForm.subject} onChange={e => setSupportForm(v => ({ ...v, subject: e.target.value }))} />
            <label htmlFor="uc-help-message">How can we assist? <span>*</span></label>
            <textarea id="uc-help-message" required rows={5} maxLength={3000} placeholder="Describe your question or issue in detail..." value={supportForm.message} onChange={e => setSupportForm(v => ({ ...v, message: e.target.value }))} />
            {supportError && <p className="uc-help-error" role="alert">{supportError}</p>}
            <div className="uc-help-actions"><button type="button" onClick={closeSupport} disabled={supportSubmitting}>Cancel</button><button type="submit" disabled={supportSubmitting}>{supportSubmitting ? 'Submitting...' : 'Submit request'} <ArrowRight size={16} /></button></div>
          </form>
        </>}
      </section>
    </div>}
    {logoutDialog && <div className="uc-modal-bg" onMouseDown={e => { if (e.target === e.currentTarget) setLogoutDialog(false) }}><div className="uc-modal" role="dialog" aria-modal="true"><span className="uc-modal-icon"><LogOut size={22} /></span><h2>Sign out of Leegal?</h2><p>You'll need to log in again to access your company formation dashboard.</p><div><button onClick={() => setLogoutDialog(false)}>Cancel</button><button onClick={() => { setLogoutDialog(false); if (onLogout) onLogout(); else navigate('/login') }}>Sign out <ArrowRight size={16} /></button></div></div></div>}
  </>;
}
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.uc-root{--red:#EA2024;--navy:#192536;--border:#E7EBF1;--side:272px;display:flex;min-height:100vh;background:#F6F8FB;color:var(--navy);font-family:'DM Sans',sans-serif;isolation:isolate}.uc-root *{box-sizing:border-box}.uc-root button,.uc-modal button{font:inherit;cursor:pointer}.uc-root button:focus-visible,.uc-modal button:focus-visible{outline:3px solid #EA20245A;outline-offset:2px}.uc-collapsed{--side:76px}
.uc-sidebar{position:sticky;top:0;height:100vh;flex:none;width:var(--side);background:white;border-right:1px solid var(--border);display:flex;flex-direction:column;z-index:50;transition:width .23s ease;overflow:hidden}.uc-sidebar-head{height:78px;flex:none;padding:0 18px 0 24px;border-bottom:1px solid #F0F2F5;display:flex;align-items:center;justify-content:space-between}.uc-brand{display:flex;flex-direction:column;gap:4px;white-space:nowrap}.uc-brand>span{font-size:30px;font-weight:800;letter-spacing:-1.8px;line-height:1}.uc-brand b{color:var(--red)}.uc-brand small{font-size:8px;letter-spacing:2px;font-weight:800;color:#9AA7B7}.uc-brand img{max-width:130px;max-height:38px;object-fit:contain}.uc-collapse,.uc-close{width:34px;height:34px;flex:none;border:0;border-radius:8px;background:transparent;color:#8390A0;display:grid;place-items:center}.uc-collapse:hover,.uc-close:hover{background:#F3F5F8;color:var(--navy)}.uc-close{display:none}
.uc-company{display:flex;align-items:center;gap:10px;margin:20px 13px 10px;padding:11px 10px;border:1px solid #E8ECF2;background:#F9FAFC;border-radius:10px}.uc-company-icon{display:grid;place-items:center;width:36px;height:36px;flex:none;background:var(--navy);color:#fff;border-radius:9px}.uc-company>span:nth-child(2){display:flex;flex:1;flex-direction:column;gap:4px;min-width:0}.uc-company strong{font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uc-company small{font-size:9px;color:#8E9AAB;white-space:nowrap}.uc-company-dot{width:7px;height:7px;border-radius:50%;background:var(--red)}
.uc-nav-scroll{flex:1;overflow:auto;min-height:0;padding:7px 12px 20px;scrollbar-width:thin;scrollbar-color:#E1E6EE transparent}.uc-group{margin-top:20px}.uc-group-label{width:100%;display:flex;align-items:center;justify-content:space-between;background:transparent;border:0;padding:0 12px 10px;color:#9CA8B7;font-size:9px!important;font-weight:800!important;letter-spacing:1.45px}.uc-group-label svg{transition:transform .2s}.uc-group nav{display:grid;gap:4px}.uc-nav-item{width:100%;min-height:43px;display:flex;align-items:center;gap:12px;padding:10px 12px;background:transparent;border:0;border-radius:8px;color:#68778B;text-align:left;font-size:12px!important;font-weight:650!important;position:relative;transition:background .2s,color .2s}.uc-nav-item svg{flex:none}.uc-nav-item span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uc-nav-item i{width:5px;height:5px;background:var(--red);border-radius:50%;flex:none}.uc-nav-item:hover{background:#F6F8FA;color:var(--navy)}.uc-nav-item.uc-active{background:#FFF0F1;color:#D71C22;font-weight:800!important}.uc-active:before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;background:var(--red);border-radius:0 3px 3px 0}
.uc-sidebar-bottom{border-top:1px solid #EDF0F4;padding:14px 13px 20px}.uc-support{background:var(--navy);border-radius:11px;padding:16px;color:#fff;position:relative;overflow:hidden}.uc-support:after{content:'';position:absolute;right:-35px;top:-30px;width:110px;height:110px;border:1px solid #ffffff20;border-radius:50%}.uc-support-icon{display:grid;place-items:center;background:var(--red);width:34px;height:34px;border-radius:8px;margin-bottom:13px}.uc-support strong{font-size:12px}.uc-support p{font-size:10px;line-height:1.75;color:#B8C6D5;margin:7px 0 12px}.uc-support button{display:flex;align-items:center;gap:9px;color:white;border:0;background:none;padding:0;font-size:10px;font-weight:800}.uc-support button:hover{color:#FF9A9D}.uc-sidebar-bottom>small{display:block;text-align:center;color:#A4AFBD;font-size:9px;margin-top:15px}.uc-collapsed .uc-brand{display:none}.uc-collapsed .uc-sidebar-head{justify-content:center;padding:0}.uc-collapsed .uc-nav-scroll{padding:10px}.uc-collapsed .uc-group{margin:15px 0}.uc-collapsed .uc-nav-item{justify-content:center;padding:10px}.uc-collapsed .uc-sidebar-bottom{padding:10px 5px}.uc-collapsed .uc-sidebar-bottom>small{margin:0}
.uc-main{flex:1;min-width:0;display:flex;flex-direction:column}.uc-topbar{height:78px;position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--border);padding:0 clamp(18px,3vw,45px);display:flex;align-items:center;justify-content:space-between;gap:15px}.uc-top-left,.uc-top-right{display:flex;align-items:center;gap:17px}.uc-breadcrumb{display:flex;align-items:center;gap:10px;font-size:12px;color:#9BA6B5;white-space:nowrap}.uc-breadcrumb strong{color:#263448;font-weight:750}.uc-top-right{gap:14px}.uc-divider{height:25px;width:1px;background:#E8ECF1}.uc-search-area,.uc-anchor{position:relative}.uc-search-btn{width:230px;height:38px;display:flex;align-items:center;gap:10px;background:#F9FAFC;border:1px solid #E8ECF1;border-radius:9px;padding:0 10px 0 13px;color:#8995A6;font-size:11px!important}.uc-search-btn span{flex:1;text-align:left}.uc-search-btn kbd{font:inherit;font-size:9px;background:#fff;border:1px solid #E6EAF0;padding:3px 5px;border-radius:4px}.uc-bell{position:relative;display:grid;place-items:center;width:37px;height:37px;border:0;border-radius:9px;background:transparent;color:#667487}.uc-bell:hover{background:#F5F7FA}.uc-bell i{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--red);border:1px solid #fff}.uc-user{display:flex;align-items:center;gap:10px;background:none;border:0;color:#8190A2;padding:3px}.uc-avatar{width:36px;height:36px;flex:none;display:grid;place-items:center;background:#EEF1F6;border-radius:10px;font-size:12px;font-weight:800;color:var(--navy)}.uc-user-text{display:flex;flex-direction:column;gap:4px;text-align:left;max-width:135px}.uc-user-text strong{font-size:11px;color:var(--navy);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uc-user-text small{font-size:9px;color:#9AA6B5}
.uc-search-pop,.uc-pop{position:absolute;top:calc(100% + 13px);right:0;z-index:70;background:white;border:1px solid #E7EBF1;border-radius:12px;box-shadow:0 20px 55px #19253620;animation:uc-pop-in .18s ease}.uc-search-pop{width:min(380px,90vw);overflow:hidden}.uc-search-input{display:flex;align-items:center;gap:10px;padding:14px;color:#8390A1;border-bottom:1px solid #EDF0F4}.uc-search-input input{flex:1;min-width:0;outline:0;border:0;font:500 13px 'DM Sans',sans-serif;color:var(--navy)}.uc-search-input button{background:none;border:0;color:#8894A5}.uc-search-pop>small{display:block;font-size:9px;letter-spacing:1.4px;font-weight:800;color:#A1ADBC;padding:14px 15px 6px}.uc-results{padding:0 7px 8px;max-height:330px;overflow:auto}.uc-results button{width:100%;display:flex;align-items:center;gap:11px;background:transparent;border:0;border-radius:8px;padding:12px 10px;color:#617085;text-align:left;font-size:12px}.uc-results button:hover{background:#FFF1F2;color:var(--red)}.uc-results button span{flex:1}.uc-results p{font-size:12px;color:#9AA6B5;padding:10px}.uc-pop{width:290px;padding:9px}.uc-pop>strong{display:block;font-size:13px;padding:10px;border-bottom:1px solid #EDF0F4}.uc-empty{display:flex;flex-direction:column;align-items:center;padding:26px 10px;text-align:center;color:#A0ADBD}.uc-empty b{font-size:12px;color:var(--navy);margin-top:10px}.uc-empty p{font-size:11px;margin:7px 0 0}.uc-notifications>button{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;border-top:1px solid #EDF0F4;background:none;padding:12px;color:var(--red);font-size:11px;font-weight:800}.uc-profile-head{display:flex;align-items:center;gap:10px;padding:10px 8px 15px;border-bottom:1px solid #EDF0F4;margin-bottom:6px}.uc-profile-head>span:last-child{display:flex;flex-direction:column;gap:4px;min-width:0}.uc-profile-head b{font-size:12px}.uc-profile-head small{font-size:10px;color:#96A3B3;overflow:hidden;text-overflow:ellipsis}.uc-profile-pop>button{width:100%;display:flex;align-items:center;gap:10px;background:none;border:0;border-radius:8px;padding:12px 10px;color:#617085;font-size:12px;text-align:left}.uc-profile-pop>button:hover{background:#F6F8FA}.uc-profile-pop hr{border:0;border-top:1px solid #EDF0F4;margin:6px 0}.uc-profile-pop .uc-signout{color:var(--red)}
.uc-content{flex:1;padding:36px clamp(18px,3vw,45px) 55px}.uc-content-width{max-width:1450px;margin:auto}.uc-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:28px}.uc-section-label{display:flex;align-items:center;gap:9px;color:#A0AAB8;font-size:9px;font-weight:800;letter-spacing:1.2px;margin-bottom:11px}.uc-section-label>span{width:7px;height:7px;background:var(--red);border-radius:50%}.uc-section-label em{font-style:normal;color:#D3DAE3}.uc-heading h1{font-size:clamp(25px,2.7vw,33px);letter-spacing:-1.1px;font-weight:800;line-height:1.2;margin:0 0 9px}.uc-heading p{font-size:12px;color:#8B98A9;line-height:1.7;margin:0}.uc-secure{display:flex;align-items:center;gap:8px;color:#8A97A7;font-size:10px;white-space:nowrap}.uc-secure svg{color:var(--red)}
.uc-welcome{position:relative;overflow:hidden;display:flex;align-items:center;gap:19px;min-height:140px;padding:23px 25px;margin-bottom:22px;background:var(--navy);color:#fff;border-radius:13px}.uc-welcome-orbit{position:absolute;width:300px;height:300px;right:8%;top:-220px;border:1px solid #ffffff20;border-radius:50%;pointer-events:none;box-shadow:80px 140px 0 -60px #ffffff0A}.uc-welcome-symbol{display:grid;place-items:center;width:44px;height:44px;border-radius:10px;background:var(--red);flex:none;align-self:flex-start}.uc-welcome-copy{flex:1;min-width:0;position:relative}.uc-welcome-copy small{font-size:9px;font-weight:800;letter-spacing:1.5px;color:#FF9296}.uc-welcome-copy h2{font-size:19px;letter-spacing:-.4px;margin:9px 0 7px}.uc-welcome-copy p{font-size:11px;color:#BBC7D6;line-height:1.75;margin:0;max-width:600px}.uc-welcome-action{display:flex;align-items:center;gap:12px;flex:none;position:relative;border:0;border-radius:8px;background:var(--red);color:#fff;padding:13px 15px;font-size:11px;font-weight:800;transition:transform .2s,background .2s}.uc-welcome-action:hover{background:#CC1B21;transform:translateY(-2px)}.uc-welcome-x{position:absolute;right:8px;top:8px;background:none;border:0;color:#C6D0DC;padding:6px}
.uc-placeholder{min-height:445px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;border:1px solid #E7EBF1;border-radius:13px;box-shadow:0 3px 20px #19253608;padding:35px 20px;overflow:hidden}.uc-placeholder:before{content:'';position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#F6D1D3,var(--red),#F6D1D3)}.uc-placeholder-icon{display:grid;place-items:center;width:68px;height:68px;border:1px solid #F7DCDD;border-radius:18px;background:#FFF2F3;color:var(--red);margin-bottom:22px}.uc-eyebrow{font-size:9px;font-weight:800;letter-spacing:1.6px;color:var(--red)}.uc-placeholder h2{font-size:27px;letter-spacing:-.8px;margin:13px 0 9px}.uc-placeholder p{font-size:12px;color:#93A0B0;line-height:1.8;max-width:410px;margin:0 0 22px}.uc-ready{display:flex;align-items:center;gap:8px;border:1px solid #E7EBF1;border-radius:30px;padding:9px 14px;background:#FBFCFD;font-size:10px;font-weight:700;color:#8290A2}.uc-ready span{width:7px;height:7px;border-radius:50%;background:var(--red)}
.uc-modal-bg{position:fixed;inset:0;z-index:2000;display:grid;place-items:center;background:#10182880;padding:20px;font-family:'DM Sans',sans-serif}.uc-modal{background:white;border-radius:15px;padding:29px;width:min(100%,420px);box-shadow:0 25px 80px #0002}.uc-modal-icon{width:48px;height:48px;border-radius:12px;background:#FFF1F2;color:#EA2024;display:grid;place-items:center}.uc-modal h2{font-size:21px;color:#192536;margin:20px 0 9px}.uc-modal p{font-size:12px;color:#8190A1;line-height:1.75;margin:0 0 22px}.uc-modal>div:last-child{display:flex;gap:10px}.uc-modal>div:last-child button{display:flex;align-items:center;justify-content:center;gap:8px;flex:1;padding:12px;border:1px solid #E5E9F0;border-radius:8px;background:white;color:#192536;font-size:12px;font-weight:800}.uc-modal>div:last-child button:last-child{background:#EA2024;border-color:#EA2024;color:#fff}.uc-menu,.uc-scrim{display:none}@keyframes uc-pop-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1080px){.uc-root{--side:245px}.uc-collapsed{--side:76px}.uc-search-btn{width:190px}}
@media(max-width:800px){.uc-root,.uc-collapsed{--side:272px}.uc-sidebar{position:fixed;left:0;top:0;z-index:101;width:272px;transform:translateX(-100%);transition:transform .25s}.uc-sidebar-open{transform:translateX(0)}.uc-scrim{display:block;position:fixed;inset:0;z-index:100;background:#10182877;border:0}.uc-collapsed .uc-brand{display:flex}.uc-collapsed .uc-sidebar-head{justify-content:space-between;padding:0 18px 0 24px}.uc-collapsed .uc-nav-scroll{padding:7px 12px 20px}.uc-collapsed .uc-nav-item{justify-content:flex-start;padding:10px 12px}.uc-collapse{display:none}.uc-close{display:grid}.uc-menu{display:grid;place-items:center;width:36px;height:36px;background:#F7F8FA;border:1px solid #E8ECF1;border-radius:8px;color:#192536}.uc-topbar{height:68px}.uc-content{padding:26px 20px 45px}}
@media(max-width:550px){.uc-topbar{padding:0 15px}.uc-top-left,.uc-top-right{gap:9px}.uc-breadcrumb>span,.uc-breadcrumb>svg{display:none}.uc-breadcrumb{font-size:11px}.uc-search-btn{width:36px;height:36px;justify-content:center;padding:0;border:0;background:transparent}.uc-search-btn span,.uc-search-btn kbd,.uc-divider,.uc-user-text,.uc-user>svg{display:none}.uc-user{padding:0}.uc-avatar{width:33px;height:33px}.uc-content{padding:22px 15px 35px}.uc-secure{display:none}.uc-welcome{flex-wrap:wrap;gap:12px;padding:21px 17px}.uc-welcome-symbol{width:38px;height:38px}.uc-welcome-copy{flex-basis:calc(100% - 58px)}.uc-welcome-copy h2{font-size:16px}.uc-welcome-action{margin-left:50px}.uc-placeholder{min-height:360px}.uc-placeholder h2{font-size:22px}.uc-search-pop{right:-90px;width:min(340px,calc(100vw - 30px))}}

/* Multi-company switcher and company management */
.uc-company-picker-wrap{position:relative;flex:none}.uc-company-trigger{width:calc(100% - 26px);cursor:pointer;text-align:left;font-family:inherit;transition:border-color .2s,background .2s}.uc-company-trigger:hover{border-color:#CFD7E2;background:#F3F6FA}.uc-switch-icon{flex:none;color:#8B98AA}.uc-company-dropdown{position:absolute;z-index:100;left:13px;right:13px;top:calc(100% + 6px);background:white;border:1px solid #E4E9F0;border-radius:12px;box-shadow:0 18px 50px #19253624;padding:9px;animation:uc-pop-in .18s ease}.uc-company-drop-head{display:flex;justify-content:space-between;align-items:center;padding:9px 7px 12px}.uc-company-drop-head strong{font-size:12px}.uc-company-drop-head span{font-size:10px;color:#95A1B1}.uc-company-filter{display:flex;align-items:center;gap:8px;background:#F7F9FB;border:1px solid #E8EDF3;border-radius:7px;padding:9px;color:#94A0B0}.uc-company-filter input{min-width:0;flex:1;background:none;border:0;outline:0;font:500 11px 'DM Sans',sans-serif}.uc-company-list{max-height:235px;overflow-y:auto;padding:7px 0}.uc-company-list>button{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:10px 8px;border:0;border-radius:8px;background:transparent;color:#192536}.uc-company-list>button:hover,.uc-company-list>button.uc-company-selected{background:#FFF1F2}.uc-company-small-icon{width:30px;height:30px;border-radius:7px;display:grid;place-items:center;background:#F1F3F6;color:#536176;flex:none}.uc-company-list>button>span:nth-child(2){display:flex;flex-direction:column;flex:1;gap:4px;min-width:0}.uc-company-list strong{font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uc-company-list small{font-size:9px;color:#9CA7B5}.uc-company-list>button>svg{color:#EA2024}.uc-no-companies{font-size:11px;color:#94A0B0;text-align:center}.uc-company-manage,.uc-company-add{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;background:transparent;border:0;border-top:1px solid #EEF1F5;padding:12px 8px 7px;font-size:11px;font-weight:750;color:#192536}.uc-company-add{justify-content:flex-start;color:#EA2024}.uc-company-manage:hover,.uc-company-add:hover{color:#EA2024}.uc-sidebar-bottom{padding:12px 13px 18px}.uc-companies-page{padding:27px;background:#fff;border:1px solid #E7EBF1;border-radius:13px}.uc-companies-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:22px}.uc-companies-head h2{font-size:20px;letter-spacing:-.5px;margin:0 0 6px}.uc-companies-head p{font-size:12px;color:#8794A5;margin:0}.uc-companies-head button{display:flex;align-items:center;gap:7px;padding:12px 15px;border:0;border-radius:8px;background:#EA2024;color:white;font-size:11px;font-weight:800}.uc-companies-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:15px}.uc-company-card{display:flex;flex-direction:column;align-items:flex-start;gap:10px;text-align:left;min-height:190px;padding:20px;border:1px solid #E8ECF2;border-radius:11px;background:#fff;color:#192536;transition:border-color .2s,transform .2s,box-shadow .2s}.uc-company-card:hover{border-color:#F0B7B9;transform:translateY(-3px);box-shadow:0 10px 30px #1925360C}.uc-company-card-icon{width:43px;height:43px;border-radius:10px;background:#FFF0F1;color:#EA2024;display:grid;place-items:center}.uc-company-card strong{font-size:14px}.uc-company-card small{font-size:11px;color:#8794A5}.uc-company-card>span:last-child{display:flex;align-items:center;gap:8px;margin-top:auto;color:#EA2024;font-size:11px;font-weight:800}
@media(max-width:800px){.uc-company-picker-wrap{display:block}.uc-collapsed .uc-company-picker-wrap{display:block}.uc-collapsed .uc-company{display:flex}.uc-company-dropdown{left:13px;right:13px}}
@media(max-width:550px){.uc-companies-page{padding:18px}.uc-companies-head{align-items:flex-start;flex-direction:column}}

/* Help & Support modal — intentionally no box shadows */
.uc-help-modal{width:min(100%,540px);max-height:min(92vh,780px);overflow-y:auto;background:#fff;border:1px solid #E5EAF1;border-radius:16px;padding:28px 30px 30px;color:#1A2536;box-shadow:none;font-family:'DM Sans',sans-serif}
.uc-help-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:17px}.uc-help-icon{width:48px;height:48px;display:grid;place-items:center;background:#FFF0F1;color:#EA2024;border-radius:12px}.uc-help-close{width:34px;height:34px;display:grid;place-items:center;border:1px solid #E6EAF0;background:#fff;border-radius:8px;color:#748196;cursor:pointer}
.uc-help-modal h2{font-size:23px;letter-spacing:-.65px;margin:0 0 7px;font-weight:800}.uc-help-intro{font-size:12.5px;line-height:1.7;color:#77869A;margin:0 0 22px}.uc-help-form{display:flex;flex-direction:column}.uc-help-context{display:flex;align-items:center;gap:9px;padding:12px 13px;margin-bottom:21px;background:#F2F6FC;border:1px solid #E5EBF4;border-radius:9px;color:#64748B;font-size:12px}.uc-help-context svg{color:#EA2024;flex:none}.uc-help-context strong{color:#1A2536;font-weight:750}
.uc-help-form label{font-size:12px;font-weight:750;margin:0 0 8px;color:#28364B}.uc-help-form label span{color:#EA2024}.uc-help-form input,.uc-help-form select,.uc-help-form textarea{width:100%;border:1px solid #DDE4EE;background:#fff;color:#1A2536;border-radius:9px;padding:12px 13px;font:500 12.5px 'DM Sans',sans-serif;outline:none;margin-bottom:18px;box-shadow:none;resize:vertical}.uc-help-form input:focus,.uc-help-form select:focus,.uc-help-form textarea:focus{border-color:#EA2024}.uc-help-form input::placeholder,.uc-help-form textarea::placeholder{color:#9AA6B5}.uc-help-error{font-size:12px;color:#B91C1C;margin:0 0 15px}.uc-help-actions{display:flex;justify-content:flex-end;gap:10px;border-top:1px solid #EBEFF4;padding-top:19px}.uc-help-actions button,.uc-help-success button{border:1px solid #DFE5ED;background:#fff;color:#1A2536;border-radius:9px;padding:11px 18px;font:750 12px 'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px}.uc-help-actions button[type=submit],.uc-help-success button{background:#EA2024;border-color:#EA2024;color:white}.uc-help-actions button:disabled{opacity:.6;cursor:wait}.uc-help-success{text-align:center;padding:8px 0 4px}.uc-help-success>span{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 18px;border-radius:50%;background:#EDF8F2;color:#14804A}.uc-help-success p{font-size:13px;color:#78869A;line-height:1.7}.uc-help-success button{margin:23px auto 0;min-width:130px}
@media(max-width:550px){.uc-help-modal{padding:21px 18px;border-radius:13px}.uc-help-modal h2{font-size:21px}.uc-help-actions button{flex:1}}

@media(prefers-reduced-motion:reduce){.uc-root *,.uc-modal *{transition:none!important;animation:none!important}}
`;
