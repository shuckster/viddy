/*
 * viddy
 * v2.2.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var Ft=Object.create;var he=Object.defineProperty,Lt=Object.defineProperties,Dt=Object.getOwnPropertyDescriptor,Rt=Object.getOwnPropertyDescriptors,jt=Object.getOwnPropertyNames,ne=Object.getOwnPropertySymbols,kt=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var Re=(e,t,n)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,p=(e,t)=>{for(var n in t||(t={}))pe.call(t,n)&&Re(e,n,t[n]);if(ne)for(var n of ne(t))je.call(t,n)&&Re(e,n,t[n]);return e},A=(e,t)=>Lt(e,Rt(t));var D=(e,t)=>{var n={};for(var r in e)pe.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&ne)for(var r of ne(e))t.indexOf(r)<0&&je.call(e,r)&&(n[r]=e[r]);return n};var qt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var _t=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of jt(t))!pe.call(e,o)&&o!==n&&he(e,o,{get:()=>t[o],enumerable:!(r=Dt(t,o))||r.enumerable});return e};var ke=(e,t,n)=>(n=e!=null?Ft(kt(e)):{},_t(t||!e||!e.__esModule?he(n,"default",{value:e,enumerable:!0}):n,e));var Oe=qt((Xn,Qe)=>{var cn=(...e)=>t=>e.reduceRight((n,r)=>r(n),t);function un(e,t=new Map){return n=>t.has(n)?t.get(n):t.set(n,e(n)).get(n)}function fn(e){return t=>(e(t),t)}var mn=(e,t)=>Object.entries(e).reduce((n,[r,o])=>(n[r]=t(o,r),n),{}),dn=e=>e,N=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>N(),chain:()=>N(),exists:()=>N(),fork:e=>e(),orElse:e=>e(),absent:e=>T(e()),ap:()=>N()});N.of=()=>N();var T=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>T(t(e)),chain:t=>t(e),exists:t=>T(t(e)),fork:(t,n)=>n(e),orElse:()=>T(e),absent:()=>T(e),ap:t=>t.map(e)});T.of=e=>T(e);var we=(e=t=>t!=null)=>{let t=n=>e(n)?T(n):N();return t.of=n=>t(n),t},hn=e=>{try{return T(e())}catch(t){return N()}},pn=we(),yn=we(e=>Array.isArray(e)&&e.length>0),gn=e=>()=>T(e),vn=()=>()=>N();Qe.exports={compose:cn,memo:un,aside:fn,mapOverObjectValues:mn,Identity:dn,Nothing:N,Just:T,safe:we,maybeTry:hn,Maybe:pn,MaybePopulatedArray:yn,just:gn,nothing:vn}});var Wt=Object.defineProperty;var $t=(e,t)=>{for(var n in t)Wt(e,n,{get:t[n],enumerable:!0})},re={};$t(re,{instanceOf:()=>V,isArguments:()=>$e,isArray:()=>Ut,isDate:()=>Ht,isFormData:()=>Yt,isFunction:()=>Be,isIterable:()=>Xt,isMap:()=>Gt,isNumber:()=>Vt,isObject:()=>Ue,isPojo:()=>Kt,isRegExp:()=>Jt,isSet:()=>Qt,isString:()=>zt});var We=Object.prototype,Bt=We.toString,oe=e=>t=>typeof t===e,V=e=>t=>t instanceof e,{isArray:Ut}=Array,$e=e=>Bt.call(e)==="[object Arguments]",Ht=e=>V(Date)(e)&&!isNaN(e),Be=oe("function"),zt=oe("string"),Vt=e=>e===e&&oe("number")(e),Ue=e=>e!==null&&oe("object")(e),Jt=V(RegExp),Qt=V(Set),Gt=V(Map),Kt=e=>e===null||!Ue(e)||$e(e)?!1:Object.getPrototypeOf(e)===We,Xt=e=>e!=null&&[e[Symbol.iterator],e.next].every(Be),Yt=e=>typeof FormData!="undefined"&&V(FormData)(e),{isArguments:Zt,isArray:b,isDate:Un,isFunction:$,isNumber:j}=re,{isPojo:O,isRegExp:R,isString:f,instanceOf:Hn}=re,{isMap:en,isSet:tn,isIterable:nn,isFormData:rn}=re,{keys:He,entries:zn,assign:Vn}=Object,qe=2e4;function g(e){return(...t)=>ge(...t)(e)}var ge=(...e)=>t=>{let[n,r]=Zt(t)?[{},Array.from(t)]:en(t)||rn(t)?[{isMap:!0},t.entries()]:tn(t)?[{isSet:!0},t.values()]:[{},t];if(!nn(r))return _e(...e)(r).result;let[o,s]=e.reduce(([a,u],c)=>on(c)?[c,u]:[a,[...u,c]],[()=>({value:()=>{}}),[]]),i=[];do{let{value:a,done:u}=r.next();if(u)return o().value();i.push(a);let{found:c,result:m}=_e(...s)(n.isSet?a:n.isMap?{key:a[0],value:a[1]}:[...i]);if(c)return m}while(i.length<qe||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${qe}. Use setIterationLimit(Infinity) to disable.`)},_e=(...e)=>{let t;return n=>({found:!!e.find(r=>{let o=r(n),{matched:s,value:i}=o||{};return[s,i].every($)?s(n)&&(t=i(n),!0):o&&(t=o)}),result:t})},ze=Symbol("@@match-iz/otherwise"),on=e=>(e==null?void 0:e[ze])===!0,w=e=>{let t=n=>({matched:()=>!0,value:()=>$(e)?e(n):e});return t[ze]=!0,t},ye=e=>t=>n=>({matched:()=>W(e,n,r=>n=r),value:()=>$(t)?f(n)&&R(e)?t(...sn(n.match(e))):t(n):t}),l=(...e)=>{if(e.length===1){let[t]=e;return ye(t)}if(e.length===2){let[t,n]=e;return ye(t)(n)}if(e.length>2){let t=e.slice(-1)[0],n=e.slice(0,-1);return ye(S(n))(t)}throw new Error("Expected at least 1 argument")},sn=e=>{let{groups:t}=e;return t?[t,e]:[e]},W=(e,t,n)=>O(e)?He(e).every(r=>W(e[r],t==null?void 0:t[r],n)):b(e)?b(t)&&e.length===t.length&&e.every((r,o)=>W(r,t==null?void 0:t[o],n)):$(e)?e(t,n):f(t)&&R(e)?e.test(t):e===t||[e,t].every(Number.isNaN),J=(...e)=>(t,n)=>e.length===0||($(e[0])?e[0](t):W(e[0],t,n))?(n(t),!0):!1;var Q=e=>(t,n)=>!W(e,t,n),B=(...e)=>(t,n)=>e.flat().some(r=>W(r,t,n)),S=(...e)=>(t,n)=>e.flat().every(r=>W(r,t,n));var ve=e=>e!==e||!e&&e!==0&&e!==!1||b(e)&&!e.length||O(e)&&!He(e).length,Ve=e=>!ve(e);var Je=e=>an(t=>t.includes(e));var an=e=>(t,n)=>(b(t)||f(t))&&e(t,n);var be=e=>f(e)?(t,n)=>t[e]-n[e]:(t,n)=>t-n;function se(e,t){let[n,r]=ln(e,t);return[(...s)=>(r(),n(...s)),r]}function ln(e,t){let n;return[(...s)=>{n=setTimeout(t,e,...s)},()=>clearTimeout(n)]}var y=ke(Oe(),1);var fe=ke(Oe(),1);var P,Me,Ee;function Ye(e,t){if(e.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(e.tagName.toLowerCase()==="html")return"html";let n={root:document.body,idName:o=>!0,className:o=>!0,tagName:o=>!0,attr:(o,s)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4};P=p(p({},n),t),Me=bn(P.root,n),Ee=new Map;let r=ie(e,"all",()=>ie(e,"two",()=>ie(e,"one",()=>ie(e,"none"))));if(r){let o=tt(nt(r,e));return o.length>0&&(r=o[0]),ue(r)}else throw new Error("Selector was not found.")}function bn(e,t){return e.nodeType===Node.DOCUMENT_NODE?e:e===t.root?e.ownerDocument:e}function ie(e,t,n){let r=null,o=[],s=e,i=0;for(;s;){let a=le(wn(s))||le(...On(s))||le(...xn(s))||le(En(s))||[Xe()],u=Mn(s);if(t=="all")u&&(a=a.concat(a.filter(xe).map(c=>ae(c,u))));else if(t=="two")a=a.slice(0,1),u&&(a=a.concat(a.filter(xe).map(c=>ae(c,u))));else if(t=="one"){let[c]=a=a.slice(0,1);u&&xe(c)&&(a=[ae(c,u)])}else t=="none"&&(a=[Xe()],u&&(a=[ae(a[0],u)]));for(let c of a)c.level=i;if(o.push(a),o.length>=P.seedMinLength&&(r=Ge(o,n),r))break;s=s.parentElement,i++}return r||(r=Ge(o,n)),!r&&n?n():r}function Ge(e,t){let n=tt(et(e));if(n.length>P.threshold)return t?t():null;for(let r of n)if(Ze(r))return r;return null}function ue(e){let t=e[0],n=t.name;for(let r=1;r<e.length;r++){let o=e[r].level||0;t.level===o-1?n=`${e[r].name} > ${n}`:n=`${e[r].name} ${n}`,t=e[r]}return n}function Ke(e){return e.map(t=>t.penalty).reduce((t,n)=>t+n,0)}function Ze(e){let t=ue(e);switch(Me.querySelectorAll(t).length){case 0:throw new Error(`Can't select any node with this selector: ${t}`);case 1:return Ee.set(t,!0),!0;default:return Ee.set(t,!1),!1}}function wn(e){let t=e.getAttribute("id");return t&&P.idName(t)?{name:"#"+ce(t,{isIdentifier:!0}),penalty:0}:null}function On(e){return Array.from(e.attributes).filter(n=>P.attr(n.name,n.value)).map(n=>({name:"["+ce(n.name,{isIdentifier:!0})+'="'+ce(n.value)+'"]',penalty:.5}))}function xn(e){return Array.from(e.classList).filter(P.className).map(n=>({name:"."+ce(n,{isIdentifier:!0}),penalty:1}))}function En(e){let t=e.tagName.toLowerCase();return P.tagName(t)?{name:t,penalty:2}:null}function Xe(){return{name:"*",penalty:3}}function Mn(e){let t=e.parentNode;if(!t)return null;let n=t.firstChild;if(!n)return null;let r=0;for(;n&&(n.nodeType===Node.ELEMENT_NODE&&r++,n!==e);)n=n.nextSibling;return r}function ae(e,t){return{name:e.name+`:nth-child(${t})`,penalty:e.penalty+1}}function xe(e){return e.name!=="html"&&!e.name.startsWith("#")}function le(...e){let t=e.filter(Sn);return t.length>0?t:null}function Sn(e){return e!=null}function*et(e,t=[]){if(e.length>0)for(let n of e[0])yield*et(e.slice(1,e.length),t.concat(n));else yield t}function tt(e){return[...e].sort((t,n)=>Ke(t)-Ke(n))}function*nt(e,t,n={counter:0,visited:new Map}){if(e.length>2&&e.length>P.optimizedMinLength)for(let r=1;r<e.length-1;r++){if(n.counter>P.maxNumberOfTries)return;n.counter+=1;let o=[...e];o.splice(r,1);let s=ue(o);if(n.visited.has(s))return;Ze(o)&&In(o,t)&&(yield o,n.visited.set(s,!0),yield*nt(o,t,n))}}function In(e,t){return Me.querySelector(ue(e))===t}var Tn=/[ -,\.\/:-@\[-\^`\{-~]/,Cn=/[ -,\.\/:-@\[\]\^`\{-~]/,An=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,Nn={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1};function ce(e,t={}){let n=p(p({},Nn),t);n.quotes!="single"&&n.quotes!="double"&&(n.quotes="single");let r=n.quotes=="double"?'"':"'",o=n.isIdentifier,s=e.charAt(0),i="",a=0,u=e.length;for(;a<u;){let c=e.charAt(a++),m=c.charCodeAt(0),v;if(m<32||m>126){if(m>=55296&&m<=56319&&a<u){let F=e.charCodeAt(a++);(F&64512)==56320?m=((m&1023)<<10)+(F&1023)+65536:a--}v="\\"+m.toString(16).toUpperCase()+" "}else n.escapeEverything?Tn.test(c)?v="\\"+c:v="\\"+m.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(c)?v="\\"+m.toString(16).toUpperCase()+" ":c=="\\"||!o&&(c=='"'&&r==c||c=="'"&&r==c)||o&&Cn.test(c)?v="\\"+c:v=c;i+=v}return o&&(/^-[-\d]/.test(i)?i="\\-"+i.slice(1):/\d/.test(s)&&(i="\\3"+s+" "+i.slice(1))),i=i.replace(An,function(c,m,v){return m&&m.length%2?c:(m||"")+v}),!o&&n.wrap?r+i+r:i}var ot=e=>e instanceof HTMLElement,st=e=>e.offsetParent!==null,k=e=>(0,fe.maybeTry)(()=>document.querySelectorAll(e)).map(Array.from).orElse((0,fe.just)([])).valueOf();function it(e){let t=[],n=e.parentNode;for(;n&&n!==document;)t.push(n),n=n.parentNode;return t}function at(e){let{top:t,left:n,width:r,height:o}=e.getBoundingClientRect(),s=r/2,i=o/2,a=n+s,u=t+i;return{el:e,x:a,y:u,halfWidth:s,halfHeight:i}}function lt(e,t){let n=t.x-e.x,r=t.y-e.y,o=rt(n,r,e.x,e.y,e.halfWidth,e.halfHeight),s=rt(-n,-r,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-s.x,o.y-s.y)}function rt(e,t,n,r,o,s){return Math.abs(t/e)<s/o?{x:n+(e>0?o:-o),y:r+t*o/Math.abs(e)}:{x:n+e*s/Math.abs(t),y:r+(t>0?s:-s)}}function ct(e){let t=e.toLowerCase();return n=>n.textContent.toLowerCase().includes(t)&&n.innerText.toLowerCase().includes(t)}var ut=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function ee(e){if(e instanceof Element)return typeof global=="undefined"&&typeof window!="undefined"&&(global=window),Ye(e)}function Se(e){return g(e)(l({val:$})(t=>t.val()),l({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((n,r)=>r.selected?n.concat(r.value):n,[])),l({type:"checkbox",value:Ve})(t=>t.checked?t.value:""),l({type:"checkbox"})(t=>t.checked?"checked":""),l({contenteditable:!0})(t=>t.innerHTML),w(t=>t.value))}function Ie(e,t){let n=t?new MutationObserver(o):new MutationObserver(r);return n.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>n.disconnect();function r(s){setTimeout(()=>e(s),1)}function o(s){let i=k(t);for(let a of s){let u=a.target;if(i.some(c=>u.contains(c))){setTimeout(()=>e(),1);break}}}}var ft=(e,t)=>{let[n,r]=se(32,t),o=k(e).map(s=>(s.addEventListener("change",n,{passive:!0}),()=>s.removeEventListener("change",n))).concat(()=>document.body.removeEventListener("click",n)).concat(()=>document.body.removeEventListener("keyup",n)).concat(r);return document.body.addEventListener("click",n,{passive:!0}),document.body.addEventListener("keyup",n,{passive:!0}),()=>o.forEach(s=>s())};var dt="body *",ht=["button","submit","reset","file"],pt=ht.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),Pn=ht.map(e=>`input[type=${e}]`).concat("a","button").join(", "),yt=5,Fn=500,Ln=S(b,ve),h=B(f,R),Dn=B(h,O),Rn=B(S(O,{pattern:h}),S(O,{selector:f})),gt=S(O,{pattern:h,selector:Q(f)}),vt=S(O,{pattern:Q(h),selector:Q(f)}),bt=S(O,{selector:Q(f),pickParent:Q(f)}),Ae="|<-REGEXP::FLAGS->|",jn=S(f,Je(Ae)),kn=e=>[e.source,e.flags].join(Ae),qn=e=>new RegExp(...e.split(Ae)),ur=(...e)=>JSON.stringify(e,(t,n)=>g(n)(l(R)(kn),w(n))),fr=e=>JSON.parse(e,(t,n)=>g(n)(l(jn)(qn),w(n)));var X=class extends Error{constructor(t,n=[],{message:r="could not resolve query to any elements"}={}){let o=a=>`/${a.source}/${a.flags}`,i=JSON.stringify(n,(a,u)=>R(u)?o(u):u,2).slice(1,-1);super(`${r}

viddy.${t}(${i})
`),this.name="ViddyError"}},U=(...e)=>g(e)(l([h])(Ce),l([h,O])(([t,n])=>I([p({pattern:t},n)])),l([O])(I),w([]));function _n(e){return(...t)=>g(t)(l([h])(([n])=>I([{selector:e,near:n}])),l([h,bt])(([n,r])=>I([{selector:e,near:A(p({},r),{pattern:n})}])),l([gt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=D(i,["pattern"]);return I([{selector:e,near:A(p({},r),{pattern:n})}])}),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=D(i,["selector"]);return I([A(p({},r),{selector:n})])}),w([]))}function Wn(e){return(...t)=>(0,y.compose)(n=>n.filter(ge(l(B(k(e)),!0))))(g(t)(l([h])(([n])=>I([{containedBy:{selector:e},pattern:n}])),l([h,bt])(([n,r])=>I([A(p({},r),{containedBy:{selector:e},pattern:n})])),l([gt])(o=>{var[s]=o,i=s,{pattern:n}=i,r=D(i,["pattern"]);return I([A(p({},r),{containedBy:{selector:e},pattern:n})])}),l([vt])(([n])=>I([A(p({},n),{containedBy:{selector:e}})])),l([{selector:f}])(o=>{var[s]=o,i=s,{selector:n}=i,r=D(i,["selector"]);return I([A(p({},r),{selector:n})])}),w(I([{selector:e}]))))}var de=_n(pt),Ne=Wn(Pn);function Ce([e,t=dt]){let n=g(e)(l(R)(ut),w(ct)),r=k(t).filter(ot).filter(st).filter(n);return r.filter(o=>r.filter(i=>i!==o).every(i=>!o.contains(i)))}function I([e]){return g(e)(l({pattern:h,selector:f})(o=>{var s=o,{pattern:t,selector:n}=s,r=D(s,["pattern","selector"]);return me(Ce([t,n]),r)}),l({pattern:h})(r=>{var o=r,{pattern:t}=o,n=D(o,["pattern"]);return me(Ce([t]),n)}),l({selector:f})(r=>{var o=r,{selector:t}=o,n=D(o,["selector"]);return me(k(t),n)}),w(()=>me(k(dt),e)))}var $n=e=>p(p({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,n)=>A(p({},t),{[n]:g(e[n])(l(Dn)(U),l(b)(r=>U(...r)),w(null))}),{}));function me(e,t={}){let q=$n(t),{near:n,containedBy:r,pickParent:o}=q,s=D(q,["near","containedBy","pickParent"]),i=Object.keys(s).length>0,a=(0,y.memo)(at),u=(0,y.memo)(it),c=({depth:d},C,[E])=>d===E.depth,m=b(r)?d=>{let C=d.map(u),E=M=>_=>_.map((x,z)=>({contained:x.contains(M),depth:z,el:M})).filter(({contained:x})=>x)[0];return M=>C.map(E(M))[0]}:()=>d=>({depth:0,el:d}),v=i?d=>{let{above:C,below:E,leftOf:M,rightOf:_}=(0,y.mapOverObjectValues)(d,x=>b(x)?x.map(a):x);return x=>{let z=L=>L.filter(Pt=>Pt.el!==x),te=a(x),Tt=!b(C)||C.length>0&&z(C).every(L=>L.y>te.y),Ct=!b(E)||E.length>0&&z(E).every(L=>L.y<te.y),At=!b(M)||M.length>0&&z(M).every(L=>L.x>te.x),Nt=!b(_)||_.length>0&&z(_).every(L=>L.x<te.x);return Tt&&Ct&&At&&Nt}}:()=>()=>!0,F=b(n)?d=>{let C=d.map(a);return E=>{let M=C.filter(x=>x.el!==E),_=a(E);return M.map(x=>({from:E,distance:lt(x,_)}))[0]}}:()=>d=>({distance:0,from:d}),Z=f(o)?d=>{let C=k(d);return E=>u(E).find(M=>C.includes(M))}:()=>y.Identity;return e.map(m(r)).filter(Boolean).sort(be("depth")).filter(c).map(({el:d})=>d).filter(v(s)).map(F(n)).filter(Boolean).sort(be("distance")).map(({from:d})=>d).map(Z(o)).filter(Boolean)}function wt(...e){return!!U(...e)[0]}function Ot(...e){return de(...e).map(Se)}function Pe(...e){return U(...e).map(t=>t.innerText)}function xt(e,...t){let n=g(t)(l(Ln)(()=>[e]),l([b])(([r])=>r),l([h])(([r])=>({pattern:r})),l([vt])(([r])=>[A(p({},r),{pattern:e})]),w(()=>t));return Pe(...n).map(r=>g(e)(l(R)(o=>{var i;let s=(i=r.match(o))!=null?i:[void 0];return s.length>1||s.groups!==void 0?s:s[0]}),l(f)(r),w(null))).filter(B(f,b))}function Fe(e="baseWaitFor",t,...n){let r=g(n)(l([{timeoutInMs:J(j)}])(y.Identity),l([h,{timeoutInMs:J(j)}])(y.Identity),l([h,h,{timeoutInMs:J(j)}])(y.Identity),w(yt*1e3)),o=new X(e,n,{message:`timed out after ${r}ms trying to resolve query`});return new Promise((s,i)=>{let a=q=>(s(q),v()),u=()=>(i(o),v()),c=t({done:a,args:n}),m=setTimeout(u,r),v=()=>{clearTimeout(m),Z(),F()},F=ft(pt,c),Z=Ie(c);c()})}function Et(...e){return Fe("waitFor",t,...e);function t({args:n,done:r}){return()=>{let o=U(...n);o.length&&r(o.map(ee))}}}function Mt(...e){return Fe("waitForCta",t,...e);function t({args:n,done:r}){return()=>{let o=Ne(...n);o.length&&r(o.map(ee))}}}function St(e,...t){if(!t.length)throw new X("waitForValue",t,{message:"no query specified"});return Fe("waitForValue",n,e,...t);function n({args:r,done:o}){return()=>{let s=de(...r.slice(1)).map(i=>({el:i,value:Se(i)})).filter(({value:i})=>g([e,i])(l([R,f])(([a])=>a.test(i)),l([f,f])(([a])=>a.toLowerCase()===i.toLowerCase()))).map(({el:i})=>i);s.length&&o(s.map(ee))}}}var mt=B(S(O,{withinMs:j}),S(O,{timeoutInMs:j}),S(O,{withinMs:j,timeoutInMs:j}));function It(...e){let{withinMs:t=Fn,timeoutInMs:n=yt*1e3}=g(e)(l([J(mt)])(y.Identity),l([h,J(mt)])(y.Identity),w({})),r=Math.max(n,t+16),o=new X("waitForDomToIdle",e,{message:`timed out after ${r}ms waiting for DOM idle`}),s=g(e)(l([h])(!0),l([Rn])(!0),l([h,O])(!0),w(!1)),i=s&&H.for(...e);if(s&&!i)throw new X("waitForDomToIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((a,u)=>{let c=()=>(a(),q()),v=setTimeout(()=>(u(o),q()),r),[F,Z]=se(t,c),q=()=>{clearTimeout(v),Z(),d()},d=Ie(F,i);F()})}function Le(e){return(...t)=>(0,y.Maybe)(e(...t))}function De(e){return(...t)=>(0,y.MaybePopulatedArray)(e(...t))}function G(e){return(...t)=>e(...t)[0]}function Te(e){return e[0]}function K(e){return(...t)=>e(...t).map(ee)}var H={for:G(K(U)),forCta:G(K(Ne)),forInput:G(K(de)),waitFor:(...e)=>Et(...e).then(Te),waitForCta:(...e)=>Mt(...e).then(Te),waitForValue:(...e)=>St(...e).then(Te),waitForDomToIdle:It,valueOf:G(Ot),innerText:G(Pe),matchText:G(xt),hasContent:wt};H.when=Le(H.for);H.whenCta=Le(H.forCta);H.whenInput=Le(H.forInput);var Y={for:K(U),forInput:K(de),forCta:K(Ne),waitFor:Et,waitForCta:Mt,waitForValue:St,waitForDomToIdle:It,valueOf:Ot,innerText:Pe,matchText:xt,hasContent:wt};Y.when=De(Y.for);Y.whenCta=De(Y.forCta);Y.whenInput=De(Y.forInput);export{X as ViddyError,k as qsArray,ee as selectorOfElement,ur as serialize,fr as unserialize,H as viddy,Y as viddyWell};
