import {WIDTH,HEIGHT,interpolate,pressureSize} from './model.js';
export const canvas=()=>Object.assign(document.createElement('canvas'),{width:WIDTH,height:HEIGHT});
export function createLayer(name){return {id:crypto.randomUUID(),name,visible:true,opacity:1,blend:'source-over',canvas:canvas()};}
export function composite(target,layers){const c=target.getContext('2d');c.clearRect(0,0,WIDTH,HEIGHT);for(const l of layers){if(!l.visible)continue;c.globalAlpha=l.opacity;c.globalCompositeOperation=l.blend;c.drawImage(l.canvas,0,0);}c.globalAlpha=1;c.globalCompositeOperation='source-over';}
export function stamp(ctx,p,settings){
 const size=pressureSize(settings.size,p.pressure,settings.pressure,settings.pointerType),r=size/2;
 ctx.save();ctx.globalAlpha=settings.opacity/100;ctx.globalCompositeOperation=settings.tool==='eraser'?'destination-out':'source-over';ctx.fillStyle=settings.color;
 if(settings.preset==='wash'&&settings.tool!=='eraser'){
  const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,settings.color+'35');g.addColorStop(.35,settings.color+'20');g.addColorStop(1,settings.color+'00');ctx.fillStyle=g;ctx.fillRect(p.x-r,p.y-r,size,size);
 }else if(['chalk','pencil'].includes(settings.preset)&&settings.tool!=='eraser'){
  const count=settings.preset==='pencil'?12:32;ctx.globalAlpha*=.45;
  for(let i=0;i<count;i++){const angle=Math.random()*Math.PI*2,d=Math.sqrt(Math.random())*r;ctx.beginPath();ctx.arc(p.x+Math.cos(angle)*d,p.y+Math.sin(angle)*d,Math.max(.35,size*.045),0,Math.PI*2);ctx.fill();}
 }else if(settings.preset==='flat'&&settings.tool!=='eraser'){
  ctx.translate(p.x,p.y);ctx.rotate(-.55);ctx.fillRect(-r,-size*.17,size,size*.34);
 }else{ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();}
 ctx.restore();
}
export function stroke(ctx,a,b,s){for(const p of interpolate(a,b,Math.max(.5,s.size*(s.preset==='wash'?.08:.1)))){stamp(ctx,p,s);if(s.mirror)stamp(ctx,{...p,x:WIDTH-p.x},s);}}
export function serialize(state){return {format:'kata-mosslight',version:1,width:WIDTH,height:HEIGHT,name:state.name,active:state.active,layers:state.layers.map(({canvas,...l})=>({...l,image:canvas.toDataURL('image/png')}))};}
export async function hydrate(data){const layers=await Promise.all(data.layers.map(async({image,...l})=>{const img=new Image();img.src=image;await img.decode();if(img.naturalWidth!==WIDTH||img.naturalHeight!==HEIGHT)throw Error('Layer image dimensions do not match this canvas.');const c=canvas();c.getContext('2d').drawImage(img,0,0);return {...l,canvas:c};}));return {name:data.name,active:data.active,layers};}
