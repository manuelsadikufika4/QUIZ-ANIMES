const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const PATH={
 vol:'<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/>',
 mute:'<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m22 9-6 6M16 9l6 6"/>',
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
 music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 disc:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
 quote:'<path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 3-2 4-4 4zM14 21c3 0 7-1 7-8V5h-7v8h4c0 3-2 4-4 4z"/>',
 sfx:'<path d="M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3"/>',
 chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
 play:'<path d="M6 3l14 9-14 9z"/>',
 home:'<path d="m3 11 9-8 9 8M5 10v10h14V10"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PATH[n]}</svg>`;
$$('[data-ic]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.ic)));

/* ---------- Splash com progresso circular ---------- */
(()=>{
  const bar=$('#splashBar'),pct=$('#splashPct'),C=2*Math.PI*54;
  bar.style.strokeDasharray=C; bar.style.strokeDashoffset=C;
  let p=0;
  const t=setInterval(()=>{
    p=Math.min(100,p+2+Math.random()*3);
    bar.style.strokeDashoffset=C*(1-p/100);
    pct.textContent=Math.floor(p)+'%';
    if(p>=100){clearInterval(t);setTimeout(()=>$('#splash').classList.add('hide'),350);}
  },60);
})();

/* ---------- Estado ---------- */
const TYPE={quote:'quote',opening:'music',ending:'disc',gif:'image',sfx:'sfx',fala:'chat'};
const LABEL={quote:'Frase',opening:'Opening',ending:'Ending',gif:'GIF',sfx:'Efeito sonoro',fala:'Fala'};
const AUDIO=['opening','ending','sfx','fala'];
const synth=window.speechSynthesis, SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let qi=0,score=0,locked=false,voiceOn=true,tok=0,rt;
const clean=t=>t.replace(/^[a-dA-D][\)\.]\s*/,'').trim();
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim();
const miss=src=>Object.assign(document.createElement('p'),{className:'miss',textContent:'Arquivo não encontrado: '+src});

function stopAll(){ tok++; if(synth)synth.cancel(); const a=$('.media audio'); if(a)a.pause(); }
function speak(text,done){
  if(!voiceOn||!synth){done&&done();return;}
  const u=new SpeechSynthesisUtterance(text); u.lang='pt-BR';
  let f=false; const end=()=>{if(!f){f=true;clearTimeout(tm);done&&done();}};
  const tm=setTimeout(end,15000); u.onend=end; u.onerror=end; synth.speak(u);
}

/* ---------- Telas ---------- */
const main=$('.main'),popup=$('.popup-info'),qs=$('.quiz-section'),qb=$('.quiz-box'),rb=$('.result-box'),nextBtn=$('.next-btn');
$('.start-btn').onclick=()=>{popup.classList.add('active');main.classList.add('active');};
$('.exist-btn').onclick=()=>{popup.classList.remove('active');main.classList.remove('active');};
function begin(){
  popup.classList.remove('active');main.classList.remove('active');
  qs.classList.add('active');qb.classList.add('active');rb.classList.remove('active');
  qi=0;score=0;show(0);
}
$('.continue-btn').onclick=begin;
$('.tryAgain-btn').onclick=begin;
$('.goHome-btn').onclick=()=>{stopAll();clearInterval(rt);qs.classList.remove('active');qb.classList.remove('active');rb.classList.remove('active');};

function head(){
  $('.header-score').textContent=`Pontos: ${score}/${questions.length}`;
  $('.question-total').textContent=`${qi+1} de ${questions.length} Questões`;
  $('#prog').style.width=((qi+1)/questions.length*100)+'%';
}

function show(i){
  stopAll(); const my=++tok, q=questions[i]; locked=false; nextBtn.classList.remove('active');
  const m=$('.media'); m.innerHTML='';
  if(TYPE[q.type]) m.innerHTML=`<div class="tag">${ic(TYPE[q.type])}${LABEL[q.type]}</div>`;
  if(q.type==='quote') m.insertAdjacentHTML('beforeend',`<blockquote>“${q.quote}”</blockquote>`);
  if(q.type==='gif'){const im=new Image();im.alt='GIF';im.src=q.media;im.onerror=()=>im.replaceWith(miss(q.media));m.append(im);}
  const isAudio=AUDIO.includes(q.type);
  if(isAudio){const a=document.createElement('audio');a.controls=true;a.preload='auto';a.src=q.media;a.onerror=()=>a.replaceWith(miss(q.media));m.append(a);}
  $('.question-text').textContent=`${i+1}. ${q.question.trim()}`;
  const list=$('.option-list'); list.innerHTML='';
  q.options.forEach(o=>{const b=document.createElement('button');b.className='option';b.textContent=o.trim();b.onclick=()=>pick(b);list.append(b);});
  head();
  const say=q.question+(q.quote?'. '+q.quote:'')+(isAudio?'':'. '+q.options.map(clean).join(', '));
  speak(say,()=>{ if(my!==tok||!isAudio)return; const a=$('.media audio'); if(a)a.play().catch(()=>{}); });
}

function pick(el){
  if(locked)return; locked=true; stopAll();
  const q=questions[qi], ans=q.answer.trim(), ok=el.textContent===ans;
  if(ok){score++;el.classList.add('correct');}
  else{el.classList.add('incorrect');$$('.option').forEach(b=>{if(b.textContent===ans)b.classList.add('correct');});}
  $$('.option').forEach(b=>b.disabled=true);
  nextBtn.classList.add('active'); head();
  speak(ok?'Correto!':'Errado. A resposta certa é '+clean(ans));
}

nextBtn.onclick=()=>{ if(!locked)return; if(qi<questions.length-1){qi++;show(qi);}else result(); };

function result(){
  stopAll(); qb.classList.remove('active'); rb.classList.add('active');
  $('.score-text').textContent=`Você acertou ${score} de ${questions.length} questões`;
  const end=Math.round(score/questions.length*100),pv=$('.progress-value'),cp=$('.circular-progress'); let v=0;
  clearInterval(rt);
  rt=setInterval(()=>{v=Math.min(v+1,end);pv.textContent=v+'%';cp.style.background=`conic-gradient(#c43e00 ${v*3.6}deg,rgba(255,255,255,.1) 0deg)`;if(v>=end)clearInterval(rt);},15);
  speak(`Quiz finalizado! Você acertou ${score} de ${questions.length} questões.`);
}

/* ---------- Voz ---------- */
$('#voiceBtn').onclick=e=>{voiceOn=!voiceOn;e.currentTarget.innerHTML=ic(voiceOn?'vol':'mute');if(!voiceOn)stopAll();};
async function listen(){
  const P=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.SpeechRecognition;
  if(P){await P.requestPermissions();const r=await P.start({language:'pt-BR',maxResults:1,partialResults:false,popup:false});return(r.matches&&r.matches[0])||'';}
  if(SR)return new Promise(res=>{const r=new SR();r.lang='pt-BR';r.onresult=e=>res(e.results[0][0].transcript);r.onerror=r.onend=()=>res('');r.start();});
  return null;
}
$('#micBtn').onclick=async()=>{
  if(locked)return; stopAll();
  const said=await listen();
  if(said===null)return alert('Reconhecimento de voz indisponível neste dispositivo.');
  const n=norm(said); if(!n)return;
  const hit=$$('.option').find((o,i)=>n==='abcd'[i]||n==='letra '+'abcd'[i]||(n.length>2&&(norm(clean(o.textContent)).includes(n)||n.includes(norm(clean(o.textContent))))));
  if(hit)hit.click(); else speak('Não entendi, tente de novo.');
};
