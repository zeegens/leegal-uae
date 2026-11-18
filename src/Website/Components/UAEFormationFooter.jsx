

import React from 'react';
import {
  ArrowRight, ArrowUpRight, Building2, CheckCircle2, ChevronRight,
  Mail, Phone, MapPin,
  Globe2, ShieldCheck, MessageCircle, ExternalLink
} from 'lucide-react';

/**
 * Leegal UAE website footer — standalone React component with internal CSS.
 * Supply verified business contact details and URLs via props.
 * Empty URLs are displayed as non-clickable text, not broken links.
 */
const defaultGroups = [
  {
    title: 'Company Formation', links: [
      { label: 'UAE Mainland Company', href: '#jurisdictions' },
      { label: 'UAE Free Zone Company', href: '#jurisdictions' },
      { label: 'UAE Offshore Company', href: '#jurisdictions' },
      { label: 'Explore Jurisdictions', href: '#jurisdictions' },
    ]
  },
  {
    title: 'Explore Leegal', links: [
      { label: 'Why Choose Us', href: '#why-choose-us' },
      { label: 'How It Works', href: '#process' },
      { label: 'Our Achievements', href: '#achievements' },
      { label: 'Free Zone Benefits', href: '#free-zone-benefits' },
    ]
  },
  {
    title: 'Help & Resources', links: [
      { label: 'Frequently Asked Questions', href: '#faq' },
      { label: 'Get Consultation', href: '#contact' },
      { label: 'Contact Us', href: '#contact' },
    ]
  },
];

// Social brand marks are inline SVGs: Lucide does not provide every brand icon.
function Facebook({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>;
}
function Instagram({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
function Linkedin({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.65h.05c.5-.95 1.72-1.95 3.54-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.8v-5.8c0-1.38-.02-3.16-1.93-3.16-1.93 0-2.23 1.5-2.23 3.06V21H9.4V9Z" /></svg>;
}
function Youtube({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.5 7.2a2.8 2.8 0 0 0-2-2C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.5.4a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.7.4 7.5.4 7.5.4s5.8 0 7.5-.4a2.8 2.8 0 0 0 2-2C22 15 22 12 22 12s0-3-.5-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>;
}

const socials = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
];

function FooterLink({ href, children, className = '' }) {
  if (!href) return <span className={`${className} leegal-uae-footer-inactive`}>{children}</span>;
  const external = /^https?:\/\//i.test(href);
  return <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

export default function UAEFormationFooter({
  onConsultationClick,
  logoSrc,
  socialLinks = {},
  email = '',
  phone = '',
  whatsapp = '',
  address = '',
  navigation = defaultGroups,
  privacyUrl = '',
  termsUrl = '',
  cookiesUrl = '',
  copyrightYear = new Date().getFullYear(),
}) {
  const consult = () => {
    if (typeof onConsultationClick === 'function') return onConsultationClick();
    const field = document.getElementById('uae-lead-name');
    if (field) { field.scrollIntoView({ behavior: 'smooth', block: 'center' }); field.focus({ preventScroll: true }); }
    else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappHref = whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, '')}` : '';
  const hasContact = Boolean(email || phone || whatsapp || address);

  return <footer className="leegal-uae-footer-footer" aria-label="Leegal website footer">
    <style>{styles}</style>
    <div className="leegal-uae-footer-cta-wrap">
      <div className="leegal-uae-footer-cta">
        <div className="leegal-uae-footer-cta-copy">
          <div className="leegal-uae-footer-kicker"><span className="leegal-uae-footer-kicker-line" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>Ready to build your <span>business in the UAE?</span></h2>
          <p>Speak with our team about your activity, jurisdiction options, and the next steps toward company formation.</p>
        </div>
        <div className="leegal-uae-footer-cta-actions">
          <button type="button" onClick={consult} className="leegal-uae-footer-main-button">Get a free consultation <ArrowUpRight size={19} /></button>
          <span><CheckCircle2 size={15} /> Discuss your options with our team</span>
        </div>
        <div className="leegal-uae-footer-cta-decoration" aria-hidden="true" />
      </div>
    </div>

    <div className="leegal-uae-footer-main">
      <div className="leegal-uae-footer-content">
        <div className="leegal-uae-footer-topline"><span>LEEGAL · UAE COMPANY FORMATION</span><span>YOUR BUSINESS. OUR GUIDANCE.</span></div>
        <div className="leegal-uae-footer-columns">
          <div className="leegal-uae-footer-brand">
            {logoSrc ? <img className="leegal-uae-footer-logo-img" src={logoSrc} alt="Leegal" /> : <div className="leegal-uae-footer-logo-text">leegal<span>.</span></div>}
            <p>Make confident decisions about starting your company in the UAE. We help founders understand the options, paperwork, and practical steps involved.</p>
            <div className="leegal-uae-footer-brand-meta"><span className="leegal-uae-footer-brand-mark"><Globe2 size={17} /></span><span>Guidance for UAE company formation</span></div>
            <div className="leegal-uae-footer-socials" aria-label="Social media">
              {socials.map(({ key, label, icon: Icon }) => socialLinks[key] ?
                <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer" aria-label={`Leegal on ${label}`} title={label}><Icon size={18} /></a>
                : <span key={key} className="leegal-uae-footer-social-disabled" aria-label={`${label} link not configured`} title={`${label} link not configured`}><Icon size={18} /></span>)}
            </div>
          </div>
          {navigation.map(group => <nav key={group.title} className="leegal-uae-footer-nav" aria-label={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.links.map(link => <li key={`${link.label}-${link.href}`}><FooterLink href={link.href}><ChevronRight size={13} />{link.label}</FooterLink></li>)}</ul>
          </nav>)}
          <div className="leegal-uae-footer-contact">
            <h3>Get in Touch</h3>
            <p>Have a question about your UAE business setup? We’re here to help you explore the next step.</p>
            {email && <a href={`mailto:${email}`}><Mail size={17} /><span>{email}</span></a>}
            {phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}><Phone size={17} /><span>{phone}</span></a>}
            {address && <div className="leegal-uae-footer-contact-line"><MapPin size={17} /><span>{address}</span></div>}
            {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /><span>Chat on WhatsApp <ExternalLink size={12} /></span></a>}
            {!hasContact && <button type="button" className="leegal-uae-footer-contact-button" onClick={consult}>Request a callback <ArrowRight size={16} /></button>}
          </div>
        </div>
        <div className="leegal-uae-footer-bottom">
          <div className="leegal-uae-footer-copyright">© {copyrightYear} Leegal. All rights reserved.</div>
          <div className="leegal-uae-footer-legal">
            <FooterLink href={privacyUrl}>Privacy Policy</FooterLink>
            <FooterLink href={termsUrl}>Terms & Conditions</FooterLink>
            <FooterLink href={cookiesUrl}>Cookie Policy</FooterLink>
          </div>
          <button className="leegal-uae-footer-backtop" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Back to top <ArrowUpRight size={15} /></button>
        </div>
        <p className="leegal-uae-footer-disclaimer">Information on this website is general guidance only. Business eligibility, licensing, visas, tax treatment, and approvals depend on the applicable UAE authorities and individual circumstances.</p>
      </div>
    </div>
  </footer>;
}

const styles = `
/* Namespaced to prevent clashes with the rest of the website */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.leegal-uae-footer-footer{--leegal-uae-footer-red:#EA2024;--leegal-uae-footer-navy:#192536;--leegal-uae-footer-muted:#aeb9c9;font-family:'DM Sans',sans-serif;background:#fff;color:#fff;overflow:hidden;width:100%;max-width:none;clear:both;isolation:isolate}
.leegal-uae-footer-footer *{box-sizing:border-box;min-width:0}.leegal-uae-footer-footer button{font:inherit;cursor:pointer}.leegal-uae-footer-footer a{text-decoration:none}.leegal-uae-footer-footer button:focus-visible,.leegal-uae-footer-footer a:focus-visible{outline:2px solid #ff7e80;outline-offset:4px}
.leegal-uae-footer-cta-wrap{padding:0 32px;background:linear-gradient(to bottom,#fff 50%,#192536 50%)}
.leegal-uae-footer-cta{width:100%;max-width:1280px;margin:0 auto;background:#EA2024;position:relative;overflow:hidden;border-radius:16px;padding:43px 50px;display:flex;justify-content:space-between;align-items:center;gap:35px;box-shadow:0 20px 40px #0e1a2d20}
.leegal-uae-footer-cta:before{content:'';position:absolute;width:430px;height:430px;border:1px solid #ffffff28;border-radius:50%;right:15%;top:-240px;pointer-events:none}.leegal-uae-footer-cta-decoration{position:absolute;width:290px;height:290px;border:1px solid #ffffff20;border-radius:50%;right:-120px;bottom:-230px;pointer-events:none}
.leegal-uae-footer-cta-copy,.leegal-uae-footer-cta-actions{position:relative;z-index:1}.leegal-uae-footer-cta-copy{max-width:730px}.leegal-uae-footer-kicker{font-size:10px;font-weight:800;letter-spacing:1.6px;display:flex;align-items:center;gap:10px;margin-bottom:16px;color:#fff}.leegal-uae-footer-kicker-line{height:2px;width:23px;background:#fff}
.leegal-uae-footer-cta h2{font-size:clamp(29px,3.2vw,44px);line-height:1.14;letter-spacing:-1.6px;margin:0 0 13px;font-weight:800}.leegal-uae-footer-cta h2 span{color:#fff;opacity:.88}.leegal-uae-footer-cta p{margin:0;color:#fff;opacity:.88;font-size:13px;line-height:1.8;max-width:600px}
.leegal-uae-footer-cta-actions{display:flex;flex-direction:column;align-items:flex-start;gap:14px;flex-shrink:0}.leegal-uae-footer-main-button{display:inline-flex;align-items:center;justify-content:center;gap:20px;background:#fff;border:1px solid #fff;color:#192536;padding:17px 20px;border-radius:8px;font-weight:800!important;font-size:12px!important;white-space:nowrap;transition:transform .25s,background .25s}.leegal-uae-footer-main-button:hover{transform:translateY(-3px);background:#F3F5F8}.leegal-uae-footer-cta-actions>span{display:flex;align-items:center;gap:8px;font-size:10px;color:#fff;opacity:.9}
.leegal-uae-footer-main{background:#192536;padding:90px 32px 28px;position:relative}.leegal-uae-footer-main:before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:#ffffff08}.leegal-uae-footer-content{width:100%;max-width:1280px;margin:0 auto;position:relative;min-width:0}
.leegal-uae-footer-topline{display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid #ffffff1c;padding-bottom:22px;margin-bottom:44px;font-size:10px;font-weight:800;letter-spacing:1.6px;color:#8f9eb2}
.leegal-uae-footer-columns{display:grid;grid-template-columns:minmax(0,1.65fr) repeat(3,minmax(0,1fr)) minmax(0,1.25fr);gap:clamp(20px,2.5vw,42px);width:100%;padding-bottom:58px}
.leegal-uae-footer-logo-text{font-size:35px;font-weight:800;letter-spacing:-1.9px;line-height:1;color:#fff}.leegal-uae-footer-logo-text span{color:#EA2024}.leegal-uae-footer-logo-img{max-width:155px;max-height:54px;object-fit:contain;object-position:left center}
.leegal-uae-footer-brand p{font-size:13px;line-height:1.85;color:#aeb9c9;max-width:290px;margin:23px 0 19px}.leegal-uae-footer-brand-meta{display:flex;align-items:center;gap:10px;font-size:11px;color:#c6ceda}.leegal-uae-footer-brand-mark{width:30px;height:30px;border:1px solid #ffffff2b;display:grid;place-items:center;border-radius:7px;color:#ff7073}
.leegal-uae-footer-socials{display:flex;gap:9px;margin-top:25px;flex-wrap:wrap}.leegal-uae-footer-socials a,.leegal-uae-footer-social-disabled{width:39px;height:39px;display:grid;place-items:center;border:1px solid #ffffff26;border-radius:8px;background:#ffffff09;color:#fff;transition:background .2s,border-color .2s,transform .2s}.leegal-uae-footer-socials a:hover{background:#EA2024;border-color:#EA2024;transform:translateY(-3px)}.leegal-uae-footer-social-disabled{opacity:.38;cursor:default}
.leegal-uae-footer-nav h3,.leegal-uae-footer-contact h3{font-size:14px;font-weight:800;margin:7px 0 24px;color:#fff}.leegal-uae-footer-nav ul{list-style:none;padding:0;margin:0;display:grid;gap:16px}.leegal-uae-footer-nav li a,.leegal-uae-footer-nav li .leegal-uae-footer-inactive{font-size:12px;line-height:1.65;color:#aeb9c9;display:inline-flex;gap:5px;align-items:flex-start;transition:color .2s,transform .2s}.leegal-uae-footer-nav li a svg,.leegal-uae-footer-nav li .leegal-uae-footer-inactive svg{flex-shrink:0;margin-top:2px;color:#EA2024}.leegal-uae-footer-nav li a:hover{color:#fff;transform:translateX(3px)}
.leegal-uae-footer-contact p{font-size:11.5px;line-height:1.8;color:#aeb9c9;margin:0 0 20px}.leegal-uae-footer-contact>a,.leegal-uae-footer-contact-line{display:flex;align-items:flex-start;gap:10px;color:#d8dee7;font-size:11.5px;line-height:1.65;margin-top:15px;overflow-wrap:anywhere}.leegal-uae-footer-contact>a:hover{color:#fff}.leegal-uae-footer-contact>a>svg,.leegal-uae-footer-contact-line>svg{color:#ff656a;flex-shrink:0;margin-top:2px}.leegal-uae-footer-contact a span svg{vertical-align:middle;margin-left:3px}.leegal-uae-footer-contact-button{background:transparent;border:1px solid #ffffff38;color:#fff;padding:12px 14px;border-radius:7px;display:inline-flex;gap:12px;align-items:center;font-size:11px!important;font-weight:800!important;transition:background .2s}.leegal-uae-footer-contact-button:hover{background:#EA2024;border-color:#EA2024}
.leegal-uae-footer-bottom{border-top:1px solid #ffffff22;padding:26px 0;display:flex;justify-content:space-between;align-items:center;gap:20px}.leegal-uae-footer-copyright{font-size:11px;color:#9eabba}.leegal-uae-footer-legal{display:flex;align-items:center;gap:23px;flex-wrap:wrap}.leegal-uae-footer-legal a,.leegal-uae-footer-legal span{font-size:11px;color:#aeb9c9}.leegal-uae-footer-legal a:hover{color:#fff}.leegal-uae-footer-inactive{opacity:.55;cursor:default}.leegal-uae-footer-backtop{background:transparent;border:0;color:#fff;display:inline-flex;align-items:center;gap:8px;font-size:11px!important;font-weight:800!important;padding:6px 0}.leegal-uae-footer-backtop:hover{color:#ff777b}.leegal-uae-footer-disclaimer{border-top:1px solid #ffffff10;margin:0;padding:17px 0 0;color:#7f8da1;font-size:10px;line-height:1.7}
@media(max-width:1200px){.leegal-uae-footer-columns{grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr));gap:27px}.leegal-uae-footer-contact{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:12px 25px;border-top:1px solid #ffffff18;padding-top:25px}.leegal-uae-footer-contact h3{margin:0}.leegal-uae-footer-contact p{max-width:280px;margin:0}.leegal-uae-footer-contact>a,.leegal-uae-footer-contact-line{margin:0}}
@media(max-width:850px){.leegal-uae-footer-cta{padding:35px;align-items:flex-start;flex-direction:column}.leegal-uae-footer-columns{grid-template-columns:repeat(3,1fr);gap:35px}.leegal-uae-footer-brand{grid-column:1/-1}.leegal-uae-footer-brand p{max-width:480px}.leegal-uae-footer-contact{grid-column:1/-1}.leegal-uae-footer-bottom{flex-wrap:wrap}}
@media(max-width:600px){.leegal-uae-footer-cta-wrap{padding:0 15px}.leegal-uae-footer-cta{padding:29px 24px;border-radius:12px;gap:25px}.leegal-uae-footer-cta h2{letter-spacing:-1px}.leegal-uae-footer-cta-actions,.leegal-uae-footer-main-button{width:100%}.leegal-uae-footer-main{padding:65px 17px 25px}.leegal-uae-footer-topline{margin-bottom:33px;align-items:flex-start;flex-direction:column;gap:8px}.leegal-uae-footer-columns{grid-template-columns:1fr 1fr;gap:32px 20px;padding-bottom:40px}.leegal-uae-footer-brand{grid-column:1/-1}.leegal-uae-footer-nav h3,.leegal-uae-footer-contact h3{margin-bottom:18px}.leegal-uae-footer-contact{grid-column:1/-1;display:block}.leegal-uae-footer-contact p{margin-bottom:15px}.leegal-uae-footer-contact>a,.leegal-uae-footer-contact-line{margin-top:14px}.leegal-uae-footer-bottom{flex-direction:column;align-items:flex-start;gap:18px}.leegal-uae-footer-legal{gap:13px 19px}}
@media(prefers-reduced-motion:reduce){.leegal-uae-footer-footer *,.leegal-uae-footer-footer *:before,.leegal-uae-footer-footer *:after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
