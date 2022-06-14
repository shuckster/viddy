/*
 * viddy
 * v1.5.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var Xt=Object.create;var ne=Object.defineProperty,Kt=Object.defineProperties,Yt=Object.getOwnPropertyDescriptor,Zt=Object.getOwnPropertyDescriptors,er=Object.getOwnPropertyNames,se=Object.getOwnPropertySymbols,tr=Object.getPrototypeOf,we=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable;var Be=(e,t,r)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t)=>{for(var r in t||(t={}))we.call(t,r)&&Be(e,r,t[r]);if(se)for(var r of se(t))He.call(t,r)&&Be(e,r,t[r]);return e},F=(e,t)=>Kt(e,Zt(t));var D=(e,t)=>{var r={};for(var n in e)we.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&se)for(var n of se(e))t.indexOf(n)<0&&He.call(e,n)&&(r[n]=e[n]);return r};var V=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),rr=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},ze=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of er(t))!we.call(e,o)&&o!==r&&ne(e,o,{get:()=>t[o],enumerable:!(n=Yt(t,o))||n.enumerable});return e};var nr=(e,t,r)=>(r=e!=null?Xt(tr(e)):{},ze(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),or=e=>ze(ne({},"__esModule",{value:!0}),e);var Te=V((fe,tt)=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});var le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},et=function(){function e(t,r){var n=[],o=!0,i=!1,a=void 0;try{for(var c=t[Symbol.iterator](),s;!(o=(s=c.next()).done)&&(n.push(s.value),!(r&&n.length===r));o=!0);}catch(u){i=!0,a=u}finally{try{!o&&c.return&&c.return()}finally{if(i)throw a}}return n}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();fe.default=br;function br(e,t){if(global.document)return!1;global.document=t.context||function(){for(var n=e;n.parent;)n=n.parent;return n}();var r=Object.getPrototypeOf(global.document);return Object.getOwnPropertyDescriptor(r,"childTags")||Object.defineProperty(r,"childTags",{enumerable:!0,get:function(){return this.children.filter(function(o){return o.type==="tag"||o.type==="script"||o.type==="style"})}}),Object.getOwnPropertyDescriptor(r,"attributes")||Object.defineProperty(r,"attributes",{enumerable:!0,get:function(){var o=this.attribs,i=Object.keys(o),a=i.reduce(function(c,s,u){return c[u]={name:s,value:o[s]},c},{});return Object.defineProperty(a,"length",{enumerable:!1,configurable:!1,value:i.length}),a}}),r.getAttribute||(r.getAttribute=function(n){return this.attribs[n]||null}),r.getElementsByTagName||(r.getElementsByTagName=function(n){var o=[];return H(this.childTags,function(i){(i.name===n||n==="*")&&o.push(i)}),o}),r.getElementsByClassName||(r.getElementsByClassName=function(n){var o=n.trim().replace(/\s+/g," ").split(" "),i=[];return H([this],function(a){var c=a.attribs.class;c&&o.every(function(s){return c.indexOf(s)>-1})&&i.push(a)}),i}),r.querySelectorAll||(r.querySelectorAll=function(n){var o=this;n=n.replace(/(>)(\S)/g,"$1 $2").trim();var i=Or(n),a=i.shift(),c=i.length;return a(this).filter(function(s){for(var u=0;u<c;){if(s=i[u](s,o),!s)return!1;u+=1}return!0})}),r.contains||(r.contains=function(n){var o=!1;return H([this],function(i,a){i===n&&(o=!0,a())}),o}),!0}function Or(e){return e.split(" ").reverse().map(function(t,r){var n=r===0,o=t.split(":"),i=et(o,2),a=i[0],c=i[1],s=null,u=null;if(function(){switch(!0){case/>/.test(a):u=function(l){return function(x){return x(l.parent)&&l.parent}};break;case/^\./.test(a):var b=a.substr(1).split(".");s=function(l){var x=l.attribs.class;return x&&b.every(function(E){return x.indexOf(E)>-1})},u=function(l,x){return n?l.getElementsByClassName(b.join(" ")):typeof l=="function"?l(s):oe(l,x,s)};break;case/^\[/.test(a):var m=a.replace(/\[|\]|"/g,"").split("="),w=et(m,2),v=w[0],d=w[1];s=function(l){var x=Object.keys(l.attribs).indexOf(v)>-1;return!!(x&&(!d||l.attribs[v]===d))},u=function(l,x){if(n){var E=function(){var I=[];return H([l],function(L){s(L)&&I.push(L)}),{v:I}}();if((typeof E=="undefined"?"undefined":le(E))==="object")return E.v}return typeof l=="function"?l(s):oe(l,x,s)};break;case/^#/.test(a):var k=a.substr(1);s=function(l){return l.attribs.id===k},u=function(l,x){if(n){var E=function(){var I=[];return H([l],function(L,Oe){s(L)&&(I.push(L),Oe())}),{v:I}}();if((typeof E=="undefined"?"undefined":le(E))==="object")return E.v}return typeof l=="function"?l(s):oe(l,x,s)};break;case/\*/.test(a):s=function(l){return!0},u=function(l,x){if(n){var E=function(){var I=[];return H([l],function(L){return I.push(L)}),{v:I}}();if((typeof E=="undefined"?"undefined":le(E))==="object")return E.v}return typeof l=="function"?l(s):oe(l,x,s)};break;default:s=function(l){return l.name===a},u=function(l,x){if(n){var E=function(){var I=[];return H([l],function(L){s(L)&&I.push(L)}),{v:I}}();if((typeof E=="undefined"?"undefined":le(E))==="object")return E.v}return typeof l=="function"?l(s):oe(l,x,s)}}}(),!c)return u;var p=c.match(/-(child|type)\((\d+)\)$/),g=p[1],O=parseInt(p[2],10)-1,y=function(m){if(m){var w=m.parent.childTags;g==="type"&&(w=w.filter(s));var v=w.findIndex(function(d){return d===m});if(v===O)return!0}return!1};return function(m){var w=u(m);return n?w.reduce(function(v,d){return y(d)&&v.push(d),v},[]):y(w)&&w}})}function H(e,t){e.forEach(function(r){var n=!0;t(r,function(){return n=!1}),r.childTags&&n&&H(r.childTags,t)})}function oe(e,t,r){for(;e.parent;){if(e=e.parent,r(e))return e;if(e===t)break}return null}tt.exports=fe.default});var pe=V(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.convertNodeList=wr;de.escapeValue=xr;function wr(e){for(var t=e.length,r=new Array(t),n=0;n<t;n++)r[n]=e[n];return r}function xr(e){return e&&e.replace(/['"`\\/:\?&!#$%^()[\]{|}*+;,.<=>@~]/g,"\\$&").replace(/\n/g,"A")}});var ft=V((me,lt)=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.default=Sr;var it=pe(),rt={attribute:function(t){return["style","data-reactid","data-react-checksum"].indexOf(t)>-1}};function Sr(e,t){var r=t.root,n=r===void 0?document:r,o=t.skip,i=o===void 0?null:o,a=t.priority,c=a===void 0?["id","class","href","src"]:a,s=t.ignore,u=s===void 0?{}:s,p=[],g=e,O=p.length,y=!1,b=i&&(Array.isArray(i)?i:[i]).map(function(v){return typeof v!="function"?function(d){return d===v}:v}),m=function(d){return i&&b.some(function(k){return k(d)})};for(Object.keys(u).forEach(function(v){v==="class"&&(y=!0);var d=u[v];typeof d!="function"&&(typeof d=="number"&&(d=d.toString()),typeof d=="string"&&(d=new RegExp((0,it.escapeValue)(d).replace(/\\/g,"\\\\"))),typeof d=="boolean"&&(d=d?/(?:)/:/.^/),u[v]=function(k,h){return d.test(h)})}),y&&function(){var v=u.attribute;u.attribute=function(d,k,h){return u.class(k)||v&&v(d,k,h)}}();g!==n;){if(m(g)!==!0){if(nt(c,g,u,p,n)||ot(g,u,p,n))break;nt(c,g,u,p),p.length===O&&ot(g,u,p),p.length===O&&kr(c,g,u,p)}g=g.parentNode,O=p.length}if(g===n){var w=ut(c,g,u);p.unshift(w)}return p.join(" ")}function nt(e,t,r,n){var o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:t.parentNode,i=at(e,t,r);if(i){var a=o.querySelectorAll(i);if(a.length===1)return n.unshift(i),!0}return!1}function at(e,t,r){for(var n=t.attributes,o=Object.keys(n).sort(function(m,w){var v=e.indexOf(n[m].name),d=e.indexOf(n[w].name);return d===-1?v===-1?0:-1:v-d}),i=0,a=o.length;i<a;i++){var c=o[i],s=n[c],u=s.name,p=(0,it.escapeValue)(s.value),g=r[u]||r.attribute,O=rt[u]||rt.attribute;if(!ct(g,u,p,O)){var y="["+u+'="'+p+'"]';if(/\b\d/.test(p)===!1&&(u==="id"&&(y="#"+p),u==="class")){var b=p.trim().replace(/\s+/g,".");y="."+b}return y}}return null}function ot(e,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:e.parentNode,o=st(e,t);if(o){var i=n.getElementsByTagName(o);if(i.length===1)return r.unshift(o),!0}return!1}function st(e,t){var r=e.tagName.toLowerCase();return ct(t.tag,null,r)?null:r}function kr(e,t,r,n){for(var o=t.parentNode,i=o.childTags||o.children,a=0,c=i.length;a<c;a++){var s=i[a];if(s===t){var u=ut(e,s,r);if(!u)return console.warn(`
          Element couldn't be matched through strict ignore pattern!
        `,s,r,u);var p="> "+u+":nth-child("+(a+1)+")";return n.unshift(p),!0}}return!1}function ut(e,t,r){var n=at(e,t,r);return n||(n=st(t,r)),n}function ct(e,t,r,n){if(!r)return!0;var o=e||n;return o?o(t,r,n):!1}lt.exports=me.default});var Ce=V((he,dt)=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.default=Tr;var Er=Te(),_r=Mr(Er),Ar=pe();function Mr(e){return e&&e.__esModule?e:{default:e}}function Tr(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(Array.isArray(t)||(t=t.length?(0,Ar.convertNodeList)(t):[t]),!t.length||t.some(function(g){return g.nodeType!==1}))throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');var n=(0,_r.default)(t[0],r),o=e.replace(/> /g,">").split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);if(o.length<2)return ve("",e,"",t);for(var i=[o.pop()];o.length>1;){var a=o.pop(),c=o.join(" "),s=i.join(" "),u=c+" "+s,p=document.querySelectorAll(u);p.length!==t.length&&i.unshift(ve(c,a,s,t))}return i.unshift(o[0]),o=i,o[0]=ve("",o[0],o.slice(1).join(" "),t),o[o.length-1]=ve(o.slice(0,-1).join(" "),o[o.length-1],"",t),n&&delete global.document,o.join(" ").replace(/>/g,"> ").trim()}function ve(e,t,r,n){if(e.length&&(e=e+" "),r.length&&(r=" "+r),/\[*\]/.test(t)){var o=t.replace(/=.*$/,"]"),i=""+e+o+r,a=document.querySelectorAll(i);if(re(a,n))t=o;else for(var c=document.querySelectorAll(""+e+o),s=function(){var h=c[u];if(n.some(function(x){return h.contains(x)})){var l=h.tagName.toLowerCase();return i=""+e+l+r,a=document.querySelectorAll(i),re(a,n)&&(t=l),"break"}},u=0,p=c.length;u<p;u++){var i,a,g=s();if(g==="break")break}}if(/>/.test(t)){var O=t.replace(/>/,""),i=""+e+O+r,a=document.querySelectorAll(i);re(a,n)&&(t=O)}if(/:nth-child/.test(t)){var y=t.replace(/nth-child/g,"nth-of-type"),i=""+e+y+r,a=document.querySelectorAll(i);re(a,n)&&(t=y)}if(/\.\S+\.\S+/.test(t)){for(var b=t.trim().split(".").slice(1).map(function(k){return"."+k}).sort(function(k,h){return k.length-h.length});b.length;){var m=t.replace(b.shift(),"").trim(),i=(""+e+m+r).trim();if(!i.length||i.charAt(0)===">"||i.charAt(i.length-1)===">")break;var a=document.querySelectorAll(i);re(a,n)&&(t=m)}if(b=t&&t.match(/\./g),b&&b.length>2)for(var w=document.querySelectorAll(""+e+t),v=function(){var h=w[u];if(n.some(function(x){return h.contains(x)})){var l=h.tagName.toLowerCase();return i=""+e+l+r,a=document.querySelectorAll(i),re(a,n)&&(t=l),"break"}},u=0,p=w.length;u<p;u++){var i,a,d=v();if(d==="break")break}}return t}function re(e,t){var r=e.length;return r===t.length&&t.every(function(n){for(var o=0;o<r;o++)if(e[o]===n)return!0;return!1})}dt.exports=he.default});var Ne=V(ge=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.getCommonAncestor=Cr;ge.getCommonProperties=Nr;function Cr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=t.root,n=r===void 0?document:r,o=[];e.forEach(function(g,O){for(var y=[];g!==n;)g=g.parentNode,y.unshift(g);o[O]=y}),o.sort(function(g,O){return g.length-O.length});for(var i=o.shift(),a=null,c=function(){var O=i[s],y=o.some(function(b){return!b.some(function(m){return m===O})});if(y)return"break";a=O},s=0,u=i.length;s<u;s++){var p=c();if(p==="break")break}return a}function Nr(e){var t={classes:[],attributes:{},tag:null};return e.forEach(function(r){var n=t.classes,o=t.attributes,i=t.tag;if(n!==void 0){var a=r.getAttribute("class");a?(a=a.trim().split(" "),n.length?(n=n.filter(function(s){return a.some(function(u){return u===s})}),n.length?t.classes=n:delete t.classes):t.classes=a):delete t.classes}if(o!==void 0&&function(){var s=r.attributes,u=Object.keys(s).reduce(function(O,y){var b=s[y],m=b.name;return b&&m!=="class"&&(O[m]=b.value),O},{}),p=Object.keys(u),g=Object.keys(o);p.length?g.length?(o=g.reduce(function(O,y){var b=o[y];return b===u[y]&&(O[y]=b),O},{}),Object.keys(o).length?t.attributes=o:delete t.attributes):t.attributes=u:delete t.attributes}(),i!==void 0){var c=r.tagName.toLowerCase();i?c!==i&&delete t.tag:t.tag=c}}),t}});var yt=V(ie=>{"use strict";Object.defineProperty(ie,"__esModule",{value:!0});var Ir=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};ie.getSingleSelector=je;ie.getMultiSelector=gt;ie.default=Rr;var jr=Te(),mt=Ie(jr),Lr=ft(),Pr=Ie(Lr),qr=Ce(),vt=Ie(qr),pt=pe(),ht=Ne();function Ie(e){return e&&e.__esModule?e:{default:e}}function je(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(e.nodeType===3&&(e=e.parentNode),e.nodeType!==1)throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "'+(typeof e=="undefined"?"undefined":Ir(e))+'")');var r=(0,mt.default)(e,t),n=(0,Pr.default)(e,t),o=(0,vt.default)(n,e,t);return r&&delete global.document,o}function gt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(Array.isArray(e)||(e=(0,pt.convertNodeList)(e)),e.some(function(u){return u.nodeType!==1}))throw new Error("Invalid input - only an Array of HTMLElements or representations of them is supported!");var r=(0,mt.default)(e[0],t),n=(0,ht.getCommonAncestor)(e,t),o=je(n,t),i=Fr(e),a=i[0],c=(0,vt.default)(o+" "+a,e,t),s=(0,pt.convertNodeList)(document.querySelectorAll(c));return e.every(function(u){return s.some(function(p){return p===u})})?(r&&delete global.document,c):console.warn(`
      The selected elements can't be efficiently mapped.
      Its probably best to use multiple single selectors instead!
    `,e)}function Fr(e){var t=(0,ht.getCommonProperties)(e),r=t.classes,n=t.attributes,o=t.tag,i=[];if(o&&i.push(o),r){var a=r.map(function(s){return"."+s}).join("");i.push(a)}if(n){var c=Object.keys(n).reduce(function(s,u){return s.push("["+u+'="'+n[u]+'"]'),s},[]).join("");i.push(c)}return i.length,[i.join("")]}function Rr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.length&&!e.name?gt(e,t):je(e,t)}});var wt=V(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.default=N.common=N.optimize=N.getMultiSelector=N.getSingleSelector=N.select=void 0;var Le=yt();Object.defineProperty(N,"getSingleSelector",{enumerable:!0,get:function(){return Le.getSingleSelector}});Object.defineProperty(N,"getMultiSelector",{enumerable:!0,get:function(){return Le.getMultiSelector}});var bt=Ot(Le),Dr=Ce(),$r=Ot(Dr),Wr=Ne(),Br=Hr(Wr);function Hr(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function Ot(e){return e&&e.__esModule?e:{default:e}}N.select=bt.default;N.optimize=$r.default;N.common=Br;N.default=bt.default});var on={};rr(on,{ViddyError:()=>Z,qsArray:()=>W,serialize:()=>Yr,unserialize:()=>Zr,viddy:()=>Jt,viddyWell:()=>nn});module.exports=or(on);var ir=Object.defineProperty;var ar=(e,t)=>{for(var r in t)ir(e,r,{get:t[r],enumerable:!0})},Se={};ar(Se,{instanceOf:()=>ke,isArguments:()=>Ue,isArray:()=>ur,isDate:()=>cr,isFunction:()=>lr,isNumber:()=>dr,isObject:()=>Qe,isPojo:()=>mr,isRegExp:()=>pr,isString:()=>fr});var Ve=Object.prototype,sr=Ve.toString,ue=e=>t=>typeof t===e,ke=e=>t=>t instanceof e,{isArray:ur}=Array,Ue=e=>sr.call(e)==="[object Arguments]",cr=e=>ke(Date)(e)&&!isNaN(e),lr=ue("function"),fr=ue("string"),dr=e=>e===e&&ue("number")(e),Qe=e=>e!==null&&ue("object")(e),pr=ke(RegExp),mr=e=>e===null||!Qe(e)||Ue(e)?!1:Object.getPrototypeOf(e)===Ve,{isArray:M,isDate:sn,isFunction:Q,isNumber:B}=Se,{isPojo:C,isRegExp:$,isString:S,instanceOf:un}=Se;function A(e){return(...t)=>Ee(...t)(e)}var Ee=(...e)=>{let t;return r=>e.find(n=>{let o=n(r),{matched:i,value:a}=o||{};return[i,a].every(Q)?i(r)&&(t=a(r),!0):o&&(t=o)})&&t},T=e=>t=>({matched:()=>!0,value:()=>Q(e)?e(t):e}),xe=e=>t=>r=>({matched:()=>U(e,r,n=>r=n),value:()=>Q(t)?S(r)&&$(e)?t(...vr(r.match(e))):t(r):t}),f=(...e)=>{if(e.length===1){let[t]=e;return xe(t)}if(e.length===2){let[t,r]=e;return xe(t)(r)}if(e.length>2){let t=e.slice(-1)[0],r=e.slice(0,-1);return xe(P(r))(t)}throw new Error("expected 1 or 2 arguments")},vr=e=>{let{groups:t}=e;return t?[t,e]:[e]},U=(e,t,r)=>C(e)?Object.keys(e).every(n=>U(e[n],t==null?void 0:t[n],r)):M(e)?M(t)&&e.length===t.length&&e.every((n,o)=>U(n,t==null?void 0:t[o],r)):Q(e)?e(t,r):S(t)&&$(e)?e.test(t):e===t||[e,t].every(Number.isNaN),ee=(...e)=>(t,r)=>e.length===0||(Q(e[0])?e[0](t):U(e[0],t,r))?(r(t),!0):!1,te=e=>(t,r)=>!U(e,t,r),J=(...e)=>(t,r)=>e.flat().some(n=>U(n,t,r)),P=(...e)=>(t,r)=>e.flat().every(n=>U(n,t,r));var _e=e=>e!==e||!e&&e!==0&&e!==!1||M(e)&&!e.length||C(e)&&!Object.keys(e).length,Je=e=>!_e(e);var Ge=e=>hr(t=>t.includes(e));var hr=e=>(t,r)=>(M(t)||S(t))&&e(t,r);var Ae=e=>S(e)?(t,r)=>t[e]-r[e]:(t,r)=>t-r;function ce(e,t){let[r,n]=gr(e,t);return[(...i)=>(n(),r(...i)),n]}function gr(e,t){let r;return[(...i)=>{r=setTimeout(t,e,...i)},()=>clearTimeout(r)]}var Xe=(...e)=>t=>e.reduceRight((r,n)=>n(r),t);function Me(e,t=new Map){return r=>t.has(r)?t.get(r):t.set(r,e(r)).get(r)}var Ke=(e,t)=>Object.entries(e).reduce((r,[n,o])=>(r[n]=t(o,n),r),{}),K=e=>e,G=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>G(),chain:()=>G(),fork:e=>e(),orElse:e=>e(),ap:()=>G()});G.of=()=>G();var X=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>X(t(e)),chain:t=>t(e),fork:(t,r)=>r(e),orElse:()=>X(e),ap:t=>t.map(e)});X.of=e=>X(e);var yr=(e=t=>t!=null)=>{let t=r=>e(r)?X(r):G();return t.of=r=>t(r),t},Ye=e=>{try{return X(e())}catch(t){return G()}},pn=yr(),Ze=e=>()=>X(e);var St=nr(wt(),1),kt=e=>e instanceof HTMLElement,Et=e=>e.offsetParent!==null,W=e=>Ye(()=>document.querySelectorAll(e)).map(Array.from).orElse(Ze([])).valueOf();function _t(e){let t=[],r=e.parentNode;for(;r&&r!==document;)t.push(r),r=r.parentNode;return t}function At(e){let{top:t,left:r,width:n,height:o}=e.getBoundingClientRect(),i=n/2,a=o/2,c=r+i,s=t+a;return{el:e,x:c,y:s,halfWidth:i,halfHeight:a}}function Mt(e,t){let r=t.x-e.x,n=t.y-e.y,o=xt(r,n,e.x,e.y,e.halfWidth,e.halfHeight),i=xt(-r,-n,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(o.x-i.x,o.y-i.y)}function xt(e,t,r,n,o,i){return Math.abs(t/e)<i/o?{x:r+(e>0?o:-o),y:n+t*o/Math.abs(e)}:{x:r+e*i/Math.abs(t),y:n+(t>0?i:-i)}}function Tt(e){let t=e.toLowerCase();return r=>r.textContent.toLowerCase().includes(t)&&r.innerText.toLowerCase().includes(t)}var Ct=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function ae(e){if(e instanceof Element)return typeof global=="undefined"&&typeof window!="undefined"&&(global=window),(0,St.select)(e)}function Pe(e){return A(e)(f({val:Q})(t=>t.val()),f({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((r,n)=>n.selected?r.concat(n.value):r,[])),f({type:"checkbox",value:Je})(t=>t.checked?t.value:""),f({type:"checkbox"})(t=>t.checked?"checked":""),f({contenteditable:!0})(t=>t.innerHTML),T(t=>t.value))}function qe(e,t){let r=t?new MutationObserver(o):new MutationObserver(n);return r.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>r.disconnect();function n(i){setTimeout(()=>e(i),1)}function o(i){let a=W(t);for(let c of i){let s=c.target;if(a.some(u=>s.contains(u))){setTimeout(()=>e(),1);break}}}}var Nt=(e,t)=>{let[r]=ce(32,t),n=W(e).map(o=>(o.addEventListener("change",r,{passive:!0}),()=>o.removeEventListener("change",r))).concat(()=>document.body.removeEventListener("click",r)).concat(()=>document.body.removeEventListener("keyup",r));return document.body.addEventListener("click",r,{passive:!0}),document.body.addEventListener("keyup",r,{passive:!0}),()=>n.forEach(o=>o())};var jt="body *",Lt=["button","submit","reset","file"],Pt=Lt.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),zr=Lt.map(e=>`input[type=${e}]`).concat("a","button").join(", "),qt=5,Vr=500,Ur=P(M,_e),_=J(S,$),Qr=J(_,C),Jr=J(P(C,{pattern:_}),P(C,{selector:S})),Ft=P(C,{pattern:_,selector:te(S)}),Rt=P(C,{pattern:te(_),selector:te(S)}),Dt=P(C,{selector:te(S),pickParent:te(S)}),Re="|<-REGEXP::FLAGS->|",Gr=P(S,Ge(Re)),Xr=e=>[e.source,e.flags].join(Re),Kr=e=>new RegExp(...e.split(Re)),Yr=(...e)=>JSON.stringify(e,(t,r)=>A(r)(f($)(Xr),T(r))),Zr=e=>JSON.parse(e,(t,r)=>A(r)(f(Gr)(Kr),T(r))),Z=class extends Error{constructor(t,r,{message:n="could not resolve query to any elements"}){let o=c=>`/${c.source}/${c.flags}`,i=(c,s)=>$(s)?o(s):s,a=JSON.stringify(r,i,2);super(`${n}

viddy.${t}(...${a})
`),this.name="ViddyError"}};var z=(...e)=>A(e)(f([_])(Fe),f([_,C])(([t,r])=>q([j({pattern:t},r)])),f([C])(q),T([]));function en(e){return(...t)=>A(t)(f([_])(([r])=>q([{selector:e,near:r}])),f([_,Dt])(([r,n])=>q([{selector:e,near:F(j({},n),{pattern:r})}])),f([Ft])(o=>{var[i]=o,a=i,{pattern:r}=a,n=D(a,["pattern"]);return q([{selector:e,near:F(j({},n),{pattern:r})}])}),f([{selector:S}])(o=>{var[i]=o,a=i,{selector:r}=a,n=D(a,["selector"]);return q([F(j({},n),{selector:r})])}),T([]))}function tn(e){return(...t)=>Xe(r=>r.filter(Ee(f(J(W(e)))(!0))))(A(t)(f([_])(([r])=>q([{containedBy:{selector:e},pattern:r}])),f([_,Dt])(([r,n])=>q([F(j({},n),{containedBy:{selector:e},pattern:r})])),f([Ft])(o=>{var[i]=o,a=i,{pattern:r}=a,n=D(a,["pattern"]);return q([F(j({},n),{containedBy:{selector:e},pattern:r})])}),f([Rt])(([r])=>q([F(j({},r),{containedBy:{selector:e}})])),f([{selector:S}])(o=>{var[i]=o,a=i,{selector:r}=a,n=D(a,["selector"]);return q([F(j({},n),{selector:r})])}),T(q([{selector:e}]))))}var be=en(Pt),De=tn(zr);function Fe([e,t=jt]){let r=A(e)(f($)(Ct),T(Tt)),n=W(t).filter(kt).filter(Et).filter(r);return n.filter(o=>n.filter(a=>a!==o).every(a=>!o.contains(a)))}function q([e]){return A(e)(f({pattern:_,selector:S})(o=>{var i=o,{pattern:t,selector:r}=i,n=D(i,["pattern","selector"]);return ye(Fe([t,r]),n)}),f({pattern:_})(n=>{var o=n,{pattern:t}=o,r=D(o,["pattern"]);return ye(Fe([t]),r)}),f({selector:S})(n=>{var o=n,{selector:t}=o,r=D(o,["selector"]);return ye(W(t),r)}),T(()=>ye(W(jt),e)))}var rn=e=>j(j({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,r)=>F(j({},t),{[r]:A(e[r])(f(Qr)(z),f(M)(n=>z(...n)),T(null))}),{}));function ye(e,t={}){let b=rn(t),{near:r,containedBy:n,pickParent:o}=b,i=D(b,["near","containedBy","pickParent"]),a=Object.keys(i).length>0,c=Me(At),s=Me(_t),u=({depth:m},w,[v])=>m===v.depth,p=M(n)?m=>{let w=m.map(s),v=d=>k=>k.map((h,l)=>({contained:h.contains(d),depth:l,el:d})).filter(({contained:h})=>h)[0];return d=>w.map(v(d))[0]}:()=>m=>({depth:0,el:m}),g=a?m=>{let{above:w,below:v,leftOf:d,rightOf:k}=Ke(m,h=>M(h)?h.map(c):h);return h=>{let l=R=>R.filter(Gt=>Gt.el!==h),x=c(h),E=!M(w)||l(w).every(R=>R.y>x.y),I=!M(v)||l(v).every(R=>R.y<x.y),L=!M(d)||l(d).every(R=>R.x>x.x),Oe=!M(k)||l(k).every(R=>R.x<x.x);return E&&I&&L&&Oe}}:()=>()=>!0,O=M(r)?m=>{let w=m.map(c);return v=>{let d=w.filter(h=>h.el!==v),k=c(v);return d.map(h=>({from:v,distance:Mt(h,k)}))[0]}}:()=>m=>({distance:0,from:m}),y=S(o)?m=>{let w=W(m);return v=>s(v).find(d=>w.includes(d))}:()=>K;return e.map(p(n)).filter(Boolean).sort(Ae("depth")).filter(u).map(({el:m})=>m).filter(g(i)).map(O(r)).filter(Boolean).sort(Ae("distance")).map(({from:m})=>m).map(y(o)).filter(Boolean)}function $t(...e){return!!z(...e)[0]}function Wt(...e){return z(...e).map(ae)}function Bt(...e){return be(...e).map(Pe)}function $e(...e){return z(...e).map(t=>t.innerText)}function Ht(e,...t){let r=A(t)(f(Ur)(()=>[e]),f([M])(([n])=>n),f([_])(([n])=>({pattern:n})),f([Rt])(([n])=>[F(j({},n),{pattern:e})]),T(()=>t));return $e(...r).map(n=>A(e)(f($)(o=>{var a;let i=(a=n.match(o))!=null?a:[void 0];return i.length>1||i.groups!==void 0?i:i[0]}),f(S)(n),T(null))).filter(J(S,M))}function We(e="baseWaitFor",t,...r){let n=A(r)(f([{timeoutInMs:ee(B)}])(K),f([_,{timeoutInMs:ee(B)}])(K),f([_,_,{timeoutInMs:ee(B)}])(K),T(qt*1e3)),o=new Z(e,r,{message:`timed out after ${n}ms trying to resolve query`});return new Promise((i,a)=>{let c=b=>(i(b),g()),s=()=>(a(o),g()),u=t({done:c,args:r}),p=setTimeout(s,n),g=()=>{clearTimeout(p),y(),O()},O=Nt(Pt,u),y=qe(u);u()})}function zt(...e){return We("waitFor",t,...e);function t({args:r,done:n}){return()=>{let o=z(...r);o.length&&n(o.map(ae))}}}function Vt(...e){return We("waitForCta",t,...e);function t({args:r,done:n}){return()=>{let o=De(...r);o.length&&n(o.map(ae))}}}function Ut(e,...t){if(!t.length)throw new Z("waitForValue",t,{message:"no query specified"});return We("waitForValue",r,e,...t);function r({args:n,done:o}){return()=>{let i=be(...n.slice(1)).map(a=>({el:a,value:Pe(a)})).filter(({value:a})=>A([e,a])(f([$,S])(([c])=>c.test(a)),f([S,S])(([c])=>c.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);i.length&&o(i.map(ae))}}}var It=J(P(C,{withinMs:B}),P(C,{timeoutInMs:B}),P(C,{withinMs:B,timeoutInMs:B}));function Qt(...e){let t=A(e)(f([ee(It)])(K),f([_,ee(It)])(K),T({})),{withinMs:r=Vr}=t,{timeoutInMs:n=qt*1e3}=t,o=Math.max(n,r+16),i=new Z("waitForIdle",e,{message:`timed out after ${o}ms waiting for DOM idle`}),a=A(e)(f([_])(!0),f([Jr])(!0),f([_,C])(!0),T(!1)),c=a&&Jt.selectorOf(...e);if(a&&!c)throw new Z("waitForIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((s,u)=>{let p=()=>(s(),m()),O=setTimeout(()=>(u(i),m()),o),[y,b]=ce(r,p),m=()=>{clearTimeout(O),b(),w()},w=qe(y,c);y()})}function Y(e){return(...t)=>e(...t)[0]}var Jt={for:Y(z),forCta:Y(De),forInput:Y(be),selectorOf:Y(Wt),valueOf:Y(Bt),waitFor:(...e)=>zt(...e).then(t=>t[0]),waitForCta:(...e)=>Vt(...e).then(t=>t[0]),waitForValue:(...e)=>Ut(...e).then(t=>t[0]),waitForIdle:Qt,innerText:Y($e),matchText:Y(Ht),hasContent:$t},nn={for:z,forInput:be,forCta:De,selectorOf:Wt,valueOf:Bt,waitFor:zt,waitForCta:Vt,waitForValue:Ut,waitForIdle:Qt,innerText:$e,matchText:Ht,hasContent:$t};0&&(module.exports={ViddyError,qsArray,serialize,unserialize,viddy,viddyWell});
