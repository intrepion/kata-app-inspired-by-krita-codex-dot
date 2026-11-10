import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist/src',{recursive:true});
for(const file of ['index.html','styles.css','favicon.svg','app.json','LICENSE'])await copyFile(file,`dist/${file}`);
await cp('src','dist/src',{recursive:true});
await cp('docs/screenshots','dist/docs/screenshots',{recursive:true});
console.log('Built static studio in dist/. No dependencies or network services.');
