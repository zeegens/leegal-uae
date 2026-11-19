import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, LockKeyhole, UserRound, Phone, Building2, IdCard, Landmark, FolderOpen, CheckCircle2 } from 'lucide-react';

/** Standalone public page. No dashboard shell required.
 * onSignUp receives {firstName,lastName,email,phone,countryCode,password}.
 * The parent should connect it to an API; no success is shown without a resolved callback.
 */
export default function SignUp({ onSignUp, logoSrc, signInPath = '/login', dashboardPath = '/user/dashboard', onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', countryCode: '+971', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const submit = async e => {
    e.preventDefault(); setError('');
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim()) return setError('Please complete all required fields.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid email address.');
    if (!/^\d{6,15}$/.test(form.phone.replace(/[\s()-]/g, ''))) return setError('Enter a valid phone number.');
    if (form.password.length < 8 || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) return setError('Password must be at least 8 characters and include a number and special character.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    if (!onSignUp) return setError('Sign-up is not connected to your authentication API yet.');
    setBusy(true);
    try {
      const payload = { firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim().toLowerCase(), countryCode: form.countryCode, phone: form.phone.trim(), password: form.password };
      const result = await onSignUp(payload);
      if (onSuccess) await onSuccess(result, payload);
      else setCompleted(true);
    } catch (err) { setError(err?.message || 'Unable to create your account. Please try again.'); }
    finally { setBusy(false); }
  };
  const benefits = [
    { icon: Building2, title: 'Company formation', desc: 'Follow your application, licences and approvals.' },
    { icon: IdCard, title: 'Visas & immigration', desc: 'Stay updated on immigration applications.' },
    { icon: Landmark, title: 'Banking assistance', desc: 'Manage corporate banking support requests.' },
    { icon: FolderOpen, title: 'Documents & updates', desc: 'Keep your business documents in one place.' },
  ];
  return <div className="ls-root"><style>{styles}</style>
    <main className="ls-form-side">
      <div className="ls-form-inner">
        <Link to="/" className="ls-brand" aria-label="Leegal home">{logoSrc ? <img src={logoSrc} alt="Leegal" /> : <span>leegal<b>.</b><small>UAE</small></span>}</Link>
        {completed ? <div className="ls-completed"><span><CheckCircle2 size={30} /></span><h1>Account created</h1><p>Your account has been created successfully. You can now continue to the client portal.</p><button type="button" onClick={() => navigate(dashboardPath)}>Go to dashboard <ArrowRight size={17} /></button></div> : <>
          <div className="ls-intro"><span className="ls-kicker">CREATE YOUR ACCOUNT</span><h1>Get started with Leegal UAE</h1><p>Your company formation journey, documents and support — all in one secure workspace.</p></div>
          <form className="ls-form" onSubmit={submit} noValidate>
            <div className="ls-two"><label>First name <em>*</em><div className="ls-field"><UserRound size={17} /><input autoComplete="given-name" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First name" required /></div></label><label>Last name <em>*</em><div className="ls-field"><UserRound size={17} /><input autoComplete="family-name" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last name" required /></div></label></div>
            <label>Email address <em>*</em><div className="ls-field"><Mail size={17} /><input type="email" autoComplete="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required /></div></label>
            <label>Phone number <em>*</em><div className="ls-field ls-phone"><Phone size={17} /><select aria-label="Country calling code" value={form.countryCode} onChange={e => set('countryCode', e.target.value)}><option value="+971">+971</option><option value="+91">+91</option><option value="+1">+1</option><option value="+44">+44</option><option value="+966">+966</option><option value="+974">+974</option><option value="+968">+968</option><option value="+965">+965</option><option value="+973">+973</option></select><input type="tel" autoComplete="tel-national" inputMode="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone number" required /></div></label>
            <label>Create password <em>*</em><div className="ls-field"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Create a password" required /><button type="button" className="ls-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><span className="ls-hint">At least 8 characters, including a number and special character.</span></label>
            <label>Confirm password <em>*</em><div className="ls-field"><LockKeyhole size={17} /><input type={showConfirm ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="Confirm your password" required /><button type="button" className="ls-eye" onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'}>{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
            {error && <div className="ls-error" role="alert">{error}</div>}
            <button className="ls-submit" type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'} {!busy && <ArrowRight size={18} />}</button>
          </form>
          <p className="ls-signin">Already have an account? <Link to={signInPath}>Sign in</Link></p>
          <p className="ls-footer">By creating an account, you agree to the applicable Leegal UAE terms and privacy policy.</p>
        </>}
      </div>
    </main>
    <aside className="ls-visual"><div className="ls-visual-inner"><span className="ls-visual-kicker">YOUR BUSINESS. ONE WORKSPACE.</span><h2>Build your UAE business with <span>confidence.</span></h2><p className="ls-visual-lead">From formation to ongoing support, everything stays organized and accessible.</p><div className="ls-benefits">{benefits.map(({ icon: Icon, title, desc }) => <div className="ls-benefit" key={title}><span><Icon size={21} /></span><div><strong>{title}</strong><p>{desc}</p></div></div>)}</div></div></aside>
  </div>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.ls-root{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:100vh;background:#fff;font-family:'DM Sans',sans-serif;color:#192536}.ls-root *{box-sizing:border-box}.ls-root button,.ls-root input,.ls-root select{font-family:inherit}.ls-form-side{padding:34px clamp(24px,5vw,88px) 28px;display:flex;justify-content:center}.ls-form-inner{width:min(100%,520px)}.ls-brand{display:inline-flex;text-decoration:none;color:#192536;align-items:center;height:53px}.ls-brand img{max-height:46px;max-width:150px;object-fit:contain}.ls-brand>span{font-size:37px;letter-spacing:-2.2px;font-weight:800;line-height:1;position:relative}.ls-brand b{color:#EA2024}.ls-brand small{display:block;font-size:10px;letter-spacing:2.3px;text-align:right;margin-top:3px}.ls-intro{margin:35px 0 25px}.ls-kicker{font-size:10px;letter-spacing:1.6px;font-weight:800;color:#EA2024}.ls-intro h1{font-size:clamp(27px,2.65vw,38px);letter-spacing:-1.4px;line-height:1.15;margin:11px 0}.ls-intro p{font-size:13px;line-height:1.7;color:#79889B;max-width:460px;margin:0}.ls-form{display:grid;gap:17px}.ls-form label{display:block;font-size:12px;font-weight:750;color:#263348;min-width:0}.ls-form em{font-style:normal;color:#EA2024}.ls-two{display:grid;grid-template-columns:1fr 1fr;gap:14px}.ls-field{height:46px;border:1px solid #DEE5ED;border-radius:9px;display:flex;align-items:center;gap:10px;padding:0 13px;margin-top:8px;background:#fff;color:#8B9AAC;transition:border-color .15s}.ls-field:focus-within{border-color:#EA2024}.ls-field>svg{flex:none}.ls-field input{border:0;outline:0;min-width:0;flex:1;width:100%;font-size:12px;color:#192536;background:transparent}.ls-field input::placeholder{color:#A1ADBA}.ls-eye{border:0;background:none;color:#8B9AAC;cursor:pointer;display:grid;place-items:center;padding:4px}.ls-phone{gap:9px}.ls-phone select{width:76px;flex:none;border:0;border-right:1px solid #E5EAF0;padding-right:5px;outline:0;background:white;color:#192536;font-size:12px;font-weight:700}.ls-hint{display:block;color:#8E9BAC;font-size:10px;font-weight:500;line-height:1.5;margin-top:6px}.ls-error{border:1px solid #F6C9CC;background:#FFF3F3;color:#B91C24;padding:11px 12px;border-radius:8px;font-size:11px}.ls-submit{height:49px;width:100%;background:#EA2024;border:1px solid #EA2024;border-radius:9px;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;margin-top:4px}.ls-submit:hover:not(:disabled){background:#D91D21}.ls-submit:disabled{opacity:.65;cursor:wait}.ls-signin{text-align:center;font-size:12px;color:#7F8DA0;margin:23px 0 0}.ls-signin a{color:#EA2024;font-weight:800;text-decoration:none;margin-left:4px}.ls-footer{text-align:center;font-size:10px;line-height:1.65;color:#A0ABBA;margin:20px 0 0}.ls-visual{background:#F2F6FC url("/images/dubai-signup-bg.png") 65% center/cover no-repeat;position:relative;overflow:hidden;display:flex;align-items:flex-start;justify-content:center;padding:clamp(60px,9vh,110px) clamp(24px,3vw,55px) 200px}.ls-visual:before{content:'';position:absolute;inset:0;background:rgba(25,37,54,.32);pointer-events:none}.ls-visual:after{display:none}.ls-visual-inner{width:min(100%,380px);margin-right:auto;position:relative;z-index:2}.ls-visual-kicker{font-size:10px;letter-spacing:1.5px;font-weight:800;color:#FFFFFF}.ls-visual h2{color:#FFFFFF;font-size:clamp(30px,3vw,46px);line-height:1.14;letter-spacing:-1.8px;margin:16px 0 14px}.ls-visual h2 span{color:#FFFFFF}.ls-visual-lead{font-size:14px;color:#F2F5FA;line-height:1.8;margin:0 0 35px;max-width:420px}.ls-benefits{display:grid;gap:10px}.ls-benefit{display:flex;align-items:flex-start;gap:15px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.76);backdrop-filter:blur(5px)}.ls-benefit>span{width:46px;height:46px;display:grid;place-items:center;border-radius:11px;background:#FFF0F1;color:#EA2024;flex:none;border:1px solid #FCE1E3}.ls-benefit strong{font-size:14px}.ls-benefit p{font-size:12px;color:#77889C;line-height:1.6;margin:5px 0 0}.ls-skyline{position:absolute;bottom:0;left:0;right:0;height:180px;display:flex;align-items:flex-end;justify-content:space-around;opacity:.42;border-bottom:10px solid #AFC7DF}.ls-tower{display:block;width:9%;background:linear-gradient(90deg,#B9D0E6,#8FB1D1,#C5D9EC);border:1px solid #9FBBD5;position:relative}.ls-tower:after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 12px,#F2F6FC 12px 14px)}.ls-t1{height:43%}.ls-t2{height:67%}.ls-t3{height:54%}.ls-t4{height:83%}.ls-t5{height:62%}.ls-t6{height:100%;width:5%}.ls-t7{height:75%}.ls-t8{height:49%}.ls-completed{padding:90px 0 30px}.ls-completed>span{width:65px;height:65px;display:grid;place-items:center;background:#FFF0F1;color:#EA2024;border-radius:16px}.ls-completed h1{font-size:31px}.ls-completed p{color:#7F8DA0;line-height:1.8;font-size:13px}.ls-completed button{margin-top:15px;border:0;background:#EA2024;color:white;border-radius:9px;padding:13px 20px;display:flex;gap:10px;align-items:center;font-weight:750;cursor:pointer}.ls-root a:focus-visible,.ls-root button:focus-visible,.ls-root input:focus-visible{outline:2px solid #EA2024;outline-offset:2px}@media(max-width:1050px){.ls-visual{padding:85px 26px 190px}.ls-visual-inner{width:min(100%,350px)}.ls-form-side{padding-left:30px;padding-right:30px}}@media(max-width:800px){.ls-root{grid-template-columns:1fr}.ls-visual{display:none}.ls-form-side{padding:25px 22px 35px}.ls-form-inner{max-width:520px}.ls-intro{margin-top:32px}}@media(max-width:420px){.ls-two{grid-template-columns:1fr}.ls-intro h1{font-size:28px}.ls-form{gap:14px}}
`;
