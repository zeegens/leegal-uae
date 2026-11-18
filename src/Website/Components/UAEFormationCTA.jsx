import React from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';

/**
 * Premium UAE company formation CTA for Leegal.
 * Replace portraitSrc with your licensed portrait or approved team photography.
 * onConsultationClick connects to the existing lead form.
 */
export default function UAEFormationCTA({
  onConsultationClick,
  onCallClick,
  // portraitSrc = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1100&q=85',
  portraitSrc = '/images/Leegal-UAE-CTA.webp',
}) {
  const consult = () => {
    if (typeof onConsultationClick === 'function') return onConsultationClick();
    document.getElementById('uae-lead-name')?.focus();
  };
  return (
    <section className="lcta-section" aria-labelledby="lcta-heading">
      <style>{styles}</style>
      <div className="lcta-shell">
        <div className="lcta-panel">
          <div className="lcta-grain" aria-hidden="true" />
          <div className="lcta-red-bar" aria-hidden="true" />
          <div className="lcta-arc lcta-arc-one" aria-hidden="true" />
          <div className="lcta-arc lcta-arc-two" aria-hidden="true" />
          <div className="lcta-content">
            <div className="lcta-eyebrow"><span className="lcta-pulse" /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h2 id="lcta-heading">Your UAE business<br />starts with <em>one<br className="lcta-break" /> conversation.</em></h2>
            <p>From choosing the right jurisdiction to understanding licensing and paperwork, our team can help you plan your next move with clarity.</p>
            <div className="lcta-points">
              <span><CheckCircle2 size={16} /> Mainland, Free Zone & Offshore guidance</span>
              <span><CheckCircle2 size={16} /> A setup plan shaped around your business</span>
            </div>
            <div className="lcta-actions">
              <button className="lcta-primary" type="button" onClick={consult}>Get a free consultation <ArrowUpRight size={19} /></button>
              {onCallClick && <button className="lcta-secondary" type="button" onClick={onCallClick}><PhoneCall size={17} /> Request a call</button>}
            </div>
            <div className="lcta-reassurance"><ShieldCheck size={16} /> No obligation to proceed · Talk to a real formation specialist</div>
          </div>
          <div className="lcta-portrait-wrap" aria-hidden="true">
            <div className="lcta-portrait-halo" />
            <img className="lcta-portrait" src={portraitSrc} alt="" loading="lazy" />
            <div className="lcta-portrait-fade" />
          </div>
          <div className="lcta-side-caption" aria-hidden="true">LEEGAL <span /> UAE COMPANY FORMATION</div>
        </div>
        <div className="lcta-bottom">
          <span>Build with a clearer plan. Move forward with confidence.</span>
          <button type="button" onClick={consult}>Let's discuss your business <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.lcta-section{--red:#EA2024;--navy:#192536;font-family:'DM Sans',sans-serif;background:#FAFBFC;color:var(--navy);padding:95px 24px 90px}
.lcta-section *{box-sizing:border-box}.lcta-section button{font:inherit;cursor:pointer}.lcta-section button:focus-visible{outline:3px solid #EA202480;outline-offset:4px}
.lcta-shell{max-width:1280px;margin:auto}.lcta-panel{position:relative;isolation:isolate;min-height:590px;border-radius:18px;background:linear-gradient(118deg,#172437 0%,#192536 54%,#26354a 100%);color:#fff;overflow:hidden;display:flex;align-items:center;box-shadow:0 26px 70px #1925361c}
.lcta-panel:before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 72% 36%,#FFFFFF10,transparent 48%)}
.lcta-grain{position:absolute;inset:0;pointer-events:none;opacity:.16;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(90deg,transparent 25%,black)}
.lcta-red-bar{position:absolute;top:0;left:0;width:90px;height:5px;background:var(--red)}
.lcta-arc{position:absolute;border:1px solid #ffffff18;border-radius:50%;pointer-events:none;animation:lcta-breathe 9s ease-in-out infinite}
.lcta-arc-one{width:720px;height:720px;right:-125px;top:-115px}.lcta-arc-two{width:545px;height:545px;right:-37px;top:-26px;animation-delay:-4s}
.lcta-content{position:relative;z-index:4;width:62%;padding:78px 0 72px 72px}
.lcta-eyebrow{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:800;letter-spacing:1.55px;color:#D9E0E9;margin-bottom:27px}
.lcta-pulse{width:9px;height:9px;background:var(--red);border-radius:50%;box-shadow:0 0 0 6px #EA20242a;animation:lcta-pulse 3s ease-in-out infinite}
.lcta-content h2{font-size:clamp(42px,4.5vw,66px);font-weight:800;letter-spacing:-2.7px;line-height:1.11;margin:0 0 24px;max-width:700px}
.lcta-content h2 em{font-style:normal;color:#FF565B}.lcta-content>p{font-size:14px;line-height:1.85;color:#CBD3DE;max-width:535px;margin:0 0 25px}
.lcta-points{display:grid;gap:11px;margin-bottom:32px}.lcta-points span{display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;color:#F0F3F7}.lcta-points svg{color:#FF666B;flex:none}
.lcta-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.lcta-primary,.lcta-secondary{min-height:52px;display:inline-flex;justify-content:center;align-items:center;gap:16px;padding:14px 20px;border-radius:7px;font-size:13px!important;font-weight:800!important;transition:transform .25s,background .25s,border-color .25s}
.lcta-primary{background:var(--red);color:white;border:1px solid var(--red)}.lcta-primary:hover{background:#CA1D21;transform:translateY(-3px)}
.lcta-secondary{background:#FFFFFF0C;color:white;border:1px solid #FFFFFF40}.lcta-secondary:hover{background:#FFFFFF1C;transform:translateY(-3px)}
.lcta-reassurance{display:flex;align-items:center;gap:8px;color:#AEBAC9;font-size:11px;margin-top:23px}.lcta-reassurance svg{flex:none}
.lcta-portrait-wrap{position:absolute;z-index:2;right:0;bottom:0;top:0;width:46%;overflow:hidden;pointer-events:none}
.lcta-portrait-halo{position:absolute;z-index:0;right:-55px;bottom:-155px;width:660px;height:660px;border-radius:50%;background:radial-gradient(circle,#58677A80 0%,#34435975 52%,transparent 72%);animation:lcta-breathe 8s ease-in-out infinite}
.lcta-portrait{position:absolute;z-index:1;right:0;bottom:0;width:100%;height:100%;object-fit:cover;object-position:54% 25%;filter:saturate(.82) contrast(1.04);mask-image:linear-gradient(90deg,transparent 0%,#000 20%,#000 100%)}
.lcta-portrait-fade{position:absolute;z-index:2;inset:0;background:linear-gradient(90deg,#192536 0%,transparent 33%),linear-gradient(0deg,#192536e6 0%,transparent 25%)}
.lcta-side-caption{position:absolute;z-index:3;right:29px;bottom:26px;display:flex;align-items:center;gap:10px;color:#F2F5F8;font-size:10px;font-weight:800;letter-spacing:1.6px}.lcta-side-caption span{height:1px;width:24px;background:#FF565B}
.lcta-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 4px 0;color:#667184;font-size:12px;font-weight:600}
.lcta-bottom button{display:inline-flex;align-items:center;gap:9px;border:0;background:none;color:var(--red);font-size:12px;font-weight:800;transition:gap .2s}.lcta-bottom button:hover{gap:15px}
@keyframes lcta-pulse{0%,100%{box-shadow:0 0 0 6px #EA20242a}50%{box-shadow:0 0 0 11px #EA202408}}
@keyframes lcta-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
@media(max-width:1050px){.lcta-content{width:68%;padding-left:46px}.lcta-portrait-wrap{width:45%}.lcta-content h2{font-size:clamp(38px,5vw,56px)}}
@media(max-width:760px){.lcta-section{padding:65px 16px}.lcta-panel{min-height:0;display:block}.lcta-content{width:100%;padding:45px 28px 355px}.lcta-content h2{font-size:clamp(36px,7vw,53px)}.lcta-portrait-wrap{width:100%;height:330px;top:auto;bottom:0}.lcta-portrait{width:100%;object-position:center 24%;mask-image:linear-gradient(0deg,#000 0%,#000 65%,transparent 100%)}.lcta-portrait-fade{background:linear-gradient(180deg,#192536 0%,transparent 48%),linear-gradient(0deg,#192536b0 0%,transparent 20%)}.lcta-portrait-halo{right:0;bottom:-300px}.lcta-side-caption{bottom:17px;right:18px}.lcta-bottom{align-items:flex-start;flex-direction:column;gap:10px}}
@media(max-width:430px){.lcta-content{padding:38px 21px 330px}.lcta-content h2{font-size:36px;letter-spacing:-1.5px}.lcta-break{display:none}.lcta-eyebrow{font-size:9px;letter-spacing:1px}.lcta-actions{display:grid}.lcta-primary,.lcta-secondary{width:100%}.lcta-reassurance{font-size:10px;line-height:1.6}.lcta-portrait-wrap{height:305px}}
@media(prefers-reduced-motion:reduce){.lcta-section *{animation:none!important;transition:none!important}}
`;
