import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, ChevronRight,
  CircleHelp, Compass, FileCheck2, Globe2, Layers3, LogIn, Mail, Menu,
  MessageCircle, MoveUpRight, PhoneCall, ShieldCheck, Sparkles, X
} from "lucide-react";

/**
 * Leegal UAE responsive header with accessible desktop mega menus and mobile drawer.
 * Configure loginHref, signupHref and onConsultationClick to match your app.
 * No separate CSS, images or additional icon packages required.
 */
const menus = [
  {
    key: "services", title: "Company Formation", eyebrow: "OUR SERVICES",
    heading: "Find the right way to start in the UAE.",
    description: "Explore company formation routes and get practical guidance for your business activity.",
    links: [
      { title: "Mainland Company", description: "Explore onshore setup and local market opportunities.", href: "#jurisdictions", icon: Building2 },
      { title: "Free Zone Company", description: "Discover zone-specific packages and business ecosystems.", href: "#free-zone-benefits", icon: Layers3 },
      { title: "Offshore Company", description: "Understand offshore structures and their permitted uses.", href: "#jurisdictions", icon: Globe2 },
      { title: "Compare Jurisdictions", description: "See the key considerations before choosing your route.", href: "#jurisdictions", icon: Compass },
    ],
  },
  {
    key: "explore", title: "Why Leegal", eyebrow: "DISCOVER LEEGAL",
    heading: "Guidance built around your ambitions.",
    description: "Learn how our approach helps founders navigate the UAE formation process.",
    links: [
      { title: "Why Choose Us", description: "How we help you make informed formation decisions.", href: "#why-choose-us", icon: ShieldCheck },
      { title: "Our Process", description: "Understand the steps from enquiry to setup.", href: "#process", icon: FileCheck2 },
      { title: "Our Achievements", description: "Discover our journey and client experiences.", href: "#achievements", icon: Sparkles },
      { title: "Frequently Asked Questions", description: "Answers to common UAE company setup questions.", href: "#faq", icon: CircleHelp },
    ],
  },
];
const allMenuLinks = menus.flatMap(m => m.links);
function Logo({ logoSrc }) {
  return logoSrc
    ? <img className="lh-logo-image" src={'https://www.leegal.co/images/Leegal%20LLC%20logo%20%E2%80%93%20US%20company%20formation%20service%20for%20global%20entrepreneurs.svg'} alt="Leegal" />
    : <span className="lh-wordmark">leegal<span>.</span></span>;
}
export default function UAEFormationHeader({
  logoSrc,
  loginHref = "/login",
  signupHref = "/signup",
  homeHref = "#home",
  email = "info@uae.leegal.co",
  onConsultationClick,
  onLoginClick,
  onSignupClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState("services");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const firstMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); }
    };
    const onOutside = e => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onOutside); };
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [mobileOpen]);
  useEffect(() => {
    if (openMenu) firstMenuRef.current?.focus();
  }, [openMenu]);

  const closeAll = () => { setOpenMenu(null); setMobileOpen(false); };
  const consult = () => {
    closeAll();
    if (onConsultationClick) return onConsultationClick();
    const field = document.getElementById("uae-lead-name");
    if (field) { field.scrollIntoView({ behavior: "smooth", block: "center" }); field.focus({ preventScroll: true }); }
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const selected = menus.find(m => m.key === openMenu);
  const authButton = (kind, className) => {
    const callback = kind === "login" ? onLoginClick : onSignupClick;
    const href = kind === "login" ? loginHref : signupHref;
    const label = kind === "login" ? "Log in" : "Sign up";
    return callback
      ? <button type="button" className={className} onClick={() => { closeAll(); callback(); }}>{label}{kind === "signup" && <ArrowUpRight size={16} />}</button>
      : <a className={className} href={href} onClick={closeAll}>{label}{kind === "signup" && <ArrowUpRight size={16} />}</a>;
  };

  return (
    <>
      <style>{styles}</style>
      <header ref={headerRef} className={`lh-root ${scrolled ? "lh-scrolled" : ""}`} id="site-header" onMouseLeave={() => setOpenMenu(null)}>
        <div className="lh-utility">
          <div className="lh-container lh-utility-inner">
            <span className="lh-utility-message"><span className="lh-online-dot" /> UAE COMPANY FORMATION GUIDANCE</span>
            <div className="lh-utility-right">
              <a href={`mailto:${email}`}><Mail size={13} />{email}</a>
              <span className="lh-utility-divider" />
              <a href="#contact" onClick={closeAll}>Contact us <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>
        <div className="lh-main">
          <div className="lh-container lh-main-inner">
            <a href={homeHref} className="lh-logo-link" aria-label="Leegal home" onClick={closeAll}><Logo logoSrc={logoSrc} /></a>
            <nav className="lh-desktop-nav" aria-label="Primary navigation">
              <a href={homeHref} className="lh-nav-link" onMouseEnter={() => setOpenMenu(null)} onClick={closeAll}>Home</a>
              {menus.map(m => (
                <button key={m.key} type="button" className={`lh-nav-link lh-nav-trigger ${openMenu === m.key ? "lh-nav-active" : ""}`}
                  aria-expanded={openMenu === m.key} aria-controls="lh-mega-panel"
                  onMouseEnter={() => setOpenMenu(m.key)} onFocus={() => setOpenMenu(m.key)} onClick={() => setOpenMenu(v => v === m.key ? null : m.key)}>
                  {m.title}<ChevronDown size={15} />
                </button>
              ))}
              <a href="#process" className="lh-nav-link" onMouseEnter={() => setOpenMenu(null)} onClick={closeAll}>How It Works</a>
              <a href="#faq" className="lh-nav-link" onMouseEnter={() => setOpenMenu(null)} onClick={closeAll}>FAQs</a>
            </nav>
            <div className="lh-desktop-actions">
              {authButton("login", "lh-login")}
              {authButton("signup", "lh-signup")}
            </div>
            <button type="button" className="lh-mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen} onClick={() => { setMobileOpen(v => !v); setOpenMenu(null); }}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {selected && <div className="lh-mega" id="lh-mega-panel">
          <div className="lh-container lh-mega-inner">
            <div className="lh-mega-main">
              <div className="lh-mega-head">
                <span className="lh-eyebrow"><span /> {selected.eyebrow}</span>
                <h2>{selected.heading}</h2>
                <p>{selected.description}</p>
              </div>
              <div className="lh-mega-links">
                {selected.links.map((link, i) => {
                  const Icon = link.icon;
                  return <a key={link.title} ref={i === 0 ? firstMenuRef : null} href={link.href} onClick={closeAll} className="lh-mega-item">
                    <span className="lh-mega-icon"><Icon size={21} strokeWidth={1.8} /></span>
                    <span className="lh-mega-text"><strong>{link.title}</strong><small>{link.description}</small></span>
                    <ArrowUpRight size={17} className="lh-mega-arrow" />
                  </a>;
                })}
              </div>
            </div>
            <aside className="lh-mega-aside">
              <div className="lh-aside-top"><span className="lh-aside-icon"><MessageCircle size={21} /></span><span>PERSONAL GUIDANCE</span></div>
              <h3>Not sure which setup suits you?</h3>
              <p>Tell us about your business activity. We'll help you understand the options and what to consider next.</p>
              <button type="button" onClick={consult}>Speak with our team <ArrowRight size={17} /></button>
              <div className="lh-aside-bottom"><Check size={15} /> Mainland · Free Zone · Offshore</div>
            </aside>
          </div>
        </div>}
      </header>
      {mobileOpen && <div className="lh-mobile-layer">
        <button type="button" className="lh-mobile-backdrop" aria-label="Close navigation" onClick={closeAll} />
        <div className="lh-mobile-panel" role="dialog" aria-label="Mobile navigation">
          <div className="lh-mobile-scroll">
            <a href={homeHref} onClick={closeAll} className="lh-mobile-simple">Home <ArrowUpRight size={17} /></a>
            {menus.map(m => <div className="lh-mobile-group" key={m.key}>
              <button type="button" onClick={() => setMobileGroup(v => v === m.key ? null : m.key)}
                aria-expanded={mobileGroup === m.key}>{m.title}<ChevronDown className={mobileGroup === m.key ? "lh-rotated" : ""} size={17} /></button>
              {mobileGroup === m.key && <div className="lh-mobile-group-links">
                {m.links.map(link => <a href={link.href} key={link.title} onClick={closeAll}>{link.title}<ChevronRight size={15} /></a>)}
              </div>}
            </div>)}
            <a href="#process" onClick={closeAll} className="lh-mobile-simple">How It Works <ArrowUpRight size={17} /></a>
            <a href="#faq" onClick={closeAll} className="lh-mobile-simple">FAQs <ArrowUpRight size={17} /></a>
            <a href={`mailto:${email}`} className="lh-mobile-email"><Mail size={17} />{email}</a>
          </div>
          <div className="lh-mobile-actions">
            <div>{authButton("login", "lh-mobile-login")}{authButton("signup", "lh-mobile-signup")}</div>
          </div>
        </div>
      </div>}
    </>
  );
}
const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.lh-root{--lh-red:#EA2024;--lh-ink:#192536;--lh-border:#E8ECF1;position:sticky;top:0;z-index:1100;width:100%;isolation:isolate;background:#fff;color:var(--lh-ink);font-family:'DM Sans',sans-serif;transition:box-shadow .25s}
.lh-root *,.lh-mobile-layer *{box-sizing:border-box}.lh-root button,.lh-mobile-layer button{font:inherit;cursor:pointer}.lh-root a,.lh-mobile-layer a{text-decoration:none}.lh-root button:focus-visible,.lh-root a:focus-visible,.lh-mobile-layer button:focus-visible,.lh-mobile-layer a:focus-visible{outline:3px solid #EA202470;outline-offset:3px}
.lh-scrolled{box-shadow:0 8px 35px #18253612}.lh-container{width:min(100% - 48px,1320px);margin-inline:auto}
.lh-utility{height:34px;background:#192536;color:#CBD4E0}.lh-utility-inner{display:flex;justify-content:space-between;align-items:center;height:100%;gap:18px}
.lh-utility-message{display:flex;align-items:center;gap:9px;font-size:9px;font-weight:800;letter-spacing:1.6px}.lh-online-dot{width:6px;height:6px;border-radius:50%;background:#F34B50;box-shadow:0 0 0 3px #F34B5022}
.lh-utility-right{display:flex;align-items:center;gap:19px}.lh-utility-right a,.lh-utility-right button{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:#DDE4EC;background:none;border:0;padding:0;transition:color .2s}.lh-utility-right a:hover,.lh-utility-right button:hover{color:#fff}.lh-utility-divider{height:12px;width:1px;background:#ffffff30}
.lh-main{background:#fff;border-bottom:1px solid #EEF0F4}.lh-main-inner{display:flex;align-items:center;gap:24px;min-height:82px}
.lh-logo-link{display:flex;align-items:center;flex-shrink:0;gap:13px;color:#192536}.lh-wordmark{font-size:32px;font-weight:800;letter-spacing:-2px;line-height:1}.lh-wordmark span{color:#EA2024}.lh-logo-image{width:auto;max-width:125px;max-height:44px;object-fit:contain}.lh-logo-sub{border-left:1px solid #E4E7EC;padding-left:12px;font-size:8px;font-weight:800;letter-spacing:1.1px;color:#8490A0;max-width:70px;line-height:1.5}
.lh-desktop-nav{display:flex;align-items:center;justify-content:center;gap:clamp(11px,1.7vw,27px);flex:1}.lh-nav-link{position:relative;display:inline-flex;align-items:center;gap:6px;padding:30px 0;border:0;background:none;color:#394659;font-size:12px;font-weight:750;white-space:nowrap;transition:color .2s}.lh-nav-link:hover,.lh-nav-active{color:#EA2024}.lh-nav-link:after{content:"";height:2px;position:absolute;left:0;right:100%;bottom:0;background:#EA2024;transition:right .25s}.lh-nav-link:hover:after,.lh-nav-active:after{right:0}.lh-nav-trigger svg{transition:transform .25s}.lh-nav-active svg{transform:rotate(180deg)}
.lh-desktop-actions{display:flex;align-items:center;gap:14px;flex-shrink:0}.lh-login,.lh-signup{border:0;background:transparent;color:#192536;font-size:12px;font-weight:800;padding:11px 0;white-space:nowrap}.lh-login:hover,.lh-signup:hover{color:#EA2024}.lh-signup{display:flex;align-items:center;gap:4px}.lh-primary{display:flex;align-items:center;gap:11px;border:1px solid #EA2024;border-radius:7px;padding:13px 15px;background:#EA2024;color:white;font-size:12px;font-weight:800;white-space:nowrap;transition:background .2s,transform .2s}.lh-primary:hover{background:#C81920;transform:translateY(-2px)}.lh-mobile-toggle{display:none;background:none;border:1px solid #E8ECF1;color:#192536;border-radius:9px;width:43px;height:43px;align-items:center;justify-content:center;margin-left:auto}
.lh-mega{position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid #E5E9F0;box-shadow:0 25px 55px #19253620;animation:lh-slide .23s ease both}.lh-mega-inner{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:36px;padding-top:31px;padding-bottom:32px}
.lh-mega-main{display:grid;grid-template-columns:275px minmax(0,1fr);gap:30px}.lh-mega-head{padding:15px 24px 0 0;border-right:1px solid #E8ECF1}.lh-eyebrow{display:flex;align-items:center;gap:9px;font-size:10px;letter-spacing:1.4px;font-weight:800;color:#EA2024}.lh-eyebrow span{width:20px;height:2px;background:#EA2024}.lh-mega-head h2{font-size:24px;line-height:1.22;letter-spacing:-.9px;margin:17px 0 12px}.lh-mega-head p{font-size:12px;color:#778397;line-height:1.8;margin:0}
.lh-mega-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.lh-mega-item{display:flex;align-items:flex-start;gap:13px;border:1px solid transparent;border-radius:10px;padding:17px 13px;color:#192536;transition:background .2s,border-color .2s,transform .2s}.lh-mega-item:hover{background:#FFF7F7;border-color:#F6DDDE;transform:translateY(-2px)}.lh-mega-icon{width:40px;height:40px;display:grid;place-items:center;flex-shrink:0;border-radius:9px;background:#FFF1F2;color:#EA2024}.lh-mega-text{display:flex;flex-direction:column;gap:7px;min-width:0}.lh-mega-text strong{font-size:12px;font-weight:800}.lh-mega-text small{font-size:11px;color:#7C8899;line-height:1.55}.lh-mega-arrow{margin-left:auto;flex-shrink:0;color:#B5BFCC;transition:color .2s,transform .2s}.lh-mega-item:hover .lh-mega-arrow{color:#EA2024;transform:translate(2px,-2px)}
.lh-mega-aside{position:relative;overflow:hidden;background:#192536;color:white;border-radius:12px;padding:24px;display:flex;flex-direction:column;min-height:250px}.lh-mega-aside:after{content:"";position:absolute;right:-65px;bottom:-95px;width:180px;height:180px;border:1px solid #ffffff25;border-radius:50%;pointer-events:none}.lh-aside-top{display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:1.2px;font-weight:800;color:#E3E8EF}.lh-aside-icon{width:38px;height:38px;border-radius:9px;display:grid;place-items:center;background:#EA2024;color:white}.lh-mega-aside h3{font-size:21px;letter-spacing:-.5px;line-height:1.3;margin:22px 0 8px}.lh-mega-aside p{font-size:11px;line-height:1.75;color:#BFCAD8;margin:0 0 20px}.lh-mega-aside button{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#EA2024;border:0;border-radius:7px;color:white;padding:12px 14px;font-size:11px;font-weight:800;transition:background .2s}.lh-mega-aside button:hover{background:#CB1C21}.lh-aside-bottom{display:flex;align-items:center;gap:7px;margin-top:18px;font-size:10px;color:#BFCAD8}.lh-aside-bottom svg{color:#FF777B}
.lh-mobile-layer{display:none}.lh-mobile-panel{font-family:'DM Sans',sans-serif}
@keyframes lh-slide{from{opacity:0;transform:translateY(-9px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1260px){.lh-main-inner{gap:14px}.lh-logo-sub{display:none}.lh-desktop-actions{gap:10px}.lh-desktop-nav{gap:15px}.lh-primary{padding:12px 11px}}
@media(max-width:1060px){.lh-desktop-nav,.lh-desktop-actions{display:none}.lh-mobile-toggle{display:flex}.lh-main-inner{min-height:73px}.lh-mobile-layer{display:block;position:fixed;inset:107px 0 0;z-index:1090}.lh-scrolled ~ .lh-mobile-layer{top:107px}.lh-mobile-backdrop{position:absolute;inset:0;background:#10182875;border:0;width:100%}.lh-mobile-panel{position:absolute;top:0;right:0;bottom:0;width:min(100%,420px);background:#fff;box-shadow:-12px 0 40px #10182820;display:flex;flex-direction:column;animation:lh-drawer .25s ease}.lh-mobile-scroll{overflow:auto;flex:1;padding:21px 23px}.lh-mobile-simple,.lh-mobile-group>button{width:100%;display:flex;align-items:center;justify-content:space-between;background:transparent;border:0;border-bottom:1px solid #E9EDF2;color:#192536;padding:18px 2px;font-size:15px;font-weight:800}.lh-mobile-group>button svg{transition:transform .2s}.lh-rotated{transform:rotate(180deg)}.lh-mobile-group-links{display:grid;gap:2px;background:#F8FAFC;border-radius:9px;padding:8px 13px;margin-top:7px}.lh-mobile-group-links a{display:flex;justify-content:space-between;align-items:center;color:#536176;font-size:13px;padding:12px 4px}.lh-mobile-group-links a:hover{color:#EA2024}.lh-mobile-email{display:flex;align-items:center;gap:9px;margin-top:26px;font-size:12px;color:#EA2024}.lh-mobile-actions{padding:20px 23px;border-top:1px solid #E9EDF2;background:#fff}.lh-mobile-consult{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:15px;border-radius:8px;border:0;background:#EA2024;color:white;font-size:13px;font-weight:800}.lh-mobile-actions>div{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.lh-mobile-login,.lh-mobile-signup{display:flex;align-items:center;justify-content:center;gap:7px;padding:13px;border:1px solid #E5E9F0;border-radius:8px;color:#192536;background:#fff;font-size:13px;font-weight:800}.lh-mobile-signup{border-color:#192536}.lh-mobile-login:hover,.lh-mobile-signup:hover{background:#F6F8FB}@keyframes lh-drawer{from{transform:translateX(25px);opacity:.7}to{transform:translateX(0);opacity:1}}}
@media(max-width:580px){.lh-container{width:min(100% - 30px,1320px)}.lh-utility{height:29px}.lh-utility-message{font-size:8px;letter-spacing:.8px}.lh-utility-right button,.lh-utility-divider{display:none}.lh-utility-right a{font-size:10px}.lh-main-inner{min-height:68px}.lh-wordmark{font-size:30px}.lh-mobile-layer{top:97px}}

/* Refined navigation: consistent typography, generous rhythm and auth emphasis */
.lh-main-inner{min-height:88px;gap:36px}
.lh-logo-link{margin-right:10px}
.lh-wordmark{font-size:37px;letter-spacing:-2.5px}
.lh-logo-image{max-width:155px;max-height:50px}
.lh-desktop-nav{justify-content:center;gap:clamp(18px,2vw,33px)}
.lh-nav-link{font-size:13px;font-weight:700;line-height:20px;padding:34px 0;color:#344155;letter-spacing:0}
.lh-nav-trigger{gap:7px}.lh-nav-trigger svg{width:14px;height:14px}
.lh-desktop-actions{gap:9px;border-left:1px solid #E8ECF1;padding-left:24px}
.lh-login,.lh-signup{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 17px;border-radius:8px;font-size:13px;font-weight:800;transition:background .2s,color .2s,border-color .2s,transform .2s}
.lh-login{color:#344155;background:#F4F6F9;border:1px solid #EDF0F4}
.lh-login:hover{background:#E9EDF3;color:#192536}
.lh-signup{background:#EA2024;color:#fff;border:1px solid #EA2024;padding:0 19px}
.lh-signup:hover{background:#C81B20;color:#fff;transform:translateY(-2px)}
.lh-mega-inner{padding-top:38px;padding-bottom:40px}
.lh-mega{border-top:1px solid #F1F3F6}
.lh-mega-item{padding:19px 16px}
.lh-mobile-actions>div{margin-top:0}
.lh-mobile-login,.lh-mobile-signup{height:47px}
.lh-mobile-signup{background:#EA2024;color:white;border-color:#EA2024}
.lh-mobile-signup:hover{background:#C81B20;color:white}
@media(max-width:1260px){.lh-main-inner{gap:17px}.lh-desktop-nav{gap:16px}.lh-desktop-actions{padding-left:15px}.lh-login,.lh-signup{padding:0 12px}}
@media(max-width:1060px){.lh-main-inner{min-height:75px}.lh-mobile-actions{padding:20px 23px}}
@media(max-width:580px){.lh-main-inner{min-height:68px}.lh-wordmark{font-size:32px}}
/* Compact header and strictly uniform desktop navigation typography */
.lh-main-inner{min-height:72px;gap:24px}
.lh-wordmark{font-size:34px}
.lh-logo-image{max-height:43px}
.lh-desktop-nav{gap:clamp(16px,1.7vw,26px)}
.lh-desktop-nav > a.lh-nav-link,
.lh-desktop-nav > button.lh-nav-link{
  font-family:'DM Sans',sans-serif!important;
  font-size:13px!important;
  font-weight:700!important;
  line-height:20px!important;
  letter-spacing:0!important;
  text-transform:none!important;
  padding:25px 0!important;
  min-height:70px;
  display:inline-flex;
  align-items:center;
  vertical-align:middle;
}
.lh-nav-trigger svg{flex:none;width:14px;height:14px}
.lh-login,.lh-signup{height:38px;padding-inline:15px}
.lh-utility{height:30px}
@media(max-width:1060px){.lh-main-inner{min-height:66px}.lh-mobile-layer{top:96px}}
@media(max-width:580px){.lh-main-inner{min-height:62px}.lh-mobile-layer{top:91px}.lh-utility{height:29px}}
@media(prefers-reduced-motion:reduce){.lh-root *,.lh-mobile-layer *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
