
document.addEventListener('DOMContentLoaded', () =>{
  const users = JSON.parse(localStorage.getItem('crav_users')||'[]');
  const feedback = JSON.parse(localStorage.getItem('crav_feedback')||'[]');
  const byMood = f => feedback.filter(x=>x.mood===f).length;
  const sentiment = users.length? Math.min(100, 50 + byMood('Excited')*5 - byMood('Overwhelmed')*3): 0;
  const fbValid = feedback.filter(x=>x.validated).length;
  const el = (id, v) => { const n=document.getElementById(id); if(n) n.textContent=v; }
  el('kpi-users', users.length);
  el('kpi-sentiment', sentiment + '%');
  el('kpi-feedback', fbValid);
  logEvent('telemetry:home_load', {users: users.length, sentiment});
});
