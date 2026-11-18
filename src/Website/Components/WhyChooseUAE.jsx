// import React from 'react';
// import { ArrowUpRight, BadgeCheck, Building2, ClipboardCheck, Compass, FileCheck2, Headphones, MoveUpRight, ShieldCheck, Sparkles } from 'lucide-react';

// /** Standalone section. Pass onConsultationClick to scroll to your lead form or open a booking flow. */
// export default function WhyChooseUAE({ onConsultationClick }) {
//   const benefits = [
//     { icon: Compass, number: '01', title: 'The right setup for your goals', text: 'Understand the differences between Mainland, Free Zone, and Offshore options before you make a decision.', tag: 'Tailored guidance' },
//     { icon: FileCheck2, number: '02', title: 'Less paperwork, more clarity', text: 'Know what documents to prepare and what happens next, with guidance at every important step.', tag: 'Documentation support' },
//     { icon: Headphones, number: '03', title: 'Real people, real answers', text: 'Speak with a formation specialist about your business activity, timeline, and questions.', tag: 'Human support' },
//     { icon: ShieldCheck, number: '04', title: 'Decisions made with confidence', text: 'Get a clear picture of your available options and the process before moving forward.', tag: 'No-pressure approach' },
//   ];
//   const handleConsultation = () => {
//     if (typeof onConsultationClick === 'function') return onConsultationClick();
//     document.getElementById('uae-lead-name')?.focus();
//   };
//   return (
//     <section className="lc-why" aria-labelledby="lc-why-title">
//       <style>{css}</style>
//       <div className="lc-why-shell">
//         <div className="lc-why-heading">
//           <div className="lc-why-heading-left">
//             <div className="lc-why-eyebrow"><span className="lc-why-dot" /> WHY LEEGAL <span className="lc-why-eyebrow-line" /></div>
//             <h2 id="lc-why-title">Why choose us for your <em>UAE business setup?</em></h2>
//           </div>
//           <div className="lc-why-heading-right">
//             <p>Starting a business in a new country can feel complicated. We make the journey easier to understand, with practical guidance built around your plans.</p>
//             <button type="button" className="lc-why-link" onClick={handleConsultation}>Discuss your business idea <ArrowUpRight size={18} /></button>
//           </div>
//         </div>

//         <div className="lc-why-grid">
//           <div className="lc-why-feature">
//             <div className="lc-why-feature-top"><span className="lc-why-feature-label"><Sparkles size={14} /> THE LEEGAL APPROACH</span><span className="lc-why-feature-sun" aria-hidden="true" /></div>
//             <div className="lc-why-illustration" aria-hidden="true">
//               <div className="lc-why-illustration-orbit orbit-one" /><div className="lc-why-illustration-orbit orbit-two" />
//               <div className="lc-why-document"><div className="lc-why-doc-icon"><Building2 size={23} /></div><div className="lc-why-doc-lines"><i /><i /><i /></div><span className="lc-why-doc-check"><BadgeCheck size={23} /></span></div>
//               <div className="lc-why-mini-card"><span><ClipboardCheck size={16} /></span><div><strong>Business setup</strong><small>Step-by-step guidance</small></div><BadgeCheck size={17} /></div>
//               <div className="lc-why-spark spark-one">✦</div><div className="lc-why-spark spark-two">✧</div>
//             </div>
//             <div className="lc-why-feature-bottom"><span>BUILT AROUND YOUR BUSINESS</span><h3>From your first question to your next big step.</h3><p>Clear direction, useful support, and a smoother path toward establishing your company in the UAE.</p></div>
//           </div>
//           <div className="lc-why-cards">
//             {benefits.map(({ icon: Icon, number, title, text, tag }) => <article className="lc-why-card" key={number}>
//               <div className="lc-why-card-head"><span className="lc-why-icon"><Icon size={23} strokeWidth={1.8} /></span><span className="lc-why-number">{number} / 04</span></div>
//               <h3>{title}</h3><p>{text}</p><div className="lc-why-card-foot"><span><BadgeCheck size={14} />{tag}</span><MoveUpRight size={17} /></div>
//             </article>)}
//           </div>
//         </div>
//         <div className="lc-why-footer"><span><span className="lc-why-footer-star">✳</span> Your business deserves a thoughtful start.</span><button type="button" onClick={handleConsultation}>Get free initial guidance <ArrowUpRight size={18} /></button></div>
//       </div>
//     </section>
//   );
// }

// const css = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
// .lc-why{--red:#ed2027;--ink:#1b283c;--muted:#64748b;--line:#ece6e1;position:relative;overflow:hidden;background:#fff;color:var(--ink);font-family:'DM Sans',sans-serif;padding:108px 24px 94px}
// .lc-why *{box-sizing:border-box}.lc-why button{font:inherit;cursor:pointer}.lc-why button:focus-visible{outline:3px solid #ed202766;outline-offset:3px}
// .lc-why:before{content:'';position:absolute;width:620px;height:620px;border:1px solid #e9d9ca;border-radius:50%;top:-480px;right:-190px;pointer-events:none}.lc-why:after{content:'';position:absolute;width:340px;height:340px;border:1px solid #f0e3d8;border-radius:50%;bottom:-280px;left:-180px;pointer-events:none}
// .lc-why-shell{max-width:1320px;margin:auto;position:relative;z-index:1}.lc-why-heading{display:grid;grid-template-columns:1.15fr .7fr;gap:90px;align-items:end;margin-bottom:44px}.lc-why-eyebrow{display:flex;align-items:center;gap:10px;color:#bc3a39;font-weight:800;letter-spacing:1.8px;font-size:11px;margin-bottom:23px}.lc-why-dot{width:8px;height:8px;background:var(--red);border-radius:50%;box-shadow:0 0 0 5px #fce7e6}.lc-why-eyebrow-line{height:1px;width:48px;background:#eac5bc}.lc-why-heading h2{font-size:clamp(39px,4.1vw,62px);line-height:1.12;letter-spacing:-2.7px;margin:0;font-weight:800;max-width:770px}.lc-why-heading h2 em{font-style:normal;color:var(--red)}.lc-why-heading-right{padding-bottom:7px}.lc-why-heading-right p{font-size:15px;line-height:1.85;color:#637084;margin:0 0 20px}.lc-why-link{border:0;background:none;padding:0;color:var(--ink);font-size:13px!important;font-weight:800!important;display:inline-flex;align-items:center;gap:12px}.lc-why-link svg{color:var(--red);transition:transform .25s}.lc-why-link:hover svg{transform:translate(3px,-3px)}
// .lc-why-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:20px;align-items:stretch}.lc-why-feature{min-height:566px;border-radius:24px;background:linear-gradient(155deg,#f9eee8 0%,#f7f1e9 51%,#f3e9de 100%);border:1px solid #e9ded4;overflow:hidden;position:relative;display:flex;flex-direction:column;padding:29px 32px 35px}.lc-why-feature:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 75% 35%,#fff8edaa,transparent 42%);pointer-events:none}.lc-why-feature-top,.lc-why-feature-bottom,.lc-why-illustration{position:relative;z-index:1}.lc-why-feature-top{display:flex;justify-content:space-between;align-items:center}.lc-why-feature-label{font-size:10px;letter-spacing:1.3px;font-weight:800;color:#9b6e59;display:flex;align-items:center;gap:8px}.lc-why-feature-sun{width:26px;height:26px;border:1px solid #d9bca8;border-radius:50%;position:relative}.lc-why-feature-sun:after{content:'';position:absolute;inset:7px;background:#c99878;border-radius:50%}.lc-why-illustration{height:270px;display:grid;place-items:center}.lc-why-illustration-orbit{position:absolute;border:1px solid #d7bba98c;border-radius:50%;width:320px;height:210px;transform:rotate(-22deg)}.orbit-two{width:245px;height:245px;border-style:dashed;animation:lcWhyRotate 60s linear infinite}.lc-why-document{position:relative;width:180px;height:202px;border-radius:16px;background:#fffefa;border:1px solid #e8d7c8;box-shadow:0 22px 48px #82654c24;transform:rotate(-7deg);padding:25px;animation:lcWhyFloat 5s ease-in-out infinite}.lc-why-doc-icon{width:49px;height:49px;border-radius:12px;background:#fce9e5;color:var(--red);display:grid;place-items:center}.lc-why-doc-lines{display:grid;gap:10px;margin-top:25px}.lc-why-doc-lines i{height:6px;border-radius:10px;background:#eaded3}.lc-why-doc-lines i:nth-child(2){width:75%}.lc-why-doc-lines i:nth-child(3){width:55%}.lc-why-doc-check{position:absolute;right:-17px;top:60px;width:43px;height:43px;display:grid;place-items:center;background:#fff;border:1px solid #f1ded2;border-radius:13px;color:#bb825f;box-shadow:0 9px 24px #a27b5930}.lc-why-mini-card{position:absolute;bottom:11px;right:0;background:#fff;border:1px solid #eaded5;box-shadow:0 12px 30px #7b574b21;border-radius:12px;padding:12px 13px;display:flex;align-items:center;gap:10px;animation:lcWhyFloat 5s ease-in-out -2s infinite}.lc-why-mini-card>span{width:33px;height:33px;display:grid;place-items:center;background:#fff0e7;color:#a77753;border-radius:9px}.lc-why-mini-card strong,.lc-why-mini-card small{display:block}.lc-why-mini-card strong{font-size:11px}.lc-why-mini-card small{font-size:9px;color:#8a95a3;margin-top:3px}.lc-why-mini-card>svg{color:#b38b67;margin-left:9px}.lc-why-spark{position:absolute;color:#b88b67;font-size:25px;animation:lcWhyTwinkle 4s ease-in-out infinite}.spark-one{left:18%;top:25%}.spark-two{right:18%;top:20%;animation-delay:1.4s}.lc-why-feature-bottom{margin-top:auto;max-width:440px}.lc-why-feature-bottom>span{font-size:10px;font-weight:800;letter-spacing:1.3px;color:#ad8065}.lc-why-feature-bottom h3{font-size:clamp(25px,2.4vw,34px);line-height:1.2;letter-spacing:-1.2px;margin:12px 0 11px}.lc-why-feature-bottom p{font-size:13px;line-height:1.75;color:#796e6b;margin:0}
// .lc-why-cards{display:grid;grid-template-columns:1fr 1fr;gap:18px}.lc-why-card{background:#fff;border:1px solid #eae7e4;border-radius:19px;padding:27px 25px 21px;display:flex;flex-direction:column;min-height:268px;transition:transform .25s,border-color .25s,box-shadow .25s}.lc-why-card:hover{transform:translateY(-5px);border-color:#e5c9bd;box-shadow:0 18px 45px #4936280b}.lc-why-card-head{display:flex;align-items:start;justify-content:space-between}.lc-why-icon{width:48px;height:48px;border-radius:13px;display:grid;place-items:center;background:#fff3f0;color:#e14b42;border:1px solid #f8e5df}.lc-why-card:nth-child(2) .lc-why-icon{background:#f9f1e7;color:#b8864d;border-color:#f0e3d2}.lc-why-card:nth-child(3) .lc-why-icon{background:#f0f3f9;color:#697b9d;border-color:#e5eaf3}.lc-why-card:nth-child(4) .lc-why-icon{background:#f6f0f6;color:#987496;border-color:#ece2ec}.lc-why-number{font-size:10px;color:#b0a8a2;font-weight:800;letter-spacing:1px}.lc-why-card h3{font-size:18px;line-height:1.3;letter-spacing:-.5px;margin:21px 0 9px}.lc-why-card p{font-size:12.5px;line-height:1.75;color:#788393;margin:0 0 19px}.lc-why-card-foot{margin-top:auto;border-top:1px solid #f0efed;padding-top:14px;display:flex;align-items:center;justify-content:space-between;color:#a0a6af}.lc-why-card-foot span{display:flex;align-items:center;gap:7px;font-size:10px;font-weight:700;color:#69778b}.lc-why-card-foot span svg{color:#b28b72}.lc-why-footer{margin-top:27px;display:flex;align-items:center;justify-content:space-between;gap:18px}.lc-why-footer>span{font-size:13px;color:#6b7582;font-weight:600;display:flex;align-items:center;gap:10px}.lc-why-footer-star{font-size:19px;color:#c79d79}.lc-why-footer button{display:flex;align-items:center;gap:13px;border:1px solid var(--red);border-radius:10px;background:var(--red);color:#fff;padding:14px 19px;font-size:12px;font-weight:800;transition:background .2s,transform .2s}.lc-why-footer button:hover{background:#d41c22;transform:translateY(-2px)}
// @keyframes lcWhyFloat{0%,100%{transform:translateY(0) rotate(-7deg)}50%{transform:translateY(-9px) rotate(-7deg)}}@keyframes lcWhyTwinkle{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}@keyframes lcWhyRotate{to{transform:rotate(338deg)}}
// @media(max-width:1050px){.lc-why-heading{gap:40px}.lc-why-grid{grid-template-columns:1fr}.lc-why-feature{min-height:500px}.lc-why-cards{grid-template-columns:repeat(2,1fr)}}
// @media(max-width:700px){.lc-why{padding:70px 16px}.lc-why-heading{grid-template-columns:1fr;gap:17px;margin-bottom:30px}.lc-why-heading h2{font-size:clamp(35px,8vw,48px);letter-spacing:-1.8px}.lc-why-heading-right p{font-size:14px}.lc-why-cards{grid-template-columns:1fr}.lc-why-card{min-height:230px}.lc-why-feature{min-height:530px;padding:25px 23px}.lc-why-footer{align-items:flex-start;flex-direction:column}.lc-why-footer button{width:100%;justify-content:center}}
// @media(prefers-reduced-motion:reduce){.lc-why *, .lc-why *:before,.lc-why *:after{animation:none!important;transition:none!important}}
// `;


















import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ClipboardCheck,
  Compass,
  FileText,
  Headphones,
  ShieldCheck,
} from "lucide-react";

/**
 * Leegal UAE company formation — editorial, service-led Why Choose Us section.
 * Pass onConsultationClick to open your enquiry flow.
 * Photography is illustrative, not a claim about Leegal's offices or team.
 */
const benefits = [
  {
    icon: Compass,
    number: "01",
    title: "Advice that starts with your business",
    description:
      "We begin with what you want to do, where you want to operate and how you plan to grow — then help you compare Mainland, Free Zone and Offshore options.",
  },
  {
    icon: FileText,
    number: "02",
    title: "A clearer route through the paperwork",
    description:
      "Understand the documents, approvals and decisions involved in your chosen setup, without having to piece everything together on your own.",
  },
  {
    icon: Headphones,
    number: "03",
    title: "A real conversation, not a generic package",
    description:
      "Ask questions about business activities, licensing, timelines and next steps before committing to a formation route.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Clarity before you make a commitment",
    description:
      "We explain important considerations and help you understand the process, while final licensing and approvals remain with the relevant UAE authorities.",
  },
];

export default function WhyChooseUAE({ onConsultationClick }) {
  const consult = () => {
    if (typeof onConsultationClick === "function") {
      onConsultationClick();
      return;
    }
    document.getElementById("uae-lead-name")?.focus();
  };

  return (
    <section className="leegal-why" aria-labelledby="leegal-why-title">
      <style>{styles}</style>
      <div className="leegal-why-container">
        <div className="leegal-why-heading">
          <div>
            <span className="leegal-why-eyebrow">
              <span className="leegal-why-line" />
              WHY WORK WITH LEEGAL
            </span>
            <h2 id="leegal-why-title">
              Starting a business in the UAE
              <br className="leegal-why-desktop" /> should feel <span>clearer.</span>
            </h2>
          </div>
          <p>
            A new market brings new opportunities — and plenty of decisions.
            We help you understand your options and move forward with a plan
            suited to your business.
          </p>
        </div>

        <div className="leegal-why-layout">
          <div className="leegal-why-visual">
            <div className="leegal-why-main-photo">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85"
                alt="Dubai skyline with modern towers, representing the UAE business landscape"
                loading="lazy"
              />
              <div className="leegal-why-photo-shade" />
              <div className="leegal-why-photo-label">
                <span className="leegal-why-photo-dot" />
                UNITED ARAB EMIRATES
              </div>
              <div className="leegal-why-photo-caption">
                <span>YOUR AMBITION. OUR GUIDANCE.</span>
                <strong>Build your next chapter in the UAE.</strong>
              </div>
            </div>

            <div className="leegal-why-photo-footer">
              <div className="leegal-why-footer-icon">
                <ClipboardCheck size={22} strokeWidth={1.7} />
              </div>
              <div>
                <strong>From the first question to the next step</strong>
                <span>Practical guidance through your company setup journey.</span>
              </div>
              <ArrowUpRight size={19} className="leegal-why-footer-arrow" />
            </div>
          </div>

          <div className="leegal-why-content">
            <div className="leegal-why-content-top">
              <span>WHAT MAKES OUR APPROACH DIFFERENT</span>
              <span>01 — 04</span>
            </div>

            <div className="leegal-why-benefits">
              {benefits.map(({ icon: Icon, number, title, description }) => (
                <article className="leegal-why-benefit" key={number}>
                  <span className="leegal-why-benefit-number">{number}</span>
                  <div className="leegal-why-benefit-body">
                    <div className="leegal-why-benefit-title">
                      <span className="leegal-why-benefit-icon">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <h3>{title}</h3>
                    </div>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="leegal-why-consult">
              <div>
                <span className="leegal-why-consult-kicker">
                  <Check size={15} /> FREE INITIAL GUIDANCE
                </span>
                <h3>Have a business idea? Let's talk about the right setup.</h3>
                <p>Tell us what you have in mind. We'll help you explore the next steps.</p>
              </div>
              <button type="button" onClick={consult}>
                Speak to our team <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <p className="leegal-why-note">
          * Company setup requirements vary by activity, jurisdiction and authority.
          Guidance does not guarantee licensing or approval.
        </p>
      </div>
    </section>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

.leegal-why {
  --lw-red: #EA2024;
  --lw-ink: #192536;
  --lw-muted: #64748B;
  --lw-line: #E5E9F0;
  background: #FAFBFC;
  color: var(--lw-ink);
  font-family: 'DM Sans', sans-serif;
  padding: 100px 24px 90px;
}
.leegal-why * { box-sizing: border-box; }
.leegal-why button { font: inherit; cursor: pointer; }
.leegal-why button:focus-visible { outline: 3px solid #EA202466; outline-offset: 4px; }
.leegal-why-container { max-width: 1280px; margin: 0 auto; }
.leegal-why-heading {
  display: grid;
  grid-template-columns: 1.5fr .72fr;
  align-items: end;
  gap: 64px;
  margin-bottom: 40px;
}
.leegal-why-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--lw-red);
  margin-bottom: 22px;
}
.leegal-why-line { width: 28px; height: 2px; background: var(--lw-red); }
.leegal-why-heading h2 {
  font-size: clamp(36px, 4.25vw, 58px);
  line-height: 1.14;
  letter-spacing: -2.3px;
  margin: 0;
  font-weight: 800;
}
.leegal-why-heading h2 span { color: var(--lw-red); }
.leegal-why-heading > p {
  color: var(--lw-muted);
  font-size: 14px;
  line-height: 1.85;
  margin: 0 0 6px;
}
.leegal-why-layout {
  display: grid;
  grid-template-columns: .94fr 1.06fr;
  gap: 28px;
  align-items: stretch;
}
.leegal-why-visual { min-width: 0; display: flex; flex-direction: column; }
.leegal-why-main-photo {
  position: relative;
  flex: 1;
  min-height: 650px;
  overflow: hidden;
  border-radius: 13px;
  background: #DCE2E8;
}
.leegal-why-main-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% center;
  transition: transform .8s cubic-bezier(.2,.8,.2,1);
}
.leegal-why-main-photo:hover img { transform: scale(1.045); }
.leegal-why-photo-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,rgba(14,24,38,.22) 0%,transparent 38%,rgba(13,24,38,.85) 100%);
}
.leegal-why-photo-label {
  position: absolute;
  top: 26px;
  left: 26px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: rgba(255,255,255,.95);
  padding: 11px 14px;
  border-radius: 5px;
  color: #263447;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.1px;
}
.leegal-why-photo-dot { background: var(--lw-red); width: 7px; height: 7px; border-radius: 50%; }
.leegal-why-photo-caption {
  position: absolute;
  left: 35px;
  right: 35px;
  bottom: 39px;
  color: #fff;
  display: grid;
  gap: 13px;
}
.leegal-why-photo-caption > span { font-size: 10px; font-weight: 800; letter-spacing: 1.7px; color: #F0F2F6; }
.leegal-why-photo-caption strong { font-size: clamp(26px,2.8vw,38px); line-height: 1.2; letter-spacing: -1px; max-width: 400px; }
.leegal-why-photo-footer {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 21px 4px 4px;
}
.leegal-why-footer-icon {
  display: grid; place-items: center;
  flex: 0 0 44px; height: 44px;
  background: #FFF1F2; color: var(--lw-red);
  border-radius: 9px;
}
.leegal-why-photo-footer > div:nth-child(2) { flex: 1; }
.leegal-why-photo-footer strong { display: block; font-size: 13px; font-weight: 800; }
.leegal-why-photo-footer span { display: block; margin-top: 5px; color: var(--lw-muted); font-size: 11px; line-height: 1.5; }
.leegal-why-footer-arrow { color: var(--lw-red); }
.leegal-why-content {
  min-width: 0;
  background: #fff;
  border: 1px solid var(--lw-line);
  border-radius: 13px;
  padding: 30px 34px 32px;
  display: flex;
  flex-direction: column;
}
.leegal-why-content-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--lw-line);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.1px;
  color: #7C8798;
}
.leegal-why-benefits { flex: 1; }
.leegal-why-benefit {
  display: grid;
  grid-template-columns: 37px 1fr;
  gap: 14px;
  padding: 25px 0 24px;
  border-bottom: 1px solid #EDF0F4;
}
.leegal-why-benefit-number { font-size: 12px; color: #9BA4B1; font-weight: 800; padding-top: 9px; }
.leegal-why-benefit-title { display: flex; gap: 13px; align-items: center; }
.leegal-why-benefit-icon {
  width: 39px; height: 39px;
  display: grid; place-items: center;
  flex: 0 0 39px;
  border: 1px solid #F6D7D9;
  border-radius: 8px;
  background: #FFF5F5;
  color: var(--lw-red);
}
.leegal-why-benefit-title h3 { font-size: 17px; font-weight: 800; letter-spacing: -.45px; margin: 0; line-height: 1.35; }
.leegal-why-benefit-body p { font-size: 12.5px; color: var(--lw-muted); line-height: 1.8; margin: 10px 0 0 52px; }
.leegal-why-consult {
  margin-top: 27px;
  background: #192536;
  border-radius: 10px;
  padding: 26px;
  color: #fff;
}
.leegal-why-consult-kicker { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 1px; font-weight: 800; color: #E3E8F0; }
.leegal-why-consult-kicker svg { color: #FF7578; }
.leegal-why-consult h3 { font-size: 20px; line-height: 1.35; letter-spacing: -.5px; margin: 12px 0 8px; }
.leegal-why-consult p { font-size: 12px; line-height: 1.65; color: #BEC8D5; margin: 0 0 20px; }
.leegal-why-consult button {
  display: inline-flex; align-items: center; justify-content: center; gap: 17px;
  padding: 13px 18px; background: var(--lw-red); border: 1px solid var(--lw-red);
  border-radius: 7px; color: #fff; font-size: 12px; font-weight: 800;
  transition: background .2s ease, transform .2s ease;
}
.leegal-why-consult button:hover { background: #CC1C20; transform: translateY(-2px); }
.leegal-why-note { margin: 18px 0 0; font-size: 10px; color: #8A94A3; line-height: 1.65; }
@media (max-width: 1050px) {
  .leegal-why-heading { gap: 30px; }
  .leegal-why-layout { grid-template-columns: .9fr 1.1fr; gap: 18px; }
  .leegal-why-content { padding: 25px 23px; }
  .leegal-why-benefit { padding: 20px 0; }
  .leegal-why-benefit-title h3 { font-size: 15px; }
  .leegal-why-main-photo { min-height: 610px; }
}
@media (max-width: 800px) {
  .leegal-why { padding: 70px 20px; }
  .leegal-why-heading { grid-template-columns: 1fr; gap: 16px; }
  .leegal-why-layout { grid-template-columns: 1fr; }
  .leegal-why-main-photo { min-height: 480px; }
  .leegal-why-content { padding: 28px; }
}
@media (max-width: 520px) {
  .leegal-why { padding: 60px 16px; }
  .leegal-why-heading h2 { letter-spacing: -1.5px; }
  .leegal-why-desktop { display: none; }
  .leegal-why-main-photo { min-height: 430px; }
  .leegal-why-photo-caption { left: 22px; right: 22px; bottom: 25px; }
  .leegal-why-photo-label { left: 18px; top: 18px; }
  .leegal-why-content { padding: 22px 18px; }
  .leegal-why-benefit { grid-template-columns: 25px 1fr; gap: 8px; }
  .leegal-why-benefit-title { gap: 10px; }
  .leegal-why-benefit-title h3 { font-size: 14px; }
  .leegal-why-benefit-body p { margin-left: 0; }
  .leegal-why-consult { padding: 22px; }
  .leegal-why-consult button { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .leegal-why *, .leegal-why *::before, .leegal-why *::after {
    animation: none !important; transition: none !important;
  }
}
`;
