(function(){
  try{
    var stored = localStorage.getItem('site-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var useDark = stored === 'dark' || (stored === null && prefersDark);
    if(useDark) document.documentElement.classList.add('dark');

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './dark-theme.css';
    document.head.appendChild(link);

    function setTheme(dark){
      if(dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('site-theme','dark');
        btn.textContent = '🌙';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('site-theme','light');
        btn.textContent = '☀️';
      }
    }

    var btn = document.createElement('button');
    btn.setAttribute('aria-label','Toggle dark theme');
    btn.style.cssText = 'position:fixed;top:50%;right:1rem;transform:translateY(-50%);z-index:9999;padding:1rem 0.8rem;border-radius:8px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);cursor:pointer;font-size:2rem;width:60px;height:60px;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease';
    btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '☀️';
    btn.onmouseover = function(){ this.style.transform = 'translateY(-50%) scale(1.1)'; };
    btn.onmouseout = function(){ this.style.transform = 'translateY(-50%)'; };
    btn.onclick = function(){ setTheme(!document.documentElement.classList.contains('dark')); };

    if(document.body) document.body.appendChild(btn);
    else document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(btn); });
  }catch(e){console.error('dark-theme error',e)}
})();
