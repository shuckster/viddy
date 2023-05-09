/*
 * viddy
 * v2.2.2
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var libViddy=(()=>{var Pt=Object.create;var te=Object.defineProperty,At=Object.defineProperties,Dt=Object.getOwnPropertyDescriptor,Ft=Object.getOwnPropertyDescriptors,Rt=Object.getOwnPropertyNames,re=Object.getOwnPropertySymbols,jt=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty,Fe=Object.prototype.propertyIsEnumerable;var De=(e,t,n)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,y=(e,t)=>{for(var n in t||(t={}))he.call(t,n)&&De(e,n,t[n]);if(re)for(var n of re(t))Fe.call(t,n)&&De(e,n,t[n]);return e},C=(e,t)=>At(e,Ft(t));var P=(e,t)=>{var n={};for(var r in e)he.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&re)for(var r of re(e))t.indexOf(r)<0&&Fe.call(e,r)&&(n[r]=e[r]);return n};var kt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),_t=(e,t)=>{for(var n in t)te(e,n,{get:t[n],enumerable:!0})},Re=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Rt(t))!he.call(e,o)&&o!==n&&te(e,o,{get:()=>t[o],enumerable:!(r=Dt(t,o))||r.enumerable});return e};var je=(e,t,n)=>(n=e!=null?Pt(jt(e)):{},Re(t||!e||!e.__esModule?te(n,"default",{value:e,enumerable:!0}):n,e)),Wt=e=>Re(te({},"__esModule",{value:!0}),e);var Oe=kt((Kn,Je)=>{var cn=(...e)=>t=>e.reduceRight((n,r)=>r(n),t);function un(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}function fn(e){return t=>(e(t),t)}var mn=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),dn=e=>e,I=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>I(),chain:()=>I(),exists:()=>I(),fork:e=>e(),orElse:e=>e(),absent:e=>S(e()),ap:()=>I()});I.of=()=>I();var S=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>S(t(e)),chain:t=>t(e),exists:t=>S(t(e)),fork:(t,n)=>n(e),orElse:()=>S(e),absent:()=>S(e),ap:t=>t.map(e)});S.of=e=>S(e);var be=(e=t=>t!=null)=>{let t=n=>e(n)?S(n):I();return t.of=n=>t(n),t},hn=e=>{try{return S(e())}catch(t){return I()}},pn=be(),yn=be(e=>Array.isArray(e)&&e.length>0),gn=e=>()=>S(e),vn=()=>()=>I();Je.exports={compose:cn,memo:un,aside:fn,mapOverObjectValues:mn,Identity:dn,Nothing:I,Just:S,safe:be,maybeTry:hn,Maybe:pn,MaybePopulatedArray:yn,just:gn,nothing:vn}});var $n={};_t($n,{ViddyError:()=>q,qsArray:()=>D,selectorOfElement:()=>X,serialize:()=>Rn,unserialize:()=>jn,viddy:()=>R,viddyWell:()=>H});var $t=Object.defineProperty;var qt=(e,t)=>{for(var n in t)$t(e,n,{get:t[n],enumerable:!0})},oe={};qt(oe,{instanceOf:()=>Q,isArguments:()=>$e,isArray:()=>Ht,isDate:()=>zt,isFormData:()=>Yt,isFunction:()=>qe,isIterable:()=>Xt,isMap:()=>Gt,isNumber:()=>Vt,isObject:()=>Be,isPojo:()=>Kt,isRegExp:()=>Jt,isSet:()=>Qt,isString:()=>Ut});var We=Object.prototype,Bt=We.toString,se=e=>t=>typeof t===e,Q=e=>t=>t instanceof e,{isArray:Ht}=Array,$e=e=>Bt.call(e)==="[object Arguments]",zt=e=>Q(Date)(e)&&!isNaN(e),qe=se("function"),Ut=se("string"),Vt=e=>e===e&&se("number")(e),Be=e=>e!==null&&se("object")(e),Jt=Q(RegExp),Qt=Q(Set),Gt=Q(Map),Kt=e=>e===null||!Be(e)||$e(e)?!1:Object.getPrototypeOf(e)===We,Xt=e=>e!=null&&[e[Symbol.iterator],e.next].every(qe),Yt=e=>typeof FormData!="undefined"&&Q(FormData)(e),{isArguments:Zt,isArray:g,isDate:Bn,isFunction:W,isNumber:F}=oe,{isPojo:b,isRegExp:A,isString:f,instanceOf:Hn}=oe,{isMap:en,isSet:tn,isIterable:nn,isFormData:rn}=oe,{keys:He,entries:zn,assign:Un}=Object,ke=2e4;function p(e){return(...t)=>ye(...t)(e)}var ye=(...e)=>t=>{let[n,r]=Zt(t)?[{},Array.from(t)]:en(t)||rn(t)?[{isMap:!0},t.entries()]:tn(t)?[{isSet:!0},t.values()]:[{},t];if(!nn(r))return _e(...e)(r).result;let[o,s]=e.reduce(([a,c],u)=>on(u)?[u,c]:[a,[...c,u]],[()=>({value:()=>{}}),[]]),i=[];do{let{value:a,done:c}=r.next();if(c)return o().value();i.push(a);let{found:u,result:z}=_e(...s)(n.isSet?a:n.isMap?{key:a[0],value:a[1]}:[...i]);if(u)return z}while(i.length<ke||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${ke}. Use setIterationLimit(Infinity) to disable.`)},_e=(...e)=>{let t;return n=>({found:!!e.find(r=>{let o=r(n),{matched:s,value:i}=o||{};return[s,i].every(W)?s(n)&&(t=i(n),!0):o&&(t=o)}),result:t})},ze=Symbol("@@match-iz/otherwise"),on=e=>(e==null?void 0:e[ze])===!0,v=e=>{let t=n=>({matched:()=>!0,value:()=>W(e)?e(n):e});return t[ze]=!0,t},pe=e=>t=>n=>({matched:()=>_(e,n,r=>n=r),value:()=>W(t)?f(n)&&A(e)?t(...sn(n.match(e))):t(n):t}),l=(...e)=>{if(e.length===1){let[t]=e;return pe(t)}if(e.length===2){let[t,n]=e;return pe(t)(n)}if(e.length>2){let t=e.slice(-1)[0],n=e.slice(0,-1);return pe(x(n))(t)}throw new Error("Expected at least 1 argument")},sn=e=>{let{groups:t}=e;return t?[t,e]:[e]},_=(e,t,n)=>b(e)?He(e).every(r=>_(e[r],t==null?void 0:t[r],n)):g(e)?g(t)&&e.length===t.length&&e.every((r,o)=>_(r,t==null?void 0:t[o],n)):W(e)?e(t,n):f(t)&&A(e)?e.test(t):e===t||[e,t].every(Number.isNaN),G=(...e)=>(t,n)=>e.length===0||(W(e[0])?e[0](t):_(e[0],t,n))?(n(t),!0):!1;var K=e=>(t,n)=>!_(e,t,n),$=(...e)=>(t,n)=>e.flat().some(r=>_(r,t,n)),x=(...e)=>(t,n)=>e.flat().every(r=>_(r,t,n));var ge=e=>e!==e||!e&&e!==0&&e!==!1||g(e)&&!e.length||b(e)&&!He(e).length,Ue=e=>!ge(e);var Ve=e=>an(t=>t.includes(e));var an=e=>(t,n)=>(g(t)||f(t))&&e(t,n);var ve=e=>f(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function ie(e,t){let[n,r]=ln(e,t);return[(...s)=>(r(),n(...s)),r]}function ln(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var h=je(Oe(),1);var fe=je(Oe(),1);var N,Ee;function Xe(e,t){if(e.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(e.tagName.toLowerCase()==="html")return"html";let n={root:document.body,idName:o=>!0,className:o=>!0,tagName:o=>!0,attr:(o,s)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4};N=y(y({},n),t),Ee=bn(N.root,n);let r=ae(e,"all",()=>ae(e,"two",()=>ae(e,"one",()=>ae(e,"none"))));if(r){let o=et(tt(r,e));return o.length>0&&(r=o[0]),ue(r)}else throw new Error("Selector was not found.")}function bn(e,t){return e.nodeType===Node.DOCUMENT_NODE?e:e===t.root?e.ownerDocument:e}function ae(e,t,n){let r=null,o=[],s=e,i=0;for(;s;){let a=ce(On(s))||ce(...wn(s))||ce(...En(s))||ce(xn(s))||[Ke()],c=Mn(s);if(t=="all")c&&(a=a.concat(a.filter(we).map(u=>le(u,c))));else if(t=="two")a=a.slice(0,1),c&&(a=a.concat(a.filter(we).map(u=>le(u,c))));else if(t=="one"){let[u]=a=a.slice(0,1);c&&we(u)&&(a=[le(u,c)])}else t=="none"&&(a=[Ke()],c&&(a=[le(a[0],c)]));for(let u of a)u.level=i;if(o.push(a),o.length>=N.seedMinLength&&(r=Qe(o,n),r))break;s=s.parentElement,i++}return r||(r=Qe(o,n)),!r&&n?n():r}function Qe(e,t){let n=et(Ze(e));if(n.length>N.threshold)return t?t():null;for(let r of n)if(Ye(r))return r;return null}function ue(e){let t=e[0],n=t.name;for(let r=1;r<e.length;r++){let o=e[r].level||0;t.level===o-1?n=`${e[r].name} > ${n}`:n=`${e[r].name} ${n}`,t=e[r]}return n}function Ge(e){return e.map(t=>t.penalty).reduce((t,n)=>t+n,0)}function Ye(e){let t=ue(e);switch(Ee.querySelectorAll(t).length){case 0:throw new Error(`Can't select any node with this selector: ${t}`);case 1:return!0;default:return!1}}function On(e){let t=e.getAttribute("id");return t&&N.idName(t)?{name:"#"+CSS.escape(t),penalty:0}:null}function wn(e){return Array.from(e.attributes).filter(n=>N.attr(n.name,n.value)).map(n=>({name:`[${CSS.escape(n.name)}="${CSS.escape(n.value)}"]`,penalty:.5}))}function En(e){return Array.from(e.classList).filter(N.className).map(n=>({name:"."+CSS.escape(n),penalty:1}))}function xn(e){let t=e.tagName.toLowerCase();return N.tagName(t)?{name:t,penalty:2}:null}function Ke(){return{name:"*",penalty:3}}function Mn(e){let t=e.parentNode;if(!t)return null;let n=t.firstChild;if(!n)return null;let r=0;for(;n&&(n.nodeType===Node.ELEMENT_NODE&&r++,n!==e);)n=n.nextSibling;return r}function le(e,t){return{name:e.name+`:nth-child(${t})`,penalty:e.penalty+1}}function we(e){return e.name!=="html"&&!e.name.startsWith("#")}function ce(...e){let t=e.filter(Sn);return t.length>0?t:null}function Sn(e){return e!=null}function*Ze(e,t=[]){if(e.length>0)for(let n of e[0])yield*Ze(e.slice(1,e.length),t.concat(n));else yield t}function et(e){return[...e].sort((t,n)=>Ge(t)-Ge(n))}function*tt(e,t,n={counter:0,visited:new Map}){if(e.length>2&&e.length>N.optimizedMinLength)for(let r=1;r<e.length-1;r++){if(n.counter>N.maxNumberOfTries)return;n.counter+=1;let o=[...e];o.splice(r,1);let s=ue(o);if(n.visited.has(s))return;Ye(o)&&Tn(o,t)&&(yield o,n.visited.set(s,!0),yield*tt(o,t,n))}}function Tn(e,t){return Ee.querySelector(ue(e))===t}var rt=e=>e instanceof HTMLElement,ot=e=>e.offsetParent!==null,D=e=>(0,fe.maybeTry)(()=>document.querySelectorAll(e)).map(Array.from).orElse((0,fe.just)([])).valueOf();function st(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function it(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,i=o/2,a=n+s,c=t+i;return{el:e,x:a,y:c,halfWidth:s,halfHeight:i}}function at(e,t){let n=t.x-e.x,r=t.y-e.y,o=nt(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=nt(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function nt(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function lt(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var ct=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function X(e){if(e instanceof Element)return typeof global=="undefined"&&typeof window!="undefined"&&(global=window),Xe(e)}function xe(e){return p(e)(l({val:W})(t=>t.val()),l({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),l({type:"checkbox",value:Ue})(t=>t.checked?t.value:""),l({type:"checkbox"})(t=>t.checked?"checked":""),l({contenteditable:!0})(t=>t.innerHTML),v(t=>t.value))}function Me(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let i=D(t);for(let a of s){let c=a.target;if(i.some(u=>c.contains(u))){setTimeout(()=>e(),1);break}}}}var ut=(e,t)=>{let[n,r]=ie(32,t),o=D(e).map(s=>(s.addEventListener("change",n,{passive:!0}),()=>s.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n)).concat(r);return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>o.forEach(s=>s())};var mt="body *",dt=["button","submit","reset","file"],ht=dt.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),Cn=dt.map(e=>`input[type=${e}]`).concat("a","button").join(", "),pt=5,In=500,Nn=x(g,ge),d=$(f,A),Ln=$(d,b),Pn=$(x(b,{pattern:d}),x(b,{selector:f})),yt=x(b,{pattern:d,selector:K(f)}),gt=x(b,{pattern:K(d),selector:K(f)}),vt=x(b,{selector:K(f),pickParent:K(f)}),Ce="|<-REGEXP::FLAGS->|",An=x(f,Ve(Ce)),Dn=e=>[e.source,e.flags].join(Ce),Fn=e=>new RegExp(...e.split(Ce)),Rn=(...e)=>JSON.stringify(e,(t,n)=>p(n)(l(A)(Dn),v(n))),jn=e=>JSON.parse(e,(t,n)=>p(n)(l(An)(Fn),v(n)));var q=class extends Error{constructor(t,n=[],{message:r="could not resolve query to any elements"}={}){let o=a=>`/${a.source}/${a.flags}`,i=JSON.stringify(n,(a,c)=>A(c)?o(c):c,2).slice(1,-1);super(`${r}

viddy.${t}(${i})
`),this.name="ViddyError"}},B=(...e)=>p(e)(l([d])(Te),l([d,b])(([t,n])=>M([y({pattern:t},n)])),l([b])(M),v([]));function kn(e){return(...t)=>p(t)(l([d])(([n])=>M([{selector:e,near:n}])),l([d,vt])(([n,r])=>M([{selector:e,near:C(y({},r),{pattern:n})}])),l([yt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=P(i,["pattern"]);return M([{selector:e,near:C(y({},r),{pattern:n})}])}),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=P(i,["selector"]);return M([C(y({},r),{selector:n})])}),v([]))}function _n(e){return(...t)=>(0,h.compose)(n=>n.filter(ye(l($(D(e)),!0))))(p(t)(l([d])(([n])=>M([{containedBy:{selector:e},pattern:n}])),l([d,vt])(([n,r])=>M([C(y({},r),{containedBy:{selector:e},pattern:n})])),l([yt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=P(i,["pattern"]);return M([C(y({},r),{containedBy:{selector:e},pattern:n})])}),l([gt])(([n])=>M([C(y({},n),{containedBy:{selector:e}})])),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=P(i,["selector"]);return M([C(y({},r),{selector:n})])}),v(M([{selector:e}]))))}var de=kn(ht),Ie=_n(Cn);function Te([e,t=mt]){let n=p(e)(l(A)(ct),v(lt)),r=D(t).filter(rt).filter(ot).filter(n);return r.filter(o=>r.filter(i=>i!==o).every(i=>!o.contains(i)))}function M([e]){return p(e)(l({pattern:d,selector:f})(o=>{var s=o,{pattern:t,selector:n}=s,r=P(s,["pattern","selector"]);return me(Te([t,n]),r)}),l({pattern:d})(r=>{var o=r,{pattern:t}=o,n=P(o,["pattern"]);return me(Te([t]),n)}),l({selector:f})(r=>{var o=r,{selector:t}=o,n=P(o,["selector"]);return me(D(t),n)}),v(()=>me(D(mt),e)))}var Wn=e=>y(y({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>C(y({},t),{[n]:p(e[n])(l(Ln)(B),l(g)(r=>B(...r)),v(null))}),{}));function me(e,t={}){let j=Wn(t),{near:n,containedBy:r,pickParent:o}=j,s=P(j,["near","containedBy","pickParent"]),i=Object.keys(s).length>0,a=(0,h.memo)(it),c=(0,h.memo)(st),u=({depth:m},T,[w])=>m===w.depth,z=g(r)?m=>{let T=m.map(c),w=E=>k=>k.map((O,J)=>({contained:O.contains(E),depth:J,el:E})).filter(({contained:O})=>O)[0];return E=>T.map(w(E))[0]}:()=>m=>({depth:0,el:m}),U=i?m=>{let{above:T,below:w,leftOf:E,rightOf:k}=(0,h.mapOverObjectValues)(m,O=>g(O)?O.map(a):O);return O=>{let J=L=>L.filter(Lt=>Lt.el!==O),ne=a(O),Tt=!g(T)||T.length>0&&J(T).every(L=>L.y>ne.y),Ct=!g(w)||w.length>0&&J(w).every(L=>L.y<ne.y),It=!g(E)||E.length>0&&J(E).every(L=>L.x>ne.x),Nt=!g(k)||k.length>0&&J(k).every(L=>L.x<ne.x);return Tt&&Ct&&It&&Nt}}:()=>()=>!0,V=g(n)?m=>{let T=m.map(a);return w=>{let E=T.filter(O=>O.el!==w),k=a(w);return E.map(O=>({from:w,distance:at(O,k)}))[0]}}:()=>m=>({distance:0,from:m}),ee=f(o)?m=>{let T=D(m);return w=>c(w).find(E=>T.includes(E))}:()=>h.Identity;return e.map(z(r)).filter(Boolean).sort(ve("depth")).filter(u).map(({el:m})=>m).filter(U(s)).map(V(n)).filter(Boolean).sort(ve("distance")).map(({from:m})=>m).map(ee(o)).filter(Boolean)}function bt(...e){return!!B(...e)[0]}function Ot(...e){return de(...e).map(xe)}function Ne(...e){return B(...e).map(t=>t.innerText)}function wt(e,...t){let n=p(t)(l(Nn)(()=>[e]),l([g])(([r])=>r),l([d])(([r])=>({pattern:r})),l([gt])(([r])=>[C(y({},r),{pattern:e})]),v(()=>t));return Ne(...n).map(r=>p(e)(l(A)(o=>{var i;let s=(i=r.match(o))!=null?i:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),l(f)(r),v(null))).filter($(f,g))}function Le(e="baseWaitFor",t,...n){let r=p(n)(l([{timeoutInMs:G(F)}])(h.Identity),l([d,{timeoutInMs:G(F)}])(h.Identity),l([d,d,{timeoutInMs:G(F)}])(h.Identity),v(pt*1e3)),o=new q(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,i)=>{let a=j=>(s(j),U()),c=()=>(i(o),U()),u=t({done:a,args:n}),z=setTimeout(c,r),U=()=>{clearTimeout(z),ee(),V()},V=ut(ht,u),ee=Me(u);u()})}function Et(...e){return Le("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=B(...n);o.length&&r(o.map(X))}}}function xt(...e){return Le("waitForCta",t,...e);function t({args:n,done:r}){return()=>{let o=Ie(...n);o.length&&r(o.map(X))}}}function Mt(e,...t){if(!t.length)throw new q("waitForValue",t,{message:"no query specified"});return Le("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=de(...r.slice(1)).map(i=>({el:i,value:xe(i)})).filter(({value:i})=>p([e,i])(l([A,f])(([a])=>a.test(i)),l([f,f])(([a])=>a.toLowerCase()===i.toLowerCase()))).map(({el:i})=>i);s.length&&o(s.map(X))}}}var ft=$(x(b,{withinMs:F}),x(b,{timeoutInMs:F}),x(b,{withinMs:F,timeoutInMs:F}));function St(...e){let{withinMs:t=In,timeoutInMs:n=pt*1e3}=p(e)(l([G(ft)])(h.Identity),l([d,G(ft)])(h.Identity),v({})),r=Math.max(n,t+16),o=new q("waitForDomToIdle",e,{message:`timed out after ${r}ms waiting for DOM idle`}),s=p(e)(l([d])(!0),l([Pn])(!0),l([d,b])(!0),v(!1)),i=s&&R.for(...e);if(s&&!i)throw new q("waitForDomToIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((a,c)=>{let u=()=>(a(),j()),U=setTimeout(()=>(c(o),j()),r),[V,ee]=ie(t,u),j=()=>{clearTimeout(U),ee(),m()},m=Me(V,i);V()})}function Pe(e){return(...t)=>(0,h.Maybe)(e(...t))}function Ae(e){return(...t)=>(0,h.MaybePopulatedArray)(e(...t))}function Y(e){return(...t)=>e(...t)[0]}function Se(e){return e[0]}function Z(e){return(...t)=>e(...t).map(X)}var R={for:Y(Z(B)),forCta:Y(Z(Ie)),forInput:Y(Z(de)),waitFor:(...e)=>Et(...e).then(Se),waitForCta:(...e)=>xt(...e).then(Se),waitForValue:(...e)=>Mt(...e).then(Se),waitForDomToIdle:St,valueOf:Y(Ot),innerText:Y(Ne),matchText:Y(wt),hasContent:bt};R.when=Pe(R.for);R.whenCta=Pe(R.forCta);R.whenInput=Pe(R.forInput);var H={for:Z(B),forInput:Z(de),forCta:Z(Ie),waitFor:Et,waitForCta:xt,waitForValue:Mt,waitForDomToIdle:St,valueOf:Ot,innerText:Ne,matchText:wt,hasContent:bt};H.when=Ae(H.for);H.whenCta=Ae(H.forCta);H.whenInput=Ae(H.forInput);return Wt($n);})();
