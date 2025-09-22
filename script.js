const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
let width=canvas.width=window.innerWidth;
let height=canvas.height=window.innerHeight;
let fontSize=Math.min(20,width/50);
let columns=Math.floor(width/fontSize);
let drops=new Array(columns).fill(1);

const pwdInput=document.getElementById('password');
const timerEl=document.getElementById('timer');
const barEl=document.getElementById('bar');
const complexityEl=document.getElementById('complexity');

function estimateTime(pwd){
    if(!pwd) return 0;
    let totalCombos=1;
    for(let ch of pwd){
        if(/[a-z]/.test(ch)) totalCombos *=26;
        else if(/[A-Z]/.test(ch)) totalCombos *=26;
        else if(/[0-9]/.test(ch)) totalCombos *=10;
        else totalCombos *=32;
    }
    let seconds=totalCombos/1e8;
    return seconds;
}

function formatTime(sec){
    if(sec<60) return sec.toFixed(2)+' sec';
    let m=Math.floor(sec/60);
    let s=Math.floor(sec%60);
    if(m<60) return m+' min '+s+' sec';
    let h=Math.floor(m/60);
    let min=m%60;
    if(h<24) return h+' h '+min+' min';
    let d=Math.floor(h/24);
    h=h%24;
    return d+' j '+h+' h '+min+' min';
}

function getComplexity(sec){
    if(sec<10) return {text:'Faible',color:'red'};
    if(sec<3600) return {text:'Moyen',color:'yellow'};
    if(sec<86400*7) return {text:'Fort',color:'#88ff88'};
    return {text:'Ultra',color:'#0f0'};
}

pwdInput.addEventListener('input',()=>{
    const pwd=pwdInput.value;
    const sec=estimateTime(pwd);
    timerEl.textContent="Temps estimé: "+formatTime(sec);
    barEl.style.width=Math.min(pwd.length*10,100)+'%';
    const comp=getComplexity(sec);
    complexityEl.textContent="Complexité: "+comp.text;
    complexityEl.style.color=comp.color;
});

const alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,width,height);
    ctx.font=fontSize+"px monospace";
    ctx.fillStyle="#0f0";
    for(let i=0;i<drops.length;i++){
        const text=alphabet[Math.floor(Math.random()*alphabet.length)];
        ctx.fillText(text,i*fontSize,drops[i]*fontSize);
        drops[i]++;
        if(drops[i]*fontSize>height || Math.random()>0.97) drops[i]=0;
    }
    requestAnimationFrame(drawMatrix);
}
drawMatrix();
window.addEventListener('resize',()=>{
  width=canvas.width=window.innerWidth;
  height=canvas.height=window.innerHeight;
  fontSize=Math.min(20,width/50);
  columns=Math.floor(width/fontSize);
  drops=new Array(columns).fill(1);
});