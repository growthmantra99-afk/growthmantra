import { useState, useEffect, useRef } from "react";
import founder from "./assets/images/founder.png";
import cofounder from "./assets/images/cofounder.jpeg";
import Neha from "./assets/images/Neha.jpeg";
import Sheetal from "./assets/images/sheetal.jpeg";
import Logo from "./assets/images/logo.jpeg";
import swati from "./assets/images/swati.jpeg";

/* ═══════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

:root{
  --ink:#07112b; --blue:#1558d6; --blue2:#2272ff; --blue3:#5b9eff;
  --orange:#f5600a; --orange2:#ff8533;
  --cream:#faf8f4; --mist:#eef3fc;
  --border:rgba(21,88,214,0.13);
  --font-h:'Bricolage Grotesque',sans-serif;
  --font-b:'DM Sans',sans-serif;
}
body{font-family:var(--font-b);background:var(--cream);color:var(--ink);overflow-x:hidden}

/* CURSOR */
.cur{width:10px;height:10px;border-radius:50%;background:var(--orange);position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .15s}
.cur-r{width:38px;height:38px;border-radius:50%;border:1.5px solid var(--blue2);position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%)}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:72px;background:rgba(250,248,244,0.92);backdrop-filter:blur(28px);border-bottom:1px solid var(--border);transition:box-shadow .3s}
.nav.sc{box-shadow:0 4px 40px rgba(21,88,214,0.1)}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-m{width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;box-shadow:0 2px 10px rgba(21,88,214,0.2);border:1.5px solid var(--border)}
.logo-m img{width:100%;height:100%;object-fit:cover;display:block}
.logo-t{font-family:var(--font-h);font-size:1.15rem;font-weight:800;color:var(--ink)}
.logo-t b{color:var(--blue)}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:.9rem;font-weight:500;color:#445;text-decoration:none;transition:color .2s;position:relative;cursor:pointer}
.nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:2px;background:var(--orange);border-radius:2px;transform:scaleX(0);transition:transform .25s}
.nav-links a:hover{color:var(--blue)}
.nav-links a:hover::after{transform:scaleX(1)}
.nav-links a.act{color:var(--blue);font-weight:700}
.nav-links a.act::after{transform:scaleX(1)}
.nav-r{display:flex;align-items:center;gap:14px}
.nav-ghost{font-size:.88rem;font-weight:600;color:var(--ink);opacity:.6;text-decoration:none;cursor:pointer;transition:opacity .2s;background:none;border:none;font-family:var(--font-b)}
.nav-ghost:hover{opacity:1}
.nav-cta{background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;border:none;border-radius:12px;padding:11px 24px;font-family:var(--font-b);font-size:.9rem;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 18px rgba(245,96,10,.3);display:flex;align-items:center;gap:8px}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(245,96,10,.42)}
.hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.hbg span{width:24px;height:2px;background:var(--ink);border-radius:2px;display:block}
.mob-menu{position:fixed;top:72px;left:0;right:0;z-index:499;background:rgba(250,248,244,.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:24px 5%;display:flex;flex-direction:column;gap:16px;box-shadow:0 8px 40px rgba(21,88,214,.1)}
.mob-menu a{font-size:1rem;font-weight:600;color:var(--ink);text-decoration:none;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer}

/* HERO */
.hero{min-height:100vh;padding:130px 5% 80px;display:flex;align-items:center;position:relative;overflow:hidden;background:var(--cream)}
.hero-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 65% 40%,rgba(21,88,214,.08) 0%,transparent 70%),radial-gradient(ellipse 50% 50% at 20% 80%,rgba(245,96,10,.06) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 90% 10%,rgba(91,158,255,.1) 0%,transparent 70%)}
.hero-grid{position:absolute;inset:0;z-index:0;opacity:.4;background-image:linear-gradient(rgba(21,88,214,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(21,88,214,.07) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 60% 40%,black 0%,transparent 70%)}
.blob{position:absolute;border-radius:50%;filter:blur(80px);z-index:0;animation:drift 8s ease-in-out infinite}
@keyframes drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.05)}}
.hero-in{display:flex;align-items:center;gap:60px;position:relative;z-index:1;width:100%;max-width:1300px;margin:0 auto}
.hero-l{flex:1.15}
.hero-r{flex:1;position:relative}

.badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(21,88,214,.08),rgba(91,158,255,.1));border:1px solid rgba(21,88,214,.18);border-radius:50px;padding:8px 18px;margin-bottom:28px;animation:fup .6s ease both}
.badge-live{width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:ping 2s infinite}
@keyframes ping{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)}50%{box-shadow:0 0 0 6px rgba(34,197,94,0)}}
.badge-txt{font-size:.78rem;font-weight:700;color:var(--blue);letter-spacing:.06em;text-transform:uppercase}

.h-title{font-family:var(--font-h);font-size:clamp(2.6rem,5.5vw,4.2rem);font-weight:800;line-height:1.07;color:var(--ink);margin-bottom:22px;animation:fup .7s .1s ease both}
.h-grad{display:inline-block;background:linear-gradient(135deg,var(--blue),var(--blue2),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gshift 4s ease infinite}
@keyframes gshift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.h-ul{position:relative;display:inline-block}
.h-ul::after{content:'';position:absolute;bottom:-4px;left:0;height:4px;width:100%;border-radius:4px;background:linear-gradient(to right,var(--orange),var(--orange2));animation:lgrow 1s .8s ease both;transform-origin:left;transform:scaleX(0)}
@keyframes lgrow{to{transform:scaleX(1)}}

.h-desc{font-size:1.08rem;line-height:1.72;color:#556;max-width:500px;margin-bottom:38px;font-weight:300;animation:fup .7s .2s ease both}
.h-desc strong{color:var(--ink);font-weight:600}
.h-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;animation:fup .7s .3s ease both}
.btn-main{background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border:none;border-radius:14px;padding:15px 32px;font-family:var(--font-b);font-size:.97rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(21,88,214,.3);transition:all .25s;position:relative;overflow:hidden}
.btn-main::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--blue2),var(--blue3));opacity:0;transition:opacity .3s}
.btn-main:hover{transform:translateY(-3px);box-shadow:0 14px 44px rgba(21,88,214,.42)}
.btn-main:hover::before{opacity:1}
.btn-main span,.btn-main svg{position:relative;z-index:1}
.btn-play{display:flex;align-items:center;gap:12px;cursor:pointer;border:none;background:none;font-family:var(--font-b);font-size:.92rem;font-weight:600;color:var(--ink)}
.play-ring{width:48px;height:48px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;transition:all .25s;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);box-shadow:0 4px 16px rgba(21,88,214,.1)}
.btn-play:hover .play-ring{border-color:var(--orange);box-shadow:0 4px 20px rgba(245,96,10,.25);transform:scale(1.08)}

.h-trust{display:flex;align-items:center;gap:14px;margin-top:36px;animation:fup .7s .4s ease both}
.trust-avs{display:flex}
.tav{width:34px;height:34px;border-radius:50%;border:2.5px solid var(--cream);display:flex;align-items:center;justify-content:center;font-size:.9rem;margin-left:-10px}
.tav:first-child{margin-left:0}
.trust-txt{font-size:.82rem;color:#667}
.trust-txt strong{color:var(--ink);font-weight:700}
.stars{display:flex;gap:2px;color:#f59e0b;font-size:.85rem;margin-bottom:2px}

@keyframes fup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

/* DASHBOARD */
.dash{background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(21,88,214,.18),0 4px 24px rgba(0,0,0,.06);border:1px solid var(--border);animation:fup .8s .3s ease both;position:relative}
.dash-hdr{background:linear-gradient(135deg,var(--blue),var(--blue2));padding:16px 20px;display:flex;align-items:center;gap:10px}
.dash-dots{display:flex;gap:6px}
.dash-dot{width:10px;height:10px;border-radius:50%}
.dash-url{flex:1;background:rgba(255,255,255,.15);border-radius:6px;height:26px;display:flex;align-items:center;padding:0 12px}
.dash-url span{color:rgba(255,255,255,.7);font-size:.75rem}
.dash-body{padding:20px;background:#f8faff}
.dash-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.dm{background:#fff;border-radius:14px;padding:16px;border:1px solid var(--border);transition:transform .25s}
.dm:hover{transform:translateY(-2px)}
.dm-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
.dm-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center}
.dm-badge{font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px}
.dm-val{font-family:var(--font-h);font-size:1.5rem;font-weight:800;color:var(--ink);line-height:1}
.dm-lbl{font-size:.72rem;color:#88a;margin-top:4px;font-weight:500}
.dm-spark{display:flex;align-items:flex-end;gap:3px;margin-top:10px;height:28px}
.dm-bar{border-radius:3px 3px 0 0;flex:1}
.dash-chart{background:#fff;border-radius:14px;padding:16px;border:1px solid var(--border)}
.dash-ct{font-size:.8rem;font-weight:700;color:var(--ink);margin-bottom:12px;display:flex;justify-content:space-between;align-items:center}
.dash-cbadge{background:rgba(34,197,94,.1);color:#16a34a;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px}
.dash-svg-wrap{position:relative;height:70px}
.dash-svg{width:100%;height:100%;overflow:visible}
.dash-recent{margin-top:14px}
.dash-rt{font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:10px;opacity:.6;text-transform:uppercase;letter-spacing:.06em}
.dash-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.dash-row:last-child{border-bottom:none}
.dash-av{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:#fff}
.dash-n{flex:1;font-size:.8rem;font-weight:600;color:var(--ink)}
.dash-v{font-size:.78rem;font-weight:700;color:#22c55e}
.float-card{position:absolute;background:#fff;border-radius:14px;padding:10px 14px;box-shadow:0 8px 32px rgba(21,88,214,.18);border:1px solid var(--border);display:flex;align-items:center;gap:10px;white-space:nowrap;animation:floatY 4s ease-in-out infinite}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.fc1{top:40px;right:-44px}
.fc2{bottom:60px;left:-48px;animation-delay:2s}
.fc-ico{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center}
.fc-val{font-family:var(--font-h);font-size:1rem;font-weight:800;color:var(--ink)}
.fc-lbl{font-size:.7rem;color:#88a;margin-top:1px}

/* MARQUEE */
.mq{background:var(--ink);padding:16px 0;overflow:hidden}
.mq-track{display:flex;animation:mq 28s linear infinite;width:max-content}
.mq-track:hover{animation-play-state:paused}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mq-item{display:flex;align-items:center;gap:12px;padding:0 40px;border-right:1px solid rgba(255,255,255,.1)}
.mq-dot{width:6px;height:6px;background:var(--orange);border-radius:50%}
.mq-txt{color:rgba(255,255,255,.5);font-size:.82rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.mq-txt b{color:#fff}

/* SECTIONS */
.sec{padding:96px 5%;max-width:1400px;margin:0 auto}
.sec-full{padding:96px 5%}
.sec-lbl{display:inline-flex;align-items:center;gap:8px;margin-bottom:14px;font-size:.74rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--orange)}
.sec-lbl::before{content:'';width:20px;height:2px;background:var(--orange);border-radius:2px}
.sec-h2{font-family:var(--font-h);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:var(--ink);margin-bottom:16px;line-height:1.15}
.sec-p{font-size:1rem;line-height:1.7;color:#667;max-width:540px;font-weight:300}
.ctr{text-align:center}
.ctr .sec-lbl{justify-content:center}
.ctr .sec-p{margin:0 auto}

/* BENTO */
.bento{display:grid;grid-template-columns:repeat(12,1fr);gap:20px}
.bc{background:#fff;border-radius:22px;padding:32px;border:1.5px solid var(--border);transition:all .3s cubic-bezier(.22,.68,0,1.2);cursor:default;position:relative;overflow:hidden}
.bc::before{content:'';position:absolute;inset:0;border-radius:22px;opacity:0;transition:opacity .3s;background:linear-gradient(135deg,rgba(21,88,214,.04),rgba(91,158,255,.06))}
.bc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(21,88,214,.14);border-color:rgba(21,88,214,.3)}
.bc:hover::before{opacity:1}
.b1{grid-column:span 5}.b2{grid-column:span 7}.b3{grid-column:span 4}.b4{grid-column:span 4}.b5{grid-column:span 4}.b6{grid-column:span 7}.b7{grid-column:span 5}
.bi{width:56px;height:56px;border-radius:16px;margin-bottom:22px;display:flex;align-items:center;justify-content:center}
.bc h3{font-family:var(--font-h);font-size:1.12rem;font-weight:700;margin-bottom:10px;color:var(--ink)}
.bc p{font-size:.88rem;line-height:1.65;color:#667}
.b-num{font-family:var(--font-h);font-size:3.5rem;font-weight:800;line-height:1;background:linear-gradient(135deg,var(--blue),var(--blue2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.b-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.b-tag{font-size:.75rem;font-weight:700;padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);color:var(--blue);background:rgba(21,88,214,.05)}
.b-vis{height:80px;display:flex;align-items:flex-end;gap:6px;margin-top:20px}
.b-bar{border-radius:4px 4px 0 0;flex:1}
.b-prog{margin-top:20px}
.b-pr{display:flex;justify-content:space-between;margin-bottom:6px;font-size:.78rem;font-weight:600;color:var(--ink)}
.b-pt{height:6px;background:var(--mist);border-radius:6px;overflow:hidden;margin-bottom:12px}
.b-pf{height:100%;border-radius:6px}

/* NUMBERS */
.nums{background:linear-gradient(135deg,var(--ink) 0%,#0f2155 100%);padding:80px 5%;position:relative;overflow:hidden}
.nums::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(21,88,214,.25) 0%,transparent 70%)}
.nums-g{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;position:relative;z-index:1;max-width:1200px;margin:0 auto}
.nc{text-align:center;padding:40px 24px;background:rgba(255,255,255,.04);border-radius:20px;border:1px solid rgba(255,255,255,.08);transition:all .3s}
.nc:hover{background:rgba(255,255,255,.08);transform:translateY(-4px)}
.nc-ico{font-size:2rem;margin-bottom:12px}
.nc-val{font-family:var(--font-h);font-size:3rem;font-weight:800;color:#fff;line-height:1}
.nc-val span{color:var(--orange)}
.nc-lbl{color:rgba(255,255,255,.45);font-size:.85rem;margin-top:8px}

/* ════════════════════════════════════════════════
   FOUNDER / CO-FOUNDER SHARED STYLES
════════════════════════════════════════════════ */
.founder-section{padding:100px 5%;background:var(--cream);position:relative;overflow:hidden;}
.founder-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 0% 50%, rgba(21,88,214,.05) 0%, transparent 60%),radial-gradient(ellipse 50% 60% at 100% 50%, rgba(245,96,10,.05) 0%, transparent 60%);pointer-events:none;}
.founder-section::after{content:'';position:absolute;inset:0;background-image:radial-gradient(circle, rgba(21,88,214,.07) 1px, transparent 1px);background-size:36px 36px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);pointer-events:none;z-index:0;}
.cofounder-section{padding:100px 5%;position:relative;overflow:hidden;background:var(--mist);}
.cofounder-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 100% 50%, rgba(245,96,10,.06) 0%, transparent 60%),radial-gradient(ellipse 50% 60% at 0% 50%, rgba(21,88,214,.06) 0%, transparent 60%);pointer-events:none;}
.cofounder-section::after{content:'';position:absolute;inset:0;background-image:radial-gradient(circle, rgba(245,96,10,.07) 1px, transparent 1px);background-size:36px 36px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);pointer-events:none;z-index:0;}
.founder-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.35fr;gap:72px;align-items:center;position:relative;z-index:1;}
.founder-inner-reverse{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.35fr 1fr;gap:72px;align-items:center;position:relative;z-index:1;}
.founder-img-col{position:relative;display:flex;flex-direction:column;align-items:center;}
.founder-ring{position:absolute;width:400px;height:400px;border-radius:50%;border:1.5px dashed rgba(21,88,214,.18);top:50%;left:50%;transform:translate(-50%,-50%);animation:slowSpin 28s linear infinite;}
.founder-ring-2{position:absolute;width:320px;height:320px;border-radius:50%;border:1px solid rgba(245,96,10,.12);top:50%;left:50%;transform:translate(-50%,-50%);animation:slowSpin 20s linear infinite reverse;}
.cofounder-ring{position:absolute;width:400px;height:400px;border-radius:50%;border:1.5px dashed rgba(245,96,10,.18);top:50%;left:50%;transform:translate(-50%,-50%);animation:slowSpin 28s linear infinite;}
.cofounder-ring-2{position:absolute;width:320px;height:320px;border-radius:50%;border:1px solid rgba(21,88,214,.12);top:50%;left:50%;transform:translate(-50%,-50%);animation:slowSpin 20s linear infinite reverse;}
@keyframes slowSpin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
.founder-blob{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle, rgba(21,88,214,.18) 0%, transparent 70%);filter:blur(40px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.cofounder-blob{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle, rgba(245,96,10,.15) 0%, transparent 70%);filter:blur(40px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.founder-photo-wrap{position:relative;width:260px;height:260px;border-radius:28px;padding:4px;background:linear-gradient(145deg, var(--blue), var(--blue2), var(--orange));box-shadow:0 32px 80px rgba(21,88,214,.28), 0 8px 32px rgba(0,0,0,.12);transition:transform .4s cubic-bezier(.22,.68,0,1.2), box-shadow .4s;}
.founder-photo-wrap:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 48px 100px rgba(21,88,214,.34), 0 12px 40px rgba(0,0,0,.16);}
.cofounder-photo-wrap{position:relative;width:260px;height:260px;border-radius:28px;padding:4px;background:linear-gradient(145deg, var(--orange), var(--orange2), var(--blue2));box-shadow:0 32px 80px rgba(245,96,10,.22), 0 8px 32px rgba(0,0,0,.12);transition:transform .4s cubic-bezier(.22,.68,0,1.2), box-shadow .4s;}
.cofounder-photo-wrap:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 48px 100px rgba(245,96,10,.28), 0 12px 40px rgba(0,0,0,.16);}
.founder-photo-inner{width:100%;height:100%;border-radius:24px;overflow:hidden;background:var(--mist);}
.founder-photo{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .5s ease;}
.founder-photo-wrap:hover .founder-photo,.cofounder-photo-wrap:hover .founder-photo{transform:scale(1.04);}
.founder-badge-1{position:absolute;top:-18px;right:-28px;background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:10px 14px;box-shadow:0 8px 32px rgba(21,88,214,.16);display:flex;align-items:center;gap:8px;white-space:nowrap;animation:floatY 4s ease-in-out infinite;}
.founder-badge-2{position:absolute;bottom:-20px;left:-32px;background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:10px 14px;box-shadow:0 8px 32px rgba(21,88,214,.16);display:flex;align-items:center;gap:8px;white-space:nowrap;animation:floatY 5s ease-in-out infinite;animation-delay:2.5s;}
.fb-ico{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;}
.fb-val{font-family:var(--font-h);font-size:.92rem;font-weight:800;color:var(--ink);line-height:1.1}
.fb-lbl{font-size:.65rem;color:#88a;font-weight:500;margin-top:1px}
.founder-nameplate{margin-top:28px;text-align:center;position:relative;z-index:2;}
.founder-name{font-family:var(--font-h);font-size:1.35rem;font-weight:800;color:var(--ink);margin-bottom:6px;letter-spacing:-.01em;}
.founder-role-pill{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border-radius:50px;padding:6px 18px;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 4px 16px rgba(21,88,214,.3);margin-bottom:14px;}
.cofounder-role-pill{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;border-radius:50px;padding:6px 18px;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 4px 16px rgba(245,96,10,.3);margin-bottom:14px;}
.founder-role-dot{width:6px;height:6px;background:rgba(255,255,255,.6);border-radius:50%;}
.founder-socials{display:flex;gap:8px;justify-content:center;margin-top:10px;}
.founder-soc-btn{width:36px;height:36px;border-radius:10px;border:1.5px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;color:#667;}
.founder-soc-btn:hover{background:linear-gradient(135deg,var(--blue),var(--blue2));border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 6px 18px rgba(21,88,214,.28);}
.cofounder-soc-btn{width:36px;height:36px;border-radius:10px;border:1.5px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;color:#667;}
.cofounder-soc-btn:hover{background:linear-gradient(135deg,var(--orange),var(--orange2));border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 6px 18px rgba(245,96,10,.28);}
.founder-content-col{display:flex;flex-direction:column;gap:0;}
.founder-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.74rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:18px;}
.founder-eyebrow::before{content:'';width:20px;height:2px;background:var(--orange);border-radius:2px;}
.cofounder-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.74rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--blue);margin-bottom:18px;}
.cofounder-eyebrow::before{content:'';width:20px;height:2px;background:var(--blue);border-radius:2px;}
.founder-headline{font-family:var(--font-h);font-size:clamp(1.9rem,3.2vw,2.6rem);font-weight:800;color:var(--ink);line-height:1.12;margin-bottom:22px;}
.founder-headline span{background:linear-gradient(135deg,var(--blue),var(--blue2),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.founder-quote{position:relative;margin:0 0 28px;padding:22px 24px 22px 32px;background:linear-gradient(135deg, rgba(21,88,214,.05), rgba(91,158,255,.07));border-left:3px solid var(--blue);border-radius:0 16px 16px 0;}
.cofounder-quote{position:relative;margin:0 0 28px;padding:22px 24px 22px 32px;background:linear-gradient(135deg, rgba(245,96,10,.05), rgba(255,133,51,.07));border-left:3px solid var(--orange);border-radius:0 16px 16px 0;}
.founder-quote-mark{font-family:Georgia,serif;font-size:3.6rem;line-height:.5;color:rgba(21,88,214,.18);display:block;margin-bottom:6px;}
.cofounder-quote-mark{font-family:Georgia,serif;font-size:3.6rem;line-height:.5;color:rgba(245,96,10,.18);display:block;margin-bottom:6px;}
.founder-quote-text{font-size:1.05rem;font-style:italic;color:#334;line-height:1.65;font-weight:400;}
.founder-body{font-size:.96rem;line-height:1.78;color:#556;font-weight:300;margin-bottom:22px;}
.founder-body strong{color:var(--ink);font-weight:600;}
.founder-stats-row{display:flex;gap:14px;flex-wrap:wrap;margin:28px 0 32px;}
.founder-stat{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 22px;background:#fff;border:1.5px solid var(--border);border-radius:18px;min-width:100px;flex:1;transition:all .25s;box-shadow:0 2px 12px rgba(21,88,214,.05);}
.founder-stat:hover{border-color:rgba(21,88,214,.3);box-shadow:0 8px 32px rgba(21,88,214,.12);transform:translateY(-3px);}
.founder-stat-val{font-family:var(--font-h);font-size:1.6rem;font-weight:800;background:linear-gradient(135deg,var(--blue),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:5px;}
.founder-stat-lbl{font-size:.72rem;font-weight:600;color:#88a;text-align:center;text-transform:uppercase;letter-spacing:.05em;line-height:1.3;}
.founder-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;}
.founder-tag{display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:700;padding:7px 14px;border-radius:50px;border:1.5px solid var(--border);color:var(--blue);background:rgba(21,88,214,.04);transition:all .2s;}
.founder-tag:hover{background:rgba(21,88,214,.08);border-color:rgba(21,88,214,.3);transform:translateY(-2px);}
.cofounder-tag{display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:700;padding:7px 14px;border-radius:50px;border:1.5px solid rgba(245,96,10,.2);color:var(--orange);background:rgba(245,96,10,.04);transition:all .2s;}
.cofounder-tag:hover{background:rgba(245,96,10,.09);border-color:rgba(245,96,10,.35);transform:translateY(-2px);}
.founder-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--orange);}
.cofounder-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);}
.founder-cta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.founder-divider{width:60px;height:3px;border-radius:3px;background:linear-gradient(to right,var(--blue),var(--orange));margin-bottom:22px;}
.cofounder-divider{width:60px;height:3px;border-radius:3px;background:linear-gradient(to right,var(--orange),var(--blue));margin-bottom:22px;}
.team-connector{display:flex;align-items:center;justify-content:center;gap:20px;padding:0 5%;background:var(--cream);position:relative;z-index:1;}
.team-connector-line{flex:1;height:1px;background:linear-gradient(to right, transparent, var(--border), transparent);max-width:300px;}
.team-connector-pill{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1.5px solid var(--border);border-radius:50px;padding:10px 24px;box-shadow:0 4px 20px rgba(21,88,214,.07);}
.team-connector-pill span{font-family:var(--font-h);font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);}
.team-connector-dot{width:7px;height:7px;border-radius:50%;background:var(--orange);}

@media(max-width:960px){
  .founder-inner,.founder-inner-reverse{grid-template-columns:1fr;gap:52px;text-align:center;}
  .founder-inner-reverse .founder-content-col{order:-1;}
  .founder-img-col{align-items:center}
  .founder-eyebrow,.cofounder-eyebrow{justify-content:center}
  .founder-quote,.cofounder-quote{text-align:left}
  .founder-stats-row{justify-content:center}
  .founder-tags,.founder-cta-row{justify-content:center}
  .team-connector{display:none}
}
@media(max-width:520px){
  .founder-badge-1,.founder-badge-2{display:none}
  .founder-ring,.founder-ring-2,.cofounder-ring,.cofounder-ring-2{display:none}
  .founder-photo-wrap,.cofounder-photo-wrap{width:220px;height:220px}
}

/* MISSION & VISION */
.mv-section{padding:96px 5%;background:var(--cream);position:relative;overflow:hidden}
.mv-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 5% 50%,rgba(21,88,214,.05) 0%,transparent 65%),radial-gradient(ellipse 45% 60% at 95% 50%,rgba(245,96,10,.05) 0%,transparent 65%);pointer-events:none}
.mv-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1}
.mv-header{text-align:center;margin-bottom:60px}
.mv-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:stretch}
.mv-card{border-radius:28px;padding:52px 48px;position:relative;overflow:hidden;border:1.5px solid var(--border);transition:all .35s cubic-bezier(.22,.68,0,1.2);display:flex;flex-direction:column;gap:20px}
.mv-card:hover{transform:translateY(-8px);box-shadow:0 28px 72px rgba(21,88,214,.16)}
.mv-card-vision{background:#fff;border-color:rgba(21,88,214,.18)}
.mv-card-vision:hover{border-color:rgba(21,88,214,.38)}
.mv-card-mission{background:linear-gradient(145deg,var(--ink) 0%,#0f2155 100%);border-color:rgba(21,88,214,.35)}
.mv-card::after{content:'';position:absolute;top:0;left:0;right:0;height:4px;border-radius:28px 28px 0 0}
.mv-card-vision::after{background:linear-gradient(to right,var(--blue),var(--blue2),var(--blue3))}
.mv-card-mission::after{background:linear-gradient(to right,var(--orange),var(--orange2))}
.mv-card-bg-shape{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none}
.mv-card-vision .mv-card-bg-shape{width:300px;height:300px;bottom:-80px;right:-60px;background:radial-gradient(circle,rgba(21,88,214,.07),transparent 70%)}
.mv-card-mission .mv-card-bg-shape{width:300px;height:300px;top:-60px;left:-40px;background:radial-gradient(circle,rgba(245,96,10,.15),transparent 70%)}
.mv-type-badge{display:inline-flex;align-items:center;gap:8px;border-radius:50px;padding:7px 16px;width:fit-content;font-size:.72rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.mv-card-vision .mv-type-badge{background:rgba(21,88,214,.07);color:var(--blue);border:1px solid rgba(21,88,214,.15)}
.mv-card-mission .mv-type-badge{background:rgba(245,96,10,.15);color:var(--orange2);border:1px solid rgba(245,96,10,.25)}
.mv-type-ico{width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.82rem}
.mv-card-vision .mv-type-ico{background:rgba(21,88,214,.12)}
.mv-card-mission .mv-type-ico{background:rgba(245,96,10,.2)}
.mv-card-title{font-family:var(--font-h);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:800;line-height:1.1}
.mv-card-vision .mv-card-title{color:var(--ink)}
.mv-card-mission .mv-card-title{color:#fff}
.mv-quote-mark{font-family:Georgia,serif;font-size:5rem;line-height:.6;font-weight:700;display:block;margin-bottom:4px}
.mv-card-vision .mv-quote-mark{color:rgba(21,88,214,.12)}
.mv-card-mission .mv-quote-mark{color:rgba(245,96,10,.2)}
.mv-card-text{font-size:1.1rem;line-height:1.72;font-weight:300;position:relative;z-index:1}
.mv-card-vision .mv-card-text{color:#445}
.mv-card-mission .mv-card-text{color:rgba(255,255,255,.75)}
.mv-card-divider{width:48px;height:3px;border-radius:3px}
.mv-card-vision .mv-card-divider{background:linear-gradient(to right,var(--blue),var(--blue2))}
.mv-card-mission .mv-card-divider{background:linear-gradient(to right,var(--orange),var(--orange2))}
@media(max-width:780px){.mv-grid{grid-template-columns:1fr}.mv-card{padding:36px 28px}}

/* TESTIMONIALS */
.testi{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.tc{background:#fff;border-radius:22px;padding:32px;border:1.5px solid var(--border);transition:all .3s;position:relative;overflow:hidden}
.tc::before{content:'"';position:absolute;top:16px;right:24px;font-size:6rem;line-height:1;color:rgba(21,88,214,.06);font-family:Georgia,serif}
.tc:hover{box-shadow:0 20px 60px rgba(21,88,214,.12);transform:translateY(-4px);border-color:rgba(21,88,214,.25)}
.tc-stars{display:flex;gap:3px;margin-bottom:16px}
.tc-stars span{color:#f59e0b;font-size:.9rem}
.tc-txt{font-size:.93rem;line-height:1.7;color:#445;margin-bottom:24px;font-style:italic}
.tc-auth{display:flex;align-items:center;gap:12px}
.tc-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.tc-name{font-weight:700;font-size:.9rem;color:var(--ink)}
.tc-co{font-size:.78rem;color:#88a}
.logo-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;margin-top:52px}
.logo-pill{background:#fff;border:1.5px solid var(--border);border-radius:50px;padding:10px 24px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:.88rem;color:#556;transition:all .2s}
.logo-pill:hover{border-color:var(--blue);color:var(--blue);transform:translateY(-2px)}
.lp-dot{width:10px;height:10px;border-radius:50%}

/* CTA BAND */
.cta-band{margin:0 5% 80px;border-radius:28px;overflow:hidden;background:linear-gradient(135deg,var(--blue) 0%,var(--blue2) 60%,#5b9eff 100%);padding:72px 8%;display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative}
.cta-band::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 50%,rgba(255,255,255,.1) 0%,transparent 50%)}
.cta-l{position:relative;z-index:1}
.cta-l h2{font-family:var(--font-h);font-size:clamp(1.7rem,3vw,2.4rem);color:#fff;font-weight:800;margin-bottom:12px}
.cta-l p{color:rgba(255,255,255,.7);font-size:1rem;max-width:420px;line-height:1.65}
.cta-r{display:flex;flex-direction:column;gap:14px;position:relative;z-index:1;align-items:flex-start}
.btn-white{background:#fff;color:var(--blue);border:none;border-radius:14px;padding:15px 32px;font-family:var(--font-b);font-size:.97rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:10px;transition:all .25s;box-shadow:0 8px 32px rgba(0,0,0,.15);white-space:nowrap}
.btn-white:hover{transform:translateY(-3px);box-shadow:0 14px 44px rgba(0,0,0,.22)}
.btn-ghost2{background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(255,255,255,.3);border-radius:14px;padding:13px 28px;font-family:var(--font-b);font-size:.92rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}
.btn-ghost2:hover{background:rgba(255,255,255,.2)}
.cta-note{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.6);font-size:.78rem}

/* FOOTER */
.footer{background:var(--ink);position:relative;overflow:hidden}
.footer::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 80% 100%, rgba(21,88,214,.18) 0%, transparent 60%),radial-gradient(ellipse 50% 40% at 10% 0%, rgba(245,96,10,.1) 0%, transparent 55%);pointer-events:none}
.footer-accent{height:3px;background:linear-gradient(to right, var(--orange), var(--blue2), var(--orange));background-size:200% 100%;animation:gshift 6s ease infinite}
.footer-main{padding:72px 5% 0;position:relative;z-index:1;max-width:1400px;margin:0 auto}
.footer-upper{display:grid;grid-template-columns:1.6fr 1fr;gap:60px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,.06);align-items:center}
.footer-logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:18px}
.footer-logo-m{width:38px;height:38px;border-radius:50%;overflow:hidden;flex-shrink:0;box-shadow:0 4px 14px rgba(21,88,214,.25);border:1.5px solid rgba(255,255,255,.15)}
.footer-logo-m img{width:100%;height:100%;object-fit:cover;display:block}
.footer-logo-t{font-family:var(--font-h);font-size:1.2rem;font-weight:800;color:#fff}
.footer-logo-t b{color:var(--blue3)}
.footer-tagline{font-size:.95rem;color:rgba(255,255,255,.45);line-height:1.7;max-width:340px;font-weight:300;margin-bottom:28px}
.footer-social{display:flex;gap:10px}
.f-sc{width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;background:rgba(255,255,255,.04);color:rgba(255,255,255,.5)}
.f-sc:hover{background:linear-gradient(135deg,var(--orange),var(--orange2));border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 8px 24px rgba(245,96,10,.3)}
.footer-newsletter-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:32px}
.footer-nl-title{font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:6px}
.footer-nl-sub{font-size:.83rem;color:rgba(255,255,255,.4);margin-bottom:18px;line-height:1.5}
.footer-nl-form{display:flex;gap:8px}
.footer-nl-input{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 16px;font-family:var(--font-b);font-size:.88rem;color:#fff;outline:none;transition:border-color .2s}
.footer-nl-input::placeholder{color:rgba(255,255,255,.3)}
.footer-nl-input:focus{border-color:rgba(21,88,214,.5);background:rgba(255,255,255,.09)}
.footer-nl-btn{background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;border:none;border-radius:12px;padding:12px 20px;font-family:var(--font-b);font-size:.88rem;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap;box-shadow:0 4px 16px rgba(245,96,10,.3)}
.footer-nl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,96,10,.45)}
.footer-nl-note{display:flex;align-items:center;gap:6px;margin-top:10px;font-size:.75rem;color:rgba(255,255,255,.3)}
.footer-links{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;padding:48px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.footer-col-title{font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:20px;display:flex;align-items:center;gap:8px}
.footer-col-title::before{content:'';width:16px;height:2px;background:var(--orange);border-radius:2px;flex-shrink:0}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.footer-col a{color:rgba(255,255,255,.45);font-size:.88rem;text-decoration:none;transition:all .2s;font-weight:400;cursor:pointer;display:flex;align-items:center;gap:8px}
.footer-col a::before{content:'→';font-size:.7rem;color:var(--orange);opacity:0;transform:translateX(-6px);transition:all .2s}
.footer-col a:hover{color:#fff;padding-left:4px}
.footer-col a:hover::before{opacity:1;transform:translateX(0)}
.footer-contact-item{display:flex;align-items:flex-start;gap:12px;color:rgba(255,255,255,.45);font-size:.87rem;line-height:1.5;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);transition:color .2s}
.footer-contact-item:last-child{border-bottom:none}
.footer-contact-item:hover{color:rgba(255,255,255,.8)}
.footer-contact-icon{width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
.footer-bottom{padding:24px 0 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
.footer-bottom-left{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.footer-copyright{color:rgba(255,255,255,.22);font-size:.8rem}
.footer-legal-links{display:flex;gap:16px}
.footer-legal-links a{color:rgba(255,255,255,.25);font-size:.78rem;text-decoration:none;transition:color .2s;cursor:pointer}
.footer-legal-links a:hover{color:rgba(255,255,255,.6)}
.footer-bottom-right{display:flex;align-items:center;gap:16px}
.footer-badge{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:50px;padding:7px 16px;color:rgba(255,255,255,.35);font-size:.75rem;font-weight:600;transition:all .2s}
.footer-badge:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.6)}
.footer-status{display:flex;align-items:center;gap:8px;font-size:.75rem;color:rgba(255,255,255,.3)}
.footer-status-dot{width:7px;height:7px;background:#22c55e;border-radius:50%;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:ping 2s infinite}
@media(max-width:900px){.footer-upper{grid-template-columns:1fr;gap:36px}.footer-links{grid-template-columns:1fr 1fr;gap:32px}.footer-bottom{flex-direction:column;align-items:flex-start;gap:12px}}
@media(max-width:600px){.footer-links{grid-template-columns:1fr}.footer-nl-form{flex-direction:column}.footer-bottom-right{flex-wrap:wrap;gap:10px}}

/* ════════════════════════════════════════════════
   BOOKING MODAL STYLES
════════════════════════════════════════════════ */
.bm-overlay{
  position:fixed;inset:0;z-index:9000;
  display:flex;align-items:center;justify-content:center;
  padding:20px;
  background:rgba(7,17,43,.75);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  animation:bmFadeIn .22s ease both;
}
@keyframes bmFadeIn{from{opacity:0}to{opacity:1}}

.bm-box{
  position:relative;
  width:100%;max-width:540px;
  background:#fff;
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 48px 120px rgba(7,17,43,.4),0 8px 40px rgba(0,0,0,.18);
  animation:bmSlideUp .32s cubic-bezier(.22,.68,0,1.2) both;
  max-height:92vh;
  overflow-y:auto;
}
@keyframes bmSlideUp{from{opacity:0;transform:translateY(44px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}

.bm-header{
  position:relative;
  padding:38px 38px 30px;
  overflow:hidden;
}
.bm-header-bg{position:absolute;inset:0;pointer-events:none;}
.bm-close{
  position:absolute;top:16px;right:16px;
  width:38px;height:38px;border-radius:50%;border:none;
  background:rgba(255,255,255,.16);backdrop-filter:blur(8px);
  color:#fff;font-size:1rem;line-height:1;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:background .2s,transform .22s;z-index:10;
}
.bm-close:hover{background:rgba(255,255,255,.3);transform:rotate(90deg) scale(1.08)}

.bm-avatar-row{display:flex;align-items:center;gap:16px;margin-bottom:18px;position:relative;z-index:1;}
.bm-avatar{
  width:70px;height:70px;border-radius:18px;overflow:hidden;flex-shrink:0;
  border:3px solid rgba(255,255,255,.35);
  box-shadow:0 8px 28px rgba(0,0,0,.22);
}
.bm-avatar img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.bm-avatar-info{}
.bm-header-label{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);
  border-radius:50px;padding:4px 12px;
  font-size:.66rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.9);margin-bottom:6px;
}
.bm-header-label-dot{
  width:6px;height:6px;border-radius:50%;background:#4ade80;
  box-shadow:0 0 0 3px rgba(74,222,128,.22);animation:ping 2s infinite;
}
.bm-header-name{font-family:var(--font-h);font-size:1.05rem;font-weight:800;color:#fff;line-height:1.1}
.bm-header-role{font-size:.75rem;color:rgba(255,255,255,.6);margin-top:2px}

.bm-header h2{
  font-family:var(--font-h);
  font-size:1.55rem;font-weight:800;color:#fff;line-height:1.12;
  margin-bottom:8px;position:relative;z-index:1;
}
.bm-header p{font-size:.83rem;color:rgba(255,255,255,.68);line-height:1.55;position:relative;z-index:1;}

.bm-header-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;position:relative;z-index:1;}
.bm-chip{
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);
  border-radius:50px;padding:4px 12px;
  font-size:.7rem;font-weight:700;color:rgba(255,255,255,.85);
}

.bm-body{padding:28px 36px 34px}

.bm-section-label{
  font-size:.7rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:#8899bb;margin-bottom:12px;
  display:flex;align-items:center;gap:8px;
}
.bm-section-label::before{
  content:'';width:14px;height:2px;border-radius:2px;flex-shrink:0;
}
.bm-section-label.blue::before{background:var(--blue)}
.bm-section-label.orange::before{background:var(--orange)}

.bm-date-row{
  display:flex;align-items:center;gap:12px;
  background:linear-gradient(135deg,var(--mist),rgba(21,88,214,.05));
  border:1.5px solid var(--border);border-radius:14px;
  padding:12px 16px;margin-bottom:22px;
  font-size:.87rem;font-weight:600;color:var(--ink);
}
.bm-date-ico{
  width:36px;height:36px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0;
}

.bm-slots{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
.bm-slot{
  position:relative;display:flex;align-items:center;gap:10px;
  padding:13px 15px;border-radius:13px;border:1.5px solid var(--border);
  background:#fafbff;cursor:pointer;
  transition:all .2s cubic-bezier(.22,.68,0,1.2);
  text-align:left;font-family:var(--font-b);
  outline:none;
}
.bm-slot:hover{
  border-color:rgba(21,88,214,.3);background:rgba(21,88,214,.03);
  transform:translateY(-2px);box-shadow:0 6px 20px rgba(21,88,214,.09);
}
.bm-slot.sel-blue{
  border-color:var(--blue);
  background:linear-gradient(135deg,rgba(21,88,214,.06),rgba(91,158,255,.08));
  box-shadow:0 4px 18px rgba(21,88,214,.14);
}
.bm-slot.sel-orange{
  border-color:var(--orange);
  background:linear-gradient(135deg,rgba(245,96,10,.06),rgba(255,133,51,.08));
  box-shadow:0 4px 18px rgba(245,96,10,.13);
}
.bm-slot-radio{
  width:18px;height:18px;border-radius:50%;border:2px solid #ccd4e8;
  flex-shrink:0;display:flex;align-items:center;justify-content:center;
  transition:all .18s;
}
.bm-slot.sel-blue .bm-slot-radio{border-color:var(--blue);background:var(--blue);box-shadow:0 0 0 3px rgba(21,88,214,.18);}
.bm-slot.sel-orange .bm-slot-radio{border-color:var(--orange);background:var(--orange);box-shadow:0 0 0 3px rgba(245,96,10,.18);}
.bm-slot-dot{width:6px;height:6px;border-radius:50%;background:#fff;opacity:0;transform:scale(0);transition:all .16s;}
.bm-slot.sel-blue .bm-slot-dot,.bm-slot.sel-orange .bm-slot-dot{opacity:1;transform:scale(1)}
.bm-slot-txt{flex:1;min-width:0;}
.bm-slot-time{font-size:.84rem;font-weight:700;color:var(--ink);line-height:1.2}
.bm-slot-dur{font-size:.68rem;color:#99a;font-weight:500;margin-top:2px}
.bm-slot-check{
  font-size:.65rem;font-weight:800;padding:2px 7px;border-radius:8px;
  white-space:nowrap;flex-shrink:0;
}
.bm-slot.sel-blue .bm-slot-check{background:rgba(21,88,214,.1);color:var(--blue)}
.bm-slot.sel-orange .bm-slot-check{background:rgba(245,96,10,.1);color:var(--orange)}

.bm-notice{
  display:flex;align-items:flex-start;gap:10px;
  background:linear-gradient(135deg,rgba(245,158,11,.05),rgba(251,191,36,.06));
  border:1px solid rgba(245,158,11,.18);border-radius:12px;
  padding:12px 14px;margin-bottom:22px;
  font-size:.79rem;color:#92400e;line-height:1.55;
}
.bm-notice-ico{font-size:.95rem;flex-shrink:0;margin-top:1px}

.bm-cta{
  width:100%;padding:15px 20px;border:none;border-radius:14px;
  font-family:var(--font-b);font-size:.97rem;font-weight:800;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:10px;
  transition:all .25s;letter-spacing:.01em;
}
.bm-cta:disabled{opacity:.4;cursor:not-allowed;transform:none!important;box-shadow:none!important;filter:grayscale(.2)}
.bm-cta-blue{
  background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;
  box-shadow:0 8px 28px rgba(21,88,214,.3);
}
.bm-cta-blue:not(:disabled):hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(21,88,214,.44);}
.bm-cta-orange{
  background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;
  box-shadow:0 8px 28px rgba(245,96,10,.3);
}
.bm-cta-orange:not(:disabled):hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(245,96,10,.44);}

.bm-footer-note{
  display:flex;align-items:center;justify-content:center;gap:6px;
  margin-top:14px;font-size:.74rem;color:#aabbcc;text-align:center;
}
.bm-divider{height:1px;background:var(--border);margin:20px 0;}

@media(max-width:500px){
  .bm-box{border-radius:22px}
  .bm-header{padding:28px 22px 22px}
  .bm-body{padding:22px 22px 28px}
  .bm-slots{grid-template-columns:1fr}
  .bm-header h2{font-size:1.28rem}
}

/* CONTACT US SECTION */
.contact-section{padding:96px 5%;background:var(--cream);position:relative;overflow:hidden}
.contact-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 5% 50%,rgba(21,88,214,.05) 0%,transparent 65%),radial-gradient(ellipse 45% 60% at 95% 50%,rgba(245,96,10,.05) 0%,transparent 65%);pointer-events:none}
.ct-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1}
.ct-layout{display:grid;grid-template-columns:1fr 1.55fr;gap:52px;align-items:start;margin-top:52px}
.ct-info-col{display:flex;flex-direction:column;gap:18px}
.ct-info-card{background:#fff;border:1.5px solid var(--border);border-radius:16px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start;transition:all .25s}
.ct-info-card:hover{border-color:rgba(21,88,214,.3);box-shadow:0 8px 32px rgba(21,88,214,.08);transform:translateX(4px)}
.ct-ic-icon{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem}
.ct-ic-lbl{font-size:.68rem;font-weight:800;color:#88a;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}
.ct-ic-val{font-size:.88rem;font-weight:600;color:var(--ink);line-height:1.45}
.ct-promise{background:#fff;border:1.5px solid var(--border);border-radius:16px;padding:22px 20px;margin-top:4px}
.ct-pr-title{font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#88a;margin-bottom:14px}
.ct-pr-item{display:flex;align-items:center;gap:10px;font-size:.85rem;color:#556;padding:6px 0;border-bottom:1px solid var(--border)}
.ct-pr-item:last-child{border-bottom:none}
.ct-pr-dot{width:20px;height:20px;border-radius:7px;background:rgba(34,197,94,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.72rem;color:#16a34a}
.ct-form-card{background:#fff;border:1.5px solid var(--border);border-radius:22px;overflow:hidden;box-shadow:0 8px 40px rgba(21,88,214,.08)}
.ct-form-accent{height:4px;background:linear-gradient(to right,var(--blue),var(--blue2),var(--orange))}
.ct-form-body{padding:32px 30px}
.ct-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.ct-full{grid-column:1/-1}
.ct-field{display:flex;flex-direction:column;gap:6px}
.ct-field label{font-size:.72rem;font-weight:700;color:#88a;letter-spacing:.06em;text-transform:uppercase}
.ct-input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;font-family:var(--font-b);font-size:.9rem;color:var(--ink);background:#fafbff;outline:none;transition:all .2s}
.ct-input:focus{border-color:var(--blue);background:#fff;box-shadow:0 0 0 4px rgba(21,88,214,.06)}
.ct-input::placeholder{color:#aab}
.ct-select{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;font-family:var(--font-b);font-size:.9rem;color:var(--ink);background:#fafbff;outline:none;transition:all .2s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23667' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
.ct-select:focus{border-color:var(--blue);background-color:#fff;box-shadow:0 0 0 4px rgba(21,88,214,.06)}
.ct-textarea{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;font-family:var(--font-b);font-size:.9rem;color:var(--ink);background:#fafbff;outline:none;transition:all .2s;resize:vertical;min-height:120px;line-height:1.6}
.ct-textarea:focus{border-color:var(--blue);background:#fff;box-shadow:0 0 0 4px rgba(21,88,214,.06)}
.ct-textarea::placeholder,.ct-input::placeholder{color:#aab}
.ct-other-wrap{overflow:hidden;max-height:0;opacity:0;transition:max-height .28s ease,opacity .22s;margin-top:0}
.ct-other-wrap.open{max-height:60px;opacity:1;margin-top:10px}
.ct-submit{width:100%;margin-top:22px;padding:14px 20px;border:none;border-radius:13px;font-family:var(--font-b);font-size:.97rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;box-shadow:0 8px 28px rgba(21,88,214,.3);transition:all .25s}
.ct-submit:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(21,88,214,.42)}
.ct-submit:active{transform:scale(.98)}
.ct-note{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:12px;font-size:.73rem;color:#aab;text-align:center}
@media(max-width:900px){.ct-layout{grid-template-columns:1fr}.ct-form-grid{grid-template-columns:1fr}}

/* ════════════════════════════════
   SERVICES PAGE STYLES
════════════════════════════════ */
.svc-page{padding-top:72px}
.svc-hero{background:linear-gradient(135deg,#07112b 0%,#0f2155 50%,#1a3a7a 100%);padding:100px 5% 0;position:relative;overflow:hidden}
.svc-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 10% 50%,rgba(245,96,10,.12) 0%,transparent 55%),radial-gradient(ellipse 55% 65% at 90% 30%,rgba(91,158,255,.16) 0%,transparent 55%)}
.svc-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:48px 48px}
.svc-hero-inner{position:relative;z-index:1;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end}
.svc-hero-l{padding-bottom:80px}
.svc-hero-l .badge{margin:0 0 28px}
.svc-hero-l h1{font-family:var(--font-h);font-size:clamp(2.4rem,5vw,3.8rem);font-weight:800;color:#fff;line-height:1.08;margin-bottom:22px}
.svc-hero-l h1 span{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.svc-hero-l p{color:rgba(255,255,255,.6);font-size:1.05rem;line-height:1.72;max-width:480px;margin-bottom:36px;font-weight:300}
.svc-hero-actions{display:flex;gap:14px;flex-wrap:wrap}
.svc-hero-r{position:relative;padding-bottom:0;align-self:flex-end}
.svc-pipeline{background:rgba(255,255,255,.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);border-radius:24px 24px 0 0;padding:24px;min-height:340px}
.svc-pipe-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.svc-pipe-title{font-family:var(--font-h);font-size:.9rem;font-weight:700;color:#fff}
.svc-pipe-live{display:flex;align-items:center;gap:6px;font-size:.72rem;color:rgba(255,255,255,.5);font-weight:600}
.svc-pipe-dot{width:7px;height:7px;background:#22c55e;border-radius:50%;animation:ping 2s infinite}
.pipe-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pipe-col-hdr{font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:10px;padding:0 2px}
.pipe-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 12px;margin-bottom:8px;transition:all .2s;cursor:default}
.pipe-card:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
.pipe-card-name{font-size:.78rem;font-weight:600;color:#fff;margin-bottom:4px}
.pipe-card-val{font-size:.7rem;color:rgba(255,255,255,.45)}
.pipe-card-tag{display:inline-block;font-size:.62rem;font-weight:700;padding:2px 7px;border-radius:8px;margin-top:6px}
.svc-hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,.08);margin-top:0}
.shs{padding:20px 24px;border-right:1px solid rgba(255,255,255,.08);text-align:center;background:rgba(255,255,255,.03)}
.shs:last-child{border-right:none}
.shs-val{font-family:var(--font-h);font-size:1.6rem;font-weight:800;color:#fff}
.shs-val b{color:var(--orange)}
.shs-lbl{font-size:.72rem;color:rgba(255,255,255,.35);margin-top:4px;text-transform:uppercase;letter-spacing:.05em}
.svc-grid-wrap{background:#fff;padding:96px 5%}
.svc-main-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:1400px;margin:0 auto}
.svc-card{border-radius:24px;border:1.5px solid var(--border);background:#fff;overflow:hidden;transition:all .35s cubic-bezier(.22,.68,0,1.2);position:relative}
.svc-card:hover{transform:translateY(-10px);box-shadow:0 32px 80px rgba(21,88,214,.18);border-color:rgba(21,88,214,.3)}
.svc-card-top{padding:36px 32px 28px;position:relative}
.svc-card-top::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.svc-card-ico{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;margin-bottom:24px;font-size:1.8rem;position:relative;z-index:1}
.svc-card-num{position:absolute;top:32px;right:32px;font-family:var(--font-h);font-size:3.5rem;font-weight:800;line-height:1;opacity:.06;color:var(--ink)}
.svc-card h3{font-family:var(--font-h);font-size:1.2rem;font-weight:800;color:var(--ink);margin-bottom:12px}
.svc-card p{font-size:.9rem;line-height:1.68;color:#667;margin-bottom:20px}
.svc-card-features{display:flex;flex-direction:column;gap:8px;padding-bottom:28px}
.svc-feat{display:flex;align-items:flex-start;gap:10px;font-size:.84rem;color:#445;line-height:1.4}
.svc-feat-dot{width:18px;height:18px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.svc-card-bottom{border-top:1px solid var(--border);padding:20px 32px;display:flex;align-items:center;justify-content:space-between;background:rgba(21,88,214,.02)}
.svc-card-stat{font-size:.78rem;color:#667}
.svc-card-stat strong{font-family:var(--font-h);font-size:1.1rem;font-weight:800;display:block;color:var(--ink)}
.svc-card-btn{display:flex;align-items:center;gap:6px;font-size:.84rem;font-weight:700;color:var(--blue);cursor:pointer;transition:gap .2s;border:none;background:none;font-family:var(--font-b)}
.svc-card-btn:hover{gap:10px}
.svc-featured{background:var(--mist);padding:80px 5%}
.svc-feat-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.svc-feat-l h2{font-family:var(--font-h);font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:var(--ink);line-height:1.15;margin-bottom:18px}
.svc-feat-l p{font-size:1rem;line-height:1.72;color:#667;margin-bottom:32px;font-weight:300}
.svc-feat-list{display:flex;flex-direction:column;gap:16px;margin-bottom:36px}
.sfl{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:all .25s}
.sfl:hover{border-color:var(--blue);box-shadow:0 8px 32px rgba(21,88,214,.1);transform:translateX(6px)}
.sfl-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.2rem}
.sfl-body h4{font-family:var(--font-h);font-weight:700;font-size:.95rem;color:var(--ink);margin-bottom:4px}
.sfl-body p{font-size:.83rem;color:#667;line-height:1.5}
.svc-feat-r{position:relative}
.lead-dash{background:var(--ink);border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(7,17,43,.3)}
.ld-hdr{background:rgba(255,255,255,.06);padding:18px 22px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.06)}
.ld-hdr-t{font-family:var(--font-h);font-size:.88rem;font-weight:700;color:#fff}
.ld-hdr-b{display:flex;align-items:center;gap:6px;font-size:.72rem;color:rgba(255,255,255,.4);font-weight:600}
.ld-body{padding:20px}
.ld-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.ld-kpi{background:rgba(255,255,255,.05);border-radius:14px;padding:14px 12px;text-align:center;border:1px solid rgba(255,255,255,.06)}
.ld-kpi-val{font-family:var(--font-h);font-size:1.4rem;font-weight:800;color:#fff}
.ld-kpi-lbl{font-size:.68rem;color:rgba(255,255,255,.35);margin-top:4px}
.ld-funnel{margin-bottom:16px}
.ld-funnel-title{font-size:.72rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.lf-row{display:flex;align-items:center;gap:10px;margin-bottom:7px}
.lf-lbl{font-size:.75rem;color:rgba(255,255,255,.55);width:80px;flex-shrink:0}
.lf-bar{height:22px;border-radius:6px;display:flex;align-items:center;padding:0 8px;font-size:.68rem;font-weight:700;color:#fff;transition:width .6s ease}
.lf-val{font-size:.72rem;color:rgba(255,255,255,.4);margin-left:8px;white-space:nowrap}
.ld-leads{display:flex;flex-direction:column;gap:7px}
.ld-lead-title{font-size:.72rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}
.ld-lead{display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(255,255,255,.04);border-radius:10px;border:1px solid rgba(255,255,255,.06)}
.ld-lead-av{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0}
.ld-lead-info{flex:1}
.ld-lead-name{font-size:.78rem;font-weight:600;color:#fff}
.ld-lead-co{font-size:.68rem;color:rgba(255,255,255,.35)}
.ld-lead-score{display:flex;align-items:center;gap:4px}
.ld-lead-dot{width:8px;height:8px;border-radius:50%}
.ld-lead-s{font-size:.72rem;font-weight:700}
.svc-process{padding:96px 5%;max-width:1400px;margin:0 auto}
.svc-proc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:56px}
.svc-proc-card{display:flex;gap:20px;padding:28px;background:#fff;border-radius:20px;border:1.5px solid var(--border);transition:all .3s;position:relative;overflow:hidden}
.svc-proc-card::after{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:0 2px 2px 0;background:linear-gradient(to bottom,var(--blue),var(--orange));transform:scaleY(0);transition:transform .35s;transform-origin:top}
.svc-proc-card:hover{box-shadow:0 16px 56px rgba(21,88,214,.13);border-color:rgba(21,88,214,.25);transform:translateY(-4px)}
.svc-proc-card:hover::after{transform:scaleY(1)}
.spc-num{font-family:var(--font-h);font-size:2.6rem;font-weight:800;line-height:1;background:linear-gradient(135deg,var(--blue),var(--blue2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;flex-shrink:0;width:48px}
.spc-body h4{font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:var(--ink);margin-bottom:8px}
.spc-body p{font-size:.87rem;line-height:1.62;color:#667}
.spc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.spc-tag{font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:12px;background:rgba(21,88,214,.07);color:var(--blue)}
.svc-pricing{background:linear-gradient(135deg,var(--ink),#0f2155);padding:96px 5%;position:relative;overflow:hidden}
.svc-pricing::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 70% at 80% 40%,rgba(21,88,214,.25) 0%,transparent 65%)}
.svc-pricing-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1}
.svc-pricing-hdr{text-align:center;margin-bottom:56px}
.svc-pricing-hdr h2{font-family:var(--font-h);font-size:clamp(1.8rem,3vw,2.6rem);color:#fff;font-weight:800;margin-bottom:14px}
.svc-pricing-hdr p{color:rgba(255,255,255,.5);font-size:1rem;max-width:460px;margin:0 auto}
.svc-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.svc-plan{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:36px 32px;transition:all .3s;position:relative;overflow:hidden}
.svc-plan.popular{background:rgba(21,88,214,.25);border-color:rgba(91,158,255,.4);transform:scale(1.04)}
.svc-plan.popular::before{content:'Most Popular';position:absolute;top:16px;right:16px;background:var(--orange);color:#fff;font-size:.68rem;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:.05em;text-transform:uppercase}
.svc-plan:hover{transform:translateY(-6px) scale(1.02);border-color:rgba(91,158,255,.4)}
.svc-plan.popular:hover{transform:translateY(-6px) scale(1.06)}
.svc-plan-name{font-family:var(--font-h);font-size:.88rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.svc-plan-price{font-family:var(--font-h);font-size:2.8rem;font-weight:800;color:#fff;line-height:1;margin-bottom:6px}
.svc-plan-price span{font-size:1rem;font-weight:400;color:rgba(255,255,255,.4);font-family:var(--font-b)}
.svc-plan-sub{font-size:.8rem;color:rgba(255,255,255,.35);margin-bottom:28px}
.svc-plan-feats{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.spf{display:flex;align-items:center;gap:10px;font-size:.85rem;color:rgba(255,255,255,.7)}
.spf-chk{width:18px;height:18px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.7rem}
.svc-plan-btn{width:100%;padding:13px;border-radius:12px;font-family:var(--font-b);font-size:.92rem;font-weight:700;cursor:pointer;transition:all .25s;border:none}
.svc-industries{padding:80px 5%;background:var(--mist)}
.svc-ind-inner{max-width:1400px;margin:0 auto}
.svc-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:48px}
.svc-ind-card{background:#fff;border-radius:18px;padding:26px 22px;border:1.5px solid var(--border);transition:all .3s;cursor:pointer;text-align:center}
.svc-ind-card:hover{border-color:var(--blue);box-shadow:0 16px 48px rgba(21,88,214,.14);transform:translateY(-6px)}
.svc-ind-ico{font-size:2.2rem;margin-bottom:12px}
.svc-ind-name{font-family:var(--font-h);font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:6px}
.svc-ind-desc{font-size:.78rem;color:#667;line-height:1.5}
.svc-trust{padding:80px 5%;max-width:1400px;margin:0 auto}
.svc-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.svc-trust-card{border-radius:22px;padding:32px;border:1.5px solid var(--border);background:#fff;position:relative;overflow:hidden;transition:all .3s}
.svc-trust-card:hover{box-shadow:0 20px 60px rgba(21,88,214,.12);transform:translateY(-4px);border-color:rgba(21,88,214,.25)}
.stc-ico{font-size:2rem;margin-bottom:16px}
.stc-val{font-family:var(--font-h);font-size:2.2rem;font-weight:800;color:var(--ink);margin-bottom:6px}
.stc-lbl{font-size:.88rem;color:#667;line-height:1.5}
.stc-accent{position:absolute;bottom:0;left:0;right:0;height:3px}

/* RESPONSIVE */
@media(max-width:1100px){
  .hero-in{gap:36px}
  .svc-hero-inner{grid-template-columns:1fr;gap:0}
  .svc-hero-l{padding-bottom:48px}
  .svc-hero-r{display:none}
  .svc-hero-stats{grid-template-columns:repeat(2,1fr)}
  .svc-main-grid{grid-template-columns:repeat(2,1fr)}
  .svc-feat-inner{grid-template-columns:1fr;gap:40px}
  .svc-plans{grid-template-columns:1fr;max-width:420px;margin:0 auto}
  .svc-plan.popular{transform:scale(1)}
  .svc-ind-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:900px){
  .hero-in{flex-direction:column;text-align:center}
  .h-desc{max-width:100%}
  .h-actions{justify-content:center}
  .h-trust{justify-content:center}
  .testi{grid-template-columns:1fr;max-width:520px;margin:0 auto}
  .nav-links{display:none}
  .hbg{display:flex}
  .cta-band{flex-direction:column;text-align:center}
  .cta-r{align-items:center;width:100%}
  .fc1,.fc2{display:none}
  .svc-main-grid{grid-template-columns:1fr;max-width:520px;margin:0 auto}
  .svc-proc-grid{grid-template-columns:1fr}
  .svc-trust-grid{grid-template-columns:1fr}
  .nums-g{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .h-title{font-size:2.2rem}
  .nav-cta span{display:none}
  .svc-hero-stats{grid-template-columns:repeat(2,1fr)}
  .svc-ind-grid{grid-template-columns:repeat(2,1fr)}
}

/* TEAM PAGE STYLES */
.team-page{padding-top:72px}
.team-hero{background:linear-gradient(135deg,#07112b 0%,#0f2155 55%,#1558d6 100%);padding:90px 5% 100px;text-align:center;position:relative;overflow:hidden}
.team-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 60% at 15% 50%,rgba(245,96,10,.13) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 85% 50%,rgba(91,158,255,.18) 0%,transparent 60%)}
.team-hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);background-size:32px 32px;z-index:0}
.team-hero-inner{position:relative;z-index:1;max-width:720px;margin:0 auto}
.team-hero h1{font-family:var(--font-h);font-size:clamp(2.2rem,5vw,3.4rem);color:#fff;font-weight:800;margin-bottom:16px;line-height:1.1}
.team-hero-sub{color:rgba(255,255,255,.6);font-size:1.05rem;line-height:1.7;max-width:500px;margin:0 auto 36px}
.team-hero-stats{display:flex;gap:0;justify-content:center;margin-top:44px;flex-wrap:wrap}
.ths{padding:24px 40px;border-right:1px solid rgba(255,255,255,.1);text-align:center}
.ths:last-child{border-right:none}
.ths-val{font-family:var(--font-h);font-size:2rem;font-weight:800;color:#fff;line-height:1}
.ths-val b{color:var(--orange)}
.ths-lbl{color:rgba(255,255,255,.4);font-size:.78rem;margin-top:6px;text-transform:uppercase;letter-spacing:.06em}
.team-g{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
.tm{border-radius:24px;overflow:hidden;background:#fff;border:1.5px solid var(--border);transition:all .35s cubic-bezier(.22,.68,0,1.2);box-shadow:0 4px 20px rgba(21,88,214,.07);display:flex;flex-direction:column}
.tm:hover{transform:translateY(-10px);box-shadow:0 28px 70px rgba(21,88,214,.2);border-color:rgba(21,88,214,.35)}
.tm-img{position:relative;width:100%;height:320px;overflow:hidden;flex-shrink:0;background:#f0f4fa}
.tm-photo{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .5s ease}
.tm-photo-contain{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;transition:transform .5s ease;padding:0}
.tm:hover .tm-photo{transform:scale(1.04)}
.tm:hover .tm-photo-contain{transform:scale(1.03)}
.tm-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:20px;background:linear-gradient(to top,rgba(7,17,43,.93) 0%,rgba(7,17,43,.5) 55%,transparent 100%);opacity:0;transition:opacity .35s}
.tm:hover .tm-ov{opacity:1}
.tm-bio{color:rgba(255,255,255,.9);font-size:.82rem;line-height:1.58;margin-bottom:14px}
.tm-soc{display:flex;gap:8px}
.tm-sb{width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;color:#fff;text-decoration:none}
.tm-sb:hover{background:var(--blue2);border-color:var(--blue2);transform:translateY(-2px);box-shadow:0 6px 18px rgba(21,88,214,.4)}
.tm-body{padding:20px 18px 22px;text-align:center;flex:1}
.tm-name{font-family:var(--font-h);font-weight:700;font-size:1.02rem;color:var(--ink);margin-bottom:8px}
.tm-role{display:inline-block;font-size:.75rem;font-weight:700;padding:4px 14px;border-radius:20px;background:rgba(21,88,214,.08);color:var(--blue)}
.tm-divider{width:32px;height:2px;background:linear-gradient(to right,var(--blue),var(--orange));border-radius:2px;margin:10px auto 0}
.exp-wrap{background:var(--mist);padding:96px 5%}
.exp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;max-width:1400px;margin:0 auto}
.exp-card{background:#fff;border-radius:22px;padding:32px 26px;border:1.5px solid var(--border);transition:all .3s;position:relative;overflow:hidden}
.exp-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(to right,var(--blue),var(--orange));transform:scaleX(0);transition:transform .3s}
.exp-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(21,88,214,.14);border-color:rgba(21,88,214,.3)}
.exp-card:hover::after{transform:scaleX(1)}
.exp-ico{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;margin-bottom:22px;font-size:1.8rem}
.exp-card h3{font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:var(--ink);margin-bottom:10px}
.exp-card p{font-size:.87rem;color:#667;line-height:1.65}
.exp-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px}
.exp-tag{font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:14px;border:1px solid var(--border);color:#667}
.culture{background:linear-gradient(135deg,var(--blue),var(--blue2));padding:56px 5%;position:relative;overflow:hidden}
.culture::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);background-size:28px 28px}
.culture-inner{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;max-width:1200px;margin:0 auto;position:relative;z-index:1}
.cv{text-align:center;padding:32px 24px;background:rgba(255,255,255,.08);border-radius:20px;border:1px solid rgba(255,255,255,.12);transition:all .3s}
.cv:hover{background:rgba(255,255,255,.14);transform:translateY(-4px)}
.cv-ico{font-size:2.2rem;margin-bottom:14px}
.cv h3{font-family:var(--font-h);font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
.cv p{font-size:.85rem;color:rgba(255,255,255,.6);line-height:1.6}
.together{border-radius:28px;overflow:hidden;background:linear-gradient(135deg,var(--ink),#0f2155);padding:64px 7%;display:flex;align-items:center;gap:52px;position:relative;flex-wrap:wrap}
.together::before{content:'';position:absolute;right:-100px;top:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(21,88,214,.2) 0%,transparent 70%)}
.together::after{content:'';position:absolute;left:-60px;bottom:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(245,96,10,.1) 0%,transparent 70%)}
.tog-l{flex:1;min-width:280px;position:relative;z-index:1}
.tog-l h2{font-family:var(--font-h);font-size:2rem;color:#fff;font-weight:800;margin-bottom:12px}
.tog-l p{color:rgba(255,255,255,.55);font-size:.95rem;line-height:1.65;margin-bottom:28px}
.tog-stats{display:flex;gap:32px;flex-wrap:wrap}
.ts-val{font-family:var(--font-h);font-size:1.8rem;font-weight:800;color:#fff;line-height:1}
.ts-val b{color:var(--orange)}
.ts-lbl{color:rgba(255,255,255,.4);font-size:.75rem;margin-top:4px}
.tog-r{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:20px}
.av-stack{display:flex}
.av-sm{width:54px;height:54px;border-radius:50%;border:3px solid #07112b;overflow:hidden;margin-left:-16px;flex-shrink:0}
.av-sm:first-child{margin-left:0}
.av-sm img{width:100%;height:100%;object-fit:cover;object-position:top center}
.tog-metric{background:rgba(255,255,255,.06);border-radius:18px;padding:22px 32px;text-align:center;border:1px solid rgba(255,255,255,.1);min-width:180px}
.tog-m-val{font-family:var(--font-h);font-size:2.2rem;font-weight:800;color:#fff}
.tog-m-lbl{color:rgba(255,255,255,.4);font-size:.8rem;margin-top:4px}

@media(max-width:900px){
  .team-g{grid-template-columns:repeat(2,1fr)}
  .exp-grid{grid-template-columns:repeat(2,1fr)}
  .culture-inner{grid-template-columns:1fr}
  .together{flex-direction:column;text-align:center}
  .tog-stats{justify-content:center}
  .tog-r{width:100%}
  .team-hero-stats{flex-direction:column;gap:4px}
  .ths{border-right:none;border-bottom:1px solid rgba(255,255,255,.1);padding:16px 24px}
  .ths:last-child{border-bottom:none}
}
@media(max-width:600px){
  .team-g{grid-template-columns:repeat(2,1fr)}
  .exp-grid{grid-template-columns:1fr 1fr}
  .culture-inner{grid-template-columns:1fr}
}
`;

/* ════════════════════════════════
   SHARED COMPONENTS
════════════════════════════════ */
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, af;
    const mv = (e) => { mx = e.clientX; my = e.clientY; if (dot.current) { dot.current.style.left = mx + "px"; dot.current.style.top = my + "px"; } };
    const loop = () => { rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14; if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; } af = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", mv);
    af = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(af); };
  }, []);
  return (<><div className="cur" ref={dot} /><div className="cur-r" ref={ring} /></>);
};

const AnimNum = ({ target, suffix = "" }) => {
  const [v, setV] = useState(0);
  const r = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const step = () => { s += target / 60; setV(Math.min(Math.round(s), target)); if (s < target) requestAnimationFrame(step); };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={r}>{v}{suffix}</span>;
};

const LogoMark = ({ white }) => (
  <a className="logo" href="#">
    <div className="logo-m"><img src={Logo} alt="Growthmantra99 logo" /></div>
    <span className="logo-t" style={white ? { color: "#fff" } : {}}>Growth<b>mantra99</b></span>
  </a>
);

const SocIcon = ({ s }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    {s === "fb" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
    {s === "tw" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
    {s === "li" && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />}
    {s === "ig" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" /></>}
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

/* ════════════════════════════════════════════════
   BOOKING MODAL COMPONENT
════════════════════════════════════════════════ */
const BookingModal = ({ isOpen, onClose, person, photo, name, role, email, slots, accentGrad, ctaClass, selClass }) => {
  const [selected, setSelected] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => { if (isOpen) setSelected(null); }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handleBook = () => {
    if (selected === null) return;
    const slot = slots[selected];
    const subject = encodeURIComponent(`Meeting Request with ${name} | ${slot.label} Slot`);
    const isFounder = person === "founder";
    const body = encodeURIComponent(
      isFounder
        ? `Dear ${name},\n\nI hope this message finds you well.\n\nI recently came across Growthmantra99 and I am genuinely impressed by the vision and the results-driven approach you are building in the B2B growth marketing space.\n\nI would love to schedule a strategy call with you to explore how Growthmantra99 can help accelerate my company's growth. I have selected the following preferred time slot:\n\n  📅 Preferred Date: ${dateStr}\n  🕐 Preferred Time: ${slot.label} (IST)\n  ⏱  Session Duration: ${slot.duration}\n\nI'm particularly interested in learning more about your ICP-led lead generation methodology and understanding how your team approaches pipeline architecture for companies like mine.\n\nKindly confirm your availability at the above time, and feel free to suggest an alternate slot if needed.\n\nLooking forward to a productive conversation.\n\nWarm regards,\n[Your Full Name]\n[Your Designation]\n[Your Company Name]\n[Your Contact Number]`
        : `Dear ${name},\n\nI hope you're doing well.\n\nI recently discovered Growthmantra99 and I'm deeply impressed by your data-driven, accountability-focused approach to B2B growth strategy — particularly your work on revenue attribution and go-to-market execution.\n\nI'd love to connect with you for a focused strategy conversation to explore how Growthmantra99's services can create measurable impact for our organisation. I've selected the following time slot that works best for me:\n\n  📅 Preferred Date: ${dateStr}\n  🕐 Preferred Time: ${slot.label} (IST)\n  ⏱  Session Duration: ${slot.duration}\n\nI'm eager to understand your GTM strategy framework and how your Revenue Attribution system could be applied to our existing pipeline processes.\n\nPlease confirm your availability, and do let me know if another slot works better for you.\n\nLooking forward to speaking with you.\n\nBest regards,\n[Your Full Name]\n[Your Designation]\n[Your Company Name]\n[Your Contact Number]`
    );
    window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`, "_blank");
  };

  const isBlue = selClass === "sel-blue";

  return (
    <div className="bm-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="bm-box" role="dialog" aria-modal="true" aria-label={`Book a call with ${name}`}>

        {/* ── Header ── */}
        <div className="bm-header" style={{ background: accentGrad }}>
          {/* decorative layers */}
          <div className="bm-header-bg">
            <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", top:-80, right:-60, background:"rgba(255,255,255,.07)", filter:"blur(50px)" }} />
            <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", bottom:-50, left:10, background:"rgba(255,255,255,.05)", filter:"blur(35px)" }} />
            <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize:"22px 22px" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"rgba(255,255,255,.12)" }} />
          </div>

          <button className="bm-close" onClick={onClose} aria-label="Close modal">✕</button>

          {/* avatar + name row */}
          <div className="bm-avatar-row">
            <div className="bm-avatar"><img src={photo} alt={name} /></div>
            <div className="bm-avatar-info">
              <div className="bm-header-label"><div className="bm-header-label-dot" />Open for bookings</div>
              <div className="bm-header-name">{name}</div>
              <div className="bm-header-role">{role} · Growthmantra99</div>
            </div>
          </div>

          <h2>Book a Strategy Call</h2>
          <p>Free 30-minute consultation — no pitch, no pressure. Just an honest conversation about your B2B growth.</p>

          {/* info chips */}
          <div className="bm-header-chips">
            <div className="bm-chip">🎯 ICP-Led Approach</div>
            <div className="bm-chip">⚡ 30 Min · Free</div>
            <div className="bm-chip">📅 Book via Email</div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="bm-body">

          {/* Date display */}
          <div className={`bm-section-label ${isBlue ? "blue" : "orange"}`}>Today's Date</div>
          <div className="bm-date-row">
            <div className="bm-date-ico" style={{ background: isBlue ? "linear-gradient(135deg,var(--blue),var(--blue2))" : "linear-gradient(135deg,var(--orange),var(--orange2))" }}>📅</div>
            <div>
              <div style={{ fontWeight:700, fontSize:".88rem", color:"var(--ink)" }}>{dateStr}</div>
              <div style={{ fontSize:".72rem", color:"#99a", marginTop:"2px" }}>All times shown in IST (India Standard Time)</div>
            </div>
          </div>

          {/* Slot selection */}
          <div className={`bm-section-label ${isBlue ? "blue" : "orange"}`}>Choose Your Preferred Time Slot</div>
          <div className="bm-slots">
            {slots.map((slot, idx) => (
              <button
                key={idx}
                className={`bm-slot${selected === idx ? ` ${selClass}` : ""}`}
                onClick={() => setSelected(idx)}
                type="button"
              >
                <div className="bm-slot-radio">
                  <div className="bm-slot-dot" />
                </div>
                <div className="bm-slot-txt">
                  <div className="bm-slot-time">{slot.label}</div>
                  <div className="bm-slot-dur">{slot.duration}</div>
                </div>
                {selected === idx && (
                  <div className="bm-slot-check">✓ Selected</div>
                )}
              </button>
            ))}
          </div>

          <div className="bm-divider" />

          {/* Info notice */}
          <div className="bm-notice">
            <div className="bm-notice-ico">💡</div>
            <span>Clicking <strong>"Book Appointment"</strong> will open your email client with a pre-written professional message addressed to {name.split(" ")[0]}. Simply review, personalise if needed, and hit send.</span>
          </div>

          {/* CTA */}
          <button
            className={`bm-cta ${ctaClass}`}
            disabled={selected === null}
            onClick={handleBook}
            type="button"
          >
            <svg width="17" height="17" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {selected === null
              ? "Select a Time Slot to Continue"
              : `Book Appointment · ${slots[selected].label}`
            }
          </button>

          <div className="bm-footer-note">
            <svg width="12" height="12" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Free consultation · No commitment · Cancel anytime
          </div>

        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════
   NAV
════════════════════════════════ */
const Nav = ({ page, setPage }) => {
  const [sc, setSc] = useState(false), [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav className={`nav${sc ? " sc" : ""}`}>
      <LogoMark />
      <div className="nav-links">
        <a className={page === "home" ? "act" : ""} onClick={() => setPage("home")}>Home</a>
        <a className={page === "services" ? "act" : ""} onClick={() => setPage("services")}>Services</a>
        <a className={page === "team" ? "act" : ""} onClick={() => setPage("team")}>Team</a>
      </div>
      <div className="nav-r">
        <button className="nav-ghost" onClick={() => setPage(page === "team" ? "home" : "team")}>{page === "team" ? "← Home" : "Our Team"}</button>
        <button className="nav-cta"><span>Get Started</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
        <button className="hbg" onClick={() => setMob(!mob)} aria-label="Menu"><span /><span /><span /></button>
      </div>
      {mob && (
        <div className="mob-menu">
          <a onClick={() => { setPage("home"); setMob(false) }}>Home</a>
          <a onClick={() => { setPage("services"); setMob(false) }}>Services</a>
          <a onClick={() => { setPage("team"); setMob(false) }}>Team</a>
          <button className="nav-cta" style={{ justifyContent: "center" }}>Get Free Consultation</button>
        </div>
      )}
    </nav>
  );
};

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
const Footer = ({ setPage, scrollToContact }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (email.includes("@")) { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setEmail(""); }
  };
  return (
    <footer className="footer">
      <div className="footer-accent" />
      <div className="footer-main">
        <div className="footer-upper">
          <div className="footer-brand">
            <a className="footer-logo" href="#">
              <div className="footer-logo-m"><img src={Logo} alt="Growthmantra99 logo" /></div>
              <span className="footer-logo-t">Growth<b>Mantra99</b></span>
            </a>
            <p className="footer-tagline">India's dedicated B2B growth marketing agency — helping companies build scalable lead pipelines through strategic outreach, technology, and relentless execution.</p>
            <div className="footer-social">
              {[{ s: "li", label: "LinkedIn" }, { s: "tw", label: "Twitter" }, { s: "fb", label: "Facebook" }, { s: "ig", label: "Instagram" }].map(({ s, label }) => (
                <div className="f-sc" key={s} title={label}><SocIcon s={s} /></div>
              ))}
            </div>
          </div>
          <div className="footer-newsletter-box">
            <div className="footer-nl-title">Get B2B Growth Insights</div>
            <div className="footer-nl-sub">Weekly strategies on lead gen, ABM, and pipeline growth — straight to your inbox.</div>
            <div className="footer-nl-form">
              <input className="footer-nl-input" type="email" placeholder="your@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              <button className="footer-nl-btn" onClick={handleSubmit}>{submitted ? "✓ Sent!" : "Subscribe"}</button>
            </div>
            <div className="footer-nl-note"><svg width="12" height="12" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>No spam ever · Unsubscribe anytime</div>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>{["B2B Lead Generation", "Account-Based Marketing", "SEO & Demand Gen", "Marketing Automation", "Social Selling", "Revenue Analytics"].map((l, i) => (<li key={i}><a onClick={i === 0 ? () => setPage("services") : undefined}>{l}</a></li>))}</ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>{[{ l: "About Us", fn: () => setPage("home") }, { l: "Our Team", fn: () => setPage("team") }, { l: "Case Studies" }, { l: "Blog & Insights" }, { l: "Careers" }, { l: "Contact Us",  fn: scrollToContact }].map((item, i) => (<li key={i}><a onClick={item.fn}>{item.l}</a></li>))}</ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Get in Touch</div>
            {[{ ico: "📍", text: "Karkend Bajar Dhanbad(Jharkhand), India" }, { ico: "📞", text: "+91 6204132195" }, { ico: "✉️", text: "growthmantra99@gmail.com" }, { ico: "🕒", text: "Mon – Sat · 9am to 7pm IST" }].map((item, i) => (
              <div className="footer-contact-item" key={i}><div className="footer-contact-icon">{item.ico}</div><span>{item.text}</span></div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copyright">© 2026 Growthmantra99 Marketing Pvt. Ltd.</span>
            <div className="footer-legal-links">{["Privacy Policy", "Terms of Service", "Sitemap"].map(l => (<a key={l} href="#">{l}</a>))}</div>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-status"><div className="footer-status-dot" />All systems operational</div>
            <div className="footer-badge"><span>🇮🇳</span> Made in India with ❤️</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ════════════════════════════════════════════════
   FOUNDER SECTION — with booking modal
════════════════════════════════════════════════ */
const FounderSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const FOUNDER_SLOTS = [
    { label: "8 PM – 9 PM",   duration: "60 min session" },
    { label: "9 PM – 10 PM",  duration: "60 min session" },
    { label: "10 PM – 11 PM", duration: "60 min session" },
    { label: "11 PM – 12 AM", duration: "60 min session" },
  ];

  return (
    <>
      <section className="founder-section">
        <div className="founder-inner">
          <div className="founder-img-col">
            <div className="founder-ring" />
            <div className="founder-ring-2" />
            <div className="founder-blob" />
            <div className="founder-photo-wrap">
              <div className="founder-photo-inner">
                <img src={founder} alt="Founder of Growthmantra99" className="founder-photo" />
              </div>
              <div className="founder-badge-1">
                <div className="fb-ico" style={{ background: "rgba(21,88,214,.1)" }}>🎯</div>
                <div><div className="fb-val">B2B Specialist</div><div className="fb-lbl">Lead Generation Expert</div></div>
              </div>
              <div className="founder-badge-2">
                <div className="fb-ico" style={{ background: "rgba(34,197,94,.1)" }}>⚡</div>
                <div><div className="fb-val">500+ Deals Closed</div><div className="fb-lbl">Across Industries</div></div>
              </div>
            </div>
            <div className="founder-nameplate">
              <div className="founder-name">Shivam Sharma</div>
              <div className="founder-role-pill"><div className="founder-role-dot" />Founder &amp; CEO</div>
              <div className="founder-socials">
                {[{ s: "li", label: "LinkedIn" }, { s: "tw", label: "Twitter" }, { s: "ig", label: "Instagram" }].map(({ s, label }) => (
                  <div className="founder-soc-btn" key={s} title={label}><SocIcon s={s} /></div>
                ))}
              </div>
            </div>
          </div>
          <div className="founder-content-col">
            <div className="founder-eyebrow">Meet the Founder</div>
            <h2 className="founder-headline">The Mind Behind India's<br /><span>Most Focused B2B</span><br />Growth Engine</h2>
            <div className="founder-divider" />
            <div className="founder-quote">
              <span className="founder-quote-mark">"</span>
              <p className="founder-quote-text">Most agencies sell you traffic. We sell you conversations with decision-makers who are ready to buy — and that changes everything.</p>
            </div>
            <p className="founder-body">Shivam Sharma built Growthmantra99 on a single conviction: <strong>B2B companies deserve a growth partner that treats their pipeline like it's their own.</strong> After years working inside high-growth startups and enterprise sales teams across India, he saw the same pattern repeat — great products stalling because the right buyers never found them.</p>
            <p className="founder-body">Growthmantra99 was his answer. A lean, senior-led agency where <strong>every campaign starts with your Ideal Customer Profile</strong>, every outreach sequence is built for quality over volume, and every rupee you invest is tracked back to revenue — not just clicks.</p>
            <div className="founder-stats-row">
              {[{ val: "2+", lbl: "Years in B2B Sales" }, { val: "10+", lbl: "Sectors Served" }, { val: "100%", lbl: "Senior Attention" }, { val: "PGDM", lbl: "Education" }].map((s, i) => (
                <div className="founder-stat" key={i}><div className="founder-stat-val">{s.val}</div><div className="founder-stat-lbl">{s.lbl}</div></div>
              ))}
            </div>
            <div className="founder-tags">
              {["B2B Lead Generation", "Account-Based Marketing", "Outbound Strategy", "Sales Automation", "ICP Design", "Revenue Attribution", "LinkedIn Selling", "Pipeline Architecture"].map((t, i) => (
                <span className="founder-tag" key={i}><span className="founder-tag-dot" />{t}</span>
              ))}
            </div>
            <div className="founder-cta-row">
              <button className="btn-main" onClick={() => setModalOpen(true)}>
                <span>Book a Call with Shivam</span>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <button className="btn-play">
                <div className="play-ring"><svg width="16" height="16" fill="var(--orange)" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg></div>
                Watch Founder Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        person="founder"
        photo={founder}
        name="Shivam Sharma"
        role="Founder & CEO"
        email="shivamsharmakarkend123@gmail.com"
        slots={FOUNDER_SLOTS}
        accentGrad="linear-gradient(135deg,#07112b 0%,#1558d6 55%,#2272ff 100%)"
        ctaClass="bm-cta-blue"
        selClass="sel-blue"
      />
    </>
  );
};

/* ════════════════════════════════════════════════
   CO-FOUNDER SECTION — with booking modal
════════════════════════════════════════════════ */
const CoFounderSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const COFOUNDER_SLOTS = [
    { label: "4 PM – 5 PM",   duration: "60 min session" },
    { label: "5 PM – 6 PM",   duration: "60 min session" },
    { label: "7 PM – 8 PM",   duration: "60 min session" },
    { label: "8 PM – 9 PM",   duration: "60 min session" },
    { label: "9 PM – 10 PM",  duration: "60 min session" },
    { label: "10 PM – 11 PM", duration: "60 min session" },
    { label: "11 PM – 12 AM", duration: "60 min session" },
  ];

  return (
    <>
      <section className="cofounder-section">
        <div className="founder-inner-reverse">
          <div className="founder-content-col">
            <div className="cofounder-eyebrow">Meet the Co-Founder</div>
            <h2 className="founder-headline">The Strategist Who Turns<br /><span>Data Into Decisions</span><br />&amp; Deals Into Growth</h2>
            <div className="cofounder-divider" />
            <div className="cofounder-quote">
              <span className="cofounder-quote-mark">"</span>
              <p className="founder-quote-text">A great B2B strategy isn't built on gut instinct — it's built on the right data, the right accounts, and the relentless will to execute.</p>
            </div>
            <p className="founder-body">Shyam Jha co-founded Growthmantra99 with a clear mandate: <strong>make B2B marketing accountable, measurable, and genuinely effective.</strong> With a background spanning enterprise technology sales, growth analytics, and go-to-market strategy at some of India's fastest-scaling B2B companies, Shyam brings a rare combination of analytical rigour and creative execution to every client engagement.</p>
            <p className="founder-body">He architected Growthmantra99's proprietary <strong>Revenue Attribution Framework</strong> — the system that connects every outreach touchpoint back to closed-won revenue.</p>
            <div className="founder-stats-row">
              {[{ val: "2+", lbl: "Years in Growth Strategy" }, { val: "5+", lbl: "GTM Launches Led" }, { val: "Zero", lbl: "Vanity Metrics Reported" }, { val: "B.Tech", lbl: "Education" }].map((s, i) => (
                <div className="founder-stat" key={i}><div className="founder-stat-val">{s.val}</div><div className="founder-stat-lbl">{s.lbl}</div></div>
              ))}
            </div>
            <div className="founder-tags">
              {["Revenue Attribution", "GTM Strategy", "Data Analytics", "ABM Architecture", "Marketing Ops", "CRM Systems", "Demand Generation", "Growth Reporting"].map((t, i) => (
                <span className="cofounder-tag" key={i}><span className="cofounder-tag-dot" />{t}</span>
              ))}
            </div>
            <div className="founder-cta-row">
              <button
                className="btn-main"
                style={{ background: "linear-gradient(135deg,var(--orange),var(--orange2))", boxShadow: "0 8px 32px rgba(245,96,10,.3)" }}
                onClick={() => setModalOpen(true)}
              >
                <span>Book a Call with Shyam</span>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <button className="btn-play">
                <div className="play-ring"><svg width="16" height="16" fill="var(--orange)" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg></div>
                His Growth Story
              </button>
            </div>
          </div>
          <div className="founder-img-col">
            <div className="cofounder-ring" />
            <div className="cofounder-ring-2" />
            <div className="cofounder-blob" />
            <div className="cofounder-photo-wrap">
              <div className="founder-photo-inner">
                <img src={cofounder} alt="Co-Founder of Growthmantra99" className="founder-photo" />
              </div>
              <div className="founder-badge-1">
                <div className="fb-ico" style={{ background: "rgba(245,96,10,.1)" }}>📊</div>
                <div><div className="fb-val">Data-Driven</div><div className="fb-lbl">Growth Strategist</div></div>
              </div>
              <div className="founder-badge-2">
                <div className="fb-ico" style={{ background: "rgba(124,58,237,.1)" }}>🏆</div>
                <div><div className="fb-val">25+ GTM Launches</div><div className="fb-lbl">Revenue-Attributed</div></div>
              </div>
            </div>
            <div className="founder-nameplate">
              <div className="founder-name">Shyam Jha</div>
              <div className="cofounder-role-pill"><div className="founder-role-dot" />Co-Founder &amp; COO</div>
              <div className="founder-socials">
                {[{ s: "li", label: "LinkedIn" }, { s: "tw", label: "Twitter" }, { s: "ig", label: "Instagram" }].map(({ s, label }) => (
                  <div className="cofounder-soc-btn" key={s} title={label}><SocIcon s={s} /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        person="cofounder"
        photo={cofounder}
        name="Shyam Jha"
        role="Co-Founder & COO"
        email="sjha23234@gmail.com"
        slots={COFOUNDER_SLOTS}
        accentGrad="linear-gradient(135deg,#5c1500 0%,#c44700 40%,#f5600a 70%,#ff8533 100%)"
        ctaClass="bm-cta-orange"
        selClass="sel-orange"
      />
    </>
  );
};

const TeamConnector = () => (
  <div className="team-connector">
    <div className="team-connector-line" />
    <div className="team-connector-pill">
      <div className="team-connector-dot" />
      <span>The Leadership Team</span>
      <div className="team-connector-dot" />
    </div>
    <div className="team-connector-line" />
  </div>
);

/* ════════════════════════════════
   MISSION & VISION SECTION
════════════════════════════════ */
const MissionVision = () => (
  <section className="mv-section">
    <div className="mv-inner">
      <div className="mv-header">
        <div className="sec-lbl" style={{ justifyContent: "center" }}>Our Purpose</div>
        <h2 className="sec-h2">The North Star<br />That Guides Us</h2>
        <p className="sec-p" style={{ margin: "0 auto" }}>Every strategy we build, every campaign we launch — all rooted in a singular, unwavering direction.</p>
      </div>
      <div className="mv-grid">
        <div className="mv-card mv-card-vision">
          <div className="mv-card-bg-shape" />
          <div className="mv-type-badge"><div className="mv-type-ico">🔭</div>Vision</div>
          <h3 className="mv-card-title">Where We're<br />Headed</h3>
          <div className="mv-card-divider" />
          <div><span className="mv-quote-mark">"</span>
            <p className="mv-card-text">To become a leading global B2B sales partner that helps companies accelerate revenue growth.</p>
          </div>
        </div>
        <div className="mv-card mv-card-mission">
          <div className="mv-card-bg-shape" />
          <div className="mv-type-badge"><div className="mv-type-ico">🎯</div>Mission</div>
          <h3 className="mv-card-title" style={{ color: "#fff" }}>What We Do<br />Every Day</h3>
          <div className="mv-card-divider" />
          <div><span className="mv-quote-mark">"</span>
            <p className="mv-card-text">To deliver high-quality leads and sales opportunities through strategic outreach, technology, and dedicated service.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════
   LANDING PAGE COMPONENTS
════════════════════════════════ */
const Hero = ({ setPage }) => (
  <section className="hero">
    <div className="hero-bg" /><div className="hero-grid" />
    <div className="blob" style={{ width: 500, height: 500, top: -120, right: -80, background: "radial-gradient(circle,rgba(21,88,214,.1),transparent 70%)" }} />
    <div className="blob" style={{ width: 350, height: 350, bottom: -60, left: "10%", background: "radial-gradient(circle,rgba(245,96,10,.08),transparent 70%)", animationDelay: "4s" }} />
    <div className="hero-in">
      <div className="hero-l">
        <div className="badge"><div className="badge-live" /><span className="badge-txt">India's Emerging B2B Growth Marketing Agency</span></div>
        <h1 className="h-title">Powering Your<br /><span className="h-ul">Business</span>{" "}<span className="h-grad">Growth</span></h1>
        <p className="h-desc">We craft <strong>data-driven B2B marketing strategies</strong> that attract the right decision-makers, multiply your pipeline, and build a brand that stands the test of time.</p>
        <div className="h-actions">
          <button className="btn-main" onClick={() => setPage("services")}><span>Explore Services</span><svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="btn-play"><div className="play-ring"><svg width="16" height="16" fill="var(--orange)" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg></div>Watch Our Story</button>
        </div>
        <div className="h-trust">
          <div className="trust-avs">{["🧑‍💼", "👩‍💼", "👨‍💻", "👩‍🎨", "🧑‍🎯"].map((e, i) => <div key={i} className="tav" style={{ background: `linear-gradient(135deg,hsl(${i * 50 + 200},60%,75%),hsl(${i * 50 + 220},60%,60%))` }}>{e}</div>)}</div>
          <div className="trust-txt"><div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--blue)", marginBottom: 2 }}>Dedicated B2B Growth Specialists</div><div>Strategy · Outreach · Technology · Results</div></div>
        </div>
      </div>
      <div className="hero-r">
        <div className="dash">
          <div className="dash-hdr">
            <div className="dash-dots"><div className="dash-dot" style={{ background: "#ff5f57" }} /><div className="dash-dot" style={{ background: "#febc2e" }} /><div className="dash-dot" style={{ background: "#28c840" }} /></div>
            <div className="dash-url"><span>Growthmantra99.in/dashboard</span></div>
          </div>
          <div className="dash-body">
            <div className="dash-2col">
              {[
                { val: "Pipeline", lbl: "Revenue Tracking", chg: "Live", clr: "#22c55e", ico: "📈", bg: "rgba(34,197,94,.1)", bars: [35, 52, 44, 68, 55, 80, 72] },
                { val: "Leads", lbl: "Inbound & Outbound", chg: "Active", clr: "#3b82f6", ico: "👥", bg: "rgba(59,130,246,.1)", bars: [40, 55, 48, 62, 58, 70, 65] },
              ].map((m, i) => (
                <div className="dm" key={i}>
                  <div className="dm-top"><div className="dm-ico" style={{ background: m.bg }}>{m.ico}</div><span className="dm-badge" style={{ background: m.bg, color: m.clr }}>{m.chg}</span></div>
                  <div className="dm-val">{m.val}</div><div className="dm-lbl">{m.lbl}</div>
                  <div className="dm-spark">{m.bars.map((h, j) => <div key={j} className="dm-bar" style={{ height: h * .35 + "px", background: j === m.bars.length - 1 ? m.clr : `rgba(${i === 0 ? "34,197,94" : "59,130,246"},.2)` }} />)}</div>
                </div>
              ))}
            </div>
            <div className="dash-chart">
              <div className="dash-ct">Growth Trajectory<span className="dash-cbadge">↑ Upward Trend</span></div>
              <div className="dash-svg-wrap">
                <svg className="dash-svg" viewBox="0 0 280 70" preserveAspectRatio="none">
                  <defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(21,88,214,.3)" /><stop offset="100%" stopColor="rgba(21,88,214,0)" /></linearGradient></defs>
                  <path d="M0,65 C30,60 50,50 70,40 C90,30 110,45 130,32 C150,20 170,28 190,18 C210,8 230,14 250,5 L280,2 L280,70 L0,70Z" fill="url(#lg1)" />
                  <path d="M0,65 C30,60 50,50 70,40 C90,30 110,45 130,32 C150,20 170,28 190,18 C210,8 230,14 250,5 L280,2" fill="none" stroke="var(--blue2)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="280" cy="2" r="4" fill="var(--orange)" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="dash-recent">
              <div className="dash-rt">Pipeline Stages</div>
              {[{ n: "ICP Identification", v: "Targeting", c: "#3b82f6", e: "🎯" }, { n: "Outreach Sequences", v: "Engaging", c: "#22c55e", e: "📧" }, { n: "SQL Qualification", v: "Converting", c: "#f59e0b", e: "✅" }].map((c, i) => (
                <div className="dash-row" key={i}><div className="dash-av" style={{ background: c.c }}>{c.e}</div><span className="dash-n">{c.n}</span><span className="dash-v">{c.v}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="float-card fc1"><div className="fc-ico" style={{ background: "rgba(245,96,10,.1)" }}>🎯</div><div><div className="fc-val">ICP-Led</div><div className="fc-lbl">Precision Targeting</div></div></div>
        <div className="float-card fc2"><div className="fc-ico" style={{ background: "rgba(34,197,94,.1)" }}>⚡</div><div><div className="fc-val">Fast Setup</div><div className="fc-lbl">Live in 14 Days</div></div></div>
      </div>
    </div>
  </section>
);

const Marquee = () => {
  const items = ["B2B Lead Generation", "Account-Based Marketing", "Pipeline Acceleration", "Demand Generation", "Revenue Growth", "Sales Enablement", "Marketing Automation", "Conversion Optimization"];
  const all = [...items, ...items];
  return (
    <div className="mq"><div className="mq-track">{all.map((t, i) => <div className="mq-item" key={i}><div className="mq-dot" /><span className="mq-txt"><b>{t.split(" ")[0]}</b> {t.split(" ").slice(1).join(" ")}</span></div>)}</div></div>
  );
};

const WhyUs = () => (
  <section className="nums">
    <div className="nums-g">
      {[
        { ico: "🎯", lbl: "ICP-First Approach", sub: "Every campaign starts with pinpointing your ideal customer profile — no spray and pray." },
        { ico: "⚡", lbl: "Launch in 14 Days", sub: "From kickoff call to live outreach sequences in two weeks or less." },
        { ico: "🔍", lbl: "Full Transparency", sub: "You own every list, sequence, and insight we build — complete data visibility, always." },
        { ico: "🤝", lbl: "Dedicated Partnership", sub: "A specialist pod assigned to your account — not a ticket queue, a real team." },
      ].map((n, i) => (
        <div className="nc" key={i}>
          <div className="nc-ico">{n.ico}</div>
          <div style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>{n.lbl}</div>
          <div className="nc-lbl" style={{ lineHeight: 1.6, fontSize: ".82rem" }}>{n.sub}</div>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="sec-full sec" style={{ background: "var(--mist)" }}>
    <div className="ctr" style={{ marginBottom: 52 }}>
      <div className="sec-lbl">Client Stories</div>
      <h2 className="sec-h2">Be Among Our<br />First Success Stories</h2>
      <p className="sec-p">We're a new agency, and we're proud of it. That means you get our absolute best work, full senior attention, and early-partner pricing — not a junior team.</p>
    </div>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="testi">
        {[
          { ico: "🚀", title: "First-Mover Advantage", desc: "As an early client, you'll receive direct access to our senior strategists — no account managers in between, no diluted attention. Your campaign gets our full focus." },
          { ico: "🔬", title: "Rigorous & Transparent", desc: "We won't promise numbers we can't back up. What we promise is a well-researched ICP, a thoughtfully designed outreach system, and honest reporting from day one." },
          { ico: "🤝", title: "Built for the Long Game", desc: "We're not here for a quick retainer. We want to be your long-term growth partner — and that starts with earning your trust through results, not inflated testimonials." },
        ].map((t, i) => (
          <div className="tc" key={i} style={{ background: "#fff" }}>
            <div style={{ fontSize: "2rem", marginBottom: 16 }}>{t.ico}</div>
            <h3 style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>{t.title}</h3>
            <p className="tc-txt" style={{ fontStyle: "normal" }}>{t.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 52, padding: "40px 32px", background: "#fff", borderRadius: 22, border: "1.5px solid var(--border)", maxWidth: 700, margin: "52px auto 0" }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>💬</div>
        <h3 style={{ fontFamily: "var(--font-h)", fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Your Name Could Be Here First</h3>
        <p style={{ color: "#667", fontSize: ".95rem", lineHeight: 1.7, marginBottom: 24 }}>We're actively onboarding our founding clients. If you're a B2B company looking to build a real, scalable lead generation engine — let's talk. No pitch decks, just a genuine conversation.</p>
        <button className="btn-main" style={{ margin: "0 auto" }}><span>Claim Your Free Strategy Call</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
      </div>
    </div>
  </section>
);

const CTABand = () => (
  <div className="cta-band">
    <div className="cta-l">
      <h2>Ready to 10x Your B2B Pipeline?</h2>
      <p>Ready to build a B2B lead pipeline that actually delivers? Get your free strategy session — we'll map out a realistic, data-backed growth plan for your business.</p>
    </div>
    <div className="cta-r">
      <button className="btn-white">Get Free Consultation<svg width="16" height="16" fill="none" stroke="var(--blue)" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
      <button className="btn-ghost2">See Our Portfolio →</button>
      <div className="cta-note"><svg width="14" height="14" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>No credit card · Free 30-min strategy call</div>
    </div>
  </div>
);

const SECTORS = [
  { group: "Marketing & Growth", options: ["B2B Lead Generation","Digital Marketing Agency","Performance Marketing","Content Marketing","SEO & SEM"] },
  { group: "Technology & IT", options: ["IT Services & Consulting","SaaS & Software Products","Cybersecurity","Cloud & Infrastructure","AI & Data Analytics"] },
  { group: "Real Estate & Infrastructure", options: ["Commercial Real Estate","Residential Real Estate","PropTech","Construction & Engineering"] },
  { group: "Finance & Professional Services", options: ["Fintech & NBFC","Banking & Insurance","Accounting & CA Firms","Legal & Compliance","Management Consulting"] },
  { group: "Healthcare & Life Sciences", options: ["Healthcare B2B","MedTech & Pharma","Hospital & Clinic Chain"] },
  { group: "Industry & Operations", options: ["Manufacturing","Logistics & Supply Chain","Export & Import","Retail & E-commerce"] },
  { group: "Education & Training", options: ["EdTech","Corporate Training","Higher Education"] },
];

const ContactSection = ({ contactRef }) => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", address:"", sector:"", otherSector:"", query:"" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const showOther = form.sector === "Other";

  const handleSend = () => {
    if (!form.name || !form.email || !form.phone || !form.sector || !form.query) {
      alert("Please fill in all required fields (Name, Email, Phone, Sector, and Query).");
      return;
    }
    const sector = showOther ? (form.otherSector || "Other") : form.sector;
    const subject = encodeURIComponent(`Business Enquiry — ${form.company || form.name} | Growthmantra99`);
    const body = encodeURIComponent(
`Dear Growthmantra99 Team,

I would like to get in touch regarding your B2B growth marketing services. Please find my details below.

─────────────────────────────
CONTACT DETAILS
─────────────────────────────
Full Name    : ${form.name}
Email        : ${form.email}
Phone        : ${form.phone}
Company      : ${form.company || "N/A"}
Address      : ${form.address || "N/A"}
Industry     : ${sector}

─────────────────────────────
MY QUERY
─────────────────────────────
${form.query}

─────────────────────────────

I look forward to hearing from you.

Warm regards,
${form.name}
${form.company ? form.company + "\n" : ""}${form.phone}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&to=growthmantra99%40gmail.com&su=${subject}&body=${body}`, "_blank");
  };

  return (
    <section className="contact-section" ref={contactRef} id="contact">
      <div className="ct-inner">
        <div className="sec-lbl">Get in Touch</div>
        <h2 className="sec-h2">Let's Talk About<br />Your B2B Growth</h2>
        <p className="sec-p">Fill in your details and we'll respond within one business day — or click the button to send us a message right away.</p>

        <div className="ct-layout">
          {/* Info column */}
          <div className="ct-info-col">
            {[
              { ico:"📍", bg:"rgba(21,88,214,.08)", lbl:"Office", val:"Karkend Bajar, Dhanbad (Jharkhand), India" },
              { ico:"📞", bg:"rgba(245,158,11,.1)",  lbl:"Phone",  val:"+91 6204132195" },
              { ico:"✉️", bg:"rgba(34,197,94,.1)",   lbl:"Email",  val:"growthmantra99@gmail.com" },
              { ico:"🕒", bg:"rgba(245,96,10,.08)",  lbl:"Hours",  val:"Mon – Sat · 9 AM to 7 PM IST" },
            ].map((c,i) => (
              <div className="ct-info-card" key={i}>
                <div className="ct-ic-icon" style={{ background: c.bg }}>{c.ico}</div>
                <div><div className="ct-ic-lbl">{c.lbl}</div><div className="ct-ic-val">{c.val}</div></div>
              </div>
            ))}
            <div className="ct-promise">
              <div className="ct-pr-title">What to expect</div>
              {["Response within 1 business day","Free 30-min strategy consultation","No lock-in · No pressure","Senior specialist assigned to you"].map((t,i) => (
                <div className="ct-pr-item" key={i}>
                  <div className="ct-pr-dot">✓</div>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="ct-form-card">
            <div className="ct-form-accent" />
            <div className="ct-form-body">
              <div className="ct-form-grid">
                <div className="ct-field">
                  <label>Full Name *</label>
                  <input className="ct-input" placeholder="e.g. Rahul Mehta" value={form.name} onChange={e => set("name", e.target.value)} />
                </div>
                <div className="ct-field">
                  <label>Email Address *</label>
                  <input className="ct-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div className="ct-field">
                  <label>Phone Number *</label>
                  <input className="ct-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
                <div className="ct-field">
                  <label>Company Name</label>
                  <input className="ct-input" placeholder="Your Company Ltd." value={form.company} onChange={e => set("company", e.target.value)} />
                </div>
                <div className="ct-field ct-full">
                  <label>Address</label>
                  <input className="ct-input" placeholder="City, State, Country" value={form.address} onChange={e => set("address", e.target.value)} />
                </div>
                <div className="ct-field ct-full">
                  <label>Industry / Sector *</label>
                  <select className="ct-select" value={form.sector} onChange={e => set("sector", e.target.value)}>
                    <option value="">— Select your sector —</option>
                    {SECTORS.map((grp, gi) => (
                      <optgroup label={grp.group} key={gi}>
                        {grp.options.map((opt, oi) => <option key={oi} value={opt}>{opt}</option>)}
                      </optgroup>
                    ))}
                    <option value="Other">Other (specify below)</option>
                  </select>
                  <div className={`ct-other-wrap${showOther ? " open" : ""}`}>
                    <input className="ct-input" placeholder="Please describe your sector" value={form.otherSector} onChange={e => set("otherSector", e.target.value)} />
                  </div>
                </div>
                <div className="ct-field ct-full">
                  <label>Your Query *</label>
                  <textarea className="ct-textarea" placeholder="Tell us about your business goals, current challenges, or what you'd like help with..." value={form.query} onChange={e => set("query", e.target.value)} />
                </div>
              </div>
              <button className="ct-submit" onClick={handleSend}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Send Message via Email
              </button>
              <div className="ct-note">
                <svg width="12" height="12" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Opens Gmail · Free · No commitment required
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage = ({ setPage }) => {
  const contactRef = useRef(null);
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <Hero setPage={setPage} />
      <Marquee />
      <WhyUs />
      <FounderSection />
      <TeamConnector />
      <CoFounderSection />
      <MissionVision />
      <ContactSection contactRef={contactRef} />  {/* ← add here */}
      <Testimonials />
      <CTABand />
      <Footer setPage={setPage} scrollToContact={scrollToContact} />
    </main>
  );
};

/* ════════════════════════════════
   SERVICES PAGE
════════════════════════════════ */
const SERVICES_DATA = [
  { num: "01", ico: "🎯", title: "B2B Lead Generation", grad: "linear-gradient(135deg,#1558d6,#2272ff)", accentTop: "linear-gradient(to right,#1558d6,#2272ff)", features: ["ICP-targeted outreach campaigns", "LinkedIn & email automation", "Intent data & buying signal monitoring", "MQL → SQL conversion workflows"], stat: "ICP-First", statLbl: "Targeting methodology", desc: "Full-funnel lead generation engineered for B2B. We identify your ideal customers, engage them at the right moment, and deliver sales-ready leads directly into your CRM.", tags: ["LinkedIn Outreach", "Email Sequences", "Intent Data", "CRM Integration"] },
  { num: "02", ico: "📊", title: "Account-Based Marketing", grad: "linear-gradient(135deg,#f5600a,#ff8533)", accentTop: "linear-gradient(to right,#f5600a,#ff8533)", features: ["Target account list building", "Personalised multi-channel campaigns", "Executive-level engagement", "Deal acceleration playbooks"], stat: "Account-Led", statLbl: "Personalised at every touchpoint", desc: "Laser-focus your marketing spend on the exact accounts that matter most. Our ABM programs orchestrate personalised experiences across every touchpoint to accelerate enterprise deals.", tags: ["Tier-1 Accounts", "Personalisation", "Multi-touch", "Enterprise Sales"] },
  { num: "03", ico: "🔍", title: "SEO & Demand Generation", grad: "linear-gradient(135deg,#7c3aed,#a855f7)", accentTop: "linear-gradient(to right,#7c3aed,#a855f7)", features: ["Technical SEO & Core Web Vitals", "Thought leadership content", "Category creation & positioning", "Programmatic & paid search"], stat: "Organic-Led", statLbl: "Sustainable long-term demand", desc: "Create sustainable demand that fills your pipeline with high-intent buyers. We combine organic authority building with strategic paid amplification to own your category.", tags: ["Technical SEO", "Content Marketing", "PPC", "Analytics"] },
  { num: "04", ico: "⚙️", title: "Marketing Automation", grad: "linear-gradient(135deg,#0891b2,#06b6d4)", accentTop: "linear-gradient(to right,#0891b2,#06b6d4)", features: ["HubSpot & Salesforce setup", "Lead scoring & nurture flows", "Revenue attribution reporting", "Sales & marketing alignment"], stat: "Always-On", statLbl: "Nurture that never sleeps", desc: "Stop losing deals to slow follow-up. Our automation programs ensure every lead is nurtured intelligently, scored accurately, and handed to sales at exactly the right moment.", tags: ["HubSpot", "Salesforce", "Lead Scoring", "Nurture Flows"] },
  { num: "05", ico: "📱", title: "Social Selling & LinkedIn", grad: "linear-gradient(135deg,#059669,#10b981)", accentTop: "linear-gradient(to right,#059669,#10b981)", features: ["LinkedIn profile optimisation", "Thought leadership ghostwriting", "Social selling training for SDRs", "LinkedIn Ads & sponsored content"], stat: "Warm Outreach", statLbl: "Relationship-first methodology", desc: "LinkedIn is where B2B deals are won. We build your personal and company brand into a powerful lead-generation machine that attracts inbound opportunities around the clock.", tags: ["LinkedIn Ads", "Ghostwriting", "Social Selling", "Brand Building"] },
  { num: "06", ico: "📈", title: "Revenue Analytics & Reporting", grad: "linear-gradient(135deg,#dc2626,#f87171)", accentTop: "linear-gradient(to right,#dc2626,#f87171)", features: ["Multi-touch attribution models", "Pipeline velocity dashboards", "Campaign ROI tracking", "Quarterly business reviews"], stat: "Full-Funnel", statLbl: "Attribution & spend visibility", desc: "Know exactly what's driving revenue. Our analytics frameworks connect marketing activity to closed-won deals, giving you and your board complete confidence in every decision.", tags: ["Attribution", "ROI Tracking", "Dashboards", "Forecasting"] },
];

const INDUSTRIES = [
  { ico: "💻", name: "SaaS & Tech", desc: "Pipeline programs for product-led and sales-led B2B SaaS companies" },
  { ico: "🏭", name: "Manufacturing", desc: "Industrial & B2B manufacturing lead generation across India" },
  { ico: "🏥", name: "Healthcare B2B", desc: "Hospital systems, medtech & pharma enterprise sales support" },
  { ico: "🏗️", name: "Construction & Real Estate", desc: "Commercial real estate & infrastructure project lead gen" },
  { ico: "💰", name: "Financial Services", desc: "B2B fintech, NBFC and enterprise banking pipeline growth" },
  { ico: "📦", name: "Logistics & Supply Chain", desc: "Freight, 3PL and supply chain software demand generation" },
  { ico: "⚖️", name: "Legal & Professional", desc: "Law firms, consulting and advisory services client acquisition" },
  { ico: "🎓", name: "EdTech & Training", desc: "Corporate learning, upskilling and B2B education sales" },
];

const ServicesHero = ({ setPage }) => (
  <section className="svc-hero">
    <div className="svc-hero-bg" /><div className="svc-hero-grid" />
    <div className="svc-hero-inner">
      <div className="svc-hero-l">
        <div className="badge" style={{ marginBottom: 28 }}><div className="badge-live" /><span className="badge-txt">B2B Growth Services · Built for Results</span></div>
        <h1>Every Service Built to<br />Fill Your <span>Sales Pipeline</span></h1>
        <p>Purpose-built B2B marketing services that put qualified decision-makers in front of your sales team — predictably, at scale, and with full ROI visibility.</p>
        <div className="svc-hero-actions">
          <button className="btn-main"><span>Book Free Strategy Call</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="btn-ghost2" style={{ padding: "14px 28px" }} onClick={() => setPage("home")}>← Back to Home</button>
        </div>
      </div>
      <div className="svc-hero-r">
        <div className="svc-pipeline">
          <div className="svc-pipe-hdr">
            <span className="svc-pipe-title">Live Pipeline Dashboard</span>
            <div className="svc-pipe-live"><div className="svc-pipe-dot" />Live</div>
          </div>
          <div className="pipe-cols">
            {[
              { lbl: "Prospects", cards: [{ n: "Enterprise SaaS Co.", v: "Enterprise · ICP match", t: "New", tc: "rgba(59,130,246,.15)", txt: "#3b82f6" }, { n: "Mid-Market Firm", v: "Manufacturing · 500 emp", t: "ICP Match", tc: "rgba(34,197,94,.12)", txt: "#22c55e" }] },
              { lbl: "Engaged", cards: [{ n: "Fintech Startup", v: "Decision maker reached", t: "Hot", tc: "rgba(245,96,10,.12)", txt: "var(--orange)" }, { n: "Logistics Corp", v: "Demo scheduled", t: "MQL", tc: "rgba(124,58,237,.12)", txt: "#7c3aed" }] },
              { lbl: "SQL Ready", cards: [{ n: "B2B Platform Co.", v: "Proposal sent", t: "SQL ✓", tc: "rgba(34,197,94,.15)", txt: "#16a34a" }, { n: "Healthcare B2B", v: "Contract review", t: "Closing", tc: "rgba(245,96,10,.15)", txt: "var(--orange)" }] },
            ].map((col, i) => (
              <div key={i}>
                <div className="pipe-col-hdr">{col.lbl}</div>
                {col.cards.map((c, j) => (
                  <div className="pipe-card" key={j}>
                    <div className="pipe-card-name">{c.n}</div>
                    <div className="pipe-card-val">{c.v}</div>
                    <div className="pipe-card-tag" style={{ background: c.tc, color: c.txt }}>{c.t}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="svc-hero-stats">
          {[{ v: "14", s: " Days", l: "To First Leads" }, { v: "ICP", s: "-Led", l: "Every Campaign" }, { v: "Full", s: "", l: "Data Ownership" }, { v: "Zero", s: "", l: "Lock-in Contracts" }].map((s, i) => (
            <div className="shs" key={i}><div className="shs-val">{s.v}<b>{s.s}</b></div><div className="shs-lbl">{s.l}</div></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ServiceCards = () => (
  <div className="svc-grid-wrap">
    <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 1400, margin: "0 auto 56px" }}>
      <div className="sec-lbl" style={{ justifyContent: "center" }}>Our Services</div>
      <h2 className="sec-h2">Six Pillars of<br />B2B Revenue Growth</h2>
      <p className="sec-p" style={{ margin: "0 auto" }}>Each service is a precision instrument — designed to solve one part of the B2B revenue puzzle and integrate seamlessly with the rest.</p>
    </div>
    <div className="svc-main-grid">
      {SERVICES_DATA.map((s, i) => (
        <div className="svc-card" key={i}>
          <div className="svc-card-top">
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accentTop, borderRadius: "22px 22px 0 0" }} />
            <div className="svc-card-num">{s.num}</div>
            <div className="svc-card-ico" style={{ background: s.grad }}>{s.ico}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="svc-card-features">
              {s.features.map((f, j) => (
                <div className="svc-feat" key={j}>
                  <div className="svc-feat-dot" style={{ background: s.grad }}>
                    <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="svc-card-bottom">
            <div className="svc-card-stat"><strong style={{ background: s.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.stat}</strong>{s.statLbl}</div>
            <button className="svc-card-btn">Learn more <svg width="14" height="14" fill="none" stroke="var(--blue)" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FeaturedLeadGen = () => (
  <div className="svc-featured">
    <div className="svc-feat-inner">
      <div className="svc-feat-l">
        <div className="sec-lbl">Featured Service</div>
        <h2 className="sec-h2">B2B Lead Generation<br />That Actually Converts</h2>
        <p>Most agencies deliver lists. We deliver conversations with decision-makers who are ready to buy. Our proprietary 4-layer qualification framework ensures every lead that reaches your sales team is genuinely sales-ready.</p>
        <div className="svc-feat-list">
          {[
            { ico: "🎯", bg: "rgba(21,88,214,.1)", title: "ICP Identification & Targeting", desc: "We build your Ideal Customer Profile using firmographic, technographic, and intent data to target only the highest-value accounts." },
            { ico: "📧", bg: "rgba(245,96,10,.1)", title: "Multi-Channel Outreach Sequences", desc: "LinkedIn + email + retargeting working in concert — coordinated sequences that get replies from busy executives." },
            { ico: "🤖", bg: "rgba(124,58,237,.1)", title: "AI-Powered Lead Scoring", desc: "Every inbound lead scored automatically against 40+ signals so sales always calls the hottest prospects first." },
            { ico: "📋", bg: "rgba(34,197,94,.1)", title: "CRM-Ready Lead Delivery", desc: "Leads delivered directly into your HubSpot or Salesforce with full context — no manual data entry, ever." },
          ].map((f, i) => (
            <div className="sfl" key={i}>
              <div className="sfl-ico" style={{ background: f.bg }}>{f.ico}</div>
              <div className="sfl-body"><h4>{f.title}</h4><p>{f.desc}</p></div>
            </div>
          ))}
        </div>
        <button className="btn-main"><span>Start Generating Leads</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
      </div>
      <div className="svc-feat-r">
        <div className="lead-dash">
          <div className="ld-hdr">
            <span className="ld-hdr-t">Lead Generation Dashboard</span>
            <div className="ld-hdr-b"><div style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%" }} />Live · Updated now</div>
          </div>
          <div className="ld-body">
            <div className="ld-kpis">
              {[{ val: "ICP", lbl: "Targeting First" }, { val: "SQL", lbl: "Quality Focus" }, { val: "CRM", lbl: "Direct Delivery" }].map((k, i) => (
                <div className="ld-kpi" key={i}><div className="ld-kpi-val" style={{ color: i === 0 ? "#fff" : i === 1 ? "#22c55e" : "var(--orange2)", fontSize: "1rem" }}>{k.val}</div><div className="ld-kpi-lbl">{k.lbl}</div></div>
              ))}
            </div>
            <div className="ld-funnel">
              <div className="ld-funnel-title">Our 4-Stage Funnel</div>
              {[
                { lbl: "Identify", val: "Target Accounts", w: "100%", bg: "rgba(21,88,214,.6)" },
                { lbl: "Engage", val: "Personalised Outreach", w: "70%", bg: "rgba(91,158,255,.7)" },
                { lbl: "Qualify", val: "MQL → SQL", w: "45%", bg: "rgba(245,96,10,.7)" },
                { lbl: "Deliver", val: "Sales-Ready Leads", w: "28%", bg: "rgba(34,197,94,.8)" },
              ].map((r, i) => (
                <div className="lf-row" key={i}>
                  <span className="lf-lbl">{r.lbl}</span>
                  <div className="lf-bar" style={{ width: r.w, background: r.bg, flex: "none", minWidth: 40, fontSize: ".6rem" }}>{r.val}</div>
                </div>
              ))}
            </div>
            <div className="ld-leads">
              <div className="ld-lead-title">What You Receive</div>
              {[
                { av: "📋", name: "Verified Contact Details", co: "Name · Title · Company · LinkedIn", score: "Verified", sc: "#22c55e", sd: "rgba(34,197,94,.15)" },
                { av: "🎯", name: "ICP Match Score", co: "Firmographic & intent fit rating", score: "Scored", sc: "var(--orange)", sd: "rgba(245,96,10,.12)" },
                { av: "📥", name: "CRM-Ready Delivery", co: "Pushed directly into your pipeline", score: "Synced", sc: "#22c55e", sd: "rgba(34,197,94,.15)" },
              ].map((l, i) => (
                <div className="ld-lead" key={i}>
                  <div className="ld-lead-av" style={{ background: "rgba(255,255,255,.08)" }}>{l.av}</div>
                  <div className="ld-lead-info"><div className="ld-lead-name">{l.name}</div><div className="ld-lead-co">{l.co}</div></div>
                  <div className="ld-lead-score"><div className="ld-lead-dot" style={{ background: l.sc, boxShadow: `0 0 0 3px ${l.sd}` }} /><span className="ld-lead-s" style={{ color: l.sc }}>{l.score}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServiceProcess = () => (
  <section className="svc-process">
    <div className="ctr" style={{ marginBottom: 0 }}>
      <div className="sec-lbl" style={{ justifyContent: "center" }}>How We Work</div>
      <h2 className="sec-h2">From Kickoff to<br />Qualified Pipeline in 30 Days</h2>
      <p className="sec-p" style={{ margin: "0 auto" }}>A proven onboarding process that gets your lead generation engine live fast — and optimised faster.</p>
    </div>
    <div className="svc-proc-grid">
      {[
        { n: "01", title: "Discovery & ICP Workshop", desc: "A deep-dive session with your team to define your Ideal Customer Profile, deal size, sales cycle, and the exact accounts worth pursuing.", tags: ["ICP Definition", "Competitor Analysis", "Market Mapping", "Goal Setting"] },
        { n: "02", title: "Strategy & Tech Stack Setup", desc: "We architect your go-to-market strategy and configure your CRM, automation tools, and tracking infrastructure for full revenue visibility.", tags: ["HubSpot / Salesforce", "Attribution Setup", "Sequence Design", "Launch Readiness"] },
        { n: "03", title: "Campaign Launch & Outreach", desc: "Campaigns go live across LinkedIn, email, and paid channels. Every message personalised, every touchpoint tracked, every reply handled.", tags: ["LinkedIn Outreach", "Email Sequences", "Paid Ads", "A/B Testing"] },
        { n: "04", title: "Optimise & Scale Revenue", desc: "Weekly performance reviews, ruthless optimisation of what's working, and a systematic scale-up plan to 2x, 5x, then 10x your pipeline.", tags: ["Weekly Reporting", "Conversion Optimisation", "Scale Playbook", "Quarterly Reviews"] },
      ].map((s, i) => (
        <div className="svc-proc-card" key={i}>
          <div className="spc-num">{s.n}</div>
          <div className="spc-body"><h4>{s.title}</h4><p>{s.desc}</p><div className="spc-tags">{s.tags.map((t, j) => <span className="spc-tag" key={j}>{t}</span>)}</div></div>
        </div>
      ))}
    </div>
  </section>
);

const ServicePricing = () => {
  const RECIPIENT = "growthmantra99@gmail.com";
 
  const buildGmailUrl = (plan) => {
    const isYearly = plan === "Yearly";
 
    const subject = encodeURIComponent(
      `Service Enquiry — ${plan} Lead Generation Plan | Growthmantra99`
    );
 
    const body = encodeURIComponent(
`Dear Growthmantra99 Team,
 
I came across your B2B lead generation services and I am interested in getting started with the ${plan} Plan.
 
Please find my details below:
 
─────────────────────────────────
SELECTED PLAN
─────────────────────────────────
Plan Type      : ${plan} Lead Generation
Investment     : ${isYearly ? "₹2,50,000+ / year (customised)" : "₹30,000+ / month (customised)"}
 
─────────────────────────────────
MY DETAILS  (please fill in before sending)
─────────────────────────────────
Full Name      : [Your Full Name]
Phone Number   : [Your Phone Number with country code]
Company Name   : [Your Company / Organisation Name]
Industry       : [e.g. SaaS, Manufacturing, Healthcare, Fintech, Logistics…]
Website        : [Your Company Website URL]
 
─────────────────────────────────
WHAT I AM LOOKING FOR
─────────────────────────────────
Primary Goal   : [e.g. Generate qualified leads, Build outbound pipeline, ABM for target accounts…]
Target Market  : [e.g. CXOs at mid-market SaaS companies in India / SEA]
Current Status : [e.g. No lead gen system yet / Existing system underperforming]
 
Additional Requirements / Questions:
[Please share anything else you would like us to know — budget flexibility, timeline expectations, specific challenges, or questions about the service.]
 
─────────────────────────────────
 
I look forward to hearing from you.
 
Warm regards,
[Your Full Name]
[Your Designation]
[Your Company]
[Your Phone Number]`
    );
 
    return `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(RECIPIENT)}&su=${subject}&body=${body}`;
  };
 
  const PLANS = [
    {
      id: "Monthly",
      badge: null,
      name: "Monthly Plan",
      price: "₹30,000",
      priceSuffix: "+",
      per: "/ month",
      sub: "Customised lead generation — pay as you grow",
      highlight: "Flexible month-to-month. No lock-in.",
      feats: [
        "ICP-targeted lead generation",
        "LinkedIn + email outreach",
        "CRM-ready lead delivery",
        "Dedicated account specialist",
        "Monthly performance report",
      ],
      grad: "linear-gradient(135deg,#1558d6,#2272ff)",
      popular: false,
      btnLabel: "Get Started — Monthly",
      btnStyle: {
        background: "rgba(255,255,255,.1)",
        color: "#fff",
        border: "1.5px solid rgba(255,255,255,.25)",
      },
    },
    {
      id: "Yearly",
      badge: "Best Value",
      name: "Yearly Plan",
      price: "₹2,50,000",
      priceSuffix: "+",
      per: "/ year",
      sub: "Customised lead generation — maximum pipeline impact",
      highlight: "Annual commitment · Priority support.",
      feats: [
        "Everything in Monthly",
        "Priority campaign setup",
        "Quarterly strategy reviews",
        "Revenue attribution dashboard",
        "Dedicated senior strategist",
      ],
      grad: "linear-gradient(135deg,#f5600a,#ff8533)",
      popular: true,
      btnLabel: "Get Started — Yearly",
      btnStyle: {
        background: "#fff",
        color: "var(--blue)",
        border: "none",
        fontWeight: 800,
      },
    },
  ];
 
  return (
    <section className="svc-pricing">
      <div className="svc-pricing-inner">
        {/* ── Header ── */}
        <div className="svc-pricing-hdr">
          <div
            className="sec-lbl"
            style={{ justifyContent: "center", color: "rgba(255,255,255,.5)" }}
          >
            Transparent Pricing
          </div>
          <h2>
            Simple Plans,<br />Serious Results
          </h2>
          <p>
            Two straightforward options — both fully customised to your business
            goals. No hidden fees, no long lock-ins.
          </p>
        </div>
 
        {/* ── Plan Cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`svc-plan${p.popular ? " popular" : ""}`}
              style={{ position: "relative" }}
            >
              {/* Best Value badge (replaces the hard-coded "Most Popular" ::before) */}
              {p.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "var(--orange)",
                    color: "#fff",
                    fontSize: ".68rem",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: 20,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    zIndex: 2,
                  }}
                >
                  {p.badge}
                </div>
              )}
 
              {/* Plan name */}
              <div className="svc-plan-name">{p.name}</div>
 
              {/* Price */}
              <div className="svc-plan-price">
                {p.price}
                <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>
                  {p.priceSuffix}
                </span>
                <span>{p.per}</span>
              </div>
 
              {/* Sub-heading */}
              <div className="svc-plan-sub">{p.sub}</div>
 
              {/* Highlight pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 50,
                  padding: "5px 14px",
                  fontSize: ".72rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,.7)",
                  marginBottom: 20,
                }}
              >
                ✦ {p.highlight}
              </div>
 
              {/* Feature list */}
              <div className="svc-plan-feats">
                {p.feats.map((f, j) => (
                  <div className="spf" key={j}>
                    <div
                      className="spf-chk"
                      style={{
                        background: p.popular
                          ? "rgba(34,197,94,.2)"
                          : "rgba(255,255,255,.1)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        fill="none"
                        stroke={p.popular ? "#22c55e" : "rgba(255,255,255,.6)"}
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
 
              {/* CTA — opens Gmail with pre-filled email */}
              <a
                href={buildGmailUrl(p.id)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button className="svc-plan-btn" style={p.btnStyle} type="button">
                  {p.btnLabel} →
                </button>
              </a>
            </div>
          ))}
        </div>
 
        {/* ── Footer note ── */}
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,.3)",
            fontSize: ".82rem",
            marginTop: 32,
            lineHeight: 1.7,
          }}
        >
          All plans are fully customised to your business.{" "}
          <span style={{ color: "rgba(255,255,255,.5)", fontWeight: 600 }}>
            Pricing is indicative — final scope and cost are confirmed after your
            free strategy call.
          </span>
          <br />
          No credit card required · Cancel anytime · Free 30-min consultation
          included.
        </p>
      </div>
    </section>
  );
};
const ServiceIndustries = () => (
  <section className="svc-industries">
    <div className="svc-ind-inner">
      <div className="ctr" style={{ marginBottom: 0 }}>
        <div className="sec-lbl" style={{ justifyContent: "center" }}>Industries We Serve</div>
        <h2 className="sec-h2">Deep Expertise Across<br />Every B2B Vertical</h2>
        <p className="sec-p" style={{ margin: "0 auto" }}>We don't do generic. Every campaign is built around the specific buying behaviour, language, and sales cycle of your industry.</p>
      </div>
      <div className="svc-ind-grid">
        {INDUSTRIES.map((ind, i) => (
          <div className="svc-ind-card" key={i}><div className="svc-ind-ico">{ind.ico}</div><div className="svc-ind-name">{ind.name}</div><div className="svc-ind-desc">{ind.desc}</div></div>
        ))}
      </div>
    </div>
  </section>
);

const ServiceTrust = () => (
  <section className="svc-trust">
    <div className="ctr" style={{ marginBottom: 0 }}>
      <div className="sec-lbl" style={{ justifyContent: "center" }}>Why Growthmantra99</div>
      <h2 className="sec-h2">What Sets Us Apart</h2>
      <p className="sec-p" style={{ margin: "0 auto" }}>We're new — and that's our advantage. Here's what you can expect when you work with us.</p>
    </div>
    <div className="svc-trust-grid">
      {[
        { ico: "🎯", val: "ICP-First", lbl: "Every engagement starts with a deep Ideal Customer Profile workshop — so we only ever target accounts that can actually close.", grad: "linear-gradient(to right,var(--blue),var(--blue2))" },
        { ico: "⚡", val: "14-Day Launch", lbl: "From signed agreement to live outreach sequences in two weeks. No long onboarding delays, no endless slide decks before work begins.", grad: "linear-gradient(to right,var(--orange),var(--orange2))" },
        { ico: "🔍", val: "You Own Everything", lbl: "Every list, sequence, template, and dataset we build belongs to you — not locked in our tools. Full transparency and data portability, always.", grad: "linear-gradient(to right,#22c55e,#4ade80)" },
        { ico: "🏆", val: "No Lock-Ins", lbl: "Month-to-month engagements only. We earn your business every single month through results — not long contracts that trap you.", grad: "linear-gradient(to right,#7c3aed,#a855f7)" },
        { ico: "💬", val: "Senior Team", lbl: "Your account is handled by senior specialists, not passed to juniors. The people who sell to you are the same people who do the work.", grad: "linear-gradient(to right,#0891b2,#06b6d4)" },
        { ico: "📈", val: "Honest Reporting", lbl: "We report what's actually happening — good or bad. No vanity metrics, no cherry-picked numbers. Just clear data and what we'll do next.", grad: "linear-gradient(to right,#dc2626,#f87171)" },
      ].map((t, i) => (
        <div className="svc-trust-card" key={i}>
          <div className="stc-accent" style={{ background: t.grad }} />
          <div className="stc-ico">{t.ico}</div>
          <div className="stc-val" style={{ background: t.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.val}</div>
          <div className="stc-lbl">{t.lbl}</div>
        </div>
      ))}
    </div>
  </section>
);

const ServicesPage = ({ setPage }) => (
  <div className="svc-page">
    <ServicesHero setPage={setPage} />
    <ServiceCards />
    <FeaturedLeadGen />
    <ServiceProcess />
    <ServicePricing />
    <ServiceIndustries />
    <ServiceTrust />
    <CTABand />
    <Footer setPage={setPage} />
  </div>
);

/* ════════════════════════════════
   TEAM PAGE
════════════════════════════════ */
const TEAM = [
  { img: founder, name: "Shivam Sharma", role: "Founder", bio: "Visionary B2B growth strategist and founder of Growthmantra99. Shivam has spent 8+ years building outbound sales systems and pipeline architectures for high-growth startups and enterprise teams across India.", linkedin: null, grad: "linear-gradient(135deg,#1558d6,#5b9eff)" },
  { img: cofounder, name: "Shyam Jha", role: "Co-Founder", bio: "Revenue attribution architect and GTM strategist. Shyam co-founded Growthmantra99 to make B2B marketing genuinely accountable — connecting every campaign touchpoint directly to closed-won revenue.", linkedin: null, grad: "linear-gradient(135deg,#f5600a,#ff8533)" },
  { img: Neha, name: "Neha Sharma", role: "Business Analyst", bio: "Sharp analytical mind with a deep focus on market research, lead qualification, and data-driven insights. Neha turns complex data into clear actions that accelerate the sales pipeline.", linkedin: "https://www.linkedin.com/in/neha-sharma-b98a9a266", grad: "linear-gradient(135deg,#7c3aed,#a855f7)", contain: true, bgTint: "linear-gradient(160deg,#f5f0ff 0%,#ede8fa 100%)" },
  { img: Sheetal, name: "Sheetal Sharma", role: "Business Analyst", bio: "Strategic business analyst specialising in ICP research, prospect segmentation, and opportunity mapping. Sheetal ensures every campaign is grounded in solid data and targets the right decision-makers.", linkedin: "https://www.linkedin.com/in/sheetal-sharma-8000a425b", grad: "linear-gradient(135deg,#0891b2,#06b6d4)", contain: true, bgTint: "linear-gradient(160deg,#e8f7fb 0%,#d6eff6 100%)" },
  { img: swati, name: "Swati Sharma", role: "Social Media Manager", bio: "Creative social media strategist with a sharp eye for B2B brand storytelling. Swati builds high-impact LinkedIn and social campaigns that grow engaged audiences and convert followers into pipeline.", linkedin: null, grad: "linear-gradient(135deg,#db2777,#f472b6)", contain: false },
];

const EXPERTISE = [
  { ico: "🧭", bg: "linear-gradient(135deg,#1558d6,#2272ff)", title: "Strategic Planning", desc: "Custom marketing roadmaps built around your exact goals to maximize ROI.", tags: ["Market Research", "Competitor Analysis", "Growth Roadmap"] },
  { ico: "🎨", bg: "linear-gradient(135deg,#f5600a,#ff8533)", title: "Creative Campaigns", desc: "Bold, memorable campaigns that cut through the noise and make your brand impossible to ignore.", tags: ["Ad Creatives", "Video Production", "Copywriting"] },
  { ico: "📊", bg: "linear-gradient(135deg,#7c3aed,#a855f7)", title: "Analytics & Reporting", desc: "Deep insights and transparent reporting so you always know exactly where your growth is coming from.", tags: ["Real-time Dashboards", "Monthly Reports", "A/B Testing"] },
  { ico: "🤝", bg: "linear-gradient(135deg,#059669,#10b981)", title: "Client Success", desc: "Your dedicated success partner — available to ensure campaigns perform at their absolute peak.", tags: ["24/7 Support", "Dedicated Manager", "Quarterly Reviews"] },
];

const CULTURE = [
  { ico: "🎯", title: "Results First", desc: "Every decision we make is tied to your measurable business outcomes — not vanity metrics." },
  { ico: "🔬", title: "Data Obsessed", desc: "We live in analytics. Every campaign is tested, measured, and optimised for peak performance." },
  { ico: "🤲", title: "True Partnership", desc: "We treat your business like our own. Your growth is our growth — it's that simple." },
];

const TeamPage = ({ setPage }) => (
  <div className="team-page">
    <section className="team-hero">
      <div className="team-hero-dots" />
      <div className="team-hero-inner">
        <div className="badge" style={{ margin: "0 auto 24px", justifyContent: "center" }}><div className="badge-live" /><span className="badge-txt">The People Behind Your Success</span></div>
        <h1>Meet the Brilliant Minds<br />Driving Your <span style={{ background: "linear-gradient(135deg,var(--orange),var(--orange2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Growth</span></h1>
        <p className="team-hero-sub">A powerhouse team of strategists, creatives, and data wizards — united by one mission: transforming your business into a market leader.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-main"><span>Work With Us</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
          <button className="btn-ghost2" style={{ padding: "14px 28px" }} onClick={() => setPage("home")}>← Back to Home</button>
        </div>
        <div className="team-hero-stats">
          {[{ v: "4", s: "", l: "Core Specialists" }, { v: "B2B", s: "", l: "Exclusively Focused" }, { v: "Full", s: "", l: "Senior Attention" }, { v: "Zero", s: "", l: "Junior Handoffs" }].map((s, i) => (
            <div className="ths" key={i}><div className="ths-val">{s.v}<b>{s.s}</b></div><div className="ths-lbl">{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>

    <section className="sec">
      <div className="ctr" style={{ marginBottom: 48 }}>
        <div className="sec-lbl">Our Experts</div>
        <h2 className="sec-h2">5 Specialists.<br />One Shared Mission.</h2>
        <p className="sec-p">A focused team of B2B specialists — each chosen for their domain depth and genuine passion for helping businesses grow.</p>
      </div>
      <div className="team-g">
        {TEAM.map((m, i) => (
          <div className="tm" key={i}>
            <div className="tm-img" style={m.contain ? { background: m.bgTint } : {}}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.grad, zIndex: 2 }} />
              <img src={m.img} alt={m.name} className={m.contain ? "tm-photo-contain" : "tm-photo"} />
              <div className="tm-ov">
                <p className="tm-bio">{m.bio}</p>
                <div className="tm-soc">
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="tm-sb" title="LinkedIn Profile">
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="tm-body">
              <div className="tm-name">{m.name}</div>
              <span className="tm-role">{m.role}</span>
              <div className="tm-divider" style={{ background: m.grad }} />
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="exp-wrap">
      <div className="ctr" style={{ marginBottom: 48 }}>
        <div className="sec-lbl">What We Excel At</div>
        <h2 className="sec-h2">Our Core Expertise</h2>
        <p className="sec-p">The four pillars that make us the strategic partner of choice for serious B2B growth.</p>
      </div>
      <div className="exp-grid">
        {EXPERTISE.map((e, i) => (
          <div className="exp-card" key={i}>
            <div className="exp-ico" style={{ background: e.bg }}>{e.ico}</div>
            <h3>{e.title}</h3><p>{e.desc}</p>
            <div className="exp-tags">{e.tags.map((t, j) => <span key={j} className="exp-tag">{t}</span>)}</div>
          </div>
        ))}
      </div>
    </div>

    <section className="culture">
      <div className="ctr" style={{ marginBottom: 44, position: "relative", zIndex: 1 }}>
        <div className="sec-lbl" style={{ color: "rgba(255,255,255,.6)", justifyContent: "center" }}>Why We're Different</div>
        <h2 className="sec-h2" style={{ color: "#fff" }}>The Growthmantra99 Way</h2>
      </div>
      <div className="culture-inner">
        {CULTURE.map((c, i) => (
          <div className="cv" key={i}><div className="cv-ico">{c.ico}</div><h3>{c.title}</h3><p>{c.desc}</p></div>
        ))}
      </div>
    </section>

    <section className="sec">
      <div className="together">
        <div className="tog-l">
          <div className="sec-lbl" style={{ color: "var(--orange)" }}>Together We Achieve</div>
          <h2 style={{ fontFamily: "var(--font-h)", fontSize: "2rem", color: "#fff", fontWeight: 800, marginBottom: 12 }}>Together, We Achieve More</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".95rem", lineHeight: 1.65, marginBottom: 28 }}>We're building Growthmantra99 to be the partner we always wished existed in the B2B space — transparent, senior-led, and genuinely invested in your success.</p>
          <div className="tog-stats">
            {[{ v: "B2B", s: "", l: "Exclusively Focused" }, { v: "Senior", s: "", l: "Team Always" }, { v: "Zero", s: "", l: "Lock-in Contracts" }].map((s, i) => (
              <div key={i}><div className="ts-val">{s.v}<b>{s.s}</b></div><div className="ts-lbl">{s.l}</div></div>
            ))}
          </div>
          <button className="btn-main" style={{ marginTop: 32, display: "inline-flex" }}><span>Start Your Journey</span><svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
        </div>
        <div className="tog-r">
          <div className="av-stack">
            {TEAM.map((m, i) => (
              <div key={i} className="av-sm"><img src={m.img} alt={m.name} /></div>
            ))}
          </div>
          <div className="tog-metric">
            <div className="tog-m-val">ICP<span style={{ color: "var(--orange)", fontSize: "1.4rem" }}>-Led</span></div>
            <div className="tog-m-lbl">Every Campaign We Run</div>
          </div>
          <div className="tog-metric">
            <div className="tog-m-val" style={{ color: "var(--orange2)", fontSize: "1.6rem" }}>14-Day</div>
            <div className="tog-m-lbl">Launch Guarantee</div>
          </div>
        </div>
      </div>
    </section>

    <CTABand />
    <Footer setPage={setPage} />
  </div>
);

/* ════════════════════════════════
   ROOT APP
════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Cursor />
      <Nav page={page} setPage={setPage} />
      {page === "home" && <LandingPage setPage={setPage} />}
      {page === "services" && <ServicesPage setPage={setPage} />}
      {page === "team" && <TeamPage setPage={setPage} />}
    </>
  );
}