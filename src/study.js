import {createLayer} from './engine.js';
export function makeStudy(){
 const sky=createLayer('01 · Evening light'),land=createLayer('02 · Rolling hills'),plants=createLayer('03 · Wildflowers'),marks=createLayer('Your brushwork');
 let seed=371;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const s=sky.canvas.getContext('2d');const bg=s.createLinearGradient(0,0,0,900);bg.addColorStop(0,'#b1c4bb');bg.addColorStop(.48,'#e6d7b2');bg.addColorStop(1,'#c6c49e');s.fillStyle=bg;s.fillRect(0,0,1200,900);
 s.fillStyle='#f5e6ba';s.beginPath();s.arc(827,229,78,0,Math.PI*2);s.fill();
 for(let i=0;i<12000;i++){s.fillStyle=rand()>.5?'#ffffff08':'#586f6005';s.fillRect(rand()*1200,rand()*900,rand()*4+1,1);}
 const l=land.canvas.getContext('2d');
 function shape(color,points){l.fillStyle=color;l.beginPath();l.moveTo(...points[0]);for(let i=1;i<points.length;i++)l.lineTo(...points[i]);l.closePath();l.fill();}
 shape('#94a99a',[[0,414],[89,377],[209,403],[345,370],[490,404],[607,379],[730,425],[858,397],[1000,364],[1200,404],[1200,900],[0,900]]);
 l.fillStyle='#758e79';l.beginPath();l.moveTo(0,460);l.bezierCurveTo(240,376,339,592,665,455);l.bezierCurveTo(899,347,1067,491,1200,463);l.lineTo(1200,900);l.lineTo(0,900);l.fill();
 l.fillStyle='#506e5d';l.beginPath();l.moveTo(0,596);l.bezierCurveTo(283,535,465,525,628,568);l.bezierCurveTo(898,658,1049,452,1200,492);l.lineTo(1200,900);l.lineTo(0,900);l.fill();
 l.fillStyle='#c8c49b';l.beginPath();l.moveTo(727,485);l.bezierCurveTo(657,532,465,571,539,637);l.bezierCurveTo(592,682,858,715,855,900);l.lineTo(641,900);l.bezierCurveTo(753,743,370,699,442,626);l.bezierCurveTo(521,552,644,537,727,485);l.fill();
 l.fillStyle='#354e41';l.beginPath();l.moveTo(0,704);l.bezierCurveTo(139,634,253,717,379,757);l.bezierCurveTo(510,795,511,843,557,900);l.lineTo(0,900);l.fill();
 l.fillStyle='#314a40';l.beginPath();l.moveTo(1200,655);l.bezierCurveTo(1064,667,922,738,914,900);l.lineTo(1200,900);l.fill();
 // Distant planted lines and scattered painterly marks.
 for(let i=0;i<2100;i++){let x=rand()*1200,y=430+rand()*470;l.globalAlpha=.06+rand()*.11;l.fillStyle=['#bfd09e','#efdfa9','#203e36'][i%3];l.save();l.translate(x,y);l.rotate(-.15);l.fillRect(0,0,rand()*25+3,rand()*3+1);l.restore();}l.globalAlpha=1;
 const p=plants.canvas.getContext('2d');
 for(let i=0;i<160;i++){const x=rand()*1200,y=760+rand()*170;if(x>430&&x<920)continue;const h=40+rand()*210;p.strokeStyle=['#afba87','#91a278','#617f5c'][i%3];p.lineWidth=1+rand()*2;p.beginPath();p.moveTo(x,y);p.quadraticCurveTo(x-10,y-h*.7,x+(rand()-.5)*80,y-h);p.stroke();}
 function flower(x,y,h,col,angle){p.save();p.translate(x,y);p.rotate(angle);p.strokeStyle='#97aa80';p.lineWidth=2.4;p.beginPath();p.moveTo(0,0);p.quadraticCurveTo(-12,-h*.5,0,-h);p.stroke();p.fillStyle='#7e996f';for(let j=1;j<4;j++){p.beginPath();p.ellipse(j%2?8:-9,-h*j/4,17,5,j%2?-.6:.6,0,Math.PI*2);p.fill();}p.translate(0,-h);p.fillStyle=col;for(let j=0;j<6;j++){p.save();p.rotate(j*Math.PI/3);p.beginPath();p.ellipse(0,-9,5.7,11,0,0,Math.PI*2);p.fill();p.restore();}p.fillStyle='#d3ab5f';p.beginPath();p.arc(0,0,5.5,0,Math.PI*2);p.fill();p.restore();}
 for(let i=0;i<44;i++){const side=i<25;const x=side?30+rand()*370:950+rand()*245;flower(x,840+rand()*75,60+rand()*230,i%5===0?'#d58d68':'#e5ddbb',(rand()-.5)*.42);}
 const layers=[sky,land,plants,marks];return {name:'The quiet hour',active:marks.id,layers};
}
export function makeBlank(){const paper=createLayer('Paper'),paint=createLayer('Your brushwork');paper.canvas.getContext('2d').fillStyle='#f5f0e3';paper.canvas.getContext('2d').fillRect(0,0,1200,900);return {name:'Untitled study',active:paint.id,layers:[paper,paint]};}
