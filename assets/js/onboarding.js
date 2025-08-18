
document.getElementById('regForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const rec = Object.fromEntries(fd.entries());
  rec.joined = new Date().toISOString();
  const users = JSON.parse(localStorage.getItem('crav_users')||'[]');
  users.push(rec);
  localStorage.setItem('crav_users', JSON.stringify(users));
  document.getElementById('regOK').style.display='block';
  logEvent('user:register', rec);
});

window.submitMood = function(){
  const mood = document.getElementById('mood').value;
  const fb = JSON.parse(localStorage.getItem('crav_feedback')||'[]');
  fb.push({mood, t: Date.now(), validated: ['Excited','Focused'].includes(mood)});
  localStorage.setItem('crav_feedback', JSON.stringify(fb));
  document.getElementById('moodOK').style.display='block';
  logEvent('user:mood', {mood});
}
