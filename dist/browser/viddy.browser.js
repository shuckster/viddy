/*
 * viddy
 * v1.3.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var libViddy=(()=>{var Y=Object.defineProperty,st=Object.defineProperties,it=Object.getOwnPropertyDescriptor,at=Object.getOwnPropertyDescriptors,ct=Object.getOwnPropertyNames,K=Object.getOwnPropertySymbols;var oe=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var Oe=(e,t,n)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,v=(e,t)=>{for(var n in t||(t={}))oe.call(t,n)&&Oe(e,n,t[n]);if(K)for(var n of K(t))ge.call(t,n)&&Oe(e,n,t[n]);return e},M=(e,t)=>st(e,at(t));var P=(e,t)=>{var n={};for(var o in e)oe.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&K)for(var o of K(e))t.indexOf(o)<0&&ge.call(e,o)&&(n[o]=e[o]);return n};var ut=(e,t)=>{for(var n in t)Y(e,n,{get:t[n],enumerable:!0})},lt=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of ct(t))!oe.call(e,r)&&r!==n&&Y(e,r,{get:()=>t[r],enumerable:!(o=it(t,r))||o.enumerable});return e};var mt=e=>lt(Y({},"__esModule",{value:!0}),e);var $t={};ut($t,{ViddyError:()=>_,qsArray:()=>C,serialize:()=>Lt,unserialize:()=>At,viddy:()=>Ze,viddyWell:()=>Bt});var ft=Object.defineProperty;var pt=(e,t)=>{for(var n in t)ft(e,n,{get:t[n],enumerable:!0})},re={};pt(re,{instanceOf:()=>se,isArguments:()=>be,isArray:()=>ht,isDate:()=>yt,isFunction:()=>Ot,isNumber:()=>vt,isObject:()=>xe,isPojo:()=>xt,isRegExp:()=>bt,isString:()=>gt});var ve=Object.prototype,dt=ve.toString,Z=e=>t=>typeof t===e,se=e=>t=>t instanceof e,{isArray:ht}=Array,be=e=>dt.call(e)==="[object Arguments]",yt=e=>se(Date)(e)&&!isNaN(e),Ot=Z("function"),gt=Z("string"),vt=e=>e===e&&Z("number")(e),xe=e=>e!==null&&Z("object")(e),bt=se(RegExp),xt=e=>e===null||!xe(e)||be(e)?!1:Object.getPrototypeOf(e)===ve,{isArray:p,isDate:qt,isFunction:j,isNumber:N}=re,{isPojo:h,isRegExp:I,isString:c,instanceOf:Vt}=re;function f(e){return(...t)=>ie(...t)(e)}var ie=(...e)=>{let t;return n=>e.find(o=>{let r=o(n),{matched:s,value:a}=r||{};return[s,a].every(j)?s(n)&&(t=a(n),!0):r&&(t=r)})&&t},d=e=>t=>({matched:()=>!0,value:()=>j(e)?e(t):e}),i=e=>t=>n=>({matched:()=>F(e,n,o=>n=o),value:()=>j(t)?c(n)&&I(e)?t(...wt(n.match(e))):t(n):t}),wt=e=>{let{groups:t}=e;return t?[t,e]:[e]},F=(e,t,n)=>h(e)?Object.keys(e).every(o=>F(e[o],t==null?void 0:t[o],n)):p(e)?p(t)?e.length===t.length&&e.every((o,r)=>F(o,t==null?void 0:t[r],n)):e.some(o=>F(o,t,n)):j(e)?e(t,n):c(t)&&I(e)?e.test(t):e===t||[e,t].every(Number.isNaN),V=(...e)=>(t,n)=>e.length===0||(j(e[0])?e[0](t):F(e[0],t,n))?(n(t),!0):!1,z=e=>(t,n)=>!F(e,t,n),L=(...e)=>(t,n)=>e.flat().some(o=>F(o,t,n)),w=(...e)=>(t,n)=>e.flat().every(o=>F(o,t,n)),ae=e=>e!==e||!e&&e!==0&&e!==!1||p(e)&&!e.length||h(e)&&!Object.keys(e).length,we=e=>!ae(e);var Ee=e=>Et(t=>t.includes(e));var Et=e=>t=>(p(t)||c(t))&&e(t);var ce=e=>c(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function ee(e,t){let[n,o]=Mt(e,t);return[(...s)=>(o(),n(...s)),o]}function Mt(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var Me=(...e)=>t=>e.reduceRight((n,o)=>o(n),t);function ue(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}var Te=(e,t)=>Object.entries(e).reduce((n,[o,r])=>(n[o]=t(r,o),n),{}),R=e=>e,A=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>A(),chain:()=>A(),fork:e=>e(),orElse:e=>e(),ap:()=>A()});A.of=()=>A();var D=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>D(t(e)),chain:t=>t(e),fork:(t,n)=>n(e),orElse:()=>D(e),ap:t=>t.map(e)});D.of=e=>D(e);var Tt=(e=t=>t!=null)=>{let t=n=>e(n)?D(n):A();return t.of=n=>t(n),t},Se=e=>{try{return D(e())}catch(t){return A()}},Gt=Tt(),Ie=e=>()=>D(e);var Pe=e=>e instanceof HTMLElement,Fe=e=>e.offsetParent!==null,C=e=>Se(()=>document.querySelectorAll(e)).map(Array.from).orElse(Ie([])).valueOf();function Ne(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function ke(e){let{top:t,left:n,width:o,height:r}=e.getBoundingClientRect(),s=o/2,a=r/2,u=n+s,y=t+a;return{el:e,x:u,y,halfWidth:s,halfHeight:a}}function je(e,t){let n=t.x-e.x,o=t.y-e.y,r=Ce(n,o,e.x,e.y,e.halfWidth,e.halfHeight),s=Ce(-n,-o,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(r.x-s.x,r.y-s.y)}function Ce(e,t,n,o,r,s){return Math.abs(t/e)<s/r?{x:n+(e>0?r:-r),y:o+t*r/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:o+(t>0?s:-s)}}function Le(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var Ae=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function G(e){if(!(e instanceof Element))return;let t=[];for(;e.nodeType===Node.ELEMENT_NODE;){let n=e.nodeName.toLowerCase();if(e.id){t.unshift(`${n}#${e.id}`);break}let o=e,r=1;for(;o=o.previousElementSibling;)o.nodeName.toLowerCase()===n&&r++;let s=n;r>1&&(s+=":nth-of-type("+r+")"),t.unshift(s),e=e.parentNode}return t.join(" > ")}function le(e){return f(e)(i({val:j})(t=>t.val()),i({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,o)=>o.selected?n.concat(o.value):n,[])),i({type:"checkbox",value:we})(t=>t.checked?t.value:""),i({type:"checkbox"})(t=>t.checked?"checked":""),i({contenteditable:!0})(t=>t.innerHTML),d(t=>t.value))}function me(e,t){let n=t?new MutationObserver(r):new MutationObserver(o);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function o(s){setTimeout(()=>e(s),1)}function r(s){let a=C(t);for(let u of s){let y=u.target;if(a.some(T=>y.contains(T))){setTimeout(()=>e(),1);break}}}}var De=(e,t)=>{let[n]=ee(32,t),o=C(e).map(r=>(r.addEventListener("change",n,{passive:!0}),()=>r.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n));return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>o.forEach(r=>r())};var We="body *",_e=["button","submit","reset","file"],Be=_e.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),St=_e.map(e=>`input[type=${e}]`).concat("a","button").join(", "),$e=5,It=500,Ct=w(p,ae),m=L(c,I),Pt=L(m,h),Ft=L(w(h,{pattern:m}),w(h,{selector:c})),He=w(h,{pattern:m,selector:z(c)}),qe=w(h,{pattern:z(m),selector:z(c)}),Ve=w(h,{selector:z(c),pickParent:z(c)}),fe="|<-REGEXP::FLAGS->|",Nt=w(c,Ee(fe)),kt=e=>[e.source,e.flags].join(fe),jt=e=>new RegExp(...e.split(fe)),Lt=(...e)=>JSON.stringify(e,(t,n)=>f(n)(i(I)(kt),d(n))),At=e=>JSON.parse(e,(t,n)=>f(n)(i(Nt)(jt),d(n))),_=class extends Error{constructor(t,n,{message:o="could not resolve query to any elements"}){let r=u=>`/${u.source}/${u.flags}`,s=(u,y)=>I(y)?r(y):y,a=JSON.stringify(n,s,2);super(`${o}

viddy.${t}(...${a})
`),this.name="ViddyError"}};var k=(...e)=>f(e)(i([m])(de),i([m,h])(Wt),i([h])(E),d([]));function Dt(e){return(...t)=>f(t)(i([m])(([n])=>E([{selector:e,near:n}])),i([m,Ve])(([n,o])=>E([{selector:e,near:M(v({},o),{pattern:n})}])),i([He])(r=>{var[s]=r,a=s,{pattern:n}=a,o=P(a,["pattern"]);return E([{selector:e,near:M(v({},o),{pattern:n})}])}),i([{selector:c}])(r=>{var[s]=r,a=s,{selector:n}=a,o=P(a,["selector"]);return E([M(v({},o),{selector:n})])}),d([]))}function Rt(e){return(...t)=>Me(n=>n.filter(ie(i(L(C(e)))(!0))))(f(t)(i([m])(([n])=>E([{containedBy:{selector:e},pattern:n}])),i([m,Ve])(([n,o])=>E([M(v({},o),{containedBy:{selector:e},pattern:n})])),i([He])(r=>{var[s]=r,a=s,{pattern:n}=a,o=P(a,["pattern"]);return E([M(v({},o),{containedBy:{selector:e},pattern:n})])}),i([qe])(([n])=>E([M(v({},n),{containedBy:{selector:e}})])),i([{selector:c}])(r=>{var[s]=r,a=s,{selector:n}=a,o=P(a,["selector"]);return E([M(v({},o),{selector:n})])}),d(E([{selector:e}]))))}var ne=Dt(Be),pe=Rt(St);function de([e]){let t=f(e)(i(I)(Ae),d(Le)),n=C(We).filter(Pe).filter(Fe).filter(t);return n.filter(o=>n.filter(s=>s!==o).every(s=>!o.contains(s)))}function Wt([e,t]){return te(de([e]),t)}function E([e]){return f(e)(i({selector:c})(o=>{var r=o,{selector:t}=r,n=P(r,["selector"]);return te(C(t),n)}),i({pattern:m})(o=>{var r=o,{pattern:t}=r,n=P(r,["pattern"]);return te(de([t]),n)}),d(()=>te(C(We),e)))}var _t=e=>v(v({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>M(v({},t),{[n]:f(e[n])(i(Pt)(k),i(p)(o=>k(...o)),d(null))}),{}));function te(e,t={}){let $=_t(t),{near:n,containedBy:o,pickParent:r}=$,s=P($,["near","containedBy","pickParent"]),a=Object.keys(s).length>0,u=ue(ke),y=ue(Ne),T=({depth:l},b,[g])=>l===g.depth,U=p(o)?l=>{let b=l.map(y),g=x=>H=>H.map((O,q)=>({contained:O.contains(x),depth:q,el:x})).filter(({contained:O})=>O)[0];return x=>b.map(g(x))[0]}:()=>l=>({depth:0,el:l}),J=a?l=>{let{above:b,below:g,leftOf:x,rightOf:H}=Te(l,O=>p(O)?O.map(u):O);return O=>{let q=S=>S.filter(rt=>rt.el!==O),X=u(O),et=!p(b)||q(b).every(S=>S.y>X.y),tt=!p(g)||q(g).every(S=>S.y<X.y),nt=!p(x)||q(x).every(S=>S.x>X.x),ot=!p(H)||q(H).every(S=>S.x<X.x);return et&&tt&&nt&&ot}}:()=>()=>!0,Q=p(n)?l=>{let b=l.map(u);return g=>{let x=b.filter(O=>O.el!==g),H=u(g);return x.map(O=>({from:g,distance:je(O,H)}))[0]}}:()=>l=>({distance:0,from:l}),B=c(r)?l=>{let b=C(l);return g=>y(g).find(x=>b.includes(x))}:()=>R;return e.map(U(o)).filter(Boolean).sort(ce("depth")).filter(T).map(({el:l})=>l).filter(J(s)).map(Q(n)).filter(Boolean).sort(ce("distance")).map(({from:l})=>l).map(B(r)).filter(Boolean)}function ze(...e){return!!k(...e)[0]}function Ue(...e){return k(...e).map(G)}function Je(...e){return ne(...e).map(le)}function he(...e){return k(...e).map(t=>t.innerText)}function Qe(e,...t){let n=f(t)(i(Ct)(()=>[e]),i([p])(([o])=>o),i([m])(([o])=>({pattern:o})),i([qe])(([o])=>[M(v({},o),{pattern:e})]),d(()=>t));return he(...n).map(o=>f(e)(i(I)(r=>{var a;let s=(a=o.match(r))!=null?a:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),i(c)(o),d(null))).filter(L(c,p))}function ye(e="baseWaitFor",t,...n){let o=f(n)(i([{timeoutInMs:V(N)}])(R),i([m,{timeoutInMs:V(N)}])(R),i([m,m,{timeoutInMs:V(N)}])(R),d($e*1e3)),r=new _(e,n,{message:`timed out after ${o}ms trying to resolve query`});return new Promise((s,a)=>{let u=$=>(s($),J()),y=()=>(a(r),J()),T=t({done:u,args:n}),U=setTimeout(y,o),J=()=>{clearTimeout(U),B(),Q()},Q=De(Be,T),B=me(T);T()})}function Ge(...e){return ye("waitFor",t,...e);function t({args:n,done:o}){return()=>{let r=k(...n);r.length&&o(r.map(G))}}}function Xe(...e){return ye("waitForCta",t,...e);function t({args:n,done:o}){return()=>{let r=pe(...n);r.length&&o(r.map(G))}}}function Ke(e,...t){if(!t.length)throw new _("waitForValue",t,{message:"no query specified"});return ye("waitForValue",n,e,...t);function n({args:o,done:r}){return()=>{let s=ne(...o.slice(1)).map(a=>({el:a,value:le(a)})).filter(({value:a})=>f([e,a])(i([I,c])(([u])=>u.test(a)),i([c,c])(([u])=>u.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);s.length&&r(s.map(G))}}}var Re=L(w(h,{withinMs:N}),w(h,{timeoutInMs:N}),w(h,{withinMs:N,timeoutInMs:N}));function Ye(...e){let t=f(e)(i([V(Re)])(R),i([m,V(Re)])(R),d({})),{withinMs:n=It}=t,{timeoutInMs:o=$e*1e3}=t,r=Math.max(o,n+16),s=new _("waitForIdle",e,{message:`timed out after ${r}ms waiting for DOM idle`}),a=f(e)(i([m])(!0),i([Ft])(!0),i([m,h])(!0),d(!1)),u=a&&Ze.selectorOf(...e);if(a&&!u)throw new _("waitForIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((y,T)=>{let U=()=>(y(),l()),Q=setTimeout(()=>(T(s),l()),r),[B,$]=ee(n,U),l=()=>{clearTimeout(Q),$(),b()},b=me(B,u);B()})}function W(e){return(...t)=>e(...t)[0]}var Ze={for:W(k),forCta:W(pe),forInput:W(ne),selectorOf:W(Ue),valueOf:W(Je),waitFor:(...e)=>Ge(...e).then(t=>t[0]),waitForCta:(...e)=>Xe(...e).then(t=>t[0]),waitForValue:(...e)=>Ke(...e).then(t=>t[0]),waitForIdle:Ye,innerText:W(he),matchText:W(Qe),hasContent:ze},Bt={for:k,forInput:ne,forCta:pe,selectorOf:Ue,valueOf:Je,waitFor:Ge,waitForCta:Xe,waitForValue:Ke,waitForIdle:Ye,innerText:he,matchText:Qe,hasContent:ze};return mt($t);})();
