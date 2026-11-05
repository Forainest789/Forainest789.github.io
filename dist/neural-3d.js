/* Dependency-free 3D filament renderer. Geometry is rotated in object space,
 * projected through a perspective camera and drawn back-to-front on Canvas. */
window.NeuralField = class NeuralField {
 constructor(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  if (!this.ctx) throw new Error('Canvas unavailable');
  this.fibres = [];
  const count = 80, samples = 144;
  for (let j=0;j<count;j++) {
   const v=j/count*Math.PI*2, points=[];
   for (let i=0;i<=samples;i++) {
    const u=i/samples*Math.PI*2, r=211+72*Math.cos(v);
    points.push([r*Math.cos(u),r*Math.sin(u),94*Math.sin(v)+37*Math.sin(3*u+v)]);
   }
   this.fibres.push({points,hue:206+68*j/(count-1)});
  }
 }
 resize() {
  const rect=this.canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2);
  const w=Math.max(1,Math.round(rect.width*dpr)), h=Math.max(1,Math.round(rect.height*dpr));
  if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
 }
 render(yaw=0) {
  const ctx=this.ctx, w=this.canvas.width, h=this.canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.save();ctx.scale(w/920,h/760);
  const glow=ctx.createRadialGradient(460,370,30,460,370,310);
  glow.addColorStop(0,'rgba(141,184,255,.16)');glow.addColorStop(1,'rgba(141,184,255,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,920,760);
  const c=Math.cos(yaw),s=Math.sin(yaw),pieces=[];
  for(const fibre of this.fibres){
   const projected=fibre.points.map(([x,y,z])=>{
    // True yaw around the object's vertical axis, then a fixed camera tilt.
    const xx=x*c+z*s,zz=-x*s+z*c;
    const yy=y*.54-zz*.84,depth=y*.84+zz*.54;
    const px=xx*.92-yy*.39,py=xx*.39+yy*.92;
    const perspective=1050/(1050-depth);
    // Leave room for the tallest silhouette during a full 3D turn and scroll zoom.
    return [460+px*perspective*.86,370+py*perspective*.86,depth];
   });
   for(let i=0;i<144;i+=12){
    const pts=projected.slice(i,i+13);
    pieces.push({pts,depth:pts.reduce((sum,p)=>sum+p[2],0)/pts.length,hue:fibre.hue});
   }
  }
  pieces.sort((a,b)=>a.depth-b.depth);
  for(const piece of pieces){
   const near=Math.min(1,Math.max(0,(piece.depth+310)/620));
   ctx.strokeStyle=`hsla(${piece.hue},85%,${66-near*9}%,${.16+near*.62})`;
   ctx.lineWidth=.65+near*.55;
   ctx.beginPath();piece.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
  }
  ctx.restore();
 }
};
