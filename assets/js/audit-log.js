
window.__audit = window.__audit || [];
function logEvent(evt, meta={}){
  const rec = { t: new Date().toISOString(), evt, ...meta };
  window.__audit.push(rec);
  try{
    const saved = JSON.parse(localStorage.getItem('crav_audit')||'[]');
    saved.push(rec);
    localStorage.setItem('crav_audit', JSON.stringify(saved));
  }catch(e){}
}
function loadAudit(){
  const box = document.getElementById('auditLog');
  if(!box) return;
  const saved = JSON.parse(localStorage.getItem('crav_audit')||'[]');
  box.innerHTML = saved.slice(-200).reverse().map(r => `<div>[${r.t}] ${r.evt}</div>`).join('');
}
function clearAudit(){ localStorage.removeItem('crav_audit'); loadAudit(); }
document.addEventListener('DOMContentLoaded', loadAudit);
