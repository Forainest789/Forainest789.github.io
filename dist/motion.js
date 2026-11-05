/* Scroll and pointer transforms are separate from the actual 3D object pose. */
(() => {
 const scene=document.querySelector('[data-scene="hero"]');
 const stage=scene?.querySelector('.neural-stage');
 const artwork=stage?.querySelector('.neural-object');
 if(!artwork) return;
 const layer=document.createElement('div');layer.className='neural-motion';artwork.before(layer);
 const position=document.createElement('div');position.className='neural-position';layer.append(position);position.append(artwork);
 const canvas=document.createElement('canvas');canvas.className='neural-canvas';canvas.setAttribute('aria-hidden','true');position.append(canvas);
 let renderer;
 try {renderer=new window.NeuralField(canvas);renderer.resize();renderer.render(0);artwork.hidden=true;}
 catch {canvas.remove();return;}
 const button=document.createElement('button');button.className='motion-toggle';button.type='button';scene.querySelector('figcaption').append(button);
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 let visible=false,paused=false,frame=0,scrollFrame=0,last=0,yaw=0;
 const resetPointer=()=>{scene.style.setProperty('--scene-x','0px');scene.style.setProperty('--scene-y','0px');};
 const enabled=()=>visible&&!paused&&!reduceMotion.matches&&!document.hidden;
 const draw=time=>{
  frame=0;if(!enabled())return;
  if(last)yaw+=(Math.min(time-last,100)/1000)*(Math.PI*2/90);
  last=time;renderer.render(yaw);frame=requestAnimationFrame(draw);
 };
 const updateScroll=()=>{
  scrollFrame=0;if(paused||reduceMotion.matches)return;
  const rect=scene.getBoundingClientRect(),progress=Math.min(1,Math.max(0,-rect.top/rect.height));
  layer.style.transform=`translate3d(0,${-32*progress}px,0) scale(${1+.08*progress})`;
 };
 const scheduleScroll=()=>{if(!scrollFrame&&enabled())scrollFrame=requestAnimationFrame(updateScroll);};
 const sync=()=>{
  const running=enabled();stage.dataset.motion=running?'running':'paused';
  button.hidden=reduceMotion.matches;button.textContent=paused?'Resume motion':'Pause motion';button.setAttribute('aria-pressed',String(paused));
  if(running){if(!frame){last=0;frame=requestAnimationFrame(draw);}scheduleScroll();}
  else{cancelAnimationFrame(frame);frame=0;last=0;cancelAnimationFrame(scrollFrame);scrollFrame=0;}
  if(reduceMotion.matches||paused){resetPointer();layer.style.transform='none';}
  if(reduceMotion.matches){yaw=0;renderer.render(0);}
 };
 scene.addEventListener('pointermove',event=>{
  if(reduceMotion.matches||paused||!finePointer.matches||event.pointerType==='touch')return;
  const rect=scene.getBoundingClientRect();scene.style.setProperty('--scene-x',`${((event.clientX-rect.left)/rect.width-.5)*18}px`);scene.style.setProperty('--scene-y',`${((event.clientY-rect.top)/rect.height-.5)*12}px`);
 });
 scene.addEventListener('pointerleave',resetPointer);
 button.addEventListener('click',()=>{paused=!paused;sync();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(stage);
 new ResizeObserver(()=>{renderer.resize();renderer.render(yaw);scheduleScroll();}).observe(position);
 window.addEventListener('scroll',scheduleScroll,{passive:true});
 document.addEventListener('visibilitychange',sync);reduceMotion.addEventListener('change',sync);finePointer.addEventListener('change',resetPointer);sync();
})();
