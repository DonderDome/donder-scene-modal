function e(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}}const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new n(i,e,s)},r=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>t!==e&&(t==t||e==e),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},_="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=m){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||m}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=m){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||v)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $;g[_]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const f=window,y=f.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,S="?"+A,E=`<${S}>`,C=document,k=()=>C.createComment(""),x=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,H="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,U=/>/g,P=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),L=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),q=new WeakMap,z=C.createTreeWalker(C,129,null,!1);function V(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const B=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",a=O;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===O?"!--"===l[1]?a=N:void 0!==l[1]?a=U:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=P):void 0!==l[3]&&(a=P):a===P?">"===l[0]?(a=null!=o?o:O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?P:'"'===l[3]?R:M):a===R||a===M?a=P:a===N||a===U?a=O:(a=P,o=void 0);const h=a===P&&e[t+1].startsWith("/>")?" ":"";n+=a===O?i+E:c>=0?(s.push(r),i.slice(0,c)+w+i.slice(c)+A+h):i+A+(-2===c?(s.push(void 0),t):h)}return[V(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class W{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[l,c]=B(e,t);if(this.el=W.createElement(l,i),z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=z.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(w)||t.startsWith(A)){const i=c[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+w).split(A),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?X:"?"===t[1]?Z:"@"===t[1]?Q:J})}else r.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(j.test(s.tagName)){const e=s.textContent.split(A),t=e.length-1;if(t>0){s.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],k()),z.nextNode(),r.push({type:2,index:++o});s.append(e[t],k())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(A,e+1));)r.push({type:7,index:o}),e+=A.length-1}o++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,s){var o,n,a,r;if(t===L)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=x(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=K(e,l._$AS(e,t.values),l,s)),t}class F{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);z.currentNode=o;let n=z.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new G(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new ee(n,this,e)),this._$AV.push(t),l=s[++r]}a!==(null==l?void 0:l.index)&&(n=z.nextNode(),a++)}return z.currentNode=C,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,s){var o;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),x(e)?e===I||null==e||""===e?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>T(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==I&&x(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=W.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new F(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new W(e)),t}T(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new G(this.k(k()),this.k(k()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,s,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=K(this,e,t,0),n=!x(e)||e!==this._$AH&&e!==L,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=K(this,s[i+a],t,a),r===L&&(r=this._$AH[a]),n||(n=!x(r)||r!==this._$AH[a]),r===I?e=I:e!==I&&(e+=(null!=r?r:"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class X extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}const Y=y?y.emptyScript:"";class Z extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==I?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class Q extends J{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=K(this,e,t,0))&&void 0!==i?i:I)===L)return;const s=this._$AH,o=e===I&&s!==I||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==I&&(s===I||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const te=f.litHtmlPolyfillSupport;null==te||te(W,G),(null!==($=f.litHtmlVersions)&&void 0!==$?$:f.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,se;class oe extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let a=n._$litPart$;if(void 0===a){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new G(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return L}}oe.finalized=!0,oe._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function re(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ae(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function le(e){return re({...e,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce,de,he;null===(ce=window.HTMLSlotElement)||void 0===ce||ce.prototype.assignedElements,function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(de||(de={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(he||(he={}));var ue=function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};function pe(e){return void 0!==e&&"none"!==e.action}const ve={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let me=class extends oe{constructor(){super(...arguments),this._initialized=!1}setConfig(e){this._config=e,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var e;return(null===(e=this._config)||void 0===e?void 0:e.name)||""}get _entity(){var e;return(null===(e=this._config)||void 0===e?void 0:e.entity)||""}get _show_warning(){var e;return(null===(e=this._config)||void 0===e?void 0:e.show_warning)||!1}get _show_error(){var e;return(null===(e=this._config)||void 0===e?void 0:e.show_error)||!1}get _tap_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.tap_action)||{action:"more-info"}}get _hold_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.hold_action)||{action:"none"}}get _double_tap_action(){var e;return(null===(e=this._config)||void 0===e?void 0:e.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return D``;this._helpers.importMoreInfoControl("climate");const e=Object.keys(this.hass.states).filter((e=>"sun"===e.substr(0,e.indexOf("."))));return D`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${ve.required.icon}`}></ha-icon>
            <div class="title">${ve.required.name}</div>
          </div>
          <div class="secondary">${ve.required.secondary}</div>
        </div>
        ${ve.required.show?D`
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
            <ha-icon .icon=${`mdi:${ve.actions.icon}`}></ha-icon>
            <div class="title">${ve.actions.name}</div>
          </div>
          <div class="secondary">${ve.actions.secondary}</div>
        </div>
        ${ve.actions.show?D`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${ve.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${ve.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${ve.actions.options.tap.secondary}</div>
                </div>
                ${ve.actions.options.tap.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${ve.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${ve.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${ve.actions.options.hold.secondary}</div>
                </div>
                ${ve.actions.options.hold.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${ve.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${ve.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${ve.actions.options.double_tap.secondary}</div>
                </div>
                ${ve.actions.options.double_tap.show?D`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${ve.appearance.icon}`}></ha-icon>
            <div class="title">${ve.appearance.name}</div>
          </div>
          <div class="secondary">${ve.appearance.secondary}</div>
        </div>
        ${ve.appearance.show?D`
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
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(e){this._toggleThing(e,ve.actions.options)}_toggleOption(e){this._toggleThing(e,ve)}_toggleThing(e,t){const i=!t[e.target.option].show;for(const[e]of Object.entries(t))t[e].show=!1;t[e.target.option].show=i,this._toggle=!this._toggle}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(this[`_${t.configValue}`]!==t.value){if(t.configValue)if(""===t.value){const e=Object.assign({},this._config);delete e[t.configValue],this._config=e}else this._config=Object.assign(Object.assign({},this._config),{[t.configValue]:void 0!==t.checked?t.checked:t.value});ue(this,"config-changed",{config:this._config})}}static get styles(){return a`
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
    `}};e([re({attribute:!1})],me.prototype,"hass",void 0),e([le()],me.prototype,"_config",void 0),e([le()],me.prototype,"_toggle",void 0),e([le()],me.prototype,"_helpers",void 0),me=e([(e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t))("donder-scene-modal-editor")],me);class _e{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const ge="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class $e extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:ge?"100px":"50px",height:ge?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach((e=>{document.addEventListener(e,(()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0}),{passive:!0})}))}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",(e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1}));const i=e=>{let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout((()=>{this.startAnimation(t,i),this.held=!0}),this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?ue(e,"action",{action:"hold"}):t.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,ue(e,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,ue(e,"action",{action:"double_tap"})):ue(e,"action",{action:"tap"}))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",s),e.addEventListener("touchcancel",s),e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",s),e.addEventListener("keyup",(e=>{13===e.keyCode&&s(e)}))}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-boilerplate",$e);const fe=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-boilerplate"))return e.querySelector("action-handler-boilerplate");const t=document.createElement("action-handler-boilerplate");return e.appendChild(t),t})();i&&i.bind(e,t)},ye=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends _e{update(e,[t]){return fe(e.element,t),L}render(e){}});console.info("%c  Donder Scene Modal \n%c  version: 2.1.3  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-scene-modal",name:"Donder Scene Modal",description:"A template custom card for you to create something awesome"});class be extends oe{constructor(){super(...arguments),this._mode="content",this._originalName=null,this._hourType=0,this._minuteType=0,this._schedule={hour:"00",minutes:"00",event:null,scheduleSelection:"",days:[{name:"MON",state:!1},{name:"TUE",state:!1},{name:"WED",state:!1},{name:"THU",state:!1},{name:"FRI",state:!1},{name:"SAT",state:!1},{name:"SUN",state:!1}]},this._scene={name:null,group:null,statuses:[]}}static async getConfigElement(){return document.createElement("donder-scene-modal-editor")}static getStubConfig(){return{}}loadMushroomLibrary(){const e=document.createElement("script");e.src="/hacsfiles/lovelace-mushroom/mushroom.js",document.head.appendChild(e),e.onload=()=>{console.log("Mushroom library loaded successfully!")}}firstUpdated(){this.loadMushroomLibrary()}setConfig(e){if(!e)throw new Error("Invalid configuration");e.test_gui&&function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config=Object.assign({name:"Boilerplate"},e)}shouldUpdate(){return!!this.config}connectedCallback(){super.connectedCallback(),this.config.scene?(this._scene=this.config.scene,this._originalName=this.config.scene.name,this._schedule=this.config.scene.schedule||this._schedule):this.config.sceneName?this._scene.name=this.config.sceneName:this.config.roomName&&(this._scene.group=this.config.roomName)}async serviceCall(e,t,i,s,o){try{await this.hass.callService(e,t,i),s(),o&&this.hass.callService("browser_mod","notification",{message:o,duration:5e3,browser_id:localStorage.getItem("browser_mod-browser-id")})}catch(e){this.hass.callService("browser_mod","notification",{message:"Oops, something went wrong..",duration:5e3,browser_id:localStorage.getItem("browser_mod-browser-id")})}}getSensors(){const{sensors:e}=this.config;return e.map((e=>D`<option value="${e.entity}">${e.name}</option>`))}handleCheckboxChange(e){const{entity:t}=e,i=this._scene.statuses.findIndex((e=>e.entity===t));if(i>-1)this._scene.statuses.splice(i,1);else{const i={};"shutters"===e.type?i.current_position=this.hass.states[t].attributes.current_position:i.state=this.hass.states[t].state,this._scene.statuses.push({entity:t,type:e.type,attributes:i})}this.requestUpdate("_scene")}renderShutterEntity(e,t,i,s,o){var n;const{entity:a,name:r,type:l}=e,c=i?this._scene.statuses[o].attributes.current_position:null===(n=this.hass.states[a||""].attributes)||void 0===n?void 0:n.current_position;return D`
      <div class=${"entity "+t}>
        <div class="entity-check">
          <ha-switch
            .checked=${i}
            @action=${()=>this.handleCheckboxChange(e)}
            .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}>
          </ha-switch>
        </div>
        <div class='summary-shutter-wrapper'>
          <!-- <div class="entity-icon">
            <ha-icon icon=${`mdi:${s[l]}`}></ha-icon>
          </div> -->
          <div class='summary-shutter-name'>${r}</div>
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
    `}renderSwitchEntity(e,t,i,s){const{entity:o,name:n}=e,a=i?this._scene.statuses[s].attributes.state:this.hass.states[o||""].state;return D`
      <div class=${"entity "+t}>
        <div class="entity-check">
          <ha-switch
            .checked=${i}
            @action=${()=>this.handleCheckboxChange(e)}
            .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}>
          </ha-switch>
        </div>
        <div class='summary-switch-wrapper'>
          <div class='summary-switch-name'>${n}</div>
          <div class='summary-switch'>
            <ha-control-select
              .options=${[{value:"on",label:"On"},{value:"off",label:"Off"}]}
              .value=${a}
              @value-changed=${e=>this._scene.statuses[s].attributes.state=e.target.value}
            >
            </ha-control-select> 
          </div>
        </div> 
      </div>   
    `}renderClimateEntity(e,t,i,s){var o,n;const{entity:a,name:r}=e;return i?this._scene.statuses[s].attributes.state:this.hass.states[a||""].state,D`
      <div class=${"entity "+t}>
        <div class="entity-check">
          <ha-switch
            .checked=${i}
            @action=${()=>this.handleCheckboxChange(e)}
            .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}>
          </ha-switch>
        </div>
        <div class='summary-climate-wrapper'>
          <div class='summary-climate-name'>${r}</div>
          <div class='summary-climate'>
          <mushroom-card
            .hass=${this.hass}
            .entity=${a}
            .title=${(null===(o=this.config)||void 0===o?void 0:o.name)||""}
            .icon=${"mdi:lightbulb"}
          ></mushroom-card>
          <mushroom-light-card
            .hass=${this.hass}
            .entity=${a}
            .title=${(null===(n=this.config)||void 0===n?void 0:n.name)||""}
            .icon=${"mdi:lightbulb"}
          ></mushroom-light-card>
          </div>
        </div> 
      </div>   
    `}entityGroupComponents(){const e=this.config.devices.reduce(((e,t)=>{const i=t.group;return e[i]||(e[i]=[]),e[i].push(t),e}),{}),t={lights:"lightbulb-outline",switch:"toggle-switch-variant-off",shutters:"window-shutter",climate:"thermostat"};return Object.keys(e).map((i=>D`
            <div class="scene-modal-group-wrapper">
              <div class="scene-modal-group-name">${i}</div>
              <div class="scene-modal-group-content">
                ${e[i].map((e=>{const{entity:i,type:s,sceneable:o}=e,n=this._scene.statuses.findIndex((e=>e.entity===i)),a=n>=0,r=a?"checked":"";if(o){if("shutters"===s)return this.renderShutterEntity(e,r,a,t,n);if("switch"===s)return this.renderSwitchEntity(e,r,a,n);if("climate"===s)return this.renderClimateEntity(e,r,a,n)}return D``}))}
              </div>
            </div>
          `))}updateEvent(e){this._schedule.event=e.target.value,this._schedule.scheduleSelection="event",this.requestUpdate("_scene")}updateCalendarDay(e){this._schedule.days[e].state=!this._schedule.days[e].state,this.requestUpdate("_schedule")}renderCalendarDays(){const e=this._schedule.days.filter((e=>e.state)).map((e=>e.name)),t=0===e.length?"No days selected":7===e.length?"Everyday":5===e.length&&e.includes("MON")&&e.includes("TUE")&&e.includes("WED")&&e.includes("THU")&&e.includes("FRI")?"Weekdays":2===e.length&&e.includes("SAT")&&e.includes("SUN")?"Weekends":`${e.length} days selected`;return D`
      <div class="scheduler-day-summary">
        ${t}
      </div>
      <div class="scheduler-days">
        ${this._schedule.days.map(((e,t)=>D`
            <div class=${"scheduler-day "+(e.state?"active":"")} @click=${()=>this.updateCalendarDay(t)}>
              <div class='scheduler-day-name'>${e.name}</div>
            </div>
          `))}
      </div>
    `}allowOnlyNumbers(e){if(!/^[0-9]$/.test(e.key))return void e.preventDefault();const t=e.target,i=e.key;if("schedule-hour"===t.name)if(0===this._hourType)t.value=i.padStart(2,"0"),this._hourType=1,this._schedule.hour=t.value;else{t.value=(t.value.slice(1)+i).padStart(2,"0"),parseInt(t.value)>23&&(t.value="23"),this._schedule.hour=t.value,this._hourType=0;const e=this.renderRoot.querySelector(".schedule-minutes");e&&e.focus()}else"schedule-minutes"===t.name&&(0===this._minuteType?(t.value=i.padStart(2,"0"),this._minuteType=1,this._schedule.minutes=t.value):(t.value=(t.value.slice(1)+i).padStart(2,"0"),parseInt(t.value)>59&&(t.value="59"),this._schedule.minutes=t.value,this._minuteType=0,t.blur()))}handleTimeInputChange(e){const[t,i]=e.target.value.split(":");this._schedule.hour=t,this._schedule.minutes=i,this._schedule.scheduleSelection="time",this.requestUpdate("_scene")}renderScheduler(){return D`
      <div class=${`scheduler-time ${this._schedule.scheduleSelection}`}>
        <div class='scheduler-time-clock'>
          <input
            type="text"
            name="schedule-hour"
            class="schedule-hour"
            value="${this._schedule.hour}"
            @focus=${()=>{this._schedule.scheduleSelection="time",this._hourType=0}}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
          <span>:</span>
          <input
            type="text"
            name="schedule-minutes"
            class="schedule-minutes"
            value="${this._schedule.minutes}"
            @focus=${()=>{this._schedule.scheduleSelection="time",this._minuteType=0}}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
        </div>
        <div class='scheduler-time-or'>OR</div>
        <div class='scheduler-time-event' @click=${()=>this._schedule.scheduleSelection="event"}>
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
    `}reduceKeys(e){const{type:t,entity:i}=e;return{type:t,entity:i,attributes:{current_position:this.hass.states[i].attributes.current_position}}}updateSceneName(e){this._scene.name=e.target.value}closeModal(){if(this.config.closeModal){const e=this.hass.states["donder_env.global"].attributes;this.hass.callService("browser_mod","popup",{content:{type:"custom:donder-summary-modal",entities:e[this.config.icon],env:e,showScenes:"Routines"===this.config.name},size:"normal",left_button:"Close",left_button_action:this.hass.callService("browser_mod","close_popup",{browser_id:localStorage.getItem("browser_mod-browser-id")}),browser_id:localStorage.getItem("browser_mod-browser-id"),card_mod:{style:{"ha-dialog$":"div.mdc-dialog div.mdc-dialog__surface {\n              max-width: 90%;\n            }\n            "}}})}else this.hass.callService("browser_mod","close_popup")}save(){var e;const t=null===(e=this.hass.states["donder_scenes.global"])||void 0===e?void 0:e.attributes,i=this._schedule.days.some((e=>e.state));this._originalName&&t[this._originalName]&&delete t[this._originalName],this._scene.name&&this.serviceCall("donder_scenes","write",Object.assign(Object.assign({},t),{[this._scene.name]:Object.assign(Object.assign({},this._scene),{schedule:i?this._schedule:null})}),(()=>{this._originalName=this._scene.name,this.closeModal()}),"Scene saved")}deleteScene(){var e;const t=null===(e=this.hass.states["donder_scenes.global"])||void 0===e?void 0:e.attributes;this._originalName&&t[this._originalName]&&(delete t[this._originalName],this.serviceCall("donder_scenes","write",t,(()=>{this.closeModal()}),"Scene deleted"))}editSchedule(){this._mode="scheduler"===this._mode?"content":"scheduler"}_showWarning(e){return D`
      <hui-warning>${e}</hui-warning>
    `}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),D`
      ${t}
    `}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");const{isNested:e}=this.config,t=this._schedule.days.some((e=>e.state));return D`
      <ha-card
        tabindex="0"
        .label=${`Boilerplate: ${this.config||"No Entity Defined"}`}
      >
        <div class=${`donder-widget ${this._mode} ${e?"nested":""} ${t?"has-schedule":""} `}>
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
                  class="button delete"
                  @action=${this.deleteScene}
                  .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}
                >
                  <ha-icon icon='mdi:trash-can-outline'></ha-icon>
                </button>`}
              <button
                class="button schedule"
                @action=${this.editSchedule}
                .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}
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
              .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}
            >Cancel</button>
            
            <button
              class="button back"
              @action=${()=>this._mode="content"}
              .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}
            >Back</button>
              
            <button
              class="button save"
              ?disabled=${!this._scene.name}
              @action=${this._scene.name?this.save:null}
              .actionHandler=${ye({hasHold:pe(this.config.hold_action)})}
            >Save current state</button>
          </div>
        </div>
      </ha-card>
    `}}e([re()],be.prototype,"state",void 0),e([re()],be.prototype,"hass",void 0),e([re()],be.prototype,"config",void 0),e([re()],be.prototype,"event",void 0),e([re()],be.prototype,"callback",void 0),e([le()],be.prototype,"_active",void 0),e([le()],be.prototype,"_mode",void 0),e([le()],be.prototype,"_originalName",void 0),e([le()],be.prototype,"_hourType",void 0),e([le()],be.prototype,"_minuteType",void 0),e([le()],be.prototype,"_schedule",void 0),e([le()],be.prototype,"_scene",void 0),customElements.define("donder-scene-modal",be);export{be as BoilerplateCard};
