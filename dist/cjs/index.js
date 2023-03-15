/*
 * viddy
 * v2.2.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var Lt=Object.create;var te=Object.defineProperty,Dt=Object.defineProperties,Rt=Object.getOwnPropertyDescriptor,jt=Object.getOwnPropertyDescriptors,kt=Object.getOwnPropertyNames,re=Object.getOwnPropertySymbols,qt=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var Re=(e,t,n)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t)=>{for(var n in t||(t={}))pe.call(t,n)&&Re(e,n,t[n]);if(re)for(var n of re(t))je.call(t,n)&&Re(e,n,t[n]);return e},A=(e,t)=>Dt(e,jt(t));var D=(e,t)=>{var n={};for(var r in e)pe.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&re)for(var r of re(e))t.indexOf(r)<0&&je.call(e,r)&&(n[r]=e[r]);return n};var _t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Wt=(e,t)=>{for(var n in t)te(e,n,{get:t[n],enumerable:!0})},ke=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of kt(t))!pe.call(e,o)&&o!==n&&te(e,o,{get:()=>t[o],enumerable:!(r=Rt(t,o))||r.enumerable});return e};var qe=(e,t,n)=>(n=e!=null?Lt(qt(e)):{},ke(t||!e||!e.__esModule?te(n,"default",{value:e,enumerable:!0}):n,e)),$t=e=>ke(te({},"__esModule",{value:!0}),e);var Oe=_t((nr,Ge)=>{var fn=(...e)=>t=>e.reduceRight((n,r)=>r(n),t);function mn(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}function dn(e){return t=>(e(t),t)}var hn=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),pn=e=>e,N=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>N(),chain:()=>N(),exists:()=>N(),fork:e=>e(),orElse:e=>e(),absent:e=>T(e()),ap:()=>N()});N.of=()=>N();var T=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>T(t(e)),chain:t=>t(e),exists:t=>T(t(e)),fork:(t,n)=>n(e),orElse:()=>T(e),absent:()=>T(e),ap:t=>t.map(e)});T.of=e=>T(e);var we=(e=t=>t!=null)=>{let t=n=>e(n)?T(n):N();return t.of=n=>t(n),t},yn=e=>{try{return T(e())}catch(t){return N()}},gn=we(),vn=we(e=>Array.isArray(e)&&e.length>0),bn=e=>()=>T(e),wn=()=>()=>N();Ge.exports={compose:fn,memo:mn,aside:dn,mapOverObjectValues:hn,Identity:pn,Nothing:N,Just:T,safe:we,maybeTry:yn,Maybe:gn,MaybePopulatedArray:vn,just:bn,nothing:wn}});var Vn={};Wt(Vn,{ViddyError:()=>H,qsArray:()=>j,selectorOfElement:()=>X,serialize:()=>$n,unserialize:()=>Bn,viddy:()=>q,viddyWell:()=>V});module.exports=$t(Vn);var Bt=Object.defineProperty;var Ut=(e,t)=>{for(var n in t)Bt(e,n,{get:t[n],enumerable:!0})},oe={};Ut(oe,{instanceOf:()=>Q,isArguments:()=>Be,isArray:()=>zt,isDate:()=>Vt,isFormData:()=>en,isFunction:()=>Ue,isIterable:()=>Zt,isMap:()=>Xt,isNumber:()=>Qt,isObject:()=>He,isPojo:()=>Yt,isRegExp:()=>Gt,isSet:()=>Kt,isString:()=>Jt});var $e=Object.prototype,Ht=$e.toString,se=e=>t=>typeof t===e,Q=e=>t=>t instanceof e,{isArray:zt}=Array,Be=e=>Ht.call(e)==="[object Arguments]",Vt=e=>Q(Date)(e)&&!isNaN(e),Ue=se("function"),Jt=se("string"),Qt=e=>e===e&&se("number")(e),He=e=>e!==null&&se("object")(e),Gt=Q(RegExp),Kt=Q(Set),Xt=Q(Map),Yt=e=>e===null||!He(e)||Be(e)?!1:Object.getPrototypeOf(e)===$e,Zt=e=>e!=null&&[e[Symbol.iterator],e.next].every(Ue),en=e=>typeof FormData!="undefined"&&Q(FormData)(e),{isArguments:tn,isArray:b,isDate:Qn,isFunction:B,isNumber:k}=oe,{isPojo:O,isRegExp:R,isString:f,instanceOf:Gn}=oe,{isMap:nn,isSet:rn,isIterable:on,isFormData:sn}=oe,{keys:ze,entries:Kn,assign:Xn}=Object,_e=2e4;function g(e){return(...t)=>ge(...t)(e)}var ge=(...e)=>t=>{let[n,r]=tn(t)?[{},Array.from(t)]:nn(t)||sn(t)?[{isMap:!0},t.entries()]:rn(t)?[{isSet:!0},t.values()]:[{},t];if(!on(r))return We(...e)(r).result;let[o,s]=e.reduce(([a,u],c)=>an(c)?[c,u]:[a,[...u,c]],[()=>({value:()=>{}}),[]]),i=[];do{let{value:a,done:u}=r.next();if(u)return o().value();i.push(a);let{found:c,result:m}=We(...s)(n.isSet?a:n.isMap?{key:a[0],value:a[1]}:[...i]);if(c)return m}while(i.length<_e||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${_e}. Use setIterationLimit(Infinity) to disable.`)},We=(...e)=>{let t;return n=>({found:!!e.find(r=>{let o=r(n),{matched:s,value:i}=o||{};return[s,i].every(B)?s(n)&&(t=i(n),!0):o&&(t=o)}),result:t})},Ve=Symbol("@@match-iz/otherwise"),an=e=>(e==null?void 0:e[Ve])===!0,w=e=>{let t=n=>({matched:()=>!0,value:()=>B(e)?e(n):e});return t[Ve]=!0,t},ye=e=>t=>n=>({matched:()=>$(e,n,r=>n=r),value:()=>B(t)?f(n)&&R(e)?t(...ln(n.match(e))):t(n):t}),l=(...e)=>{if(e.length===1){let[t]=e;return ye(t)}if(e.length===2){let[t,n]=e;return ye(t)(n)}if(e.length>2){let t=e.slice(-1)[0],n=e.slice(0,-1);return ye(S(n))(t)}throw new Error("Expected at least 1 argument")},ln=e=>{let{groups:t}=e;return t?[t,e]:[e]},$=(e,t,n)=>O(e)?ze(e).every(r=>$(e[r],t==null?void 0:t[r],n)):b(e)?b(t)&&e.length===t.length&&e.every((r,o)=>$(r,t==null?void 0:t[o],n)):B(e)?e(t,n):f(t)&&R(e)?e.test(t):e===t||[e,t].every(Number.isNaN),G=(...e)=>(t,n)=>e.length===0||(B(e[0])?e[0](t):$(e[0],t,n))?(n(t),!0):!1;var K=e=>(t,n)=>!$(e,t,n),U=(...e)=>(t,n)=>e.flat().some(r=>$(r,t,n)),S=(...e)=>(t,n)=>e.flat().every(r=>$(r,t,n));var ve=e=>e!==e||!e&&e!==0&&e!==!1||b(e)&&!e.length||O(e)&&!ze(e).length,Je=e=>!ve(e);var Qe=e=>cn(t=>t.includes(e));var cn=e=>(t,n)=>(b(t)||f(t))&&e(t,n);var be=e=>f(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function ie(e,t){let[n,r]=un(e,t);return[(...s)=>(r(),n(...s)),r]}function un(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var y=qe(Oe(),1);var me=qe(Oe(),1);var P,Me,Ee;function Ze(e,t){if(e.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(e.tagName.toLowerCase()==="html")return"html";let n={root:document.body,idName:o=>!0,className:o=>!0,tagName:o=>!0,attr:(o,s)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4};P=p(p({},n),t),Me=On(P.root,n),Ee=new Map;let r=ae(e,"all",()=>ae(e,"two",()=>ae(e,"one",()=>ae(e,"none"))));if(r){let o=nt(rt(r,e));return o.length>0&&(r=o[0]),fe(r)}else throw new Error("Selector was not found.")}function On(e,t){return e.nodeType===Node.DOCUMENT_NODE?e:e===t.root?e.ownerDocument:e}function ae(e,t,n){let r=null,o=[],s=e,i=0;for(;s;){let a=ce(xn(s))||ce(...En(s))||ce(...Mn(s))||ce(Sn(s))||[Ye()],u=In(s);if(t=="all")u&&(a=a.concat(a.filter(xe).map(c=>le(c,u))));else if(t=="two")a=a.slice(0,1),u&&(a=a.concat(a.filter(xe).map(c=>le(c,u))));else if(t=="one"){let[c]=a=a.slice(0,1);u&&xe(c)&&(a=[le(c,u)])}else t=="none"&&(a=[Ye()],u&&(a=[le(a[0],u)]));for(let c of a)c.level=i;if(o.push(a),o.length>=P.seedMinLength&&(r=Ke(o,n),r))break;s=s.parentElement,i++}return r||(r=Ke(o,n)),!r&&n?n():r}function Ke(e,t){let n=nt(tt(e));if(n.length>P.threshold)return t?t():null;for(let r of n)if(et(r))return r;return null}function fe(e){let t=e[0],n=t.name;for(let r=1;r<e.length;r++){let o=e[r].level||0;t.level===o-1?n=`${e[r].name} > ${n}`:n=`${e[r].name} ${n}`,t=e[r]}return n}function Xe(e){return e.map(t=>t.penalty).reduce((t,n)=>t+n,0)}function et(e){let t=fe(e);switch(Me.querySelectorAll(t).length){case 0:throw new Error(`Can't select any node with this selector: ${t}`);case 1:return Ee.set(t,!0),!0;default:return Ee.set(t,!1),!1}}function xn(e){let t=e.getAttribute("id");return t&&P.idName(t)?{name:"#"+ue(t,{isIdentifier:!0}),penalty:0}:null}function En(e){return Array.from(e.attributes).filter(n=>P.attr(n.name,n.value)).map(n=>({name:"["+ue(n.name,{isIdentifier:!0})+'="'+ue(n.value)+'"]',penalty:.5}))}function Mn(e){return Array.from(e.classList).filter(P.className).map(n=>({name:"."+ue(n,{isIdentifier:!0}),penalty:1}))}function Sn(e){let t=e.tagName.toLowerCase();return P.tagName(t)?{name:t,penalty:2}:null}function Ye(){return{name:"*",penalty:3}}function In(e){let t=e.parentNode;if(!t)return null;let n=t.firstChild;if(!n)return null;let r=0;for(;n&&(n.nodeType===Node.ELEMENT_NODE&&r++,n!==e);)n=n.nextSibling;return r}function le(e,t){return{name:e.name+`:nth-child(${t})`,penalty:e.penalty+1}}function xe(e){return e.name!=="html"&&!e.name.startsWith("#")}function ce(...e){let t=e.filter(Tn);return t.length>0?t:null}function Tn(e){return e!=null}function*tt(e,t=[]){if(e.length>0)for(let n of e[0])yield*tt(e.slice(1,e.length),t.concat(n));else yield t}function nt(e){return[...e].sort((t,n)=>Xe(t)-Xe(n))}function*rt(e,t,n={counter:0,visited:new Map}){if(e.length>2&&e.length>P.optimizedMinLength)for(let r=1;r<e.length-1;r++){if(n.counter>P.maxNumberOfTries)return;n.counter+=1;let o=[...e];o.splice(r,1);let s=fe(o);if(n.visited.has(s))return;et(o)&&Cn(o,t)&&(yield o,n.visited.set(s,!0),yield*rt(o,t,n))}}function Cn(e,t){return Me.querySelector(fe(e))===t}var An=/[ -,\.\/:-@\[-\^`\{-~]/,Nn=/[ -,\.\/:-@\[\]\^`\{-~]/,Pn=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,Fn={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1};function ue(e,t={}){let n=p(p({},Fn),t);n.quotes!="single"&&n.quotes!="double"&&(n.quotes="single");let r=n.quotes=="double"?'"':"'",o=n.isIdentifier,s=e.charAt(0),i="",a=0,u=e.length;for(;a<u;){let c=e.charAt(a++),m=c.charCodeAt(0),v;if(m<32||m>126){if(m>=55296&&m<=56319&&a<u){let F=e.charCodeAt(a++);(F&64512)==56320?m=((m&1023)<<10)+(F&1023)+65536:a--}v="\\"+m.toString(16).toUpperCase()+" "}else n.escapeEverything?An.test(c)?v="\\"+c:v="\\"+m.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(c)?v="\\"+m.toString(16).toUpperCase()+" ":c=="\\"||!o&&(c=='"'&&r==c||c=="'"&&r==c)||o&&Nn.test(c)?v="\\"+c:v=c;i+=v}return o&&(/^-[-\d]/.test(i)?i="\\-"+i.slice(1):/\d/.test(s)&&(i="\\3"+s+" "+i.slice(1))),i=i.replace(Pn,function(c,m,v){return m&&m.length%2?c:(m||"")+v}),!o&&n.wrap?r+i+r:i}var st=e=>e instanceof HTMLElement,it=e=>e.offsetParent!==null,j=e=>(0,me.maybeTry)(()=>document.querySelectorAll(e)).map(Array.from).orElse((0,me.just)([])).valueOf();function at(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function lt(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,i=o/2,a=n+s,u=t+i;return{el:e,x:a,y:u,halfWidth:s,halfHeight:i}}function ct(e,t){let n=t.x-e.x,r=t.y-e.y,o=ot(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=ot(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function ot(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function ut(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var ft=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function X(e){if(e instanceof Element)return typeof global=="undefined"&&typeof window!="undefined"&&(global=window),Ze(e)}function Se(e){return g(e)(l({val:B})(t=>t.val()),l({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),l({type:"checkbox",value:Je})(t=>t.checked?t.value:""),l({type:"checkbox"})(t=>t.checked?"checked":""),l({contenteditable:!0})(t=>t.innerHTML),w(t=>t.value))}function Ie(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let i=j(t);for(let a of s){let u=a.target;if(i.some(c=>u.contains(c))){setTimeout(()=>e(),1);break}}}}var mt=(e,t)=>{let[n,r]=ie(32,t),o=j(e).map(s=>(s.addEventListener("change",n,{passive:!0}),()=>s.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n)).concat(r);return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>o.forEach(s=>s())};var ht="body *",pt=["button","submit","reset","file"],yt=pt.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),Ln=pt.map(e=>`input[type=${e}]`).concat("a","button").join(", "),gt=5,Dn=500,Rn=S(b,ve),h=U(f,R),jn=U(h,O),kn=U(S(O,{pattern:h}),S(O,{selector:f})),vt=S(O,{pattern:h,selector:K(f)}),bt=S(O,{pattern:K(h),selector:K(f)}),wt=S(O,{selector:K(f),pickParent:K(f)}),Ae="|<-REGEXP::FLAGS->|",qn=S(f,Qe(Ae)),_n=e=>[e.source,e.flags].join(Ae),Wn=e=>new RegExp(...e.split(Ae)),$n=(...e)=>JSON.stringify(e,(t,n)=>g(n)(l(R)(_n),w(n))),Bn=e=>JSON.parse(e,(t,n)=>g(n)(l(qn)(Wn),w(n)));var H=class extends Error{constructor(t,n,{message:r="could not resolve query to any elements"}={}){let o=a=>`/${a.source}/${a.flags}`,i=JSON.stringify(n,(a,u)=>R(u)?o(u):u,2);super(`${r}

viddy.${t}(...${i})
`),this.name="ViddyError"}},z=(...e)=>g(e)(l([h])(Ce),l([h,O])(([t,n])=>I([p({pattern:t},n)])),l([O])(I),w([]));function Un(e){return(...t)=>g(t)(l([h])(([n])=>I([{selector:e,near:n}])),l([h,wt])(([n,r])=>I([{selector:e,near:A(p({},r),{pattern:n})}])),l([vt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=D(i,["pattern"]);return I([{selector:e,near:A(p({},r),{pattern:n})}])}),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=D(i,["selector"]);return I([A(p({},r),{selector:n})])}),w([]))}function Hn(e){return(...t)=>(0,y.compose)(n=>n.filter(ge(l(U(j(e)),!0))))(g(t)(l([h])(([n])=>I([{containedBy:{selector:e},pattern:n}])),l([h,wt])(([n,r])=>I([A(p({},r),{containedBy:{selector:e},pattern:n})])),l([vt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=D(i,["pattern"]);return I([A(p({},r),{containedBy:{selector:e},pattern:n})])}),l([bt])(([n])=>I([A(p({},n),{containedBy:{selector:e}})])),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=D(i,["selector"]);return I([A(p({},r),{selector:n})])}),w(I([{selector:e}]))))}var he=Un(yt),Ne=Hn(Ln);function Ce([e,t=ht]){let n=g(e)(l(R)(ft),w(ut)),r=j(t).filter(st).filter(it).filter(n);return r.filter(o=>r.filter(i=>i!==o).every(i=>!o.contains(i)))}function I([e]){return g(e)(l({pattern:h,selector:f})(o=>{var s=o,{pattern:t,selector:n}=s,r=D(s,["pattern","selector"]);return de(Ce([t,n]),r)}),l({pattern:h})(r=>{var o=r,{pattern:t}=o,n=D(o,["pattern"]);return de(Ce([t]),n)}),l({selector:f})(r=>{var o=r,{selector:t}=o,n=D(o,["selector"]);return de(j(t),n)}),w(()=>de(j(ht),e)))}var zn=e=>p(p({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>A(p({},t),{[n]:g(e[n])(l(jn)(z),l(b)(r=>z(...r)),w(null))}),{}));function de(e,t={}){let _=zn(t),{near:n,containedBy:r,pickParent:o}=_,s=D(_,["near","containedBy","pickParent"]),i=Object.keys(s).length>0,a=(0,y.memo)(lt),u=(0,y.memo)(at),c=({depth:d},C,[E])=>d===E.depth,m=b(r)?d=>{let C=d.map(u),E=M=>W=>W.map((x,J)=>({contained:x.contains(M),depth:J,el:M})).filter(({contained:x})=>x)[0];return M=>C.map(E(M))[0]}:()=>d=>({depth:0,el:d}),v=i?d=>{let{above:C,below:E,leftOf:M,rightOf:W}=(0,y.mapOverObjectValues)(d,x=>b(x)?x.map(a):x);return x=>{let J=L=>L.filter(Ft=>Ft.el!==x),ne=a(x),Ct=!b(C)||C.length>0&&J(C).every(L=>L.y>ne.y),At=!b(E)||E.length>0&&J(E).every(L=>L.y<ne.y),Nt=!b(M)||M.length>0&&J(M).every(L=>L.x>ne.x),Pt=!b(W)||W.length>0&&J(W).every(L=>L.x<ne.x);return Ct&&At&&Nt&&Pt}}:()=>()=>!0,F=b(n)?d=>{let C=d.map(a);return E=>{let M=C.filter(x=>x.el!==E),W=a(E);return M.map(x=>({from:E,distance:ct(x,W)}))[0]}}:()=>d=>({distance:0,from:d}),ee=f(o)?d=>{let C=j(d);return E=>u(E).find(M=>C.includes(M))}:()=>y.Identity;return e.map(m(r)).filter(Boolean).sort(be("depth")).filter(c).map(({el:d})=>d).filter(v(s)).map(F(n)).filter(Boolean).sort(be("distance")).map(({from:d})=>d).map(ee(o)).filter(Boolean)}function Ot(...e){return!!z(...e)[0]}function xt(...e){return he(...e).map(Se)}function Pe(...e){return z(...e).map(t=>t.innerText)}function Et(e,...t){let n=g(t)(l(Rn)(()=>[e]),l([b])(([r])=>r),l([h])(([r])=>({pattern:r})),l([bt])(([r])=>[A(p({},r),{pattern:e})]),w(()=>t));return Pe(...n).map(r=>g(e)(l(R)(o=>{var i;let s=(i=r.match(o))!=null?i:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),l(f)(r),w(null))).filter(U(f,b))}function Fe(e="baseWaitFor",t,...n){let r=g(n)(l([{timeoutInMs:G(k)}])(y.Identity),l([h,{timeoutInMs:G(k)}])(y.Identity),l([h,h,{timeoutInMs:G(k)}])(y.Identity),w(gt*1e3)),o=new H(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,i)=>{let a=_=>(s(_),v()),u=()=>(i(o),v()),c=t({done:a,args:n}),m=setTimeout(u,r),v=()=>{clearTimeout(m),ee(),F()},F=mt(yt,c),ee=Ie(c);c()})}function Mt(...e){return Fe("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=z(...n);o.length&&r(o.map(X))}}}function St(...e){return Fe("waitForCta",t,...e);function t({args:n,done:r}){return()=>{let o=Ne(...n);o.length&&r(o.map(X))}}}function It(e,...t){if(!t.length)throw new H("waitForValue",t,{message:"no query specified"});return Fe("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=he(...r.slice(1)).map(i=>({el:i,value:Se(i)})).filter(({value:i})=>g([e,i])(l([R,f])(([a])=>a.test(i)),l([f,f])(([a])=>a.toLowerCase()===i.toLowerCase()))).map(({el:i})=>i);s.length&&o(s.map(X))}}}var dt=U(S(O,{withinMs:k}),S(O,{timeoutInMs:k}),S(O,{withinMs:k,timeoutInMs:k}));function Tt(...e){let{withinMs:t=Dn,timeoutInMs:n=gt*1e3}=g(e)(l([G(dt)])(y.Identity),l([h,G(dt)])(y.Identity),w({})),r=Math.max(n,t+16),o=new H("waitForDomToIdle",e,{message:`timed out after ${r}ms waiting for DOM idle`}),s=g(e)(l([h])(!0),l([kn])(!0),l([h,O])(!0),w(!1)),i=s&&q.for(...e);if(s&&!i)throw new H("waitForDomToIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((a,u)=>{let c=()=>(a(),_()),v=setTimeout(()=>(u(o),_()),r),[F,ee]=ie(t,c),_=()=>{clearTimeout(v),ee(),d()},d=Ie(F,i);F()})}function Le(e){return(...t)=>(0,y.Maybe)(e(...t))}function De(e){return(...t)=>(0,y.MaybePopulatedArray)(e(...t))}function Y(e){return(...t)=>e(...t)[0]}function Te(e){return e[0]}function Z(e){return(...t)=>e(...t).map(X)}var q={for:Y(Z(z)),forCta:Y(Z(Ne)),forInput:Y(Z(he)),waitFor:(...e)=>Mt(...e).then(Te),waitForCta:(...e)=>St(...e).then(Te),waitForValue:(...e)=>It(...e).then(Te),waitForDomToIdle:Tt,valueOf:Y(xt),innerText:Y(Pe),matchText:Y(Et),hasContent:Ot};q.when=Le(q.for);q.whenCta=Le(q.forCta);q.whenInput=Le(q.forInput);var V={for:Z(z),forInput:Z(he),forCta:Z(Ne),waitFor:Mt,waitForCta:St,waitForValue:It,waitForDomToIdle:Tt,valueOf:xt,innerText:Pe,matchText:Et,hasContent:Ot};V.when=De(V.for);V.whenCta=De(V.forCta);V.whenInput=De(V.forInput);0&&(module.exports={ViddyError,qsArray,selectorOfElement,serialize,unserialize,viddy,viddyWell});
