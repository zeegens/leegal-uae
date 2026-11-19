import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail, LockKeyhole, Building2, IdCard, Landmark, FolderOpen } from 'lucide-react';

/** Standalone sign-in page, outside the dashboard shell.
 * onSignIn({ email, password, rememberMe }) must authenticate against your backend.
 * Navigation occurs only after onSignIn resolves successfully.
 */
export default function SignIn({
  onSignIn,
  onSuccess,
  logoSrc,
  signUpPath = '/signup',
  forgotPasswordPath = '/forgot-password',
  dashboardPath = '/user/dashboard',
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Enter your password.');
      return;
    }
    if (typeof onSignIn !== 'function') {
      setError('Sign in is not connected yet. Please connect your authentication API.');
      return;
    }
    setBusy(true);
    try {
      const result = await onSignIn({ email: email.trim(), password, rememberMe });
      if (result === false || result?.success === false) {
        throw new Error(result?.message || 'Unable to sign in. Please check your credentials.');
      }
      if (onSuccess) await onSuccess(result);
      else navigate(dashboardPath, { replace: true });
    } catch (err) {
      setError(err?.message || 'Sign in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const benefits = [
    { icon: Building2, title: 'Company formation', desc: 'Follow your application, licences and approvals.' },
    { icon: IdCard, title: 'Visas & immigration', desc: 'Stay updated on immigration applications.' },
    { icon: Landmark, title: 'Banking assistance', desc: 'Manage corporate banking support requests.' },
    { icon: FolderOpen, title: 'Documents & updates', desc: 'Keep your business documents in one place.' },
  ];

  return <div className="lsi-root"><style>{styles}</style>
    <main className="lsi-form-side"><div className="lsi-form-inner">
      <Link to="/" className="lsi-brand" aria-label="Leegal home">{logoSrc ? <img src={logoSrc} alt="Leegal" /> : <span>leegal<b>.</b><small>UAE</small></span>}</Link>
      <div className="lsi-login-area">
        <div className="lsi-intro"><span className="lsi-kicker">WELCOME BACK</span><h1>Sign in to Leegal UAE</h1><p>Access your UAE company workspace, track applications, and manage everything in one place.</p></div>
        <form className="lsi-form" onSubmit={submit} noValidate>
          <label htmlFor="lsi-email">Email address <em>*</em></label>
          <div className="lsi-field"><Mail size={18} /><input id="lsi-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required /></div>
          <div className="lsi-password-head"><label htmlFor="lsi-password">Password <em>*</em></label><Link to={forgotPasswordPath}>Forgot password?</Link></div>
          <div className="lsi-field"><LockKeyhole size={18} /><input id="lsi-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required /><button type="button" className="lsi-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <label className="lsi-remember"><input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} /> Remember me</label>
          {error && <p className="lsi-error" role="alert">{error}</p>}
          <button type="submit" className="lsi-submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} {!busy && <ArrowRight size={18} />}</button>
        </form>
        <p className="lsi-signup">Don't have an account? <Link to={signUpPath}>Create an account</Link></p>
        <p className="lsi-footer">Your company information is accessible through your secure Leegal UAE account.</p>
      </div>
    </div></main>
    <aside className="lsi-visual"><div className="lsi-visual-inner"><span className="lsi-visual-kicker">YOUR BUSINESS. ONE WORKSPACE.</span><h2>Build your UAE business with <span>confidence.</span></h2><p className="lsi-visual-lead">From formation to ongoing support, everything stays organized and accessible.</p><div className="lsi-benefits">{benefits.map(({ icon: Icon, title, desc }) => <div className="lsi-benefit" key={title}><span><Icon size={21} /></span><div><strong>{title}</strong><p>{desc}</p></div></div>)}</div></div></aside>
  </div>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
.lsi-root{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:100vh;background:#fff;font-family:'DM Sans',sans-serif;color:#192536}.lsi-root *{box-sizing:border-box}.lsi-root button,.lsi-root input{font-family:inherit}.lsi-form-side{padding:34px clamp(24px,5vw,88px) 28px;display:flex;justify-content:center}.lsi-form-inner{width:min(100%,520px);display:flex;flex-direction:column}.lsi-brand{display:inline-flex;text-decoration:none;color:#192536;align-items:center;height:53px;align-self:flex-start}.lsi-brand img{max-height:46px;max-width:150px;object-fit:contain}.lsi-brand>span{font-size:37px;letter-spacing:-2.2px;font-weight:800;line-height:1;position:relative}.lsi-brand b{color:#EA2024}.lsi-brand small{display:block;font-size:10px;letter-spacing:2.3px;text-align:right;margin-top:3px}.lsi-login-area{width:100%;margin:auto 0;padding:60px 0}.lsi-intro{margin-bottom:33px}.lsi-kicker{font-size:10px;letter-spacing:1.6px;font-weight:800;color:#EA2024}.lsi-intro h1{font-size:clamp(28px,2.65vw,38px);letter-spacing:-1.4px;line-height:1.15;margin:13px 0}.lsi-intro p{font-size:13px;line-height:1.8;color:#79889B;max-width:440px;margin:0}.lsi-form{display:flex;flex-direction:column}.lsi-form label{font-size:12px;font-weight:750;color:#263348}.lsi-form em{font-style:normal;color:#EA2024}.lsi-field{height:50px;border:1px solid #DEE5ED;border-radius:9px;display:flex;align-items:center;gap:11px;padding:0 14px;margin:9px 0 22px;background:#fff;color:#8B9AAC;transition:border-color .15s}.lsi-field:focus-within{border-color:#EA2024}.lsi-field>svg{flex:none}.lsi-field input{border:0;outline:0;min-width:0;flex:1;width:100%;font-size:12px;color:#192536;background:transparent}.lsi-field input::placeholder{color:#A1ADBA}.lsi-eye{border:0;background:none;color:#8B9AAC;cursor:pointer;display:grid;place-items:center;padding:4px}.lsi-password-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.lsi-password-head a{font-size:11px;color:#EA2024;font-weight:750;text-decoration:none}.lsi-remember{display:flex;align-items:center;gap:9px;cursor:pointer;margin:-3px 0 24px;color:#637287!important;font-weight:550!important}.lsi-remember input{accent-color:#EA2024;width:15px;height:15px}.lsi-submit{height:50px;width:100%;background:#EA2024;border:1px solid #EA2024;border-radius:9px;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer}.lsi-submit:hover:not(:disabled){background:#D91D21}.lsi-submit:disabled{opacity:.65;cursor:wait}.lsi-error{border:1px solid #F6C9CC;background:#FFF3F3;color:#B91C24;padding:11px 12px;border-radius:8px;font-size:11px;margin:0 0 17px}.lsi-signup{text-align:center;font-size:12px;color:#7F8DA0;margin:26px 0 0}.lsi-signup a{color:#EA2024;font-weight:800;text-decoration:none;margin-left:4px}.lsi-footer{text-align:center;font-size:10px;line-height:1.7;color:#A0ABBA;margin:22px 0 0}.lsi-visual{background:#F2F6FC url('/images/dubai-signup-bg.png') 65% center/cover no-repeat;position:relative;overflow:hidden;display:flex;align-items:flex-start;justify-content:center;padding:clamp(60px,9vh,110px) clamp(24px,3vw,55px) 200px}.lsi-visual:before{content:'';position:absolute;inset:0;background:rgba(25,37,54,.32);pointer-events:none}.lsi-visual-inner{width:min(100%,380px);margin-right:auto;position:relative;z-index:2}.lsi-visual-kicker{font-size:10px;letter-spacing:1.5px;font-weight:800;color:#FFFFFF}.lsi-visual h2{color:#FFFFFF;font-size:clamp(30px,3vw,46px);line-height:1.14;letter-spacing:-1.8px;margin:16px 0 14px}.lsi-visual h2 span{color:#FFFFFF}.lsi-visual-lead{font-size:14px;color:#F2F5FA;line-height:1.8;margin:0 0 35px;max-width:420px}.lsi-benefits{display:grid;gap:10px}.lsi-benefit{display:flex;align-items:flex-start;gap:15px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.76);backdrop-filter:blur(5px)}.lsi-benefit>span{width:46px;height:46px;display:grid;place-items:center;border-radius:11px;background:#FFF0F1;color:#EA2024;flex:none;border:1px solid #FCE1E3}.lsi-benefit strong{font-size:14px}.lsi-benefit p{font-size:12px;color:#77889C;line-height:1.6;margin:5px 0 0}.lsi-root a:focus-visible,.lsi-root button:focus-visible,.lsi-root input:focus-visible{outline:2px solid #EA2024;outline-offset:2px}@media(max-width:1050px){.lsi-visual{padding:85px 26px 190px}.lsi-visual-inner{width:min(100%,350px)}.lsi-form-side{padding-left:30px;padding-right:30px}}@media(max-width:800px){.lsi-root{grid-template-columns:1fr}.lsi-visual{display:none}.lsi-form-side{padding:25px 22px 35px;min-height:100vh}.lsi-form-inner{max-width:520px}.lsi-login-area{padding:65px 0}}@media(max-width:420px){.lsi-intro h1{font-size:28px}}
`;
