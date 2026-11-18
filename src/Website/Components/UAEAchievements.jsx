import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Quote, Check, Users, Globe2, ClipboardCheck, MessageCircle, Sparkles } from 'lucide-react';

/*
  UAEAchievements — Leegal website
  Brand: #EA2024, #192536, white and neutral greys. DM Sans.
  The 2,000+ customer figure is a Leegal-wide figure, NOT a count of UAE formations.
  Replace sample testimonials with real approved reviews before publishing.
*/
const defaultStats = [
    { value: 2000, suffix: '+', label: 'Customers across Leegal services', description: 'Our existing customer community', numeric: true },
    { value: 3, suffix: '', label: 'UAE jurisdiction pathways', description: 'Mainland · Free Zone · Offshore', numeric: true },
    { value: 4, suffix: '', label: 'Formation journey stages', description: 'From discovery to next steps', numeric: true },
    { value: '1:1', suffix: '', label: 'Personal guidance', description: 'Discuss your business goals directly', numeric: false },
];
const defaultReviews = [
    { quote: 'Add an approved client review here about the clarity of your company formation guidance and the support received throughout the process.', name: 'Client name', role: 'Founder', company: 'Company name', placeholder: true },
    { quote: 'Add an approved client review here about the communication, paperwork guidance and overall experience of working with Leegal.', name: 'Client name', role: 'Business owner', company: 'Company name', placeholder: true },
    { quote: 'Add an approved client review here describing the value of understanding the available setup options before making a decision.', name: 'Client name', role: 'Director', company: 'Company name', placeholder: true },
];

function Count({ stat, visible }) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!visible || !stat.numeric || typeof stat.value !== 'number') return;
        if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(stat.value); return; }
        let frame;
        const start = performance.now();
        const duration = 1350;
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.round(stat.value * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [visible, stat.value, stat.numeric]);
    return <>{stat.numeric && typeof stat.value === 'number' ? value.toLocaleString('en-US') : stat.value}{stat.suffix || ''}</>;
}

export default function UAEAchievements({ metrics = defaultStats, testimonials = defaultReviews, onConsultationClick }) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [reviewIndex, setReviewIndex] = useState(0);
    const reviews = testimonials.length ? testimonials : defaultReviews;
    const activeIndex = ((reviewIndex % reviews.length) + reviews.length) % reviews.length;
    const review = reviews[activeIndex];

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.18 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    const consult = () => {
        if (typeof onConsultationClick === 'function') return onConsultationClick();
        document.getElementById('uae-lead-name')?.focus();
    };

    return <section ref={sectionRef} className="la2-section" aria-labelledby="la2-heading">
        <style>{css}</style>
        <div className="la2-ambient la2-ambient-one" aria-hidden="true" />
        <div className="la2-ambient la2-ambient-two" aria-hidden="true" />
        <div className="la2-gridlines" aria-hidden="true" />
        <div className="la2-container">
            <div className="la2-top">
                <div className="la2-top-main">
                    <span className="la2-kicker"><span className="la2-kicker-line" /> THE LEEGAL STORY <span className="la2-kicker-star">✳</span></span>
                    <h2 id="la2-heading">Real progress.<br /><span>Meaningful impact.</span></h2>
                    <p>Behind every business is an ambition worth building. Discover the community we've supported and the approach we bring to every new UAE company formation conversation.</p>
                    <button type="button" className="la2-top-link" onClick={consult}>Start your business journey <ArrowUpRight size={19} /></button>
                </div>
                <div className="la2-top-side" aria-hidden="true">
                    <div className="la2-side-ring la2-side-ring-one" /><div className="la2-side-ring la2-side-ring-two" />
                    <div className="la2-side-center"><span className="la2-side-small">BUILT ON</span><strong>TRUST</strong><span className="la2-side-small">& GUIDANCE</span></div>
                    <span className="la2-side-cross la2-side-cross-one">+</span><span className="la2-side-cross la2-side-cross-two">+</span>
                </div>
            </div>

            <div className="la2-stats" aria-label="Leegal achievements and service information">
                {metrics.map((stat, i) => <div className="la2-stat" key={`${stat.label}-${i}`}>
                    <div className="la2-stat-top"><span>0{i + 1}</span><span className="la2-stat-dash" /></div>
                    <strong className="la2-stat-number"><Count stat={stat} visible={visible} /></strong>
                    <h3>{stat.label}</h3><p>{stat.description}</p>
                </div>)}
            </div>
            <p className="la2-data-note">The customer count refers to Leegal's broader customer base, not exclusively to UAE company formations. Jurisdiction and process figures describe service options, not completed formations.</p>

            <div className="la2-lower">
                <div className="la2-intro-panel">
                    <span className="la2-small-eyebrow">OUR COMMITMENT</span>
                    <h3>More than paperwork.<br /><em>A partner in your next step.</em></h3>
                    <p>Starting a company abroad comes with important decisions. We focus on making the journey easier to understand and helping you choose a route that fits your plans.</p>
                    <div className="la2-promises">
                        <div><span><Check size={15} /></span>Clear jurisdiction guidance</div>
                        <div><span><Check size={15} /></span>Practical document support</div>
                        <div><span><Check size={15} /></span>Human answers to real questions</div>
                    </div>
                    <div className="la2-panel-watermark" aria-hidden="true">L.</div>
                </div>
                <div className="la2-review-panel">
                    <div className="la2-review-header"><span>WORDS FROM OUR CLIENTS</span><span>{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(reviews.length).padStart(2, '0')}</span></div>
                    <div className="la2-review-body" key={activeIndex}>
                        <Quote size={39} className="la2-quote" strokeWidth={1.6} />
                        {review.placeholder && <span className="la2-placeholder">SAMPLE REVIEW — REPLACE BEFORE PUBLISHING</span>}
                        <blockquote>“{review.quote}”</blockquote>
                        <div className="la2-review-person"><div className="la2-avatar" aria-hidden="true">{(review.name || 'C').charAt(0)}</div><div><strong>{review.name}</strong><span>{[review.role, review.company].filter(Boolean).join(' · ')}</span></div></div>
                    </div>
                    <div className="la2-review-footer"><div className="la2-dots" aria-label="Testimonial position">{reviews.map((_, i) => <button key={i} type="button" aria-label={`Show testimonial ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={i === activeIndex ? 'is-active' : ''} onClick={() => setReviewIndex(i)} />)}</div><div className="la2-arrows"><button type="button" aria-label="Previous testimonial" onClick={() => setReviewIndex(v => v - 1)}><ChevronLeft size={19} /></button><button type="button" aria-label="Next testimonial" onClick={() => setReviewIndex(v => v + 1)}><ChevronRight size={19} /></button></div></div>
                </div>
            </div>
            <div className="la2-bottom"><div className="la2-bottom-mark"><MessageCircle size={21} /></div><div className="la2-bottom-text"><strong>Let's make your next milestone possible.</strong><span>Tell us about your UAE business plans and explore the right next steps.</span></div><button type="button" onClick={consult}>Speak with our team <ArrowRight size={18} /></button></div>
        </div>
    </section>;
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.la2-section{--red:#EA2024;--navy:#192536;--line:#E5E9F0;position:relative;overflow:hidden;background:#192536;color:#fff;font-family:'DM Sans',sans-serif;padding:105px 24px 95px;isolation:isolate}
.la2-section *{box-sizing:border-box}.la2-section button{font:inherit;cursor:pointer}.la2-section button:focus-visible{outline:3px solid #FF7779;outline-offset:4px}
.la2-container{position:relative;z-index:2;max-width:1280px;margin:auto}.la2-gridlines{position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:82px 82px;mask-image:linear-gradient(90deg,transparent,#000 40%,#000 80%,transparent);pointer-events:none}
.la2-ambient{position:absolute;pointer-events:none;border-radius:50%;filter:blur(7px)}.la2-ambient-one{width:700px;height:700px;right:-290px;top:-310px;background:radial-gradient(circle,#EA202421 0%,#EA20240b 38%,transparent 70%);animation:la2Breathe 11s ease-in-out infinite}.la2-ambient-two{width:600px;height:600px;left:-350px;bottom:-330px;background:radial-gradient(circle,#FFFFFF0b,transparent 70%);animation:la2Breathe 13s ease-in-out -4s infinite}
.la2-top{display:grid;grid-template-columns:1fr .6fr;gap:60px;align-items:center;margin-bottom:61px}.la2-top-main{max-width:730px}.la2-kicker{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:800;letter-spacing:1.8px;color:#FF7779;margin-bottom:23px}.la2-kicker-line{width:28px;height:2px;background:#EA2024}.la2-kicker-star{font-size:18px;color:#fff;animation:la2Spin 15s linear infinite}.la2-top h2{font-size:clamp(44px,5.4vw,78px);line-height:1.04;letter-spacing:-3.8px;font-weight:800;margin:0 0 25px}.la2-top h2 span{color:#FF666B}.la2-top p{max-width:560px;font-size:14px;line-height:1.95;color:#BEC8D5;margin:0 0 27px}.la2-top-link{display:inline-flex;align-items:center;gap:13px;padding:0 0 8px;border:0;border-bottom:1px solid #EA2024;background:none;color:#fff;font-size:13px!important;font-weight:800!important}.la2-top-link svg{color:#FF7779;transition:transform .25s}.la2-top-link:hover svg{transform:translate(3px,-3px)}
.la2-top-side{height:285px;position:relative;display:grid;place-items:center}.la2-side-ring{position:absolute;border:1px solid #ffffff20;border-radius:50%;width:280px;height:280px;animation:la2Spin 35s linear infinite}.la2-side-ring-one:before,.la2-side-ring-one:after{content:'';position:absolute;width:9px;height:9px;border-radius:50%;background:#EA2024;top:20px;left:51px;box-shadow:0 0 22px #EA2024aa}.la2-side-ring-one:after{top:auto;left:auto;bottom:22px;right:46px;background:#fff;box-shadow:none;width:5px;height:5px}.la2-side-ring-two{width:210px;height:210px;border-style:dashed;border-color:#ffffff2b;animation-direction:reverse}.la2-side-center{display:flex;flex-direction:column;align-items:center;gap:7px}.la2-side-center strong{font-size:48px;font-weight:800;letter-spacing:-2px}.la2-side-small{font-size:10px;letter-spacing:2.2px;font-weight:800;color:#AEBCCC}.la2-side-cross{position:absolute;color:#FF7779;font-size:25px;font-weight:300;animation:la2Float 5s ease-in-out infinite}.la2-side-cross-one{left:4%;top:23%}.la2-side-cross-two{right:8%;bottom:17%;animation-delay:-2s}
.la2-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid #ffffff34;border-bottom:1px solid #ffffff34}.la2-stat{padding:28px 26px 30px;border-right:1px solid #ffffff25;min-width:0}.la2-stat:first-child{padding-left:0}.la2-stat:last-child{border-right:0}.la2-stat-top{display:flex;align-items:center;justify-content:space-between;color:#B0BDCB;font-size:10px;font-weight:800;letter-spacing:1.4px;margin-bottom:22px}.la2-stat-dash{width:18px;height:2px;background:#EA2024}.la2-stat-number{font-size:clamp(37px,4.1vw,61px);font-weight:800;letter-spacing:-2.6px;line-height:1.05;display:block;font-variant-numeric:tabular-nums}.la2-stat h3{font-size:13px;font-weight:800;margin:15px 0 7px}.la2-stat p{font-size:11px;line-height:1.65;color:#AEBBC9;margin:0}.la2-data-note{font-size:10px;line-height:1.7;color:#AEBBC9;margin:12px 0 43px;max-width:900px}
.la2-lower{display:grid;grid-template-columns:.94fr 1.06fr;gap:18px}.la2-intro-panel{position:relative;overflow:hidden;background:#EA2024;border-radius:14px;padding:42px 42px 38px;min-height:420px;display:flex;flex-direction:column}.la2-small-eyebrow{font-size:10px;letter-spacing:1.5px;font-weight:800;color:#fff}.la2-intro-panel h3{font-size:clamp(28px,2.7vw,40px);letter-spacing:-1.4px;line-height:1.17;margin:24px 0 17px;max-width:460px}.la2-intro-panel h3 em{font-style:normal;color:#fff;opacity:.8}.la2-intro-panel>p{font-size:13px;line-height:1.85;max-width:450px;margin:0;color:#fff}.la2-promises{margin-top:auto;padding-top:27px;display:grid;gap:13px;position:relative;z-index:2}.la2-promises>div{display:flex;align-items:center;gap:11px;font-size:12px;font-weight:700}.la2-promises>div span{width:24px;height:24px;border-radius:50%;background:#ffffff26;display:grid;place-items:center}.la2-panel-watermark{position:absolute;right:-20px;bottom:-85px;font-size:300px;font-weight:800;line-height:1;color:#ffffff0c;pointer-events:none}
.la2-review-panel{background:#fff;color:#192536;border-radius:14px;padding:31px 35px 27px;display:flex;flex-direction:column;min-height:420px}.la2-review-header{display:flex;align-items:center;justify-content:space-between;gap:15px;border-bottom:1px solid #E5E9F0;padding-bottom:20px;font-size:10px;font-weight:800;letter-spacing:1.25px;color:#68778A}.la2-review-header>span:last-child{color:#EA2024}.la2-review-header i{color:#AEB8C4;font-style:normal;margin:0 5px}.la2-review-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 0;animation:la2Enter .3s ease both}.la2-quote{color:#EA2024;margin-bottom:14px}.la2-placeholder{align-self:flex-start;background:#FFF1F2;color:#A82026;font-size:9px;font-weight:800;letter-spacing:.7px;padding:7px 9px;border-radius:4px}.la2-review-body blockquote{font-size:clamp(19px,2.1vw,27px);font-weight:600;letter-spacing:-.65px;line-height:1.53;margin:17px 0 25px}.la2-review-person{display:flex;align-items:center;gap:12px}.la2-avatar{width:43px;height:43px;display:grid;place-items:center;border-radius:50%;background:#F0F2F6;color:#192536;font-weight:800;font-size:15px}.la2-review-person strong{font-size:12px;display:block}.la2-review-person span{font-size:11px;color:#788596;display:block;margin-top:4px}.la2-review-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #E5E9F0;padding-top:17px}.la2-dots{display:flex;gap:8px}.la2-dots button{height:6px;width:6px;border:0;border-radius:10px;background:#CDD4DE;padding:0;transition:width .25s,background .25s}.la2-dots button.is-active{width:27px;background:#EA2024}.la2-arrows{display:flex;gap:8px}.la2-arrows button{height:39px;width:39px;display:grid;place-items:center;border:1px solid #E5E9F0;border-radius:7px;background:#fff;color:#192536;transition:background .2s,color .2s}.la2-arrows button:hover{background:#EA2024;color:#fff;border-color:#EA2024}
.la2-bottom{display:flex;align-items:center;gap:18px;margin-top:25px;padding:23px 0 0}.la2-bottom-mark{width:47px;height:47px;flex:none;border-radius:10px;background:#ffffff14;border:1px solid #ffffff2b;display:grid;place-items:center;color:#FF7779}.la2-bottom-text{flex:1}.la2-bottom-text strong{font-size:16px;display:block}.la2-bottom-text span{font-size:12px;display:block;color:#B8C4D1;margin-top:6px;line-height:1.5}.la2-bottom>button{background:#fff;border:1px solid #fff;border-radius:8px;color:#192536;display:inline-flex;align-items:center;justify-content:center;gap:13px;padding:14px 18px;font-size:12px;font-weight:800;white-space:nowrap;transition:transform .2s,background .2s}.la2-bottom>button:hover{transform:translateY(-2px);background:#F2F4F7}
@keyframes la2Spin{to{transform:rotate(360deg)}}@keyframes la2Breathe{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.18);opacity:1}}@keyframes la2Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}@keyframes la2Enter{from{opacity:.4;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1000px){.la2-top{grid-template-columns:1fr .45fr;gap:25px}.la2-top h2{font-size:clamp(42px,5vw,65px)}.la2-side-ring{width:230px;height:230px}.la2-side-ring-two{width:175px;height:175px}.la2-side-center strong{font-size:36px}.la2-stat{padding:25px 18px}.la2-intro-panel{padding:32px}.la2-review-panel{padding:27px}}
@media(max-width:760px){.la2-section{padding:72px 18px}.la2-top{grid-template-columns:1fr;margin-bottom:43px}.la2-top-side{display:none}.la2-stats{grid-template-columns:repeat(2,1fr)}.la2-stat:first-child{padding-left:18px}.la2-stat:nth-child(2){border-right:0}.la2-stat:nth-child(-n+2){border-bottom:1px solid #ffffff25}.la2-lower{grid-template-columns:1fr}.la2-bottom{flex-wrap:wrap}.la2-bottom>button{width:100%}}
@media(max-width:440px){.la2-section{padding:60px 15px}.la2-top h2{font-size:42px;letter-spacing:-2px}.la2-stat{padding:20px 12px!important}.la2-stat-number{font-size:37px;letter-spacing:-1.5px}.la2-stat h3{font-size:12px}.la2-intro-panel{padding:29px 24px;min-height:390px}.la2-review-panel{padding:25px 22px}.la2-review-body blockquote{font-size:20px}.la2-bottom-text strong{font-size:14px}}
@media(prefers-reduced-motion:reduce){.la2-section *,.la2-section *::before,.la2-section *::after{animation:none!important;transition:none!important}}
`;
