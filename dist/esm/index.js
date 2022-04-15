/*
 * viddy
 * v1.3.4
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var ot=Object.defineProperty,st=Object.defineProperties;var it=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable;var ye=(e,t,n)=>t in e?ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,v=(e,t)=>{for(var n in t||(t={}))ge.call(t,n)&&ye(e,n,t[n]);if(K)for(var n of K(t))Oe.call(t,n)&&ye(e,n,t[n]);return e},M=(e,t)=>st(e,it(t));var C=(e,t)=>{var n={};for(var r in e)ge.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&K)for(var r of K(e))t.indexOf(r)<0&&Oe.call(e,r)&&(n[r]=e[r]);return n};var at=Object.defineProperty;var ct=(e,t)=>{for(var n in t)at(e,n,{get:t[n],enumerable:!0})},re={};ct(re,{instanceOf:()=>oe,isArguments:()=>be,isArray:()=>lt,isDate:()=>mt,isFunction:()=>ft,isNumber:()=>dt,isObject:()=>xe,isPojo:()=>yt,isRegExp:()=>ht,isString:()=>pt});var ve=Object.prototype,ut=ve.toString,Y=e=>t=>typeof t===e,oe=e=>t=>t instanceof e,{isArray:lt}=Array,be=e=>ut.call(e)==="[object Arguments]",mt=e=>oe(Date)(e)&&!isNaN(e),ft=Y("function"),pt=Y("string"),dt=e=>e===e&&Y("number")(e),xe=e=>e!==null&&Y("object")(e),ht=oe(RegExp),yt=e=>e===null||!xe(e)||be(e)?!1:Object.getPrototypeOf(e)===ve,{isArray:p,isDate:At,isFunction:k,isNumber:P}=re,{isPojo:h,isRegExp:I,isString:c,instanceOf:Dt}=re;function f(e){return(...t)=>se(...t)(e)}var se=(...e)=>{let t;return n=>e.find(r=>{let o=r(n),{matched:s,value:a}=o||{};return[s,a].every(k)?s(n)&&(t=a(n),!0):o&&(t=o)})&&t},d=e=>t=>({matched:()=>!0,value:()=>k(e)?e(t):e}),ne=e=>t=>n=>({matched:()=>j(e,n,r=>n=r),value:()=>k(t)?c(n)&&I(e)?t(...gt(n.match(e))):t(n):t}),i=(...e)=>{if(e.length===1){let[t]=e;return ne(t)}if(e.length===2){let[t,n]=e;return ne(t)(n)}if(e.length>2){let t=e.slice(-1)[0],n=e.slice(0,-1);return ne(b(n))(t)}throw new Error("expected 1 or 2 arguments")},gt=e=>{let{groups:t}=e;return t?[t,e]:[e]},j=(e,t,n)=>h(e)?Object.keys(e).every(r=>j(e[r],t==null?void 0:t[r],n)):p(e)?p(t)&&e.length===t.length&&e.every((r,o)=>j(r,t==null?void 0:t[o],n)):k(e)?e(t,n):c(t)&&I(e)?e.test(t):e===t||[e,t].every(Number.isNaN),q=(...e)=>(t,n)=>e.length===0||(k(e[0])?e[0](t):j(e[0],t,n))?(n(t),!0):!1,V=e=>(t,n)=>!j(e,t,n),L=(...e)=>(t,n)=>e.flat().some(r=>j(r,t,n)),b=(...e)=>(t,n)=>e.flat().every(r=>j(r,t,n));var ie=e=>e!==e||!e&&e!==0&&e!==!1||p(e)&&!e.length||h(e)&&!Object.keys(e).length,we=e=>!ie(e);var Ee=e=>Ot(t=>t.includes(e));var Ot=e=>(t,n)=>(p(t)||c(t))&&e(t,n);var ae=e=>c(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function Z(e,t){let[n,r]=vt(e,t);return[(...s)=>(r(),n(...s)),r]}function vt(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var Me=(...e)=>t=>e.reduceRight((n,r)=>r(n),t);function ce(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}var Te=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),R=e=>e,A=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>A(),chain:()=>A(),fork:e=>e(),orElse:e=>e(),ap:()=>A()});A.of=()=>A();var D=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>D(t(e)),chain:t=>t(e),fork:(t,n)=>n(e),orElse:()=>D(e),ap:t=>t.map(e)});D.of=e=>D(e);var bt=(e=t=>t!=null)=>{let t=n=>e(n)?D(n):A();return t.of=n=>t(n),t},Se=e=>{try{return D(e())}catch(t){return A()}},$t=bt(),Ie=e=>()=>D(e);var Pe=e=>e instanceof HTMLElement,Fe=e=>e.offsetParent!==null,F=e=>Se(()=>document.querySelectorAll(e)).map(Array.from).orElse(Ie([])).valueOf();function Ne(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function je(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,a=o/2,u=n+s,y=t+a;return{el:e,x:u,y,halfWidth:s,halfHeight:a}}function ke(e,t){let n=t.x-e.x,r=t.y-e.y,o=Ce(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=Ce(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function Ce(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function Le(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var Ae=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function G(e){if(!(e instanceof Element))return;let t=[];for(;e.nodeType===Node.ELEMENT_NODE;){let n=e.nodeName.toLowerCase();if(e.id){t.unshift(`${n}#${e.id}`);break}let r=e,o=1;for(;r=r.previousElementSibling;)r.nodeName.toLowerCase()===n&&o++;let s=n;o>1&&(s+=":nth-of-type("+o+")"),t.unshift(s),e=e.parentNode}return t.join(" > ")}function ue(e){return f(e)(i({val:k})(t=>t.val()),i({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),i({type:"checkbox",value:we})(t=>t.checked?t.value:""),i({type:"checkbox"})(t=>t.checked?"checked":""),i({contenteditable:!0})(t=>t.innerHTML),d(t=>t.value))}function le(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let a=F(t);for(let u of s){let y=u.target;if(a.some(T=>y.contains(T))){setTimeout(()=>e(),1);break}}}}var De=(e,t)=>{let[n]=Z(32,t),r=F(e).map(o=>(o.addEventListener("change",n,{passive:!0}),()=>o.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n));return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>r.forEach(o=>o())};var We="body *",_e=["button","submit","reset","file"],Be=_e.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),xt=_e.map(e=>`input[type=${e}]`).concat("a","button").join(", "),$e=5,wt=500,Et=b(p,ie),m=L(c,I),Mt=L(m,h),Tt=L(b(h,{pattern:m}),b(h,{selector:c})),He=b(h,{pattern:m,selector:V(c)}),qe=b(h,{pattern:V(m),selector:V(c)}),Ve=b(h,{selector:V(c),pickParent:V(c)}),me="|<-REGEXP::FLAGS->|",St=b(c,Ee(me)),It=e=>[e.source,e.flags].join(me),Ct=e=>new RegExp(...e.split(me)),en=(...e)=>JSON.stringify(e,(t,n)=>f(n)(i(I)(It),d(n))),tn=e=>JSON.parse(e,(t,n)=>f(n)(i(St)(Ct),d(n))),z=class extends Error{constructor(t,n,{message:r="could not resolve query to any elements"}){let o=u=>`/${u.source}/${u.flags}`,s=(u,y)=>I(y)?o(y):y,a=JSON.stringify(n,s,2);super(`${r}

viddy.${t}(...${a})
`),this.name="ViddyError"}};var N=(...e)=>f(e)(i([m])(pe),i([m,h])(Nt),i([h])(E),d([]));function Pt(e){return(...t)=>f(t)(i([m])(([n])=>E([{selector:e,near:n}])),i([m,Ve])(([n,r])=>E([{selector:e,near:M(v({},r),{pattern:n})}])),i([He])(o=>{var[s]=o,a=s,{pattern:n}=a,r=C(a,["pattern"]);return E([{selector:e,near:M(v({},r),{pattern:n})}])}),i([{selector:c}])(o=>{var[s]=o,a=s,{selector:n}=a,r=C(a,["selector"]);return E([M(v({},r),{selector:n})])}),d([]))}function Ft(e){return(...t)=>Me(n=>n.filter(se(i(L(F(e)))(!0))))(f(t)(i([m])(([n])=>E([{containedBy:{selector:e},pattern:n}])),i([m,Ve])(([n,r])=>E([M(v({},r),{containedBy:{selector:e},pattern:n})])),i([He])(o=>{var[s]=o,a=s,{pattern:n}=a,r=C(a,["pattern"]);return E([M(v({},r),{containedBy:{selector:e},pattern:n})])}),i([qe])(([n])=>E([M(v({},n),{containedBy:{selector:e}})])),i([{selector:c}])(o=>{var[s]=o,a=s,{selector:n}=a,r=C(a,["selector"]);return E([M(v({},r),{selector:n})])}),d(E([{selector:e}]))))}var te=Pt(Be),fe=Ft(xt);function pe([e]){let t=f(e)(i(I)(Ae),d(Le)),n=F(We).filter(Pe).filter(Fe).filter(t);return n.filter(r=>n.filter(s=>s!==r).every(s=>!r.contains(s)))}function Nt([e,t]){return ee(pe([e]),t)}function E([e]){return f(e)(i({selector:c})(r=>{var o=r,{selector:t}=o,n=C(o,["selector"]);return ee(F(t),n)}),i({pattern:m})(r=>{var o=r,{pattern:t}=o,n=C(o,["pattern"]);return ee(pe([t]),n)}),d(()=>ee(F(We),e)))}var jt=e=>v(v({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>M(v({},t),{[n]:f(e[n])(i(Mt)(N),i(p)(r=>N(...r)),d(null))}),{}));function ee(e,t={}){let B=jt(t),{near:n,containedBy:r,pickParent:o}=B,s=C(B,["near","containedBy","pickParent"]),a=Object.keys(s).length>0,u=ce(je),y=ce(Ne),T=({depth:l},x,[O])=>l===O.depth,U=p(r)?l=>{let x=l.map(y),O=w=>$=>$.map((g,H)=>({contained:g.contains(w),depth:H,el:w})).filter(({contained:g})=>g)[0];return w=>x.map(O(w))[0]}:()=>l=>({depth:0,el:l}),J=a?l=>{let{above:x,below:O,leftOf:w,rightOf:$}=Te(l,g=>p(g)?g.map(u):g);return g=>{let H=S=>S.filter(rt=>rt.el!==g),X=u(g),Ze=!p(x)||H(x).every(S=>S.y>X.y),et=!p(O)||H(O).every(S=>S.y<X.y),tt=!p(w)||H(w).every(S=>S.x>X.x),nt=!p($)||H($).every(S=>S.x<X.x);return Ze&&et&&tt&&nt}}:()=>()=>!0,Q=p(n)?l=>{let x=l.map(u);return O=>{let w=x.filter(g=>g.el!==O),$=u(O);return w.map(g=>({from:O,distance:ke(g,$)}))[0]}}:()=>l=>({distance:0,from:l}),_=c(o)?l=>{let x=F(l);return O=>y(O).find(w=>x.includes(w))}:()=>R;return e.map(U(r)).filter(Boolean).sort(ae("depth")).filter(T).map(({el:l})=>l).filter(J(s)).map(Q(n)).filter(Boolean).sort(ae("distance")).map(({from:l})=>l).map(_(o)).filter(Boolean)}function ze(...e){return!!N(...e)[0]}function Ue(...e){return N(...e).map(G)}function Je(...e){return te(...e).map(ue)}function de(...e){return N(...e).map(t=>t.innerText)}function Qe(e,...t){let n=f(t)(i(Et)(()=>[e]),i([p])(([r])=>r),i([m])(([r])=>({pattern:r})),i([qe])(([r])=>[M(v({},r),{pattern:e})]),d(()=>t));return de(...n).map(r=>f(e)(i(I)(o=>{var a;let s=(a=r.match(o))!=null?a:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),i(c)(r),d(null))).filter(L(c,p))}function he(e="baseWaitFor",t,...n){let r=f(n)(i([{timeoutInMs:q(P)}])(R),i([m,{timeoutInMs:q(P)}])(R),i([m,m,{timeoutInMs:q(P)}])(R),d($e*1e3)),o=new z(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,a)=>{let u=B=>(s(B),J()),y=()=>(a(o),J()),T=t({done:u,args:n}),U=setTimeout(y,r),J=()=>{clearTimeout(U),_(),Q()},Q=De(Be,T),_=le(T);T()})}function Ge(...e){return he("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=N(...n);o.length&&r(o.map(G))}}}function Xe(...e){return he("waitForCta",t,...e);function t({args:n,done:r}){return()=>{let o=fe(...n);o.length&&r(o.map(G))}}}function Ke(e,...t){if(!t.length)throw new z("waitForValue",t,{message:"no query specified"});return he("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=te(...r.slice(1)).map(a=>({el:a,value:ue(a)})).filter(({value:a})=>f([e,a])(i([I,c])(([u])=>u.test(a)),i([c,c])(([u])=>u.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);s.length&&o(s.map(G))}}}var Re=L(b(h,{withinMs:P}),b(h,{timeoutInMs:P}),b(h,{withinMs:P,timeoutInMs:P}));function Ye(...e){let t=f(e)(i([q(Re)])(R),i([m,q(Re)])(R),d({})),{withinMs:n=wt}=t,{timeoutInMs:r=$e*1e3}=t,o=Math.max(r,n+16),s=new z("waitForIdle",e,{message:`timed out after ${o}ms waiting for DOM idle`}),a=f(e)(i([m])(!0),i([Tt])(!0),i([m,h])(!0),d(!1)),u=a&&kt.selectorOf(...e);if(a&&!u)throw new z("waitForIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((y,T)=>{let U=()=>(y(),l()),Q=setTimeout(()=>(T(s),l()),o),[_,B]=Z(n,U),l=()=>{clearTimeout(Q),B(),x()},x=le(_,u);_()})}function W(e){return(...t)=>e(...t)[0]}var kt={for:W(N),forCta:W(fe),forInput:W(te),selectorOf:W(Ue),valueOf:W(Je),waitFor:(...e)=>Ge(...e).then(t=>t[0]),waitForCta:(...e)=>Xe(...e).then(t=>t[0]),waitForValue:(...e)=>Ke(...e).then(t=>t[0]),waitForIdle:Ye,innerText:W(de),matchText:W(Qe),hasContent:ze},nn={for:N,forInput:te,forCta:fe,selectorOf:Ue,valueOf:Je,waitFor:Ge,waitForCta:Xe,waitForValue:Ke,waitForIdle:Ye,innerText:de,matchText:Qe,hasContent:ze};export{z as ViddyError,F as qsArray,en as serialize,tn as unserialize,kt as viddy,nn as viddyWell};
