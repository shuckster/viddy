/*
 * viddy
 * v1.0.2
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var Qe=Object.defineProperty,Xe=Object.defineProperties;var Ke=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var fe=(e,t,n)=>t in e?Qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,T=(e,t)=>{for(var n in t||(t={}))pe.call(t,n)&&fe(e,n,t[n]);if(X)for(var n of X(t))de.call(t,n)&&fe(e,n,t[n]);return e},R=(e,t)=>Xe(e,Ke(t));var _=(e,t)=>{var n={};for(var r in e)pe.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&X)for(var r of X(e))t.indexOf(r)<0&&de.call(e,r)&&(n[r]=e[r]);return n};var Ye=Object.defineProperty;var Ze=(e,t)=>{for(var n in t)Ye(e,n,{get:t[n],enumerable:!0})},ne={};Ze(ne,{instanceOf:()=>re,isArguments:()=>ye,isArray:()=>tt,isDate:()=>nt,isFunction:()=>rt,isNumber:()=>st,isObject:()=>Oe,isPojo:()=>at,isRegExp:()=>it,isString:()=>ot});var he=Object.prototype,et=he.toString,K=e=>t=>typeof t===e,re=e=>t=>t instanceof e,{isArray:tt}=Array,ye=e=>et.call(e)==="[object Arguments]",nt=e=>re(Date)(e)&&!isNaN(e),rt=K("function"),ot=K("string"),st=e=>e===e&&K("number")(e),Oe=e=>e!==null&&K("object")(e),it=re(RegExp),at=e=>e===null||!Oe(e)||ye(e)?!1:Object.getPrototypeOf(e)===he,{isArray:m,isDate:Pt,isFunction:k,isNumber:I}=ne,{isPojo:d,isRegExp:M,isString:u,instanceOf:kt}=ne;function f(e){return(...t)=>ct(...t)(e)}var ct=(...e)=>{let t;return n=>e.find(r=>{let o=r(n),{matched:s,value:a}=o||{};return[s,a].every(k)?s(n)&&(t=a(n),!0):o&&(t=o)})&&t},h=e=>t=>({matched:()=>!0,value:()=>k(e)?e(t):e}),i=e=>t=>n=>({matched:()=>S(e,n,r=>n=r),value:()=>k(t)?u(n)&&M(e)?t(...ut(n.match(e))):t(n):t}),ut=e=>{let{groups:t}=e;return t?[t,e]:[e]},S=(e,t,n)=>d(e)?Object.keys(e).every(r=>S(e[r],t==null?void 0:t[r],n)):m(e)?m(t)?e.length===t.length&&e.every((r,o)=>S(r,t==null?void 0:t[o],n)):e.some(r=>S(r,t,n)):k(e)?e(t,n):u(t)&&M(e)?e.test(t):e===t||[e,t].every(Number.isNaN),H=(...e)=>(t,n)=>e.length===0||(k(e[0])?e[0](t):S(e[0],t,n))?(n(t),!0):!1,V=e=>(t,n)=>!S(e,t,n),$=(...e)=>(t,n)=>e.flat().some(r=>S(r,t,n)),x=(...e)=>(t,n)=>e.flat().every(r=>S(r,t,n)),oe=e=>e!==e||!e&&e!==0&&e!==!1||m(e)&&!e.length||d(e)&&!Object.keys(e).length,ge=e=>!oe(e);var ve=e=>lt(t=>t.includes(e));var lt=e=>t=>(m(t)||u(t))&&e(t);function se(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}var be=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),j=e=>e,L=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>L(),chain:()=>L(),fork:e=>e(),orElse:e=>e(),ap:()=>L()});L.of=()=>L();var N=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>N(t(e)),chain:t=>t(e),fork:(t,n)=>n(e),orElse:()=>N(e),ap:t=>t.map(e)});N.of=e=>N(e);var mt=(e=t=>t!=null)=>{let t=n=>e(n)?N(n):L();return t.of=n=>t(n),t},xe=e=>{try{return N(e())}catch(t){return L()}},Nt=mt(),we=e=>()=>N(e);var ie=e=>u(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function Y(e,t){let[n,r]=ft(e,t);return[(...s)=>(r(),n(...s)),r]}function ft(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var Me=e=>e instanceof HTMLElement,Te=e=>e.offsetParent!==null,A=e=>xe(()=>document.querySelectorAll(e)).map(Array.from).orElse(we([])).valueOf();function Se(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function Ie(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,a=o/2,c=n+s,y=t+a;return{el:e,x:c,y,halfWidth:s,halfHeight:a}}function Pe(e,t){let n=t.x-e.x,r=t.y-e.y,o=Ee(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=Ee(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function Ee(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function ke(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var Le=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function Z(e){if(!(e instanceof Element))return;let t=[];for(;e.nodeType===Node.ELEMENT_NODE;){let n=e.nodeName.toLowerCase();if(e.id){t.unshift(`${n}#${e.id}`);break}let r=e,o=1;for(;r=r.previousElementSibling;)r.nodeName.toLowerCase()===n&&o++;let s=n;o>1&&(s+=":nth-of-type("+o+")"),t.unshift(s),e=e.parentNode}return t.join(" > ")}function ae(e){return f(e)(i({val:k})(t=>t.val()),i({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),i({type:"checkbox",value:ge})(t=>t.checked?t.value:""),i({type:"checkbox"})(t=>t.checked?"checked":""),i({contenteditable:!0})(t=>t.innerHTML),h(t=>t.value))}function ce(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let a=A(t);for(let c of s){let y=c.target;if(a.some(w=>y.contains(w))){setTimeout(()=>e(),1);break}}}}var Ne=(e,t)=>{let[n]=Y(32,t),r=A(e).map(o=>(o.addEventListener("change",n,{passive:!0}),()=>o.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n));return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>r.forEach(o=>o())};var Ae="body *",Fe="input, select, textarea",Ce=5,pt=500,dt=x(m,oe),p=$(u,M),ht=$(p,d),yt=$(x(d,{pattern:p}),x(d,{selector:u})),Ot=x(d,{pattern:p,selector:V(u)}),gt=x(d,{selector:V(u),pickParent:V(u)}),vt=x(d,{pattern:V(p),selector:V(u)}),ue="|<-REGEXP::FLAGS->|",bt=x(u,ve(ue)),xt=e=>[e.source,e.flags].join(ue),wt=e=>new RegExp(...e.split(ue)),Ut=(...e)=>JSON.stringify(e,(t,n)=>f(n)(i(M)(xt),h(n))),Gt=e=>JSON.parse(e,(t,n)=>f(n)(i(bt)(wt),h(n))),G=class extends Error{constructor(t,n,{message:r="could not resolve query to any elements"}){let o=c=>`/${c.source}/${c.flags}`,s=(c,y)=>M(y)?o(y):y,a=JSON.stringify(n,s,2);super(`${r}

viddy.${t}(...${a})
`);this.name="ViddyError"}};var P=(...e)=>f(e)(i([p])(le),i([p,d])(Mt),i([d])(U),h([]));function Et(e){return(...t)=>f(t)(i([p])(([n])=>U([{selector:e,near:n}])),i([p,gt])(([n,r])=>U([R(T({},r),{selector:e,near:n})])),i([Ot])(o=>{var[s]=o,a=s,{pattern:n}=a,r=_(a,["pattern"]);return U([R(T({},r),{selector:e,near:n})])}),i([{selector:u}])(o=>{var[s]=o,a=s,{selector:n}=a,r=_(a,["selector"]);return U([R(T({},r),{selector:n})])}),h([]))}var te=Et(Fe);function le([e]){let t=f(e)(i(M)(Le),h(ke)),n=A(Ae).filter(Me).filter(Te).filter(t);return n.filter(r=>n.filter(s=>s!==r).every(s=>!r.contains(s)))}function Mt([e,t]){return ee(le([e]),t)}function U([e]){return f(e)(i({selector:u})(r=>{var o=r,{selector:t}=o,n=_(o,["selector"]);return ee(A(t),n)}),i({pattern:p})(r=>{var o=r,{pattern:t}=o,n=_(o,["pattern"]);return ee(le([t]),n)}),h(()=>ee(A(Ae),e)))}var Tt=e=>T(T({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>R(T({},t),{[n]:f(e[n])(i(ht)(P),i(m)(r=>P(...r)),h(null))}),{}));function ee(e,t={}){let C=Tt(t),{near:n,containedBy:r,pickParent:o}=C,s=_(C,["near","containedBy","pickParent"]),a=Object.keys(s).length>0,c=se(Ie),y=se(Se),w=({depth:l},v,[g])=>l===g.depth,B=m(r)?l=>{let v=l.map(y),g=b=>D=>D.map((O,W)=>({contained:O.contains(b),depth:W,el:b})).filter(({contained:O})=>O)[0];return b=>v.map(g(b))[0]}:()=>l=>({depth:0,el:l}),z=a?l=>{let{above:v,below:g,leftOf:b,rightOf:D}=be(l,O=>m(O)?O.map(c):O);return O=>{let W=E=>E.filter(Ge=>Ge.el!==O),Q=c(O),Be=!m(v)||W(v).every(E=>E.y>Q.y),ze=!m(g)||W(g).every(E=>E.y<Q.y),Je=!m(b)||W(b).every(E=>E.x>Q.x),Ue=!m(D)||W(D).every(E=>E.x<Q.x);return Be&&ze&&Je&&Ue}}:()=>()=>!0,J=m(n)?l=>{let v=l.map(c);return g=>{let b=v.filter(O=>O.el!==g),D=c(g);return b.map(O=>({from:g,distance:Pe(O,D)}))[0]}}:()=>l=>({distance:0,from:l}),F=u(o)?l=>{let v=A(l);return g=>y(g).find(b=>v.includes(b))}:()=>j;return e.map(B(r)).filter(Boolean).sort(ie("depth")).filter(w).map(({el:l})=>l).filter(z(s)).map(J(n)).filter(Boolean).sort(ie("distance")).map(({from:l})=>l).map(F(o)).filter(Boolean)}function De(...e){return!!P(...e)[0]}function We(...e){return P(...e).map(Z)}function Re(...e){return te(...e).map(ae)}function me(...e){return P(...e).map(t=>t.innerText)}function _e(e,...t){let n=f(t)(i(dt)(()=>[e]),i([m])(([r])=>r),i([p])(([r])=>({pattern:r})),i([vt])(([r])=>[R(T({},r),{pattern:e})]),h(()=>t));return me(...n).map(r=>f(e)(i(M)(o=>{var a;let s=(a=r.match(o))!=null?a:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),i(u)(r),h(null))).filter($(u,m))}function He(e="baseWaitFor",t,...n){let r=f(n)(i([{timeoutInMs:H(I)}])(j),i([p,{timeoutInMs:H(I)}])(j),i([p,p,{timeoutInMs:H(I)}])(j),h(Ce*1e3)),o=new G(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,a)=>{let c=C=>(s(C),z()),y=()=>(a(o),z()),w=t({done:c,args:n}),B=setTimeout(y,r),z=()=>{clearTimeout(B),F(),J()},J=Ne(Fe,w),F=ce(w);w()})}function Ve(...e){return He("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=P(...n);o.length&&r(o.map(Z))}}}function $e(e,...t){if(!t.length)throw new G("waitForValue",t,{message:"no query specified"});return He("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=te(...r.slice(1)).map(a=>({el:a,value:ae(a)})).filter(({value:a})=>f([e,a])(i([M,u])(([c])=>c.test(a)),i([u,u])(([c])=>c.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);s.length&&o(s.map(Z))}}}var je=$(x(d,{withinMs:I}),x(d,{timeoutInMs:I}),x(d,{withinMs:I,timeoutInMs:I}));function qe(...e){let t=f(e)(i([H(je)])(j),i([p,H(je)])(j),h({})),{withinMs:n=pt}=t,{_timeoutInMs:r=Ce*1e3}=t,o=Math.max(r,n+16),s=new G("waitForIdle",e,{message:`timed out after ${o}ms waiting for DOM idle`}),a=f(e)(i([p])(!0),i([yt])(!0),i([p,d])(!0),h(!1)),c=a&&St.selectorOf(...e);if(a&&!c)throw new G("waitForIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((y,w)=>{let B=()=>(y(),l()),J=setTimeout(()=>(w(s),l()),o),[F,C]=Y(n,B),l=()=>{clearTimeout(J),C(),v()},v=ce(F,c);F()})}function q(e){return(...t)=>e(...t)[0]}var St={for:q(P),forInput:q(te),selectorOf:q(We),valueOf:q(Re),waitFor:(...e)=>Ve(...e).then(t=>t[0]),waitForValue:(...e)=>$e(...e).then(t=>t[0]),waitForIdle:qe,innerText:q(me),matchText:q(_e),hasContent:De},Qt={for:P,forInput:te,selectorOf:We,valueOf:Re,waitFor:Ve,waitForValue:$e,waitForIdle:qe,innerText:me,matchText:_e,hasContent:De};export{G as ViddyError,A as qsArray,Ut as serialize,Gt as unserialize,St as viddy,Qt as viddyWell};
