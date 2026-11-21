
import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, CheckCircle2, ChevronDown, ShieldCheck, Building2, Globe2, Headphones, LockKeyhole, Phone, Mail, UserRound, MapPin, Sparkles } from 'lucide-react';
import CountryCodeSelector from './CountryCodeSelector';
import { post_data } from '../../api';


const initial = { fullName: '', email: '', phone: '', countryCode: '+971', formationType: '', message: '' };
const formationOptions = ['Not sure — need guidance', 'Mainland Company', 'Free Zone Company', 'Offshore Company'];
const TARGET_EMAIL = 'uae@leegal.co';

export default function UAEFormationHero({ onLeadSubmit, onConsultation, backgroundImage }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const update = (key, value) => { setForm(v => ({ ...v, [key]: value })); setErrors(e => ({ ...e, [key]: undefined })); if (status !== 'idle') { setStatus('idle'); setFeedback(''); } };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) next.fullName = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number.';
    if (!form.formationType) next.formationType = 'Choose a formation option.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    setFeedback('');

    const formattedPhone = `${form.countryCode} ${form.phone.trim()}`;
    const payload = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: formattedPhone,
      countryCode: form.countryCode,
      rawPhone: form.phone.trim(),
      formationType: form.formationType,
      message: form.message?.trim() || 'No message provided',
      targetEmail: TARGET_EMAIL,
      source: 'uae-formation-hero',
      submittedAt: new Date().toISOString()
    };

    try {
      // 1. If onLeadSubmit callback prop is provided, call it
      if (typeof onLeadSubmit === 'function') {
        try {
          await onLeadSubmit(payload);
        } catch (err) {
          console.warn('onLeadSubmit callback error:', err);
        }
      }

      
      // 2. Attempt backend endpoint if available
      try {
        await post_data('leads', payload);
      } catch {
        // Backend optional in development
      }

      // 3. Send email to uae@leegal.co via FormSubmit API
      try {
        await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New UAE Company Formation Enquiry - ${payload.fullName}`,
            name: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            formationType: payload.formationType,
            message: payload.message,
            _replyto: payload.email,
            _captcha: 'false',
            _template: 'table'
          })
        });
      } catch (fetchErr) {
        console.warn('FormSubmit network error:', fetchErr);
      }

      setStatus('success');
      setFeedback(`Thank you! Your enquiry has been sent to ${TARGET_EMAIL}. Our formation team will be in touch shortly.`);
      setForm(initial);
    } catch (error) {
      setStatus('error');
      setFeedback(error?.message || `We could not submit your enquiry. Please reach us at ${TARGET_EMAIL}.`);
    }
  };
  const focusForm = () => document.getElementById('uae-lead-name')?.focus();
  return (
    <section className="leegal-uae-hero" aria-labelledby="uae-hero-title">
      <style>{styles}</style>
      <div className="uae-ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="uae-left-decor" aria-hidden="true">
        <div className="uae-decor-arch arch-a" /><div className="uae-decor-arch arch-b" />
        <div className="uae-decor-compass"><span>UAE</span><i /></div>
        <div className="uae-decor-stamp">ESTABLISH <span>•</span> GROW <span>•</span> EXPAND</div>
      </div>
      <div className="uae-city-art" aria-hidden="true">
        <div className="uae-city-orbit orbit-one" /><div className="uae-city-orbit orbit-two" />
        <div className="uae-city-sun" />
        <svg className="uae-skyline" viewBox="0 0 1100 400" fill="none" preserveAspectRatio="xMidYMax meet">
          <path d="M0 365H1100" stroke="currentColor" strokeWidth="2" />
          <path d="M30 365V270H92V365M45 270V245H78V270M120 365V225H173V365M134 225V190H158V225M195 365V286H246V365M258 365V175H319V365M272 175V150H305V175M335 365V260H385V365M403 365V120H462V365M418 120V94H447V120M476 365V250H526V365M540 365V220H588V365M600 365V135H651V365M615 135V110H636V135M668 365V275H718V365M731 365V190H780V365M747 190V160H765V190M793 365V252H843V365M854 365V295H903V365M918 365V220H970V365M932 220V195H956V220M988 365V270H1064V365" stroke="currentColor" strokeWidth="2" />
          <path d="M340 365L357 320L370 140L380 115L391 140L405 320L420 365M370 140L380 25L391 140M356 270H404M360 230H400M365 185H396M373 95H387" stroke="currentColor" strokeWidth="2.5" />
          <path d="M42 294H79M42 316H79M42 339H79M136 250H160M136 280H160M136 312H160M274 202H303M274 232H303M274 264H303M419 155H446M419 190H446M419 225H446M616 169H635M616 205H635M747 226H766M747 259H766M932 250H957M932 286H957" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
        </svg>

        <div className="uae-city-floor" />
      </div>
      <div className="uae-content">
        <div className="uae-left">
          <div className="uae-kicker"><span className="uae-kicker-pulse" /> <span>LEEGAL IS NOW IN THE UAE</span> <ArrowUpRight size={14} /></div>
          <div className="uae-mini-label"><MapPin size={14} /> UNITED ARAB EMIRATES <span className="uae-mini-rule" /></div>
          <h1 id="uae-hero-title">Your UAE business<br />starts with the <span>right setup.</span></h1>
          <p className="uae-intro">Have a business idea but not sure where to begin? We help you choose the right UAE company structure, understand the paperwork, and move forward with confidence.</p>
          <div className="uae-journey">
            <div className="uae-journey-heading"><span className="uae-kicker-pulse" /> YOUR BUSINESS SETUP JOURNEY <small>3 guided steps</small></div>
            <div className="uae-journey-grid">
              <div><span><Globe2 size={20} /></span><strong>Choose your setup</strong><small>Mainland, Free Zone or Offshore</small></div>
              <div><span><ShieldCheck size={20} /></span><strong>Prepare documents</strong><small>We guide you through it</small></div>
              <div><span><Building2 size={20} /></span><strong>Launch your business</strong><small>Start your UAE journey</small></div>
            </div>
          </div>
          <div className="uae-chips"><span><CheckCircle2 size={15} /> Personalised guidance</span><span><Headphones size={15} /> Talk to a real expert</span></div>
          <div className="uae-actions">
            <button className="uae-main-action" type="button" onClick={focusForm}>Get free consultation <ArrowRight size={17} /></button>
            <button className="uae-text-action" type="button" onClick={() => typeof onConsultation === 'function' ? onConsultation() : focusForm()}>Explore your options <ArrowUpRight size={17} /></button>
          </div>
          <div className="uae-trust"><CheckCircle2 size={16} /> Personalized setup guidance <span /> No obligation to proceed</div>
        </div>
        <div className="uae-right">
          <div className="uae-form-card">
            <div className="uae-form-topline" />
            <div className="uae-form-header">
              <div className="uae-form-heading"><span className="uae-form-icon"><Sparkles size={20} /></span><div><span className="uae-form-eyebrow">LET'S GET YOU STARTED</span><h2>Start your UAE Company 🇦🇪</h2></div></div>
              <p>Share a few details and our formation team will help you understand your best setup options.</p>
            </div>
            <form onSubmit={submit} noValidate>
              <div className="uae-form-field"><label htmlFor="uae-lead-name">Full name <b>*</b></label><div className="uae-input-wrap"><UserRound size={17} /><input id="uae-lead-name" value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Enter your full name" autoComplete="name" aria-invalid={!!errors.fullName} /></div>{errors.fullName && <small className="uae-error">{errors.fullName}</small>}</div>
              <div className="uae-form-field"><label htmlFor="uae-lead-email">Work email <b>*</b></label><div className="uae-input-wrap"><Mail size={17} /><input id="uae-lead-email" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} /></div>{errors.email && <small className="uae-error">{errors.email}</small>}</div>
              <div className="uae-form-field"><label htmlFor="uae-lead-phone">Phone / WhatsApp <b>*</b></label><div className="uae-phone-wrap"><CountryCodeSelector value={form.countryCode} onChange={code => update('countryCode', code)} onPhoneFocus={() => document.getElementById('uae-lead-phone')?.focus()} id="uae-lead-country" /><span className="uae-phone-divider" /><input id="uae-lead-phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="Your contact number" autoComplete="tel-national" aria-invalid={!!errors.phone} /><Phone size={16} /></div>{errors.phone && <small className="uae-error">{errors.phone}</small>}</div>
              <div className="uae-form-field"><label htmlFor="uae-lead-type">Company formation type <b>*</b></label><div className="uae-select-wrap"><Globe2 size={17} /><select id="uae-lead-type" value={form.formationType} onChange={e => update('formationType', e.target.value)} aria-invalid={!!errors.formationType}><option value="" disabled>Select your preferred setup</option>{formationOptions.map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown className="uae-chevron" size={17} /></div>{errors.formationType && <small className="uae-error">{errors.formationType}</small>}</div>
              <div className="uae-form-field"><label htmlFor="uae-lead-message">Tell us about your business <span>(optional)</span></label><textarea id="uae-lead-message" rows={2} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Business activity, timeline or questions..." /></div>
              <button className="uae-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Submitting your enquiry…' : 'Get my free consultation'}<ArrowUpRight size={19} /></button>
              {feedback && <div className={`uae-feedback ${status}`} role="status">{status === 'success' && <CheckCircle2 size={17} />}<span>{feedback}</span></div>}
              <p className="uae-form-privacy"><LockKeyhole size={13} /> Your details are used to respond to your enquiry.</p>
            </form>
          </div>
          <div className="uae-form-under"><span><Check size={14} /> Free initial guidance</span><span><Check size={14} /> No obligation</span></div>
        </div>
      </div>
      <div className="uae-bottom-marker" aria-hidden="true"><span>LEEGAL</span><span>UAE COMPANY FORMATION</span><span>01 / 01</span></div>
    </section>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.leegal-uae-hero{--red:#EA2024;position:relative;isolation:isolate;min-height:760px;overflow:hidden;background:#eaf0f3;color:#1e293b;font-family:'DM Sans',sans-serif}
.leegal-uae-hero *{box-sizing:border-box}.leegal-uae-hero button,.leegal-uae-hero input,.leegal-uae-hero select,.leegal-uae-hero textarea{font:inherit}.leegal-uae-hero button{cursor:pointer}.leegal-uae-hero button:focus-visible,.leegal-uae-hero input:focus-visible,.leegal-uae-hero select:focus-visible,.leegal-uae-hero textarea:focus-visible{outline:3px solid #ea202470;outline-offset:2px}
.uae-bg{position:absolute;inset:0;z-index:-3;background-image:var(--uae-bg-image);background-size:cover;background-position:center 42%;transform:scale(1.025);animation:uaeBgIn 1.4s ease-out both}
.uae-bg-wash{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(250,252,253,.98) 0%,rgba(250,252,253,.95) 30%,rgba(249,251,252,.79) 48%,rgba(242,248,251,.38) 66%,rgba(235,244,249,.25) 100%),linear-gradient(0deg,rgba(247,250,251,.58),transparent 30%)}
.uae-content{max-width:1450px;margin:auto;padding:72px 54px 64px;display:grid;grid-template-columns:minmax(0,1.13fr) minmax(380px,.87fr);gap:clamp(35px,5vw,94px);align-items:center;min-height:745px}
.uae-left{max-width:680px;animation:uaeEnter .7s both}.uae-kicker{display:inline-flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid #f6c8c8;border-radius:100px;background:#fff9f9;color:#b92227;font-size:10px;font-weight:800;letter-spacing:1px}.uae-kicker-pulse{width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 0 4px #fbe0e0;animation:uaePulse 2.2s infinite}.uae-mini-label{display:flex;align-items:center;gap:9px;margin:35px 0 14px;color:#566477;font-size:10px;font-weight:800;letter-spacing:1.7px}.uae-mini-label svg{color:var(--red)}.uae-mini-rule{height:1px;width:43px;background:#e0a6a6}
.uae-left h1{margin:0;color:#192536;font-size:clamp(44px,4.3vw,67px);line-height:1.105;letter-spacing:-3.5px;font-weight:800}.uae-left h1 span{color:var(--red)}.uae-left h1 em{font-style:normal;color:#586779}.uae-intro{max-width:550px;color:#586779;font-size:15px;line-height:1.85;margin:24px 0 27px}
.uae-benefits{display:grid;gap:16px}.uae-benefits>div{display:flex;align-items:center;gap:12px}.uae-benefit-icon{width:38px;height:38px;flex:0 0 38px;display:grid;place-items:center;border-radius:10px;background:#fff;border:1px solid #e8ebef;color:var(--red);box-shadow:0 4px 18px #2533480a}.uae-benefits strong,.uae-benefits small{display:block}.uae-benefits strong{font-size:12px;font-weight:800;color:#243146}.uae-benefits small{font-size:11px;color:#6e7b8a;margin-top:3px}
.uae-actions{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:30px}.uae-main-action{display:flex;align-items:center;justify-content:center;gap:16px;padding:15px 19px;border-radius:9px;border:1px solid var(--red);background:var(--red);color:white;font-size:12px!important;font-weight:800!important;transition:background .2s,transform .2s}.uae-main-action:hover{background:#d7191d;transform:translateY(-2px)}.uae-text-action{border:0;background:transparent;color:#29364a;display:flex;align-items:center;gap:9px;font-size:12px!important;font-weight:800!important;padding:12px 0}.uae-text-action:hover{color:var(--red)}.uae-trust{display:flex;align-items:center;gap:9px;margin-top:22px;color:#657487;font-size:10px;font-weight:700}.uae-trust svg{color:#168a5a}.uae-trust>span{width:4px;height:4px;background:#9ca9b6;border-radius:50%}
.uae-right{width:100%;max-width:475px;justify-self:end;animation:uaeEnter .8s .12s both}.uae-form-card{position:relative;overflow:visible!important;background:#fff;border:1px solid #e8eaf0;border-radius:19px;box-shadow:0 22px 75px #17283c2b,0 3px 12px #17283c0a;padding:27px 30px 22px}.uae-form-topline{position:absolute;top:0;left:0;right:0;height:4px;border-radius:19px 19px 0 0;background:linear-gradient(90deg,var(--red),#ff8178 62%,#ffd5d1)}.uae-form-heading{display:flex;align-items:center;gap:12px}.uae-form-icon{width:44px;height:44px;flex:0 0 44px;border-radius:11px;display:grid;place-items:center;color:var(--red);background:#fff0f0;border:1px solid #ffe1e1}.uae-form-eyebrow{display:block;font-size:9px;font-weight:800;letter-spacing:1.2px;color:var(--red)}.uae-form-heading h2{margin:5px 0 0;font-size:21px;letter-spacing:-.7px;line-height:1.25;color:#1f2b3e;font-weight:800}.uae-form-header>p{font-size:11.5px;color:#768293;line-height:1.65;margin:13px 0 20px}
.uae-form-card form{display:grid;gap:13px}.uae-form-field{min-width:0;position:relative}.uae-form-field label{display:block;margin-bottom:7px;font-size:11px;font-weight:800;color:#344155}.uae-form-field label b{color:var(--red)}.uae-form-field label span{color:#9aa4b0;font-weight:500}.uae-input-wrap,.uae-select-wrap,.uae-phone-wrap{height:43px;display:flex;align-items:center;gap:10px;border:1px solid #e3e8ef;border-radius:8px;background:#fcfdff;padding:0 12px;transition:border-color .2s,box-shadow .2s;position:relative}.uae-input-wrap:focus-within,.uae-select-wrap:focus-within,.uae-phone-wrap:focus-within{border-color:#ee989a;box-shadow:0 0 0 3px #ea20240d}.uae-input-wrap>svg,.uae-select-wrap>svg,.uae-phone-wrap>svg{color:#94a0ae;flex-shrink:0}.uae-input-wrap input,.uae-select-wrap select,.uae-phone-wrap input,.uae-phone-wrap select{width:100%;min-width:0;outline:0;border:0;background:transparent;color:#263346;font-size:12px}.uae-input-wrap input::placeholder,.uae-phone-wrap input::placeholder,.uae-form-field textarea::placeholder{color:#a4aebb}.uae-select-wrap select{appearance:none;cursor:pointer}.uae-select-wrap select:invalid{color:#a4aebb}.uae-select-wrap .uae-chevron{pointer-events:none}.uae-phone-wrap{gap:9px}.uae-phone-divider{width:1px;height:20px;background:#e5e9ee;flex-shrink:0}
.uae-country-picker{position:relative;display:flex;align-items:center;flex-shrink:0}
.uae-country-btn{background:transparent;border:0;padding:2px 4px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;color:#263346;font-size:12px;font-weight:600;border-radius:6px;transition:color .15s ease,background .15s ease;user-select:none}
.uae-country-btn:hover{color:var(--red);background:#fff5f5}
.uae-country-code-val{font-size:12px;font-weight:700;color:#263346;letter-spacing:-0.2px}
.uae-country-chevron{color:#94a0ae;transition:transform .2s ease;flex-shrink:0}
.uae-country-chevron.open{transform:rotate(180deg);color:var(--red)}
.uae-country-dropdown{position:absolute;top:calc(100% + 8px);left:0;width:320px;max-width:calc(100vw - 48px);background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 18px 45px rgba(15,23,42,0.18),0 4px 12px rgba(15,23,42,0.06);z-index:9999;display:flex;flex-direction:column;animation:uaeCountryDrop .18s cubic-bezier(0.16,1,0.3,1);overflow:hidden}
@keyframes uaeCountryDrop{from{opacity:0;transform:translateY(-6px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.uae-country-search-wrap{padding:9px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;background:#f8fafc;position:relative}
.uae-country-search-icon{color:#94a0ae;flex-shrink:0}
.uae-country-search-input{border:1px solid #e2e8f0!important;border-radius:6px!important;padding:6px 9px!important;font-size:12px!important;width:100%!important;height:32px!important;outline:0!important;background:#ffffff!important;color:#1e293b!important;box-shadow:none!important}
.uae-country-search-input:focus{border-color:var(--red)!important;box-shadow:0 0 0 2px #ea202418!important}
.uae-country-search-clear{position:absolute;right:18px;border:0;background:#e2e8f0;color:#64748b;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;cursor:pointer;padding:0}
.uae-country-search-clear:hover{background:#cbd5e1;color:#1e293b}
.uae-country-list{max-height:240px;overflow-y:auto;padding:6px 4px}
.uae-country-list::-webkit-scrollbar{width:5px}
.uae-country-list::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
.uae-country-list::-webkit-scrollbar-track{background:transparent}
.uae-country-section-title{font-size:9.5px;font-weight:800;letter-spacing:0.8px;color:#94a0ae;padding:6px 10px 4px;text-transform:uppercase}
.uae-country-section-divider{height:1px;background:#f1f5f9;margin:6px 8px}
.uae-country-item{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:7px;cursor:pointer;font-size:12px;transition:background .12s ease;user-select:none}
.uae-country-item:hover,.uae-country-item.highlighted{background:#f8fafc}
.uae-country-item.selected{background:#fff5f5;color:var(--red);font-weight:600}
.uae-country-item-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#334155;font-size:12px}
.uae-country-item.selected .uae-country-item-name{color:var(--red);font-weight:700}
.uae-country-item-code{font-size:11.5px;font-weight:600;color:#64748b;margin-left:auto;font-variant-numeric:tabular-nums}
.uae-country-item.selected .uae-country-item-code{color:var(--red)}
.uae-country-check{color:var(--red);flex-shrink:0;margin-left:6px}
.uae-country-empty{padding:24px 14px;text-align:center;font-size:12px;color:#94a0ae}
.uae-country-flag-icon img{box-shadow:0 1px 3px rgba(0,0,0,0.15)}.uae-form-field textarea{width:100%;min-height:66px;resize:vertical;border:1px solid #e3e8ef;border-radius:8px;background:#fcfdff;padding:11px 12px;color:#263346;outline:0;font-size:12px}.uae-form-field textarea:focus{border-color:#ee989a;box-shadow:0 0 0 3px #ea20240d}.uae-error{display:block;color:#c62828;font-size:10px;margin-top:4px}.uae-submit{width:100%;display:flex;align-items:center;justify-content:center;gap:13px;padding:14px 18px;background:var(--red);color:white;border:1px solid var(--red);border-radius:9px;font-size:12px!important;font-weight:800!important;transition:background .2s,transform .2s}.uae-submit:hover:not(:disabled){background:#d7191d;transform:translateY(-1px)}.uae-submit:disabled{opacity:.65;cursor:wait}.uae-form-privacy{display:flex;justify-content:center;align-items:center;gap:7px;color:#97a0ae;font-size:9px;margin:0}.uae-form-privacy svg{color:#8d99a8}.uae-feedback{display:flex;gap:8px;align-items:flex-start;font-size:11px;line-height:1.5;border-radius:8px;padding:10px}.uae-feedback.success{background:#effaf3;color:#176a41}.uae-feedback.error{background:#fff3f3;color:#a52b2b}.uae-form-under{display:flex;justify-content:center;gap:22px;margin-top:15px;color:#263d50;font-size:10px;font-weight:800;text-shadow:0 1px 12px #fff}.uae-form-under span{display:flex;align-items:center;gap:5px}.uae-form-under svg{color:#168a5a}
.uae-bottom-marker{position:absolute;bottom:0;left:0;right:0;padding:13px max(54px,calc((100vw - 1340px)/2));display:flex;justify-content:space-between;gap:15px;border-top:1px solid #ffffff85;background:#ffffff5c;backdrop-filter:blur(8px);color:#677487;font-size:9px;font-weight:800;letter-spacing:1.5px}
@keyframes uaeEnter{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes uaePulse{0%,100%{box-shadow:0 0 0 4px #fbe0e0}50%{box-shadow:0 0 0 8px #fbe0e000}}@keyframes uaeBgIn{from{opacity:.75;transform:scale(1.07)}to{opacity:1;transform:scale(1.025)}}
@media(max-width:1100px){.uae-content{grid-template-columns:minmax(0,1fr) minmax(340px,.92fr);gap:25px;padding:55px 28px 68px}.uae-left h1{font-size:clamp(40px,4.5vw,58px);letter-spacing:-2.5px}.uae-form-card{padding:25px 22px 20px}.uae-bottom-marker{padding-left:28px;padding-right:28px}}
@media(max-width:850px){.uae-content{grid-template-columns:1fr;gap:32px;padding:54px 24px 78px}.uae-left{max-width:690px}.uae-right{max-width:570px;justify-self:start}.uae-bg-wash{background:linear-gradient(90deg,#f9fbfdf2,#f9fbfddd 75%,#f9fbfdba)}.uae-form-card{padding:28px}.uae-left h1{font-size:clamp(44px,7vw,65px)}}
@media(max-width:520px){.uae-content{padding:38px 16px 70px;gap:29px}.uae-left h1{font-size:clamp(38px,10vw,51px);letter-spacing:-2.3px}.uae-mini-label{margin-top:26px}.uae-intro{font-size:13px;margin:18px 0 23px}.uae-benefits{gap:13px}.uae-actions{gap:10px;margin-top:23px}.uae-main-action{width:100%}.uae-text-action{width:100%;justify-content:center}.uae-trust{flex-wrap:wrap}.uae-form-card{padding:25px 18px 19px;border-radius:14px}.uae-form-heading h2{font-size:19px}.uae-form-under{gap:13px;flex-wrap:wrap}.uae-bottom-marker{padding:12px 16px;font-size:8px}.uae-bottom-marker span:nth-child(2){display:none}}
@media(prefers-reduced-motion:reduce){.leegal-uae-hero *, .leegal-uae-hero *:before,.leegal-uae-hero *:after{animation:none!important;transition:none!important}}

/* New image-free visual system */
.leegal-uae-hero{background:#f9fafc;background-image:radial-gradient(ellipse at 5% 8%,#ffebeb,transparent 42%),radial-gradient(ellipse at 92% 88%,#eaf0f9,transparent 42%)}
.leegal-uae-hero:before{content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;background-image:linear-gradient(#9da9bb18 1px,transparent 1px),linear-gradient(90deg,#9da9bb18 1px,transparent 1px);background-size:44px 44px;mask-image:linear-gradient(90deg,#0009,transparent 85%)}
.uae-ambient{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none}.uae-ambient i{position:absolute;display:block;border-radius:50%;animation:uaeDrift 9s ease-in-out infinite}.uae-ambient i:nth-child(1){width:340px;height:340px;top:-170px;left:-160px;background:radial-gradient(circle,#f7c4c46b,transparent 72%)}.uae-ambient i:nth-child(2){width:480px;height:480px;right:-250px;top:5%;background:radial-gradient(circle,#f3d7d75c,transparent 72%);animation-delay:-3s}.uae-ambient i:nth-child(3){width:350px;height:350px;left:40%;bottom:-250px;background:radial-gradient(circle,#cbdcf16b,transparent 72%);animation-delay:-5s}
.uae-content{grid-template-columns:minmax(0,1.16fr) minmax(380px,.84fr);gap:clamp(30px,4vw,72px)}.uae-left{max-width:720px}.uae-left h1{font-size:clamp(46px,4.5vw,69px);letter-spacing:-3px}.uae-intro{font-size:16px;max-width:590px;line-height:1.8}.uae-mini-label{margin-top:26px}
.uae-journey{max-width:625px;background:#ffffffdf;border:1px solid #e9ebf0;border-radius:19px;padding:22px;box-shadow:0 12px 40px #26344c0b;backdrop-filter:blur(12px)}.uae-journey-heading{display:flex;align-items:center;gap:10px;color:#344154;font-size:10px;font-weight:800;letter-spacing:.8px}.uae-journey-heading small{margin-left:auto;color:#8995a4;font-size:10px;font-weight:600;letter-spacing:0}.uae-journey-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:22px}.uae-journey-grid>div{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:6px}.uae-journey-grid>div:not(:last-child):after{content:"";position:absolute;top:20px;left:54px;width:calc(100% - 43px);border-top:1px dashed #e6b8b8}.uae-journey-grid>div>span{width:43px;height:43px;display:grid;place-items:center;background:#fff0f0;border:1px solid #ffdddd;color:#df2529;border-radius:12px;animation:uaeBob 5s ease-in-out infinite}.uae-journey-grid>div:nth-child(2)>span{animation-delay:-1.5s}.uae-journey-grid>div:nth-child(3)>span{animation-delay:-3s}.uae-journey-grid strong{font-size:12px;color:#263449;line-height:1.4;margin-top:5px}.uae-journey-grid small{font-size:10px;color:#7d8999;line-height:1.5}.uae-chips{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.uae-chips span{display:flex;align-items:center;gap:7px;padding:9px 12px;border:1px solid #e9eaf0;border-radius:100px;background:#fff;color:#4f5c6d;font-size:11px;font-weight:700}.uae-chips svg{color:#d52a2e}.uae-form-card{box-shadow:0 20px 65px #19273b17,0 3px 12px #19273b07}.uae-form-field label{font-size:12px}.uae-input-wrap,.uae-select-wrap,.uae-phone-wrap{height:46px}.uae-input-wrap input,.uae-select-wrap select,.uae-phone-wrap input{font-size:13px}.uae-form-header>p{font-size:12px}
@keyframes uaeDrift{0%,100%{transform:translate(0,0)}50%{transform:translate(25px,-25px)}}@keyframes uaeBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@media(max-width:1100px){.uae-content{grid-template-columns:minmax(0,1fr) minmax(340px,.92fr)}.uae-journey{padding:16px}.uae-journey-grid{gap:10px}.uae-journey-grid strong{font-size:10px}}
@media(max-width:850px){.uae-content{grid-template-columns:1fr}.uae-right{max-width:570px}.uae-left{max-width:700px}}
@media(max-width:520px){.uae-left h1{font-size:clamp(38px,10vw,51px);letter-spacing:-2px}.uae-intro{font-size:14px}.uae-journey{padding:16px 12px}.uae-journey-heading small{display:none}.uae-journey-grid{gap:8px}.uae-journey-grid strong{font-size:10px}.uae-journey-grid small{font-size:9px}.uae-journey-grid>div>span{width:36px;height:36px}.uae-journey-grid>div:not(:last-child):after{top:18px;left:44px;width:calc(100% - 33px)}}
@media(prefers-reduced-motion:reduce){.uae-ambient i,.uae-journey-grid>div>span{animation:none!important}}
/* UAE-specific architectural backdrop: vector skyline, orbit paths and service markers */
.leegal-uae-hero{background:linear-gradient(115deg,#fffafa 0%,#fff 43%,#f3f6fc 100%)}
.leegal-uae-hero:before{opacity:.45;mask-image:linear-gradient(90deg,#0004,transparent 65%)}
.uae-city-art{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none;color:#d5a4a6}
.uae-city-art:before{content:"";position:absolute;width:750px;height:750px;right:-170px;top:-260px;border-radius:50%;background:radial-gradient(circle,#f8d8d8a8 0%,#fbe8e877 34%,transparent 70%)}
.uae-city-orbit{position:absolute;border:1px solid #d9a8ab55;border-radius:50%;right:-180px;top:-250px;width:820px;height:820px;transform:rotate(-22deg);animation:uaeOrbit 35s linear infinite}
.uae-city-orbit:after{content:"";position:absolute;top:17%;left:15%;width:11px;height:11px;border-radius:50%;background:#df5558;box-shadow:0 0 0 9px #ed9b9b33}
.uae-city-orbit.orbit-two{right:-85px;top:-160px;width:630px;height:630px;border-style:dashed;border-color:#d8a6a64d;animation-duration:45s;animation-direction:reverse}
.uae-city-orbit.orbit-two:after{width:7px;height:7px;background:#dfb4b4}
.uae-city-sun{position:absolute;right:16%;bottom:13%;width:230px;height:230px;border-radius:50%;background:radial-gradient(circle,#f4d3d3aa,#f9e5e566 55%,transparent 72%);filter:blur(3px)}
.uae-skyline{position:absolute;width:min(75vw,1120px);height:auto;right:-6%;bottom:22px;opacity:.53;filter:drop-shadow(0 12px 8px #d8b0b020);animation:uaeSkyIn 1.4s ease-out both}
.uae-city-floor{position:absolute;right:0;bottom:0;width:78%;height:110px;background:linear-gradient(0deg,#f6f0f1 0%,#f9f7fa00 100%)}
.uae-art-tag{position:absolute;display:flex;align-items:center;gap:9px;padding:11px 15px;border:1px solid #efdddd;border-radius:12px;background:#ffffffd9;box-shadow:0 10px 35px #9d526011;color:#9d4046;font-size:11px;font-weight:800;backdrop-filter:blur(10px);animation:uaeBob 6s ease-in-out infinite}
.uae-art-tag.tag-one{right:6%;top:14%}.uae-art-tag.tag-two{right:29%;bottom:12%;animation-delay:-2s}
.uae-content{position:relative;z-index:1}.uae-form-card{box-shadow:0 28px 80px #713b4a1c,0 4px 16px #26344c0b;border-color:#f0e4e5}
.uae-journey{background:#ffffffed;border-color:#efdfe0;box-shadow:0 16px 45px #7c46520d}
@keyframes uaeOrbit{to{transform:rotate(338deg)}}@keyframes uaeSkyIn{from{opacity:0;transform:translateY(25px)}to{opacity:.53;transform:translateY(0)}}
@media(max-width:850px){.uae-skyline{width:1100px;right:-350px;opacity:.24}.uae-art-tag{display:none}.uae-city-orbit{opacity:.5}}
@media(max-width:520px){.uae-skyline{width:800px;right:-360px;bottom:30%;opacity:.17}.uae-city-art:before{right:-420px}.uae-city-orbit{right:-490px}.uae-city-orbit.orbit-two{right:-380px}}
@media(prefers-reduced-motion:reduce){.uae-city-orbit,.uae-skyline,.uae-art-tag{animation:none!important}}


/* v4 — richer, intentionally visible architectural composition */
.leegal-uae-hero{background:radial-gradient(ellipse 65% 70% at 3% 52%,#e5f5f2 0%,transparent 76%),radial-gradient(ellipse 43% 57% at 96% 13%,#f9e8e3 0%,transparent 78%),linear-gradient(115deg,#fbfefd 0%,#ffffff 47%,#f5f7fc 100%)}
.leegal-uae-hero:before{opacity:.55;background-size:35px 35px;mask-image:linear-gradient(90deg,#0006,transparent 54%)}
.uae-left-decor{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.uae-decor-arch{position:absolute;border:1px solid #6dbbb342;border-radius:48% 48% 0 0;transform:rotate(20deg)}
.uae-decor-arch.arch-a{left:-260px;top:110px;width:580px;height:740px;background:linear-gradient(120deg,#ccece545,transparent 72%);box-shadow:inset 0 0 0 25px #ffffff2e}
.uae-decor-arch.arch-b{left:-205px;top:185px;width:440px;height:630px;border:1px dashed #4aada65c;background:transparent}
.uae-decor-compass{position:absolute;left:24px;top:37%;width:104px;height:104px;border:1px solid #62b8ad6b;border-radius:50%;display:grid;place-items:center;color:#167b76;font-size:13px;font-weight:800;letter-spacing:3px;animation:uaeCompassFloat 8s ease-in-out infinite;background:#ffffff80;box-shadow:0 15px 50px #168a8010}
.uae-decor-compass:before,.uae-decor-compass:after{content:"";position:absolute;inset:11px;border:1px dashed #62b8ad8a;border-radius:50%}.uae-decor-compass:after{inset:-12px;border-color:#62b8ad4a}
.uae-decor-compass i{position:absolute;right:-15px;top:9px;width:12px;height:12px;border-radius:50%;background:#e3ad5b;box-shadow:0 0 0 7px #e3ad5b30}
.uae-decor-stamp{position:absolute;left:33px;bottom:96px;transform:rotate(-90deg);transform-origin:left bottom;color:#238b8278;font-size:10px;font-weight:800;letter-spacing:3px;white-space:nowrap}.uae-decor-stamp span{color:#dfab65}
.uae-city-art{color:#9db9bb}.uae-city-art:before{background:radial-gradient(circle,#f5dedc8a 0%,#f9ece666 36%,transparent 71%)}
.uae-skyline{width:min(100vw,1600px);right:-2%;bottom:12px;opacity:.42;color:#83b5b2;filter:none}
.uae-city-floor{width:100%;height:115px;background:linear-gradient(0deg,#e9f3f15c,transparent)}
.uae-city-orbit{right:-90px;top:-350px;opacity:.72;border-color:#dfa99b55}.uae-city-orbit.orbit-two{right:10px;top:-255px}
.uae-city-sun{right:5%;bottom:8%;background:radial-gradient(circle,#e4cda88a,#f5e8d855 58%,transparent 72%)}
.uae-journey{border-color:#dbe9e7;box-shadow:0 18px 55px #24766d10}.uae-journey-grid>div:nth-child(2)>span{background:#eaf6f2;color:#168b78;border-color:#d3e9e3}.uae-journey-grid>div:nth-child(3)>span{background:#fff5e6;color:#b67c2e;border-color:#f4e2c8}
.uae-chips span:first-child svg{color:#168b78}.uae-chips span:last-child svg{color:#b67c2e}
.uae-form-card{box-shadow:0 30px 80px #253b4d1b,0 5px 18px #253b4d0b}
@keyframes uaeCompassFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@media(max-width:1250px){.uae-decor-compass{left:-40px;opacity:.55}.uae-decor-stamp{display:none}}
@media(max-width:850px){.uae-decor-arch.arch-a{left:-360px}.uae-decor-arch.arch-b{left:-310px}.uae-decor-compass{display:none}.uae-skyline{width:1300px;right:-400px;opacity:.23}}
@media(max-width:520px){.uae-skyline{width:900px;right:-340px;bottom:0;opacity:.15}.uae-decor-arch.arch-a{left:-420px}.uae-decor-arch.arch-b{left:-390px}}
@media(prefers-reduced-motion:reduce){.uae-decor-compass{animation:none!important}}


/* v5 — restrained editorial UAE identity; no green gradients */
.leegal-uae-hero{background:#fbfaf8!important;background-image:none!important}
.leegal-uae-hero:before{opacity:.22!important;background-image:linear-gradient(#c5b6a51a 1px,transparent 1px),linear-gradient(90deg,#c5b6a51a 1px,transparent 1px)!important;background-size:64px 64px!important;mask-image:linear-gradient(90deg,#0007,transparent 62%)!important}
.uae-ambient,.uae-left-decor,.uae-city-orbit,.uae-city-sun,.uae-city-floor,.uae-art-tag{display:none!important}
.uae-city-art{position:absolute!important;inset:0!important;overflow:hidden!important;z-index:0!important;pointer-events:none!important;color:#b6a99c!important}
.uae-city-art:before{content:""!important;position:absolute!important;width:510px!important;height:510px!important;right:-225px!important;top:-245px!important;border:1px solid #d6b88a66!important;border-radius:50%!important;background:none!important;box-shadow:0 0 0 55px #c9aa7c0c,0 0 0 110px #c9aa7c08!important}
.uae-city-art:after{content:"";position:absolute;left:2%;bottom:10%;width:190px;height:190px;border:1px solid #d4c1a866;border-radius:50%;box-shadow:0 0 0 25px #c7a67709,0 0 0 50px #c7a67706;animation:uaeEditorialFloat 9s ease-in-out infinite}
.uae-skyline{position:absolute!important;left:-6%!important;right:auto!important;bottom:2px!important;width:min(69vw,1050px)!important;opacity:.17!important;color:#a78365!important;filter:none!important;animation:uaeSkyIn 1.4s ease-out both!important}
.uae-content{position:relative!important;z-index:1!important}
.uae-left{position:relative}
.uae-left:before{content:"";position:absolute;left:-28px;top:80px;bottom:135px;width:2px;background:linear-gradient(180deg,#c7a16c00,#c7a16c88 35%,#c7a16c00);pointer-events:none}
.uae-journey{background:#ffffffed!important;border:1px solid #e8e1d9!important;box-shadow:0 12px 35px #51402d0b!important}
.uae-journey-grid>div:nth-child(2)>span{background:#f5f1eb!important;color:#8b6b44!important;border-color:#e9dece!important}
.uae-journey-grid>div:nth-child(3)>span{background:#eef1f7!important;color:#415b81!important;border-color:#dce3ed!important}
.uae-chips span:first-child svg{color:#9a7547!important}.uae-chips span:last-child svg{color:#415b81!important}
.uae-form-card{border:1px solid #e9e3dc!important;box-shadow:0 24px 70px #2d354018,0 3px 12px #2d35400a!important}
.uae-form-under{color:#5c6370!important}
@keyframes uaeEditorialFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@media(max-width:850px){.uae-skyline{width:1100px!important;left:-180px!important;opacity:.10!important}.uae-left:before{display:none}}
@media(max-width:520px){.uae-city-art:after{display:none}.uae-skyline{left:-280px!important;opacity:.08!important}}
@media(prefers-reduced-motion:reduce){.uae-city-art:after{animation:none!important}}


/* Subtle service-led motion; approved neutral palette retained */
@keyframes uaeSkyBreathe{0%,100%{opacity:.13;transform:translateY(0)}50%{opacity:.22;transform:translateY(-7px)}}
@keyframes uaeGoldHalo{0%,100%{transform:scale(1);opacity:.65}50%{transform:scale(1.045);opacity:1}}
@keyframes uaeStepReveal{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
@keyframes uaeArrowNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes uaeFormReveal{from{opacity:0;transform:translateY(20px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
.uae-skyline{animation:uaeSkyBreathe 12s ease-in-out infinite!important;will-change:opacity,transform}
.uae-city-art:before{animation:uaeGoldHalo 14s ease-in-out infinite;transform-origin:center}
.uae-journey-grid>div{animation:uaeStepReveal .65s cubic-bezier(.2,.8,.2,1) both}
.uae-journey-grid>div:nth-child(1){animation-delay:.22s}
.uae-journey-grid>div:nth-child(2){animation-delay:.42s}
.uae-journey-grid>div:nth-child(3){animation-delay:.62s}
.uae-journey-grid>div>span{transition:transform .25s ease,box-shadow .25s ease}
.uae-journey-grid>div:hover>span{transform:translateY(-4px);box-shadow:0 7px 16px #4a39231a}
.uae-form-card{animation:uaeFormReveal .85s .12s cubic-bezier(.2,.8,.2,1) both}
.uae-main-action svg,.uae-submit svg{animation:uaeArrowNudge 2.5s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){.uae-skyline,.uae-city-art:before,.uae-journey-grid>div,.uae-form-card,.uae-main-action svg,.uae-submit svg{animation:none!important;transform:none!important}}

/* Form first on mobile and tablet */
@media (max-width: 1024px) {
  .leegal-uae-hero .uae-content { grid-template-columns: minmax(0, 1fr); }
  .leegal-uae-hero .uae-right { order: -1; max-width: 570px; justify-self: center; }
  .leegal-uae-hero .uae-left { order: 1; justify-self: center; width: 100%; }
}
`;
