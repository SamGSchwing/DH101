(function(){
  try{
    var stored = localStorage.getItem('site-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var useDark = stored === 'dark' || (stored === null && prefersDark);
    if(useDark) document.documentElement.classList.add('dark');

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/dark-theme.css';
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
    btn.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;padding:0.35rem 0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:var(--text);cursor:pointer;font-size:1.05rem';
    btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '☀️';
    btn.onclick = function(){ setTheme(!document.documentElement.classList.contains('dark')); };

    if(document.body) document.body.appendChild(btn);
    else document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(btn); });

    // Week selector menu (accessible)
    function createWeekMenu(){
      try{
        var container = document.createElement('div');
        container.className = 'week-menu-container';
        container.setAttribute('role','navigation');
        container.setAttribute('aria-label','Week selector');
        container.style.cssText = 'position:fixed;top:1rem;left:1rem;z-index:9999;padding:0.35rem 0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:var(--text);font-size:0.95rem;display:flex;gap:0.5rem;align-items:center';

        var select = document.createElement('select');
        select.setAttribute('aria-label','Select week');
        select.style.cssText = 'padding:0.25rem 0.4rem;border-radius:4px;border:1px solid var(--border);background:transparent;color:var(--text)';

        for(var i=1;i<=13;i++){
          var opt = document.createElement('option');
          var num = i<10? '0'+i : ''+i;
          opt.value = 'week'+num;
          opt.textContent = 'Week '+i;
          select.appendChild(opt);
        }

        var go = document.createElement('button');
        go.textContent = 'Go';
        go.setAttribute('aria-label','Open selected week');
        go.style.cssText = 'padding:0.35rem 0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:var(--text);cursor:pointer';

        go.onclick = async function(){
          var val = select.value; // e.g. week01
          var base = 'pages/'+val;
          var candidates = [base, base + '.html', base + '.md'];
          for(var i=0;i<candidates.length;i++){
            try{
              var res = await fetch(candidates[i], {method:'HEAD'});
              if(res && res.ok){ window.location.href = candidates[i]; return; }
            }catch(e){}
          }
          // Fallback: navigate to .html version
          window.location.href = base + '.html';
        };

        container.appendChild(select);
        container.appendChild(go);

        if(document.body) document.body.appendChild(container);
        else document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(container); });
      }catch(e){console.error('week menu error',e)}
    }

    createWeekMenu();
  }catch(e){console.error('dark-theme error',e)}
})();
