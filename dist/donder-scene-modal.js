/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},g="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;_[g]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:_}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,A=`<${x}>`,S=document,E=()=>S.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,k=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,H=/>/g,P=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,M=/"/g,R=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),L=new WeakMap,I=S.createTreeWalker(S,129,null,!1);function q(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",r=T;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=O:void 0!==l[1]?r=H:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=P):void 0!==l[3]&&(r=P):r===P?">"===l[0]?(r=null!=o?o:T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?P:'"'===l[3]?M:U):r===M||r===U?r=P:r===O||r===H?r=T:(r=P,o=void 0);const h=r===P&&e[t+1].startsWith("/>")?" ":"";n+=r===T?i+A:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+w+h):i+w+(-2===c?(s.push(void 0),t):h)}return[q(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class B{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,c]=V(e,t);if(this.el=B.createElement(l,i),I.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=I.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(w)){const i=c[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(w),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?Z:"?"===t[1]?X:"@"===t[1]?Y:K})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(R.test(s.tagName)){const e=s.textContent.split(w),t=e.length-1;if(t>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],E()),I.nextNode(),a.push({type:2,index:++o});s.append(e[t],E())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(w,e+1));)a.push({type:7,index:o}),e+=w.length-1}o++}}static createElement(e,t){const i=S.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,s){var o,n,r,a;if(t===z)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,s)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:S).importNode(i,!0);I.currentNode=o;let n=I.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new F(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new Q(n,this,e)),this._$AV.push(t),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=I.nextNode(),r++)}return I.currentNode=S,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class F{constructor(e,t,i,s){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),C(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==z&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>k(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==j&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(S.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=B.createElement(q(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new J(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=L.get(e.strings);return void 0===t&&L.set(e.strings,t=new B(e)),t}T(e){k(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new F(this.k(E()),this.k(E()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class K{constructor(e,t,i,s,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=W(this,e,t,0),n=!C(e)||e!==this._$AH&&e!==z,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=W(this,s[i+r],t,r),a===z&&(a=this._$AH[r]),n||(n=!C(a)||a!==this._$AH[r]),a===j?e=j:e!==j&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}const G=$?$.emptyScript:"";class X extends K{constructor(){super(...arguments),this.type=4}j(e){e&&e!==j?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class Y extends K{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:j)===z)return;const s=this._$AH,o=e===j&&s!==j||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==j&&(s===j||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const ee=y.litHtmlPolyfillSupport;null==ee||ee(B,F),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class se extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new F(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return z}}se.finalized=!0,se._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:se});const oe=globalThis.litElementPolyfillSupport;null==oe||oe({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function re(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ne(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ae(e){return re({...e,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var le;null===(le=window.HTMLSlotElement)||void 0===le||le.prototype.assignedElements;var ce="[^\\s]+";function de(e,t){for(var i=[],s=0,o=e.length;s<o;s++)i.push(e[s].substr(0,t));return i}var he=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})),o=s.indexOf(t.toLowerCase());return o>-1?o:null}};function ue(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,o=t;s<o.length;s++){var n=o[s];for(var r in n)e[r]=n[r]}return e}var pe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],me=["January","February","March","April","May","June","July","August","September","October","November","December"],ve=de(me,3),ge={dayNamesShort:de(pe,3),dayNames:pe,monthNamesShort:ve,monthNames:me,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=(ue({},ge),function(e){return+e-1}),fe=[null,"[1-9]\\d?"],ye=[null,ce],$e=["isPm",ce,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],be=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}];he("monthNamesShort"),he("monthNames");var we,xe;!function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(we||(we={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(xe||(xe={}));var Ae=function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};function Se(e){return void 0!==e&&"none"!==e.action}const Ee={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let Ce=class extends se{constructor(){super(...arguments),this._initialized=!1}setConfig(e){this._config=e,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var e;return(null===(e=this._config)||void 0===e?void 0:e.name)||""}get _entity(){var e;return(null===(e=this._config)||void 0===e?void 0:e.entity)||""}get _show_warning(){var e;return(null===(e=this._config)||void 0===e?void 0:e.show_warning)||!1}get _show_error(){var e;return(null===(e=this._config)||void 0===e?void 0:e.show_error)||!1}get _tap_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.tap_action)||{action:"more-info"}}get _hold_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.hold_action)||{action:"none"}}get _double_tap_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return D``;this._helpers.importMoreInfoControl("climate");const e=Object.keys(this.hass.states).filter((e=>"sun"===e.substr(0,e.indexOf("."))));return D`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ee.required.icon}`}></ha-icon>
            <div class="title">${Ee.required.name}</div>
          </div>
          <div class="secondary">${Ee.required.secondary}</div>
        </div>
        ${Ee.required.show?D`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${e.indexOf(this._entity)}>
                    ${e.map((e=>D`
                        <paper-item>${e}</paper-item>
                      `))}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"actions"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ee.actions.icon}`}></ha-icon>
            <div class="title">${Ee.actions.name}</div>
          </div>
          <div class="secondary">${Ee.actions.secondary}</div>
        </div>
        ${Ee.actions.show?D`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ee.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${Ee.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${Ee.actions.options.tap.secondary}</div>
                </div>
                ${Ee.actions.options.tap.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ee.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${Ee.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${Ee.actions.options.hold.secondary}</div>
                </div>
                ${Ee.actions.options.hold.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${Ee.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${Ee.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${Ee.actions.options.double_tap.secondary}</div>
                </div>
                ${Ee.actions.options.double_tap.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ee.appearance.icon}`}></ha-icon>
            <div class="title">${Ee.appearance.name}</div>
          </div>
          <div class="secondary">${Ee.appearance.secondary}</div>
        </div>
        ${Ee.appearance.show?D`
              <div class="values">
                <paper-input
                  label="Name (Optional)"
                  .value=${this._name}
                  .configValue=${"name"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <br />
                <ha-formfield .label=${"Toggle warning "+(this._show_warning?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_warning}
                    .configValue=${"show_warning"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle error "+(this._show_error?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_error}
                    .configValue=${"show_error"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(e){this._toggleThing(e,Ee.actions.options)}_toggleOption(e){this._toggleThing(e,Ee)}_toggleThing(e,t){const i=!t[e.target.option].show;for(const[e]of Object.entries(t))t[e].show=!1;t[e.target.option].show=i,this._toggle=!this._toggle}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(this[`_${t.configValue}`]!==t.value){if(t.configValue)if(""===t.value){const e=Object.assign({},this._config);delete e[t.configValue],this._config=e}else this._config=Object.assign(Object.assign({},this._config),{[t.configValue]:void 0!==t.checked?t.checked:t.value});Ae(this,"config-changed",{config:this._config})}}static get styles(){return r`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};e([re({attribute:!1})],Ce.prototype,"hass",void 0),e([ae()],Ce.prototype,"_config",void 0),e([ae()],Ce.prototype,"_toggle",void 0),e([ae()],Ce.prototype,"_helpers",void 0),Ce=e([(e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t))("donder-scene-modal-editor")],Ce);const ke="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class Ne extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:ke?"100px":"50px",height:ke?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach((e=>{document.addEventListener(e,(()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0}),{passive:!0})}))}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",(e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1}));const i=e=>{let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout((()=>{this.startAnimation(t,i),this.held=!0}),this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Ae(e,"action",{action:"hold"}):t.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,Ae(e,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Ae(e,"action",{action:"double_tap"})):Ae(e,"action",{action:"tap"}))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",s),e.addEventListener("touchcancel",s),e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",s),e.addEventListener("keyup",(e=>{13===e.keyCode&&s(e)}))}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-boilerplate",Ne);const Te=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-boilerplate"))return e.querySelector("action-handler-boilerplate");const t=document.createElement("action-handler-boilerplate");return e.appendChild(t),t})();i&&i.bind(e,t)},Oe=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{update(e,[t]){return Te(e.element,t),z}render(e){}});console.info("%c  Donder Scene Modal \n%c  version: 1.5.2  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-scene-modal",name:"Donder Scene Modal",description:"A template custom card for you to create something awesome"});class He extends se{constructor(){super(...arguments),this._mode="content",this._originalName=null,this._hour=0,this._minutes=0,this._schedule={hour:"00",minutes:"00",event:null,days:[{name:"MON",state:!1},{name:"TUE",state:!1},{name:"WED",state:!1},{name:"THU",state:!1},{name:"FRI",state:!1},{name:"SAT",state:!1},{name:"SUN",state:!1}]},this._scene={name:null,group:null,statuses:[]}}static async getConfigElement(){return document.createElement("donder-scene-modal-editor")}static getStubConfig(){return{}}setConfig(e){if(!e)throw new Error("Invalid configuration");e.test_gui&&function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config=Object.assign({name:"Boilerplate"},e)}shouldUpdate(){return!!this.config}connectedCallback(){super.connectedCallback(),this.config.scene?(this._scene=this.config.scene,this._originalName=this.config.scene.name):this.config.sceneName?this._scene.name=this.config.sceneName:this.config.roomName&&(this._scene.group=this.config.roomName)}async serviceCall(e,t,i,s,o){try{await this.hass.callService(e,t,i),s(),o&&this.hass.callService("browser_mod","notification",{message:o,duration:5e3,browser_id:localStorage.getItem("browser_mod-browser-id")})}catch(e){this.hass.callService("browser_mod","notification",{message:"Oops, something went wrong..",duration:5e3,browser_id:localStorage.getItem("browser_mod-browser-id")})}}static get styles(){return r`
      .type-custom-donder-scene-modal {
        height: 100%;
        width: 100%;
        background: transparent;
        --mdc-icon-size: 16px;
      }
      .donder-widget {
        height: 100%;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        padding-bottom: 0;
        background-color: transparent;
        color: var(--text-primary-color);
        border-radius: var(--ha-card-border-radius)
      }
      .donder-widget.nested {
        padding: 0px;
      }
      .scene-modal-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .scene-modal-header input {
        background: none;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        padding-bottom: 5px;
        margin-left: 10px;
        position: relative;
        top: 2px;
        font-size: 1em;
      }
      .scene-modal-content {
        display: flex;
        max-width: 100%;
        flex-wrap: wrap;
      }
      .scene-modal-group-wrapper {
        box-sizing: border-box;
        margin-bottom: 40px;
        flex: 1 0 50%;
        max-width: 50%;
      }
      .scene-modal-group-wrapper .scene-modal-group-name {
        opacity: .6;
        margin-bottom: 10px;
        font-size: .8em;
      }
      .scene-modal-group-wrapper:nth-child(even) {
        padding-left: 20px;
      }
      .scene-modal-group-wrapper:nth-child(odd) {
        padding-right: 20px;
      }
      .entity {
        /* opacity: 0.5; */
        /* display: flex; */
        /* border: 1px solid rgba(255, 255, 255, 0.3); */
        /* border-radius: 5px; */
        padding: 10px 10px 10px 50px;
        /* margin-bottom: 10px; */
        position: relative;
      }
      .entity-name {
        margin-left: 10px;
        font-size: .9em;
        color: white;
      }
      .summary-shutter {
        position: relative;
      }
      .summary-shutter::after,
      .summary-switch::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        clear: both;
      }
      .entity.checked .summary-shutter-wrapper,
      .entity.checked .summary-switch-wrapper {
        opacity: 1;
      }
      .entity.checked .summary-shutter::after,
      .entity.checked .summary-switch::after {
        display: none;
      }
      .entity .summary-shutter-name {
        padding-right: 30px;
        /* padding-top: 5px; */
        /* opacity: .8; */
        /* flex: 2; */
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        z-index: 10;
        /* text-shadow: 1px 1px 0px rgba(0,0,0,0.3); */
        pointer-events: none;
      }
      .entity.checked .summary-shutter-name {
        color: white;
      }
      .summary-switch-wrapper {
        display: flex;
      }
      .summary-switch-name {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
      .summary-switch {
        flex: 1;
      }
      .entity-icon {
        width: 18px;
        /* color: #ccc; */
      }
      .entity-check {
        width: 18px;
        color: white;
        position: absolute;
        top: 20px;
        left: 0px;
      }
      .entity-status {
        font-style: italic;
        opacity: .5;
        font-size: .9em;
        margin-left: 10px;
      }
      .scene-name {
        text-transform: uppercase
      }
      .scene-modal-footer {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin: -10px -25px;
        padding-top: 12px;
      }
      .scene-modal-footer button {
        background: none;
        border: none;
        color: rgb(3, 169, 244);
        font-size: .9em;
        font-weight: 500;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
      }
      .scene-modal-footer button.cancel {
        color: rgb(255, 255, 255, .4);
      }
      .scene-modal-actions {
        position: absolute;
        right: 10px;
      }
      .scene-modal-actions button {
        width: 48px;
        padding: 7px 13px;
        opacity: 0.6;
        margin-right: 10px;
      }
      .summary-shutter-wrapper,
      .summary-switch-wrapper {
        width: 100%;
        position: relative;
        opacity: .5;
      }
      .summary-shutter-wrapper ha-control-slider {
        --control-slider-color: var(--transparent);
        border: 2px dashed var(--disabled-color);
        --control-slider-background: #fff;
      }
      .entity.checked .summary-shutter-wrapper ha-control-slider {
        --control-slider-color: var(--primary-color);
        border: 2px dashed transparent;
      }
      .scene-modal-scheduler {
        display: flex;
        margin-bottom: 30px;
        flex-direction: column;
      }
      .scene-modal-scheduler .scheduler-time,
      .scene-modal-scheduler .scheduler-frequency {
        flex: 1;
      }
      .scene-modal-scheduler .scheduler-frequency {
        display: flex;
        justify-content: center;
      }
      .scene-modal-scheduler .scheduler-time {
        display: flex;
        /* flex-direction: column; */
      }
      .scheduler-time .scheduler-time-clock {
        padding-bottom: 40px;
        display: flex;
        justify-content: center;
      }
      .scheduler-time .scheduler-time-clock input {
        background: none;
        border-width: medium medium 1px;
        border-style: none none solid;
        border-color: currentcolor currentcolor rgba(255, 255, 255, 0.3);
        border-image: none;
        padding-bottom: 5px;
        margin-left: 10px;
        position: relative;
        top: 2px;
        font-size: 4em;
        width: 100px;
        text-align: center;
      }
      .scheduler-time .scheduler-time-clock .schedule-hour::after {
        content: ""; 
      }
      .scheduler-time .scheduler-time-or {
        text-align: center;
        background: #000;
        border-bottom: 1px solid #fff;
        height: 10px;
        position: relative;
      }
      .scheduler-time .scheduler-time-clock::after {
        content: '';
      }
      .scheduler-time .scheduler-time-event,
      .scheduler-time .scheduler-time-clock {
        flex: 1;
      }
      .scene-modal-scheduler .scheduler-day {
        text-align: center;
        border-radius: 50%;
        background: var(--disabled-color);
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 40px;
        margin: 0px 10px;
      }
      .scene-modal-scheduler .scheduler-day.active {
        background-color: var(--primary-color);
      }
      .content .scene-modal-scheduler,
      .scheduler .scene-modal-content {
        display: none;
      }
      .scheduler .scene-modal-actions button {
        /* background-color: rgba(214, 163, 25, .2);
        border: 1px solid rgb(214, 163, 25); */
      }
      @media (max-width: 600px) {
        .scene-modal-group-wrapper {
          flex: 1 0 100%;
          max-width: 100%;
        }
        .scene-modal-header {
          flex-direction: column;
        }
        .scene-modal-actions {
          position: initial;
        }
        .scene-modal-actions button:nth-child(2) {
          margin-right: 0px;
        }
        .scene-modal-header input {
          margin-bottom: 20px;
          text-align: center;
        }
        .scene-modal-group-wrapper:nth-child(even) {
          padding-left: 0px;
        }
        .scene-modal-group-wrapper:nth-child(odd) {
          padding-right: 0px;
        }
      }
    `}getSensors(){const{sensors:e}=this.config;return e.map((e=>D`<option value="${e.entity}">${e.name}</option>`))}handleCheckboxChange(e){const{entity:t}=e,i=this._scene.statuses.findIndex((e=>e.entity===t));if(i>-1)this._scene.statuses.splice(i,1);else{const i={};"shutters"===e.type?i.current_position=this.hass.states[t].attributes.current_position:i.state=this.hass.states[t].state,this._scene.statuses.push({entity:t,type:e.type,attributes:i})}this.requestUpdate("_scene")}renderShutterEntity(e,t,i,s,o){var n;const{entity:r,name:a,type:l}=e,c=i?this._scene.statuses[o].attributes.current_position:null===(n=this.hass.states[r||""].attributes)||void 0===n?void 0:n.current_position;return D`
      <div class=${"entity "+t}>
        <div class="entity-check">
          <ha-switch
            .checked=${i}
            @action=${()=>this.handleCheckboxChange(e)}
            .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}>
          </ha-switch>
        </div>
        <div class='summary-shutter-wrapper'>
          <!-- <div class="entity-icon">
            <ha-icon icon=${`mdi:${s[l]}`}></ha-icon>
          </div> -->
          <div class='summary-shutter-name'>${a}</div>
          <div class='summary-shutter'>
            <ha-control-slider
              .value=${i?c:0}
              min="0"
              max="100"
              mode="start"
              step="5"
              aria-disabled=${!i}
              @value-changed=${e=>{const t=e.target.value;return this._scene.statuses[o].attributes.current_position=t,!0}}
            ></ha-control-slider>
          </div>
        </div> 
      </div>     
    `}renderSwitchEntity(e,t,i,s){const{entity:o,name:n}=e,r=i?this._scene.statuses[s].attributes.state:this.hass.states[o||""].state;return D`
      <div class=${"entity "+t}>
        <div class="entity-check">
          <ha-switch
            .checked=${i}
            @action=${()=>this.handleCheckboxChange(e)}
            .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}>
          </ha-switch>
        </div>
        <div class='summary-switch-wrapper'>
          <div class='summary-switch-name'>${n}</div>
          <div class='summary-switch'>
            <ha-control-select
              .options=${[{value:"on",label:"On"},{value:"off",label:"Off"}]}
              .value=${r}
              @value-changed=${e=>this._scene.statuses[s].attributes.state=e.target.value}
            >
            </ha-control-select> 
          </div>
        </div> 
      </div>   
    `}entityGroupComponents(){const e=this.config.devices.reduce(((e,t)=>{const i=t.group;return e[i]||(e[i]=[]),e[i].push(t),e}),{}),t={lights:"lightbulb-outline",switch:"toggle-switch-variant-off",shutters:"window-shutter"};return Object.keys(e).map((i=>D`
            <div class="scene-modal-group-wrapper">
              <div class="scene-modal-group-name">${i}</div>
              <div class="scene-modal-group-content">
                ${e[i].map((e=>{const{entity:i,type:s,sceneable:o}=e,n=this._scene.statuses.findIndex((e=>e.entity===i)),r=n>=0,a=r?"checked":"";return o?"shutters"===s?this.renderShutterEntity(e,a,r,t,n):this.renderSwitchEntity(e,a,r,n):D``}))}
              </div>
            </div>
          `))}detectDeviceType(){const e=navigator.userAgent,t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),i=/iPad|Android|Touch/i.test(e)&&!/Mobile/i.test(e);return t?i?"Tablet":"Mobile":"Desktop"}updateHour(e){const t=e.target,i=parseInt(t.value,10);if(console.log(i),isNaN(i)||i<0?t.value="0":i>23&&(t.value="23"),2===t.value.length){const e=this.renderRoot.querySelector(".schedule-minutes");e&&e.focus()}this._hour=parseInt(t.value,10)}updateMinutes(e){const t=e.target,i=parseInt(t.value,10);console.log(i),isNaN(i)||i<0?t.value="0":i>59&&(t.value="59"),this._minutes=parseInt(t.value,10)}updateEvent(e){console.log(e.target.value),this._schedule.event=e.target.value}updateCalendarDay(e){this._schedule.days[e].state=!this._schedule.days[e].state,this.requestUpdate("_schedule")}renderCalendarDays(){return D`
      ${this._schedule.days.map(((e,t)=>D`
          <div class=${"scheduler-day "+(e.state?"active":"")} @click=${()=>this.updateCalendarDay(t)}>
            <div class='scheduler-day-name'>${e.name}</div>
          </div>
        `))}
    `}renderScheduler(){return D`
      <div class='scheduler-time'>
        <div class='scheduler-time-clock'>
          <input
            type="text"
            name="schedule-hour"
            class="schedule-hour"
            value="${this._hour}"
            @input=${this.updateHour}
          />
          <input
            type="text"
            name="schedule-minutes"
            class="schedule-minutes"
            value="${this._minutes}"
            @input=${this.updateMinutes}
          />
        </div>
        <div class='scheduler-time-or'>OR</div>
        <div class='scheduler-time-event'>
          <ha-control-select
            .options=${[{value:"sunset",label:"Sunset"},{value:"sunrise",label:"Sunrise"}]}
            .value=${this._schedule.event}
            @value-changed=${e=>this.updateEvent(e)}
          >
          </ha-control-select>
        </div>
      </div>
      <div class='scheduler-frequency'>
        ${this.renderCalendarDays()}
      </div>
    `}reduceKeys(e){const{type:t,entity:i}=e;return{type:t,entity:i,attributes:{current_position:this.hass.states[i].attributes.current_position}}}updateSceneName(e){this._scene.name=e.target.value}closeModal(){if(this.config.closeModal){const e=this.hass.states["donder_env.global"].attributes;this.hass.callService("browser_mod","popup",{content:{type:"custom:donder-summary-modal",entities:e[this.config.icon],env:e,showScenes:"Routines"===this.config.name},size:"normal",left_button:"Close",left_button_action:this.hass.callService("browser_mod","close_popup",{browser_id:localStorage.getItem("browser_mod-browser-id")}),browser_id:localStorage.getItem("browser_mod-browser-id"),card_mod:{style:{"ha-dialog$":"div.mdc-dialog div.mdc-dialog__surface {\n              max-width: 90%;\n            }\n            "}}})}else this.hass.callService("browser_mod","close_popup")}save(){var e;const t=null===(e=this.hass.states["donder_scenes.global"])||void 0===e?void 0:e.attributes;this._originalName&&t[this._originalName]&&delete t[this._originalName],this._scene.name&&this.serviceCall("donder_scenes","write",Object.assign(Object.assign({},t),{[this._scene.name]:this._scene}),(()=>{this._originalName=this._scene.name,this.closeModal()}),"Scene saved")}deleteScene(){var e;const t=null===(e=this.hass.states["donder_scenes.global"])||void 0===e?void 0:e.attributes;this._originalName&&t[this._originalName]&&(delete t[this._originalName],this.serviceCall("donder_scenes","write",t,(()=>{this.closeModal()}),"Scene deleted"))}editSchedule(){this._mode="scheduler"===this._mode?"content":"scheduler"}_showWarning(e){return D`
      <hui-warning>${e}</hui-warning>
    `}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),D`
      ${t}
    `}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");const{isNested:e}=this.config;return D`
      <ha-card
        tabindex="0"
        .label=${`Boilerplate: ${this.config||"No Entity Defined"}`}
      >
        <div class=${`donder-widget ${this._mode} ${e?"nested":""}`}>
          <div class='scene-modal-header'>
            Scene:
            <input
              type="text"
              name="scene-name"
              class="scene-name"
              value="${this._scene.name||""}"
              ?disabled=${!!this.config.locked}
              @change=${e=>this.updateSceneName(e)}
            />
            <div class='scene-modal-actions'>
              ${this.config.locked||this.config.isNew?null:D`<button
                  class="button"
                  @action=${this.deleteScene}
                  .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}
                >
                  <ha-icon icon='mdi:trash-can-outline'></ha-icon>
                </button>`}
              <button
                class="button"
                @action=${this.editSchedule}
                .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}
              >
                <ha-icon icon='mdi:clock-time-three-outline'></ha-icon>
              </button>
            </div>
          </div>

          <div class='scene-modal-content'>
            ${this.entityGroupComponents()}
          </div>

          <div class='scene-modal-scheduler'>
            ${this.renderScheduler()}
          </div>          

          <div class='scene-modal-footer'>
            <button
              class="button cancel"
              @action=${()=>this.closeModal()}
              .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}
            >Cancel</button>
              
            <button
              class="button"
              ?disabled=${!this._scene.name}
              @action=${this._scene.name?this.save:null}
              .actionHandler=${Oe({hasHold:Se(this.config.hold_action)})}
            >Save current state</button>
          </div>
        </div>
      </ha-card>
    `}}e([re()],He.prototype,"state",void 0),e([re()],He.prototype,"hass",void 0),e([re()],He.prototype,"config",void 0),e([re()],He.prototype,"event",void 0),e([re()],He.prototype,"callback",void 0),e([ae()],He.prototype,"_active",void 0),e([ae()],He.prototype,"_mode",void 0),e([ae()],He.prototype,"_originalName",void 0),e([ae()],He.prototype,"_hour",void 0),e([ae()],He.prototype,"_minutes",void 0),e([ae()],He.prototype,"_schedule",void 0),e([ae()],He.prototype,"_scene",void 0),customElements.define("donder-scene-modal",He);export{He as BoilerplateCard};
