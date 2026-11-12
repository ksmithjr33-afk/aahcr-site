(function(){
  // Mobile menu
  var head=document.querySelector('.site-head'),mb=document.querySelector('.menu-btn');
  if(mb){mb.addEventListener('click',function(){var o=head.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');mb.textContent=o?'Close':'Menu';});}

  // Hero video: play whichever is visible; fall back to poster on failure
  document.querySelectorAll('.hero video').forEach(function(v){
    var p=v.play(); if(p&&p.catch){p.catch(function(){});}
  });

  // Before/after sliders
  document.querySelectorAll('.ba').forEach(function(el){
    var r=el.querySelector('input[type=range]');
    function set(v){el.style.setProperty('--cut',v+'%');}
    set(r.value);
    r.addEventListener('input',function(){set(r.value);});
  });

  // Gallery lightbox
  var lb=document.querySelector('.lightbox');
  if(lb){
    var img=lb.querySelector('img'),close=lb.querySelector('button');
    document.querySelectorAll('.gallery .tile[data-full]').forEach(function(t){
      t.addEventListener('click',function(){img.src=t.getAttribute('data-full');img.alt=t.getAttribute('aria-label')||'';lb.classList.add('on');close.focus();});
    });
    function off(){lb.classList.remove('on');img.src='';}
    close.addEventListener('click',off);
    lb.addEventListener('click',function(e){if(e.target===lb)off();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')off();});
    document.querySelectorAll('.gallery video').forEach(function(v){var p=v.play();if(p&&p.catch)p.catch(function(){});});
  }

  // Map: zoom in when scrolled into view. With a Google Maps API key (window.GMAPS_KEY), swap to a 3D tilted map that flies in.
  var mw=document.querySelector('.map-wrap');
  if(mw){
    var key=window.GMAPS_KEY, gm=document.getElementById('gmap');
    if(key&&gm){
      gm.hidden=false; var ifr=mw.querySelector('iframe'); if(ifr)ifr.remove();
      var sc=document.createElement('script');
      sc.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(key)+'&v=weekly&callback=__aahcrMap&libraries=marker';
      sc.async=true; document.head.appendChild(sc);
      window.__aahcrMap=function(){
        var pos={lat:33.1817,lng:-96.9078};
        var map=new google.maps.Map(gm,{center:pos,zoom:12,tilt:0,heading:0,mapId:window.GMAPS_MAP_ID||'DEMO_MAP_ID',disableDefaultUI:true,gestureHandling:'cooperative'});
        new google.maps.marker.AdvancedMarkerElement({map:map,position:pos,title:'Advanced Auto Hail & Collision Repair'});
        var done=false;
        new IntersectionObserver(function(e){
          if(e[0].isIntersecting&&!done){done=true;
            var z=12,t=0,h=0,step=function(){z=Math.min(17.5,z+.12);t=Math.min(65,t+1.6);h=Math.min(30,h+.7);map.moveCamera({center:pos,zoom:z,tilt:t,heading:h});if(z<17.5)requestAnimationFrame(step);};
            requestAnimationFrame(step);}
        },{threshold:.4}).observe(mw);
      };
    }else{
      new IntersectionObserver(function(e){if(e[0].isIntersecting){mw.classList.add('in');}},{threshold:.35}).observe(mw);
    }
  }

  // Reveal on scroll
  var rv=document.querySelectorAll('.rv');
  if(rv.length&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15,rootMargin:'0px 0px -5% 0px'});
    rv.forEach(function(el){io.observe(el);});
  } else { rv.forEach(function(el){el.classList.add('in');}); }

  // Estimate form (preview behaviour; in GoHighLevel this block is replaced by the GHL form)
  document.querySelectorAll('form.est').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var done=f.parentElement.querySelector('.form-done');
      var name=f.querySelector('[name=name]');
      if(done){done.querySelector('.who').textContent=name&&name.value?name.value.split(' ')[0]:'';f.style.display='none';done.classList.add('on');done.scrollIntoView({block:'center'});}
    });
  });
})();
