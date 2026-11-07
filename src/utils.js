export const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
export const num = value => Number(value).toLocaleString('en-IN',{maximumFractionDigits:0});
export const money = value => value < 0 ? '−'+money(-value) : value >= 10000000 ? '₹'+(value/10000000).toFixed(2)+'Cr' : value>=100000?'₹'+(value/100000).toFixed(1)+'L':'₹'+num(value);
export const tag=(text,kind='neutral')=>`<span class="tag ${kind}">${esc(text)}</span>`;
export const external=(url,text)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)} <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>`;
export function download(name,value,type='application/json'){const u=URL.createObjectURL(new Blob([value],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500);}
export const pageHeader=(title,description,actions='')=>`<header class="page-header"><div><h1>${title}</h1><p>${description}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</header>`;
