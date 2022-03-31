/*
 * viddy
 * v1.2.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var K=Object.defineProperty,Ke=Object.defineProperties,Ye=Object.getOwnPropertyDescriptor,Ze=Object.getOwnPropertyDescriptors,et=Object.getOwnPropertyNames,X=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable;var de=(e,t,n)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,T=(e,t)=>{for(var n in t||(t={}))re.call(t,n)&&de(e,n,t[n]);if(X)for(var n of X(t))he.call(t,n)&&de(e,n,t[n]);return e},R=(e,t)=>Ke(e,Ze(t));var _=(e,t)=>{var n={};for(var r in e)re.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&X)for(var r of X(e))t.indexOf(r)<0&&he.call(e,r)&&(n[r]=e[r]);return n};var tt=(e,t)=>{for(var n in t)K(e,n,{get:t[n],enumerable:!0})},nt=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of et(t))!re.call(e,o)&&o!==n&&K(e,o,{get:()=>t[o],enumerable:!(r=Ye(t,o))||r.enumerable});return e};var rt=e=>nt(K({},"__esModule",{value:!0}),e);var Ct={};tt(Ct,{ViddyError:()=>B,qsArray:()=>P,serialize:()=>kt,unserialize:()=>Lt,viddy:()=>ze,viddyWell:()=>Ft});module.exports=rt(Ct);var ot=Object.defineProperty;var st=(e,t)=>{for(var n in t)ot(e,n,{get:t[n],enumerable:!0})},oe={};st(oe,{instanceOf:()=>se,isArguments:()=>Oe,isArray:()=>at,isDate:()=>ct,isFunction:()=>ut,isNumber:()=>mt,isObject:()=>ge,isPojo:()=>pt,isRegExp:()=>ft,isString:()=>lt});var ye=Object.prototype,it=ye.toString,Y=e=>t=>typeof t===e,se=e=>t=>t instanceof e,{isArray:at}=Array,Oe=e=>it.call(e)==="[object Arguments]",ct=e=>se(Date)(e)&&!isNaN(e),ut=Y("function"),lt=Y("string"),mt=e=>e===e&&Y("number")(e),ge=e=>e!==null&&Y("object")(e),ft=se(RegExp),pt=e=>e===null||!ge(e)||Oe(e)?!1:Object.getPrototypeOf(e)===ye,{isArray:m,isDate:Wt,isFunction:L,isNumber:I}=oe,{isPojo:d,isRegExp:M,isString:u,instanceOf:Rt}=oe;function f(e){return(...t)=>dt(...t)(e)}var dt=(...e)=>{let t;return n=>e.find(r=>{let o=r(n),{matched:s,value:a}=o||{};return[s,a].every(L)?s(n)&&(t=a(n),!0):o&&(t=o)})&&t},h=e=>t=>({matched:()=>!0,value:()=>L(e)?e(t):e}),i=e=>t=>n=>({matched:()=>S(e,n,r=>n=r),value:()=>L(t)?u(n)&&M(e)?t(...ht(n.match(e))):t(n):t}),ht=e=>{let{groups:t}=e;return t?[t,e]:[e]},S=(e,t,n)=>d(e)?Object.keys(e).every(r=>S(e[r],t==null?void 0:t[r],n)):m(e)?m(t)?e.length===t.length&&e.every((r,o)=>S(r,t==null?void 0:t[o],n)):e.some(r=>S(r,t,n)):L(e)?e(t,n):u(t)&&M(e)?e.test(t):e===t||[e,t].every(Number.isNaN),H=(...e)=>(t,n)=>e.length===0||(L(e[0])?e[0](t):S(e[0],t,n))?(n(t),!0):!1,V=e=>(t,n)=>!S(e,t,n),$=(...e)=>(t,n)=>e.flat().some(r=>S(r,t,n)),x=(...e)=>(t,n)=>e.flat().every(r=>S(r,t,n)),ie=e=>e!==e||!e&&e!==0&&e!==!1||m(e)&&!e.length||d(e)&&!Object.keys(e).length,ve=e=>!ie(e);var be=e=>yt(t=>t.includes(e));var yt=e=>t=>(m(t)||u(t))&&e(t);function ae(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}var xe=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),A=e=>e,N=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>N(),chain:()=>N(),fork:e=>e(),orElse:e=>e(),ap:()=>N()});N.of=()=>N();var j=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>j(t(e)),chain:t=>t(e),fork:(t,n)=>n(e),orElse:()=>j(e),ap:t=>t.map(e)});j.of=e=>j(e);var Ot=(e=t=>t!=null)=>{let t=n=>e(n)?j(n):N();return t.of=n=>t(n),t},we=e=>{try{return j(e())}catch(t){return N()}},Ht=Ot(),Ee=e=>()=>j(e);var ce=e=>u(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function Z(e,t){let[n,r]=gt(e,t);return[(...s)=>(r(),n(...s)),r]}function gt(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var Te=e=>e instanceof HTMLElement,Se=e=>e.offsetParent!==null,P=e=>we(()=>document.querySelectorAll(e)).map(Array.from).orElse(Ee([])).valueOf();function Ie(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function Pe(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,a=o/2,c=n+s,y=t+a;return{el:e,x:c,y,halfWidth:s,halfHeight:a}}function ke(e,t){let n=t.x-e.x,r=t.y-e.y,o=Me(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=Me(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function Me(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function Le(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var Ne=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function ee(e){if(!(e instanceof Element))return;let t=[];for(;e.nodeType===Node.ELEMENT_NODE;){let n=e.nodeName.toLowerCase();if(e.id){t.unshift(`${n}#${e.id}`);break}let r=e,o=1;for(;r=r.previousElementSibling;)r.nodeName.toLowerCase()===n&&o++;let s=n;o>1&&(s+=":nth-of-type("+o+")"),t.unshift(s),e=e.parentNode}return t.join(" > ")}function ue(e){return f(e)(i({val:L})(t=>t.val()),i({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),i({type:"checkbox",value:ve})(t=>t.checked?t.value:""),i({type:"checkbox"})(t=>t.checked?"checked":""),i({contenteditable:!0})(t=>t.innerHTML),h(t=>t.value))}function le(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let a=P(t);for(let c of s){let y=c.target;if(a.some(w=>y.contains(w))){setTimeout(()=>e(),1);break}}}}var je=(e,t)=>{let[n]=Z(32,t),r=P(e).map(o=>(o.addEventListener("change",n,{passive:!0}),()=>o.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n));return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>r.forEach(o=>o())};var Fe="body *",Ce="input, select, textarea",De=5,vt=500,bt=x(m,ie),p=$(u,M),xt=$(p,d),wt=$(x(d,{pattern:p}),x(d,{selector:u})),Et=x(d,{pattern:p,selector:V(u)}),Mt=x(d,{selector:V(u),pickParent:V(u)}),Tt=x(d,{pattern:V(p),selector:V(u)}),me="|<-REGEXP::FLAGS->|",St=x(u,be(me)),It=e=>[e.source,e.flags].join(me),Pt=e=>new RegExp(...e.split(me)),kt=(...e)=>JSON.stringify(e,(t,n)=>f(n)(i(M)(It),h(n))),Lt=e=>JSON.parse(e,(t,n)=>f(n)(i(St)(Pt),h(n))),B=class extends Error{constructor(t,n,{message:r="could not resolve query to any elements"}){let o=c=>`/${c.source}/${c.flags}`,s=(c,y)=>M(y)?o(y):y,a=JSON.stringify(n,s,2);super(`${r}

viddy.${t}(...${a})
`);this.name="ViddyError"}};var k=(...e)=>f(e)(i([p])(fe),i([p,d])(jt),i([d])(G),h([]));function Nt(e){return(...t)=>f(t)(i([p])(([n])=>G([{selector:e,near:n}])),i([p,Mt])(([n,r])=>G([R(T({},r),{selector:e,near:n})])),i([Et])(o=>{var[s]=o,a=s,{pattern:n}=a,r=_(a,["pattern"]);return G([R(T({},r),{selector:e,near:n})])}),i([{selector:u}])(o=>{var[s]=o,a=s,{selector:n}=a,r=_(a,["selector"]);return G([R(T({},r),{selector:n})])}),h([]))}var ne=Nt(Ce);function fe([e]){let t=f(e)(i(M)(Ne),h(Le)),n=P(Fe).filter(Te).filter(Se).filter(t);return n.filter(r=>n.filter(s=>s!==r).every(s=>!r.contains(s)))}function jt([e,t]){return te(fe([e]),t)}function G([e]){return f(e)(i({selector:u})(r=>{var o=r,{selector:t}=o,n=_(o,["selector"]);return te(P(t),n)}),i({pattern:p})(r=>{var o=r,{pattern:t}=o,n=_(o,["pattern"]);return te(fe([t]),n)}),h(()=>te(P(Fe),e)))}var At=e=>T(T({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>R(T({},t),{[n]:f(e[n])(i(xt)(k),i(m)(r=>k(...r)),h(null))}),{}));function te(e,t={}){let C=At(t),{near:n,containedBy:r,pickParent:o}=C,s=_(C,["near","containedBy","pickParent"]),a=Object.keys(s).length>0,c=ae(Pe),y=ae(Ie),w=({depth:l},v,[g])=>l===g.depth,z=m(r)?l=>{let v=l.map(y),g=b=>D=>D.map((O,W)=>({contained:O.contains(b),depth:W,el:b})).filter(({contained:O})=>O)[0];return b=>v.map(g(b))[0]}:()=>l=>({depth:0,el:l}),J=a?l=>{let{above:v,below:g,leftOf:b,rightOf:D}=xe(l,O=>m(O)?O.map(c):O);return O=>{let W=E=>E.filter(Xe=>Xe.el!==O),Q=c(O),Je=!m(v)||W(v).every(E=>E.y>Q.y),Ue=!m(g)||W(g).every(E=>E.y<Q.y),Ge=!m(b)||W(b).every(E=>E.x>Q.x),Qe=!m(D)||W(D).every(E=>E.x<Q.x);return Je&&Ue&&Ge&&Qe}}:()=>()=>!0,U=m(n)?l=>{let v=l.map(c);return g=>{let b=v.filter(O=>O.el!==g),D=c(g);return b.map(O=>({from:g,distance:ke(O,D)}))[0]}}:()=>l=>({distance:0,from:l}),F=u(o)?l=>{let v=P(l);return g=>y(g).find(b=>v.includes(b))}:()=>A;return e.map(z(r)).filter(Boolean).sort(ce("depth")).filter(w).map(({el:l})=>l).filter(J(s)).map(U(n)).filter(Boolean).sort(ce("distance")).map(({from:l})=>l).map(F(o)).filter(Boolean)}function We(...e){return!!k(...e)[0]}function Re(...e){return k(...e).map(ee)}function _e(...e){return ne(...e).map(ue)}function pe(...e){return k(...e).map(t=>t.innerText)}function He(e,...t){let n=f(t)(i(bt)(()=>[e]),i([m])(([r])=>r),i([p])(([r])=>({pattern:r})),i([Tt])(([r])=>[R(T({},r),{pattern:e})]),h(()=>t));return pe(...n).map(r=>f(e)(i(M)(o=>{var a;let s=(a=r.match(o))!=null?a:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),i(u)(r),h(null))).filter($(u,m))}function Ve(e="baseWaitFor",t,...n){let r=f(n)(i([{timeoutInMs:H(I)}])(A),i([p,{timeoutInMs:H(I)}])(A),i([p,p,{timeoutInMs:H(I)}])(A),h(De*1e3)),o=new B(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,a)=>{let c=C=>(s(C),J()),y=()=>(a(o),J()),w=t({done:c,args:n}),z=setTimeout(y,r),J=()=>{clearTimeout(z),F(),U()},U=je(Ce,w),F=le(w);w()})}function $e(...e){return Ve("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=k(...n);o.length&&r(o.map(ee))}}}function qe(e,...t){if(!t.length)throw new B("waitForValue",t,{message:"no query specified"});return Ve("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=ne(...r.slice(1)).map(a=>({el:a,value:ue(a)})).filter(({value:a})=>f([e,a])(i([M,u])(([c])=>c.test(a)),i([u,u])(([c])=>c.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);s.length&&o(s.map(ee))}}}var Ae=$(x(d,{withinMs:I}),x(d,{timeoutInMs:I}),x(d,{withinMs:I,timeoutInMs:I}));function Be(...e){let t=f(e)(i([H(Ae)])(A),i([p,H(Ae)])(A),h({})),{withinMs:n=vt}=t,{timeoutInMs:r=De*1e3}=t,o=Math.max(r,n+16),s=new B("waitForIdle",e,{message:`timed out after ${o}ms waiting for DOM idle`}),a=f(e)(i([p])(!0),i([wt])(!0),i([p,d])(!0),h(!1)),c=a&&ze.selectorOf(...e);if(a&&!c)throw new B("waitForIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((y,w)=>{let z=()=>(y(),l()),U=setTimeout(()=>(w(s),l()),o),[F,C]=Z(n,z),l=()=>{clearTimeout(U),C(),v()},v=le(F,c);F()})}function q(e){return(...t)=>e(...t)[0]}var ze={for:q(k),forInput:q(ne),selectorOf:q(Re),valueOf:q(_e),waitFor:(...e)=>$e(...e).then(t=>t[0]),waitForValue:(...e)=>qe(...e).then(t=>t[0]),waitForIdle:Be,innerText:q(pe),matchText:q(He),hasContent:We},Ft={for:k,forInput:ne,selectorOf:Re,valueOf:_e,waitFor:$e,waitForValue:qe,waitForIdle:Be,innerText:pe,matchText:He,hasContent:We};0&&(module.exports={ViddyError,qsArray,serialize,unserialize,viddy,viddyWell});
