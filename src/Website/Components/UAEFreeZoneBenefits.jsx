import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Info, MapPin } from 'lucide-react';

/**
 * Leegal UAE — Free Zone Benefits
 * A photographic, editorial section intentionally different from WhyChooseUAE.
 * All styles are scoped and embedded. No animation or UI libraries required.
 * onConsultationClick receives 'freezone'.
 */
const benefits = [
    {
        no: '01',
        title: 'Full foreign ownership',
        body: 'Free zone companies generally allow 100% foreign ownership, giving international founders control of their business without a UAE shareholder.'
    },
    {
        no: '02',
        title: 'Built for international trade',
        body: 'Many zones support import, export, consulting and digital services, making them a practical base for businesses with customers beyond the UAE.'
    },
    {
        no: '03',
        title: 'Workspace to match your plans',
        body: 'Depending on the zone and licence, choose from flexi-desks and serviced offices to warehouses and dedicated business premises.'
    },
    {
        no: '04',
        title: 'Clear formation pathways',
        body: 'Free zone authorities offer defined routes for licensing and incorporation. Requirements, costs and processing times vary by zone and activity.'
    },
    {
        no: '05',
        title: 'Sector-specific communities',
        body: 'Some zones focus on technology, media, logistics or other industries, with facilities and services designed around those business needs.'
    },
    {
        no: '06',
        title: 'Potential tax efficiencies',
        body: 'Eligible Qualifying Free Zone Persons may access a 0% UAE corporate tax rate on qualifying income, subject to all applicable conditions.'
    }
];

export default function UAEFreeZoneBenefits({ onConsultationClick }) {
    const handleConsultation = () => {
        if (typeof onConsultationClick === 'function') return onConsultationClick('freezone');
        document.getElementById('uae-lead-name')?.focus();
    };

    return (
        <section className="lfz" aria-labelledby="lfz-title">
            <style>{styles}</style>
            <div className="lfz-container">
                <header className="lfz-intro">
                    <div className="lfz-intro-left">
                        <div className="lfz-eyebrow"><span /> UAE FREE ZONE COMPANY FORMATION</div>
                        <h2 id="lfz-title">A place to start.<br /><em>Room to grow.</em></h2>
                    </div>
                    <div className="lfz-intro-right">
                        <p>UAE Free Zones offer a range of business setup options for entrepreneurs, growing companies and international investors. Here’s what makes them worth exploring.</p>
                        <button type="button" onClick={handleConsultation}>Explore free zone options <ArrowUpRight size={17} /></button>
                    </div>
                </header>

                <div className="lfz-photo-banner">
                    <img
                        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85"
                        alt="Modern Dubai skyline representing the UAE business environment"
                        loading="lazy"
                    />
                    <div className="lfz-photo-overlay" />
                    <div className="lfz-photo-top"><MapPin size={15} /> UNITED ARAB EMIRATES</div>
                    <div className="lfz-photo-bottom">
                        <div><span>WHY UAE FREE ZONES?</span><strong>Business-friendly options for ambitious founders.</strong></div>
                        <div className="lfz-photo-index">01 <span>/</span> 06 <small>KEY ADVANTAGES</small></div>
                    </div>
                </div>

                <div className="lfz-list-header">
                    <span>THE ADVANTAGES</span>
                    <p>Six reasons entrepreneurs consider free zone company formation</p>
                </div>

                <div className="lfz-benefit-grid">
                    {benefits.map((benefit) => (
                        <article className="lfz-benefit" key={benefit.no}>
                            <span className="lfz-benefit-no">{benefit.no}<span className="lfz-number-rule" /></span>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.body}</p>
                        </article>
                    ))}
                </div>

                {/* <div className="lfz-bottom">
                    <div className="lfz-bottom-copy">
                        <span className="lfz-bottom-check"><Check size={18} /></span>
                        <div><h3>Not every Free Zone is the same.</h3><p>Tell us your business activity and priorities. We'll help you understand which jurisdictions and licence options may be suitable.</p></div>
                    </div>
                    <button type="button" onClick={handleConsultation}>Talk to a formation specialist <ArrowRight size={18} /></button>
                </div> */}
                <p className="lfz-footnote"><Info size={14} /> Free zone privileges, permitted activities, mainland access, visa eligibility and tax treatment depend on the specific authority, licence and applicable law. A free zone licence does not automatically permit unrestricted mainland operations or guarantee a 0% corporate tax rate.</p>
            </div>
        </section>
    );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.lfz{--red:#EA2024;--navy:#192536;--muted:#64748B;--border:#E5E9F0;background:#fff;color:var(--navy);padding:100px 24px 86px;font-family:'DM Sans',sans-serif}
.lfz *{box-sizing:border-box}.lfz button{font:inherit;cursor:pointer}.lfz button:focus-visible{outline:3px solid #EA202466;outline-offset:4px}
.lfz-container{max-width:1280px;margin:auto}.lfz-intro{display:grid;grid-template-columns:1.2fr .65fr;gap:70px;align-items:end;margin-bottom:38px}
.lfz-eyebrow{display:flex;align-items:center;gap:11px;color:var(--red);font-size:11px;font-weight:800;letter-spacing:1.5px;margin-bottom:19px}.lfz-eyebrow span{width:28px;height:2px;background:var(--red)}
.lfz-intro h2{font-size:clamp(40px,5.2vw,70px);line-height:1.06;letter-spacing:-2.9px;font-weight:800;margin:0}.lfz-intro h2 em{font-style:normal;color:var(--red)}
.lfz-intro-right{padding-bottom:5px}.lfz-intro-right p{font-size:14px;line-height:1.85;color:var(--muted);margin:0 0 17px}.lfz-intro-right button{display:inline-flex;gap:11px;align-items:center;padding:0;border:0;background:transparent;color:var(--navy);font-size:13px;font-weight:800;transition:color .2s}.lfz-intro-right button svg{color:var(--red);transition:transform .2s}.lfz-intro-right button:hover{color:var(--red)}.lfz-intro-right button:hover svg{transform:translate(3px,-3px)}
.lfz-photo-banner{position:relative;height:365px;overflow:hidden;border-radius:9px;background:#27374A}.lfz-photo-banner>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 51%;transition:transform .8s cubic-bezier(.2,.7,.2,1)}.lfz-photo-banner:hover>img{transform:scale(1.035)}
.lfz-photo-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,25,40,.60),rgba(13,25,40,.04) 65%),linear-gradient(0deg,rgba(12,23,36,.84),transparent 70%)}
.lfz-photo-top{position:absolute;top:26px;left:32px;display:flex;gap:8px;align-items:center;color:#fff;font-size:10px;letter-spacing:1.35px;font-weight:800}.lfz-photo-top svg{color:#fff}
.lfz-photo-bottom{position:absolute;left:35px;right:35px;bottom:30px;display:flex;justify-content:space-between;align-items:end;gap:20px;color:#fff}.lfz-photo-bottom>div:first-child{display:flex;flex-direction:column;gap:10px}.lfz-photo-bottom>div:first-child span{font-size:10px;font-weight:800;letter-spacing:1.5px;color:#F0F3F7}.lfz-photo-bottom strong{font-size:clamp(24px,3vw,39px);letter-spacing:-1px;line-height:1.17;max-width:570px}.lfz-photo-index{font-size:30px;font-weight:800;letter-spacing:-1px;white-space:nowrap}.lfz-photo-index>span{font-weight:400;color:#CBD3DE;margin:0 3px}.lfz-photo-index small{display:block;text-align:right;letter-spacing:1.2px;font-size:9px;font-weight:700;margin-top:4px}
.lfz-list-header{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:40px 0 20px;border-bottom:1px solid var(--border)}.lfz-list-header span{font-size:11px;letter-spacing:1.5px;font-weight:800;color:var(--red)}.lfz-list-header p{margin:0;font-size:12px;color:var(--muted)}
.lfz-benefit-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.lfz-benefit{padding:33px 32px 37px 0;min-height:230px;border-bottom:1px solid var(--border);position:relative}.lfz-benefit:nth-child(3n+2),.lfz-benefit:nth-child(3n+3){padding-left:32px;border-left:1px solid var(--border)}.lfz-benefit:nth-last-child(-n+3){border-bottom:0}
.lfz-benefit-no{display:flex;align-items:center;gap:13px;color:var(--red);font-size:12px;font-weight:800;letter-spacing:.6px;margin-bottom:22px}.lfz-number-rule{width:30px;height:1px;background:#E5E9F0}
.lfz-benefit h3{font-size:20px;letter-spacing:-.55px;line-height:1.28;margin:0 0 11px;font-weight:800}.lfz-benefit p{font-size:12.5px;line-height:1.85;color:var(--muted);margin:0;max-width:340px}
.lfz-bottom{background:var(--navy);color:#fff;border-radius:9px;padding:29px 34px;display:flex;align-items:center;gap:30px;justify-content:space-between;margin-top:19px}.lfz-bottom-copy{display:flex;align-items:start;gap:17px;max-width:720px}.lfz-bottom-check{display:grid;place-items:center;flex:0 0 39px;height:39px;border:1px solid #FFFFFF35;border-radius:50%;color:#fff}.lfz-bottom h3{font-size:19px;line-height:1.3;letter-spacing:-.4px;margin:0 0 7px}.lfz-bottom p{color:#C3CBD6;font-size:12px;line-height:1.7;margin:0}.lfz-bottom button{display:inline-flex;align-items:center;justify-content:center;gap:15px;background:var(--red);color:#fff;border:1px solid var(--red);border-radius:6px;padding:15px 20px;white-space:nowrap;font-size:12px;font-weight:800;transition:background .2s,transform .2s}.lfz-bottom button:hover{background:#CA1D21;transform:translateY(-2px)}
.lfz-footnote{display:flex;gap:9px;align-items:flex-start;font-size:10px;line-height:1.7;color:#8792A1;margin:17px 2px 0}.lfz-footnote svg{flex:none;margin-top:1px}
@media(max-width:1000px){.lfz-intro{gap:35px}.lfz-benefit{padding-right:19px}.lfz-benefit:nth-child(3n+2),.lfz-benefit:nth-child(3n+3){padding-left:19px}.lfz-bottom{gap:20px}}
@media(max-width:760px){.lfz{padding:70px 18px}.lfz-intro{grid-template-columns:1fr;gap:16px}.lfz-intro h2{letter-spacing:-1.8px}.lfz-photo-banner{height:300px}.lfz-benefit-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lfz-benefit,.lfz-benefit:nth-child(3n+2),.lfz-benefit:nth-child(3n+3){padding:26px 18px 27px 0;border-left:0;border-bottom:1px solid var(--border)}.lfz-benefit:nth-child(even){padding-left:18px;border-left:1px solid var(--border)}.lfz-benefit:nth-last-child(-n+2){border-bottom:0}.lfz-bottom{align-items:stretch;flex-direction:column}.lfz-bottom button{width:100%}}
@media(max-width:480px){.lfz{padding:58px 15px}.lfz-photo-banner{height:330px}.lfz-photo-top{left:19px;top:19px}.lfz-photo-bottom{left:20px;right:20px;bottom:22px}.lfz-photo-index{display:none}.lfz-list-header{align-items:start;flex-direction:column;gap:7px}.lfz-benefit-grid{grid-template-columns:1fr}.lfz-benefit,.lfz-benefit:nth-child(even),.lfz-benefit:nth-child(3n+2),.lfz-benefit:nth-child(3n+3){padding:24px 0 25px;border-left:0;border-bottom:1px solid var(--border);min-height:0}.lfz-benefit:last-child{border-bottom:0}.lfz-benefit-no{margin-bottom:14px}.lfz-bottom{padding:23px 20px}.lfz-bottom-copy{gap:12px}.lfz-bottom h3{font-size:17px}}
@media(prefers-reduced-motion:reduce){.lfz *,.lfz *::before,.lfz *::after{transition:none!important;animation:none!important}}
`;
