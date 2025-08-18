
document.addEventListener('DOMContentLoaded', ()=>{
  const tbody = document.querySelector('#contributors tbody');
  const users = JSON.parse(localStorage.getItem('crav_users')||'[]');
  tbody.innerHTML = users.map(u => `<tr><td>${u.name||''}</td><td>${u.goal||'—'}</td><td>${Math.floor(Math.random()*40)+60}</td><td>${(u.joined||'').split('T')[0]}</td></tr>`).join('');
  logEvent('dashboard:load', {rows: users.length});
});
