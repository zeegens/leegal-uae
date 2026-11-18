import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Building2, Globe2, Landmark, Check, Info, MapPin, BriefcaseBusiness, FileCheck2, ChevronRight, Camera } from 'lucide-react';

// Real UAE photography. Images are illustrative of the UAE, not of a specific licensing authority.
// Replace these URLs with your own licensed photos for production if preferred.
const jurisdictions = [
    {
        id: 'mainland', number: '01', name: 'Mainland', label: 'UAE MAINLAND',
        subtitle: 'Connect with customers across the UAE',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Dubai city skyline with modern high-rise buildings',
        headline: 'Grow where your customers are.',
        description: 'Mainland incorporation can suit businesses serving the UAE market, opening physical premises, or pursuing activities that require mainland licensing.',
        suited: ['Retail, hospitality and local services', 'Trading and customer-facing operations', 'Businesses planning a UAE physical presence'],
        facts: [['Market access', 'UAE mainland operations, subject to licensed activities'], ['Licensing', 'Relevant emirate’s economic department'], ['Premises', 'Requirements depend on licence and activity']],
        note: 'Specific ownership, premises and approval requirements depend on the business activity and emirate.'
    },
    {
        id: 'freezone', number: '02', name: 'Free Zone', label: 'UAE FREE ZONES',
        subtitle: 'A flexible base for international business',
        image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Contemporary Dubai commercial towers and waterfront',
        headline: 'Build around your business model.',
        description: 'UAE free zones offer different licence categories, facilities and setup packages. The best choice depends on your activity, workspace and visa needs.',
        suited: ['Consulting and digital services', 'International trading and commerce', 'Founders seeking zone-specific facilities'],
        facts: [['Market access', 'Zone-specific permissions; mainland access may require arrangements'], ['Licensing', 'Selected free zone authority'], ['Facilities', 'Options vary by zone and licence package']],
        note: 'Permitted activities, visas, tax treatment and mainland access vary by free zone and individual circumstances.'
    },
    {
        id: 'offshore', number: '03', name: 'Offshore', label: 'UAE OFFSHORE',
        subtitle: 'Explore eligible international structures',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Dubai waterfront and skyline, representing the UAE',
        headline: 'Plan your international structure.',
        description: 'An offshore company may be relevant for certain holding or cross-border purposes. It generally does not replace a licence to operate on the UAE mainland.',
        suited: ['Eligible holding arrangements', 'Certain international business structures', 'Founders with specific cross-border needs'],
        facts: [['Market access', 'Generally restricted from UAE onshore trading'], ['Registration', 'Relevant offshore registry and registered agent'], ['Requirements', 'Banking, substance and tax review may apply']],
        note: 'Offshore structures have jurisdiction-specific restrictions. Professional advice is important before choosing one.'
    }
];

export default function UAEJurisdiction({ onConsultationClick, onSelectionChange }) {
    const [active, setActive] = useState('mainland');
    const selected = jurisdictions.find(item => item.id === active);
    const choose = id => { setActive(id); onSelectionChange?.(id); };
    const consult = () => {
        if (typeof onConsultationClick === 'function') onConsultationClick(active);
        else document.getElementById('uae-lead-name')?.focus();
    };

    return (
        <section className="uj-section" aria-labelledby="uj-title">
            <style>{styles}</style>
            <div className="uj-container">
                <div className="uj-heading">
                    <div>
                        <div className="uj-eyebrow"><span /> CHOOSE YOUR JURISDICTION</div>
                        <h2 id="uj-title">The right foundation for <em>your UAE business.</em></h2>
                    </div>
                    <p>Every business is different. Explore the three common setup routes and understand where your ambitions could fit.</p>
                </div>

                <div className="uj-gallery" role="tablist" aria-label="Company formation jurisdiction">
                    {jurisdictions.map(item => (
                        <button
                            type="button" role="tab" aria-selected={active === item.id}
                            aria-controls="uj-panel" key={item.id}
                            onClick={() => choose(item.id)}
                            className={`uj-photo-card ${active === item.id ? 'uj-selected' : ''}`}
                        >
                            <img src={item.image} alt={item.imageAlt} loading="lazy" />
                            <span className="uj-photo-shade" />
                            <span className="uj-card-top"><span>{item.number} / 03</span><span className="uj-card-arrow"><ArrowUpRight size={17} /></span></span>
                            <span className="uj-card-info"><span className="uj-card-type">{item.label}</span><strong>{item.name}</strong><span className="uj-card-desc">{item.subtitle}</span></span>
                            <span className="uj-card-bottom"><span className="uj-active-indicator" /> {active === item.id ? 'CURRENTLY EXPLORING' : 'EXPLORE THIS OPTION'} <ChevronRight size={16} /></span>
                        </button>
                    ))}
                </div>

                <div className="uj-detail" id="uj-panel" role="tabpanel" aria-live="polite" key={selected.id}>
                    <div className="uj-detail-intro">
                        <div className="uj-detail-kicker"><MapPin size={15} /> {selected.label} / SETUP OVERVIEW</div>
                        <h3>{selected.headline}</h3>
                        <p>{selected.description}</p>
                        <button type="button" className="uj-text-link" onClick={consult}>Discuss {selected.name.toLowerCase()} setup <ArrowRight size={17} /></button>
                    </div>
                    <div className="uj-detail-content">
                        <div className="uj-info-group">
                            <h4><BriefcaseBusiness size={18} /> WHO IT MAY SUIT</h4>
                            <ul>{selected.suited.map(text => <li key={text}><Check size={16} /><span>{text}</span></li>)}</ul>
                        </div>
                        <div className="uj-info-group uj-facts">
                            <h4><FileCheck2 size={18} /> KEY CONSIDERATIONS</h4>
                            {selected.facts.map(([key, value]) => <div className="uj-fact" key={key}><span>{key}</span><strong>{value}</strong></div>)}
                        </div>
                    </div>
                    <div className="uj-note"><Info size={16} /><span>{selected.note}</span></div>
                </div>

                {/* <div className="uj-cta-banner">
                    <div className="uj-cta-decoration" aria-hidden="true"><Building2 size={110} strokeWidth={0.7} /></div>
                    <div className="uj-cta-copy"><span>NOT SURE WHERE TO START?</span><h3>Let’s find the right fit for your business.</h3><p>Tell us what you plan to do in the UAE. We’ll help you understand suitable formation options and next steps.</p></div>
                    <button type="button" onClick={consult}>Get expert guidance <ArrowUpRight size={18} /></button>
                </div> */}
                <p className="uj-footnote"><Camera size={14} /> Photography illustrates UAE locations; images do not represent a specific licensing authority or registered office. Final eligibility and approvals depend on the relevant authorities.</p>
            </div>
        </section>
    );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.uj-section{--red:#EA2024;--ink:#192536;--muted:#64748B;--border:#E5E9F0;background:#FAFBFC;color:var(--ink);font-family:'DM Sans',sans-serif;padding:100px 24px 90px;overflow:hidden}
.uj-section *{box-sizing:border-box}.uj-section button{font-family:inherit;cursor:pointer}.uj-section button:focus-visible{outline:3px solid #EA202480;outline-offset:3px}.uj-container{max-width:1240px;margin:auto}
.uj-heading{display:flex;align-items:end;justify-content:space-between;gap:55px;margin-bottom:36px}.uj-heading>div{max-width:740px}.uj-eyebrow{display:flex;align-items:center;gap:11px;color:var(--red);font-size:11px;font-weight:800;letter-spacing:1.8px;margin-bottom:18px}.uj-eyebrow span{width:27px;height:2px;background:var(--red)}.uj-heading h2{font-size:clamp(37px,4.2vw,58px);line-height:1.11;letter-spacing:-2.6px;margin:0;font-weight:800}.uj-heading h2 em{font-style:normal;color:var(--red)}.uj-heading>p{max-width:310px;color:var(--muted);font-size:14px;line-height:1.85;margin:0 0 4px}
.uj-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}.uj-photo-card{height:350px;min-width:0;border:2px solid transparent;border-radius:18px;position:relative;overflow:hidden;text-align:left;padding:0;background:#263346;color:#fff;isolation:isolate;transition:transform .3s,border-color .3s,box-shadow .3s}.uj-photo-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .65s cubic-bezier(.2,.7,.2,1)}.uj-photo-card:hover img,.uj-photo-card.uj-selected img{transform:scale(1.065)}.uj-photo-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,19,31,.27) 0%,rgba(10,19,31,.08) 30%,rgba(10,19,31,.88) 100%);z-index:-1}.uj-photo-card:hover{transform:translateY(-4px)}.uj-photo-card.uj-selected{border-color:var(--red);box-shadow:0 16px 38px #19253620}.uj-card-top{position:absolute;top:19px;left:21px;right:19px;display:flex;align-items:center;justify-content:space-between;font-size:11px;letter-spacing:1px;font-weight:700}.uj-card-arrow{width:34px;height:34px;border-radius:50%;background:#ffffff33;backdrop-filter:blur(7px);display:grid;place-items:center}.uj-selected .uj-card-arrow{background:var(--red)}.uj-card-info{position:absolute;left:24px;right:22px;bottom:65px;display:flex;flex-direction:column}.uj-card-type{font-size:10px;font-weight:800;letter-spacing:1.5px;color:#fff;opacity:.85}.uj-card-info strong{font-size:34px;line-height:1.25;letter-spacing:-1px;margin:7px 0}.uj-card-desc{font-size:12px;color:#e3e9ef;line-height:1.6}.uj-card-bottom{position:absolute;bottom:0;left:0;right:0;height:47px;border-top:1px solid #ffffff30;display:flex;align-items:center;gap:9px;padding:0 23px;font-size:9px;letter-spacing:1px;font-weight:800}.uj-card-bottom svg{margin-left:auto}.uj-active-indicator{width:7px;height:7px;border:1px solid #fff;border-radius:50%}.uj-selected .uj-active-indicator{background:#fff;border-color:#fff}.uj-selected .uj-card-bottom{background:#EA2024}
.uj-detail{margin-top:18px;display:grid;grid-template-columns:.9fr 1.1fr;background:#fff;border:1px solid var(--border);border-radius:18px;overflow:hidden;box-shadow:0 15px 38px #1925360a;animation:uj-reveal .35s ease both}.uj-detail-intro{padding:38px 40px;border-right:1px solid var(--border)}.uj-detail-kicker{display:flex;align-items:center;gap:8px;color:var(--red);font-size:10px;font-weight:800;letter-spacing:1.1px}.uj-detail-intro h3{font-size:clamp(25px,2.6vw,36px);letter-spacing:-1.2px;line-height:1.17;margin:18px 0 14px}.uj-detail-intro p{font-size:13px;line-height:1.85;color:var(--muted);margin:0 0 25px}.uj-text-link{border:0;background:none;color:var(--red);font-size:13px;font-weight:800;display:inline-flex;align-items:center;gap:10px;padding:0}.uj-text-link svg{transition:transform .2s}.uj-text-link:hover svg{transform:translateX(4px)}.uj-detail-content{display:grid;grid-template-columns:1fr 1.1fr;gap:25px;padding:36px 30px}.uj-info-group h4{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:1px;color:var(--ink);margin:0 0 18px}.uj-info-group h4 svg{color:var(--red)}.uj-info-group ul{padding:0;margin:0;list-style:none;display:grid;gap:15px}.uj-info-group li{display:flex;align-items:start;gap:9px;color:#556275;font-size:12px;line-height:1.6}.uj-info-group li svg{color:var(--red);flex:none;margin-top:1px}.uj-fact{padding:0 0 11px;margin-bottom:11px;border-bottom:1px solid #EEF1F5;display:flex;flex-direction:column;gap:4px}.uj-fact:last-child{border:0;margin:0;padding:0}.uj-fact>span{font-size:10px;color:#8993A1}.uj-fact strong{font-size:11px;font-weight:700;color:#475569;line-height:1.5}.uj-note{grid-column:1/-1;border-top:1px solid var(--border);background:#F7F9FC;padding:13px 24px;display:flex;align-items:start;gap:9px;color:#64748B;font-size:11px;line-height:1.65}.uj-note svg{flex:none;margin-top:1px}
.uj-cta-banner{margin-top:24px;min-height:165px;border-radius:18px;background:#192536;color:white;padding:30px 36px;display:flex;align-items:center;gap:28px;position:relative;overflow:hidden}.uj-cta-decoration{position:absolute;right:27%;top:-14px;opacity:.075;transform:rotate(-8deg);pointer-events:none}.uj-cta-copy{position:relative;flex:1;max-width:720px}.uj-cta-copy>span{font-size:10px;font-weight:800;letter-spacing:1.5px;color:#ff9294}.uj-cta-copy h3{font-size:clamp(20px,2.2vw,27px);letter-spacing:-.8px;margin:9px 0 7px}.uj-cta-copy p{font-size:12px;color:#C4CBD4;line-height:1.7;margin:0}.uj-cta-banner button{position:relative;flex:none;display:flex;align-items:center;gap:15px;background:var(--red);border:1px solid var(--red);border-radius:9px;color:#fff;font-size:12px;font-weight:800;padding:15px 19px;transition:background .2s,transform .2s}.uj-cta-banner button:hover{background:#C91D21;transform:translateY(-2px)}.uj-footnote{display:flex;align-items:start;gap:7px;color:#8993A1;font-size:10px;line-height:1.7;margin:15px 4px 0}.uj-footnote svg{flex:none;margin-top:1px}
@keyframes uj-reveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1050px){.uj-detail{grid-template-columns:1fr}.uj-detail-intro{border-right:0;border-bottom:1px solid var(--border);padding:30px}.uj-detail-content{padding:30px}.uj-photo-card{height:315px}}
@media(max-width:760px){.uj-section{padding:70px 18px}.uj-heading{display:block}.uj-heading>p{margin-top:20px;max-width:600px}.uj-gallery{grid-template-columns:1fr;gap:12px}.uj-photo-card{height:240px}.uj-card-info{bottom:55px}.uj-card-info strong{font-size:30px}.uj-detail-content{grid-template-columns:1fr;gap:30px}.uj-cta-banner{flex-direction:column;align-items:stretch;padding:27px}.uj-cta-banner button{justify-content:center}.uj-heading h2{letter-spacing:-1.7px}}
@media(max-width:420px){.uj-section{padding:56px 15px}.uj-detail-intro,.uj-detail-content{padding:24px}.uj-photo-card{height:220px}.uj-card-info{left:20px}.uj-card-info strong{font-size:28px}}
@media(prefers-reduced-motion:reduce){.uj-section *{animation:none!important;transition:none!important}}
`;
