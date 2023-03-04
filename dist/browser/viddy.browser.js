/*
 * viddy
 * v2.1.0
 * https://github.com/shuckster/viddy
 * License: MIT
 */
var libViddy=(()=>{var rr=Object.create;var ae=Object.defineProperty,nr=Object.defineProperties,ir=Object.getOwnPropertyDescriptor,or=Object.getOwnPropertyDescriptors,ar=Object.getOwnPropertyNames,ce=Object.getOwnPropertySymbols,sr=Object.getPrototypeOf,Ee=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var ze=(e,t,r)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,L=(e,t)=>{for(var r in t||(t={}))Ee.call(t,r)&&ze(e,r,t[r]);if(ce)for(var r of ce(t))Ve.call(t,r)&&ze(e,r,t[r]);return e},F=(e,t)=>nr(e,or(t));var R=(e,t)=>{var r={};for(var n in e)Ee.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&ce)for(var n of ce(e))t.indexOf(n)<0&&Ve.call(e,n)&&(r[n]=e[n]);return r};var z=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ur=(e,t)=>{for(var r in t)ae(e,r,{get:t[r],enumerable:!0})},Ue=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ar(t))!Ee.call(e,i)&&i!==r&&ae(e,i,{get:()=>t[i],enumerable:!(n=ir(t,i))||n.enumerable});return e};var cr=(e,t,r)=>(r=e!=null?rr(sr(e)):{},Ue(t||!e||!e.__esModule?ae(r,"default",{value:e,enumerable:!0}):r,e)),lr=e=>Ue(ae({},"__esModule",{value:!0}),e);var Ce=z((me,ut)=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});var de=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},st=function(){function e(t,r){var n=[],i=!0,o=!1,a=void 0;try{for(var c=t[Symbol.iterator](),s;!(i=(s=c.next()).done)&&(n.push(s.value),!(r&&n.length===r));i=!0);}catch(u){o=!0,a=u}finally{try{!i&&c.return&&c.return()}finally{if(o)throw a}}return n}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();me.default=Pr;function Pr(e,t){if(global.document)return!1;global.document=t.context||function(){for(var n=e;n.parent;)n=n.parent;return n}();var r=Object.getPrototypeOf(global.document);return Object.getOwnPropertyDescriptor(r,"childTags")||Object.defineProperty(r,"childTags",{enumerable:!0,get:function(){return this.children.filter(function(i){return i.type==="tag"||i.type==="script"||i.type==="style"})}}),Object.getOwnPropertyDescriptor(r,"attributes")||Object.defineProperty(r,"attributes",{enumerable:!0,get:function(){var i=this.attribs,o=Object.keys(i),a=o.reduce(function(c,s,u){return c[u]={name:s,value:i[s]},c},{});return Object.defineProperty(a,"length",{enumerable:!1,configurable:!1,value:o.length}),a}}),r.getAttribute||(r.getAttribute=function(n){return this.attribs[n]||null}),r.getElementsByTagName||(r.getElementsByTagName=function(n){var i=[];return H(this.childTags,function(o){(o.name===n||n==="*")&&i.push(o)}),i}),r.getElementsByClassName||(r.getElementsByClassName=function(n){var i=n.trim().replace(/\s+/g," ").split(" "),o=[];return H([this],function(a){var c=a.attribs.class;c&&i.every(function(s){return c.indexOf(s)>-1})&&o.push(a)}),o}),r.querySelectorAll||(r.querySelectorAll=function(n){var i=this;n=n.replace(/(>)(\S)/g,"$1 $2").trim();var o=jr(n),a=o.shift(),c=o.length;return a(this).filter(function(s){for(var u=0;u<c;){if(s=o[u](s,i),!s)return!1;u+=1}return!0})}),r.contains||(r.contains=function(n){var i=!1;return H([this],function(o,a){o===n&&(i=!0,a())}),i}),!0}function jr(e){return e.split(" ").reverse().map(function(t,r){var n=r===0,i=t.split(":"),o=st(i,2),a=o[0],c=o[1],s=null,u=null;if(function(){switch(!0){case/>/.test(a):u=function(l){return function(S){return S(l.parent)&&l.parent}};break;case/^\./.test(a):var y=a.substr(1).split(".");s=function(l){var S=l.attribs.class;return S&&y.every(function(M){return S.indexOf(M)>-1})},u=function(l,S){return n?l.getElementsByClassName(y.join(" ")):typeof l=="function"?l(s):se(l,S,s)};break;case/^\[/.test(a):var m=a.replace(/\[|\]|"/g,"").split("="),w=st(m,2),v=w[0],p=w[1];s=function(l){var S=Object.keys(l.attribs).indexOf(v)>-1;return!!(S&&(!p||l.attribs[v]===p))},u=function(l,S){if(n){var M=function(){var N=[];return H([l],function(P){s(P)&&N.push(P)}),{v:N}}();if((typeof M=="undefined"?"undefined":de(M))==="object")return M.v}return typeof l=="function"?l(s):se(l,S,s)};break;case/^#/.test(a):var E=a.substr(1);s=function(l){return l.attribs.id===E},u=function(l,S){if(n){var M=function(){var N=[];return H([l],function(P,xe){s(P)&&(N.push(P),xe())}),{v:N}}();if((typeof M=="undefined"?"undefined":de(M))==="object")return M.v}return typeof l=="function"?l(s):se(l,S,s)};break;case/\*/.test(a):s=function(l){return!0},u=function(l,S){if(n){var M=function(){var N=[];return H([l],function(P){return N.push(P)}),{v:N}}();if((typeof M=="undefined"?"undefined":de(M))==="object")return M.v}return typeof l=="function"?l(s):se(l,S,s)};break;default:s=function(l){return l.name===a},u=function(l,S){if(n){var M=function(){var N=[];return H([l],function(P){s(P)&&N.push(P)}),{v:N}}();if((typeof M=="undefined"?"undefined":de(M))==="object")return M.v}return typeof l=="function"?l(s):se(l,S,s)}}}(),!c)return u;var d=c.match(/-(child|type)\((\d+)\)$/),h=d[1],b=parseInt(d[2],10)-1,O=function(m){if(m){var w=m.parent.childTags;h==="type"&&(w=w.filter(s));var v=w.findIndex(function(p){return p===m});if(v===b)return!0}return!1};return function(m){var w=u(m);return n?w.reduce(function(v,p){return O(p)&&v.push(p),v},[]):O(w)&&w}})}function H(e,t){e.forEach(function(r){var n=!0;t(r,function(){return n=!1}),r.childTags&&n&&H(r.childTags,t)})}function se(e,t,r){for(;e.parent;){if(e=e.parent,r(e))return e;if(e===t)break}return null}ut.exports=me.default});var he=z(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.convertNodeList=qr;ve.escapeValue=Fr;function qr(e){for(var t=e.length,r=new Array(t),n=0;n<t;n++)r[n]=e[n];return r}function Fr(e){return e&&e.replace(/['"`\\/:\?&!#$%^()[\]{|}*+;,.<=>@~]/g,"\\$&").replace(/\n/g,"A")}});var yt=z((ge,gt)=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.default=Dr;var pt=he(),ct={attribute:function(t){return["style","data-reactid","data-react-checksum"].indexOf(t)>-1}};function Dr(e,t){var r=t.root,n=r===void 0?document:r,i=t.skip,o=i===void 0?null:i,a=t.priority,c=a===void 0?["id","class","href","src"]:a,s=t.ignore,u=s===void 0?{}:s,d=[],h=e,b=d.length,O=!1,y=o&&(Array.isArray(o)?o:[o]).map(function(v){return typeof v!="function"?function(p){return p===v}:v}),m=function(p){return o&&y.some(function(E){return E(p)})};for(Object.keys(u).forEach(function(v){v==="class"&&(O=!0);var p=u[v];typeof p!="function"&&(typeof p=="number"&&(p=p.toString()),typeof p=="string"&&(p=new RegExp((0,pt.escapeValue)(p).replace(/\\/g,"\\\\"))),typeof p=="boolean"&&(p=p?/(?:)/:/.^/),u[v]=function(E,g){return p.test(g)})}),O&&function(){var v=u.attribute;u.attribute=function(p,E,g){return u.class(E)||v&&v(p,E,g)}}();h!==n;){if(m(h)!==!0){if(lt(c,h,u,d,n)||ft(h,u,d,n))break;lt(c,h,u,d),d.length===b&&ft(h,u,d),d.length===b&&Rr(c,h,u,d)}h=h.parentNode,b=d.length}if(h===n){var w=vt(c,h,u);d.unshift(w)}return d.join(" ")}function lt(e,t,r,n){var i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:t.parentNode,o=dt(e,t,r);if(o){var a=i.querySelectorAll(o);if(a.length===1)return n.unshift(o),!0}return!1}function dt(e,t,r){for(var n=t.attributes,i=Object.keys(n).sort(function(m,w){var v=e.indexOf(n[m].name),p=e.indexOf(n[w].name);return p===-1?v===-1?0:-1:v-p}),o=0,a=i.length;o<a;o++){var c=i[o],s=n[c],u=s.name,d=(0,pt.escapeValue)(s.value),h=r[u]||r.attribute,b=ct[u]||ct.attribute;if(!ht(h,u,d,b)){var O="["+u+'="'+d+'"]';if(/\b\d/.test(d)===!1&&(u==="id"&&(O="#"+d),u==="class")){var y=d.trim().replace(/\s+/g,".");O="."+y}return O}}return null}function ft(e,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:e.parentNode,i=mt(e,t);if(i){var o=n.getElementsByTagName(i);if(o.length===1)return r.unshift(i),!0}return!1}function mt(e,t){var r=e.tagName.toLowerCase();return ht(t.tag,null,r)?null:r}function Rr(e,t,r,n){for(var i=t.parentNode,o=i.childTags||i.children,a=0,c=o.length;a<c;a++){var s=o[a];if(s===t){var u=vt(e,s,r);if(!u)return console.warn(`
          Element couldn't be matched through strict ignore pattern!
        `,s,r,u);var d="> "+u+":nth-child("+(a+1)+")";return n.unshift(d),!0}}return!1}function vt(e,t,r){var n=dt(e,t,r);return n||(n=mt(t,r)),n}function ht(e,t,r,n){if(!r)return!0;var i=e||n;return i?i(t,r,n):!1}gt.exports=ge.default});var Ie=z((be,bt)=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.default=zr;var $r=Ce(),Wr=Hr($r),Br=he();function Hr(e){return e&&e.__esModule?e:{default:e}}function zr(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(Array.isArray(t)||(t=t.length?(0,Br.convertNodeList)(t):[t]),!t.length||t.some(function(h){return h.nodeType!==1}))throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');var n=(0,Wr.default)(t[0],r),i=e.replace(/> /g,">").split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);if(i.length<2)return ye("",e,"",t);for(var o=[i.pop()];i.length>1;){var a=i.pop(),c=i.join(" "),s=o.join(" "),u=c+" "+s,d=document.querySelectorAll(u);d.length!==t.length&&o.unshift(ye(c,a,s,t))}return o.unshift(i[0]),i=o,i[0]=ye("",i[0],i.slice(1).join(" "),t),i[i.length-1]=ye(i.slice(0,-1).join(" "),i[i.length-1],"",t),n&&delete global.document,i.join(" ").replace(/>/g,"> ").trim()}function ye(e,t,r,n){if(e.length&&(e=e+" "),r.length&&(r=" "+r),/\[*\]/.test(t)){var i=t.replace(/=.*$/,"]"),o=""+e+i+r,a=document.querySelectorAll(o);if(re(a,n))t=i;else for(var c=document.querySelectorAll(""+e+i),s=function(){var g=c[u];if(n.some(function(S){return g.contains(S)})){var l=g.tagName.toLowerCase();return o=""+e+l+r,a=document.querySelectorAll(o),re(a,n)&&(t=l),"break"}},u=0,d=c.length;u<d;u++){var o,a,h=s();if(h==="break")break}}if(/>/.test(t)){var b=t.replace(/>/,""),o=""+e+b+r,a=document.querySelectorAll(o);re(a,n)&&(t=b)}if(/:nth-child/.test(t)){var O=t.replace(/nth-child/g,"nth-of-type"),o=""+e+O+r,a=document.querySelectorAll(o);re(a,n)&&(t=O)}if(/\.\S+\.\S+/.test(t)){for(var y=t.trim().split(".").slice(1).map(function(E){return"."+E}).sort(function(E,g){return E.length-g.length});y.length;){var m=t.replace(y.shift(),"").trim(),o=(""+e+m+r).trim();if(!o.length||o.charAt(0)===">"||o.charAt(o.length-1)===">")break;var a=document.querySelectorAll(o);re(a,n)&&(t=m)}if(y=t&&t.match(/\./g),y&&y.length>2)for(var w=document.querySelectorAll(""+e+t),v=function(){var g=w[u];if(n.some(function(S){return g.contains(S)})){var l=g.tagName.toLowerCase();return o=""+e+l+r,a=document.querySelectorAll(o),re(a,n)&&(t=l),"break"}},u=0,d=w.length;u<d;u++){var o,a,p=v();if(p==="break")break}}return t}function re(e,t){var r=e.length;return r===t.length&&t.every(function(n){for(var i=0;i<r;i++)if(e[i]===n)return!0;return!1})}bt.exports=be.default});var Ne=z(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.getCommonAncestor=Vr;Oe.getCommonProperties=Ur;function Vr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=t.root,n=r===void 0?document:r,i=[];e.forEach(function(h,b){for(var O=[];h!==n;)h=h.parentNode,O.unshift(h);i[b]=O}),i.sort(function(h,b){return h.length-b.length});for(var o=i.shift(),a=null,c=function(){var b=o[s],O=i.some(function(y){return!y.some(function(m){return m===b})});if(O)return"break";a=b},s=0,u=o.length;s<u;s++){var d=c();if(d==="break")break}return a}function Ur(e){var t={classes:[],attributes:{},tag:null};return e.forEach(function(r){var n=t.classes,i=t.attributes,o=t.tag;if(n!==void 0){var a=r.getAttribute("class");a?(a=a.trim().split(" "),n.length?(n=n.filter(function(s){return a.some(function(u){return u===s})}),n.length?t.classes=n:delete t.classes):t.classes=a):delete t.classes}if(i!==void 0&&function(){var s=r.attributes,u=Object.keys(s).reduce(function(b,O){var y=s[O],m=y.name;return y&&m!=="class"&&(b[m]=y.value),b},{}),d=Object.keys(u),h=Object.keys(i);d.length?h.length?(i=h.reduce(function(b,O){var y=i[O];return y===u[O]&&(b[O]=y),b},{}),Object.keys(i).length?t.attributes=i:delete t.attributes):t.attributes=u:delete t.attributes}(),o!==void 0){var c=r.tagName.toLowerCase();o?c!==o&&delete t.tag:t.tag=c}}),t}});var Mt=z(ue=>{"use strict";Object.defineProperty(ue,"__esModule",{value:!0});var Qr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};ue.getSingleSelector=Pe;ue.getMultiSelector=Et;ue.default=Zr;var Jr=Ce(),wt=Le(Jr),Gr=yt(),Xr=Le(Gr),Yr=Ie(),St=Le(Yr),Ot=he(),xt=Ne();function Le(e){return e&&e.__esModule?e:{default:e}}function Pe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(e.nodeType===3&&(e=e.parentNode),e.nodeType!==1)throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "'+(typeof e=="undefined"?"undefined":Qr(e))+'")');var r=(0,wt.default)(e,t),n=(0,Xr.default)(e,t),i=(0,St.default)(n,e,t);return r&&delete global.document,i}function Et(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(Array.isArray(e)||(e=(0,Ot.convertNodeList)(e)),e.some(function(u){return u.nodeType!==1}))throw new Error("Invalid input - only an Array of HTMLElements or representations of them is supported!");var r=(0,wt.default)(e[0],t),n=(0,xt.getCommonAncestor)(e,t),i=Pe(n,t),o=Kr(e),a=o[0],c=(0,St.default)(i+" "+a,e,t),s=(0,Ot.convertNodeList)(document.querySelectorAll(c));return e.every(function(u){return s.some(function(d){return d===u})})?(r&&delete global.document,c):console.warn(`
      The selected elements can't be efficiently mapped.
      Its probably best to use multiple single selectors instead!
    `,e)}function Kr(e){var t=(0,xt.getCommonProperties)(e),r=t.classes,n=t.attributes,i=t.tag,o=[];if(i&&o.push(i),r){var a=r.map(function(s){return"."+s}).join("");o.push(a)}if(n){var c=Object.keys(n).reduce(function(s,u){return s.push("["+u+'="'+n[u]+'"]'),s},[]).join("");o.push(c)}return o.length,[o.join("")]}function Zr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.length&&!e.name?Et(e,t):Pe(e,t)}});var _t=z(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.default=I.common=I.optimize=I.getMultiSelector=I.getSingleSelector=I.select=void 0;var je=Mt();Object.defineProperty(I,"getSingleSelector",{enumerable:!0,get:function(){return je.getSingleSelector}});Object.defineProperty(I,"getMultiSelector",{enumerable:!0,get:function(){return je.getMultiSelector}});var kt=At(je),en=Ie(),tn=At(en),rn=Ne(),nn=on(rn);function on(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function At(e){return e&&e.__esModule?e:{default:e}}I.select=kt.default;I.optimize=tn.default;I.common=nn;I.default=kt.default});var On={};ur(On,{ViddyError:()=>Y,qsArray:()=>W,selectorOfElement:()=>ne,serialize:()=>mn,unserialize:()=>vn,viddy:()=>er,viddyWell:()=>bn});var fr=Object.defineProperty;var pr=(e,t)=>{for(var r in t)fr(e,r,{get:t[r],enumerable:!0})},le={};pr(le,{instanceOf:()=>Z,isArguments:()=>Xe,isArray:()=>mr,isDate:()=>vr,isFormData:()=>xr,isFunction:()=>Ye,isIterable:()=>Sr,isMap:()=>Or,isNumber:()=>gr,isObject:()=>Ke,isPojo:()=>wr,isRegExp:()=>yr,isSet:()=>br,isString:()=>hr});var Ge=Object.prototype,dr=Ge.toString,fe=e=>t=>typeof t===e,Z=e=>t=>t instanceof e,{isArray:mr}=Array,Xe=e=>dr.call(e)==="[object Arguments]",vr=e=>Z(Date)(e)&&!isNaN(e),Ye=fe("function"),hr=fe("string"),gr=e=>e===e&&fe("number")(e),Ke=e=>e!==null&&fe("object")(e),yr=Z(RegExp),br=Z(Set),Or=Z(Map),wr=e=>e===null||!Ke(e)||Xe(e)?!1:Object.getPrototypeOf(e)===Ge,Sr=e=>e!=null&&[e[Symbol.iterator],e.next].every(Ye),xr=e=>typeof FormData!="undefined"&&Z(FormData)(e),{isArguments:Er,isArray:_,isDate:Sn,isFunction:U,isNumber:B}=le,{isPojo:C,isRegExp:$,isString:x,instanceOf:xn}=le,{isMap:Mr,isSet:kr,isIterable:Ar,isFormData:_r}=le,{keys:Ze,entries:En,assign:Mn}=Object,Qe=2e4;function A(e){return(...t)=>ke(...t)(e)}var ke=(...e)=>t=>{let[r,n]=Er(t)?[{},Array.from(t)]:Mr(t)||_r(t)?[{isMap:!0},t.entries()]:kr(t)?[{isSet:!0},t.values()]:[{},t];if(!Ar(n))return Je(...e)(n).result;let[i,o]=e.reduce(([c,s],u)=>Tr(u)?[u,s]:[c,[...s,u]],[()=>({value:()=>{}}),[]]),a=[];do{let{value:c,done:s}=n.next();if(s)return i().value();a.push(c);let{found:u,result:d}=Je(...o)(r.isSet?c:r.isMap?{key:c[0],value:c[1]}:[...a]);if(u)return d}while(a.length<Qe||r.isSet||r.isMap);throw new Error(`Hit iterationLimit: ${Qe}. Use setIterationLimit(Infinity) to disable.`)},Je=(...e)=>{let t;return r=>({found:!!e.find(n=>{let i=n(r),{matched:o,value:a}=i||{};return[o,a].every(U)?o(r)&&(t=a(r),!0):i&&(t=i)}),result:t})},et=Symbol("@@match-iz/otherwise"),Tr=e=>(e==null?void 0:e[et])===!0,T=e=>{let t=r=>({matched:()=>!0,value:()=>U(e)?e(r):e});return t[et]=!0,t},Me=e=>t=>r=>({matched:()=>V(e,r,n=>r=n),value:()=>U(t)?x(r)&&$(e)?t(...Cr(r.match(e))):t(r):t}),f=(...e)=>{if(e.length===1){let[t]=e;return Me(t)}if(e.length===2){let[t,r]=e;return Me(t)(r)}if(e.length>2){let t=e.slice(-1)[0],r=e.slice(0,-1);return Me(j(r))(t)}throw new Error("Expected at least 1 argument")},Cr=e=>{let{groups:t}=e;return t?[t,e]:[e]},V=(e,t,r)=>C(e)?Ze(e).every(n=>V(e[n],t==null?void 0:t[n],r)):_(e)?_(t)&&e.length===t.length&&e.every((n,i)=>V(n,t==null?void 0:t[i],r)):U(e)?e(t,r):x(t)&&$(e)?e.test(t):e===t||[e,t].every(Number.isNaN),ee=(...e)=>(t,r)=>e.length===0||(U(e[0])?e[0](t):V(e[0],t,r))?(r(t),!0):!1;var te=e=>(t,r)=>!V(e,t,r),Q=(...e)=>(t,r)=>e.flat().some(n=>V(n,t,r)),j=(...e)=>(t,r)=>e.flat().every(n=>V(n,t,r));var Ae=e=>e!==e||!e&&e!==0&&e!==!1||_(e)&&!e.length||C(e)&&!Ze(e).length,tt=e=>!Ae(e);var rt=e=>Ir(t=>t.includes(e));var Ir=e=>(t,r)=>(_(t)||x(t))&&e(t,r);var _e=e=>x(e)?(t,r)=>t[e]-r[e]:(t,r)=>t-r;function pe(e,t){let[r,n]=Nr(e,t);return[(...o)=>(n(),r(...o)),n]}function Nr(e,t){let r;return[(...o)=>{r=setTimeout(t,e,...o)},()=>clearTimeout(r)]}var nt=(...e)=>t=>e.reduceRight((r,n)=>n(r),t);function Te(e,t=new Map){return r=>t.has(r)?t.get(r):t.set(r,e(r)).get(r)}var it=(e,t)=>Object.entries(e).reduce((r,[n,i])=>(r[n]=t(i,n),r),{}),X=e=>e,J=()=>({valueOf:()=>{},toString:()=>"Nothing",map:()=>J(),chain:()=>J(),fork:e=>e(),orElse:e=>e(),ap:()=>J()});J.of=()=>J();var G=e=>({valueOf:()=>e,toString:()=>`Just(${e})`,map:t=>G(t(e)),chain:t=>t(e),fork:(t,r)=>r(e),orElse:()=>G(e),ap:t=>t.map(e)});G.of=e=>G(e);var Lr=(e=t=>t!=null)=>{let t=r=>e(r)?G(r):J();return t.of=r=>t(r),t},ot=e=>{try{return G(e())}catch(t){return J()}},Cn=Lr(),at=e=>()=>G(e);var Ct=cr(_t(),1),It=e=>e instanceof HTMLElement,Nt=e=>e.offsetParent!==null,W=e=>ot(()=>document.querySelectorAll(e)).map(Array.from).orElse(at([])).valueOf();function Lt(e){let t=[],r=e.parentNode;for(;r&&r!==document;)t.push(r),r=r.parentNode;return t}function Pt(e){let{top:t,left:r,width:n,height:i}=e.getBoundingClientRect(),o=n/2,a=i/2,c=r+o,s=t+a;return{el:e,x:c,y:s,halfWidth:o,halfHeight:a}}function jt(e,t){let r=t.x-e.x,n=t.y-e.y,i=Tt(r,n,e.x,e.y,e.halfWidth,e.halfHeight),o=Tt(-r,-n,t.x,t.y,t.halfWidth,t.halfHeight);return Math.hypot(i.x-o.x,i.y-o.y)}function Tt(e,t,r,n,i,o){return Math.abs(t/e)<o/i?{x:r+(e>0?i:-i),y:n+t*i/Math.abs(e)}:{x:r+e*o/Math.abs(t),y:n+(t>0?o:-o)}}function qt(e){let t=e.toLowerCase();return r=>r.textContent.toLowerCase().includes(t)&&r.innerText.toLowerCase().includes(t)}var Ft=e=>t=>e.test(t.textContent)&&e.test(t.innerText);function ne(e){if(e instanceof Element)return typeof global=="undefined"&&typeof window!="undefined"&&(global=window),(0,Ct.select)(e)}function qe(e){return A(e)(f({val:U})(t=>t.val()),f({tagName:"SELECT",multiple:!0})(({options:t})=>Array.from(t).reduce((r,n)=>n.selected?r.concat(n.value):r,[])),f({type:"checkbox",value:tt})(t=>t.checked?t.value:""),f({type:"checkbox"})(t=>t.checked?"checked":""),f({contenteditable:!0})(t=>t.innerHTML),T(t=>t.value))}function Fe(e,t){let r=t?new MutationObserver(i):new MutationObserver(n);return r.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),()=>r.disconnect();function n(o){setTimeout(()=>e(o),1)}function i(o){let a=W(t);for(let c of o){let s=c.target;if(a.some(u=>s.contains(u))){setTimeout(()=>e(),1);break}}}}var Dt=(e,t)=>{let[r,n]=pe(32,t),i=W(e).map(o=>(o.addEventListener("change",r,{passive:!0}),()=>o.removeEventListener("change",r))).concat(()=>document.body.removeEventListener("click",r)).concat(()=>document.body.removeEventListener("keyup",r)).concat(n);return document.body.addEventListener("click",r,{passive:!0}),document.body.addEventListener("keyup",r,{passive:!0}),()=>i.forEach(o=>o())};var $t="body *",Wt=["button","submit","reset","file"],Bt=Wt.map(e=>`input:not([type=${e}])`).concat("select","textarea").join(", "),an=Wt.map(e=>`input[type=${e}]`).concat("a","button").join(", "),Ht=5,sn=500,un=j(_,Ae),k=Q(x,$),cn=Q(k,C),ln=Q(j(C,{pattern:k}),j(C,{selector:x})),zt=j(C,{pattern:k,selector:te(x)}),Vt=j(C,{pattern:te(k),selector:te(x)}),Ut=j(C,{selector:te(x),pickParent:te(x)}),$e="|<-REGEXP::FLAGS->|",fn=j(x,rt($e)),pn=e=>[e.source,e.flags].join($e),dn=e=>new RegExp(...e.split($e)),mn=(...e)=>JSON.stringify(e,(t,r)=>A(r)(f($)(pn),T(r))),vn=e=>JSON.parse(e,(t,r)=>A(r)(f(fn)(dn),T(r)));var Y=class extends Error{constructor(t,r,{message:n="could not resolve query to any elements"}={}){let i=c=>`/${c.source}/${c.flags}`,a=JSON.stringify(r,(c,s)=>$(s)?i(s):s,2);super(`${n}

viddy.${t}(...${a})
`),this.name="ViddyError"}},K=(...e)=>A(e)(f([k])(Re),f([k,C])(([t,r])=>q([L({pattern:t},r)])),f([C])(q),T([]));function hn(e){return(...t)=>A(t)(f([k])(([r])=>q([{selector:e,near:r}])),f([k,Ut])(([r,n])=>q([{selector:e,near:F(L({},n),{pattern:r})}])),f([zt])(i=>{var[o]=i,a=o,{pattern:r}=a,n=R(a,["pattern"]);return q([{selector:e,near:F(L({},n),{pattern:r})}])}),f([{selector:x}])(i=>{var[o]=i,a=o,{selector:r}=a,n=R(a,["selector"]);return q([F(L({},n),{selector:r})])}),T([]))}function gn(e){return(...t)=>nt(r=>r.filter(ke(f(Q(W(e)),!0))))(A(t)(f([k])(([r])=>q([{containedBy:{selector:e},pattern:r}])),f([k,Ut])(([r,n])=>q([F(L({},n),{containedBy:{selector:e},pattern:r})])),f([zt])(i=>{var[o]=i,a=o,{pattern:r}=a,n=R(a,["pattern"]);return q([F(L({},n),{containedBy:{selector:e},pattern:r})])}),f([Vt])(([r])=>q([F(L({},r),{containedBy:{selector:e}})])),f([{selector:x}])(i=>{var[o]=i,a=o,{selector:r}=a,n=R(a,["selector"]);return q([F(L({},n),{selector:r})])}),T(q([{selector:e}]))))}var Se=hn(Bt),We=gn(an);function Re([e,t=$t]){let r=A(e)(f($)(Ft),T(qt)),n=W(t).filter(It).filter(Nt).filter(r);return n.filter(i=>n.filter(a=>a!==i).every(a=>!i.contains(a)))}function q([e]){return A(e)(f({pattern:k,selector:x})(i=>{var o=i,{pattern:t,selector:r}=o,n=R(o,["pattern","selector"]);return we(Re([t,r]),n)}),f({pattern:k})(n=>{var i=n,{pattern:t}=i,r=R(i,["pattern"]);return we(Re([t]),r)}),f({selector:x})(n=>{var i=n,{selector:t}=i,r=R(i,["selector"]);return we(W(t),r)}),T(()=>we(W($t),e)))}var yn=e=>L(L({},e),["near","above","below","leftOf","rightOf","containedBy"].reduce((t,r)=>F(L({},t),{[r]:A(e[r])(f(cn)(K),f(_)(n=>K(...n)),T(null))}),{}));function we(e,t={}){let y=yn(t),{near:r,containedBy:n,pickParent:i}=y,o=R(y,["near","containedBy","pickParent"]),a=Object.keys(o).length>0,c=Te(Pt),s=Te(Lt),u=({depth:m},w,[v])=>m===v.depth,d=_(n)?m=>{let w=m.map(s),v=p=>E=>E.map((g,l)=>({contained:g.contains(p),depth:l,el:p})).filter(({contained:g})=>g)[0];return p=>w.map(v(p))[0]}:()=>m=>({depth:0,el:m}),h=a?m=>{let{above:w,below:v,leftOf:p,rightOf:E}=it(m,g=>_(g)?g.map(c):g);return g=>{let l=D=>D.filter(tr=>tr.el!==g),S=c(g),M=!_(w)||w.length>0&&l(w).every(D=>D.y>S.y),N=!_(v)||v.length>0&&l(v).every(D=>D.y<S.y),P=!_(p)||p.length>0&&l(p).every(D=>D.x>S.x),xe=!_(E)||E.length>0&&l(E).every(D=>D.x<S.x);return M&&N&&P&&xe}}:()=>()=>!0,b=_(r)?m=>{let w=m.map(c);return v=>{let p=w.filter(g=>g.el!==v),E=c(v);return p.map(g=>({from:v,distance:jt(g,E)}))[0]}}:()=>m=>({distance:0,from:m}),O=x(i)?m=>{let w=W(m);return v=>s(v).find(p=>w.includes(p))}:()=>X;return e.map(d(n)).filter(Boolean).sort(_e("depth")).filter(u).map(({el:m})=>m).filter(h(o)).map(b(r)).filter(Boolean).sort(_e("distance")).map(({from:m})=>m).map(O(i)).filter(Boolean)}function Qt(...e){return!!K(...e)[0]}function Jt(...e){return Se(...e).map(qe)}function Be(...e){return K(...e).map(t=>t.innerText)}function Gt(e,...t){let r=A(t)(f(un)(()=>[e]),f([_])(([n])=>n),f([k])(([n])=>({pattern:n})),f([Vt])(([n])=>[F(L({},n),{pattern:e})]),T(()=>t));return Be(...r).map(n=>A(e)(f($)(i=>{var a;let o=(a=n.match(i))!=null?a:[void 0];return o.length>1||o.groups!==void 0?o:o[0]}),f(x)(n),T(null))).filter(Q(x,_))}function He(e="baseWaitFor",t,...r){let n=A(r)(f([{timeoutInMs:ee(B)}])(X),f([k,{timeoutInMs:ee(B)}])(X),f([k,k,{timeoutInMs:ee(B)}])(X),T(Ht*1e3)),i=new Y(e,r,{message:`timed out after ${n}ms trying to resolve query`});return new Promise((o,a)=>{let c=y=>(o(y),h()),s=()=>(a(i),h()),u=t({done:c,args:r}),d=setTimeout(s,n),h=()=>{clearTimeout(d),O(),b()},b=Dt(Bt,u),O=Fe(u);u()})}function Xt(...e){return He("waitFor",t,...e);function t({args:r,done:n}){return()=>{let i=K(...r);i.length&&n(i.map(ne))}}}function Yt(...e){return He("waitForCta",t,...e);function t({args:r,done:n}){return()=>{let i=We(...r);i.length&&n(i.map(ne))}}}function Kt(e,...t){if(!t.length)throw new Y("waitForValue",t,{message:"no query specified"});return He("waitForValue",r,e,...t);function r({args:n,done:i}){return()=>{let o=Se(...n.slice(1)).map(a=>({el:a,value:qe(a)})).filter(({value:a})=>A([e,a])(f([$,x])(([c])=>c.test(a)),f([x,x])(([c])=>c.toLowerCase()===a.toLowerCase()))).map(({el:a})=>a);o.length&&i(o.map(ne))}}}var Rt=Q(j(C,{withinMs:B}),j(C,{timeoutInMs:B}),j(C,{withinMs:B,timeoutInMs:B}));function Zt(...e){let{withinMs:t=sn,timeoutInMs:r=Ht*1e3}=A(e)(f([ee(Rt)])(X),f([k,ee(Rt)])(X),T({})),n=Math.max(r,t+16),i=new Y("waitForDomToIdle",e,{message:`timed out after ${n}ms waiting for DOM idle`}),o=A(e)(f([k])(!0),f([ln])(!0),f([k,C])(!0),T(!1)),a=o&&er.for(...e);if(o&&!a)throw new Y("waitForDomToIdle",e,{message:"need resolvable query to monitor for DOM idle, or omit query to monitor all DOM changes"});return new Promise((c,s)=>{let u=()=>(c(),y()),h=setTimeout(()=>(s(i),y()),n),[b,O]=pe(t,u),y=()=>{clearTimeout(h),O(),m()},m=Fe(b,a);b()})}function ie(e){return(...t)=>e(...t)[0]}function De(e){return e[0]}function oe(e){return(...t)=>e(...t).map(ne)}var er={for:ie(oe(K)),forCta:ie(oe(We)),forInput:ie(oe(Se)),waitFor:(...e)=>Xt(...e).then(De),waitForCta:(...e)=>Yt(...e).then(De),waitForValue:(...e)=>Kt(...e).then(De),waitForDomToIdle:Zt,valueOf:ie(Jt),innerText:ie(Be),matchText:ie(Gt),hasContent:Qt},bn={for:oe(K),forInput:oe(Se),forCta:oe(We),waitFor:Xt,waitForCta:Yt,waitForValue:Kt,waitForDomToIdle:Zt,valueOf:Jt,innerText:Be,matchText:Gt,hasContent:Qt};return lr(On);})();
