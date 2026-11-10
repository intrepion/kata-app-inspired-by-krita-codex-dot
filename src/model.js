export const WIDTH=1200, HEIGHT=900, MAX_LAYERS=8, MAX_FILE_BYTES=24*1024*1024;
export const PRESETS=[
 {id:'round',name:'Studio round',detail:'Clean, expressive marks',size:24,opacity:100},
 {id:'pencil',name:'Graphite',detail:'Fine, lightly textured',size:5,opacity:82},
 {id:'chalk',name:'Dry pastel',detail:'Broken edges & grain',size:42,opacity:85},
 {id:'wash',name:'Soft wash',detail:'Airy, translucent color',size:110,opacity:28},
 {id:'flat',name:'Flat bristle',detail:'Broad painterly strokes',size:56,opacity:85}
];
export const PALETTES={Meadow:['#263b37','#496255','#7c9476','#afbd91','#dce1bb','#eee3c6','#e9bf81','#cf845c','#9d584d','#6e5962','#8a9b9e','#c8d4cd'],Dusk:['#24273d','#454561','#726781','#a38d9b','#c8afad','#ead1bb','#f0b886','#de8b67','#ae555d','#714653','#3d595e','#80a09a']};
export const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export const safeName=v=>String(v??'Untitled study').trim().slice(0,80)||'Untitled study';
export function safeFilename(v){return safeName(v).replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-|-$/g,'').toLowerCase()||'mosslight';}
export function pressureSize(size,pressure,enabled,pointerType){return size*(enabled&&pointerType==='pen' ? .2+.8*clamp(Number.isFinite(pressure)?pressure:.5,0,1):1);}
export function interpolate(a,b,spacing){const distance=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(distance/Math.max(.5,spacing)));return Array.from({length:steps},(_,i)=>({x:a.x+(b.x-a.x)*(i+1)/steps,y:a.y+(b.y-a.y)*(i+1)/steps,pressure:a.pressure+(b.pressure-a.pressure)*(i+1)/steps}));}
export function validateProject(data){
 if(!data||data.format!=='kata-mosslight'||data.version!==1)throw Error('This is not a supported Mosslight project.');
 if(data.width!==WIDTH||data.height!==HEIGHT)throw Error('This version supports 1200 × 900 projects only.');
 if(!Array.isArray(data.layers)||data.layers.length<1||data.layers.length>MAX_LAYERS)throw Error('Projects must contain 1–8 layers.');
 const ids=new Set();
 const layers=data.layers.map((l,i)=>{
  if(!l||typeof l.id!=='string'||ids.has(l.id))throw Error('Invalid or duplicate layer ID.');ids.add(l.id);
  if(typeof l.image!=='string'||!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(l.image)||l.image.length>MAX_FILE_BYTES)throw Error('Every layer must be a valid embedded PNG.');
  if(typeof l.visible!=='boolean'||!Number.isFinite(l.opacity)||l.opacity<0||l.opacity>1||!['source-over','multiply','screen'].includes(l.blend))throw Error('Invalid layer settings.');
  return {id:l.id,name:safeName(l.name||`Layer ${i+1}`),visible:l.visible,opacity:l.opacity,blend:l.blend,image:l.image};
 });
 return {format:'kata-mosslight',version:1,name:safeName(data.name),width:WIDTH,height:HEIGHT,active:ids.has(data.active)?data.active:layers.at(-1).id,layers};
}
export class History {
 constructor(limit=20){this.limit=limit;this.past=[];this.future=[];}
 record(snapshot){this.past.push(snapshot);if(this.past.length>this.limit)this.past.shift();this.future=[];}
 undo(current){if(!this.past.length)return null;this.future.push(current);return this.past.pop();}
 redo(current){if(!this.future.length)return null;this.past.push(current);return this.future.pop();}
 clear(){this.past=[];this.future=[];}
}
