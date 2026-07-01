const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>SpeakUp</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0f1117;color:#e8eaf0;min-height:100vh;display:flex;flex-direction:column;max-width:480px;margin:0 auto}
header{padding:16px 20px 12px;border-bottom:1px solid #2e3248;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#0f1117;z-index:10}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;background:linear-gradient(135deg,#4f8ef7,#7c6af7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.phrase-bar{background:#1a1d27;border-bottom:1px solid #2e3248;padding:10px 20px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:background .15s}
.phrase-bar:hover{background:#22263a}
.phrase-label{font-size:10px;font-weight:600;color:#4f8ef7;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}
.phrase-text{font-size:13px;color:#e8eaf0;font-style:italic;flex:1}
.phrase-text.unset{color:#8b90a8;font-style:normal}
.phrase-edit{font-size:12px;color:#8b90a8;flex-shrink:0}
.kw-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:20;display:none}
.kw-panel{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:#1a1d27;border-top:1px solid #2e3248;border-radius:20px 20px 0 0;z-index:21;padding:16px 20px 32px;display:none}
.kw-panel.open,.kw-overlay.open{display:block}
.kw-handle{width:36px;height:4px;background:#2e3248;border-radius:2px;margin:0 auto 16px}
.kw-title{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;margin-bottom:14px;color:#e8eaf0}
.kw-row{display:flex;gap:8px;margin-bottom:20px}
.kw-input{flex:1;background:#0f1117;border:1px solid #2e3248;border-radius:10px;padding:10px 14px;color:#e8eaf0;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s}
.kw-input:focus{border-color:#4f8ef7}
.kw-input::placeholder{color:#8b90a8}
.kw-save{padding:0 18px;height:42px;border-radius:10px;border:none;background:linear-gradient(135deg,#4f8ef7,#7c6af7);color:#fff;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0}
.kw-save:hover{opacity:.85}
.kw-hist-label{font-size:10px;font-weight:600;color:#8b90a8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
.kw-hist-list{display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto}
.kw-hist-item{background:#0f1117;border:1px solid #2e3248;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.kw-hist-date{font-size:11px;color:#8b90a8;white-space:nowrap}
.kw-hist-phrase{font-size:13px;color:#e8eaf0;flex:1;font-style:italic}
.kw-use-btn{font-size:11px;color:#4f8ef7;background:none;border:1px solid #4f8ef7;border-radius:6px;padding:4px 8px;cursor:pointer;white-space:nowrap;flex-shrink:0}
.kw-use-btn:hover{background:#4f8ef720}
.kw-del-btn{font-size:12px;color:#8b90a8;background:none;border:none;cursor:pointer;padding:4px;flex-shrink:0;line-height:1}
.kw-del-btn:hover{color:#f76f6f}
.kw-empty{font-size:13px;color:#8b90a8;padding:8px 0}
.kw-clear-all{font-size:11px;color:#8b90a8;background:none;border:none;cursor:pointer;padding:8px 0 0;text-decoration:underline;font-family:inherit}
.kw-clear-all:hover{color:#f76f6f}
#chat{flex:1;overflow-y:auto;padding:16px 16px 8px;display:flex;flex-direction:column;gap:14px}
.bw{display:flex;flex-direction:column;gap:4px}.bw.user{align-items:flex-end}.bw.ai{align-items:flex-start}
.bubble{max-width:85%;padding:11px 14px;border-radius:14px;font-size:14px;line-height:1.55}
.bubble.user{background:linear-gradient(135deg,#4f8ef7,#7c6af7);color:#fff;border-bottom-right-radius:4px}
.bubble.ai{background:#1a1d27;color:#e8eaf0;border-bottom-left-radius:4px;border:1px solid #2e3248}
.bubble.correction{background:#22263a;border:1px solid #2e3248;border-left:3px solid #f7c84f;border-bottom-left-radius:4px;font-size:13px}
.ch{font-size:11px;font-weight:600;color:#f7c84f;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
.cja{color:#8b90a8;font-size:12px;display:none}.cja.visible{display:block}
.tja{margin-top:8px;font-size:11px;color:#4f8ef7;cursor:pointer;border:none;background:none;padding:0;font-family:inherit}
.time{font-size:10px;color:#8b90a8;padding:0 4px}
.typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:#1a1d27;border:1px solid #2e3248;border-radius:14px;border-bottom-left-radius:4px;width:fit-content}
.typing span{width:6px;height:6px;background:#8b90a8;border-radius:50%;animation:bounce 1.2s infinite}
.typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}
@keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
footer{padding:12px 16px 24px;border-top:1px solid #2e3248;background:#0f1117;position:sticky;bottom:0}
.input-row{display:flex;gap:8px;align-items:flex-end}
#ti{flex:1;background:#1a1d27;border:1px solid #2e3248;border-radius:12px;padding:10px 14px;color:#e8eaf0;font-size:14px;font-family:inherit;resize:none;outline:none;line-height:1.4;max-height:100px;transition:border-color .2s}
#ti:focus{border-color:#4f8ef7}#ti::placeholder{color:#8b90a8}
.bmic{width:44px;height:44px;border-radius:50%;border:none;background:#22263a;color:#8b90a8;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;font-size:18px}
.bmic:hover{background:#1a1d27;color:#e8eaf0}
.bmic.recording{background:#f76f6f;color:#fff;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(247,111,111,.4)}50%{box-shadow:0 0 0 8px rgba(247,111,111,0)}}
.bsend{width:44px;height:44px;border-radius:50%;border:none;background:linear-gradient(135deg,#4f8ef7,#7c6af7);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;transition:opacity .2s}
.bsend:hover{opacity:.85}.bsend:disabled{opacity:.4;cursor:not-allowed}
.ms{text-align:center;font-size:11px;color:#f76f6f;margin-bottom:6px;height:14px}
.welcome{text-align:center;padding:30px 20px;color:#8b90a8}
.welcome h2{font-family:'Space Grotesk',sans-serif;font-size:22px;color:#e8eaf0;margin-bottom:8px}
.welcome p{font-size:13px;line-height:1.6}
.hint{margin-top:16px;background:#1a1d27;border:1px solid #2e3248;border-radius:14px;padding:12px 14px;font-size:13px;text-align:left}
.hl{font-size:10px;font-weight:600;color:#3dd68c;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
</style>
</head>
<body>
<header><div class="logo">SpeakUp</div><div style="font-size:12px;color:#8b90a8">🎙 英語会話練習</div></header>
<div class="phrase-bar" id="phrase-bar" onclick="openKwPanel()">
  <span class="phrase-label">Today's Phrase</span>
  <span class="phrase-text unset" id="phrase-text">タップして設定...</span>
  <span class="phrase-edit">✏️</span>
</div>
<div class="kw-overlay" id="kw-overlay" onclick="closeKwPanel()"></div>
<div class="kw-panel" id="kw-panel">
  <div class="kw-handle"></div>
  <div class="kw-title">Today's Keyword</div>
  <div class="kw-row">
    <input class="kw-input" id="kw-input" type="text" placeholder="今日の練習フレーズを入力...">
    <button class="kw-save" onclick="saveKeyword()">保存</button>
  </div>
  <button class="kw-clear-all" id="kw-del-today" onclick="deleteTodayKeyword()" style="display:none;margin-bottom:16px">今日のキーワードを削除</button>
  <div class="kw-hist-label">履歴</div>
  <div class="kw-hist-list" id="kw-hist"></div>
  <button class="kw-clear-all" id="kw-clear-all" onclick="clearAllKeywords()" style="display:none">すべて削除</button>
</div>
<div id="chat">
<div class="welcome">
  <h2>Hello! Let's practice. 👋</h2>
  <p>話しかけてください。英語でも日本語でもOK。<br>添削と解説は英語＋日本語で表示します。</p>
  <div class="hint"><div class="hl">💡 Today's Keyword</div><span id="welcome-kw">上のバーをタップしてフレーズを設定しましょう</span></div>
</div>
</div>
<footer>
<div class="ms" id="ms"></div>
<div class="input-row">
<textarea id="ti" rows="1" placeholder="Type or use mic..."></textarea>
<button class="bsend" id="tts" style="background:#22263a" onclick="speak()">🔊</button>
<button class="bmic" id="bm">🎙</button>
<button class="bsend" id="bs">➤</button>
</div>
</footer>
<script>
const chat=document.getElementById('chat'),ti=document.getElementById('ti'),bm=document.getElementById('bm'),bs=document.getElementById('bs'),ms=document.getElementById('ms');
let isRec=false,rec=null,hist=[],todayKeyword='';

function gt(){return new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})}
function dateStr(offsetDays){const d=new Date();if(offsetDays)d.setDate(d.getDate()+offsetDays);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function addB(text,type,time){const w=document.createElement('div');w.className='bw '+type;const b=document.createElement('div');b.className='bubble '+type;b.textContent=text;const t=document.createElement('div');t.className='time';t.textContent=time||gt();w.appendChild(b);w.appendChild(t);chat.appendChild(w);chat.scrollTop=chat.scrollHeight;return w}
function addTyping(){const w=document.createElement('div');w.className='bw ai';w.innerHTML='<div class="typing"><span></span><span></span><span></span></div>';chat.appendChild(w);chat.scrollTop=chat.scrollHeight;return w}
function toggleJa(btn){const ja=btn.previousElementSibling;if(ja.classList.contains('visible')){ja.classList.remove('visible');btn.textContent='日本語で見る'}else{ja.classList.add('visible');btn.textContent='隠す'}}
function speak(){speechSynthesis.cancel();const els=document.querySelectorAll('.bubble.ai');if(els.length===0)return;const u=new SpeechSynthesisUtterance(els[els.length-1].textContent);u.lang='en-US';u.rate=0.9;speechSynthesis.speak(u)}
function addAI(reply,cor){const time=gt();addB(reply,'ai',time);if(cor&&cor.needed){const w=document.createElement('div');w.className='bw ai';const b=document.createElement('div');b.className='bubble correction';b.innerHTML='<div class="ch">✏️ Correction</div><div><span style="color:#f76f6f;text-decoration:line-through;font-size:12px">'+esc(cor.original)+'</span><br><span style="color:#3dd68c">✓ '+esc(cor.fixed)+'</span></div><div style="margin-top:8px;font-size:13px;color:#8b90a8">'+esc(cor.explanation_en)+'</div><div class="cja">'+esc(cor.explanation_ja)+'</div><button class="tja" onclick="toggleJa(this)">日本語で見る</button>';const t=document.createElement('div');t.className='time';t.textContent=time;w.appendChild(b);w.appendChild(t);chat.appendChild(w);chat.scrollTop=chat.scrollHeight}}

function setPhraseBar(phrase){
  const el=document.getElementById('phrase-text');
  if(phrase){el.textContent='"'+phrase+'"';el.classList.remove('unset')}
  else{el.textContent='タップして設定...';el.classList.add('unset')}
  const wk=document.getElementById('welcome-kw');
  if(wk)wk.textContent=phrase?'"'+phrase+'"':'上のバーをタップしてフレーズを設定しましょう';
}

function loadKeyword(){
  const today=dateStr(0);
  todayKeyword=localStorage.getItem('speakup:kw:'+today)||'';
  if(todayKeyword)document.getElementById('kw-input').value=todayKeyword;
  setPhraseBar(todayKeyword);
  document.getElementById('kw-del-today').style.display=todayKeyword?'block':'none';
  renderHistory();
}

function allKeywordDates(){
  const today=dateStr(0);
  const dates=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&key.indexOf('speakup:kw:')===0){
      const d=key.slice('speakup:kw:'.length);
      if(d!==today)dates.push(d);
    }
  }
  return dates.sort().reverse();
}

function renderHistory(){
  const el=document.getElementById('kw-hist');
  const items=allKeywordDates().map(d=>({date:d,phrase:localStorage.getItem('speakup:kw:'+d)})).filter(h=>h.phrase);
  document.getElementById('kw-clear-all').style.display=items.length?'block':'none';
  if(!items.length){el.innerHTML='<div class="kw-empty">履歴なし</div>';return}
  el.innerHTML=items.map(h=>'<div class="kw-hist-item"><span class="kw-hist-date">'+esc(h.date)+'</span><span class="kw-hist-phrase">"'+esc(h.phrase)+'"</span><button class="kw-use-btn" data-phrase="'+esc(h.phrase)+'" onclick="useKeyword(this.dataset.phrase)">使う</button><button class="kw-del-btn" data-date="'+esc(h.date)+'" onclick="deleteKeyword(this.dataset.date)">×</button></div>').join('')
}

function deleteKeyword(date){
  localStorage.removeItem('speakup:kw:'+date);
  renderHistory();
}

function clearAllKeywords(){
  allKeywordDates().forEach(d=>localStorage.removeItem('speakup:kw:'+d));
  renderHistory();
}

function openKwPanel(){
  document.getElementById('kw-panel').classList.add('open');
  document.getElementById('kw-overlay').classList.add('open');
  document.getElementById('kw-del-today').style.display=todayKeyword?'block':'none';
  document.getElementById('kw-input').focus();
}
function closeKwPanel(){document.getElementById('kw-panel').classList.remove('open');document.getElementById('kw-overlay').classList.remove('open')}

function saveKeyword(){
  const phrase=document.getElementById('kw-input').value.trim();
  if(!phrase)return;
  localStorage.setItem('speakup:kw:'+dateStr(0),phrase);
  todayKeyword=phrase;
  setPhraseBar(phrase);
  document.getElementById('kw-del-today').style.display='block';
  renderHistory();
  closeKwPanel();
}

function deleteTodayKeyword(){
  localStorage.removeItem('speakup:kw:'+dateStr(0));
  todayKeyword='';
  document.getElementById('kw-input').value='';
  document.getElementById('kw-del-today').style.display='none';
  setPhraseBar('');
}

function useKeyword(phrase){
  closeKwPanel();
  ti.value=phrase;ti.focus();
  ti.style.height='auto';ti.style.height=Math.min(ti.scrollHeight,100)+'px';
}

async function send(text){if(!text.trim())return;const wel=chat.querySelector('.welcome');if(wel)wel.remove();addB(text,'user');hist.push({role:'user',content:text});const tw=addTyping();bs.disabled=true;
try{const r=await fetch('/api',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist,keyword:todayKeyword})});const data=await r.json();const raw=data.content?.[0]?.text||'{}';let p;try{p=JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g,'').trim())}catch{try{const m=raw.match(/\{[\s\S]*\}/);p=m?JSON.parse(m[0]):{reply:'Sorry, please try again.',correction:{needed:false}}}catch{p={reply:'Sorry, please try again.',correction:{needed:false}}}};tw.remove();const rep=p.reply||'Sorry, could not respond.';hist.push({role:'assistant',content:rep});addAI(rep,p.correction)}catch(e){tw.remove();addB('Connection error. Please try again.','ai')}
bs.disabled=false;ti.value='';ti.style.height='auto'}

bs.addEventListener('click',()=>send(ti.value));
ti.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(ti.value)}});
ti.addEventListener('input',()=>{ti.style.height='auto';ti.style.height=Math.min(ti.scrollHeight,100)+'px'});
if('webkitSpeechRecognition'in window||'SpeechRecognition'in window){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;rec=new SR();rec.lang='en-US';rec.continuous=false;rec.interimResults=true;rec.onstart=()=>{isRec=true;bm.classList.add('recording');bm.textContent='⏹';ms.textContent='🔴 Recording... speak now'};rec.onresult=e=>{let f='',i='';for(let x=e.resultIndex;x<e.results.length;x++){if(e.results[x].isFinal)f+=e.results[x][0].transcript;else i+=e.results[x][0].transcript}ti.value=f||i};rec.onend=()=>{isRec=false;bm.classList.remove('recording');bm.textContent='🎙';ms.textContent='';if(ti.value.trim())send(ti.value)};rec.onerror=()=>{isRec=false;bm.classList.remove('recording');bm.textContent='🎙';ms.textContent=''};bm.addEventListener('click',()=>{if(isRec)rec.stop();else rec.start()})}else{bm.style.opacity='.3'}
loadKeyword();
</script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { messages, keyword } = body;

        const keywordInstruction = keyword
          ? ` Today's practice keyword/phrase is: "${keyword}". Naturally weave it into the conversation when appropriate and gently encourage the user to use it.`
          : '';

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 1000,
            system: `You are a friendly English conversation practice assistant for a Japanese adult learner (age 47, technical engineer, intermediate level).${keywordInstruction} ALWAYS respond in this exact JSON format: {"reply": "Your reply","correction": {"needed": true or false,"original": "original if needed","fixed": "fixed if needed","explanation_en": "explanation","explanation_ja": "日本語説明"}}. Be warm, keep replies short (2-3 sentences). Focus on one correction at a time. Do NOT use any emoji or emoticons in your reply.`,
            messages: messages,
          }),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
