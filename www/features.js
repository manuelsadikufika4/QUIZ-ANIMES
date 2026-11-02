(()=>{
const $=s=>document.querySelector(s), synth=window.speechSynthesis;
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let voiceOn=true;
const clean=t=>t.replace(/^[a-dA-D][\)\.]\s*/,'');
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim();
function speak(t){ if(!voiceOn||!synth)return; synth.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang='pt-BR'; synth.speak(u); }

const baseShow=showQuestions;
showQuestions=function(i){
  baseShow(i);
  const q=questions[i], box=$('.media'); box.innerHTML='';
  const miss="onerror=\"this.outerHTML='<p class=miss>⚠️ Adicione o arquivo '+this.getAttribute('src')+'</p>'\"";
  if(q.type==='quote') box.innerHTML=`<blockquote>“${q.quote}”</blockquote>`;
  if(q.type==='gif') box.innerHTML=`<img src="${q.media}" alt="GIF" ${miss}>`;
  if(['opening','ending','sfx','fala'].includes(q.type)) box.innerHTML=`<audio controls src="${q.media}" ${miss}></audio>`;
  speak(q.question+(q.quote?'. '+q.quote:'')+'. '+q.options.map(clean).join(', '));
};

const baseSel=optionSelected;
optionSelected=function(a){
  baseSel(a);
  const ok=a.classList.contains('correct');
  speak(ok?'Correto!':'Errado. A resposta certa é '+clean(questions[questionCount].answer));
};

$('#voiceBtn').onclick=e=>{ voiceOn=!voiceOn; e.target.textContent=voiceOn?'🔊':'🔇'; if(!voiceOn&&synth)synth.cancel(); };

async function listen(){
  const P=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.SpeechRecognition;
  if(P){ await P.requestPermissions(); const r=await P.start({language:'pt-BR',maxResults:1,partialResults:false,popup:false}); return (r.matches&&r.matches[0])||''; }
  if(SR) return new Promise(res=>{const r=new SR(); r.lang='pt-BR'; r.onresult=e=>res(e.results[0][0].transcript); r.onerror=r.onend=()=>res(''); r.start();});
  return null;
}
$('#micBtn').onclick=async()=>{
  if(synth)synth.cancel();
  const btn=$('#micBtn'); btn.textContent='👂';
  const said=await listen(); btn.textContent='🎤';
  if(said===null) return alert('Reconhecimento de voz indisponível neste dispositivo.');
  const n=norm(said); if(!n) return;
  const opts=[...document.querySelectorAll('.option')];
  const hit=opts.find((o,i)=>n==='abcd'[i]||n==='letra '+'abcd'[i]||(n.length>2&&(norm(clean(o.textContent)).includes(n)||n.includes(norm(clean(o.textContent))))));
  if(hit&&!hit.classList.contains('disabled')) hit.click(); else speak('Não entendi, tente de novo');
};
})();
