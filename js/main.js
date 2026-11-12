const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// 3D view themes
$$('.viewbar button').forEach(b=>b.onclick=()=>{
  $$('.viewbar button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  document.body.className=b.dataset.v;
});

// header + top button
const onScroll=()=>{const y=scrollY;$('#hdr').classList.toggle('scrolled',y>10);$('#hdr').classList.toggle('show',y>$('#home').offsetHeight-90);$('#totop').classList.toggle('show',y>600);
  let cur='home';['home','services','presence','why','contact'].forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<140)cur=id});
  $$('.links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));};
addEventListener('scroll',onScroll,{passive:true});
$('#totop').onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('#burger').onclick=()=>$('#links').classList.toggle('open');
$$('.links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));


// ===== hero FX =====
(()=>{const st=$('#hstage');if(!st)return;const W=1672,H=941;
const cf=$('#fxFront'),xf=cf.getContext('2d');let s=1,dpr=1;
function size(){const r=st.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);s=r.width/W;cf.width=r.width*dpr;cf.height=r.height*dpr;}
size();addEventListener('resize',size);
$$('.hstage [data-d]').forEach(e=>e.style.setProperty('--d',e.dataset.d));
st.addEventListener('mousemove',e=>{const r=st.getBoundingClientRect();st.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));st.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));});
st.addEventListener('mouseleave',()=>{st.style.setProperty('--mx',0);st.style.setProperty('--my',0)});
const O={cx:1173,cy:383,rx:475,ry:100,t:-13.3*Math.PI/180};
const ep=a=>{const x=O.rx*Math.cos(a),y=O.ry*Math.sin(a);return[O.cx+x*Math.cos(O.t)-y*Math.sin(O.t),O.cy+x*Math.sin(O.t)+y*Math.cos(O.t)]};
const P=[];const spawn=()=>P.push({x:920+Math.random()*560,y:700+Math.random()*80,v:.25+Math.random()*.5,r:.8+Math.random()*2,l:0,L:200+Math.random()*220,w:Math.random()*6});
const T=[...Array(10)].map(()=>({x:960+Math.random()*420,y:190+Math.random()*380,p:Math.random()*6.28,s:.015+Math.random()*.025}));
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(st);
function dot(c,x,y,r,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,255,255,${a})`);g.addColorStop(.2,`rgba(130,205,255,${a*.95})`);g.addColorStop(.5,`rgba(30,120,255,${a*.35})`);g.addColorStop(1,'rgba(30,110,255,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
const turb=document.getElementById('turb');let t0=performance.now();
function frame(now){requestAnimationFrame(frame);if(!vis)return;const t=(now-t0)/1000,c=xf;
 c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,cf.width,cf.height);c.setTransform(s*dpr,0,0,s*dpr,0,0);
 if(turb)turb.setAttribute('baseFrequency',`${(0.012+0.002*Math.sin(t*.7)).toFixed(4)} ${(0.09+0.015*Math.sin(t*.9)).toFixed(4)}`);
 // light pulses running along the glass highway
 // particles (light motes rising from water / city)
 if(P.length<45&&Math.random()<.5)spawn();
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.l++;p.y-=p.v;const a=Math.sin(Math.PI*p.l/p.L);dot(c,p.x+Math.sin((p.l+p.w*20)/30)*4,p.y,p.r*3,a*.75);if(p.l>p.L)P.splice(i,1);}
 // twinkles around city & ring
 T.forEach(q=>{q.p+=q.s;const a=Math.max(0,Math.sin(q.p))**6;if(a>.02){dot(c,q.x,q.y,9*a+2,a);c.strokeStyle=`rgba(255,255,255,${a*.8})`;c.lineWidth=1;c.beginPath();c.moveTo(q.x-12*a,q.y);c.lineTo(q.x+12*a,q.y);c.moveTo(q.x,q.y-12*a);c.lineTo(q.x,q.y+12*a);c.stroke();}});
 // orbit comets
 [[t*.5,1],[t*.5+Math.PI,.75]].forEach(([a0,str])=>{for(let j=45;j>=0;j--){const a=a0-j*.018,[x,y]=ep(a);const back=Math.sin(a)<0?.55:1;const f=1-j/45;dot(c,x,y,(j?10*f:30)*str+2,(j?.7*f:1)*str*back);}});
}
requestAnimationFrame(frame);
})();
// hotspots
$$('[data-spot=fintech]').forEach(a=>a.addEventListener('click',()=>showSvc(2)));
$$('[data-spot=video]').forEach(v=>v.onclick=e=>{e.preventDefault();$('#mt').textContent='Watch Journey';$('#modal .box p').textContent='Our journey video is coming soon. Meanwhile, contact us at support@almanzartech.com or +91 90084 34861.';$('#modal').classList.add('open')});
$$('[data-modal]').forEach(a=>a.addEventListener('click',()=>$('#modal .box p').innerHTML='This policy page is being finalised. For questions, contact <b>support@almanzartech.com</b>.'));
// services
const S=[
 {t:'Software',h:'Software & Application',d:'Enterprise-grade web systems, premium custom apps, and fluid cross-platform mobile environments built on high-performance frameworks.',l:['Custom Website Development','Enterprise Web Applications','Mobile Apps (iOS/Android)','E-Commerce Platforms','MLM Software'],o:'Software & Application Environments'},
 {t:'Blockchain',h:'Blockchain & Web3',d:'Secure distributed ledgers, smart-contract systems and tokenised ecosystems engineered for transparency and scale.',l:['Smart Contract Development','Private / Public Chain Integration','Crypto Wallets & Exchanges','Token & NFT Platforms','DeFi Solutions'],o:'Blockchain & Web3 Solutions'},
 {t:'FinTech',h:'FinTech & Trading',d:'Bank-grade payment rails, trading platforms and neo-banking infrastructure with compliance built in.',l:['UPI & Payment Gateways','Forex & MT4/MT5 Solutions','Neo-Banking Platforms','Digital Wallets & Vaults','KYC / AML Integration'],o:'FinTech & Trading (UPI, Forex)'},
 {t:'Deep AI',h:'Deep Neural AI',d:'Custom machine-learning models and intelligent automation that turn your data into decisions.',l:['Custom ML Models','AI Chatbots & Assistants','Predictive Analytics','Computer Vision','Process Automation'],o:'Deep Neural AI (ML Models)'},
 {t:'WebGL',h:'WebGL Canvas (VR, AR, 3D)',d:'Immersive, high-fidelity 3D and extended-reality experiences that run right in the browser.',l:['3D Product Visualisation','Virtual Showrooms','AR / VR Experiences','Interactive Web 3D','Metaverse Environments'],o:'WebGL Canvas (VR, AR, 3D)'},
 {t:'Growth',h:'Growth Engine – Digital Growth',d:'Performance marketing and brand systems that scale reach, leads and revenue.',l:['SEO & Performance Marketing','Social Media Management','Brand Identity & Design','Lead Generation Funnels','Analytics & CRO'],o:'Growth Engine Digital Growth'},
 {t:'Real',h:'Real Estate & Virtual Expo',d:'Digital promotion architectures, virtual tours and expo portals that showcase property assets globally.',l:['Property Listing Portals','360° Virtual Tours','Virtual Expo Platforms','Asset Branding','CRM for Developers'],o:'Real Estate & Virtual Expo Portals'},
 {t:'MENA-APAC',h:'MENA-APAC Global Tech Advisory',d:'Strategic technology consulting and regulatory alignment for businesses expanding across GCC and Asia-Pacific.',l:['Technology Strategy','Regulatory & Compliance Alignment','Market-Entry Tech Setup','Vendor & Architecture Audits','Offshore Team Setup'],o:'MENA-APAC Global Tech Advisory'}];
let curSvc=0;
function showSvc(i){curSvc=i;const s=S[i];$$('#tabs button').forEach((b,j)=>b.classList.toggle('on',j===i));
  const p=$('#svcPanel');p.classList.remove('fade');void p.offsetWidth;p.classList.add('fade');
  p.innerHTML=`<span class="eyebrow">${s.t}</span><h3>${s.h}</h3><p>${s.d}</p><ul class="ticks">${s.l.map(x=>`<li>${x}</li>`).join('')}</ul>`;
  $('#auditNote').textContent=`${s.h} is deployable from both Dubai and Bengaluru delivery nodes with full offshore–onsite coverage.`;}
$('#tabs').innerHTML=S.map((s,i)=>`<button>${s.t}</button>`).join('');
$$('#tabs button').forEach((b,i)=>b.onclick=()=>showSvc(i));showSvc(0);
$('[data-svc]').onclick=()=>{$('#sv').value=S[curSvc].o};

// hubs
const H={dxb:{n:'DUBAI HQ',d:'Global Headquarters & Advisory Desk located in Business Bay, Dubai, UAE. Serving GCC countries and international markets with premium technology consulting, regulatory alignment, and fintech solutions.',f:['Fintech Compliance Desk','GCC Regional Strategy Desk','Client Advisory Node','PGP Secure Gateway Hub'],p:'39ms',pk:26},
 blr:{n:'BENGALURU ENGINEERING',d:'Engineering Headquarters in Bengaluru, Karnataka, India. Our core development centre delivers software, blockchain, AI and immersive platforms with offshore speed and cost efficiency.',f:['Core Engineering Desk','AI & Data Lab','QA & DevOps Node','24/7 Support Centre'],p:'24ms',pk:41}};
let pk,tm;
function showHub(k){const h=H[k];$$('.hub').forEach(b=>b.classList.toggle('on',b.dataset.hub===k));pk=h.pk;
  const p=$('#hubPanel');p.classList.remove('fade');void p.offsetWidth;p.classList.add('fade');
  p.innerHTML=`<span class="mono" style="color:var(--blue)">${h.n} CODESPACE Parameters</span><p style="color:var(--ink2);margin:12px 0 0">${h.d}</p>
  <ul class="ticks" style="margin-top:18px">${h.f.map(x=>`<li>${x}</li>`).join('')}</ul>
  <h5>Trans-Regional Fiber Backbone</h5>
  <div class="metrics"><div class="metric"><small>PING LATENCY</small><b>${h.p}</b><em>Optimized</em></div><div class="metric"><small>GUARANTEED UPTIME</small><b>99.999%</b><em>Continuous</em></div>
  <div class="metric"><small>OFFSHORE TRAFFIC LOAD</small><b id="pk">${pk} PACKETS / SEC</b><em>Dynamic</em></div><div class="metric"><small>ENCRYPTION TUNNEL</small><b>SECURE-SSLv3</b><em>Mandatory</em></div></div>
  <p class="note">Dubai &amp; Bengaluru offices utilize a synchronous, PGP-ready router network to secure private inquiries and speed up regional delivery lifecycles.</p>`;}
$$('.hub').forEach(b=>b.onclick=()=>showHub(b.dataset.hub));showHub('dxb');
setInterval(()=>{const e=$('#pk');if(e)e.textContent=(pk+Math.round(Math.random()*10-5))+' PACKETS / SEC'},1500);

// why + industries
const ic={a:'<path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>',g:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',u:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.9"/>',s:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',l:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',h:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',e:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
 c:'<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',t:'<path d="M3 17l6-6 4 4 8-8M14 7h7v7"/>',b:'<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',r:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',k:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',ed:'<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',m:'<rect x="2" y="7" width="20" height="15" rx="2"/><path d="M17 2l-5 5-5-5"/>',st:'<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/>'};
const W=[['a','End-to-End Technology Partner','From initial concept to full-scale deployment and active maintenance.'],['g','Dubai-Based Global Approach','Leveraging UAE business excellence with world-class global tech standards.'],['u','Experienced Tech Architects','Our team comprises seniors with decades of enterprise industry experience.'],['s','Secure & Compliant','Enterprise-grade bank security and strict adherence to global regulations.'],['l','White-Label Platforms','Ready-to-deploy, battle-tested solutions tailored to your unique branding.'],['h','Strong Support 24/7','Continuous server monitoring and active support for all digital assets.'],['e','Transparent Process','On-time milestone delivery with complete, real-time code and progress visibility.']];
const I=[['c','FinTech & Crypto','Decentralized transaction routing & digital vaults.'],['t','Forex & Trading','High-frequency brokers & customizable MT4/MT5 solutions.'],['b','Banking & Payments','Unified API wrappers, UPI setups & neo-banking networks.'],['r','Real Estate','Bespoke digital promotion architectures & asset branding.'],['k','E-Commerce','High-throughput merchant carts & smart inventory pipelines.'],['ed','Education','Smart classroom servers & decentralized credential databases.'],['m','Media','Interactive 3D exposure networks & real-time broadcasting.'],['st','Startups','Fast prototype frameworks & scalable cloud migration systems.']];
const card=([i,h,p])=>`<div class="card reveal"><div class="ico"><svg viewBox="0 0 24 24">${ic[i]}</svg></div><h4>${h}</h4><p>${p}</p></div>`;
$('#whyGrid').innerHTML=W.map(card).join('');$('#indGrid').innerHTML=I.map(card).join('');

// reveal
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>rv.observe(el));

// custom spec
$('#customSpec').onclick=()=>{$('#msg').value='Requesting a custom deployment specification for: ';};

// form
$('#form').addEventListener('submit',e=>{e.preventDefault();const n=$('#fn').value.trim(),m=$('#em').value.trim(),t=$('#msg').value.trim(),o=$('#okmsg');
  if(!n||!/^\S+@\S+\.\S+$/.test(m)||!t){o.style.display='block';o.style.background='rgba(255,80,80,.12)';o.style.color='#c0392b';o.textContent='Please fill in your name, a valid email and your project message.';return;}
  o.style.display='block';o.style.background='';o.style.color='';
  o.innerHTML=`Thanks ${n.split(' ')[0]} — your details are ready. To send, email <b>support@almanzartech.com</b> or call <b>+91 90084 34861</b>.`;});

// modal
$$('[data-modal]').forEach(a=>a.onclick=e=>{e.preventDefault();$('#mt').textContent=a.dataset.modal;$('#modal').classList.add('open')});
$('#mx').onclick=()=>$('#modal').classList.remove('open');
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.remove('open')};
