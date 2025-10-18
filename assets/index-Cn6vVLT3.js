(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Su(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ft={},is=[],si=()=>{},md=()=>!1,Ga=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Mu=n=>n.startsWith("onUpdate:"),tn=Object.assign,yu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},n_=Object.prototype.hasOwnProperty,st=(n,e)=>n_.call(n,e),Ve=Array.isArray,rs=n=>Wa(n)==="[object Map]",_d=n=>Wa(n)==="[object Set]",We=n=>typeof n=="function",Pt=n=>typeof n=="string",nr=n=>typeof n=="symbol",_t=n=>n!==null&&typeof n=="object",gd=n=>(_t(n)||We(n))&&We(n.then)&&We(n.catch),vd=Object.prototype.toString,Wa=n=>vd.call(n),i_=n=>Wa(n).slice(8,-1),xd=n=>Wa(n)==="[object Object]",Eu=n=>Pt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ws=Su(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xa=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},r_=/-\w/g,Ki=Xa(n=>n.replace(r_,e=>e.slice(1).toUpperCase())),s_=/\B([A-Z])/g,Ur=Xa(n=>n.replace(s_,"-$1").toLowerCase()),Sd=Xa(n=>n.charAt(0).toUpperCase()+n.slice(1)),al=Xa(n=>n?`on${Sd(n)}`:""),Wi=(n,e)=>!Object.is(n,e),ll=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Md=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},o_=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Mf;const qa=()=>Mf||(Mf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function eo(n){if(Ve(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Pt(i)?u_(i):eo(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Pt(n)||_t(n))return n}const a_=/;(?![^(]*\))/g,l_=/:([^]+)/,c_=/\/\*[^]*?\*\//g;function u_(n){const e={};return n.replace(c_,"").split(a_).forEach(t=>{if(t){const i=t.split(l_);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function on(n){let e="";if(Pt(n))e=n;else if(Ve(n))for(let t=0;t<n.length;t++){const i=on(n[t]);i&&(e+=i+" ")}else if(_t(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const f_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",h_=Su(f_);function yd(n){return!!n||n===""}const Ed=n=>!!(n&&n.__v_isRef===!0),Vt=n=>Pt(n)?n:n==null?"":Ve(n)||_t(n)&&(n.toString===vd||!We(n.toString))?Ed(n)?Vt(n.value):JSON.stringify(n,Td,2):String(n),Td=(n,e)=>Ed(e)?Td(n,e.value):rs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[cl(i,s)+" =>"]=r,t),{})}:_d(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>cl(t))}:nr(e)?cl(e):_t(e)&&!Ve(e)&&!xd(e)?String(e):e,cl=(n,e="")=>{var t;return nr(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let sn;class d_{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=sn,!e&&sn&&(this.index=(sn.scopes||(sn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=sn;try{return sn=this,e()}finally{sn=t}}}on(){++this._on===1&&(this.prevScope=sn,sn=this)}off(){this._on>0&&--this._on===0&&(sn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function p_(){return sn}let dt;const ul=new WeakSet;class bd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,sn&&sn.active&&sn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ul.has(this)&&(ul.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||wd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,yf(this),Rd(this);const e=dt,t=qn;dt=this,qn=!0;try{return this.fn()}finally{Cd(this),dt=e,qn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Au(e);this.deps=this.depsTail=void 0,yf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ul.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ic(this)&&this.run()}get dirty(){return ic(this)}}let Ad=0,Xs,qs;function wd(n,e=!1){if(n.flags|=8,e){n.next=qs,qs=n;return}n.next=Xs,Xs=n}function Tu(){Ad++}function bu(){if(--Ad>0)return;if(qs){let e=qs;for(qs=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Xs;){let e=Xs;for(Xs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Rd(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Cd(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),Au(i),m_(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function ic(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Pd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Pd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===to)||(n.globalVersion=to,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ic(n))))return;n.flags|=2;const e=n.dep,t=dt,i=qn;dt=n,qn=!0;try{Rd(n);const r=n.fn(n._value);(e.version===0||Wi(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{dt=t,qn=i,Cd(n),n.flags&=-3}}function Au(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)Au(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function m_(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let qn=!0;const Dd=[];function bi(){Dd.push(qn),qn=!1}function Ai(){const n=Dd.pop();qn=n===void 0?!0:n}function yf(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=dt;dt=void 0;try{e()}finally{dt=t}}}let to=0;class __{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class wu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!dt||!qn||dt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==dt)t=this.activeLink=new __(dt,this),dt.deps?(t.prevDep=dt.depsTail,dt.depsTail.nextDep=t,dt.depsTail=t):dt.deps=dt.depsTail=t,Ld(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=dt.depsTail,t.nextDep=void 0,dt.depsTail.nextDep=t,dt.depsTail=t,dt.deps===t&&(dt.deps=i)}return t}trigger(e){this.version++,to++,this.notify(e)}notify(e){Tu();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{bu()}}}function Ld(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Ld(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const rc=new WeakMap,br=Symbol(""),sc=Symbol(""),no=Symbol("");function Wt(n,e,t){if(qn&&dt){let i=rc.get(n);i||rc.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new wu),r.map=i,r.key=t),r.track()}}function xi(n,e,t,i,r,s){const o=rc.get(n);if(!o){to++;return}const a=l=>{l&&l.trigger()};if(Tu(),e==="clear")o.forEach(a);else{const l=Ve(n),u=l&&Eu(t);if(l&&t==="length"){const f=Number(i);o.forEach((h,d)=>{(d==="length"||d===no||!nr(d)&&d>=f)&&a(h)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),u&&a(o.get(no)),e){case"add":l?u&&a(o.get("length")):(a(o.get(br)),rs(n)&&a(o.get(sc)));break;case"delete":l||(a(o.get(br)),rs(n)&&a(o.get(sc)));break;case"set":rs(n)&&a(o.get(br));break}}bu()}function Or(n){const e=rt(n);return e===n?e:(Wt(e,"iterate",no),zn(n)?e:e.map(Bt))}function Ya(n){return Wt(n=rt(n),"iterate",no),n}const g_={__proto__:null,[Symbol.iterator](){return fl(this,Symbol.iterator,Bt)},concat(...n){return Or(this).concat(...n.map(e=>Ve(e)?Or(e):e))},entries(){return fl(this,"entries",n=>(n[1]=Bt(n[1]),n))},every(n,e){return ci(this,"every",n,e,void 0,arguments)},filter(n,e){return ci(this,"filter",n,e,t=>t.map(Bt),arguments)},find(n,e){return ci(this,"find",n,e,Bt,arguments)},findIndex(n,e){return ci(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ci(this,"findLast",n,e,Bt,arguments)},findLastIndex(n,e){return ci(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ci(this,"forEach",n,e,void 0,arguments)},includes(...n){return hl(this,"includes",n)},indexOf(...n){return hl(this,"indexOf",n)},join(n){return Or(this).join(n)},lastIndexOf(...n){return hl(this,"lastIndexOf",n)},map(n,e){return ci(this,"map",n,e,void 0,arguments)},pop(){return Ps(this,"pop")},push(...n){return Ps(this,"push",n)},reduce(n,...e){return Ef(this,"reduce",n,e)},reduceRight(n,...e){return Ef(this,"reduceRight",n,e)},shift(){return Ps(this,"shift")},some(n,e){return ci(this,"some",n,e,void 0,arguments)},splice(...n){return Ps(this,"splice",n)},toReversed(){return Or(this).toReversed()},toSorted(n){return Or(this).toSorted(n)},toSpliced(...n){return Or(this).toSpliced(...n)},unshift(...n){return Ps(this,"unshift",n)},values(){return fl(this,"values",Bt)}};function fl(n,e,t){const i=Ya(n),r=i[e]();return i!==n&&!zn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const v_=Array.prototype;function ci(n,e,t,i,r,s){const o=Ya(n),a=o!==n&&!zn(n),l=o[e];if(l!==v_[e]){const h=l.apply(n,s);return a?Bt(h):h}let u=t;o!==n&&(a?u=function(h,d){return t.call(this,Bt(h),d,n)}:t.length>2&&(u=function(h,d){return t.call(this,h,d,n)}));const f=l.call(o,u,i);return a&&r?r(f):f}function Ef(n,e,t,i){const r=Ya(n);let s=t;return r!==n&&(zn(n)?t.length>3&&(s=function(o,a,l){return t.call(this,o,a,l,n)}):s=function(o,a,l){return t.call(this,o,Bt(a),l,n)}),r[e](s,...i)}function hl(n,e,t){const i=rt(n);Wt(i,"iterate",no);const r=i[e](...t);return(r===-1||r===!1)&&Du(t[0])?(t[0]=rt(t[0]),i[e](...t)):r}function Ps(n,e,t=[]){bi(),Tu();const i=rt(n)[e].apply(n,t);return bu(),Ai(),i}const x_=Su("__proto__,__v_isRef,__isVue"),Id=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(nr));function S_(n){nr(n)||(n=String(n));const e=rt(this);return Wt(e,"has",n),e.hasOwnProperty(n)}class Ud{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?P_:Bd:s?Od:Fd).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Ve(e);if(!r){let l;if(o&&(l=g_[t]))return l;if(t==="hasOwnProperty")return S_}const a=Reflect.get(e,t,qt(e)?e:i);if((nr(t)?Id.has(t):x_(t))||(r||Wt(e,"get",t),s))return a;if(qt(a)){const l=o&&Eu(t)?a:a.value;return r&&_t(l)?ac(l):l}return _t(a)?r?ac(a):Cu(a):a}}class Nd extends Ud{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._isShallow){const l=ji(s);if(!zn(i)&&!ji(i)&&(s=rt(s),i=rt(i)),!Ve(e)&&qt(s)&&!qt(i))return l||(s.value=i),!0}const o=Ve(e)&&Eu(t)?Number(t)<e.length:st(e,t),a=Reflect.set(e,t,i,qt(e)?e:r);return e===rt(r)&&(o?Wi(i,s)&&xi(e,"set",t,i):xi(e,"add",t,i)),a}deleteProperty(e,t){const i=st(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&xi(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!nr(t)||!Id.has(t))&&Wt(e,"has",t),i}ownKeys(e){return Wt(e,"iterate",Ve(e)?"length":br),Reflect.ownKeys(e)}}class M_ extends Ud{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const y_=new Nd,E_=new M_,T_=new Nd(!0);const oc=n=>n,Lo=n=>Reflect.getPrototypeOf(n);function b_(n,e,t){return function(...i){const r=this.__v_raw,s=rt(r),o=rs(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,u=r[n](...i),f=t?oc:e?Ma:Bt;return!e&&Wt(s,"iterate",l?sc:br),{next(){const{value:h,done:d}=u.next();return d?{value:h,done:d}:{value:a?[f(h[0]),f(h[1])]:f(h),done:d}},[Symbol.iterator](){return this}}}}function Io(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function A_(n,e){const t={get(r){const s=this.__v_raw,o=rt(s),a=rt(r);n||(Wi(r,a)&&Wt(o,"get",r),Wt(o,"get",a));const{has:l}=Lo(o),u=e?oc:n?Ma:Bt;if(l.call(o,r))return u(s.get(r));if(l.call(o,a))return u(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!n&&Wt(rt(r),"iterate",br),r.size},has(r){const s=this.__v_raw,o=rt(s),a=rt(r);return n||(Wi(r,a)&&Wt(o,"has",r),Wt(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=rt(a),u=e?oc:n?Ma:Bt;return!n&&Wt(l,"iterate",br),a.forEach((f,h)=>r.call(s,u(f),u(h),o))}};return tn(t,n?{add:Io("add"),set:Io("set"),delete:Io("delete"),clear:Io("clear")}:{add(r){!e&&!zn(r)&&!ji(r)&&(r=rt(r));const s=rt(this);return Lo(s).has.call(s,r)||(s.add(r),xi(s,"add",r,r)),this},set(r,s){!e&&!zn(s)&&!ji(s)&&(s=rt(s));const o=rt(this),{has:a,get:l}=Lo(o);let u=a.call(o,r);u||(r=rt(r),u=a.call(o,r));const f=l.call(o,r);return o.set(r,s),u?Wi(s,f)&&xi(o,"set",r,s):xi(o,"add",r,s),this},delete(r){const s=rt(this),{has:o,get:a}=Lo(s);let l=o.call(s,r);l||(r=rt(r),l=o.call(s,r)),a&&a.call(s,r);const u=s.delete(r);return l&&xi(s,"delete",r,void 0),u},clear(){const r=rt(this),s=r.size!==0,o=r.clear();return s&&xi(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=b_(r,n,e)}),t}function Ru(n,e){const t=A_(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(st(t,r)&&r in i?t:i,r,s)}const w_={get:Ru(!1,!1)},R_={get:Ru(!1,!0)},C_={get:Ru(!0,!1)};const Fd=new WeakMap,Od=new WeakMap,Bd=new WeakMap,P_=new WeakMap;function D_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function L_(n){return n.__v_skip||!Object.isExtensible(n)?0:D_(i_(n))}function Cu(n){return ji(n)?n:Pu(n,!1,y_,w_,Fd)}function I_(n){return Pu(n,!1,T_,R_,Od)}function ac(n){return Pu(n,!0,E_,C_,Bd)}function Pu(n,e,t,i,r){if(!_t(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=L_(n);if(s===0)return n;const o=r.get(n);if(o)return o;const a=new Proxy(n,s===2?i:t);return r.set(n,a),a}function ss(n){return ji(n)?ss(n.__v_raw):!!(n&&n.__v_isReactive)}function ji(n){return!!(n&&n.__v_isReadonly)}function zn(n){return!!(n&&n.__v_isShallow)}function Du(n){return n?!!n.__v_raw:!1}function rt(n){const e=n&&n.__v_raw;return e?rt(e):n}function U_(n){return!st(n,"__v_skip")&&Object.isExtensible(n)&&Md(n,"__v_skip",!0),n}const Bt=n=>_t(n)?Cu(n):n,Ma=n=>_t(n)?ac(n):n;function qt(n){return n?n.__v_isRef===!0:!1}function wt(n){return N_(n,!1)}function N_(n,e){return qt(n)?n:new F_(n,e)}class F_{constructor(e,t){this.dep=new wu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:rt(e),this._value=t?e:Bt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||zn(e)||ji(e);e=i?e:rt(e),Wi(e,t)&&(this._rawValue=e,this._value=i?e:Bt(e),this.dep.trigger())}}function Nt(n){return qt(n)?n.value:n}const O_={get:(n,e,t)=>e==="__v_raw"?n:Nt(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return qt(r)&&!qt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function zd(n){return ss(n)?n:new Proxy(n,O_)}class B_{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new wu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=to-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&dt!==this)return wd(this,!0),!0}get value(){const e=this.dep.track();return Pd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function z_(n,e,t=!1){let i,r;return We(n)?i=n:(i=n.get,r=n.set),new B_(i,r,t)}const Uo={},ya=new WeakMap;let _r;function H_(n,e=!1,t=_r){if(t){let i=ya.get(t);i||ya.set(t,i=[]),i.push(n)}}function k_(n,e,t=ft){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,u=x=>r?x:zn(x)||r===!1||r===0?Si(x,1):Si(x);let f,h,d,p,v=!1,g=!1;if(qt(n)?(h=()=>n.value,v=zn(n)):ss(n)?(h=()=>u(n),v=!0):Ve(n)?(g=!0,v=n.some(x=>ss(x)||zn(x)),h=()=>n.map(x=>{if(qt(x))return x.value;if(ss(x))return u(x);if(We(x))return l?l(x,2):x()})):We(n)?e?h=l?()=>l(n,2):n:h=()=>{if(d){bi();try{d()}finally{Ai()}}const x=_r;_r=f;try{return l?l(n,3,[p]):n(p)}finally{_r=x}}:h=si,e&&r){const x=h,w=r===!0?1/0:r;h=()=>Si(x(),w)}const _=p_(),m=()=>{f.stop(),_&&_.active&&yu(_.effects,f)};if(s&&e){const x=e;e=(...w)=>{x(...w),m()}}let E=g?new Array(n.length).fill(Uo):Uo;const T=x=>{if(!(!(f.flags&1)||!f.dirty&&!x))if(e){const w=f.run();if(r||v||(g?w.some((P,D)=>Wi(P,E[D])):Wi(w,E))){d&&d();const P=_r;_r=f;try{const D=[w,E===Uo?void 0:g&&E[0]===Uo?[]:E,p];E=w,l?l(e,3,D):e(...D)}finally{_r=P}}}else f.run()};return a&&a(T),f=new bd(h),f.scheduler=o?()=>o(T,!1):T,p=x=>H_(x,!1,f),d=f.onStop=()=>{const x=ya.get(f);if(x){if(l)l(x,4);else for(const w of x)w();ya.delete(f)}},e?i?T(!0):E=f.run():o?o(T.bind(null,!0),!0):f.run(),m.pause=f.pause.bind(f),m.resume=f.resume.bind(f),m.stop=m,m}function Si(n,e=1/0,t){if(e<=0||!_t(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,qt(n))Si(n.value,e,t);else if(Ve(n))for(let i=0;i<n.length;i++)Si(n[i],e,t);else if(_d(n)||rs(n))n.forEach(i=>{Si(i,e,t)});else if(xd(n)){for(const i in n)Si(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Si(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function xo(n,e,t,i){try{return i?n(...i):n()}catch(r){$a(r,e,t)}}function oi(n,e,t,i){if(We(n)){const r=xo(n,e,t,i);return r&&gd(r)&&r.catch(s=>{$a(s,e,t)}),r}if(Ve(n)){const r=[];for(let s=0;s<n.length;s++)r.push(oi(n[s],e,t,i));return r}}function $a(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ft;if(e){let a=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const f=a.ec;if(f){for(let h=0;h<f.length;h++)if(f[h](n,l,u)===!1)return}a=a.parent}if(s){bi(),xo(s,null,10,[n,l,u]),Ai();return}}V_(n,t,r,i,o)}function V_(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const Jt=[];let Zn=-1;const os=[];let Bi=null,Qr=0;const Hd=Promise.resolve();let Ea=null;function G_(n){const e=Ea||Hd;return n?e.then(this?n.bind(this):n):e}function W_(n){let e=Zn+1,t=Jt.length;for(;e<t;){const i=e+t>>>1,r=Jt[i],s=io(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function Lu(n){if(!(n.flags&1)){const e=io(n),t=Jt[Jt.length-1];!t||!(n.flags&2)&&e>=io(t)?Jt.push(n):Jt.splice(W_(e),0,n),n.flags|=1,kd()}}function kd(){Ea||(Ea=Hd.then(Gd))}function X_(n){Ve(n)?os.push(...n):Bi&&n.id===-1?Bi.splice(Qr+1,0,n):n.flags&1||(os.push(n),n.flags|=1),kd()}function Tf(n,e,t=Zn+1){for(;t<Jt.length;t++){const i=Jt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Jt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Vd(n){if(os.length){const e=[...new Set(os)].sort((t,i)=>io(t)-io(i));if(os.length=0,Bi){Bi.push(...e);return}for(Bi=e,Qr=0;Qr<Bi.length;Qr++){const t=Bi[Qr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Bi=null,Qr=0}}const io=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Gd(n){try{for(Zn=0;Zn<Jt.length;Zn++){const e=Jt[Zn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),xo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Zn<Jt.length;Zn++){const e=Jt[Zn];e&&(e.flags&=-2)}Zn=-1,Jt.length=0,Vd(),Ea=null,(Jt.length||os.length)&&Gd()}}let Nn=null,Wd=null;function Ta(n){const e=Nn;return Nn=n,Wd=n&&n.type.__scopeId||null,e}function q_(n,e=Nn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&Uf(-1);const s=Ta(e);let o;try{o=n(...r)}finally{Ta(s),i._d&&Uf(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Y_(n,e){if(Nn===null)return n;const t=Ja(Nn),i=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[s,o,a,l=ft]=e[r];s&&(We(s)&&(s={mounted:s,updated:s}),s.deep&&Si(o),i.push({dir:s,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function or(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(bi(),oi(l,t,8,[n.el,a,n,e]),Ai())}}const $_=Symbol("_vte"),K_=n=>n.__isTeleport,j_=Symbol("_leaveCb");function Iu(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Iu(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Xd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const ba=new WeakMap;function Ys(n,e,t,i,r=!1){if(Ve(n)){n.forEach((v,g)=>Ys(v,e&&(Ve(e)?e[g]:e),t,i,r));return}if($s(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ys(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?Ja(i.component):i.el,o=r?null:s,{i:a,r:l}=n,u=e&&e.r,f=a.refs===ft?a.refs={}:a.refs,h=a.setupState,d=rt(h),p=h===ft?md:v=>st(d,v);if(u!=null&&u!==l){if(bf(e),Pt(u))f[u]=null,p(u)&&(h[u]=null);else if(qt(u)){u.value=null;const v=e;v.k&&(f[v.k]=null)}}if(We(l))xo(l,a,12,[o,f]);else{const v=Pt(l),g=qt(l);if(v||g){const _=()=>{if(n.f){const m=v?p(l)?h[l]:f[l]:l.value;if(r)Ve(m)&&yu(m,s);else if(Ve(m))m.includes(s)||m.push(s);else if(v)f[l]=[s],p(l)&&(h[l]=f[l]);else{const E=[s];l.value=E,n.k&&(f[n.k]=E)}}else v?(f[l]=o,p(l)&&(h[l]=o)):g&&(l.value=o,n.k&&(f[n.k]=o))};if(o){const m=()=>{_(),ba.delete(n)};m.id=-1,ba.set(n,m),xn(m,t)}else bf(n),_()}}}function bf(n){const e=ba.get(n);e&&(e.flags|=8,ba.delete(n))}qa().requestIdleCallback;qa().cancelIdleCallback;const $s=n=>!!n.type.__asyncLoader,qd=n=>n.type.__isKeepAlive;function Z_(n,e){Yd(n,"a",e)}function J_(n,e){Yd(n,"da",e)}function Yd(n,e,t=Qt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Ka(e,i,t),t){let r=t.parent;for(;r&&r.parent;)qd(r.parent.vnode)&&Q_(i,e,t,r),r=r.parent}}function Q_(n,e,t,i){const r=Ka(e,n,i,!0);Uu(()=>{yu(i[e],r)},t)}function Ka(n,e,t=Qt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{bi();const a=Mo(t),l=oi(e,t,n,o);return a(),Ai(),l});return i?r.unshift(s):r.push(s),s}}const Di=n=>(e,t=Qt)=>{(!so||n==="sp")&&Ka(n,(...i)=>e(...i),t)},eg=Di("bm"),So=Di("m"),tg=Di("bu"),ng=Di("u"),ig=Di("bum"),Uu=Di("um"),rg=Di("sp"),sg=Di("rtg"),og=Di("rtc");function ag(n,e=Qt){Ka("ec",n,e)}const lg=Symbol.for("v-ndc");function Aa(n,e,t,i){let r;const s=t,o=Ve(n);if(o||Pt(n)){const a=o&&ss(n);let l=!1,u=!1;a&&(l=!zn(n),u=ji(n),n=Ya(n)),r=new Array(n.length);for(let f=0,h=n.length;f<h;f++)r[f]=e(l?u?Ma(Bt(n[f])):Bt(n[f]):n[f],f,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let a=0;a<n;a++)r[a]=e(a+1,a,void 0,s)}else if(_t(n))if(n[Symbol.iterator])r=Array.from(n,(a,l)=>e(a,l,void 0,s));else{const a=Object.keys(n);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){const f=a[l];r[l]=e(n[f],f,l,s)}}else r=[];return r}const lc=n=>n?mp(n)?Ja(n):lc(n.parent):null,Ks=tn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>lc(n.parent),$root:n=>lc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Kd(n),$forceUpdate:n=>n.f||(n.f=()=>{Lu(n.update)}),$nextTick:n=>n.n||(n.n=G_.bind(n.proxy)),$watch:n=>Pg.bind(n)}),dl=(n,e)=>n!==ft&&!n.__isScriptSetup&&st(n,e),cg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let u;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(dl(i,e))return o[e]=1,i[e];if(r!==ft&&st(r,e))return o[e]=2,r[e];if((u=n.propsOptions[0])&&st(u,e))return o[e]=3,s[e];if(t!==ft&&st(t,e))return o[e]=4,t[e];cc&&(o[e]=0)}}const f=Ks[e];let h,d;if(f)return e==="$attrs"&&Wt(n.attrs,"get",""),f(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==ft&&st(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,st(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return dl(r,e)?(r[e]=t,!0):i!==ft&&st(i,e)?(i[e]=t,!0):st(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s,type:o}},a){let l,u;return!!(t[a]||n!==ft&&a[0]!=="$"&&st(n,a)||dl(e,a)||(l=s[0])&&st(l,a)||st(i,a)||st(Ks,a)||st(r.config.globalProperties,a)||(u=o.__cssModules)&&u[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:st(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Af(n){return Ve(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let cc=!0;function ug(n){const e=Kd(n),t=n.proxy,i=n.ctx;cc=!1,e.beforeCreate&&wf(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:u,created:f,beforeMount:h,mounted:d,beforeUpdate:p,updated:v,activated:g,deactivated:_,beforeDestroy:m,beforeUnmount:E,destroyed:T,unmounted:x,render:w,renderTracked:P,renderTriggered:D,errorCaptured:C,serverPrefetch:M,expose:b,inheritAttrs:L,components:F,directives:O,filters:Q}=e;if(u&&fg(u,i,null),o)for(const K in o){const H=o[K];We(H)&&(i[K]=H.bind(t))}if(r){const K=r.call(t,t);_t(K)&&(n.data=Cu(K))}if(cc=!0,s)for(const K in s){const H=s[K],pe=We(H)?H.bind(t,t):We(H.get)?H.get.bind(t,t):si,_e=!We(H)&&We(H.set)?H.set.bind(t):si,Te=fa({get:pe,set:_e});Object.defineProperty(i,K,{enumerable:!0,configurable:!0,get:()=>Te.value,set:Ue=>Te.value=Ue})}if(a)for(const K in a)$d(a[K],i,t,K);if(l){const K=We(l)?l.call(t):l;Reflect.ownKeys(K).forEach(H=>{gg(H,K[H])})}f&&wf(f,n,"c");function X(K,H){Ve(H)?H.forEach(pe=>K(pe.bind(t))):H&&K(H.bind(t))}if(X(eg,h),X(So,d),X(tg,p),X(ng,v),X(Z_,g),X(J_,_),X(ag,C),X(og,P),X(sg,D),X(ig,E),X(Uu,x),X(rg,M),Ve(b))if(b.length){const K=n.exposed||(n.exposed={});b.forEach(H=>{Object.defineProperty(K,H,{get:()=>t[H],set:pe=>t[H]=pe,enumerable:!0})})}else n.exposed||(n.exposed={});w&&n.render===si&&(n.render=w),L!=null&&(n.inheritAttrs=L),F&&(n.components=F),O&&(n.directives=O),M&&Xd(n)}function fg(n,e,t=si){Ve(n)&&(n=uc(n));for(const i in n){const r=n[i];let s;_t(r)?"default"in r?s=la(r.from||i,r.default,!0):s=la(r.from||i):s=la(r),qt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function wf(n,e,t){oi(Ve(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function $d(n,e,t,i){let r=i.includes(".")?lp(t,i):()=>t[i];if(Pt(n)){const s=e[n];We(s)&&Ar(r,s)}else if(We(n))Ar(r,n.bind(t));else if(_t(n))if(Ve(n))n.forEach(s=>$d(s,e,t,i));else{const s=We(n.handler)?n.handler.bind(t):e[n.handler];We(s)&&Ar(r,s,n)}}function Kd(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(u=>wa(l,u,o,!0)),wa(l,e,o)),_t(e)&&s.set(e,l),l}function wa(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&wa(n,s,t,!0),r&&r.forEach(o=>wa(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=hg[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const hg={data:Rf,props:Cf,emits:Cf,methods:Hs,computed:Hs,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:Hs,directives:Hs,watch:pg,provide:Rf,inject:dg};function Rf(n,e){return e?n?function(){return tn(We(n)?n.call(this,this):n,We(e)?e.call(this,this):e)}:e:n}function dg(n,e){return Hs(uc(n),uc(e))}function uc(n){if(Ve(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function jt(n,e){return n?[...new Set([].concat(n,e))]:e}function Hs(n,e){return n?tn(Object.create(null),n,e):e}function Cf(n,e){return n?Ve(n)&&Ve(e)?[...new Set([...n,...e])]:tn(Object.create(null),Af(n),Af(e??{})):e}function pg(n,e){if(!n)return e;if(!e)return n;const t=tn(Object.create(null),n);for(const i in e)t[i]=jt(n[i],e[i]);return t}function jd(){return{app:null,config:{isNativeTag:md,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let mg=0;function _g(n,e){return function(i,r=null){We(i)||(i=tn({},i)),r!=null&&!_t(r)&&(r=null);const s=jd(),o=new WeakSet,a=[];let l=!1;const u=s.app={_uid:mg++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Qg,get config(){return s.config},set config(f){},use(f,...h){return o.has(f)||(f&&We(f.install)?(o.add(f),f.install(u,...h)):We(f)&&(o.add(f),f(u,...h))),u},mixin(f){return s.mixins.includes(f)||s.mixins.push(f),u},component(f,h){return h?(s.components[f]=h,u):s.components[f]},directive(f,h){return h?(s.directives[f]=h,u):s.directives[f]},mount(f,h,d){if(!l){const p=u._ceVNode||an(i,r);return p.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),n(p,f,d),l=!0,u._container=f,f.__vue_app__=u,Ja(p.component)}},onUnmount(f){a.push(f)},unmount(){l&&(oi(a,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(f,h){return s.provides[f]=h,u},runWithContext(f){const h=as;as=u;try{return f()}finally{as=h}}};return u}}let as=null;function gg(n,e){if(Qt){let t=Qt.provides;const i=Qt.parent&&Qt.parent.provides;i===t&&(t=Qt.provides=Object.create(i)),t[n]=e}}function la(n,e,t=!1){const i=Yg();if(i||as){let r=as?as._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&We(e)?e.call(i&&i.proxy):e}}const Zd={},Jd=()=>Object.create(Zd),Qd=n=>Object.getPrototypeOf(n)===Zd;function vg(n,e,t,i=!1){const r={},s=Jd();n.propsDefaults=Object.create(null),ep(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:I_(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function xg(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=rt(r),[l]=n.propsOptions;let u=!1;if((i||o>0)&&!(o&16)){if(o&8){const f=n.vnode.dynamicProps;for(let h=0;h<f.length;h++){let d=f[h];if(ja(n.emitsOptions,d))continue;const p=e[d];if(l)if(st(s,d))p!==s[d]&&(s[d]=p,u=!0);else{const v=Ki(d);r[v]=fc(l,a,v,p,n,!1)}else p!==s[d]&&(s[d]=p,u=!0)}}}else{ep(n,e,r,s)&&(u=!0);let f;for(const h in a)(!e||!st(e,h)&&((f=Ur(h))===h||!st(e,f)))&&(l?t&&(t[h]!==void 0||t[f]!==void 0)&&(r[h]=fc(l,a,h,void 0,n,!0)):delete r[h]);if(s!==a)for(const h in s)(!e||!st(e,h))&&(delete s[h],u=!0)}u&&xi(n.attrs,"set","")}function ep(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Ws(l))continue;const u=e[l];let f;r&&st(r,f=Ki(l))?!s||!s.includes(f)?t[f]=u:(a||(a={}))[f]=u:ja(n.emitsOptions,l)||(!(l in i)||u!==i[l])&&(i[l]=u,o=!0)}if(s){const l=rt(t),u=a||ft;for(let f=0;f<s.length;f++){const h=s[f];t[h]=fc(r,l,h,u[h],n,!st(u,h))}}return o}function fc(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=st(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&We(l)){const{propsDefaults:u}=r;if(t in u)i=u[t];else{const f=Mo(r);i=u[t]=l.call(null,e),f()}}else i=l;r.ce&&r.ce._setProp(t,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===Ur(t))&&(i=!0))}return i}const Sg=new WeakMap;function tp(n,e,t=!1){const i=t?Sg:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!We(n)){const f=h=>{l=!0;const[d,p]=tp(h,e,!0);tn(o,d),p&&a.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(f),n.extends&&f(n.extends),n.mixins&&n.mixins.forEach(f)}if(!s&&!l)return _t(n)&&i.set(n,is),is;if(Ve(s))for(let f=0;f<s.length;f++){const h=Ki(s[f]);Pf(h)&&(o[h]=ft)}else if(s)for(const f in s){const h=Ki(f);if(Pf(h)){const d=s[f],p=o[h]=Ve(d)||We(d)?{type:d}:tn({},d),v=p.type;let g=!1,_=!0;if(Ve(v))for(let m=0;m<v.length;++m){const E=v[m],T=We(E)&&E.name;if(T==="Boolean"){g=!0;break}else T==="String"&&(_=!1)}else g=We(v)&&v.name==="Boolean";p[0]=g,p[1]=_,(g||st(p,"default"))&&a.push(h)}}const u=[o,a];return _t(n)&&i.set(n,u),u}function Pf(n){return n[0]!=="$"&&!Ws(n)}const Nu=n=>n==="_"||n==="_ctx"||n==="$stable",Fu=n=>Ve(n)?n.map(Qn):[Qn(n)],Mg=(n,e,t)=>{if(e._n)return e;const i=q_((...r)=>Fu(e(...r)),t);return i._c=!1,i},np=(n,e,t)=>{const i=n._ctx;for(const r in n){if(Nu(r))continue;const s=n[r];if(We(s))e[r]=Mg(r,s,i);else if(s!=null){const o=Fu(s);e[r]=()=>o}}},ip=(n,e)=>{const t=Fu(e);n.slots.default=()=>t},rp=(n,e,t)=>{for(const i in e)(t||!Nu(i))&&(n[i]=e[i])},yg=(n,e,t)=>{const i=n.slots=Jd();if(n.vnode.shapeFlag&32){const r=e._;r?(rp(i,e,t),t&&Md(i,"_",r,!0)):np(e,i)}else e&&ip(n,e)},Eg=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=ft;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:rp(r,e,t):(s=!e.$stable,np(e,r)),o=e}else e&&(ip(n,e),o={default:1});if(s)for(const a in r)!Nu(a)&&o[a]==null&&delete r[a]},xn=Bg;function Tg(n){return bg(n)}function bg(n,e){const t=qa();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:u,setElementText:f,parentNode:h,nextSibling:d,setScopeId:p=si,insertStaticContent:v}=n,g=(I,y,q,ee=null,Y=null,k=null,ae=void 0,Z=null,ne=!!y.dynamicChildren)=>{if(I===y)return;I&&!Ds(I,y)&&(ee=oe(I),Ue(I,Y,k,!0),I=null),y.patchFlag===-2&&(ne=!1,y.dynamicChildren=null);const{type:re,ref:Se,shapeFlag:A}=y;switch(re){case Za:_(I,y,q,ee);break;case Zi:m(I,y,q,ee);break;case ca:I==null&&E(y,q,ee,ae);break;case Mn:F(I,y,q,ee,Y,k,ae,Z,ne);break;default:A&1?w(I,y,q,ee,Y,k,ae,Z,ne):A&6?O(I,y,q,ee,Y,k,ae,Z,ne):(A&64||A&128)&&re.process(I,y,q,ee,Y,k,ae,Z,ne,De)}Se!=null&&Y?Ys(Se,I&&I.ref,k,y||I,!y):Se==null&&I&&I.ref!=null&&Ys(I.ref,null,k,I,!0)},_=(I,y,q,ee)=>{if(I==null)i(y.el=a(y.children),q,ee);else{const Y=y.el=I.el;y.children!==I.children&&u(Y,y.children)}},m=(I,y,q,ee)=>{I==null?i(y.el=l(y.children||""),q,ee):y.el=I.el},E=(I,y,q,ee)=>{[I.el,I.anchor]=v(I.children,y,q,ee,I.el,I.anchor)},T=({el:I,anchor:y},q,ee)=>{let Y;for(;I&&I!==y;)Y=d(I),i(I,q,ee),I=Y;i(y,q,ee)},x=({el:I,anchor:y})=>{let q;for(;I&&I!==y;)q=d(I),r(I),I=q;r(y)},w=(I,y,q,ee,Y,k,ae,Z,ne)=>{y.type==="svg"?ae="svg":y.type==="math"&&(ae="mathml"),I==null?P(y,q,ee,Y,k,ae,Z,ne):M(I,y,Y,k,ae,Z,ne)},P=(I,y,q,ee,Y,k,ae,Z)=>{let ne,re;const{props:Se,shapeFlag:A,transition:S,dirs:U}=I;if(ne=I.el=o(I.type,k,Se&&Se.is,Se),A&8?f(ne,I.children):A&16&&C(I.children,ne,null,ee,Y,pl(I,k),ae,Z),U&&or(I,null,ee,"created"),D(ne,I,I.scopeId,ae,ee),Se){for(const te in Se)te!=="value"&&!Ws(te)&&s(ne,te,null,Se[te],k,ee);"value"in Se&&s(ne,"value",null,Se.value,k),(re=Se.onVnodeBeforeMount)&&jn(re,ee,I)}U&&or(I,null,ee,"beforeMount");const G=Ag(Y,S);G&&S.beforeEnter(ne),i(ne,y,q),((re=Se&&Se.onVnodeMounted)||G||U)&&xn(()=>{re&&jn(re,ee,I),G&&S.enter(ne),U&&or(I,null,ee,"mounted")},Y)},D=(I,y,q,ee,Y)=>{if(q&&p(I,q),ee)for(let k=0;k<ee.length;k++)p(I,ee[k]);if(Y){let k=Y.subTree;if(y===k||up(k.type)&&(k.ssContent===y||k.ssFallback===y)){const ae=Y.vnode;D(I,ae,ae.scopeId,ae.slotScopeIds,Y.parent)}}},C=(I,y,q,ee,Y,k,ae,Z,ne=0)=>{for(let re=ne;re<I.length;re++){const Se=I[re]=Z?zi(I[re]):Qn(I[re]);g(null,Se,y,q,ee,Y,k,ae,Z)}},M=(I,y,q,ee,Y,k,ae)=>{const Z=y.el=I.el;let{patchFlag:ne,dynamicChildren:re,dirs:Se}=y;ne|=I.patchFlag&16;const A=I.props||ft,S=y.props||ft;let U;if(q&&ar(q,!1),(U=S.onVnodeBeforeUpdate)&&jn(U,q,y,I),Se&&or(y,I,q,"beforeUpdate"),q&&ar(q,!0),(A.innerHTML&&S.innerHTML==null||A.textContent&&S.textContent==null)&&f(Z,""),re?b(I.dynamicChildren,re,Z,q,ee,pl(y,Y),k):ae||H(I,y,Z,null,q,ee,pl(y,Y),k,!1),ne>0){if(ne&16)L(Z,A,S,q,Y);else if(ne&2&&A.class!==S.class&&s(Z,"class",null,S.class,Y),ne&4&&s(Z,"style",A.style,S.style,Y),ne&8){const G=y.dynamicProps;for(let te=0;te<G.length;te++){const W=G[te],ye=A[W],le=S[W];(le!==ye||W==="value")&&s(Z,W,ye,le,Y,q)}}ne&1&&I.children!==y.children&&f(Z,y.children)}else!ae&&re==null&&L(Z,A,S,q,Y);((U=S.onVnodeUpdated)||Se)&&xn(()=>{U&&jn(U,q,y,I),Se&&or(y,I,q,"updated")},ee)},b=(I,y,q,ee,Y,k,ae)=>{for(let Z=0;Z<y.length;Z++){const ne=I[Z],re=y[Z],Se=ne.el&&(ne.type===Mn||!Ds(ne,re)||ne.shapeFlag&198)?h(ne.el):q;g(ne,re,Se,null,ee,Y,k,ae,!0)}},L=(I,y,q,ee,Y)=>{if(y!==q){if(y!==ft)for(const k in y)!Ws(k)&&!(k in q)&&s(I,k,y[k],null,Y,ee);for(const k in q){if(Ws(k))continue;const ae=q[k],Z=y[k];ae!==Z&&k!=="value"&&s(I,k,Z,ae,Y,ee)}"value"in q&&s(I,"value",y.value,q.value,Y)}},F=(I,y,q,ee,Y,k,ae,Z,ne)=>{const re=y.el=I?I.el:a(""),Se=y.anchor=I?I.anchor:a("");let{patchFlag:A,dynamicChildren:S,slotScopeIds:U}=y;U&&(Z=Z?Z.concat(U):U),I==null?(i(re,q,ee),i(Se,q,ee),C(y.children||[],q,Se,Y,k,ae,Z,ne)):A>0&&A&64&&S&&I.dynamicChildren?(b(I.dynamicChildren,S,q,Y,k,ae,Z),(y.key!=null||Y&&y===Y.subTree)&&sp(I,y,!0)):H(I,y,q,Se,Y,k,ae,Z,ne)},O=(I,y,q,ee,Y,k,ae,Z,ne)=>{y.slotScopeIds=Z,I==null?y.shapeFlag&512?Y.ctx.activate(y,q,ee,ae,ne):Q(y,q,ee,Y,k,ae,ne):$(I,y,ne)},Q=(I,y,q,ee,Y,k,ae)=>{const Z=I.component=qg(I,ee,Y);if(qd(I)&&(Z.ctx.renderer=De),$g(Z,!1,ae),Z.asyncDep){if(Y&&Y.registerDep(Z,X,ae),!I.el){const ne=Z.subTree=an(Zi);m(null,ne,y,q),I.placeholder=ne.el}}else X(Z,I,y,q,Y,k,ae)},$=(I,y,q)=>{const ee=y.component=I.component;if(Fg(I,y,q))if(ee.asyncDep&&!ee.asyncResolved){K(ee,y,q);return}else ee.next=y,ee.update();else y.el=I.el,ee.vnode=y},X=(I,y,q,ee,Y,k,ae)=>{const Z=()=>{if(I.isMounted){let{next:A,bu:S,u:U,parent:G,vnode:te}=I;{const be=op(I);if(be){A&&(A.el=te.el,K(I,A,ae)),be.asyncDep.then(()=>{I.isUnmounted||Z()});return}}let W=A,ye;ar(I,!1),A?(A.el=te.el,K(I,A,ae)):A=te,S&&ll(S),(ye=A.props&&A.props.onVnodeBeforeUpdate)&&jn(ye,G,A,te),ar(I,!0);const le=Lf(I),Ee=I.subTree;I.subTree=le,g(Ee,le,h(Ee.el),oe(Ee),I,Y,k),A.el=le.el,W===null&&Og(I,le.el),U&&xn(U,Y),(ye=A.props&&A.props.onVnodeUpdated)&&xn(()=>jn(ye,G,A,te),Y)}else{let A;const{el:S,props:U}=y,{bm:G,m:te,parent:W,root:ye,type:le}=I,Ee=$s(y);ar(I,!1),G&&ll(G),!Ee&&(A=U&&U.onVnodeBeforeMount)&&jn(A,W,y),ar(I,!0);{ye.ce&&ye.ce._def.shadowRoot!==!1&&ye.ce._injectChildStyle(le);const be=I.subTree=Lf(I);g(null,be,q,ee,I,Y,k),y.el=be.el}if(te&&xn(te,Y),!Ee&&(A=U&&U.onVnodeMounted)){const be=y;xn(()=>jn(A,W,be),Y)}(y.shapeFlag&256||W&&$s(W.vnode)&&W.vnode.shapeFlag&256)&&I.a&&xn(I.a,Y),I.isMounted=!0,y=q=ee=null}};I.scope.on();const ne=I.effect=new bd(Z);I.scope.off();const re=I.update=ne.run.bind(ne),Se=I.job=ne.runIfDirty.bind(ne);Se.i=I,Se.id=I.uid,ne.scheduler=()=>Lu(Se),ar(I,!0),re()},K=(I,y,q)=>{y.component=I;const ee=I.vnode.props;I.vnode=y,I.next=null,xg(I,y.props,ee,q),Eg(I,y.children,q),bi(),Tf(I),Ai()},H=(I,y,q,ee,Y,k,ae,Z,ne=!1)=>{const re=I&&I.children,Se=I?I.shapeFlag:0,A=y.children,{patchFlag:S,shapeFlag:U}=y;if(S>0){if(S&128){_e(re,A,q,ee,Y,k,ae,Z,ne);return}else if(S&256){pe(re,A,q,ee,Y,k,ae,Z,ne);return}}U&8?(Se&16&&ie(re,Y,k),A!==re&&f(q,A)):Se&16?U&16?_e(re,A,q,ee,Y,k,ae,Z,ne):ie(re,Y,k,!0):(Se&8&&f(q,""),U&16&&C(A,q,ee,Y,k,ae,Z,ne))},pe=(I,y,q,ee,Y,k,ae,Z,ne)=>{I=I||is,y=y||is;const re=I.length,Se=y.length,A=Math.min(re,Se);let S;for(S=0;S<A;S++){const U=y[S]=ne?zi(y[S]):Qn(y[S]);g(I[S],U,q,null,Y,k,ae,Z,ne)}re>Se?ie(I,Y,k,!0,!1,A):C(y,q,ee,Y,k,ae,Z,ne,A)},_e=(I,y,q,ee,Y,k,ae,Z,ne)=>{let re=0;const Se=y.length;let A=I.length-1,S=Se-1;for(;re<=A&&re<=S;){const U=I[re],G=y[re]=ne?zi(y[re]):Qn(y[re]);if(Ds(U,G))g(U,G,q,null,Y,k,ae,Z,ne);else break;re++}for(;re<=A&&re<=S;){const U=I[A],G=y[S]=ne?zi(y[S]):Qn(y[S]);if(Ds(U,G))g(U,G,q,null,Y,k,ae,Z,ne);else break;A--,S--}if(re>A){if(re<=S){const U=S+1,G=U<Se?y[U].el:ee;for(;re<=S;)g(null,y[re]=ne?zi(y[re]):Qn(y[re]),q,G,Y,k,ae,Z,ne),re++}}else if(re>S)for(;re<=A;)Ue(I[re],Y,k,!0),re++;else{const U=re,G=re,te=new Map;for(re=G;re<=S;re++){const Pe=y[re]=ne?zi(y[re]):Qn(y[re]);Pe.key!=null&&te.set(Pe.key,re)}let W,ye=0;const le=S-G+1;let Ee=!1,be=0;const ce=new Array(le);for(re=0;re<le;re++)ce[re]=0;for(re=U;re<=A;re++){const Pe=I[re];if(ye>=le){Ue(Pe,Y,k,!0);continue}let Ae;if(Pe.key!=null)Ae=te.get(Pe.key);else for(W=G;W<=S;W++)if(ce[W-G]===0&&Ds(Pe,y[W])){Ae=W;break}Ae===void 0?Ue(Pe,Y,k,!0):(ce[Ae-G]=re+1,Ae>=be?be=Ae:Ee=!0,g(Pe,y[Ae],q,null,Y,k,ae,Z,ne),ye++)}const xe=Ee?wg(ce):is;for(W=xe.length-1,re=le-1;re>=0;re--){const Pe=G+re,Ae=y[Pe],ge=y[Pe+1],He=Pe+1<Se?ge.el||ge.placeholder:ee;ce[re]===0?g(null,Ae,q,He,Y,k,ae,Z,ne):Ee&&(W<0||re!==xe[W]?Te(Ae,q,He,2):W--)}}},Te=(I,y,q,ee,Y=null)=>{const{el:k,type:ae,transition:Z,children:ne,shapeFlag:re}=I;if(re&6){Te(I.component.subTree,y,q,ee);return}if(re&128){I.suspense.move(y,q,ee);return}if(re&64){ae.move(I,y,q,De);return}if(ae===Mn){i(k,y,q);for(let A=0;A<ne.length;A++)Te(ne[A],y,q,ee);i(I.anchor,y,q);return}if(ae===ca){T(I,y,q);return}if(ee!==2&&re&1&&Z)if(ee===0)Z.beforeEnter(k),i(k,y,q),xn(()=>Z.enter(k),Y);else{const{leave:A,delayLeave:S,afterLeave:U}=Z,G=()=>{I.ctx.isUnmounted?r(k):i(k,y,q)},te=()=>{k._isLeaving&&k[j_](!0),A(k,()=>{G(),U&&U()})};S?S(k,G,te):te()}else i(k,y,q)},Ue=(I,y,q,ee=!1,Y=!1)=>{const{type:k,props:ae,ref:Z,children:ne,dynamicChildren:re,shapeFlag:Se,patchFlag:A,dirs:S,cacheIndex:U}=I;if(A===-2&&(Y=!1),Z!=null&&(bi(),Ys(Z,null,q,I,!0),Ai()),U!=null&&(y.renderCache[U]=void 0),Se&256){y.ctx.deactivate(I);return}const G=Se&1&&S,te=!$s(I);let W;if(te&&(W=ae&&ae.onVnodeBeforeUnmount)&&jn(W,y,I),Se&6)Xe(I.component,q,ee);else{if(Se&128){I.suspense.unmount(q,ee);return}G&&or(I,null,y,"beforeUnmount"),Se&64?I.type.remove(I,y,q,De,ee):re&&!re.hasOnce&&(k!==Mn||A>0&&A&64)?ie(re,y,q,!1,!0):(k===Mn&&A&384||!Y&&Se&16)&&ie(ne,y,q),ee&&Je(I)}(te&&(W=ae&&ae.onVnodeUnmounted)||G)&&xn(()=>{W&&jn(W,y,I),G&&or(I,null,y,"unmounted")},q)},Je=I=>{const{type:y,el:q,anchor:ee,transition:Y}=I;if(y===Mn){Ye(q,ee);return}if(y===ca){x(I);return}const k=()=>{r(q),Y&&!Y.persisted&&Y.afterLeave&&Y.afterLeave()};if(I.shapeFlag&1&&Y&&!Y.persisted){const{leave:ae,delayLeave:Z}=Y,ne=()=>ae(q,k);Z?Z(I.el,k,ne):ne()}else k()},Ye=(I,y)=>{let q;for(;I!==y;)q=d(I),r(I),I=q;r(y)},Xe=(I,y,q)=>{const{bum:ee,scope:Y,job:k,subTree:ae,um:Z,m:ne,a:re}=I;Df(ne),Df(re),ee&&ll(ee),Y.stop(),k&&(k.flags|=8,Ue(ae,I,y,q)),Z&&xn(Z,y),xn(()=>{I.isUnmounted=!0},y)},ie=(I,y,q,ee=!1,Y=!1,k=0)=>{for(let ae=k;ae<I.length;ae++)Ue(I[ae],y,q,ee,Y)},oe=I=>{if(I.shapeFlag&6)return oe(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const y=d(I.anchor||I.el),q=y&&y[$_];return q?d(q):y};let we=!1;const Be=(I,y,q)=>{I==null?y._vnode&&Ue(y._vnode,null,null,!0):g(y._vnode||null,I,y,null,null,null,q),y._vnode=I,we||(we=!0,Tf(),Vd(),we=!1)},De={p:g,um:Ue,m:Te,r:Je,mt:Q,mc:C,pc:H,pbc:b,n:oe,o:n};return{render:Be,hydrate:void 0,createApp:_g(Be)}}function pl({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ar({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Ag(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function sp(n,e,t=!1){const i=n.children,r=e.children;if(Ve(i)&&Ve(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=zi(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&sp(o,a)),a.type===Za&&a.patchFlag!==-1&&(a.el=o.el),a.type===Zi&&!a.el&&(a.el=o.el)}}function wg(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const u=n[i];if(u!==0){if(r=t[t.length-1],n[r]<u){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<u?s=a+1:o=a;u<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function op(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:op(e)}function Df(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Rg=Symbol.for("v-scx"),Cg=()=>la(Rg);function Ar(n,e,t){return ap(n,e,t)}function ap(n,e,t=ft){const{immediate:i,deep:r,flush:s,once:o}=t,a=tn({},t),l=e&&i||!e&&s!=="post";let u;if(so){if(s==="sync"){const p=Cg();u=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=si,p.resume=si,p.pause=si,p}}const f=Qt;a.call=(p,v,g)=>oi(p,f,v,g);let h=!1;s==="post"?a.scheduler=p=>{xn(p,f&&f.suspense)}:s!=="sync"&&(h=!0,a.scheduler=(p,v)=>{v?p():Lu(p)}),a.augmentJob=p=>{e&&(p.flags|=4),h&&(p.flags|=2,f&&(p.id=f.uid,p.i=f))};const d=k_(n,e,a);return so&&(u?u.push(d):l&&d()),d}function Pg(n,e,t){const i=this.proxy,r=Pt(n)?n.includes(".")?lp(i,n):()=>i[n]:n.bind(i,i);let s;We(e)?s=e:(s=e.handler,t=e);const o=Mo(this),a=ap(r,s.bind(i),t);return o(),a}function lp(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Dg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ki(e)}Modifiers`]||n[`${Ur(e)}Modifiers`];function Lg(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ft;let r=t;const s=e.startsWith("update:"),o=s&&Dg(i,e.slice(7));o&&(o.trim&&(r=t.map(f=>Pt(f)?f.trim():f)),o.number&&(r=t.map(o_)));let a,l=i[a=al(e)]||i[a=al(Ki(e))];!l&&s&&(l=i[a=al(Ur(e))]),l&&oi(l,n,6,r);const u=i[a+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,oi(u,n,6,r)}}const Ig=new WeakMap;function cp(n,e,t=!1){const i=t?Ig:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!We(n)){const l=u=>{const f=cp(u,e,!0);f&&(a=!0,tn(o,f))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(_t(n)&&i.set(n,null),null):(Ve(s)?s.forEach(l=>o[l]=null):tn(o,s),_t(n)&&i.set(n,o),o)}function ja(n,e){return!n||!Ga(e)?!1:(e=e.slice(2).replace(/Once$/,""),st(n,e[0].toLowerCase()+e.slice(1))||st(n,Ur(e))||st(n,e))}function Lf(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:u,renderCache:f,props:h,data:d,setupState:p,ctx:v,inheritAttrs:g}=n,_=Ta(n);let m,E;try{if(t.shapeFlag&4){const x=r||i,w=x;m=Qn(u.call(w,x,f,h,p,d,v)),E=a}else{const x=e;m=Qn(x.length>1?x(h,{attrs:a,slots:o,emit:l}):x(h,null)),E=e.props?a:Ug(a)}}catch(x){js.length=0,$a(x,n,1),m=an(Zi)}let T=m;if(E&&g!==!1){const x=Object.keys(E),{shapeFlag:w}=T;x.length&&w&7&&(s&&x.some(Mu)&&(E=Ng(E,s)),T=ps(T,E,!1,!0))}return t.dirs&&(T=ps(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(t.dirs):t.dirs),t.transition&&Iu(T,t.transition),m=T,Ta(_),m}const Ug=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ga(t))&&((e||(e={}))[t]=n[t]);return e},Ng=(n,e)=>{const t={};for(const i in n)(!Mu(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Fg(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,u=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?If(i,o,u):!!o;if(l&8){const f=e.dynamicProps;for(let h=0;h<f.length;h++){const d=f[h];if(o[d]!==i[d]&&!ja(u,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?If(i,o,u):!0:!!o;return!1}function If(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!ja(t,s))return!0}return!1}function Og({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const up=n=>n.__isSuspense;function Bg(n,e){e&&e.pendingBranch?Ve(n)?e.effects.push(...n):e.effects.push(n):X_(n)}const Mn=Symbol.for("v-fgt"),Za=Symbol.for("v-txt"),Zi=Symbol.for("v-cmt"),ca=Symbol.for("v-stc"),js=[];let En=null;function Ft(n=!1){js.push(En=n?null:[])}function zg(){js.pop(),En=js[js.length-1]||null}let ro=1;function Uf(n,e=!1){ro+=n,n<0&&En&&e&&(En.hasOnce=!0)}function fp(n){return n.dynamicChildren=ro>0?En||is:null,zg(),ro>0&&En&&En.push(n),n}function Gt(n,e,t,i,r,s){return fp(ue(n,e,t,i,r,s,!0))}function hp(n,e,t,i,r){return fp(an(n,e,t,i,r,!0))}function dp(n){return n?n.__v_isVNode===!0:!1}function Ds(n,e){return n.type===e.type&&n.key===e.key}const pp=({key:n})=>n??null,ua=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Pt(n)||qt(n)||We(n)?{i:Nn,r:n,k:e,f:!!t}:n:null);function ue(n,e=null,t=null,i=0,r=null,s=n===Mn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&pp(e),ref:e&&ua(e),scopeId:Wd,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Nn};return a?(Bu(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Pt(t)?8:16),ro>0&&!o&&En&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&En.push(l),l}const an=Hg;function Hg(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===lg)&&(n=Zi),dp(n)){const a=ps(n,e,!0);return t&&Bu(a,t),ro>0&&!s&&En&&(a.shapeFlag&6?En[En.indexOf(n)]=a:En.push(a)),a.patchFlag=-2,a}if(Jg(n)&&(n=n.__vccOpts),e){e=kg(e);let{class:a,style:l}=e;a&&!Pt(a)&&(e.class=on(a)),_t(l)&&(Du(l)&&!Ve(l)&&(l=tn({},l)),e.style=eo(l))}const o=Pt(n)?1:up(n)?128:K_(n)?64:_t(n)?4:We(n)?2:0;return ue(n,e,t,i,r,o,s,!0)}function kg(n){return n?Du(n)||Qd(n)?tn({},n):n:null}function ps(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=n,u=e?Gg(r||{},e):r,f={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&pp(u),ref:e&&e.ref?t&&s?Ve(s)?s.concat(ua(e)):[s,ua(e)]:ua(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Mn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ps(n.ssContent),ssFallback:n.ssFallback&&ps(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Iu(f,l.clone(f)),f}function ls(n=" ",e=0){return an(Za,null,n,e)}function Ou(n,e){const t=an(ca,null,n);return t.staticCount=e,t}function Vg(n="",e=!1){return e?(Ft(),hp(Zi,null,n)):an(Zi,null,n)}function Qn(n){return n==null||typeof n=="boolean"?an(Zi):Ve(n)?an(Mn,null,n.slice()):dp(n)?zi(n):an(Za,null,String(n))}function zi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ps(n)}function Bu(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ve(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Bu(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Qd(e)?e._ctx=Nn:r===3&&Nn&&(Nn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else We(e)?(e={default:e,_ctx:Nn},t=32):(e=String(e),i&64?(t=16,e=[ls(e)]):t=8);n.children=e,n.shapeFlag|=t}function Gg(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=on([e.class,i.class]));else if(r==="style")e.style=eo([e.style,i.style]);else if(Ga(r)){const s=e[r],o=i[r];o&&s!==o&&!(Ve(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function jn(n,e,t,i=null){oi(n,e,7,[t,i])}const Wg=jd();let Xg=0;function qg(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||Wg,s={uid:Xg++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new d_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tp(i,r),emitsOptions:cp(i,r),emit:null,emitted:null,propsDefaults:ft,inheritAttrs:i.inheritAttrs,ctx:ft,data:ft,props:ft,attrs:ft,slots:ft,refs:ft,setupState:ft,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=Lg.bind(null,s),n.ce&&n.ce(s),s}let Qt=null;const Yg=()=>Qt||Nn;let Ra,hc;{const n=qa(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Ra=e("__VUE_INSTANCE_SETTERS__",t=>Qt=t),hc=e("__VUE_SSR_SETTERS__",t=>so=t)}const Mo=n=>{const e=Qt;return Ra(n),n.scope.on(),()=>{n.scope.off(),Ra(e)}},Nf=()=>{Qt&&Qt.scope.off(),Ra(null)};function mp(n){return n.vnode.shapeFlag&4}let so=!1;function $g(n,e=!1,t=!1){e&&hc(e);const{props:i,children:r}=n.vnode,s=mp(n);vg(n,i,s,e),yg(n,r,t||e);const o=s?Kg(n,e):void 0;return e&&hc(!1),o}function Kg(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,cg);const{setup:i}=t;if(i){bi();const r=n.setupContext=i.length>1?Zg(n):null,s=Mo(n),o=xo(i,n,0,[n.props,r]),a=gd(o);if(Ai(),s(),(a||n.sp)&&!$s(n)&&Xd(n),a){if(o.then(Nf,Nf),e)return o.then(l=>{Ff(n,l)}).catch(l=>{$a(l,n,0)});n.asyncDep=o}else Ff(n,o)}else _p(n)}function Ff(n,e,t){We(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:_t(e)&&(n.setupState=zd(e)),_p(n)}function _p(n,e,t){const i=n.type;n.render||(n.render=i.render||si);{const r=Mo(n);bi();try{ug(n)}finally{Ai(),r()}}}const jg={get(n,e){return Wt(n,"get",""),n[e]}};function Zg(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,jg),slots:n.slots,emit:n.emit,expose:e}}function Ja(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(zd(U_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ks)return Ks[t](n)},has(e,t){return t in e||t in Ks}})):n.proxy}function Jg(n){return We(n)&&"__vccOpts"in n}const fa=(n,e)=>z_(n,e,so),Qg="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let dc;const Of=typeof window<"u"&&window.trustedTypes;if(Of)try{dc=Of.createPolicy("vue",{createHTML:n=>n})}catch{}const gp=dc?n=>dc.createHTML(n):n=>n,e0="http://www.w3.org/2000/svg",t0="http://www.w3.org/1998/Math/MathML",_i=typeof document<"u"?document:null,Bf=_i&&_i.createElement("template"),n0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?_i.createElementNS(e0,n):e==="mathml"?_i.createElementNS(t0,n):t?_i.createElement(n,{is:t}):_i.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>_i.createTextNode(n),createComment:n=>_i.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>_i.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Bf.innerHTML=gp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Bf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},i0=Symbol("_vtc");function r0(n,e,t){const i=n[i0];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Ca=Symbol("_vod"),vp=Symbol("_vsh"),s0={name:"show",beforeMount(n,{value:e},{transition:t}){n[Ca]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):Ls(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),Ls(n,!0),i.enter(n)):i.leave(n,()=>{Ls(n,!1)}):Ls(n,e))},beforeUnmount(n,{value:e}){Ls(n,e)}};function Ls(n,e){n.style.display=e?n[Ca]:"none",n[vp]=!e}const o0=Symbol(""),a0=/(?:^|;)\s*display\s*:/;function l0(n,e,t){const i=n.style,r=Pt(t);let s=!1;if(t&&!r){if(e)if(Pt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&ha(i,a,"")}else for(const o in e)t[o]==null&&ha(i,o,"");for(const o in t)o==="display"&&(s=!0),ha(i,o,t[o])}else if(r){if(e!==t){const o=i[o0];o&&(t+=";"+o),i.cssText=t,s=a0.test(t)}}else e&&n.removeAttribute("style");Ca in n&&(n[Ca]=s?i.display:"",n[vp]&&(i.display="none"))}const zf=/\s*!important$/;function ha(n,e,t){if(Ve(t))t.forEach(i=>ha(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=c0(n,e);zf.test(t)?n.setProperty(Ur(i),t.replace(zf,""),"important"):n[i]=t}}const Hf=["Webkit","Moz","ms"],ml={};function c0(n,e){const t=ml[e];if(t)return t;let i=Ki(e);if(i!=="filter"&&i in n)return ml[e]=i;i=Sd(i);for(let r=0;r<Hf.length;r++){const s=Hf[r]+i;if(s in n)return ml[e]=s}return e}const kf="http://www.w3.org/1999/xlink";function Vf(n,e,t,i,r,s=h_(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(kf,e.slice(6,e.length)):n.setAttributeNS(kf,e,t):t==null||s&&!yd(t)?n.removeAttribute(e):n.setAttribute(e,s?"":nr(t)?String(t):t)}function Gf(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?gp(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=yd(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function u0(n,e,t,i){n.addEventListener(e,t,i)}function f0(n,e,t,i){n.removeEventListener(e,t,i)}const Wf=Symbol("_vei");function h0(n,e,t,i,r=null){const s=n[Wf]||(n[Wf]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=d0(e);if(i){const u=s[e]=_0(i,r);u0(n,a,u,l)}else o&&(f0(n,a,o,l),s[e]=void 0)}}const Xf=/(?:Once|Passive|Capture)$/;function d0(n){let e;if(Xf.test(n)){e={};let i;for(;i=n.match(Xf);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ur(n.slice(2)),e]}let _l=0;const p0=Promise.resolve(),m0=()=>_l||(p0.then(()=>_l=0),_l=Date.now());function _0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;oi(g0(i,t.value),e,5,[i])};return t.value=n,t.attached=m0(),t}function g0(n,e){if(Ve(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const qf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,v0=(n,e,t,i,r,s)=>{const o=r==="svg";e==="class"?r0(n,i,o):e==="style"?l0(n,t,i):Ga(e)?Mu(e)||h0(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):x0(n,e,i,o))?(Gf(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Vf(n,e,i,o,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Pt(i))?Gf(n,Ki(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Vf(n,e,i,o))};function x0(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&qf(e)&&We(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return qf(e)&&Pt(t)?!1:e in n}const S0=tn({patchProp:v0},n0);let Yf;function M0(){return Yf||(Yf=Tg(S0))}const y0=((...n)=>{const e=M0().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=T0(i);if(!r)return;const s=e._component;!We(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,E0(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function E0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function T0(n){return Pt(n)?document.querySelector(n):n}const yo=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},b0={class:"container"},A0={class:"header__content"},w0={class:"header__mobile-menu"},R0={__name:"Header",props:{scrolled:Boolean},setup(n){const e=wt(!1),t=()=>{e.value=!e.value},i=()=>{e.value=!1};return(r,s)=>(Ft(),Gt("header",{class:on(["header",{scrolled:n.scrolled}])},[ue("div",b0,[ue("div",A0,[s[0]||(s[0]=Ou('<div class="header__logo" data-v-22b9e3ad><div class="logo-icon" data-v-22b9e3ad><i class="fa fa-cube" data-v-22b9e3ad></i></div><h1 class="header__title text-gradient" data-v-22b9e3ad>Tech</h1></div><nav class="header__nav" data-v-22b9e3ad><a href="#app" class="header__link" data-v-22b9e3ad>首页</a><a href="#articles" class="header__link" data-v-22b9e3ad>文章</a><a href="#demos" class="header__link" data-v-22b9e3ad>技术演示</a><a href="#about" class="header__link" data-v-22b9e3ad>关于</a></nav><div class="header__search" data-v-22b9e3ad><input type="text" placeholder="搜索技术文章..." class="header__search-input" data-v-22b9e3ad><i class="fa fa-search header__search-icon" data-v-22b9e3ad></i></div>',3)),ue("button",{class:"header__mobile-toggle",onClick:t},[ue("i",{class:on(["fa",e.value?"fa-times":"fa-bars"])},null,2)])]),Y_(ue("div",w0,[ue("nav",{class:"header__nav"},[ue("a",{href:"#home",class:"header__link",onClick:i},"首页"),ue("a",{href:"#articles",class:"header__link",onClick:i},"文章"),ue("a",{href:"#demos",class:"header__link",onClick:i},"技术演示"),ue("a",{href:"#about",class:"header__link",onClick:i},"关于")]),s[1]||(s[1]=ue("div",{class:"header__search"},[ue("input",{type:"text",placeholder:"搜索技术文章...",class:"header__search-input"}),ue("i",{class:"fa fa-search header__search-icon"})],-1))],512),[[s0,e.value]])])],2))}},C0=yo(R0,[["__scopeId","data-v-22b9e3ad"]]);function gi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function xp(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ms={duration:.5,overwrite:!1,delay:0},zu,zt,mt,Fn=1e8,ut=1/Fn,pc=Math.PI*2,P0=pc/4,D0=0,Sp=Math.sqrt,L0=Math.cos,I0=Math.sin,Ot=function(e){return typeof e=="string"},yt=function(e){return typeof e=="function"},wi=function(e){return typeof e=="number"},Hu=function(e){return typeof e>"u"},ai=function(e){return typeof e=="object"},ln=function(e){return e!==!1},ku=function(){return typeof window<"u"},No=function(e){return yt(e)||Ot(e)},Mp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Yt=Array.isArray,mc=/(?:-?\.?\d|\.)+/gi,yp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,es=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,gl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ep=/[+-]=-?[.\d]+/,Tp=/[^,'"\[\]\s]+/gi,U0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,xt,Jn,_c,Vu,wn={},Pa={},bp,Ap=function(e){return(Pa=_s(e,wn))&&pn},Gu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},oo=function(e,t){return!t&&console.warn(e)},wp=function(e,t){return e&&(wn[e]=t)&&Pa&&(Pa[e]=t)||wn},ao=function(){return 0},N0={suppressEvents:!0,isStart:!0,kill:!1},da={suppressEvents:!0,kill:!1},F0={suppressEvents:!0},Wu={},Xi=[],gc={},Rp,Sn={},vl={},$f=30,pa=[],Xu="",qu=function(e){var t=e[0],i,r;if(ai(t)||yt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=pa.length;r--&&!pa[r].targetTest(t););i=pa[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Jp(e[r],i)))||e.splice(r,1);return e},wr=function(e){return e._gsap||qu(On(e))[0]._gsap},Cp=function(e,t,i){return(i=e[t])&&yt(i)?e[t]():Hu(i)&&e.getAttribute&&e.getAttribute(t)||i},cn=function(e,t){return(e=e.split(",")).forEach(t)||e},Et=function(e){return Math.round(e*1e5)/1e5||0},Ct=function(e){return Math.round(e*1e7)/1e7||0},cs=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},O0=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Da=function(){var e=Xi.length,t=Xi.slice(0),i,r;for(gc={},Xi.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Yu=function(e){return!!(e._initted||e._startAt||e.add)},Pp=function(e,t,i,r){Xi.length&&!zt&&Da(),e.render(t,i,!!(zt&&t<0&&Yu(e))),Xi.length&&!zt&&Da()},Dp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Tp).length<2?t:Ot(e)?e.trim():e},Lp=function(e){return e},Rn=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},B0=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},_s=function(e,t){for(var i in t)e[i]=t[i];return e},Kf=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=ai(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},La=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Zs=function(e){var t=e.parent||xt,i=e.keyframes?B0(Yt(e.keyframes)):Rn;if(ln(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},z0=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},Ip=function(e,t,i,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Qa=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Ji=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Rr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},H0=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},vc=function(e,t,i,r){return e._startAt&&(zt?e._startAt.revert(da):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},k0=function n(e){return!e||e._ts&&n(e.parent)},jf=function(e){return e._repeat?gs(e._tTime,e=e.duration()+e._rDelay)*e:0},gs=function(e,t){var i=Math.floor(e=Ct(e/t));return e&&i===e?i-1:i},Ia=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},el=function(e){return e._end=Ct(e._start+(e._tDur/Math.abs(e._ts||e._rts||ut)||0))},tl=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ct(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),el(e),i._dirty||Rr(i,e)),e},Up=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ia(e.rawTime(),t),(!t._dur||Eo(0,t.totalDuration(),i)-t._tTime>ut)&&t.render(i,!0)),Rr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-ut}},ti=function(e,t,i,r){return t.parent&&Ji(t),t._start=Ct((wi(i)?i:i||e!==xt?Ln(e,i,t):e._time)+t._delay),t._end=Ct(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Ip(e,t,"_first","_last",e._sort?"_start":0),xc(t)||(e._recent=t),r||Up(e,t),e._ts<0&&tl(e,e._tTime),e},Np=function(e,t){return(wn.ScrollTrigger||Gu("scrollTrigger",t))&&wn.ScrollTrigger.create(t,e)},Fp=function(e,t,i,r,s){if(Ku(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!zt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Rp!==yn.frame)return Xi.push(e),e._lazy=[s,r],1},V0=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},xc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},G0=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&V0(e)&&!(!e._initted&&xc(e))||(e._ts<0||e._dp._ts<0)&&!xc(e))?0:1,a=e._rDelay,l=0,u,f,h;if(a&&e._repeat&&(l=Eo(0,e._tDur,t),f=gs(l,a),e._yoyo&&f&1&&(o=1-o),f!==gs(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||zt||r||e._zTime===ut||!t&&e._zTime){if(!e._initted&&Fp(e,t,r,i,l))return;for(h=e._zTime,e._zTime=t||(i?ut:0),i||(i=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,u=e._pt;u;)u.r(o,u.d),u=u._next;t<0&&vc(e,t,i,!0),e._onUpdate&&!i&&Tn(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&Tn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ji(e,1),!i&&!zt&&(Tn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},W0=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},vs=function(e,t,i,r){var s=e._repeat,o=Ct(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ct(o*(s+1)+e._rDelay*s):o,a>0&&!r&&tl(e,e._tTime=e._tDur*a),e.parent&&el(e),i||Rr(e.parent,e),e},Zf=function(e){return e instanceof en?Rr(e):vs(e,e._dur)},X0={_start:0,endTime:ao,totalDuration:ao},Ln=function n(e,t,i){var r=e.labels,s=e._recent||X0,o=e.duration()>=Fn?s.endTime(!1):e._dur,a,l,u;return Ot(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&i&&(l=l/100*(Yt(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},Js=function(e,t,i){var r=wi(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=ln(l.vars.inherit)&&l.parent;o.immediateRender=ln(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Rt(t[0],o,t[s+1])},ir=function(e,t){return e||e===0?t(e):t},Eo=function(e,t,i){return i<e?e:i>t?t:i},Xt=function(e,t){return!Ot(e)||!(t=U0.exec(e))?"":t[1]},q0=function(e,t,i){return ir(i,function(r){return Eo(e,t,r)})},Sc=[].slice,Op=function(e,t){return e&&ai(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ai(e[0]))&&!e.nodeType&&e!==Jn},Y0=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Ot(r)&&!t||Op(r,1)?(s=i).push.apply(s,On(r)):i.push(r)})||i},On=function(e,t,i){return mt&&!t&&mt.selector?mt.selector(e):Ot(e)&&!i&&(_c||!xs())?Sc.call((t||Vu).querySelectorAll(e),0):Yt(e)?Y0(e,i):Op(e)?Sc.call(e,0):e?[e]:[]},Mc=function(e){return e=On(e)[0]||oo("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return On(t,i.querySelectorAll?i:i===e?oo("Invalid scope")||Vu.createElement("div"):e)}},Bp=function(e){return e.sort(function(){return .5-Math.random()})},zp=function(e){if(yt(e))return e;var t=ai(e)?e:{each:e},i=Cr(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,u=t.axis,f=r,h=r;return Ot(r)?f=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(f=r[0],h=r[1]),function(d,p,v){var g=(v||t).length,_=o[g],m,E,T,x,w,P,D,C,M;if(!_){if(M=t.grid==="auto"?0:(t.grid||[1,Fn])[1],!M){for(D=-Fn;D<(D=v[M++].getBoundingClientRect().left)&&M<g;);M<g&&M--}for(_=o[g]=[],m=l?Math.min(M,g)*f-.5:r%M,E=M===Fn?0:l?g*h/M-.5:r/M|0,D=0,C=Fn,P=0;P<g;P++)T=P%M-m,x=E-(P/M|0),_[P]=w=u?Math.abs(u==="y"?x:T):Sp(T*T+x*x),w>D&&(D=w),w<C&&(C=w);r==="random"&&Bp(_),_.max=D-C,_.min=C,_.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(M>g?g-1:u?u==="y"?g/M:M:Math.max(M,g/M))||0)*(r==="edges"?-1:1),_.b=g<0?s-g:s,_.u=Xt(t.amount||t.each)||0,i=i&&g<0?Kp(i):i}return g=(_[d]-_.min)/_.max||0,Ct(_.b+(i?i(g):g)*_.v)+_.u}},yc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ct(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(wi(i)?0:Xt(i))}},Hp=function(e,t){var i=Yt(e),r,s;return!i&&ai(e)&&(r=i=e.radius||Fn,e.values?(e=On(e.values),(s=!wi(e[0]))&&(r*=r)):e=yc(e.increment)),ir(t,i?yt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),u=Fn,f=0,h=e.length,d,p;h--;)s?(d=e[h].x-a,p=e[h].y-l,d=d*d+p*p):d=Math.abs(e[h]-a),d<u&&(u=d,f=h);return f=!r||u<=r?e[f]:o,s||f===o||wi(o)?f:f+Xt(o)}:yc(e))},kp=function(e,t,i,r){return ir(Yt(e)?!t:i===!0?!!(i=0):!r,function(){return Yt(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},$0=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},K0=function(e,t){return function(i){return e(parseFloat(i))+(t||Xt(i))}},j0=function(e,t,i){return Gp(e,t,0,1,i)},Vp=function(e,t,i){return ir(i,function(r){return e[~~t(r)]})},Z0=function n(e,t,i){var r=t-e;return Yt(e)?Vp(e,n(0,e.length),t):ir(i,function(s){return(r+(s-e)%r)%r+e})},J0=function n(e,t,i){var r=t-e,s=r*2;return Yt(e)?Vp(e,n(0,e.length-1),t):ir(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},lo=function(e){for(var t=0,i="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?Tp:mc),i+=e.substr(t,r-t)+kp(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return i+e.substr(t,e.length-t)},Gp=function(e,t,i,r,s){var o=t-e,a=r-i;return ir(s,function(l){return i+((l-e)/o*a||0)})},Q0=function n(e,t,i,r){var s=isNaN(e+t)?0:function(p){return(1-p)*e+p*t};if(!s){var o=Ot(e),a={},l,u,f,h,d;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Yt(e)&&!Yt(t)){for(f=[],h=e.length,d=h-2,u=1;u<h;u++)f.push(n(e[u-1],e[u]));h--,s=function(v){v*=h;var g=Math.min(d,~~v);return f[g](v-g)},i=t}else r||(e=_s(Yt(e)?[]:{},e));if(!f){for(l in t)$u.call(a,e,l,"get",t[l]);s=function(v){return Ju(v,a)||(o?e.p:e)}}}return ir(i,s)},Jf=function(e,t,i){var r=e.labels,s=Fn,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Tn=function(e,t,i){var r=e.vars,s=r[t],o=mt,a=e._ctx,l,u,f;if(s)return l=r[t+"Params"],u=r.callbackScope||e,i&&Xi.length&&Da(),a&&(mt=a),f=l?s.apply(u,l):s.call(u),mt=o,f},ks=function(e){return Ji(e),e.scrollTrigger&&e.scrollTrigger.kill(!!zt),e.progress()<1&&Tn(e,"onInterrupt"),e},ts,Wp=[],Xp=function(e){if(e)if(e=!e.name&&e.default||e,ku()||e.headless){var t=e.name,i=yt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:ao,render:Ju,add:$u,kill:mv,modifier:pv,rawVars:0},o={targetTest:0,get:0,getSetter:Zu,aliases:{},register:0};if(xs(),e!==r){if(Sn[t])return;Rn(r,Rn(La(e,s),o)),_s(r.prototype,_s(s,La(e,o))),Sn[r.prop=t]=r,e.targetTest&&(pa.push(r),Wu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}wp(t,r),e.register&&e.register(pn,r,un)}else Wp.push(e)},ct=255,Vs={aqua:[0,ct,ct],lime:[0,ct,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ct],navy:[0,0,128],white:[ct,ct,ct],olive:[128,128,0],yellow:[ct,ct,0],orange:[ct,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ct,0,0],pink:[ct,192,203],cyan:[0,ct,ct],transparent:[ct,ct,ct,0]},xl=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*ct+.5|0},qp=function(e,t,i){var r=e?wi(e)?[e>>16,e>>8&ct,e&ct]:0:Vs.black,s,o,a,l,u,f,h,d,p,v;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Vs[e])r=Vs[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&ct,r&ct,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&ct,e&ct]}else if(e.substr(0,3)==="hsl"){if(r=v=e.match(mc),!t)l=+r[0]%360/360,u=+r[1]/100,f=+r[2]/100,o=f<=.5?f*(u+1):f+u-f*u,s=f*2-o,r.length>3&&(r[3]*=1),r[0]=xl(l+1/3,s,o),r[1]=xl(l,s,o),r[2]=xl(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(yp),i&&r.length<4&&(r[3]=1),r}else r=e.match(mc)||Vs.transparent;r=r.map(Number)}return t&&!v&&(s=r[0]/ct,o=r[1]/ct,a=r[2]/ct,h=Math.max(s,o,a),d=Math.min(s,o,a),f=(h+d)/2,h===d?l=u=0:(p=h-d,u=f>.5?p/(2-h-d):p/(h+d),l=h===s?(o-a)/p+(o<a?6:0):h===o?(a-s)/p+2:(s-o)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(u*100+.5),r[2]=~~(f*100+.5)),i&&r.length<4&&(r[3]=1),r},Yp=function(e){var t=[],i=[],r=-1;return e.split(qi).forEach(function(s){var o=s.match(es)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},Qf=function(e,t,i){var r="",s=(e+r).match(qi),o=t?"hsla(":"rgba(",a=0,l,u,f,h;if(!s)return e;if(s=s.map(function(d){return(d=qp(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),i&&(f=Yp(e),l=i.c,l.join(r)!==f.c.join(r)))for(u=e.replace(qi,"1").split(es),h=u.length-1;a<h;a++)r+=u[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(f.length?f:s.length?s:i).shift());if(!u)for(u=e.split(qi),h=u.length-1;a<h;a++)r+=u[a]+s[a];return r+u[h]},qi=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Vs)n+="|"+e+"\\b";return new RegExp(n+")","gi")})(),ev=/hsl[a]?\(/,$p=function(e){var t=e.join(" "),i;if(qi.lastIndex=0,qi.test(t))return i=ev.test(t),e[1]=Qf(e[1],i),e[0]=Qf(e[0],i,Yp(e[1])),!0},co,yn=(function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,u,f,h,d,p,v=function g(_){var m=n()-r,E=_===!0,T,x,w,P;if((m>e||m<0)&&(i+=m-t),r+=m,w=r-i,T=w-o,(T>0||E)&&(P=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,o+=T+(T>=s?4:s-T),x=1),E||(l=u(g)),x)for(p=0;p<a.length;p++)a[p](w,d,P,_)};return h={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(_){return d/(1e3/(_||60))},wake:function(){bp&&(!_c&&ku()&&(Jn=_c=window,Vu=Jn.document||{},wn.gsap=pn,(Jn.gsapVersions||(Jn.gsapVersions=[])).push(pn.version),Ap(Pa||Jn.GreenSockGlobals||!Jn.gsap&&Jn||{}),Wp.forEach(Xp)),f=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),u=f||function(_){return setTimeout(_,o-h.time*1e3+1|0)},co=1,v(2))},sleep:function(){(f?cancelAnimationFrame:clearTimeout)(l),co=0,u=ao},lagSmoothing:function(_,m){e=_||1/0,t=Math.min(m||33,e)},fps:function(_){s=1e3/(_||240),o=h.time*1e3+s},add:function(_,m,E){var T=m?function(x,w,P,D){_(x,w,P,D),h.remove(T)}:_;return h.remove(_),a[E?"unshift":"push"](T),xs(),T},remove:function(_,m){~(m=a.indexOf(_))&&a.splice(m,1)&&p>=m&&p--},_listeners:a},h})(),xs=function(){return!co&&yn.wake()},Ze={},tv=/^[\d.\-M][\d.\-,\s]/,nv=/["']/g,iv=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,u;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[r]=isNaN(u)?u.replace(nv,"").trim():+u,r=l.substr(a+1).trim();return t},rv=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},sv=function(e){var t=(e+"").split("("),i=Ze[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[iv(t[1])]:rv(e).split(",").map(Dp)):Ze._CE&&tv.test(e)?Ze._CE("",e):i},Kp=function(e){return function(t){return 1-e(1-t)}},jp=function n(e,t){for(var i=e._first,r;i;)i instanceof en?n(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?n(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},Cr=function(e,t){return e&&(yt(e)?e:Ze[e]||sv(e))||t},Nr=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return cn(e,function(a){Ze[a]=wn[a]=s,Ze[o=a.toLowerCase()]=i;for(var l in s)Ze[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ze[a+"."+l]=s[l]}),s},Zp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Sl=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/pc*(Math.asin(1/r)||0),a=function(f){return f===1?1:r*Math.pow(2,-10*f)*I0((f-o)*s)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:Zp(a);return s=pc/s,l.config=function(u,f){return n(e,u,f)},l},Ml=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:Zp(i);return r.config=function(s){return n(e,s)},r};cn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;Nr(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Ze.Linear.easeNone=Ze.none=Ze.Linear.easeIn;Nr("Elastic",Sl("in"),Sl("out"),Sl());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};Nr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Nr("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});Nr("Circ",function(n){return-(Sp(1-n*n)-1)});Nr("Sine",function(n){return n===1?1:-L0(n*P0)+1});Nr("Back",Ml("in"),Ml("out"),Ml());Ze.SteppedEase=Ze.steps=wn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-ut;return function(a){return((r*Eo(0,o,a)|0)+s)*i}}};ms.ease=Ze["quad.out"];cn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Xu+=n+","+n+"Params,"});var Jp=function(e,t){this.id=D0++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Cp,this.set=t?t.getSetter:Zu},uo=(function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,vs(this,+t.duration,1,1),this.data=t.data,mt&&(this._ctx=mt,mt.data.push(this)),co||yn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,vs(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(xs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(tl(this,i),!s._dp||s.parent||Up(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ti(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===ut||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Pp(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+jf(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+jf(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?gs(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-ut?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Ia(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-ut?0:this._rts,this.totalTime(Eo(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),el(this),H0(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ut&&(this._tTime-=ut)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ti(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(ln(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ia(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=F0);var r=zt;return zt=i,Yu(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),zt=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Zf(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Zf(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Ln(this,i),ln(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,ln(r)),this._dur||(this._zTime=-ut),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-ut:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ut,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-ut)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=yt(i)?i:Lp,a=function(){var u=r.then;r.then=null,yt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),s(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){ks(this)},n})();Rn(uo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ut,_prom:0,_ps:!1,_rts:1});var en=(function(n){xp(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=ln(i.sortChildren),xt&&ti(i.parent||xt,gi(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Np(gi(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Js(0,arguments,this),this},t.from=function(r,s,o){return Js(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Js(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Zs(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Rt(r,s,Ln(this,o),1),this},t.call=function(r,s,o){return ti(this,Rt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,u,f){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=u,o.onCompleteParams=f,o.parent=this,new Rt(r,o,Ln(this,l)),this},t.staggerFrom=function(r,s,o,a,l,u,f){return o.runBackwards=1,Zs(o).immediateRender=ln(o.immediateRender),this.staggerTo(r,s,o,a,l,u,f)},t.staggerFromTo=function(r,s,o,a,l,u,f,h){return a.startAt=o,Zs(a).immediateRender=ln(a.immediateRender),this.staggerTo(r,s,a,l,u,f,h)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,f=r<=0?0:Ct(r),h=this._zTime<0!=r<0&&(this._initted||!u),d,p,v,g,_,m,E,T,x,w,P,D;if(this!==xt&&f>l&&r>=0&&(f=l),f!==this._tTime||o||h){if(a!==this._time&&u&&(f+=this._time-a,r+=this._time-a),d=f,x=this._start,T=this._ts,m=!T,h&&(u||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(P=this._yoyo,_=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(_*100+r,s,o);if(d=Ct(f%_),f===l?(g=this._repeat,d=u):(w=Ct(f/_),g=~~w,g&&g===w&&(d=u,g--),d>u&&(d=u)),w=gs(this._tTime,_),!a&&this._tTime&&w!==g&&this._tTime-w*_-this._dur<=0&&(w=g),P&&g&1&&(d=u-d,D=1),g!==w&&!this._lock){var C=P&&w&1,M=C===(P&&g&1);if(g<w&&(C=!C),a=C?0:f%u?u:f,this._lock=1,this.render(a||(D?0:Ct(g*_)),s,!u)._lock=0,this._tTime=f,!s&&this.parent&&Tn(this,"onRepeat"),this.vars.repeatRefresh&&!D&&(this.invalidate()._lock=1),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,M&&(this._lock=2,a=C?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!D&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;jp(this,D)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(E=W0(this,Ct(a),Ct(d)),E&&(f-=d-(d=E._start))),this._tTime=f,this._time=d,this._act=!T,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&f&&!s&&!w&&(Tn(this,"onStart"),this._tTime!==f))return this;if(d>=a&&r>=0)for(p=this._first;p;){if(v=p._next,(p._act||d>=p._start)&&p._ts&&E!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(d-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(d-p._start)*p._ts,s,o),d!==this._time||!this._ts&&!m){E=0,v&&(f+=this._zTime=-ut);break}}p=v}else{p=this._last;for(var b=r<0?r:d;p;){if(v=p._prev,(p._act||b<=p._end)&&p._ts&&E!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(b-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(b-p._start)*p._ts,s,o||zt&&Yu(p)),d!==this._time||!this._ts&&!m){E=0,v&&(f+=this._zTime=b?-ut:ut);break}}p=v}}if(E&&!s&&(this.pause(),E.render(d>=a?0:-ut)._zTime=d>=a?1:-1,this._ts))return this._start=x,el(this),this.render(r,s,o);this._onUpdate&&!s&&Tn(this,"onUpdate",!0),(f===l&&this._tTime>=this.totalDuration()||!f&&a)&&(x===this._start||Math.abs(T)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(f===l&&this._ts>0||!f&&this._ts<0)&&Ji(this,1),!s&&!(r<0&&!a)&&(f||a||!l)&&(Tn(this,f===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(wi(s)||(s=Ln(this,s,r)),!(r instanceof uo)){if(Yt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Ot(r))return this.addLabel(r,s);if(yt(r))r=Rt.delayedCall(0,r);else return this}return this!==r?ti(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Fn);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof Rt?s&&l.push(u):(o&&l.push(u),r&&l.push.apply(l,u.getChildren(!0,s,o)))),u=u._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Ot(r)?this.removeLabel(r):yt(r)?this.killTweensOf(r):(r.parent===this&&Qa(this,r),r===this._recent&&(this._recent=this._last),Rr(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ct(yn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Ln(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Rt.delayedCall(0,s||ao,o);return a.data="isPause",this._hasPause=1,ti(this,a,Ln(this,r))},t.removePause=function(r){var s=this._first;for(r=Ln(this,r);s;)s._start===r&&s.data==="isPause"&&Ji(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)ki!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=On(r),l=this._first,u=wi(s),f;l;)l instanceof Rt?O0(l._targets,a)&&(u?(!ki||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(f=l.getTweensOf(a,s)).length&&o.push.apply(o,f),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Ln(o,r),l=s,u=l.startAt,f=l.onStart,h=l.onStartParams,d=l.immediateRender,p,v=Rt.to(o,Rn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale())||ut,onStart:function(){if(o.pause(),!p){var _=s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale());v._dur!==_&&vs(v,_,0,1).render(v._time,!0,!0),p=1}f&&f.apply(v,h||[])}},s));return d?v.render(0):v},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,Rn({startAt:{time:Ln(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Jf(this,Ln(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Jf(this,Ln(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+ut)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,u;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(u in l)l[u]>=o&&(l[u]+=r);return Rr(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Rr(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Fn,u,f,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),f=a._start,f>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ti(o,a,f-a._delay,1)._lock=0):l=f,f<0&&a._ts&&(s-=f,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=f/o._ts,o._time-=f,o._tTime-=f),o.shiftChildren(-f,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=u;vs(o,o===xt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(xt._ts&&(Pp(xt,Ia(r,xt)),Rp=yn.frame),yn.frame>=$f){$f+=bn.autoSleep||120;var s=xt._first;if((!s||!s._ts)&&bn.autoSleep&&yn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||yn.sleep()}}},e})(uo);Rn(en.prototype,{_lock:0,_hasPause:0,_forcing:0});var ov=function(e,t,i,r,s,o,a){var l=new un(this._pt,e,t,0,1,rm,null,s),u=0,f=0,h,d,p,v,g,_,m,E;for(l.b=i,l.e=r,i+="",r+="",(m=~r.indexOf("random("))&&(r=lo(r)),o&&(E=[i,r],o(E,e,t),i=E[0],r=E[1]),d=i.match(gl)||[];h=gl.exec(r);)v=h[0],g=r.substring(u,h.index),p?p=(p+1)%5:g.substr(-5)==="rgba("&&(p=1),v!==d[f++]&&(_=parseFloat(d[f-1])||0,l._pt={_next:l._pt,p:g||f===1?g:",",s:_,c:v.charAt(1)==="="?cs(_,v)-_:parseFloat(v)-_,m:p&&p<4?Math.round:0},u=gl.lastIndex);return l.c=u<r.length?r.substring(u,r.length):"",l.fp=a,(Ep.test(r)||m)&&(l.e=0),this._pt=l,l},$u=function(e,t,i,r,s,o,a,l,u,f){yt(r)&&(r=r(s||0,e,o));var h=e[t],d=i!=="get"?i:yt(h)?u?e[t.indexOf("set")||!yt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():h,p=yt(h)?u?fv:nm:ju,v;if(Ot(r)&&(~r.indexOf("random(")&&(r=lo(r)),r.charAt(1)==="="&&(v=cs(d,r)+(Xt(d)||0),(v||v===0)&&(r=v))),!f||d!==r||Ec)return!isNaN(d*r)&&r!==""?(v=new un(this._pt,e,t,+d||0,r-(d||0),typeof h=="boolean"?dv:im,0,p),u&&(v.fp=u),a&&v.modifier(a,this,e),this._pt=v):(!h&&!(t in e)&&Gu(t,r),ov.call(this,e,t,d,r,p,l||bn.stringFilter,u))},av=function(e,t,i,r,s){if(yt(e)&&(e=Qs(e,s,t,i,r)),!ai(e)||e.style&&e.nodeType||Yt(e)||Mp(e))return Ot(e)?Qs(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Qs(e[a],s,t,i,r);return o},Qp=function(e,t,i,r,s,o){var a,l,u,f;if(Sn[e]&&(a=new Sn[e]).init(s,a.rawVars?t[e]:av(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new un(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==ts))for(u=i._ptLookup[i._targets.indexOf(s)],f=a._props.length;f--;)u[a._props[f]]=l;return a},ki,Ec,Ku=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,u=r.onUpdate,f=r.runBackwards,h=r.yoyoEase,d=r.keyframes,p=r.autoRevert,v=e._dur,g=e._startAt,_=e._targets,m=e.parent,E=m&&m.data==="nested"?m.vars.targets:_,T=e._overwrite==="auto"&&!zu,x=e.timeline,w,P,D,C,M,b,L,F,O,Q,$,X,K;if(x&&(!d||!s)&&(s="none"),e._ease=Cr(s,ms.ease),e._yEase=h?Kp(Cr(h===!0?s:h,ms.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!x&&!!r.runBackwards,!x||d&&!r.stagger){if(F=_[0]?wr(_[0]).harness:0,X=F&&r[F.prop],w=La(r,Wu),g&&(g._zTime<0&&g.progress(1),t<0&&f&&a&&!p?g.render(-1,!0):g.revert(f&&v?da:N0),g._lazy=0),o){if(Ji(e._startAt=Rt.set(_,Rn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&ln(l),startAt:null,delay:0,onUpdate:u&&function(){return Tn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(zt||!a&&!p)&&e._startAt.revert(da),a&&v&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(f&&v&&!g){if(t&&(a=!1),D=Rn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&ln(l),immediateRender:a,stagger:0,parent:m},w),X&&(D[F.prop]=X),Ji(e._startAt=Rt.set(_,D)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(zt?e._startAt.revert(da):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,ut,ut);else if(!t)return}for(e._pt=e._ptCache=0,l=v&&ln(l)||l&&!v,P=0;P<_.length;P++){if(M=_[P],L=M._gsap||qu(_)[P]._gsap,e._ptLookup[P]=Q={},gc[L.id]&&Xi.length&&Da(),$=E===_?P:E.indexOf(M),F&&(O=new F).init(M,X||w,e,$,E)!==!1&&(e._pt=C=new un(e._pt,M,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(H){Q[H]=C}),O.priority&&(b=1)),!F||X)for(D in w)Sn[D]&&(O=Qp(D,w,e,$,M,E))?O.priority&&(b=1):Q[D]=C=$u.call(e,M,D,"get",w[D],$,E,0,r.stringFilter);e._op&&e._op[P]&&e.kill(M,e._op[P]),T&&e._pt&&(ki=e,xt.killTweensOf(M,Q,e.globalTime(t)),K=!e.parent,ki=0),e._pt&&l&&(gc[L.id]=1)}b&&sm(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!K,d&&t<=0&&x.render(Fn,!0,!0)},lv=function(e,t,i,r,s,o,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],f,h,d,p;if(!u)for(u=e._ptCache[t]=[],d=e._ptLookup,p=e._targets.length;p--;){if(f=d[p][t],f&&f.d&&f.d._pt)for(f=f.d._pt;f&&f.p!==t&&f.fp!==t;)f=f._next;if(!f)return Ec=1,e.vars[t]="+=0",Ku(e,a),Ec=0,l?oo(t+" not eligible for reset"):1;u.push(f)}for(p=u.length;p--;)h=u[p],f=h._pt||h,f.s=(r||r===0)&&!s?r:f.s+(r||0)+o*f.c,f.c=i-f.s,h.e&&(h.e=Et(i)+Xt(h.e)),h.b&&(h.b=f.s+Xt(h.b))},cv=function(e,t){var i=e[0]?wr(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=_s({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},uv=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(Yt(t))a=i[e]||(i[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Qs=function(e,t,i,r,s){return yt(e)?e.call(t,i,r,s):Ot(e)&&~e.indexOf("random(")?lo(e):e},em=Xu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",tm={};cn(em+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return tm[n]=1});var Rt=(function(n){xp(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Zs(r))||this;var l=a.vars,u=l.duration,f=l.delay,h=l.immediateRender,d=l.stagger,p=l.overwrite,v=l.keyframes,g=l.defaults,_=l.scrollTrigger,m=l.yoyoEase,E=r.parent||xt,T=(Yt(i)||Mp(i)?wi(i[0]):"length"in r)?[i]:On(i),x,w,P,D,C,M,b,L;if(a._targets=T.length?qu(T):oo("GSAP target "+i+" not found. https://gsap.com",!bn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,v||d||No(u)||No(f)){if(r=a.vars,x=a.timeline=new en({data:"nested",defaults:g||{},targets:E&&E.data==="nested"?E.vars.targets:T}),x.kill(),x.parent=x._dp=gi(a),x._start=0,d||No(u)||No(f)){if(D=T.length,b=d&&zp(d),ai(d))for(C in d)~em.indexOf(C)&&(L||(L={}),L[C]=d[C]);for(w=0;w<D;w++)P=La(r,tm),P.stagger=0,m&&(P.yoyoEase=m),L&&_s(P,L),M=T[w],P.duration=+Qs(u,gi(a),w,M,T),P.delay=(+Qs(f,gi(a),w,M,T)||0)-a._delay,!d&&D===1&&P.delay&&(a._delay=f=P.delay,a._start+=f,P.delay=0),x.to(M,P,b?b(w,M,T):0),x._ease=Ze.none;x.duration()?u=f=0:a.timeline=0}else if(v){Zs(Rn(x.vars.defaults,{ease:"none"})),x._ease=Cr(v.ease||r.ease||"none");var F=0,O,Q,$;if(Yt(v))v.forEach(function(X){return x.to(T,X,">")}),x.duration();else{P={};for(C in v)C==="ease"||C==="easeEach"||uv(C,v[C],P,v.easeEach);for(C in P)for(O=P[C].sort(function(X,K){return X.t-K.t}),F=0,w=0;w<O.length;w++)Q=O[w],$={ease:Q.e,duration:(Q.t-(w?O[w-1].t:0))/100*u},$[C]=Q.v,x.to(T,$,F),F+=$.duration;x.duration()<u&&x.to({},{duration:u-x.duration()})}}u||a.duration(u=x.duration())}else a.timeline=0;return p===!0&&!zu&&(ki=gi(a),xt.killTweensOf(T),ki=0),ti(E,gi(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!u&&!v&&a._start===Ct(E._time)&&ln(h)&&k0(gi(a))&&E.data!=="nested")&&(a._tTime=-ut,a.render(Math.max(0,-f)||0)),_&&Np(gi(a),_),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,u=this._dur,f=r<0,h=r>l-ut&&!f?l:r<ut?0:r,d,p,v,g,_,m,E,T,x;if(!u)G0(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==f||this._lazy){if(d=h,T=this.timeline,this._repeat){if(g=u+this._rDelay,this._repeat<-1&&f)return this.totalTime(g*100+r,s,o);if(d=Ct(h%g),h===l?(v=this._repeat,d=u):(_=Ct(h/g),v=~~_,v&&v===_?(d=u,v--):d>u&&(d=u)),m=this._yoyo&&v&1,m&&(x=this._yEase,d=u-d),_=gs(this._tTime,g),d===a&&!o&&this._initted&&v===_)return this._tTime=h,this;v!==_&&(T&&this._yEase&&jp(T,m),this.vars.repeatRefresh&&!m&&!this._lock&&d!==g&&this._initted&&(this._lock=o=1,this.render(Ct(g*v),!0).invalidate()._lock=0))}if(!this._initted){if(Fp(this,f?r:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&v!==_))return this;if(u!==this._dur)return this.render(r,s,o)}if(this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=E=(x||this._ease)(d/u),this._from&&(this.ratio=E=1-E),!a&&h&&!s&&!_&&(Tn(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(E,p.d),p=p._next;T&&T.render(r<0?r:T._dur*T._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(f&&vc(this,r,s,o),Tn(this,"onUpdate")),this._repeat&&v!==_&&this.vars.onRepeat&&!s&&this.parent&&Tn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(f&&!this._onUpdate&&vc(this,r,!0,!0),(r||!u)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ji(this,1),!s&&!(f&&!a)&&(h||a||m)&&(Tn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){co||yn.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),f;return this._initted||Ku(this,u),f=this._ease(u/this._dur),lv(this,r,s,o,a,f,u,l)?this.resetTo(r,s,o,a,1):(tl(this,0),this.parent||Ip(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ks(this):this.scrollTrigger&&this.scrollTrigger.kill(!!zt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ki&&ki.vars.overwrite!==!0)._first||ks(this),this.parent&&o!==this.timeline.totalDuration()&&vs(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?On(r):a,u=this._ptLookup,f=this._pt,h,d,p,v,g,_,m;if((!s||s==="all")&&z0(a,l))return s==="all"&&(this._pt=0),ks(this);for(h=this._op=this._op||[],s!=="all"&&(Ot(s)&&(g={},cn(s,function(E){return g[E]=1}),s=g),s=cv(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){d=u[m],s==="all"?(h[m]=s,v=d,p={}):(p=h[m]=h[m]||{},v=s);for(g in v)_=d&&d[g],_&&((!("kill"in _.d)||_.d.kill(g)===!0)&&Qa(this,_,"_pt"),delete d[g]),p!=="all"&&(p[g]=1)}return this._initted&&!this._pt&&f&&ks(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Js(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Js(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return xt.killTweensOf(r,s,o)},e})(uo);Rn(Rt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});cn("staggerTo,staggerFrom,staggerFromTo",function(n){Rt[n]=function(){var e=new en,t=Sc.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var ju=function(e,t,i){return e[t]=i},nm=function(e,t,i){return e[t](i)},fv=function(e,t,i,r){return e[t](r.fp,i)},hv=function(e,t,i){return e.setAttribute(t,i)},Zu=function(e,t){return yt(e[t])?nm:Hu(e[t])&&e.setAttribute?hv:ju},im=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},dv=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},rm=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Ju=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},pv=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},mv=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Qa(this,t,"_pt"):t.dep||(i=1),t=r;return!i},_v=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},sm=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},un=(function(){function n(t,i,r,s,o,a,l,u,f){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||im,this.d=l||this,this.set=u||ju,this.pr=f||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=_v,this.m=i,this.mt=s,this.tween=r},n})();cn(Xu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Wu[n]=1});wn.TweenMax=wn.TweenLite=Rt;wn.TimelineLite=wn.TimelineMax=en;xt=new en({sortChildren:!1,defaults:ms,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});bn.stringFilter=$p;var Pr=[],ma={},gv=[],eh=0,vv=0,yl=function(e){return(ma[e]||gv).map(function(t){return t()})},Tc=function(){var e=Date.now(),t=[];e-eh>2&&(yl("matchMediaInit"),Pr.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,u;for(a in r)o=Jn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,u=1);u&&(i.revert(),l&&t.push(i))}),yl("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),eh=e,yl("matchMedia"))},om=(function(){function n(t,i){this.selector=i&&Mc(i),this.data=[],this._r=[],this.isReverted=!1,this.id=vv++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){yt(i)&&(s=r,r=i,i=yt);var o=this,a=function(){var u=mt,f=o.selector,h;return u&&u!==o&&u.data.push(o),s&&(o.selector=Mc(s)),mt=o,h=r.apply(o,arguments),yt(h)&&o._r.push(h),mt=u,o.selector=f,o.isReverted=!1,h};return o.last=a,i===yt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=mt;mt=null,i(this),mt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof Rt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?(function(){for(var a=s.getTweens(),l=s.data.length,u;l--;)u=s.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(f){return a.splice(a.indexOf(f),1)}));for(a.map(function(f){return{g:f._dur||f._delay||f._sat&&!f._sat.vars.immediateRender?f.globalTime(0):-1/0,t:f}}).sort(function(f,h){return h.g-f.g||-1/0}).forEach(function(f){return f.t.revert(i)}),l=s.data.length;l--;)u=s.data[l],u instanceof en?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof Rt)&&u.revert&&u.revert(i);s._r.forEach(function(f){return f(i,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Pr.length;o--;)Pr[o].id===this.id&&Pr.splice(o,1)},e.revert=function(i){this.kill(i||{})},n})(),xv=(function(){function n(t){this.contexts=[],this.scope=t,mt&&mt.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){ai(i)||(i={matches:i});var o=new om(0,s||this.scope),a=o.conditions={},l,u,f;mt&&!o.selector&&(o.selector=mt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(u in i)u==="all"?f=1:(l=Jn.matchMedia(i[u]),l&&(Pr.indexOf(o)<0&&Pr.push(o),(a[u]=l.matches)&&(f=1),l.addListener?l.addListener(Tc):l.addEventListener("change",Tc)));return f&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n})(),Ua={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return Xp(r)})},timeline:function(e){return new en(e)},getTweensOf:function(e,t){return xt.getTweensOf(e,t)},getProperty:function(e,t,i,r){Ot(e)&&(e=On(e)[0]);var s=wr(e||{}).get,o=i?Lp:Dp;return i==="native"&&(i=""),e&&(t?o((Sn[t]&&Sn[t].get||s)(e,t,i,r)):function(a,l,u){return o((Sn[a]&&Sn[a].get||s)(e,a,l,u))})},quickSetter:function(e,t,i){if(e=On(e),e.length>1){var r=e.map(function(f){return pn.quickSetter(f,t,i)}),s=r.length;return function(f){for(var h=s;h--;)r[h](f)}}e=e[0]||{};var o=Sn[t],a=wr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=o?function(f){var h=new o;ts._pt=0,h.init(e,i?f+i:f,ts,0,[e]),h.render(1,h),ts._pt&&Ju(1,ts)}:a.set(e,l);return o?u:function(f){return u(e,l,i?f+i:f,a,1)}},quickTo:function(e,t,i){var r,s=pn.to(e,Rn((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,u,f){return s.resetTo(t,l,u,f)};return o.tween=s,o},isTweening:function(e){return xt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Cr(e.ease,ms.ease)),Kf(ms,e||{})},config:function(e){return Kf(bn,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Sn[a]&&!wn[a]&&oo(t+" effect requires "+a+" plugin.")}),vl[t]=function(a,l,u){return i(On(a),Rn(l||{},s),u)},o&&(en.prototype[t]=function(a,l,u){return this.add(vl[t](a,ai(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){Ze[e]=Cr(t)},parseEase:function(e,t){return arguments.length?Cr(e,t):Ze},getById:function(e){return xt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new en(e),r,s;for(i.smoothChildTiming=ln(e.smoothChildTiming),xt.remove(i),i._dp=0,i._time=i._tTime=xt._time,r=xt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Rt&&r.vars.onComplete===r._targets[0]))&&ti(i,r,r._start-r._delay),r=s;return ti(xt,i,0),i},context:function(e,t){return e?new om(e,t):mt},matchMedia:function(e){return new xv(e)},matchMediaRefresh:function(){return Pr.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||Tc()},addEventListener:function(e,t){var i=ma[e]||(ma[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=ma[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:Z0,wrapYoyo:J0,distribute:zp,random:kp,snap:Hp,normalize:j0,getUnit:Xt,clamp:q0,splitColor:qp,toArray:On,selector:Mc,mapRange:Gp,pipe:$0,unitize:K0,interpolate:Q0,shuffle:Bp},install:Ap,effects:vl,ticker:yn,updateRoot:en.updateRoot,plugins:Sn,globalTimeline:xt,core:{PropTween:un,globals:wp,Tween:Rt,Timeline:en,Animation:uo,getCache:wr,_removeLinkedListItem:Qa,reverting:function(){return zt},context:function(e){return e&&mt&&(mt.data.push(e),e._ctx=mt),mt},suppressOverwrites:function(e){return zu=e}}};cn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Ua[n]=Rt[n]});yn.add(en.updateRoot);ts=Ua.to({},{duration:0});var Sv=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Mv=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=Sv(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},El=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,u;if(Ot(s)&&(l={},cn(s,function(f){return l[f]=1}),s=l),t){l={};for(u in s)l[u]=t(s[u]);s=l}Mv(a,s)}}}},pn=Ua.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)zt?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},El("roundProps",yc),El("modifiers"),El("snap",Hp))||Ua;Rt.version=en.version=pn.version="3.13.0";bp=1;ku()&&xs();Ze.Power0;Ze.Power1;Ze.Power2;Ze.Power3;Ze.Power4;Ze.Linear;Ze.Quad;Ze.Cubic;Ze.Quart;Ze.Quint;Ze.Strong;Ze.Elastic;Ze.Back;Ze.SteppedEase;Ze.Bounce;Ze.Sine;Ze.Expo;Ze.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var th,Vi,us,Qu,yr,nh,ef,yv=function(){return typeof window<"u"},Ri={},gr=180/Math.PI,fs=Math.PI/180,Br=Math.atan2,ih=1e8,tf=/([A-Z])/g,Ev=/(left|right|width|margin|padding|x)/i,Tv=/[\s,\(]\S/,ni={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},bv=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Av=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},wv=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},am=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},lm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Rv=function(e,t,i){return e.style[t]=i},Cv=function(e,t,i){return e.style.setProperty(t,i)},Pv=function(e,t,i){return e._gsap[t]=i},Dv=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Lv=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},Iv=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},St="transform",fn=St+"Origin",Uv=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Ri&&s){if(this.tfm=this.tfm||{},e!=="transform")e=ni[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=vi(r,a)}):this.tfm[e]=o.x?o[e]:vi(r,e),e===fn&&(this.tfm.zOrigin=o.zOrigin);else return ni.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(St)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(fn,t,"")),e=St}(s||t)&&this.props.push(e,t,s[e])},cm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Nv=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(tf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=ef(),(!s||!s.isStart)&&!i[St]&&(cm(i),r.zOrigin&&i[fn]&&(i[fn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},um=function(e,t){var i={target:e,props:[],revert:Nv,save:Uv};return e._gsap||pn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},fm,Ac=function(e,t){var i=Vi.createElementNS?Vi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Vi.createElement(e);return i&&i.style?i:Vi.createElement(e)},Bn=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(tf,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,Ss(t)||t,1)||""},rh="O,Moz,ms,Ms,Webkit".split(","),Ss=function(e,t,i){var r=t||yr,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(rh[o]+e in s););return o<0?null:(o===3?"ms":o>=0?rh[o]:"")+e},wc=function(){yv()&&window.document&&(th=window,Vi=th.document,us=Vi.documentElement,yr=Ac("div")||{style:{}},Ac("div"),St=Ss(St),fn=St+"Origin",yr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fm=!!Ss("perspective"),ef=pn.core.reverting,Qu=1)},sh=function(e){var t=e.ownerSVGElement,i=Ac("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),us.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),us.removeChild(i),s},oh=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},hm=function(e){var t,i;try{t=e.getBBox()}catch{t=sh(e),i=1}return t&&(t.width||t.height)||i||(t=sh(e)),t&&!t.width&&!t.x&&!t.y?{x:+oh(e,["x","cx","x1"])||0,y:+oh(e,["y","cy","y1"])||0,width:0,height:0}:t},dm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&hm(e))},Dr=function(e,t){if(t){var i=e.style,r;t in Ri&&t!==fn&&(t=St),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(tf,"-$1").toLowerCase())):i.removeAttribute(t)}},Gi=function(e,t,i,r,s,o){var a=new un(e._pt,t,i,0,1,o?lm:am);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},ah={deg:1,rad:1,turn:1},Fv={grid:1,flex:1},Qi=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=yr.style,l=Ev.test(t),u=e.tagName.toLowerCase()==="svg",f=(u?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",p=r==="%",v,g,_,m;if(r===o||!s||ah[r]||ah[o])return s;if(o!=="px"&&!d&&(s=n(e,t,i,"px")),m=e.getCTM&&dm(e),(p||o==="%")&&(Ri[t]||~t.indexOf("adius")))return v=m?e.getBBox()[l?"width":"height"]:e[f],Et(p?s/v*h:s/100*v);if(a[l?"width":"height"]=h+(d?o:r),g=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!u?e:e.parentNode,m&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Vi||!g.appendChild)&&(g=Vi.body),_=g._gsap,_&&p&&_.width&&l&&_.time===yn.time&&!_.uncache)return Et(s/_.width*h);if(p&&(t==="height"||t==="width")){var E=e.style[t];e.style[t]=h+r,v=e[f],E?e.style[t]=E:Dr(e,t)}else(p||o==="%")&&!Fv[Bn(g,"display")]&&(a.position=Bn(e,"position")),g===e&&(a.position="static"),g.appendChild(yr),v=yr[f],g.removeChild(yr),a.position="absolute";return l&&p&&(_=wr(g),_.time=yn.time,_.width=g[f]),Et(d?v*s/h:v&&s?h/v*s:0)},vi=function(e,t,i,r){var s;return Qu||wc(),t in ni&&t!=="transform"&&(t=ni[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ri[t]&&t!=="transform"?(s=ho(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Fa(Bn(e,fn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Na[t]&&Na[t](e,t,i)||Bn(e,t)||Cp(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?Qi(e,t,s,i)+i:s},Ov=function(e,t,i,r){if(!i||i==="none"){var s=Ss(t,e,1),o=s&&Bn(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=Bn(e,"borderTopColor"))}var a=new un(this._pt,e.style,t,0,1,rm),l=0,u=0,f,h,d,p,v,g,_,m,E,T,x,w;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Bn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(g=e.style[t],e.style[t]=r,r=Bn(e,t)||r,g?e.style[t]=g:Dr(e,t)),f=[i,r],$p(f),i=f[0],r=f[1],d=i.match(es)||[],w=r.match(es)||[],w.length){for(;h=es.exec(r);)_=h[0],E=r.substring(l,h.index),v?v=(v+1)%5:(E.substr(-5)==="rgba("||E.substr(-5)==="hsla(")&&(v=1),_!==(g=d[u++]||"")&&(p=parseFloat(g)||0,x=g.substr((p+"").length),_.charAt(1)==="="&&(_=cs(p,_)+x),m=parseFloat(_),T=_.substr((m+"").length),l=es.lastIndex-T.length,T||(T=T||bn.units[t]||x,l===r.length&&(r+=T,a.e+=T)),x!==T&&(p=Qi(e,t,g,T)||0),a._pt={_next:a._pt,p:E||u===1?E:",",s:p,c:m-p,m:v&&v<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?lm:am;return Ep.test(r)&&(a.e=0),this._pt=a,a},lh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Bv=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=lh[i]||i,t[1]=lh[r]||r,t.join(" ")},zv=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,u;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),u=s.length;--u>-1;)a=s[u],Ri[a]&&(l=1,a=a==="transformOrigin"?fn:St),Dr(i,a);l&&(Dr(i,St),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",ho(i,1),o.uncache=1,cm(r)))}},Na={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new un(e._pt,t,i,0,0,zv);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},fo=[1,0,0,1,0,0],pm={},mm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ch=function(e){var t=Bn(e,St);return mm(t)?fo:t.substr(7).match(yp).map(Et)},nf=function(e,t){var i=e._gsap||wr(e),r=e.style,s=ch(e),o,a,l,u;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?fo:s):(s===fo&&!e.offsetParent&&e!==us&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,a=e.nextElementSibling,us.appendChild(e)),s=ch(e),l?r.display=l:Dr(e,"display"),u&&(a?o.insertBefore(e,a):o?o.appendChild(e):us.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Rc=function(e,t,i,r,s,o){var a=e._gsap,l=s||nf(e,!0),u=a.xOrigin||0,f=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,p=l[0],v=l[1],g=l[2],_=l[3],m=l[4],E=l[5],T=t.split(" "),x=parseFloat(T[0])||0,w=parseFloat(T[1])||0,P,D,C,M;i?l!==fo&&(D=p*_-v*g)&&(C=x*(_/D)+w*(-g/D)+(g*E-_*m)/D,M=x*(-v/D)+w*(p/D)-(p*E-v*m)/D,x=C,w=M):(P=hm(e),x=P.x+(~T[0].indexOf("%")?x/100*P.width:x),w=P.y+(~(T[1]||T[0]).indexOf("%")?w/100*P.height:w)),r||r!==!1&&a.smooth?(m=x-u,E=w-f,a.xOffset=h+(m*p+E*g)-m,a.yOffset=d+(m*v+E*_)-E):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=w,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[fn]="0px 0px",o&&(Gi(o,a,"xOrigin",u,x),Gi(o,a,"yOrigin",f,w),Gi(o,a,"xOffset",h,a.xOffset),Gi(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+w)},ho=function(e,t){var i=e._gsap||new Jp(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),u=Bn(e,fn)||"0",f,h,d,p,v,g,_,m,E,T,x,w,P,D,C,M,b,L,F,O,Q,$,X,K,H,pe,_e,Te,Ue,Je,Ye,Xe;return f=h=d=g=_=m=E=T=x=0,p=v=1,i.svg=!!(e.getCTM&&dm(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[St]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[St]!=="none"?l[St]:"")),r.scale=r.rotate=r.translate="none"),D=nf(e,i.svg),i.svg&&(i.uncache?(H=e.getBBox(),u=i.xOrigin-H.x+"px "+(i.yOrigin-H.y)+"px",K=""):K=!t&&e.getAttribute("data-svg-origin"),Rc(e,K||u,!!K||i.originIsAbsolute,i.smooth!==!1,D)),w=i.xOrigin||0,P=i.yOrigin||0,D!==fo&&(L=D[0],F=D[1],O=D[2],Q=D[3],f=$=D[4],h=X=D[5],D.length===6?(p=Math.sqrt(L*L+F*F),v=Math.sqrt(Q*Q+O*O),g=L||F?Br(F,L)*gr:0,E=O||Q?Br(O,Q)*gr+g:0,E&&(v*=Math.abs(Math.cos(E*fs))),i.svg&&(f-=w-(w*L+P*O),h-=P-(w*F+P*Q))):(Xe=D[6],Je=D[7],_e=D[8],Te=D[9],Ue=D[10],Ye=D[11],f=D[12],h=D[13],d=D[14],C=Br(Xe,Ue),_=C*gr,C&&(M=Math.cos(-C),b=Math.sin(-C),K=$*M+_e*b,H=X*M+Te*b,pe=Xe*M+Ue*b,_e=$*-b+_e*M,Te=X*-b+Te*M,Ue=Xe*-b+Ue*M,Ye=Je*-b+Ye*M,$=K,X=H,Xe=pe),C=Br(-O,Ue),m=C*gr,C&&(M=Math.cos(-C),b=Math.sin(-C),K=L*M-_e*b,H=F*M-Te*b,pe=O*M-Ue*b,Ye=Q*b+Ye*M,L=K,F=H,O=pe),C=Br(F,L),g=C*gr,C&&(M=Math.cos(C),b=Math.sin(C),K=L*M+F*b,H=$*M+X*b,F=F*M-L*b,X=X*M-$*b,L=K,$=H),_&&Math.abs(_)+Math.abs(g)>359.9&&(_=g=0,m=180-m),p=Et(Math.sqrt(L*L+F*F+O*O)),v=Et(Math.sqrt(X*X+Xe*Xe)),C=Br($,X),E=Math.abs(C)>2e-4?C*gr:0,x=Ye?1/(Ye<0?-Ye:Ye):0),i.svg&&(K=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!mm(Bn(e,St)),K&&e.setAttribute("transform",K))),Math.abs(E)>90&&Math.abs(E)<270&&(s?(p*=-1,E+=g<=0?180:-180,g+=g<=0?180:-180):(v*=-1,E+=E<=0?180:-180)),t=t||i.uncache,i.x=f-((i.xPercent=f&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-f)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=h-((i.yPercent=h&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=d+o,i.scaleX=Et(p),i.scaleY=Et(v),i.rotation=Et(g)+a,i.rotationX=Et(_)+a,i.rotationY=Et(m)+a,i.skewX=E+a,i.skewY=T+a,i.transformPerspective=x+o,(i.zOrigin=parseFloat(u.split(" ")[2])||!t&&i.zOrigin||0)&&(r[fn]=Fa(u)),i.xOffset=i.yOffset=0,i.force3D=bn.force3D,i.renderTransform=i.svg?kv:fm?_m:Hv,i.uncache=0,i},Fa=function(e){return(e=e.split(" "))[0]+" "+e[1]},Tl=function(e,t,i){var r=Xt(t);return Et(parseFloat(t)+parseFloat(Qi(e,"x",i+"px",r)))+r},Hv=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,_m(e,t)},lr="0deg",Is="0px",cr=") ",_m=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,u=i.rotation,f=i.rotationY,h=i.rotationX,d=i.skewX,p=i.skewY,v=i.scaleX,g=i.scaleY,_=i.transformPerspective,m=i.force3D,E=i.target,T=i.zOrigin,x="",w=m==="auto"&&e&&e!==1||m===!0;if(T&&(h!==lr||f!==lr)){var P=parseFloat(f)*fs,D=Math.sin(P),C=Math.cos(P),M;P=parseFloat(h)*fs,M=Math.cos(P),o=Tl(E,o,D*M*-T),a=Tl(E,a,-Math.sin(P)*-T),l=Tl(E,l,C*M*-T+T)}_!==Is&&(x+="perspective("+_+cr),(r||s)&&(x+="translate("+r+"%, "+s+"%) "),(w||o!==Is||a!==Is||l!==Is)&&(x+=l!==Is||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+cr),u!==lr&&(x+="rotate("+u+cr),f!==lr&&(x+="rotateY("+f+cr),h!==lr&&(x+="rotateX("+h+cr),(d!==lr||p!==lr)&&(x+="skew("+d+", "+p+cr),(v!==1||g!==1)&&(x+="scale("+v+", "+g+cr),E.style[St]=x||"translate(0, 0)"},kv=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,u=i.skewX,f=i.skewY,h=i.scaleX,d=i.scaleY,p=i.target,v=i.xOrigin,g=i.yOrigin,_=i.xOffset,m=i.yOffset,E=i.forceCSS,T=parseFloat(o),x=parseFloat(a),w,P,D,C,M;l=parseFloat(l),u=parseFloat(u),f=parseFloat(f),f&&(f=parseFloat(f),u+=f,l+=f),l||u?(l*=fs,u*=fs,w=Math.cos(l)*h,P=Math.sin(l)*h,D=Math.sin(l-u)*-d,C=Math.cos(l-u)*d,u&&(f*=fs,M=Math.tan(u-f),M=Math.sqrt(1+M*M),D*=M,C*=M,f&&(M=Math.tan(f),M=Math.sqrt(1+M*M),w*=M,P*=M)),w=Et(w),P=Et(P),D=Et(D),C=Et(C)):(w=h,C=d,P=D=0),(T&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(T=Qi(p,"x",o,"px"),x=Qi(p,"y",a,"px")),(v||g||_||m)&&(T=Et(T+v-(v*w+g*D)+_),x=Et(x+g-(v*P+g*C)+m)),(r||s)&&(M=p.getBBox(),T=Et(T+r/100*M.width),x=Et(x+s/100*M.height)),M="matrix("+w+","+P+","+D+","+C+","+T+","+x+")",p.setAttribute("transform",M),E&&(p.style[St]=M)},Vv=function(e,t,i,r,s){var o=360,a=Ot(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?gr:1),u=l-r,f=r+u+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(u%=o,u!==u%(o/2)&&(u+=u<0?o:-o)),h==="cw"&&u<0?u=(u+o*ih)%o-~~(u/o)*o:h==="ccw"&&u>0&&(u=(u-o*ih)%o-~~(u/o)*o)),e._pt=d=new un(e._pt,t,i,r,u,bv),d.e=f,d.u="deg",e._props.push(i),d},uh=function(e,t){for(var i in t)e[i]=t[i];return e},Gv=function(e,t,i){var r=uh({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,u,f,h,d,p,v;r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),o[St]=t,a=ho(i,1),Dr(i,St),i.setAttribute("transform",u)):(u=getComputedStyle(i)[St],o[St]=t,a=ho(i,1),o[St]=u);for(l in Ri)u=r[l],f=a[l],u!==f&&s.indexOf(l)<0&&(p=Xt(u),v=Xt(f),h=p!==v?Qi(i,l,u,v):parseFloat(u),d=parseFloat(f),e._pt=new un(e._pt,a,l,h,d-h,bc),e._pt.u=v||0,e._props.push(l));uh(a,r)};cn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});Na[e>1?"border"+n:n]=function(a,l,u,f,h){var d,p;if(arguments.length<4)return d=o.map(function(v){return vi(a,v,u)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(f+"").split(" "),p={},o.forEach(function(v,g){return p[v]=d[g]=d[g]||d[(g-1)/2|0]}),a.init(l,p,h)}});var gm={name:"css",register:wc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,u,f,h,d,p,v,g,_,m,E,T,x,w,P,D,C;Qu||wc(),this.styles=this.styles||um(e),C=this.styles.props,this.tween=i;for(g in t)if(g!=="autoRound"&&(f=t[g],!(Sn[g]&&Qp(g,t,i,r,e,s)))){if(p=typeof f,v=Na[g],p==="function"&&(f=f.call(i,r,e,s),p=typeof f),p==="string"&&~f.indexOf("random(")&&(f=lo(f)),v)v(this,e,g,f,i)&&(D=1);else if(g.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(g)+"").trim(),f+="",qi.lastIndex=0,qi.test(u)||(_=Xt(u),m=Xt(f)),m?_!==m&&(u=Qi(e,g,u,m)+m):_&&(f+=_),this.add(a,"setProperty",u,f,r,s,0,0,g),o.push(g),C.push(g,0,a[g]);else if(p!=="undefined"){if(l&&g in l?(u=typeof l[g]=="function"?l[g].call(i,r,e,s):l[g],Ot(u)&&~u.indexOf("random(")&&(u=lo(u)),Xt(u+"")||u==="auto"||(u+=bn.units[g]||Xt(vi(e,g))||""),(u+"").charAt(1)==="="&&(u=vi(e,g))):u=vi(e,g),d=parseFloat(u),E=p==="string"&&f.charAt(1)==="="&&f.substr(0,2),E&&(f=f.substr(2)),h=parseFloat(f),g in ni&&(g==="autoAlpha"&&(d===1&&vi(e,"visibility")==="hidden"&&h&&(d=0),C.push("visibility",0,a.visibility),Gi(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=ni[g],~g.indexOf(",")&&(g=g.split(",")[0]))),T=g in Ri,T){if(this.styles.save(g),p==="string"&&f.substring(0,6)==="var(--"&&(f=Bn(e,f.substring(4,f.indexOf(")"))),h=parseFloat(f)),x||(w=e._gsap,w.renderTransform&&!t.parseTransform||ho(e,t.parseTransform),P=t.smoothOrigin!==!1&&w.smooth,x=this._pt=new un(this._pt,a,St,0,1,w.renderTransform,w,0,-1),x.dep=1),g==="scale")this._pt=new un(this._pt,w,"scaleY",w.scaleY,(E?cs(w.scaleY,E+h):h)-w.scaleY||0,bc),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){C.push(fn,0,a[fn]),f=Bv(f),w.svg?Rc(e,f,0,P,0,this):(m=parseFloat(f.split(" ")[2])||0,m!==w.zOrigin&&Gi(this,w,"zOrigin",w.zOrigin,m),Gi(this,a,g,Fa(u),Fa(f)));continue}else if(g==="svgOrigin"){Rc(e,f,1,P,0,this);continue}else if(g in pm){Vv(this,w,g,d,E?cs(d,E+f):f);continue}else if(g==="smoothOrigin"){Gi(this,w,"smooth",w.smooth,f);continue}else if(g==="force3D"){w[g]=f;continue}else if(g==="transform"){Gv(this,f,e);continue}}else g in a||(g=Ss(g)||g);if(T||(h||h===0)&&(d||d===0)&&!Tv.test(f)&&g in a)_=(u+"").substr((d+"").length),h||(h=0),m=Xt(f)||(g in bn.units?bn.units[g]:_),_!==m&&(d=Qi(e,g,u,m)),this._pt=new un(this._pt,T?w:a,g,d,(E?cs(d,E+h):h)-d,!T&&(m==="px"||g==="zIndex")&&t.autoRound!==!1?wv:bc),this._pt.u=m||0,_!==m&&m!=="%"&&(this._pt.b=u,this._pt.r=Av);else if(g in a)Ov.call(this,e,g,u,E?E+f:f);else if(g in e)this.add(e,g,u||e[g],E?E+f:f,r,s);else if(g!=="parseTransform"){Gu(g,f);continue}T||(g in a?C.push(g,0,a[g]):typeof e[g]=="function"?C.push(g,2,e[g]()):C.push(g,1,u||e[g])),o.push(g)}}D&&sm(this)},render:function(e,t){if(t.tween._time||!ef())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:vi,aliases:ni,getSetter:function(e,t,i){var r=ni[t];return r&&r.indexOf(",")<0&&(t=r),t in Ri&&t!==fn&&(e._gsap.x||vi(e,"x"))?i&&nh===i?t==="scale"?Dv:Pv:(nh=i||{})&&(t==="scale"?Lv:Iv):e.style&&!Hu(e.style[t])?Rv:~t.indexOf("-")?Cv:Zu(e,t)},core:{_removeProperty:Dr,_getMatrix:nf}};pn.utils.checkPrefix=Ss;pn.core.getStyleSaver=um;(function(n,e,t,i){var r=cn(n+","+e+","+t,function(s){Ri[s]=1});cn(e,function(s){bn.units[s]="deg",pm[s]=1}),ni[r[13]]=n+","+e,cn(i,function(s){var o=s.split(":");ni[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");cn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){bn.units[n]="px"});pn.registerPlugin(gm);var Dt=pn.registerPlugin(gm)||pn;Dt.core.Tween;const Wv={class:"footer",id:"about"},Xv={__name:"Footer",setup(n){return(e,t)=>(Ft(),Gt("footer",Wv,[...t[0]||(t[0]=[Ou('<div class="container" data-v-535bb78f><div class="footer__content" data-v-535bb78f><div class="footer__section" data-v-535bb78f><div class="footer__logo" data-v-535bb78f><div class="logo-icon" data-v-535bb78f><i class="fa fa-cube" data-v-535bb78f></i></div><h3 class="footer__title text-gradient" data-v-535bb78f>Tech</h3></div><p class="footer__description" data-v-535bb78f>探索前沿技术，分享创新思维</p><p class="footer__copyright" data-v-535bb78f>© 2025 Tech. 保留所有权利。</p></div><div class="footer__section" data-v-535bb78f><h4 class="footer__section-title" data-v-535bb78f>分类</h4><ul class="footer__links" data-v-535bb78f><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>golang开发</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>3D技术</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>前端开发</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>云计算</a></li></ul></div><div class="footer__section" data-v-535bb78f><h4 class="footer__section-title" data-v-535bb78f>资源</h4><ul class="footer__links" data-v-535bb78f><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>教程</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>代码示例</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>工具推荐</a></li><li data-v-535bb78f><a href="#" class="footer__link" data-v-535bb78f>社区讨论</a></li></ul></div><div class="footer__section" data-v-535bb78f><h4 class="footer__section-title" data-v-535bb78f>联系我们</h4><ul class="footer__links" data-v-535bb78f><li class="footer__contact" data-v-535bb78f><i class="fa fa-envelope-o" data-v-535bb78f></i> contact@tech.com </li><li class="footer__contact" data-v-535bb78f><i class="fa fa-map-marker" data-v-535bb78f></i> 重庆市 </li><li class="footer__contact" data-v-535bb78f><i class="fa fa-wechat" data-v-535bb78f></i> Tech公众号 </li></ul></div></div></div>',1)])]))}},qv=yo(Xv,[["__scopeId","data-v-535bb78f"]]),Yv={class:"article-card__image"},$v=["src","alt"],Kv={class:"article-card__content"},jv={class:"article-card__meta"},Zv={class:"article-card__date"},Jv={class:"article-card__title"},Qv={class:"article-card__description"},ex={class:"article-card__footer"},tx={class:"article-card__read-time"},nx={href:"#",class:"article-card__link"},ix={__name:"ArticleCard",props:{article:{type:Object,required:!0}},setup(n){const e=wt(!1),t=wt(null);So(()=>{t.value&&Dt.from(t.value,{y:30,opacity:0,duration:.7,ease:"power2.out"})});const i=()=>{e.value=!0,t.value&&Dt.to(t.value,{scale:1.035,filter:"none",boxShadow:"0 8px 32px rgba(79,140,255,0.18)",duration:.18,ease:"power1.out"})},r=()=>{e.value=!1,t.value&&Dt.to(t.value,{scale:1,filter:"none",boxShadow:"0 0 0 rgba(0,0,0,0)",duration:.18,ease:"power1.in"})},s=o=>({"3D技术":"blue",WebGL:"purple",前端开发:"green",golang开发:"yellow"})[o]||"blue";return(o,a)=>(Ft(),Gt("article",{class:"article-card",ref_key:"cardRef",ref:t,onMouseenter:i,onMouseleave:r},[ue("div",Yv,[ue("img",{src:n.article.image,alt:n.article.title,class:"article-card__img"},null,8,$v),ue("div",{class:on(["article-card__overlay",{active:e.value}])},null,2)]),ue("div",Kv,[ue("div",jv,[ue("span",{class:on(["article-card__category",`article-card__category--${s(n.article.category)}`])},Vt(n.article.category),3),ue("span",Zv,Vt(n.article.date),1)]),ue("h3",Jv,Vt(n.article.title),1),ue("p",Qv,Vt(n.article.description),1),ue("div",ex,[ue("span",tx,[a[0]||(a[0]=ue("i",{class:"fa fa-clock-o"},null,-1)),ls(" "+Vt(n.article.readTime),1)]),ue("a",nx,[a[1]||(a[1]=ls(" 阅读更多 ",-1)),ue("i",{class:on(["fa fa-long-arrow-right",{active:e.value}])},null,2)])])])],544))}},rx=yo(ix,[["__scopeId","data-v-725082a1"]]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rf="180",sx=0,fh=1,ox=2,vm=1,ax=2,mi=3,er=0,hn=1,Mi=2,Yi=0,hs=1,hh=2,dh=3,ph=4,lx=5,Sr=100,cx=101,ux=102,fx=103,hx=104,dx=200,px=201,mx=202,_x=203,Cc=204,Pc=205,gx=206,vx=207,xx=208,Sx=209,Mx=210,yx=211,Ex=212,Tx=213,bx=214,Dc=0,Lc=1,Ic=2,Ms=3,Uc=4,Nc=5,Fc=6,Oc=7,xm=0,Ax=1,wx=2,$i=0,Rx=1,Cx=2,Px=3,Dx=4,Lx=5,Ix=6,Ux=7,Sm=300,ys=301,Es=302,Bc=303,zc=304,nl=306,Hc=1e3,Er=1001,kc=1002,Yn=1003,Nx=1004,Fo=1005,ii=1006,bl=1007,Tr=1008,Ci=1009,Mm=1010,ym=1011,po=1012,sf=1013,Lr=1014,yi=1015,To=1016,of=1017,af=1018,mo=1020,Em=35902,Tm=35899,bm=1021,Am=1022,Xn=1023,_o=1026,go=1027,wm=1028,lf=1029,Rm=1030,cf=1031,uf=1033,_a=33776,ga=33777,va=33778,xa=33779,Vc=35840,Gc=35841,Wc=35842,Xc=35843,qc=36196,Yc=37492,$c=37496,Kc=37808,jc=37809,Zc=37810,Jc=37811,Qc=37812,eu=37813,tu=37814,nu=37815,iu=37816,ru=37817,su=37818,ou=37819,au=37820,lu=37821,cu=36492,uu=36494,fu=36495,hu=36283,du=36284,pu=36285,mu=36286,Fx=3200,Ox=3201,Bx=0,zx=1,Hi="",In="srgb",Ts="srgb-linear",Oa="linear",at="srgb",zr=7680,mh=519,Hx=512,kx=513,Vx=514,Cm=515,Gx=516,Wx=517,Xx=518,qx=519,_h=35044,gh="300 es",ri=2e3,Ba=2001;class As{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Al=Math.PI/180,_u=180/Math.PI;function bo(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function Yx(n,e){return(n%e+e)%e}function wl(n,e,t){return(1-t)*n+t*e}function Us(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class nt{constructor(e=0,t=0){nt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ao{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],u=i[r+1],f=i[r+2],h=i[r+3];const d=s[o+0],p=s[o+1],v=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=f,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==d||u!==p||f!==v){let _=1-a;const m=l*d+u*p+f*v+h*g,E=m>=0?1:-1,T=1-m*m;if(T>Number.EPSILON){const w=Math.sqrt(T),P=Math.atan2(w,m*E);_=Math.sin(_*P)/w,a=Math.sin(a*P)/w}const x=a*E;if(l=l*_+d*x,u=u*_+p*x,f=f*_+v*x,h=h*_+g*x,_===1-a){const w=1/Math.sqrt(l*l+u*u+f*f+h*h);l*=w,u*=w,f*=w,h*=w}}e[t]=l,e[t+1]=u,e[t+2]=f,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],f=i[r+3],h=s[o],d=s[o+1],p=s[o+2],v=s[o+3];return e[t]=a*v+f*h+l*p-u*d,e[t+1]=l*v+f*d+u*h-a*p,e[t+2]=u*v+f*p+a*d-l*h,e[t+3]=f*v-a*h-l*d-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),f=a(r/2),h=a(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*f*h+u*p*v,this._y=u*p*h-d*f*v,this._z=u*f*v+d*p*h,this._w=u*f*h-d*p*v;break;case"YXZ":this._x=d*f*h+u*p*v,this._y=u*p*h-d*f*v,this._z=u*f*v-d*p*h,this._w=u*f*h+d*p*v;break;case"ZXY":this._x=d*f*h-u*p*v,this._y=u*p*h+d*f*v,this._z=u*f*v+d*p*h,this._w=u*f*h-d*p*v;break;case"ZYX":this._x=d*f*h-u*p*v,this._y=u*p*h+d*f*v,this._z=u*f*v-d*p*h,this._w=u*f*h+d*p*v;break;case"YZX":this._x=d*f*h+u*p*v,this._y=u*p*h+d*f*v,this._z=u*f*v-d*p*h,this._w=u*f*h-d*p*v;break;case"XZY":this._x=d*f*h-u*p*v,this._y=u*p*h-d*f*v,this._z=u*f*v+d*p*h,this._w=u*f*h+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],f=t[6],h=t[10],d=i+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,f=t._w;return this._x=i*f+o*a+r*u-s*l,this._y=r*f+o*l+s*a-i*u,this._z=s*f+o*u+i*l-r*a,this._w=o*f-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),f=Math.atan2(u,a),h=Math.sin((1-t)*f)/u,d=Math.sin(t*f)/u;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),f=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*u+o*h-a*f,this.y=i+l*f+a*u-s*h,this.z=r+l*h+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rl.copy(this).projectOnVector(e),this.sub(Rl)}reflect(e){return this.sub(Rl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rl=new V,vh=new Ao;class Ge{constructor(e,t,i,r,s,o,a,l,u){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u)}set(e,t,i,r,s,o,a,l,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],f=i[4],h=i[7],d=i[2],p=i[5],v=i[8],g=r[0],_=r[3],m=r[6],E=r[1],T=r[4],x=r[7],w=r[2],P=r[5],D=r[8];return s[0]=o*g+a*E+l*w,s[3]=o*_+a*T+l*P,s[6]=o*m+a*x+l*D,s[1]=u*g+f*E+h*w,s[4]=u*_+f*T+h*P,s[7]=u*m+f*x+h*D,s[2]=d*g+p*E+v*w,s[5]=d*_+p*T+v*P,s[8]=d*m+p*x+v*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8];return t*o*f-t*a*u-i*s*f+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],h=f*o-a*u,d=a*l-f*s,p=u*s-o*l,v=t*h+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(r*u-f*i)*g,e[2]=(a*i-r*o)*g,e[3]=d*g,e[4]=(f*t-r*l)*g,e[5]=(r*s-a*t)*g,e[6]=p*g,e[7]=(i*l-u*t)*g,e[8]=(o*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Cl.makeScale(e,t)),this}rotate(e){return this.premultiply(Cl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cl=new Ge;function Pm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function za(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function $x(){const n=za("canvas");return n.style.display="block",n}const xh={};function vo(n){n in xh||(xh[n]=!0,console.warn(n))}function Kx(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Sh=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mh=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jx(){const n={enabled:!0,workingColorSpace:Ts,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===at&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(r.r=ds(r.r),r.g=ds(r.g),r.b=ds(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Hi?Oa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return vo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return vo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ts]:{primaries:e,whitePoint:i,transfer:Oa,toXYZ:Sh,fromXYZ:Mh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Sh,fromXYZ:Mh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),n}const et=jx();function Ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Hr;class Zx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Hr===void 0&&(Hr=za("canvas")),Hr.width=e.width,Hr.height=e.height;const r=Hr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Hr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=za("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ti(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ti(t[i]/255)*255):t[i]=Ti(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jx=0;class ff{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jx++}),this.uuid=bo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Pl(r[o].image)):s.push(Pl(r[o]))}else s=Pl(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Pl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qx=0;const Dl=new V;class dn extends As{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,i=Er,r=Er,s=ii,o=Tr,a=Xn,l=Ci,u=dn.DEFAULT_ANISOTROPY,f=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qx++}),this.uuid=bo(),this.name="",this.source=new ff(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dl).x}get height(){return this.source.getSize(Dl).y}get depth(){return this.source.getSize(Dl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hc:e.x=e.x-Math.floor(e.x);break;case Er:e.x=e.x<0?0:1;break;case kc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hc:e.y=e.y-Math.floor(e.y);break;case Er:e.y=e.y<0?0:1;break;case kc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Sm;dn.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,u=l[0],f=l[4],h=l[8],d=l[1],p=l[5],v=l[9],g=l[2],_=l[6],m=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-g)<.01&&Math.abs(v-_)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+g)<.1&&Math.abs(v+_)<.1&&Math.abs(u+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(u+1)/2,x=(p+1)/2,w=(m+1)/2,P=(f+d)/4,D=(h+g)/4,C=(v+_)/4;return T>x&&T>w?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=P/i,s=D/i):x>w?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=P/r,s=C/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=D/s,r=C/s),this.set(i,r,s,t),this}let E=Math.sqrt((_-v)*(_-v)+(h-g)*(h-g)+(d-f)*(d-f));return Math.abs(E)<.001&&(E=1),this.x=(_-v)/E,this.y=(h-g)/E,this.z=(d-f)/E,this.w=Math.acos((u+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eS extends As{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new dn(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ff(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ir extends eS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dm extends dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=Er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tS extends dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=Er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wo{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kn):kn.fromBufferAttribute(s,o),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Oo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Oo.copy(i.boundingBox)),Oo.applyMatrix4(e.matrixWorld),this.union(Oo)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),Bo.subVectors(this.max,Ns),kr.subVectors(e.a,Ns),Vr.subVectors(e.b,Ns),Gr.subVectors(e.c,Ns),Li.subVectors(Vr,kr),Ii.subVectors(Gr,Vr),ur.subVectors(kr,Gr);let t=[0,-Li.z,Li.y,0,-Ii.z,Ii.y,0,-ur.z,ur.y,Li.z,0,-Li.x,Ii.z,0,-Ii.x,ur.z,0,-ur.x,-Li.y,Li.x,0,-Ii.y,Ii.x,0,-ur.y,ur.x,0];return!Ll(t,kr,Vr,Gr,Bo)||(t=[1,0,0,0,1,0,0,0,1],!Ll(t,kr,Vr,Gr,Bo))?!1:(zo.crossVectors(Li,Ii),t=[zo.x,zo.y,zo.z],Ll(t,kr,Vr,Gr,Bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ui=[new V,new V,new V,new V,new V,new V,new V,new V],kn=new V,Oo=new wo,kr=new V,Vr=new V,Gr=new V,Li=new V,Ii=new V,ur=new V,Ns=new V,Bo=new V,zo=new V,fr=new V;function Ll(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){fr.fromArray(n,s);const a=r.x*Math.abs(fr.x)+r.y*Math.abs(fr.y)+r.z*Math.abs(fr.z),l=e.dot(fr),u=t.dot(fr),f=i.dot(fr);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>a)return!1}return!0}const nS=new wo,Fs=new V,Il=new V;class Ro{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):nS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Fs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(Il)),this.expandByPoint(Fs.copy(e.center).sub(Il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const fi=new V,Ul=new V,Ho=new V,Ui=new V,Nl=new V,ko=new V,Fl=new V;class hf{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ul.copy(e).add(t).multiplyScalar(.5),Ho.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(Ul);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ho),a=Ui.dot(this.direction),l=-Ui.dot(Ho),u=Ui.lengthSq(),f=Math.abs(1-o*o);let h,d,p,v;if(f>0)if(h=o*l-a,d=o*a-l,v=s*f,h>=0)if(d>=-v)if(d<=v){const g=1/f;h*=g,d*=g,p=h*(h+o*d+2*a)+d*(o*h+d+2*l)+u}else d=s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+u;else d=-s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+u;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+u):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+u):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+u);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ul).addScaledVector(Ho,d),p}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),r=fi.dot(fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const u=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),f>=0?(s=(e.min.y-d.y)*f,o=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,o=(e.min.y-d.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,i,r,s){Nl.subVectors(t,e),ko.subVectors(i,e),Fl.crossVectors(Nl,ko);let o=this.direction.dot(Fl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ui.subVectors(this.origin,e);const l=a*this.direction.dot(ko.crossVectors(Ui,ko));if(l<0)return null;const u=a*this.direction.dot(Nl.cross(Ui));if(u<0||l+u>o)return null;const f=-a*Ui.dot(Fl);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt{constructor(e,t,i,r,s,o,a,l,u,f,h,d,p,v,g,_){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u,f,h,d,p,v,g,_)}set(e,t,i,r,s,o,a,l,u,f,h,d,p,v,g,_){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=u,m[6]=f,m[10]=h,m[14]=d,m[3]=p,m[7]=v,m[11]=g,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Wr.setFromMatrixColumn(e,0).length(),s=1/Wr.setFromMatrixColumn(e,1).length(),o=1/Wr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*f,p=o*h,v=a*f,g=a*h;t[0]=l*f,t[4]=-l*h,t[8]=u,t[1]=p+v*u,t[5]=d-g*u,t[9]=-a*l,t[2]=g-d*u,t[6]=v+p*u,t[10]=o*l}else if(e.order==="YXZ"){const d=l*f,p=l*h,v=u*f,g=u*h;t[0]=d+g*a,t[4]=v*a-p,t[8]=o*u,t[1]=o*h,t[5]=o*f,t[9]=-a,t[2]=p*a-v,t[6]=g+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*f,p=l*h,v=u*f,g=u*h;t[0]=d-g*a,t[4]=-o*h,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*f,t[9]=g-d*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*f,p=o*h,v=a*f,g=a*h;t[0]=l*f,t[4]=v*u-p,t[8]=d*u+g,t[1]=l*h,t[5]=g*u+d,t[9]=p*u-v,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*u,v=a*l,g=a*u;t[0]=l*f,t[4]=g-d*h,t[8]=v*h+p,t[1]=h,t[5]=o*f,t[9]=-a*f,t[2]=-u*f,t[6]=p*h+v,t[10]=d-g*h}else if(e.order==="XZY"){const d=o*l,p=o*u,v=a*l,g=a*u;t[0]=l*f,t[4]=-h,t[8]=u*f,t[1]=d*h+g,t[5]=o*f,t[9]=p*h-v,t[2]=v*h-p,t[6]=a*f,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iS,e,rS)}lookAt(e,t,i){const r=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Ni.crossVectors(i,gn),Ni.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Ni.crossVectors(i,gn)),Ni.normalize(),Vo.crossVectors(gn,Ni),r[0]=Ni.x,r[4]=Vo.x,r[8]=gn.x,r[1]=Ni.y,r[5]=Vo.y,r[9]=gn.y,r[2]=Ni.z,r[6]=Vo.z,r[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],f=i[1],h=i[5],d=i[9],p=i[13],v=i[2],g=i[6],_=i[10],m=i[14],E=i[3],T=i[7],x=i[11],w=i[15],P=r[0],D=r[4],C=r[8],M=r[12],b=r[1],L=r[5],F=r[9],O=r[13],Q=r[2],$=r[6],X=r[10],K=r[14],H=r[3],pe=r[7],_e=r[11],Te=r[15];return s[0]=o*P+a*b+l*Q+u*H,s[4]=o*D+a*L+l*$+u*pe,s[8]=o*C+a*F+l*X+u*_e,s[12]=o*M+a*O+l*K+u*Te,s[1]=f*P+h*b+d*Q+p*H,s[5]=f*D+h*L+d*$+p*pe,s[9]=f*C+h*F+d*X+p*_e,s[13]=f*M+h*O+d*K+p*Te,s[2]=v*P+g*b+_*Q+m*H,s[6]=v*D+g*L+_*$+m*pe,s[10]=v*C+g*F+_*X+m*_e,s[14]=v*M+g*O+_*K+m*Te,s[3]=E*P+T*b+x*Q+w*H,s[7]=E*D+T*L+x*$+w*pe,s[11]=E*C+T*F+x*X+w*_e,s[15]=E*M+T*O+x*K+w*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],f=e[2],h=e[6],d=e[10],p=e[14],v=e[3],g=e[7],_=e[11],m=e[15];return v*(+s*l*h-r*u*h-s*a*d+i*u*d+r*a*p-i*l*p)+g*(+t*l*p-t*u*d+s*o*d-r*o*p+r*u*f-s*l*f)+_*(+t*u*h-t*a*p-s*o*h+i*o*p+s*a*f-i*u*f)+m*(-r*a*f-t*l*h+t*a*d+r*o*h-i*o*d+i*l*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],h=e[9],d=e[10],p=e[11],v=e[12],g=e[13],_=e[14],m=e[15],E=h*_*u-g*d*u+g*l*p-a*_*p-h*l*m+a*d*m,T=v*d*u-f*_*u-v*l*p+o*_*p+f*l*m-o*d*m,x=f*g*u-v*h*u+v*a*p-o*g*p-f*a*m+o*h*m,w=v*h*l-f*g*l-v*a*d+o*g*d+f*a*_-o*h*_,P=t*E+i*T+r*x+s*w;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/P;return e[0]=E*D,e[1]=(g*d*s-h*_*s-g*r*p+i*_*p+h*r*m-i*d*m)*D,e[2]=(a*_*s-g*l*s+g*r*u-i*_*u-a*r*m+i*l*m)*D,e[3]=(h*l*s-a*d*s-h*r*u+i*d*u+a*r*p-i*l*p)*D,e[4]=T*D,e[5]=(f*_*s-v*d*s+v*r*p-t*_*p-f*r*m+t*d*m)*D,e[6]=(v*l*s-o*_*s-v*r*u+t*_*u+o*r*m-t*l*m)*D,e[7]=(o*d*s-f*l*s+f*r*u-t*d*u-o*r*p+t*l*p)*D,e[8]=x*D,e[9]=(v*h*s-f*g*s-v*i*p+t*g*p+f*i*m-t*h*m)*D,e[10]=(o*g*s-v*a*s+v*i*u-t*g*u-o*i*m+t*a*m)*D,e[11]=(f*a*s-o*h*s-f*i*u+t*h*u+o*i*p-t*a*p)*D,e[12]=w*D,e[13]=(f*g*r-v*h*r+v*i*d-t*g*d-f*i*_+t*h*_)*D,e[14]=(v*a*r-o*g*r-v*i*l+t*g*l+o*i*_-t*a*_)*D,e[15]=(o*h*r-f*a*r+f*i*l-t*h*l-o*i*d+t*a*d)*D,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,f=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,f*a+i,f*l-r*o,0,u*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,f=o+o,h=a+a,d=s*u,p=s*f,v=s*h,g=o*f,_=o*h,m=a*h,E=l*u,T=l*f,x=l*h,w=i.x,P=i.y,D=i.z;return r[0]=(1-(g+m))*w,r[1]=(p+x)*w,r[2]=(v-T)*w,r[3]=0,r[4]=(p-x)*P,r[5]=(1-(d+m))*P,r[6]=(_+E)*P,r[7]=0,r[8]=(v+T)*D,r[9]=(_-E)*D,r[10]=(1-(d+g))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Wr.set(r[0],r[1],r[2]).length();const o=Wr.set(r[4],r[5],r[6]).length(),a=Wr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vn.copy(this);const u=1/s,f=1/o,h=1/a;return Vn.elements[0]*=u,Vn.elements[1]*=u,Vn.elements[2]*=u,Vn.elements[4]*=f,Vn.elements[5]*=f,Vn.elements[6]*=f,Vn.elements[8]*=h,Vn.elements[9]*=h,Vn.elements[10]*=h,t.setFromRotationMatrix(Vn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=ri,l=!1){const u=this.elements,f=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let v,g;if(l)v=s/(o-s),g=o*s/(o-s);else if(a===ri)v=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ba)v=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return u[0]=f,u[4]=0,u[8]=d,u[12]=0,u[1]=0,u[5]=h,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=v,u[14]=g,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ri,l=!1){const u=this.elements,f=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let v,g;if(l)v=1/(o-s),g=o/(o-s);else if(a===ri)v=-2/(o-s),g=-(o+s)/(o-s);else if(a===Ba)v=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return u[0]=f,u[4]=0,u[8]=0,u[12]=d,u[1]=0,u[5]=h,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=v,u[14]=g,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Wr=new V,Vn=new bt,iS=new V(0,0,0),rS=new V(1,1,1),Ni=new V,Vo=new V,gn=new V,yh=new bt,Eh=new Ao;class Pi{constructor(e=0,t=0,i=0,r=Pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],f=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return yh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eh.setFromEuler(this),this.setFromQuaternion(Eh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pi.DEFAULT_ORDER="XYZ";class Lm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sS=0;const Th=new V,Xr=new Ao,hi=new bt,Go=new V,Os=new V,oS=new V,aS=new Ao,bh=new V(1,0,0),Ah=new V(0,1,0),wh=new V(0,0,1),Rh={type:"added"},lS={type:"removed"},qr={type:"childadded",child:null},Ol={type:"childremoved",child:null};class $t extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sS++}),this.uuid=bo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new V,t=new Pi,i=new Ao,r=new V(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new Ge}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xr.setFromAxisAngle(e,t),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,t){return Xr.setFromAxisAngle(e,t),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(bh,e)}rotateY(e){return this.rotateOnAxis(Ah,e)}rotateZ(e){return this.rotateOnAxis(wh,e)}translateOnAxis(e,t){return Th.copy(e).applyQuaternion(this.quaternion),this.position.add(Th.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bh,e)}translateY(e){return this.translateOnAxis(Ah,e)}translateZ(e){return this.translateOnAxis(wh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Go.copy(e):Go.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Os,Go,this.up):hi.lookAt(Go,Os,this.up),this.quaternion.setFromRotationMatrix(hi),r&&(hi.extractRotation(r.matrixWorld),Xr.setFromRotationMatrix(hi),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rh),qr.child=e,this.dispatchEvent(qr),qr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lS),Ol.child=e,this.dispatchEvent(Ol),Ol.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rh),qr.child=e,this.dispatchEvent(qr),qr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,oS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,aS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const h=l[u];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),f=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}$t.DEFAULT_UP=new V(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new V,di=new V,Bl=new V,pi=new V,Yr=new V,$r=new V,Ch=new V,zl=new V,Hl=new V,kl=new V,Vl=new Tt,Gl=new Tt,Wl=new Tt;class Wn{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Gn.subVectors(e,t),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Gn.subVectors(r,t),di.subVectors(i,t),Bl.subVectors(e,t);const o=Gn.dot(Gn),a=Gn.dot(di),l=Gn.dot(Bl),u=di.dot(di),f=di.dot(Bl),h=o*u-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(u*l-a*f)*d,v=(o*f-a*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pi.x),l.addScaledVector(o,pi.y),l.addScaledVector(a,pi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Vl.setScalar(0),Gl.setScalar(0),Wl.setScalar(0),Vl.fromBufferAttribute(e,t),Gl.fromBufferAttribute(e,i),Wl.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Vl,s.x),o.addScaledVector(Gl,s.y),o.addScaledVector(Wl,s.z),o}static isFrontFacing(e,t,i,r){return Gn.subVectors(i,t),di.subVectors(e,t),Gn.cross(di).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Gn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Wn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Yr.subVectors(r,i),$r.subVectors(s,i),zl.subVectors(e,i);const l=Yr.dot(zl),u=$r.dot(zl);if(l<=0&&u<=0)return t.copy(i);Hl.subVectors(e,r);const f=Yr.dot(Hl),h=$r.dot(Hl);if(f>=0&&h<=f)return t.copy(r);const d=l*h-f*u;if(d<=0&&l>=0&&f<=0)return o=l/(l-f),t.copy(i).addScaledVector(Yr,o);kl.subVectors(e,s);const p=Yr.dot(kl),v=$r.dot(kl);if(v>=0&&p<=v)return t.copy(s);const g=p*u-l*v;if(g<=0&&u>=0&&v<=0)return a=u/(u-v),t.copy(i).addScaledVector($r,a);const _=f*v-p*h;if(_<=0&&h-f>=0&&p-v>=0)return Ch.subVectors(s,r),a=(h-f)/(h-f+(p-v)),t.copy(r).addScaledVector(Ch,a);const m=1/(_+g+d);return o=g*m,a=d*m,t.copy(i).addScaledVector(Yr,o).addScaledVector($r,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Im={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},Wo={h:0,s:0,l:0};function Xl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=In){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=Yx(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Xl(o,s,e+1/3),this.g=Xl(o,s,e),this.b=Xl(o,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=In){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=In){const i=Im[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=In){return et.workingToColorSpace(kt.copy(this),e),Math.round(je(kt.r*255,0,255))*65536+Math.round(je(kt.g*255,0,255))*256+Math.round(je(kt.b*255,0,255))}getHexString(e=In){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(kt.copy(this),t);const i=kt.r,r=kt.g,s=kt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const f=(a+o)/2;if(a===o)l=0,u=0;else{const h=o-a;switch(u=f<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=u,e.l=f,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=In){et.workingToColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,r=kt.b;return e!==In?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Fi),this.setHSL(Fi.h+e,Fi.s+t,Fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Fi),e.getHSL(Wo);const i=wl(Fi.h,Wo.h,t),r=wl(Fi.s,Wo.s,t),s=wl(Fi.l,Wo.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new tt;tt.NAMES=Im;let cS=0;class ws extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cS++}),this.uuid=bo(),this.name="",this.type="Material",this.blending=hs,this.side=er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Pc,this.blendEquation=Sr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(i.blending=this.blending),this.side!==er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cc&&(i.blendSrc=this.blendSrc),this.blendDst!==Pc&&(i.blendDst=this.blendDst),this.blendEquation!==Sr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Um extends ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.combine=xm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new V,Xo=new nt;let uS=0;class $n{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uS++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=_h,this.updateRanges=[],this.gpuType=yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xo.fromBufferAttribute(this,t),Xo.applyMatrix3(e),this.setXY(t,Xo.x,Xo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Us(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Us(t,this.array)),t}setX(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Us(t,this.array)),t}setY(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Us(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Us(t,this.array)),t}setW(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_h&&(e.usage=this.usage),e}}class Nm extends $n{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Fm extends $n{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class An extends $n{constructor(e,t,i){super(new Float32Array(e),t,i)}}let fS=0;const Dn=new bt,ql=new $t,Kr=new V,vn=new wo,Bs=new wo,Ut=new V;class Hn extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fS++}),this.uuid=bo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pm(e)?Fm:Nm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,i){return Dn.makeTranslation(e,t,i),this.applyMatrix4(Dn),this}scale(e,t,i){return Dn.makeScale(e,t,i),this.applyMatrix4(Dn),this}lookAt(e){return ql.lookAt(e),ql.updateMatrix(),this.applyMatrix4(ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new An(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];vn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ro);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(vn.min,Bs.min),vn.expandByPoint(Ut),Ut.addVectors(vn.max,Bs.max),vn.expandByPoint(Ut)):(vn.expandByPoint(Bs.min),vn.expandByPoint(Bs.max))}vn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ut.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ut));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,f=a.count;u<f;u++)Ut.fromBufferAttribute(a,u),l&&(Kr.fromBufferAttribute(e,u),Ut.add(Kr)),r=Math.max(r,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $n(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new V,l[C]=new V;const u=new V,f=new V,h=new V,d=new nt,p=new nt,v=new nt,g=new V,_=new V;function m(C,M,b){u.fromBufferAttribute(i,C),f.fromBufferAttribute(i,M),h.fromBufferAttribute(i,b),d.fromBufferAttribute(s,C),p.fromBufferAttribute(s,M),v.fromBufferAttribute(s,b),f.sub(u),h.sub(u),p.sub(d),v.sub(d);const L=1/(p.x*v.y-v.x*p.y);isFinite(L)&&(g.copy(f).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(L),_.copy(h).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(L),a[C].add(g),a[M].add(g),a[b].add(g),l[C].add(_),l[M].add(_),l[b].add(_))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let C=0,M=E.length;C<M;++C){const b=E[C],L=b.start,F=b.count;for(let O=L,Q=L+F;O<Q;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const T=new V,x=new V,w=new V,P=new V;function D(C){w.fromBufferAttribute(r,C),P.copy(w);const M=a[C];T.copy(M),T.sub(w.multiplyScalar(w.dot(M))).normalize(),x.crossVectors(P,M);const L=x.dot(l[C])<0?-1:1;o.setXYZW(C,T.x,T.y,T.z,L)}for(let C=0,M=E.length;C<M;++C){const b=E[C],L=b.start,F=b.count;for(let O=L,Q=L+F;O<Q;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new V,s=new V,o=new V,a=new V,l=new V,u=new V,f=new V,h=new V;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),g=e.getX(d+1),_=e.getX(d+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,_),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),u.fromBufferAttribute(i,_),a.add(f),l.add(f),u.add(f),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(_,u.x,u.y,u.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const u=a.array,f=a.itemSize,h=a.normalized,d=new u.constructor(l.length*f);let p=0,v=0;for(let g=0,_=l.length;g<_;g++){a.isInterleavedBufferAttribute?p=l[g]*a.data.stride+a.offset:p=l[g]*f;for(let m=0;m<f;m++)d[v++]=u[p++]}return new $n(d,f,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Hn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let f=0,h=u.length;f<h;f++){const d=u[f],p=e(d,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let h=0,d=u.length;h<d;h++){const p=u[h];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(t))}const s=e.morphAttributes;for(const u in s){const f=[],h=s[u];for(let d=0,p=h.length;d<p;d++)f.push(h[d].clone(t));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const h=o[u];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ph=new bt,hr=new hf,qo=new Ro,Dh=new V,Yo=new V,$o=new V,Ko=new V,Yl=new V,jo=new V,Lh=new V,Zo=new V;class Ei extends $t{constructor(e=new Hn,t=new Um){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){jo.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=a[l],h=s[l];f!==0&&(Yl.fromBufferAttribute(h,e),o?jo.addScaledVector(Yl,f):jo.addScaledVector(Yl.sub(t),f))}t.add(jo)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qo.copy(i.boundingSphere),qo.applyMatrix4(s),hr.copy(e.ray).recast(e.near),!(qo.containsPoint(hr.origin)===!1&&(hr.intersectSphere(qo,Dh)===null||hr.origin.distanceToSquared(Dh)>(e.far-e.near)**2))&&(Ph.copy(s).invert(),hr.copy(e.ray).applyMatrix4(Ph),!(i.boundingBox!==null&&hr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,g=d.length;v<g;v++){const _=d[v],m=o[_.materialIndex],E=Math.max(_.start,p.start),T=Math.min(a.count,Math.min(_.start+_.count,p.start+p.count));for(let x=E,w=T;x<w;x+=3){const P=a.getX(x),D=a.getX(x+1),C=a.getX(x+2);r=Jo(this,m,e,i,u,f,h,P,D,C),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let _=v,m=g;_<m;_+=3){const E=a.getX(_),T=a.getX(_+1),x=a.getX(_+2);r=Jo(this,o,e,i,u,f,h,E,T,x),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,g=d.length;v<g;v++){const _=d[v],m=o[_.materialIndex],E=Math.max(_.start,p.start),T=Math.min(l.count,Math.min(_.start+_.count,p.start+p.count));for(let x=E,w=T;x<w;x+=3){const P=x,D=x+1,C=x+2;r=Jo(this,m,e,i,u,f,h,P,D,C),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let _=v,m=g;_<m;_+=3){const E=_,T=_+1,x=_+2;r=Jo(this,o,e,i,u,f,h,E,T,x),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function hS(n,e,t,i,r,s,o,a){let l;if(e.side===hn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===er,a),l===null)return null;Zo.copy(a),Zo.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Zo);return u<t.near||u>t.far?null:{distance:u,point:Zo.clone(),object:n}}function Jo(n,e,t,i,r,s,o,a,l,u){n.getVertexPosition(a,Yo),n.getVertexPosition(l,$o),n.getVertexPosition(u,Ko);const f=hS(n,e,t,i,Yo,$o,Ko,Lh);if(f){const h=new V;Wn.getBarycoord(Lh,Yo,$o,Ko,h),r&&(f.uv=Wn.getInterpolatedAttribute(r,a,l,u,h,new nt)),s&&(f.uv1=Wn.getInterpolatedAttribute(s,a,l,u,h,new nt)),o&&(f.normal=Wn.getInterpolatedAttribute(o,a,l,u,h,new V),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:l,c:u,normal:new V,materialIndex:0};Wn.getNormal(Yo,$o,Ko,d.normal),f.face=d,f.barycoord=h}return f}class Co extends Hn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],f=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new An(u,3)),this.setAttribute("normal",new An(f,3)),this.setAttribute("uv",new An(h,2));function v(g,_,m,E,T,x,w,P,D,C,M){const b=x/D,L=w/C,F=x/2,O=w/2,Q=P/2,$=D+1,X=C+1;let K=0,H=0;const pe=new V;for(let _e=0;_e<X;_e++){const Te=_e*L-O;for(let Ue=0;Ue<$;Ue++){const Je=Ue*b-F;pe[g]=Je*E,pe[_]=Te*T,pe[m]=Q,u.push(pe.x,pe.y,pe.z),pe[g]=0,pe[_]=0,pe[m]=P>0?1:-1,f.push(pe.x,pe.y,pe.z),h.push(Ue/D),h.push(1-_e/C),K+=1}}for(let _e=0;_e<C;_e++)for(let Te=0;Te<D;Te++){const Ue=d+Te+$*_e,Je=d+Te+$*(_e+1),Ye=d+(Te+1)+$*(_e+1),Xe=d+(Te+1)+$*_e;l.push(Ue,Je,Xe),l.push(Je,Ye,Xe),H+=6}a.addGroup(p,H,M),p+=H,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function bs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=bs(n[t]);for(const r in i)e[r]=i[r]}return e}function dS(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Om(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const pS={clone:bs,merge:Zt};var mS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_S=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tr extends ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mS,this.fragmentShader=_S,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bs(e.uniforms),this.uniformsGroups=dS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bm extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new V,Ih=new nt,Uh=new nt;class Un extends Bm{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_u*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Al*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _u*2*Math.atan(Math.tan(Al*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,Ih,Uh),t.subVectors(Uh,Ih)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Al*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const jr=-90,Zr=1;class gS extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Un(jr,Zr,e,t);r.layers=this.layers,this.add(r);const s=new Un(jr,Zr,e,t);s.layers=this.layers,this.add(s);const o=new Un(jr,Zr,e,t);o.layers=this.layers,this.add(o);const a=new Un(jr,Zr,e,t);a.layers=this.layers,this.add(a);const l=new Un(jr,Zr,e,t);l.layers=this.layers,this.add(l);const u=new Un(jr,Zr,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ba)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,f),e.setRenderTarget(h,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class zm extends dn{constructor(e=[],t=ys,i,r,s,o,a,l,u,f){super(e,t,i,r,s,o,a,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vS extends Ir{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new zm(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Co(5,5,5),s=new tr({name:"CubemapFromEquirect",uniforms:bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:Yi});s.uniforms.tEquirect.value=t;const o=new Ei(r,s),a=t.minFilter;return t.minFilter===Tr&&(t.minFilter=ii),new gS(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Qo extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xS={type:"move"};class $l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const g of e.hand.values()){const _=t.getJointPose(g,i),m=this._getHandJoint(u,g);_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius),m.visible=_!==null}const f=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],d=f.position.distanceTo(h.position),p=.02,v=.005;u.inputState.pinching&&d>p+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=p-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xS)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Qo;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class SS extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi,this.environmentIntensity=1,this.environmentRotation=new Pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kl=new V,MS=new V,yS=new Ge;class vr{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Kl.subVectors(i,t).cross(MS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Kl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yS.getNormalMatrix(e),r=this.coplanarPoint(Kl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const dr=new Ro,ES=new nt(.5,.5),ea=new V;class Hm{constructor(e=new vr,t=new vr,i=new vr,r=new vr,s=new vr,o=new vr){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ri,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],u=s[3],f=s[4],h=s[5],d=s[6],p=s[7],v=s[8],g=s[9],_=s[10],m=s[11],E=s[12],T=s[13],x=s[14],w=s[15];if(r[0].setComponents(u-o,p-f,m-v,w-E).normalize(),r[1].setComponents(u+o,p+f,m+v,w+E).normalize(),r[2].setComponents(u+a,p+h,m+g,w+T).normalize(),r[3].setComponents(u-a,p-h,m-g,w-T).normalize(),i)r[4].setComponents(l,d,_,x).normalize(),r[5].setComponents(u-l,p-d,m-_,w-x).normalize();else if(r[4].setComponents(u-l,p-d,m-_,w-x).normalize(),t===ri)r[5].setComponents(u+l,p+d,m+_,w+x).normalize();else if(t===Ba)r[5].setComponents(l,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(dr)}intersectsSprite(e){dr.center.set(0,0,0);const t=ES.distanceTo(e.center);return dr.radius=.7071067811865476+t,dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(dr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ea.x=r.normal.x>0?e.max.x:e.min.x,ea.y=r.normal.y>0?e.max.y:e.min.y,ea.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gu extends ws{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ha=new V,ka=new V,Nh=new bt,zs=new hf,ta=new Ro,jl=new V,Fh=new V;class TS extends $t{constructor(e=new Hn,t=new gu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ha.fromBufferAttribute(t,r-1),ka.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ha.distanceTo(ka);e.setAttribute("lineDistance",new An(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(r),ta.radius+=s,e.ray.intersectsSphere(ta)===!1)return;Nh.copy(r).invert(),zs.copy(e.ray).applyMatrix4(Nh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=this.isLineSegments?2:1,f=i.index,d=i.attributes.position;if(f!==null){const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let g=p,_=v-1;g<_;g+=u){const m=f.getX(g),E=f.getX(g+1),T=na(this,e,zs,l,m,E,g);T&&t.push(T)}if(this.isLineLoop){const g=f.getX(v-1),_=f.getX(p),m=na(this,e,zs,l,g,_,v-1);m&&t.push(m)}}else{const p=Math.max(0,o.start),v=Math.min(d.count,o.start+o.count);for(let g=p,_=v-1;g<_;g+=u){const m=na(this,e,zs,l,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){const g=na(this,e,zs,l,v-1,p,v-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function na(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(Ha.fromBufferAttribute(a,r),ka.fromBufferAttribute(a,s),t.distanceSqToSegment(Ha,ka,jl,Fh)>i)return;jl.applyMatrix4(n.matrixWorld);const u=e.ray.origin.distanceTo(jl);if(!(u<e.near||u>e.far))return{distance:u,point:Fh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Oh=new V,Bh=new V;class zh extends TS{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Oh.fromBufferAttribute(t,r),Bh.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Oh.distanceTo(Bh);e.setAttribute("lineDistance",new An(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class km extends ws{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hh=new bt,vu=new hf,ia=new Ro,ra=new V;class bS extends $t{constructor(e=new Hn,t=new km){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(r),ia.radius+=s,e.ray.intersectsSphere(ia)===!1)return;Hh.copy(r).invert(),vu.copy(e.ray).applyMatrix4(Hh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p;v<g;v++){const _=u.getX(v);ra.fromBufferAttribute(h,_),kh(ra,_,l,r,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=d,g=p;v<g;v++)ra.fromBufferAttribute(h,v),kh(ra,v,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function kh(n,e,t,i,r,s,o){const a=vu.distanceSqToPoint(n);if(a<t){const l=new V;vu.closestPointToPoint(n,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Vm extends dn{constructor(e,t,i=Lr,r,s,o,a=Yn,l=Yn,u,f=_o,h=1){if(f!==_o&&f!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,o,a,l,f,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ff(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gm extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class df extends Hn{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),u(i),f(),this.setAttribute("position",new An(s,3)),this.setAttribute("normal",new An(s.slice(),3)),this.setAttribute("uv",new An(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const T=new V,x=new V,w=new V;for(let P=0;P<t.length;P+=3)p(t[P+0],T),p(t[P+1],x),p(t[P+2],w),l(T,x,w,E)}function l(E,T,x,w){const P=w+1,D=[];for(let C=0;C<=P;C++){D[C]=[];const M=E.clone().lerp(x,C/P),b=T.clone().lerp(x,C/P),L=P-C;for(let F=0;F<=L;F++)F===0&&C===P?D[C][F]=M:D[C][F]=M.clone().lerp(b,F/L)}for(let C=0;C<P;C++)for(let M=0;M<2*(P-C)-1;M++){const b=Math.floor(M/2);M%2===0?(d(D[C][b+1]),d(D[C+1][b]),d(D[C][b])):(d(D[C][b+1]),d(D[C+1][b+1]),d(D[C+1][b]))}}function u(E){const T=new V;for(let x=0;x<s.length;x+=3)T.x=s[x+0],T.y=s[x+1],T.z=s[x+2],T.normalize().multiplyScalar(E),s[x+0]=T.x,s[x+1]=T.y,s[x+2]=T.z}function f(){const E=new V;for(let T=0;T<s.length;T+=3){E.x=s[T+0],E.y=s[T+1],E.z=s[T+2];const x=_(E)/2/Math.PI+.5,w=m(E)/Math.PI+.5;o.push(x,1-w)}v(),h()}function h(){for(let E=0;E<o.length;E+=6){const T=o[E+0],x=o[E+2],w=o[E+4],P=Math.max(T,x,w),D=Math.min(T,x,w);P>.9&&D<.1&&(T<.2&&(o[E+0]+=1),x<.2&&(o[E+2]+=1),w<.2&&(o[E+4]+=1))}}function d(E){s.push(E.x,E.y,E.z)}function p(E,T){const x=E*3;T.x=e[x+0],T.y=e[x+1],T.z=e[x+2]}function v(){const E=new V,T=new V,x=new V,w=new V,P=new nt,D=new nt,C=new nt;for(let M=0,b=0;M<s.length;M+=9,b+=6){E.set(s[M+0],s[M+1],s[M+2]),T.set(s[M+3],s[M+4],s[M+5]),x.set(s[M+6],s[M+7],s[M+8]),P.set(o[b+0],o[b+1]),D.set(o[b+2],o[b+3]),C.set(o[b+4],o[b+5]),w.copy(E).add(T).add(x).divideScalar(3);const L=_(w);g(P,b+0,E,L),g(D,b+2,T,L),g(C,b+4,x,L)}}function g(E,T,x,w){w<0&&E.x===1&&(o[T]=E.x-1),x.x===0&&x.z===0&&(o[T]=w/2/Math.PI+.5)}function _(E){return Math.atan2(E.z,-E.x)}function m(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new df(e.vertices,e.indices,e.radius,e.details)}}class Va extends df{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Va(e.radius,e.detail)}}class il extends Hn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),u=a+1,f=l+1,h=e/a,d=t/l,p=[],v=[],g=[],_=[];for(let m=0;m<f;m++){const E=m*d-o;for(let T=0;T<u;T++){const x=T*h-s;v.push(x,-E,0),g.push(0,0,1),_.push(T/a),_.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<a;E++){const T=E+u*m,x=E+u*(m+1),w=E+1+u*(m+1),P=E+1+u*m;p.push(T,x,P),p.push(x,w,P)}this.setIndex(p),this.setAttribute("position",new An(v,3)),this.setAttribute("normal",new An(g,3)),this.setAttribute("uv",new An(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new il(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vh extends Hn{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,r=new V,s=new V;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let u=0,f=l.length;u<f;++u){const h=l[u],d=h.start,p=h.count;for(let v=d,g=d+p;v<g;v+=3)for(let _=0;_<3;_++){const m=a.getX(v+_),E=a.getX(v+(_+1)%3);r.fromBufferAttribute(o,m),s.fromBufferAttribute(o,E),Gh(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let u=0;u<3;u++){const f=3*a+u,h=3*a+(u+1)%3;r.fromBufferAttribute(o,f),s.fromBufferAttribute(o,h),Gh(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new An(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Gh(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(r)===!0?!1:(t.add(i),t.add(r),!0)}class AS extends ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wS extends ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class RS extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class CS extends Bm{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class PS extends RS{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class DS extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Wh(n,e,t,i){const r=LS(i);switch(t){case bm:return n*e;case wm:return n*e/r.components*r.byteLength;case lf:return n*e/r.components*r.byteLength;case Rm:return n*e*2/r.components*r.byteLength;case cf:return n*e*2/r.components*r.byteLength;case Am:return n*e*3/r.components*r.byteLength;case Xn:return n*e*4/r.components*r.byteLength;case uf:return n*e*4/r.components*r.byteLength;case _a:case ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case va:case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gc:case Xc:return Math.max(n,16)*Math.max(e,8)/4;case Vc:case Wc:return Math.max(n,8)*Math.max(e,8)/2;case qc:case Yc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $c:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case jc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case eu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case tu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case nu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case iu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ru:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case su:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ou:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case au:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case cu:case uu:case fu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hu:case du:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pu:case mu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function LS(n){switch(n){case Ci:case Mm:return{byteLength:1,components:1};case po:case ym:case To:return{byteLength:2,components:1};case of:case af:return{byteLength:2,components:4};case Lr:case sf:case yi:return{byteLength:4,components:1};case Em:case Tm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wm(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function IS(n){const e=new WeakMap;function t(a,l){const u=a.array,f=a.usage,h=u.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,u,f),a.onUploadCallback();let p;if(u instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=n.HALF_FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=n.SHORT;else if(u instanceof Uint32Array)p=n.UNSIGNED_INT;else if(u instanceof Int32Array)p=n.INT;else if(u instanceof Int8Array)p=n.BYTE;else if(u instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,u){const f=l.array,h=l.updateRanges;if(n.bindBuffer(u,a),h.length===0)n.bufferSubData(u,0,f);else{h.sort((p,v)=>p.start-v.start);let d=0;for(let p=1;p<h.length;p++){const v=h[d],g=h[p];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++d,h[d]=g)}h.length=d+1;for(let p=0,v=h.length;p<v;p++){const g=h[p];n.bufferSubData(u,g.start*f.BYTES_PER_ELEMENT,f,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,t(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:r,remove:s,update:o}}var US=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,FS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,OS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,BS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,HS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,GS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,WS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,XS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,YS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$S=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,KS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,JS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,iM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,oM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uM="gl_FragColor = linearToOutputTexel( gl_FragColor );",fM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_M=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,SM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,MM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,EM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,AM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,DM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,IM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,UM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,GM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$M=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,JM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,QM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ey=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ty=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ny=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ry=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ay=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ly=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,cy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,my=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_y=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,My=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ey=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ty=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,by=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ay=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ry=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ly=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Iy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Uy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,By=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ky=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$y=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ky=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:US,alphahash_pars_fragment:NS,alphamap_fragment:FS,alphamap_pars_fragment:OS,alphatest_fragment:BS,alphatest_pars_fragment:zS,aomap_fragment:HS,aomap_pars_fragment:kS,batching_pars_vertex:VS,batching_vertex:GS,begin_vertex:WS,beginnormal_vertex:XS,bsdfs:qS,iridescence_fragment:YS,bumpmap_pars_fragment:$S,clipping_planes_fragment:KS,clipping_planes_pars_fragment:jS,clipping_planes_pars_vertex:ZS,clipping_planes_vertex:JS,color_fragment:QS,color_pars_fragment:eM,color_pars_vertex:tM,color_vertex:nM,common:iM,cube_uv_reflection_fragment:rM,defaultnormal_vertex:sM,displacementmap_pars_vertex:oM,displacementmap_vertex:aM,emissivemap_fragment:lM,emissivemap_pars_fragment:cM,colorspace_fragment:uM,colorspace_pars_fragment:fM,envmap_fragment:hM,envmap_common_pars_fragment:dM,envmap_pars_fragment:pM,envmap_pars_vertex:mM,envmap_physical_pars_fragment:AM,envmap_vertex:_M,fog_vertex:gM,fog_pars_vertex:vM,fog_fragment:xM,fog_pars_fragment:SM,gradientmap_pars_fragment:MM,lightmap_pars_fragment:yM,lights_lambert_fragment:EM,lights_lambert_pars_fragment:TM,lights_pars_begin:bM,lights_toon_fragment:wM,lights_toon_pars_fragment:RM,lights_phong_fragment:CM,lights_phong_pars_fragment:PM,lights_physical_fragment:DM,lights_physical_pars_fragment:LM,lights_fragment_begin:IM,lights_fragment_maps:UM,lights_fragment_end:NM,logdepthbuf_fragment:FM,logdepthbuf_pars_fragment:OM,logdepthbuf_pars_vertex:BM,logdepthbuf_vertex:zM,map_fragment:HM,map_pars_fragment:kM,map_particle_fragment:VM,map_particle_pars_fragment:GM,metalnessmap_fragment:WM,metalnessmap_pars_fragment:XM,morphinstance_vertex:qM,morphcolor_vertex:YM,morphnormal_vertex:$M,morphtarget_pars_vertex:KM,morphtarget_vertex:jM,normal_fragment_begin:ZM,normal_fragment_maps:JM,normal_pars_fragment:QM,normal_pars_vertex:ey,normal_vertex:ty,normalmap_pars_fragment:ny,clearcoat_normal_fragment_begin:iy,clearcoat_normal_fragment_maps:ry,clearcoat_pars_fragment:sy,iridescence_pars_fragment:oy,opaque_fragment:ay,packing:ly,premultiplied_alpha_fragment:cy,project_vertex:uy,dithering_fragment:fy,dithering_pars_fragment:hy,roughnessmap_fragment:dy,roughnessmap_pars_fragment:py,shadowmap_pars_fragment:my,shadowmap_pars_vertex:_y,shadowmap_vertex:gy,shadowmask_pars_fragment:vy,skinbase_vertex:xy,skinning_pars_vertex:Sy,skinning_vertex:My,skinnormal_vertex:yy,specularmap_fragment:Ey,specularmap_pars_fragment:Ty,tonemapping_fragment:by,tonemapping_pars_fragment:Ay,transmission_fragment:wy,transmission_pars_fragment:Ry,uv_pars_fragment:Cy,uv_pars_vertex:Py,uv_vertex:Dy,worldpos_vertex:Ly,background_vert:Iy,background_frag:Uy,backgroundCube_vert:Ny,backgroundCube_frag:Fy,cube_vert:Oy,cube_frag:By,depth_vert:zy,depth_frag:Hy,distanceRGBA_vert:ky,distanceRGBA_frag:Vy,equirect_vert:Gy,equirect_frag:Wy,linedashed_vert:Xy,linedashed_frag:qy,meshbasic_vert:Yy,meshbasic_frag:$y,meshlambert_vert:Ky,meshlambert_frag:jy,meshmatcap_vert:Zy,meshmatcap_frag:Jy,meshnormal_vert:Qy,meshnormal_frag:eE,meshphong_vert:tE,meshphong_frag:nE,meshphysical_vert:iE,meshphysical_frag:rE,meshtoon_vert:sE,meshtoon_frag:oE,points_vert:aE,points_frag:lE,shadow_vert:cE,shadow_frag:uE,sprite_vert:fE,sprite_frag:hE},ve={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},ei={basic:{uniforms:Zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Zt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Zt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new tt(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Zt([ve.points,ve.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Zt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Zt([ve.common,ve.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Zt([ve.sprite,ve.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Zt([ve.common,ve.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Zt([ve.lights,ve.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};ei.physical={uniforms:Zt([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const sa={r:0,b:0,g:0},pr=new Pi,dE=new bt;function pE(n,e,t,i,r,s,o){const a=new tt(0);let l=s===!0?0:1,u,f,h=null,d=0,p=null;function v(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function g(T){let x=!1;const w=v(T);w===null?m(a,l):w&&w.isColor&&(m(w,1),x=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(T,x){const w=v(x);w&&(w.isCubeTexture||w.mapping===nl)?(f===void 0&&(f=new Ei(new Co(1,1,1),new tr({name:"BackgroundCubeMaterial",uniforms:bs(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(P,D,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),pr.copy(x.backgroundRotation),pr.x*=-1,pr.y*=-1,pr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(pr.y*=-1,pr.z*=-1),f.material.uniforms.envMap.value=w,f.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(dE.makeRotationFromEuler(pr)),f.material.toneMapped=et.getTransfer(w.colorSpace)!==at,(h!==w||d!==w.version||p!==n.toneMapping)&&(f.material.needsUpdate=!0,h=w,d=w.version,p=n.toneMapping),f.layers.enableAll(),T.unshift(f,f.geometry,f.material,0,0,null)):w&&w.isTexture&&(u===void 0&&(u=new Ei(new il(2,2),new tr({name:"BackgroundMaterial",uniforms:bs(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=w,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=et.getTransfer(w.colorSpace)!==at,w.matrixAutoUpdate===!0&&w.updateMatrix(),u.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||d!==w.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=w,d=w.version,p=n.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null))}function m(T,x){T.getRGB(sa,Om(n)),i.buffers.color.setClear(sa.r,sa.g,sa.b,x,o)}function E(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,m(a,l)},render:g,addToRenderList:_,dispose:E}}function mE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(b,L,F,O,Q){let $=!1;const X=h(O,F,L);s!==X&&(s=X,u(s.object)),$=p(b,O,F,Q),$&&v(b,O,F,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,x(b,L,F,O),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function l(){return n.createVertexArray()}function u(b){return n.bindVertexArray(b)}function f(b){return n.deleteVertexArray(b)}function h(b,L,F){const O=F.wireframe===!0;let Q=i[b.id];Q===void 0&&(Q={},i[b.id]=Q);let $=Q[L.id];$===void 0&&($={},Q[L.id]=$);let X=$[O];return X===void 0&&(X=d(l()),$[O]=X),X}function d(b){const L=[],F=[],O=[];for(let Q=0;Q<t;Q++)L[Q]=0,F[Q]=0,O[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:O,object:b,attributes:{},index:null}}function p(b,L,F,O){const Q=s.attributes,$=L.attributes;let X=0;const K=F.getAttributes();for(const H in K)if(K[H].location>=0){const _e=Q[H];let Te=$[H];if(Te===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(Te=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(Te=b.instanceColor)),_e===void 0||_e.attribute!==Te||Te&&_e.data!==Te.data)return!0;X++}return s.attributesNum!==X||s.index!==O}function v(b,L,F,O){const Q={},$=L.attributes;let X=0;const K=F.getAttributes();for(const H in K)if(K[H].location>=0){let _e=$[H];_e===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(_e=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(_e=b.instanceColor));const Te={};Te.attribute=_e,_e&&_e.data&&(Te.data=_e.data),Q[H]=Te,X++}s.attributes=Q,s.attributesNum=X,s.index=O}function g(){const b=s.newAttributes;for(let L=0,F=b.length;L<F;L++)b[L]=0}function _(b){m(b,0)}function m(b,L){const F=s.newAttributes,O=s.enabledAttributes,Q=s.attributeDivisors;F[b]=1,O[b]===0&&(n.enableVertexAttribArray(b),O[b]=1),Q[b]!==L&&(n.vertexAttribDivisor(b,L),Q[b]=L)}function E(){const b=s.newAttributes,L=s.enabledAttributes;for(let F=0,O=L.length;F<O;F++)L[F]!==b[F]&&(n.disableVertexAttribArray(F),L[F]=0)}function T(b,L,F,O,Q,$,X){X===!0?n.vertexAttribIPointer(b,L,F,Q,$):n.vertexAttribPointer(b,L,F,O,Q,$)}function x(b,L,F,O){g();const Q=O.attributes,$=F.getAttributes(),X=L.defaultAttributeValues;for(const K in $){const H=$[K];if(H.location>=0){let pe=Q[K];if(pe===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(pe=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(pe=b.instanceColor)),pe!==void 0){const _e=pe.normalized,Te=pe.itemSize,Ue=e.get(pe);if(Ue===void 0)continue;const Je=Ue.buffer,Ye=Ue.type,Xe=Ue.bytesPerElement,ie=Ye===n.INT||Ye===n.UNSIGNED_INT||pe.gpuType===sf;if(pe.isInterleavedBufferAttribute){const oe=pe.data,we=oe.stride,Be=pe.offset;if(oe.isInstancedInterleavedBuffer){for(let De=0;De<H.locationSize;De++)m(H.location+De,oe.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let De=0;De<H.locationSize;De++)_(H.location+De);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let De=0;De<H.locationSize;De++)T(H.location+De,Te/H.locationSize,Ye,_e,we*Xe,(Be+Te/H.locationSize*De)*Xe,ie)}else{if(pe.isInstancedBufferAttribute){for(let oe=0;oe<H.locationSize;oe++)m(H.location+oe,pe.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let oe=0;oe<H.locationSize;oe++)_(H.location+oe);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let oe=0;oe<H.locationSize;oe++)T(H.location+oe,Te/H.locationSize,Ye,_e,Te*Xe,Te/H.locationSize*oe*Xe,ie)}}else if(X!==void 0){const _e=X[K];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(H.location,_e);break;case 3:n.vertexAttrib3fv(H.location,_e);break;case 4:n.vertexAttrib4fv(H.location,_e);break;default:n.vertexAttrib1fv(H.location,_e)}}}}E()}function w(){C();for(const b in i){const L=i[b];for(const F in L){const O=L[F];for(const Q in O)f(O[Q].object),delete O[Q];delete L[F]}delete i[b]}}function P(b){if(i[b.id]===void 0)return;const L=i[b.id];for(const F in L){const O=L[F];for(const Q in O)f(O[Q].object),delete O[Q];delete L[F]}delete i[b.id]}function D(b){for(const L in i){const F=i[L];if(F[b.id]===void 0)continue;const O=F[b.id];for(const Q in O)f(O[Q].object),delete O[Q];delete F[b.id]}}function C(){M(),o=!0,s!==r&&(s=r,u(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:P,releaseStatesOfProgram:D,initAttributes:g,enableAttribute:_,disableUnusedAttributes:E}}function _E(n,e,t){let i;function r(u){i=u}function s(u,f){n.drawArrays(i,u,f),t.update(f,i,1)}function o(u,f,h){h!==0&&(n.drawArraysInstanced(i,u,f,h),t.update(f,i,h))}function a(u,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,f,0,h);let p=0;for(let v=0;v<h;v++)p+=f[v];t.update(p,i,1)}function l(u,f,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<u.length;v++)o(u[v],f[v],d[v]);else{p.multiDrawArraysInstancedWEBGL(i,u,0,f,0,d,0,h);let v=0;for(let g=0;g<h;g++)v+=f[g]*d[g];t.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gE(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==Xn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const C=D===To&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Ci&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==yi&&!C)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const f=l(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=v>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:w,maxSamples:P}}function vE(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new vr,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=f(h,d,0)},this.setState=function(h,d,p){const v=h.clippingPlanes,g=h.clipIntersection,_=h.clipShadows,m=n.get(h);if(!r||v===null||v.length===0||s&&!_)s?f(null):u();else{const E=s?0:i,T=E*4;let x=m.clippingState||null;l.value=x,x=f(v,d,T,p);for(let w=0;w!==T;++w)x[w]=t[w];m.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,p,v){const g=h!==null?h.length:0;let _=null;if(g!==0){if(_=l.value,v!==!0||_===null){const m=p+g*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(_===null||_.length<m)&&(_=new Float32Array(m));for(let T=0,x=p;T!==g;++T,x+=4)o.copy(h[T]).applyMatrix4(E,a),o.normal.toArray(_,x),_[x+3]=o.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,_}}function xE(n){let e=new WeakMap;function t(o,a){return a===Bc?o.mapping=ys:a===zc&&(o.mapping=Es),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bc||a===zc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new vS(l.height);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ns=4,Xh=[.125,.215,.35,.446,.526,.582],Mr=20,Zl=new CS,qh=new tt;let Jl=null,Ql=0,ec=0,tc=!1;const xr=(1+Math.sqrt(5))/2,Jr=1/xr,Yh=[new V(-xr,Jr,0),new V(xr,Jr,0),new V(-Jr,0,xr),new V(Jr,0,xr),new V(0,xr,-Jr),new V(0,xr,Jr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],SE=new V;class $h{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=SE}=s;Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jl,Ql,ec),this._renderer.xr.enabled=tc,e.scissorTest=!1,oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ys||e.mapping===Es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:To,format:Xn,colorSpace:Ts,depthBuffer:!1},r=Kh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kh(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ME(s)),this._blurMaterial=yE(s,e,t)}return r}_compileMaterial(e){const t=new Ei(this._lodPlanes[0],e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,i,r,s){const l=new Un(90,1,t,i),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(qh),h.toneMapping=$i,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const g=new Um({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),_=new Ei(new Co,g);let m=!1;const E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,m=!0):(g.color.copy(qh),m=!0);for(let T=0;T<6;T++){const x=T%3;x===0?(l.up.set(0,u[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[T],s.y,s.z)):x===1?(l.up.set(0,0,u[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[T],s.z)):(l.up.set(0,u[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[T]));const w=this._cubeSize;oa(r,x*w,T>2?w:0,w,w),h.setRenderTarget(r),m&&h.render(_,l),h.render(e,l)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ys||e.mapping===Es;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ei(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;oa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Zl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Yh[(r-s-1)%Yh.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,h=new Ei(this._lodPlanes[r],u),d=u.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Mr-1),g=s/v,_=isFinite(s)?1+Math.floor(f*g):Mr;_>Mr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Mr}`);const m=[];let E=0;for(let D=0;D<Mr;++D){const C=D/g,M=Math.exp(-C*C/2);m.push(M),D===0?E+=M:D<_&&(E+=2*M)}for(let D=0;D<m.length;D++)m[D]=m[D]/E;d.envMap.value=e.texture,d.samples.value=_,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=v,d.mipInt.value=T-i;const x=this._sizeLods[r],w=3*x*(r>T-ns?r-T+ns:0),P=4*(this._cubeSize-x);oa(t,w,P,3*x,2*x),l.setRenderTarget(t),l.render(h,Zl)}}function ME(n){const e=[],t=[],i=[];let r=n;const s=n-ns+1+Xh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ns?l=Xh[o-n+ns-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),f=-u,h=1+u,d=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,v=6,g=3,_=2,m=1,E=new Float32Array(g*v*p),T=new Float32Array(_*v*p),x=new Float32Array(m*v*p);for(let P=0;P<p;P++){const D=P%3*2/3-1,C=P>2?0:-1,M=[D,C,0,D+2/3,C,0,D+2/3,C+1,0,D,C,0,D+2/3,C+1,0,D,C+1,0];E.set(M,g*v*P),T.set(d,_*v*P);const b=[P,P,P,P,P,P];x.set(b,m*v*P)}const w=new Hn;w.setAttribute("position",new $n(E,g)),w.setAttribute("uv",new $n(T,_)),w.setAttribute("faceIndex",new $n(x,m)),e.push(w),r>ns&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Kh(n,e,t){const i=new Ir(n,e,t);return i.texture.mapping=nl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function oa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function yE(n,e,t){const i=new Float32Array(Mr),r=new V(0,1,0);return new tr({name:"SphericalGaussianBlur",defines:{n:Mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function jh(){return new tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Zh(){return new tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function pf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function EE(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Bc||l===zc,f=l===ys||l===Es;if(u||f){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new $h(n)),h=u?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return u&&p&&p.height>0||f&&p&&r(p)?(t===null&&(t=new $h(n)),h=u?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const u=6;for(let f=0;f<u;f++)a[f]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function TE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&vo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function bE(n,e,t,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function u(h){const d=[],p=h.index,v=h.attributes.position;let g=0;if(p!==null){const E=p.array;g=p.version;for(let T=0,x=E.length;T<x;T+=3){const w=E[T+0],P=E[T+1],D=E[T+2];d.push(w,P,P,D,D,w)}}else if(v!==void 0){const E=v.array;g=v.version;for(let T=0,x=E.length/3-1;T<x;T+=3){const w=T+0,P=T+1,D=T+2;d.push(w,P,P,D,D,w)}}else return;const _=new(Pm(d)?Fm:Nm)(d,1);_.version=g;const m=s.get(h);m&&e.remove(m),s.set(h,_)}function f(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&u(h)}else u(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:f}}function AE(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,s,d*o),t.update(p,i,1)}function u(d,p,v){v!==0&&(n.drawElementsInstanced(i,p,s,d*o,v),t.update(p,i,v))}function f(d,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,v);let _=0;for(let m=0;m<v;m++)_+=p[m];t.update(_,i,1)}function h(d,p,v,g){if(v===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<d.length;m++)u(d[m]/o,p[m],g[m]);else{_.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,g,0,v);let m=0;for(let E=0;E<v;E++)m+=p[E]*g[E];t.update(m,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function wE(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function RE(n,e,t){const i=new WeakMap,r=new Tt;function s(o,a,l){const u=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let b=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var p=b;d!==void 0&&d.texture.dispose();const v=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let x=0;v===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let w=a.attributes.position.count*x,P=1;w>e.maxTextureSize&&(P=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const D=new Float32Array(w*P*4*h),C=new Dm(D,w,P,h);C.type=yi,C.needsUpdate=!0;const M=x*4;for(let L=0;L<h;L++){const F=m[L],O=E[L],Q=T[L],$=w*P*4*L;for(let X=0;X<F.count;X++){const K=X*M;v===!0&&(r.fromBufferAttribute(F,X),D[$+K+0]=r.x,D[$+K+1]=r.y,D[$+K+2]=r.z,D[$+K+3]=0),g===!0&&(r.fromBufferAttribute(O,X),D[$+K+4]=r.x,D[$+K+5]=r.y,D[$+K+6]=r.z,D[$+K+7]=0),_===!0&&(r.fromBufferAttribute(Q,X),D[$+K+8]=r.x,D[$+K+9]=r.y,D[$+K+10]=r.z,D[$+K+11]=Q.itemSize===4?r.w:1)}}d={count:h,texture:C,size:new nt(w,P)},i.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let v=0;for(let _=0;_<u.length;_++)v+=u[_];const g=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function CE(n,e,t,i){let r=new WeakMap;function s(l){const u=i.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const Xm=new dn,Jh=new Vm(1,1),qm=new Dm,Ym=new tS,$m=new zm,Qh=[],ed=[],td=new Float32Array(16),nd=new Float32Array(9),id=new Float32Array(4);function Rs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Qh[r];if(s===void 0&&(s=new Float32Array(r),Qh[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function rl(n,e){let t=ed[e];t===void 0&&(t=new Int32Array(e),ed[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function PE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function DE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function LE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function IE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function UE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;id.set(i),n.uniformMatrix2fv(this.addr,!1,id),It(t,i)}}function NE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;nd.set(i),n.uniformMatrix3fv(this.addr,!1,nd),It(t,i)}}function FE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;td.set(i),n.uniformMatrix4fv(this.addr,!1,td),It(t,i)}}function OE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function BE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function zE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function HE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function kE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function VE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function GE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function WE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function XE(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Jh.compareFunction=Cm,s=Jh):s=Xm,t.setTexture2D(e||s,r)}function qE(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ym,r)}function YE(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$m,r)}function $E(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||qm,r)}function KE(n){switch(n){case 5126:return PE;case 35664:return DE;case 35665:return LE;case 35666:return IE;case 35674:return UE;case 35675:return NE;case 35676:return FE;case 5124:case 35670:return OE;case 35667:case 35671:return BE;case 35668:case 35672:return zE;case 35669:case 35673:return HE;case 5125:return kE;case 36294:return VE;case 36295:return GE;case 36296:return WE;case 35678:case 36198:case 36298:case 36306:case 35682:return XE;case 35679:case 36299:case 36307:return qE;case 35680:case 36300:case 36308:case 36293:return YE;case 36289:case 36303:case 36311:case 36292:return $E}}function jE(n,e){n.uniform1fv(this.addr,e)}function ZE(n,e){const t=Rs(e,this.size,2);n.uniform2fv(this.addr,t)}function JE(n,e){const t=Rs(e,this.size,3);n.uniform3fv(this.addr,t)}function QE(n,e){const t=Rs(e,this.size,4);n.uniform4fv(this.addr,t)}function eT(n,e){const t=Rs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function tT(n,e){const t=Rs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function nT(n,e){const t=Rs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function iT(n,e){n.uniform1iv(this.addr,e)}function rT(n,e){n.uniform2iv(this.addr,e)}function sT(n,e){n.uniform3iv(this.addr,e)}function oT(n,e){n.uniform4iv(this.addr,e)}function aT(n,e){n.uniform1uiv(this.addr,e)}function lT(n,e){n.uniform2uiv(this.addr,e)}function cT(n,e){n.uniform3uiv(this.addr,e)}function uT(n,e){n.uniform4uiv(this.addr,e)}function fT(n,e,t){const i=this.cache,r=e.length,s=rl(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Xm,s[o])}function hT(n,e,t){const i=this.cache,r=e.length,s=rl(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Ym,s[o])}function dT(n,e,t){const i=this.cache,r=e.length,s=rl(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||$m,s[o])}function pT(n,e,t){const i=this.cache,r=e.length,s=rl(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||qm,s[o])}function mT(n){switch(n){case 5126:return jE;case 35664:return ZE;case 35665:return JE;case 35666:return QE;case 35674:return eT;case 35675:return tT;case 35676:return nT;case 5124:case 35670:return iT;case 35667:case 35671:return rT;case 35668:case 35672:return sT;case 35669:case 35673:return oT;case 5125:return aT;case 36294:return lT;case 36295:return cT;case 36296:return uT;case 35678:case 36198:case 36298:case 36306:case 35682:return fT;case 35679:case 36299:case 36307:return hT;case 35680:case 36300:case 36308:case 36293:return dT;case 36289:case 36303:case 36311:case 36292:return pT}}class _T{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=KE(t.type)}}class gT{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mT(t.type)}}class vT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function rd(n,e){n.seq.push(e),n.map[e.id]=e}function xT(n,e,t){const i=n.name,r=i.length;for(nc.lastIndex=0;;){const s=nc.exec(i),o=nc.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){rd(t,u===void 0?new _T(a,n,e):new gT(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new vT(a),rd(t,h)),t=h}}}class Sa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);xT(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function sd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ST=37297;let MT=0;function yT(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const od=new Ge;function ET(n){et._getMatrix(od,et.workingColorSpace,n);const e=`mat3( ${od.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case Oa:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ad(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+yT(n.getShaderSource(e),a)}else return s}function TT(n,e){const t=ET(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function bT(n,e){let t;switch(e){case Rx:t="Linear";break;case Cx:t="Reinhard";break;case Px:t="Cineon";break;case Dx:t="ACESFilmic";break;case Ix:t="AgX";break;case Ux:t="Neutral";break;case Lx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const aa=new V;function AT(){et.getLuminanceCoefficients(aa);const n=aa.x.toFixed(4),e=aa.y.toFixed(4),t=aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function RT(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function CT(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Gs(n){return n!==""}function ld(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PT=/^[ \t]*#include +<([\w\d./]+)>/gm;function xu(n){return n.replace(PT,LT)}const DT=new Map;function LT(n,e){let t=qe[e];if(t===void 0){const i=DT.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return xu(t)}const IT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ud(n){return n.replace(IT,UT)}function UT(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function NT(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vm?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ax?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===mi&&(e="SHADOWMAP_TYPE_VSM"),e}function FT(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ys:case Es:e="ENVMAP_TYPE_CUBE";break;case nl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OT(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Es:e="ENVMAP_MODE_REFRACTION";break}return e}function BT(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case xm:e="ENVMAP_BLENDING_MULTIPLY";break;case Ax:e="ENVMAP_BLENDING_MIX";break;case wx:e="ENVMAP_BLENDING_ADD";break}return e}function zT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function HT(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=NT(t),u=FT(t),f=OT(t),h=BT(t),d=zT(t),p=wT(t),v=RT(s),g=r.createProgram();let _,m,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Gs).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Gs).join(`
`),m.length>0&&(m+=`
`)):(_=[fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),m=[fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?qe.tonemapping_pars_fragment:"",t.toneMapping!==$i?bT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,TT("linearToOutputTexel",t.outputColorSpace),AT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gs).join(`
`)),o=xu(o),o=ld(o,t),o=cd(o,t),a=xu(a),a=ld(a,t),a=cd(a,t),o=ud(o),a=ud(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",t.glslVersion===gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=E+_+o,x=E+m+a,w=sd(r,r.VERTEX_SHADER,T),P=sd(r,r.FRAGMENT_SHADER,x);r.attachShader(g,w),r.attachShader(g,P),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function D(L){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(g)||"",O=r.getShaderInfoLog(w)||"",Q=r.getShaderInfoLog(P)||"",$=F.trim(),X=O.trim(),K=Q.trim();let H=!0,pe=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,w,P);else{const _e=ad(r,w,"vertex"),Te=ad(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+$+`
`+_e+`
`+Te)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(X===""||K==="")&&(pe=!1);pe&&(L.diagnostics={runnable:H,programLog:$,vertexShader:{log:X,prefix:_},fragmentShader:{log:K,prefix:m}})}r.deleteShader(w),r.deleteShader(P),C=new Sa(r,g),M=CT(r,g)}let C;this.getUniforms=function(){return C===void 0&&D(this),C};let M;this.getAttributes=function(){return M===void 0&&D(this),M};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(g,ST)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=MT++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=P,this}let kT=0;class VT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new GT(e),t.set(e,i)),i}}class GT{constructor(e){this.id=kT++,this.code=e,this.usedTimes=0}}function WT(n,e,t,i,r,s,o){const a=new Lm,l=new VT,u=new Set,f=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return u.add(M),M===0?"uv":`uv${M}`}function _(M,b,L,F,O){const Q=F.fog,$=O.geometry,X=M.isMeshStandardMaterial?F.environment:null,K=(M.isMeshStandardMaterial?t:e).get(M.envMap||X),H=K&&K.mapping===nl?K.image.height:null,pe=v[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const _e=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Te=_e!==void 0?_e.length:0;let Ue=0;$.morphAttributes.position!==void 0&&(Ue=1),$.morphAttributes.normal!==void 0&&(Ue=2),$.morphAttributes.color!==void 0&&(Ue=3);let Je,Ye,Xe,ie;if(pe){const it=ei[pe];Je=it.vertexShader,Ye=it.fragmentShader}else Je=M.vertexShader,Ye=M.fragmentShader,l.update(M),Xe=l.getVertexShaderID(M),ie=l.getFragmentShaderID(M);const oe=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),Be=O.isInstancedMesh===!0,De=O.isBatchedMesh===!0,Ke=!!M.map,I=!!M.matcap,y=!!K,q=!!M.aoMap,ee=!!M.lightMap,Y=!!M.bumpMap,k=!!M.normalMap,ae=!!M.displacementMap,Z=!!M.emissiveMap,ne=!!M.metalnessMap,re=!!M.roughnessMap,Se=M.anisotropy>0,A=M.clearcoat>0,S=M.dispersion>0,U=M.iridescence>0,G=M.sheen>0,te=M.transmission>0,W=Se&&!!M.anisotropyMap,ye=A&&!!M.clearcoatMap,le=A&&!!M.clearcoatNormalMap,Ee=A&&!!M.clearcoatRoughnessMap,be=U&&!!M.iridescenceMap,ce=U&&!!M.iridescenceThicknessMap,xe=G&&!!M.sheenColorMap,Pe=G&&!!M.sheenRoughnessMap,Ae=!!M.specularMap,ge=!!M.specularColorMap,He=!!M.specularIntensityMap,N=te&&!!M.transmissionMap,de=te&&!!M.thicknessMap,me=!!M.gradientMap,Ce=!!M.alphaMap,fe=M.alphaTest>0,se=!!M.alphaHash,Ie=!!M.extensions;let ke=$i;M.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ke=n.toneMapping);const ht={shaderID:pe,shaderType:M.type,shaderName:M.name,vertexShader:Je,fragmentShader:Ye,defines:M.defines,customVertexShaderID:Xe,customFragmentShaderID:ie,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:De,batchingColor:De&&O._colorsTexture!==null,instancing:Be,instancingColor:Be&&O.instanceColor!==null,instancingMorph:Be&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Ts,alphaToCoverage:!!M.alphaToCoverage,map:Ke,matcap:I,envMap:y,envMapMode:y&&K.mapping,envMapCubeUVHeight:H,aoMap:q,lightMap:ee,bumpMap:Y,normalMap:k,displacementMap:d&&ae,emissiveMap:Z,normalMapObjectSpace:k&&M.normalMapType===zx,normalMapTangentSpace:k&&M.normalMapType===Bx,metalnessMap:ne,roughnessMap:re,anisotropy:Se,anisotropyMap:W,clearcoat:A,clearcoatMap:ye,clearcoatNormalMap:le,clearcoatRoughnessMap:Ee,dispersion:S,iridescence:U,iridescenceMap:be,iridescenceThicknessMap:ce,sheen:G,sheenColorMap:xe,sheenRoughnessMap:Pe,specularMap:Ae,specularColorMap:ge,specularIntensityMap:He,transmission:te,transmissionMap:N,thicknessMap:de,gradientMap:me,opaque:M.transparent===!1&&M.blending===hs&&M.alphaToCoverage===!1,alphaMap:Ce,alphaTest:fe,alphaHash:se,combine:M.combine,mapUv:Ke&&g(M.map.channel),aoMapUv:q&&g(M.aoMap.channel),lightMapUv:ee&&g(M.lightMap.channel),bumpMapUv:Y&&g(M.bumpMap.channel),normalMapUv:k&&g(M.normalMap.channel),displacementMapUv:ae&&g(M.displacementMap.channel),emissiveMapUv:Z&&g(M.emissiveMap.channel),metalnessMapUv:ne&&g(M.metalnessMap.channel),roughnessMapUv:re&&g(M.roughnessMap.channel),anisotropyMapUv:W&&g(M.anisotropyMap.channel),clearcoatMapUv:ye&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&g(M.sheenRoughnessMap.channel),specularMapUv:Ae&&g(M.specularMap.channel),specularColorMapUv:ge&&g(M.specularColorMap.channel),specularIntensityMapUv:He&&g(M.specularIntensityMap.channel),transmissionMapUv:N&&g(M.transmissionMap.channel),thicknessMapUv:de&&g(M.thicknessMap.channel),alphaMapUv:Ce&&g(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(k||Se),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(Ke||Ce),fog:!!Q,useFog:M.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:we,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ue,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ke&&M.map.isVideoTexture===!0&&et.getTransfer(M.map.colorSpace)===at,decodeVideoTextureEmissive:Z&&M.emissiveMap.isVideoTexture===!0&&et.getTransfer(M.emissiveMap.colorSpace)===at,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Mi,flipSided:M.side===hn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ie&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&M.extensions.multiDraw===!0||De)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ht.vertexUv1s=u.has(1),ht.vertexUv2s=u.has(2),ht.vertexUv3s=u.has(3),u.clear(),ht}function m(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)b.push(L),b.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(E(b,M),T(b,M),b.push(n.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function E(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function T(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){const b=v[M.type];let L;if(b){const F=ei[b];L=pS.clone(F.uniforms)}else L=M.uniforms;return L}function w(M,b){let L;for(let F=0,O=f.length;F<O;F++){const Q=f[F];if(Q.cacheKey===b){L=Q,++L.usedTimes;break}}return L===void 0&&(L=new HT(n,b,M,s),f.push(L)),L}function P(M){if(--M.usedTimes===0){const b=f.indexOf(M);f[b]=f[f.length-1],f.pop(),M.destroy()}}function D(M){l.remove(M)}function C(){l.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:x,acquireProgram:w,releaseProgram:P,releaseShaderCache:D,programs:f,dispose:C}}function XT(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function qT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function hd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function dd(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,d,p,v,g,_){let m=n[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:p,groupOrder:v,renderOrder:h.renderOrder,z:g,group:_},n[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=p,m.groupOrder=v,m.renderOrder=h.renderOrder,m.z=g,m.group=_),e++,m}function a(h,d,p,v,g,_){const m=o(h,d,p,v,g,_);p.transmission>0?i.push(m):p.transparent===!0?r.push(m):t.push(m)}function l(h,d,p,v,g,_){const m=o(h,d,p,v,g,_);p.transmission>0?i.unshift(m):p.transparent===!0?r.unshift(m):t.unshift(m)}function u(h,d){t.length>1&&t.sort(h||qT),i.length>1&&i.sort(d||hd),r.length>1&&r.sort(d||hd)}function f(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:u}}function YT(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new dd,n.set(i,[o])):r>=s.length?(o=new dd,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function $T(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new tt};break;case"SpotLight":t={position:new V,direction:new V,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function KT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jT=0;function ZT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function JT(n){const e=new $T,t=KT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new V);const r=new V,s=new bt,o=new bt;function a(u){let f=0,h=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,v=0,g=0,_=0,m=0,E=0,T=0,x=0,w=0,P=0,D=0;u.sort(ZT);for(let M=0,b=u.length;M<b;M++){const L=u[M],F=L.color,O=L.intensity,Q=L.distance,$=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=F.r*O,h+=F.g*O,d+=F.b*O;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],O);D++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,H=t.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=L.shadow.matrix,E++}i.directional[p]=X,p++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(F).multiplyScalar(O),X.distance=Q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[g]=X;const K=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,K.updateMatrices(L),L.castShadow&&P++),i.spotLightMatrix[g]=K.matrix,L.castShadow){const H=t.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,i.spotShadow[g]=H,i.spotShadowMap[g]=$,x++}g++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(F).multiplyScalar(O),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[_]=X,_++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const K=L.shadow,H=t.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,i.pointShadow[v]=H,i.pointShadowMap[v]=$,i.pointShadowMatrix[v]=L.shadow.matrix,T++}i.point[v]=X,v++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(O),X.groundColor.copy(L.groundColor).multiplyScalar(O),i.hemi[m]=X,m++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const C=i.hash;(C.directionalLength!==p||C.pointLength!==v||C.spotLength!==g||C.rectAreaLength!==_||C.hemiLength!==m||C.numDirectionalShadows!==E||C.numPointShadows!==T||C.numSpotShadows!==x||C.numSpotMaps!==w||C.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=_,i.point.length=v,i.hemi.length=m,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=x+w-P,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=D,C.directionalLength=p,C.pointLength=v,C.spotLength=g,C.rectAreaLength=_,C.hemiLength=m,C.numDirectionalShadows=E,C.numPointShadows=T,C.numSpotShadows=x,C.numSpotMaps=w,C.numLightProbes=D,i.version=jT++)}function l(u,f){let h=0,d=0,p=0,v=0,g=0;const _=f.matrixWorldInverse;for(let m=0,E=u.length;m<E;m++){const T=u[m];if(T.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(_),h++}else if(T.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(_),x.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(_),p++}else if(T.isRectAreaLight){const x=i.rectArea[v];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(_),o.identity(),s.copy(T.matrixWorld),s.premultiply(_),o.extractRotation(s),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),v++}else if(T.isPointLight){const x=i.point[d];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(_),d++}else if(T.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(_),g++}}}return{setup:a,setupView:l,state:i}}function pd(n){const e=new JT(n),t=[],i=[];function r(f){u.camera=f,t.length=0,i.length=0}function s(f){t.push(f)}function o(f){i.push(f)}function a(){e.setup(t)}function l(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function QT(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new pd(n),e.set(r,[a])):s>=o.length?(a=new pd(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nb(n,e,t){let i=new Hm;const r=new nt,s=new nt,o=new Tt,a=new AS({depthPacking:Ox}),l=new wS,u={},f=t.maxTextureSize,h={[er]:hn,[hn]:er,[Mi]:Mi},d=new tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:eb,fragmentShader:tb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new Hn;v.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ei(v,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vm;let m=this.type;this.render=function(P,D,C){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||P.length===0)return;const M=n.getRenderTarget(),b=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Yi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==mi&&this.type===mi,Q=m===mi&&this.type!==mi;for(let $=0,X=P.length;$<X;$++){const K=P[$],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const pe=H.getFrameExtents();if(r.multiply(pe),s.copy(H.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/pe.x),r.x=s.x*pe.x,H.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/pe.y),r.y=s.y*pe.y,H.mapSize.y=s.y)),H.map===null||O===!0||Q===!0){const Te=this.type!==mi?{minFilter:Yn,magFilter:Yn}:{};H.map!==null&&H.map.dispose(),H.map=new Ir(r.x,r.y,Te),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const _e=H.getViewportCount();for(let Te=0;Te<_e;Te++){const Ue=H.getViewport(Te);o.set(s.x*Ue.x,s.y*Ue.y,s.x*Ue.z,s.y*Ue.w),F.viewport(o),H.updateMatrices(K,Te),i=H.getFrustum(),x(D,C,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===mi&&E(H,C),H.needsUpdate=!1}m=this.type,_.needsUpdate=!1,n.setRenderTarget(M,b,L)};function E(P,D){const C=e.update(g);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ir(r.x,r.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(D,null,C,d,g,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(D,null,C,p,g,null)}function T(P,D,C,M){let b=null;const L=C.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(L!==void 0)b=L;else if(b=C.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const F=b.uuid,O=D.uuid;let Q=u[F];Q===void 0&&(Q={},u[F]=Q);let $=Q[O];$===void 0&&($=b.clone(),Q[O]=$,D.addEventListener("dispose",w)),b=$}if(b.visible=D.visible,b.wireframe=D.wireframe,M===mi?b.side=D.shadowSide!==null?D.shadowSide:D.side:b.side=D.shadowSide!==null?D.shadowSide:h[D.side],b.alphaMap=D.alphaMap,b.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,b.map=D.map,b.clipShadows=D.clipShadows,b.clippingPlanes=D.clippingPlanes,b.clipIntersection=D.clipIntersection,b.displacementMap=D.displacementMap,b.displacementScale=D.displacementScale,b.displacementBias=D.displacementBias,b.wireframeLinewidth=D.wireframeLinewidth,b.linewidth=D.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=n.properties.get(b);F.light=C}return b}function x(P,D,C,M,b){if(P.visible===!1)return;if(P.layers.test(D.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&b===mi)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,P.matrixWorld);const O=e.update(P),Q=P.material;if(Array.isArray(Q)){const $=O.groups;for(let X=0,K=$.length;X<K;X++){const H=$[X],pe=Q[H.materialIndex];if(pe&&pe.visible){const _e=T(P,pe,M,b);P.onBeforeShadow(n,P,D,C,O,_e,H),n.renderBufferDirect(C,null,O,_e,P,H),P.onAfterShadow(n,P,D,C,O,_e,H)}}}else if(Q.visible){const $=T(P,Q,M,b);P.onBeforeShadow(n,P,D,C,O,$,null),n.renderBufferDirect(C,null,O,$,P,null),P.onAfterShadow(n,P,D,C,O,$,null)}}const F=P.children;for(let O=0,Q=F.length;O<Q;O++)x(F[O],D,C,M,b)}function w(P){P.target.removeEventListener("dispose",w);for(const C in u){const M=u[C],b=P.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}const ib={[Dc]:Lc,[Ic]:Fc,[Uc]:Oc,[Ms]:Nc,[Lc]:Dc,[Fc]:Ic,[Oc]:Uc,[Nc]:Ms};function rb(n,e){function t(){let N=!1;const de=new Tt;let me=null;const Ce=new Tt(0,0,0,0);return{setMask:function(fe){me!==fe&&!N&&(n.colorMask(fe,fe,fe,fe),me=fe)},setLocked:function(fe){N=fe},setClear:function(fe,se,Ie,ke,ht){ht===!0&&(fe*=ke,se*=ke,Ie*=ke),de.set(fe,se,Ie,ke),Ce.equals(de)===!1&&(n.clearColor(fe,se,Ie,ke),Ce.copy(de))},reset:function(){N=!1,me=null,Ce.set(-1,0,0,0)}}}function i(){let N=!1,de=!1,me=null,Ce=null,fe=null;return{setReversed:function(se){if(de!==se){const Ie=e.get("EXT_clip_control");se?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),de=se;const ke=fe;fe=null,this.setClear(ke)}},getReversed:function(){return de},setTest:function(se){se?oe(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(se){me!==se&&!N&&(n.depthMask(se),me=se)},setFunc:function(se){if(de&&(se=ib[se]),Ce!==se){switch(se){case Dc:n.depthFunc(n.NEVER);break;case Lc:n.depthFunc(n.ALWAYS);break;case Ic:n.depthFunc(n.LESS);break;case Ms:n.depthFunc(n.LEQUAL);break;case Uc:n.depthFunc(n.EQUAL);break;case Nc:n.depthFunc(n.GEQUAL);break;case Fc:n.depthFunc(n.GREATER);break;case Oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ce=se}},setLocked:function(se){N=se},setClear:function(se){fe!==se&&(de&&(se=1-se),n.clearDepth(se),fe=se)},reset:function(){N=!1,me=null,Ce=null,fe=null,de=!1}}}function r(){let N=!1,de=null,me=null,Ce=null,fe=null,se=null,Ie=null,ke=null,ht=null;return{setTest:function(it){N||(it?oe(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(it){de!==it&&!N&&(n.stencilMask(it),de=it)},setFunc:function(it,li,Kn){(me!==it||Ce!==li||fe!==Kn)&&(n.stencilFunc(it,li,Kn),me=it,Ce=li,fe=Kn)},setOp:function(it,li,Kn){(se!==it||Ie!==li||ke!==Kn)&&(n.stencilOp(it,li,Kn),se=it,Ie=li,ke=Kn)},setLocked:function(it){N=it},setClear:function(it){ht!==it&&(n.clearStencil(it),ht=it)},reset:function(){N=!1,de=null,me=null,Ce=null,fe=null,se=null,Ie=null,ke=null,ht=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,u=new WeakMap;let f={},h={},d=new WeakMap,p=[],v=null,g=!1,_=null,m=null,E=null,T=null,x=null,w=null,P=null,D=new tt(0,0,0),C=0,M=!1,b=null,L=null,F=null,O=null,Q=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=K>=2);let pe=null,_e={};const Te=n.getParameter(n.SCISSOR_BOX),Ue=n.getParameter(n.VIEWPORT),Je=new Tt().fromArray(Te),Ye=new Tt().fromArray(Ue);function Xe(N,de,me,Ce){const fe=new Uint8Array(4),se=n.createTexture();n.bindTexture(N,se),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<me;Ie++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,Ce,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(de+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return se}const ie={};ie[n.TEXTURE_2D]=Xe(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=Xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=Xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=Xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(n.DEPTH_TEST),o.setFunc(Ms),Y(!1),k(fh),oe(n.CULL_FACE),q(Yi);function oe(N){f[N]!==!0&&(n.enable(N),f[N]=!0)}function we(N){f[N]!==!1&&(n.disable(N),f[N]=!1)}function Be(N,de){return h[N]!==de?(n.bindFramebuffer(N,de),h[N]=de,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function De(N,de){let me=p,Ce=!1;if(N){me=d.get(de),me===void 0&&(me=[],d.set(de,me));const fe=N.textures;if(me.length!==fe.length||me[0]!==n.COLOR_ATTACHMENT0){for(let se=0,Ie=fe.length;se<Ie;se++)me[se]=n.COLOR_ATTACHMENT0+se;me.length=fe.length,Ce=!0}}else me[0]!==n.BACK&&(me[0]=n.BACK,Ce=!0);Ce&&n.drawBuffers(me)}function Ke(N){return v!==N?(n.useProgram(N),v=N,!0):!1}const I={[Sr]:n.FUNC_ADD,[cx]:n.FUNC_SUBTRACT,[ux]:n.FUNC_REVERSE_SUBTRACT};I[fx]=n.MIN,I[hx]=n.MAX;const y={[dx]:n.ZERO,[px]:n.ONE,[mx]:n.SRC_COLOR,[Cc]:n.SRC_ALPHA,[Mx]:n.SRC_ALPHA_SATURATE,[xx]:n.DST_COLOR,[gx]:n.DST_ALPHA,[_x]:n.ONE_MINUS_SRC_COLOR,[Pc]:n.ONE_MINUS_SRC_ALPHA,[Sx]:n.ONE_MINUS_DST_COLOR,[vx]:n.ONE_MINUS_DST_ALPHA,[yx]:n.CONSTANT_COLOR,[Ex]:n.ONE_MINUS_CONSTANT_COLOR,[Tx]:n.CONSTANT_ALPHA,[bx]:n.ONE_MINUS_CONSTANT_ALPHA};function q(N,de,me,Ce,fe,se,Ie,ke,ht,it){if(N===Yi){g===!0&&(we(n.BLEND),g=!1);return}if(g===!1&&(oe(n.BLEND),g=!0),N!==lx){if(N!==_||it!==M){if((m!==Sr||x!==Sr)&&(n.blendEquation(n.FUNC_ADD),m=Sr,x=Sr),it)switch(N){case hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hh:n.blendFunc(n.ONE,n.ONE);break;case dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ph:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case dh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,T=null,w=null,P=null,D.set(0,0,0),C=0,_=N,M=it}return}fe=fe||de,se=se||me,Ie=Ie||Ce,(de!==m||fe!==x)&&(n.blendEquationSeparate(I[de],I[fe]),m=de,x=fe),(me!==E||Ce!==T||se!==w||Ie!==P)&&(n.blendFuncSeparate(y[me],y[Ce],y[se],y[Ie]),E=me,T=Ce,w=se,P=Ie),(ke.equals(D)===!1||ht!==C)&&(n.blendColor(ke.r,ke.g,ke.b,ht),D.copy(ke),C=ht),_=N,M=!1}function ee(N,de){N.side===Mi?we(n.CULL_FACE):oe(n.CULL_FACE);let me=N.side===hn;de&&(me=!me),Y(me),N.blending===hs&&N.transparent===!1?q(Yi):q(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ce=N.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Z(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function Y(N){b!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),b=N)}function k(N){N!==sx?(oe(n.CULL_FACE),N!==L&&(N===fh?n.cullFace(n.BACK):N===ox?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),L=N}function ae(N){N!==F&&(X&&n.lineWidth(N),F=N)}function Z(N,de,me){N?(oe(n.POLYGON_OFFSET_FILL),(O!==de||Q!==me)&&(n.polygonOffset(de,me),O=de,Q=me)):we(n.POLYGON_OFFSET_FILL)}function ne(N){N?oe(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function re(N){N===void 0&&(N=n.TEXTURE0+$-1),pe!==N&&(n.activeTexture(N),pe=N)}function Se(N,de,me){me===void 0&&(pe===null?me=n.TEXTURE0+$-1:me=pe);let Ce=_e[me];Ce===void 0&&(Ce={type:void 0,texture:void 0},_e[me]=Ce),(Ce.type!==N||Ce.texture!==de)&&(pe!==me&&(n.activeTexture(me),pe=me),n.bindTexture(N,de||ie[N]),Ce.type=N,Ce.texture=de)}function A(){const N=_e[pe];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(N){Je.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Je.copy(N))}function Pe(N){Ye.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Ye.copy(N))}function Ae(N,de){let me=u.get(de);me===void 0&&(me=new WeakMap,u.set(de,me));let Ce=me.get(N);Ce===void 0&&(Ce=n.getUniformBlockIndex(de,N.name),me.set(N,Ce))}function ge(N,de){const Ce=u.get(de).get(N);l.get(de)!==Ce&&(n.uniformBlockBinding(de,Ce,N.__bindingPointIndex),l.set(de,Ce))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},pe=null,_e={},h={},d=new WeakMap,p=[],v=null,g=!1,_=null,m=null,E=null,T=null,x=null,w=null,P=null,D=new tt(0,0,0),C=0,M=!1,b=null,L=null,F=null,O=null,Q=null,Je.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:oe,disable:we,bindFramebuffer:Be,drawBuffers:De,useProgram:Ke,setBlending:q,setMaterial:ee,setFlipSided:Y,setCullFace:k,setLineWidth:ae,setPolygonOffset:Z,setScissorTest:ne,activeTexture:re,bindTexture:Se,unbindTexture:A,compressedTexImage2D:S,compressedTexImage3D:U,texImage2D:be,texImage3D:ce,updateUBOMapping:Ae,uniformBlockBinding:ge,texStorage2D:le,texStorage3D:Ee,texSubImage2D:G,texSubImage3D:te,compressedTexSubImage2D:W,compressedTexSubImage3D:ye,scissor:xe,viewport:Pe,reset:He}}function sb(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new nt,f=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,S){return p?new OffscreenCanvas(A,S):za("canvas")}function g(A,S,U){let G=1;const te=Se(A);if((te.width>U||te.height>U)&&(G=U/Math.max(te.width,te.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const W=Math.floor(G*te.width),ye=Math.floor(G*te.height);h===void 0&&(h=v(W,ye));const le=S?v(W,ye):h;return le.width=W,le.height=ye,le.getContext("2d").drawImage(A,0,0,W,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+W+"x"+ye+")."),le}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function _(A){return A.generateMipmaps}function m(A){n.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(A,S,U,G,te=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let W=S;if(S===n.RED&&(U===n.FLOAT&&(W=n.R32F),U===n.HALF_FLOAT&&(W=n.R16F),U===n.UNSIGNED_BYTE&&(W=n.R8)),S===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(W=n.R8UI),U===n.UNSIGNED_SHORT&&(W=n.R16UI),U===n.UNSIGNED_INT&&(W=n.R32UI),U===n.BYTE&&(W=n.R8I),U===n.SHORT&&(W=n.R16I),U===n.INT&&(W=n.R32I)),S===n.RG&&(U===n.FLOAT&&(W=n.RG32F),U===n.HALF_FLOAT&&(W=n.RG16F),U===n.UNSIGNED_BYTE&&(W=n.RG8)),S===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(W=n.RG8UI),U===n.UNSIGNED_SHORT&&(W=n.RG16UI),U===n.UNSIGNED_INT&&(W=n.RG32UI),U===n.BYTE&&(W=n.RG8I),U===n.SHORT&&(W=n.RG16I),U===n.INT&&(W=n.RG32I)),S===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(W=n.RGB8UI),U===n.UNSIGNED_SHORT&&(W=n.RGB16UI),U===n.UNSIGNED_INT&&(W=n.RGB32UI),U===n.BYTE&&(W=n.RGB8I),U===n.SHORT&&(W=n.RGB16I),U===n.INT&&(W=n.RGB32I)),S===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),U===n.UNSIGNED_INT&&(W=n.RGBA32UI),U===n.BYTE&&(W=n.RGBA8I),U===n.SHORT&&(W=n.RGBA16I),U===n.INT&&(W=n.RGBA32I)),S===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),S===n.RGBA){const ye=te?Oa:et.getTransfer(G);U===n.FLOAT&&(W=n.RGBA32F),U===n.HALF_FLOAT&&(W=n.RGBA16F),U===n.UNSIGNED_BYTE&&(W=ye===at?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(A,S){let U;return A?S===null||S===Lr||S===mo?U=n.DEPTH24_STENCIL8:S===yi?U=n.DEPTH32F_STENCIL8:S===po&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Lr||S===mo?U=n.DEPTH_COMPONENT24:S===yi?U=n.DEPTH_COMPONENT32F:S===po&&(U=n.DEPTH_COMPONENT16),U}function w(A,S){return _(A)===!0||A.isFramebufferTexture&&A.minFilter!==Yn&&A.minFilter!==ii?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function P(A){const S=A.target;S.removeEventListener("dispose",P),C(S),S.isVideoTexture&&f.delete(S)}function D(A){const S=A.target;S.removeEventListener("dispose",D),b(S)}function C(A){const S=i.get(A);if(S.__webglInit===void 0)return;const U=A.source,G=d.get(U);if(G){const te=G[S.__cacheKey];te.usedTimes--,te.usedTimes===0&&M(A),Object.keys(G).length===0&&d.delete(U)}i.remove(A)}function M(A){const S=i.get(A);n.deleteTexture(S.__webglTexture);const U=A.source,G=d.get(U);delete G[S.__cacheKey],o.memory.textures--}function b(A){const S=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(S.__webglFramebuffer[G]))for(let te=0;te<S.__webglFramebuffer[G].length;te++)n.deleteFramebuffer(S.__webglFramebuffer[G][te]);else n.deleteFramebuffer(S.__webglFramebuffer[G]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[G])}else{if(Array.isArray(S.__webglFramebuffer))for(let G=0;G<S.__webglFramebuffer.length;G++)n.deleteFramebuffer(S.__webglFramebuffer[G]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let G=0;G<S.__webglColorRenderbuffer.length;G++)S.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[G]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const U=A.textures;for(let G=0,te=U.length;G<te;G++){const W=i.get(U[G]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(U[G])}i.remove(A)}let L=0;function F(){L=0}function O(){const A=L;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function Q(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function $(A,S){const U=i.get(A);if(A.isVideoTexture&&ne(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&U.__version!==A.version){const G=A.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ie(U,A,S);return}}else A.isExternalTexture&&(U.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+S)}function X(A,S){const U=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){ie(U,A,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+S)}function K(A,S){const U=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){ie(U,A,S);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+S)}function H(A,S){const U=i.get(A);if(A.version>0&&U.__version!==A.version){oe(U,A,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+S)}const pe={[Hc]:n.REPEAT,[Er]:n.CLAMP_TO_EDGE,[kc]:n.MIRRORED_REPEAT},_e={[Yn]:n.NEAREST,[Nx]:n.NEAREST_MIPMAP_NEAREST,[Fo]:n.NEAREST_MIPMAP_LINEAR,[ii]:n.LINEAR,[bl]:n.LINEAR_MIPMAP_NEAREST,[Tr]:n.LINEAR_MIPMAP_LINEAR},Te={[Hx]:n.NEVER,[qx]:n.ALWAYS,[kx]:n.LESS,[Cm]:n.LEQUAL,[Vx]:n.EQUAL,[Xx]:n.GEQUAL,[Gx]:n.GREATER,[Wx]:n.NOTEQUAL};function Ue(A,S){if(S.type===yi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===ii||S.magFilter===bl||S.magFilter===Fo||S.magFilter===Tr||S.minFilter===ii||S.minFilter===bl||S.minFilter===Fo||S.minFilter===Tr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,pe[S.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,pe[S.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,pe[S.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,_e[S.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,_e[S.minFilter]),S.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Yn||S.minFilter!==Fo&&S.minFilter!==Tr||S.type===yi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Je(A,S){let U=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",P));const G=S.source;let te=d.get(G);te===void 0&&(te={},d.set(G,te));const W=Q(S);if(W!==A.__cacheKey){te[W]===void 0&&(te[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),te[W].usedTimes++;const ye=te[A.__cacheKey];ye!==void 0&&(te[A.__cacheKey].usedTimes--,ye.usedTimes===0&&M(S)),A.__cacheKey=W,A.__webglTexture=te[W].texture}return U}function Ye(A,S,U){return Math.floor(Math.floor(A/U)/S)}function Xe(A,S,U,G){const W=A.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,U,G,S.data);else{W.sort((ce,xe)=>ce.start-xe.start);let ye=0;for(let ce=1;ce<W.length;ce++){const xe=W[ye],Pe=W[ce],Ae=xe.start+xe.count,ge=Ye(Pe.start,S.width,4),He=Ye(xe.start,S.width,4);Pe.start<=Ae+1&&ge===He&&Ye(Pe.start+Pe.count-1,S.width,4)===ge?xe.count=Math.max(xe.count,Pe.start+Pe.count-xe.start):(++ye,W[ye]=Pe)}W.length=ye+1;const le=n.getParameter(n.UNPACK_ROW_LENGTH),Ee=n.getParameter(n.UNPACK_SKIP_PIXELS),be=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let ce=0,xe=W.length;ce<xe;ce++){const Pe=W[ce],Ae=Math.floor(Pe.start/4),ge=Math.ceil(Pe.count/4),He=Ae%S.width,N=Math.floor(Ae/S.width),de=ge,me=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,He),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,He,N,de,me,U,G,S.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ee),n.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function ie(A,S,U){let G=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(G=n.TEXTURE_3D);const te=Je(A,S),W=S.source;t.bindTexture(G,A.__webglTexture,n.TEXTURE0+U);const ye=i.get(W);if(W.version!==ye.__version||te===!0){t.activeTexture(n.TEXTURE0+U);const le=et.getPrimaries(et.workingColorSpace),Ee=S.colorSpace===Hi?null:et.getPrimaries(S.colorSpace),be=S.colorSpace===Hi||le===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ce=g(S.image,!1,r.maxTextureSize);ce=re(S,ce);const xe=s.convert(S.format,S.colorSpace),Pe=s.convert(S.type);let Ae=T(S.internalFormat,xe,Pe,S.colorSpace,S.isVideoTexture);Ue(G,S);let ge;const He=S.mipmaps,N=S.isVideoTexture!==!0,de=ye.__version===void 0||te===!0,me=W.dataReady,Ce=w(S,ce);if(S.isDepthTexture)Ae=x(S.format===go,S.type),de&&(N?t.texStorage2D(n.TEXTURE_2D,1,Ae,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ae,ce.width,ce.height,0,xe,Pe,null));else if(S.isDataTexture)if(He.length>0){N&&de&&t.texStorage2D(n.TEXTURE_2D,Ce,Ae,He[0].width,He[0].height);for(let fe=0,se=He.length;fe<se;fe++)ge=He[fe],N?me&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ge.width,ge.height,xe,Pe,ge.data):t.texImage2D(n.TEXTURE_2D,fe,Ae,ge.width,ge.height,0,xe,Pe,ge.data);S.generateMipmaps=!1}else N?(de&&t.texStorage2D(n.TEXTURE_2D,Ce,Ae,ce.width,ce.height),me&&Xe(S,ce,xe,Pe)):t.texImage2D(n.TEXTURE_2D,0,Ae,ce.width,ce.height,0,xe,Pe,ce.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){N&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,Ae,He[0].width,He[0].height,ce.depth);for(let fe=0,se=He.length;fe<se;fe++)if(ge=He[fe],S.format!==Xn)if(xe!==null)if(N){if(me)if(S.layerUpdates.size>0){const Ie=Wh(ge.width,ge.height,S.format,S.type);for(const ke of S.layerUpdates){const ht=ge.data.subarray(ke*Ie/ge.data.BYTES_PER_ELEMENT,(ke+1)*Ie/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,ke,ge.width,ge.height,1,xe,ht)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ge.width,ge.height,ce.depth,xe,ge.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,Ae,ge.width,ge.height,ce.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ge.width,ge.height,ce.depth,xe,Pe,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,Ae,ge.width,ge.height,ce.depth,0,xe,Pe,ge.data)}else{N&&de&&t.texStorage2D(n.TEXTURE_2D,Ce,Ae,He[0].width,He[0].height);for(let fe=0,se=He.length;fe<se;fe++)ge=He[fe],S.format!==Xn?xe!==null?N?me&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,ge.width,ge.height,xe,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,Ae,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?me&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ge.width,ge.height,xe,Pe,ge.data):t.texImage2D(n.TEXTURE_2D,fe,Ae,ge.width,ge.height,0,xe,Pe,ge.data)}else if(S.isDataArrayTexture)if(N){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,Ae,ce.width,ce.height,ce.depth),me)if(S.layerUpdates.size>0){const fe=Wh(ce.width,ce.height,S.format,S.type);for(const se of S.layerUpdates){const Ie=ce.data.subarray(se*fe/ce.data.BYTES_PER_ELEMENT,(se+1)*fe/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,se,ce.width,ce.height,1,xe,Pe,Ie)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,xe,Pe,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,ce.width,ce.height,ce.depth,0,xe,Pe,ce.data);else if(S.isData3DTexture)N?(de&&t.texStorage3D(n.TEXTURE_3D,Ce,Ae,ce.width,ce.height,ce.depth),me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,xe,Pe,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,ce.width,ce.height,ce.depth,0,xe,Pe,ce.data);else if(S.isFramebufferTexture){if(de)if(N)t.texStorage2D(n.TEXTURE_2D,Ce,Ae,ce.width,ce.height);else{let fe=ce.width,se=ce.height;for(let Ie=0;Ie<Ce;Ie++)t.texImage2D(n.TEXTURE_2D,Ie,Ae,fe,se,0,xe,Pe,null),fe>>=1,se>>=1}}else if(He.length>0){if(N&&de){const fe=Se(He[0]);t.texStorage2D(n.TEXTURE_2D,Ce,Ae,fe.width,fe.height)}for(let fe=0,se=He.length;fe<se;fe++)ge=He[fe],N?me&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,xe,Pe,ge):t.texImage2D(n.TEXTURE_2D,fe,Ae,xe,Pe,ge);S.generateMipmaps=!1}else if(N){if(de){const fe=Se(ce);t.texStorage2D(n.TEXTURE_2D,Ce,Ae,fe.width,fe.height)}me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,Pe,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ae,xe,Pe,ce);_(S)&&m(G),ye.__version=W.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function oe(A,S,U){if(S.image.length!==6)return;const G=Je(A,S),te=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+U);const W=i.get(te);if(te.version!==W.__version||G===!0){t.activeTexture(n.TEXTURE0+U);const ye=et.getPrimaries(et.workingColorSpace),le=S.colorSpace===Hi?null:et.getPrimaries(S.colorSpace),Ee=S.colorSpace===Hi||ye===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,ce=S.image[0]&&S.image[0].isDataTexture,xe=[];for(let se=0;se<6;se++)!be&&!ce?xe[se]=g(S.image[se],!0,r.maxCubemapSize):xe[se]=ce?S.image[se].image:S.image[se],xe[se]=re(S,xe[se]);const Pe=xe[0],Ae=s.convert(S.format,S.colorSpace),ge=s.convert(S.type),He=T(S.internalFormat,Ae,ge,S.colorSpace),N=S.isVideoTexture!==!0,de=W.__version===void 0||G===!0,me=te.dataReady;let Ce=w(S,Pe);Ue(n.TEXTURE_CUBE_MAP,S);let fe;if(be){N&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,He,Pe.width,Pe.height);for(let se=0;se<6;se++){fe=xe[se].mipmaps;for(let Ie=0;Ie<fe.length;Ie++){const ke=fe[Ie];S.format!==Xn?Ae!==null?N?me&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,0,0,ke.width,ke.height,Ae,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,He,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,0,0,ke.width,ke.height,Ae,ge,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,He,ke.width,ke.height,0,Ae,ge,ke.data)}}}else{if(fe=S.mipmaps,N&&de){fe.length>0&&Ce++;const se=Se(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,He,se.width,se.height)}for(let se=0;se<6;se++)if(ce){N?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,xe[se].width,xe[se].height,Ae,ge,xe[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,He,xe[se].width,xe[se].height,0,Ae,ge,xe[se].data);for(let Ie=0;Ie<fe.length;Ie++){const ht=fe[Ie].image[se].image;N?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,0,0,ht.width,ht.height,Ae,ge,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,He,ht.width,ht.height,0,Ae,ge,ht.data)}}else{N?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ae,ge,xe[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,He,Ae,ge,xe[se]);for(let Ie=0;Ie<fe.length;Ie++){const ke=fe[Ie];N?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,0,0,Ae,ge,ke.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,He,Ae,ge,ke.image[se])}}}_(S)&&m(n.TEXTURE_CUBE_MAP),W.__version=te.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function we(A,S,U,G,te,W){const ye=s.convert(U.format,U.colorSpace),le=s.convert(U.type),Ee=T(U.internalFormat,ye,le,U.colorSpace),be=i.get(S),ce=i.get(U);if(ce.__renderTarget=S,!be.__hasExternalTextures){const xe=Math.max(1,S.width>>W),Pe=Math.max(1,S.height>>W);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,W,Ee,xe,Pe,S.depth,0,ye,le,null):t.texImage2D(te,W,Ee,xe,Pe,0,ye,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,te,ce.__webglTexture,0,ae(S)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,te,ce.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(A,S,U){if(n.bindRenderbuffer(n.RENDERBUFFER,A),S.depthBuffer){const G=S.depthTexture,te=G&&G.isDepthTexture?G.type:null,W=x(S.stencilBuffer,te),ye=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=ae(S);Z(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,W,S.width,S.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,W,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,W,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,A)}else{const G=S.textures;for(let te=0;te<G.length;te++){const W=G[te],ye=s.convert(W.format,W.colorSpace),le=s.convert(W.type),Ee=T(W.internalFormat,ye,le,W.colorSpace),be=ae(S);U&&Z(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,Ee,S.width,S.height):Z(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,Ee,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Ee,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function De(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(S.depthTexture);G.__renderTarget=S,(!G.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$(S.depthTexture,0);const te=G.__webglTexture,W=ae(S);if(S.depthTexture.format===_o)Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(S.depthTexture.format===go)Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ke(A){const S=i.get(A),U=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const G=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),G){const te=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,G.removeEventListener("dispose",te)};G.addEventListener("dispose",te),S.__depthDisposeCallback=te}S.__boundDepthTexture=G}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const G=A.texture.mipmaps;G&&G.length>0?De(S.__webglFramebuffer[0],A):De(S.__webglFramebuffer,A)}else if(U){S.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[G]),S.__webglDepthbuffer[G]===void 0)S.__webglDepthbuffer[G]=n.createRenderbuffer(),Be(S.__webglDepthbuffer[G],A,!1);else{const te=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=S.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,W)}}else{const G=A.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Be(S.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function I(A,S,U){const G=i.get(A);S!==void 0&&we(G.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Ke(A)}function y(A){const S=A.texture,U=i.get(A),G=i.get(S);A.addEventListener("dispose",D);const te=A.textures,W=A.isWebGLCubeRenderTarget===!0,ye=te.length>1;if(ye||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=S.version,o.memory.textures++),W){U.__webglFramebuffer=[];for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0){U.__webglFramebuffer[le]=[];for(let Ee=0;Ee<S.mipmaps.length;Ee++)U.__webglFramebuffer[le][Ee]=n.createFramebuffer()}else U.__webglFramebuffer[le]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){U.__webglFramebuffer=[];for(let le=0;le<S.mipmaps.length;le++)U.__webglFramebuffer[le]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(ye)for(let le=0,Ee=te.length;le<Ee;le++){const be=i.get(te[le]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Z(A)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let le=0;le<te.length;le++){const Ee=te[le];U.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[le]);const be=s.convert(Ee.format,Ee.colorSpace),ce=s.convert(Ee.type),xe=T(Ee.internalFormat,be,ce,Ee.colorSpace,A.isXRRenderTarget===!0),Pe=ae(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,xe,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,U.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Be(U.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,S);for(let le=0;le<6;le++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)we(U.__webglFramebuffer[le][Ee],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ee);else we(U.__webglFramebuffer[le],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);_(S)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let le=0,Ee=te.length;le<Ee;le++){const be=te[le],ce=i.get(be);let xe=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,ce.__webglTexture),Ue(xe,be),we(U.__webglFramebuffer,A,be,n.COLOR_ATTACHMENT0+le,xe,0),_(be)&&m(xe)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(le=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,G.__webglTexture),Ue(le,S),S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)we(U.__webglFramebuffer[Ee],A,S,n.COLOR_ATTACHMENT0,le,Ee);else we(U.__webglFramebuffer,A,S,n.COLOR_ATTACHMENT0,le,0);_(S)&&m(le),t.unbindTexture()}A.depthBuffer&&Ke(A)}function q(A){const S=A.textures;for(let U=0,G=S.length;U<G;U++){const te=S[U];if(_(te)){const W=E(A),ye=i.get(te).__webglTexture;t.bindTexture(W,ye),m(W),t.unbindTexture()}}}const ee=[],Y=[];function k(A){if(A.samples>0){if(Z(A)===!1){const S=A.textures,U=A.width,G=A.height;let te=n.COLOR_BUFFER_BIT;const W=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(A),le=S.length>1;if(le)for(let be=0;be<S.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const Ee=A.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let be=0;be<S.length;be++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[be]);const ce=i.get(S[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,U,G,0,0,U,G,te,n.NEAREST),l===!0&&(ee.length=0,Y.length=0,ee.push(n.COLOR_ATTACHMENT0+be),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ee.push(W),Y.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let be=0;be<S.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,ye.__webglColorRenderbuffer[be]);const ce=i.get(S[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function ae(A){return Math.min(r.maxSamples,A.samples)}function Z(A){const S=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ne(A){const S=o.render.frame;f.get(A)!==S&&(f.set(A,S),A.update())}function re(A,S){const U=A.colorSpace,G=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||U!==Ts&&U!==Hi&&(et.getTransfer(U)===at?(G!==Xn||te!==Ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),S}function Se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=I,this.setupRenderTarget=y,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Z}function ob(n,e){function t(i,r=Hi){let s;const o=et.getTransfer(r);if(i===Ci)return n.UNSIGNED_BYTE;if(i===of)return n.UNSIGNED_SHORT_4_4_4_4;if(i===af)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Em)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Mm)return n.BYTE;if(i===ym)return n.SHORT;if(i===po)return n.UNSIGNED_SHORT;if(i===sf)return n.INT;if(i===Lr)return n.UNSIGNED_INT;if(i===yi)return n.FLOAT;if(i===To)return n.HALF_FLOAT;if(i===bm)return n.ALPHA;if(i===Am)return n.RGB;if(i===Xn)return n.RGBA;if(i===_o)return n.DEPTH_COMPONENT;if(i===go)return n.DEPTH_STENCIL;if(i===wm)return n.RED;if(i===lf)return n.RED_INTEGER;if(i===Rm)return n.RG;if(i===cf)return n.RG_INTEGER;if(i===uf)return n.RGBA_INTEGER;if(i===_a||i===ga||i===va||i===xa)if(o===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===_a)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===_a)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vc||i===Gc||i===Wc||i===Xc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Vc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Wc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qc||i===Yc||i===$c)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qc||i===Yc)return o===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===$c)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Kc||i===jc||i===Zc||i===Jc||i===Qc||i===eu||i===tu||i===nu||i===iu||i===ru||i===su||i===ou||i===au||i===lu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Kc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qc)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===eu)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tu)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nu)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===iu)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ru)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===su)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ou)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===au)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lu)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cu||i===uu||i===fu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===cu)return o===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hu||i===du||i===pu||i===mu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===hu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===du)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const ab=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Gm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new tr({vertexShader:ab,fragmentShader:lb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ei(new il(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ub extends As{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,f=null,h=null,d=null,p=null,v=null;const g=typeof XRWebGLBinding<"u",_=new cb,m={},E=t.getContextAttributes();let T=null,x=null;const w=[],P=[],D=new nt;let C=null;const M=new Un;M.viewport=new Tt;const b=new Un;b.viewport=new Tt;const L=[M,b],F=new DS;let O=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let oe=w[ie];return oe===void 0&&(oe=new $l,w[ie]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(ie){let oe=w[ie];return oe===void 0&&(oe=new $l,w[ie]=oe),oe.getGripSpace()},this.getHand=function(ie){let oe=w[ie];return oe===void 0&&(oe=new $l,w[ie]=oe),oe.getHandSpace()};function $(ie){const oe=P.indexOf(ie.inputSource);if(oe===-1)return;const we=w[oe];we!==void 0&&(we.update(ie.inputSource,ie.frame,u||o),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function X(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",K);for(let ie=0;ie<w.length;ie++){const oe=P[ie];oe!==null&&(P[ie]=null,w[ie].disconnect(oe))}O=null,Q=null,_.reset();for(const ie in m)delete m[ie];e.setRenderTarget(T),p=null,d=null,h=null,r=null,x=null,Xe.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(ie){u=ie},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",X),r.addEventListener("inputsourceschange",K),E.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(D),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Be=null,De=null;E.depth&&(De=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=E.stencil?go:_o,Be=E.stencil?mo:Lr);const Ke={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ke),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Ir(d.textureWidth,d.textureHeight,{format:Xn,type:Ci,depthTexture:new Vm(d.textureWidth,d.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const we={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,we),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ir(p.framebufferWidth,p.framebufferHeight,{format:Xn,type:Ci,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(ie){for(let oe=0;oe<ie.removed.length;oe++){const we=ie.removed[oe],Be=P.indexOf(we);Be>=0&&(P[Be]=null,w[Be].disconnect(we))}for(let oe=0;oe<ie.added.length;oe++){const we=ie.added[oe];let Be=P.indexOf(we);if(Be===-1){for(let Ke=0;Ke<w.length;Ke++)if(Ke>=P.length){P.push(we),Be=Ke;break}else if(P[Ke]===null){P[Ke]=we,Be=Ke;break}if(Be===-1)break}const De=w[Be];De&&De.connect(we)}}const H=new V,pe=new V;function _e(ie,oe,we){H.setFromMatrixPosition(oe.matrixWorld),pe.setFromMatrixPosition(we.matrixWorld);const Be=H.distanceTo(pe),De=oe.projectionMatrix.elements,Ke=we.projectionMatrix.elements,I=De[14]/(De[10]-1),y=De[14]/(De[10]+1),q=(De[9]+1)/De[5],ee=(De[9]-1)/De[5],Y=(De[8]-1)/De[0],k=(Ke[8]+1)/Ke[0],ae=I*Y,Z=I*k,ne=Be/(-Y+k),re=ne*-Y;if(oe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(re),ie.translateZ(ne),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),De[10]===-1)ie.projectionMatrix.copy(oe.projectionMatrix),ie.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Se=I+ne,A=y+ne,S=ae-re,U=Z+(Be-re),G=q*y/A*Se,te=ee*y/A*Se;ie.projectionMatrix.makePerspective(S,U,G,te,Se,A),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function Te(ie,oe){oe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(oe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let oe=ie.near,we=ie.far;_.texture!==null&&(_.depthNear>0&&(oe=_.depthNear),_.depthFar>0&&(we=_.depthFar)),F.near=b.near=M.near=oe,F.far=b.far=M.far=we,(O!==F.near||Q!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,Q=F.far),F.layers.mask=ie.layers.mask|6,M.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;const Be=ie.parent,De=F.cameras;Te(F,Be);for(let Ke=0;Ke<De.length;Ke++)Te(De[Ke],Be);De.length===2?_e(F,M,b):F.projectionMatrix.copy(M.projectionMatrix),Ue(ie,F,Be)};function Ue(ie,oe,we){we===null?ie.matrix.copy(oe.matrixWorld):(ie.matrix.copy(we.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(oe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(oe.projectionMatrix),ie.projectionMatrixInverse.copy(oe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=_u*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ie)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(F)},this.getCameraTexture=function(ie){return m[ie]};let Je=null;function Ye(ie,oe){if(f=oe.getViewerPose(u||o),v=oe,f!==null){const we=f.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Be=!1;we.length!==F.cameras.length&&(F.cameras.length=0,Be=!0);for(let y=0;y<we.length;y++){const q=we[y];let ee=null;if(p!==null)ee=p.getViewport(q);else{const k=h.getViewSubImage(d,q);ee=k.viewport,y===0&&(e.setRenderTargetTextures(x,k.colorTexture,k.depthStencilTexture),e.setRenderTarget(x))}let Y=L[y];Y===void 0&&(Y=new Un,Y.layers.enable(y),Y.viewport=new Tt,L[y]=Y),Y.matrix.fromArray(q.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(q.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(ee.x,ee.y,ee.width,ee.height),y===0&&(F.matrix.copy(Y.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Be===!0&&F.cameras.push(Y)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){h=i.getBinding();const y=h.getDepthInformation(we[0]);y&&y.isValid&&y.texture&&_.init(y,r.renderState)}if(De&&De.includes("camera-access")&&g){e.state.unbindTexture(),h=i.getBinding();for(let y=0;y<we.length;y++){const q=we[y].camera;if(q){let ee=m[q];ee||(ee=new Gm,m[q]=ee);const Y=h.getCameraImage(q);ee.sourceTexture=Y}}}}for(let we=0;we<w.length;we++){const Be=P[we],De=w[we];Be!==null&&De!==void 0&&De.update(Be,oe,u||o)}Je&&Je(ie,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),v=null}const Xe=new Wm;Xe.setAnimationLoop(Ye),this.setAnimationLoop=function(ie){Je=ie},this.dispose=function(){}}}const mr=new Pi,fb=new bt;function hb(n,e){function t(_,m){_.matrixAutoUpdate===!0&&_.updateMatrix(),m.value.copy(_.matrix)}function i(_,m){m.color.getRGB(_.fogColor.value,Om(n)),m.isFog?(_.fogNear.value=m.near,_.fogFar.value=m.far):m.isFogExp2&&(_.fogDensity.value=m.density)}function r(_,m,E,T,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(_,m):m.isMeshToonMaterial?(s(_,m),h(_,m)):m.isMeshPhongMaterial?(s(_,m),f(_,m)):m.isMeshStandardMaterial?(s(_,m),d(_,m),m.isMeshPhysicalMaterial&&p(_,m,x)):m.isMeshMatcapMaterial?(s(_,m),v(_,m)):m.isMeshDepthMaterial?s(_,m):m.isMeshDistanceMaterial?(s(_,m),g(_,m)):m.isMeshNormalMaterial?s(_,m):m.isLineBasicMaterial?(o(_,m),m.isLineDashedMaterial&&a(_,m)):m.isPointsMaterial?l(_,m,E,T):m.isSpriteMaterial?u(_,m):m.isShadowMaterial?(_.color.value.copy(m.color),_.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(_,m){_.opacity.value=m.opacity,m.color&&_.diffuse.value.copy(m.color),m.emissive&&_.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.bumpMap&&(_.bumpMap.value=m.bumpMap,t(m.bumpMap,_.bumpMapTransform),_.bumpScale.value=m.bumpScale,m.side===hn&&(_.bumpScale.value*=-1)),m.normalMap&&(_.normalMap.value=m.normalMap,t(m.normalMap,_.normalMapTransform),_.normalScale.value.copy(m.normalScale),m.side===hn&&_.normalScale.value.negate()),m.displacementMap&&(_.displacementMap.value=m.displacementMap,t(m.displacementMap,_.displacementMapTransform),_.displacementScale.value=m.displacementScale,_.displacementBias.value=m.displacementBias),m.emissiveMap&&(_.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,_.emissiveMapTransform)),m.specularMap&&(_.specularMap.value=m.specularMap,t(m.specularMap,_.specularMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest);const E=e.get(m),T=E.envMap,x=E.envMapRotation;T&&(_.envMap.value=T,mr.copy(x),mr.x*=-1,mr.y*=-1,mr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(mr.y*=-1,mr.z*=-1),_.envMapRotation.value.setFromMatrix4(fb.makeRotationFromEuler(mr)),_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=m.reflectivity,_.ior.value=m.ior,_.refractionRatio.value=m.refractionRatio),m.lightMap&&(_.lightMap.value=m.lightMap,_.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,_.lightMapTransform)),m.aoMap&&(_.aoMap.value=m.aoMap,_.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,_.aoMapTransform))}function o(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform))}function a(_,m){_.dashSize.value=m.dashSize,_.totalSize.value=m.dashSize+m.gapSize,_.scale.value=m.scale}function l(_,m,E,T){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.size.value=m.size*E,_.scale.value=T*.5,m.map&&(_.map.value=m.map,t(m.map,_.uvTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function u(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.rotation.value=m.rotation,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function f(_,m){_.specular.value.copy(m.specular),_.shininess.value=Math.max(m.shininess,1e-4)}function h(_,m){m.gradientMap&&(_.gradientMap.value=m.gradientMap)}function d(_,m){_.metalness.value=m.metalness,m.metalnessMap&&(_.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,_.metalnessMapTransform)),_.roughness.value=m.roughness,m.roughnessMap&&(_.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,_.roughnessMapTransform)),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)}function p(_,m,E){_.ior.value=m.ior,m.sheen>0&&(_.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),_.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(_.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,_.sheenColorMapTransform)),m.sheenRoughnessMap&&(_.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,_.sheenRoughnessMapTransform))),m.clearcoat>0&&(_.clearcoat.value=m.clearcoat,_.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(_.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,_.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(_.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===hn&&_.clearcoatNormalScale.value.negate())),m.dispersion>0&&(_.dispersion.value=m.dispersion),m.iridescence>0&&(_.iridescence.value=m.iridescence,_.iridescenceIOR.value=m.iridescenceIOR,_.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(_.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,_.iridescenceMapTransform)),m.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),m.transmission>0&&(_.transmission.value=m.transmission,_.transmissionSamplerMap.value=E.texture,_.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(_.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,_.transmissionMapTransform)),_.thickness.value=m.thickness,m.thicknessMap&&(_.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=m.attenuationDistance,_.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(_.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(_.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=m.specularIntensity,_.specularColor.value.copy(m.specularColor),m.specularColorMap&&(_.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,_.specularColorMapTransform)),m.specularIntensityMap&&(_.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,_.specularIntensityMapTransform))}function v(_,m){m.matcap&&(_.matcap.value=m.matcap)}function g(_,m){const E=e.get(m).light;_.referencePosition.value.setFromMatrixPosition(E.matrixWorld),_.nearDistance.value=E.shadow.camera.near,_.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function db(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,T){const x=T.program;i.uniformBlockBinding(E,x)}function u(E,T){let x=r[E.id];x===void 0&&(v(E),x=f(E),r[E.id]=x,E.addEventListener("dispose",_));const w=T.program;i.updateUBOMapping(E,w);const P=e.render.frame;s[E.id]!==P&&(d(E),s[E.id]=P)}function f(E){const T=h();E.__bindingPointIndex=T;const x=n.createBuffer(),w=E.__size,P=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,w,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,x),x}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const T=r[E.id],x=E.uniforms,w=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let P=0,D=x.length;P<D;P++){const C=Array.isArray(x[P])?x[P]:[x[P]];for(let M=0,b=C.length;M<b;M++){const L=C[M];if(p(L,P,M,w)===!0){const F=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let Q=0;for(let $=0;$<O.length;$++){const X=O[$],K=g(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,F+Q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,Q),Q+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,T,x,w){const P=E.value,D=T+"_"+x;if(w[D]===void 0)return typeof P=="number"||typeof P=="boolean"?w[D]=P:w[D]=P.clone(),!0;{const C=w[D];if(typeof P=="number"||typeof P=="boolean"){if(C!==P)return w[D]=P,!0}else if(C.equals(P)===!1)return C.copy(P),!0}return!1}function v(E){const T=E.uniforms;let x=0;const w=16;for(let D=0,C=T.length;D<C;D++){const M=Array.isArray(T[D])?T[D]:[T[D]];for(let b=0,L=M.length;b<L;b++){const F=M[b],O=Array.isArray(F.value)?F.value:[F.value];for(let Q=0,$=O.length;Q<$;Q++){const X=O[Q],K=g(X),H=x%w,pe=H%K.boundary,_e=H+pe;x+=pe,_e!==0&&w-_e<K.storage&&(x+=w-_e),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=K.storage}}}const P=x%w;return P>0&&(x+=w-P),E.__size=x,E.__cache={},this}function g(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function _(E){const T=E.target;T.removeEventListener("dispose",_);const x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function m(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:u,dispose:m}}class pb{constructor(e={}){const{canvas:t=$x(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const E=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=In;let P=0,D=0,C=null,M=-1,b=null;const L=new Tt,F=new Tt;let O=null;const Q=new tt(0);let $=0,X=t.width,K=t.height,H=1,pe=null,_e=null;const Te=new Tt(0,0,X,K),Ue=new Tt(0,0,X,K);let Je=!1;const Ye=new Hm;let Xe=!1,ie=!1;const oe=new bt,we=new V,Be=new Tt,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function I(){return C===null?H:1}let y=i;function q(R,B){return t.getContext(R,B)}try{const R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rf}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",fe,!1),y===null){const B="webgl2";if(y=q(B,R),y===null)throw q(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ee,Y,k,ae,Z,ne,re,Se,A,S,U,G,te,W,ye,le,Ee,be,ce,xe,Pe,Ae,ge,He;function N(){ee=new TE(y),ee.init(),Ae=new ob(y,ee),Y=new gE(y,ee,e,Ae),k=new rb(y,ee),Y.reversedDepthBuffer&&d&&k.buffers.depth.setReversed(!0),ae=new wE(y),Z=new XT,ne=new sb(y,ee,k,Z,Y,Ae,ae),re=new xE(x),Se=new EE(x),A=new IS(y),ge=new mE(y,A),S=new bE(y,A,ae,ge),U=new CE(y,S,A,ae),ce=new RE(y,Y,ne),le=new vE(Z),G=new WT(x,re,Se,ee,Y,ge,le),te=new hb(x,Z),W=new YT,ye=new QT(ee),be=new pE(x,re,Se,k,U,p,l),Ee=new nb(x,U,Y),He=new db(y,ae,Y,k),xe=new _E(y,ee,ae),Pe=new AE(y,ee,ae),ae.programs=G.programs,x.capabilities=Y,x.extensions=ee,x.properties=Z,x.renderLists=W,x.shadowMap=Ee,x.state=k,x.info=ae}N();const de=new ub(x,y);this.xr=de,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const R=ee.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ee.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(R){R!==void 0&&(H=R,this.setSize(X,K,!1))},this.getSize=function(R){return R.set(X,K)},this.setSize=function(R,B,j=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=R,K=B,t.width=Math.floor(R*H),t.height=Math.floor(B*H),j===!0&&(t.style.width=R+"px",t.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(X*H,K*H).floor()},this.setDrawingBufferSize=function(R,B,j){X=R,K=B,H=j,t.width=Math.floor(R*j),t.height=Math.floor(B*j),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(Te)},this.setViewport=function(R,B,j,J){R.isVector4?Te.set(R.x,R.y,R.z,R.w):Te.set(R,B,j,J),k.viewport(L.copy(Te).multiplyScalar(H).round())},this.getScissor=function(R){return R.copy(Ue)},this.setScissor=function(R,B,j,J){R.isVector4?Ue.set(R.x,R.y,R.z,R.w):Ue.set(R,B,j,J),k.scissor(F.copy(Ue).multiplyScalar(H).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(R){k.setScissorTest(Je=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){_e=R},this.getClearColor=function(R){return R.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(R=!0,B=!0,j=!0){let J=0;if(R){let z=!1;if(C!==null){const he=C.texture.format;z=he===uf||he===cf||he===lf}if(z){const he=C.texture.type,Me=he===Ci||he===Lr||he===po||he===mo||he===of||he===af,Le=be.getClearColor(),Re=be.getClearAlpha(),Oe=Le.r,ze=Le.g,Ne=Le.b;Me?(v[0]=Oe,v[1]=ze,v[2]=Ne,v[3]=Re,y.clearBufferuiv(y.COLOR,0,v)):(g[0]=Oe,g[1]=ze,g[2]=Ne,g[3]=Re,y.clearBufferiv(y.COLOR,0,g))}else J|=y.COLOR_BUFFER_BIT}B&&(J|=y.DEPTH_BUFFER_BIT),j&&(J|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),be.dispose(),W.dispose(),ye.dispose(),Z.dispose(),re.dispose(),Se.dispose(),U.dispose(),ge.dispose(),He.dispose(),G.dispose(),de.dispose(),de.removeEventListener("sessionstart",Kn),de.removeEventListener("sessionend",mf),rr.stop()};function me(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const R=ae.autoReset,B=Ee.enabled,j=Ee.autoUpdate,J=Ee.needsUpdate,z=Ee.type;N(),ae.autoReset=R,Ee.enabled=B,Ee.autoUpdate=j,Ee.needsUpdate=J,Ee.type=z}function fe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function se(R){const B=R.target;B.removeEventListener("dispose",se),Ie(B)}function Ie(R){ke(R),Z.remove(R)}function ke(R){const B=Z.get(R).programs;B!==void 0&&(B.forEach(function(j){G.releaseProgram(j)}),R.isShaderMaterial&&G.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,j,J,z,he){B===null&&(B=De);const Me=z.isMesh&&z.matrixWorld.determinant()<0,Le=jm(R,B,j,J,z);k.setMaterial(J,Me);let Re=j.index,Oe=1;if(J.wireframe===!0){if(Re=S.getWireframeAttribute(j),Re===void 0)return;Oe=2}const ze=j.drawRange,Ne=j.attributes.position;let $e=ze.start*Oe,ot=(ze.start+ze.count)*Oe;he!==null&&($e=Math.max($e,he.start*Oe),ot=Math.min(ot,(he.start+he.count)*Oe)),Re!==null?($e=Math.max($e,0),ot=Math.min(ot,Re.count)):Ne!=null&&($e=Math.max($e,0),ot=Math.min(ot,Ne.count));const Mt=ot-$e;if(Mt<0||Mt===1/0)return;ge.setup(z,J,Le,j,Re);let pt,lt=xe;if(Re!==null&&(pt=A.get(Re),lt=Pe,lt.setIndex(pt)),z.isMesh)J.wireframe===!0?(k.setLineWidth(J.wireframeLinewidth*I()),lt.setMode(y.LINES)):lt.setMode(y.TRIANGLES);else if(z.isLine){let Fe=J.linewidth;Fe===void 0&&(Fe=1),k.setLineWidth(Fe*I()),z.isLineSegments?lt.setMode(y.LINES):z.isLineLoop?lt.setMode(y.LINE_LOOP):lt.setMode(y.LINE_STRIP)}else z.isPoints?lt.setMode(y.POINTS):z.isSprite&&lt.setMode(y.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)vo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Fe=z._multiDrawStarts,gt=z._multiDrawCounts,Qe=z._multiDrawCount,mn=Re?A.get(Re).bytesPerElement:1,Fr=Z.get(J).currentProgram.getUniforms();for(let _n=0;_n<Qe;_n++)Fr.setValue(y,"_gl_DrawID",_n),lt.render(Fe[_n]/mn,gt[_n])}else if(z.isInstancedMesh)lt.renderInstances($e,Mt,z.count);else if(j.isInstancedBufferGeometry){const Fe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,gt=Math.min(j.instanceCount,Fe);lt.renderInstances($e,Mt,gt)}else lt.render($e,Mt)};function ht(R,B,j){R.transparent===!0&&R.side===Mi&&R.forceSinglePass===!1?(R.side=hn,R.needsUpdate=!0,Do(R,B,j),R.side=er,R.needsUpdate=!0,Do(R,B,j),R.side=Mi):Do(R,B,j)}this.compile=function(R,B,j=null){j===null&&(j=R),m=ye.get(j),m.init(B),T.push(m),j.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),R!==j&&R.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();const J=new Set;return R.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const he=z.material;if(he)if(Array.isArray(he))for(let Me=0;Me<he.length;Me++){const Le=he[Me];ht(Le,j,z),J.add(Le)}else ht(he,j,z),J.add(he)}),m=T.pop(),J},this.compileAsync=function(R,B,j=null){const J=this.compile(R,B,j);return new Promise(z=>{function he(){if(J.forEach(function(Me){Z.get(Me).currentProgram.isReady()&&J.delete(Me)}),J.size===0){z(R);return}setTimeout(he,10)}ee.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let it=null;function li(R){it&&it(R)}function Kn(){rr.stop()}function mf(){rr.start()}const rr=new Wm;rr.setAnimationLoop(li),typeof self<"u"&&rr.setContext(self),this.setAnimationLoop=function(R){it=R,de.setAnimationLoop(R),R===null?rr.stop():rr.start()},de.addEventListener("sessionstart",Kn),de.addEventListener("sessionend",mf),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(B),B=de.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,B,C),m=ye.get(R,T.length),m.init(B),T.push(m),oe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ye.setFromProjectionMatrix(oe,ri,B.reversedDepth),ie=this.localClippingEnabled,Xe=le.init(this.clippingPlanes,ie),_=W.get(R,E.length),_.init(),E.push(_),de.enabled===!0&&de.isPresenting===!0){const he=x.xr.getDepthSensingMesh();he!==null&&sl(he,B,-1/0,x.sortObjects)}sl(R,B,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(pe,_e),Ke=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,Ke&&be.addToRenderList(_,R),this.info.render.frame++,Xe===!0&&le.beginShadows();const j=m.state.shadowsArray;Ee.render(j,R,B),Xe===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=_.opaque,z=_.transmissive;if(m.setupLights(),B.isArrayCamera){const he=B.cameras;if(z.length>0)for(let Me=0,Le=he.length;Me<Le;Me++){const Re=he[Me];gf(J,z,R,Re)}Ke&&be.render(R);for(let Me=0,Le=he.length;Me<Le;Me++){const Re=he[Me];_f(_,R,Re,Re.viewport)}}else z.length>0&&gf(J,z,R,B),Ke&&be.render(R),_f(_,R,B);C!==null&&D===0&&(ne.updateMultisampleRenderTarget(C),ne.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(x,R,B),ge.resetDefaultState(),M=-1,b=null,T.pop(),T.length>0?(m=T[T.length-1],Xe===!0&&le.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,E.pop(),E.length>0?_=E[E.length-1]:_=null};function sl(R,B,j,J){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Ye.intersectsSprite(R)){J&&Be.setFromMatrixPosition(R.matrixWorld).applyMatrix4(oe);const Me=U.update(R),Le=R.material;Le.visible&&_.push(R,Me,Le,j,Be.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Ye.intersectsObject(R))){const Me=U.update(R),Le=R.material;if(J&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Be.copy(R.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Be.copy(Me.boundingSphere.center)),Be.applyMatrix4(R.matrixWorld).applyMatrix4(oe)),Array.isArray(Le)){const Re=Me.groups;for(let Oe=0,ze=Re.length;Oe<ze;Oe++){const Ne=Re[Oe],$e=Le[Ne.materialIndex];$e&&$e.visible&&_.push(R,Me,$e,j,Be.z,Ne)}}else Le.visible&&_.push(R,Me,Le,j,Be.z,null)}}const he=R.children;for(let Me=0,Le=he.length;Me<Le;Me++)sl(he[Me],B,j,J)}function _f(R,B,j,J){const z=R.opaque,he=R.transmissive,Me=R.transparent;m.setupLightsView(j),Xe===!0&&le.setGlobalState(x.clippingPlanes,j),J&&k.viewport(L.copy(J)),z.length>0&&Po(z,B,j),he.length>0&&Po(he,B,j),Me.length>0&&Po(Me,B,j),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function gf(R,B,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[J.id]===void 0&&(m.state.transmissionRenderTarget[J.id]=new Ir(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?To:Ci,minFilter:Tr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const he=m.state.transmissionRenderTarget[J.id],Me=J.viewport||L;he.setSize(Me.z*x.transmissionResolutionScale,Me.w*x.transmissionResolutionScale);const Le=x.getRenderTarget(),Re=x.getActiveCubeFace(),Oe=x.getActiveMipmapLevel();x.setRenderTarget(he),x.getClearColor(Q),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),Ke&&be.render(j);const ze=x.toneMapping;x.toneMapping=$i;const Ne=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),m.setupLightsView(J),Xe===!0&&le.setGlobalState(x.clippingPlanes,J),Po(R,j,J),ne.updateMultisampleRenderTarget(he),ne.updateRenderTargetMipmap(he),ee.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let ot=0,Mt=B.length;ot<Mt;ot++){const pt=B[ot],lt=pt.object,Fe=pt.geometry,gt=pt.material,Qe=pt.group;if(gt.side===Mi&&lt.layers.test(J.layers)){const mn=gt.side;gt.side=hn,gt.needsUpdate=!0,vf(lt,j,J,Fe,gt,Qe),gt.side=mn,gt.needsUpdate=!0,$e=!0}}$e===!0&&(ne.updateMultisampleRenderTarget(he),ne.updateRenderTargetMipmap(he))}x.setRenderTarget(Le,Re,Oe),x.setClearColor(Q,$),Ne!==void 0&&(J.viewport=Ne),x.toneMapping=ze}function Po(R,B,j){const J=B.isScene===!0?B.overrideMaterial:null;for(let z=0,he=R.length;z<he;z++){const Me=R[z],Le=Me.object,Re=Me.geometry,Oe=Me.group;let ze=Me.material;ze.allowOverride===!0&&J!==null&&(ze=J),Le.layers.test(j.layers)&&vf(Le,B,j,Re,ze,Oe)}}function vf(R,B,j,J,z,he){R.onBeforeRender(x,B,j,J,z,he),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),z.onBeforeRender(x,B,j,J,R,he),z.transparent===!0&&z.side===Mi&&z.forceSinglePass===!1?(z.side=hn,z.needsUpdate=!0,x.renderBufferDirect(j,B,J,z,R,he),z.side=er,z.needsUpdate=!0,x.renderBufferDirect(j,B,J,z,R,he),z.side=Mi):x.renderBufferDirect(j,B,J,z,R,he),R.onAfterRender(x,B,j,J,z,he)}function Do(R,B,j){B.isScene!==!0&&(B=De);const J=Z.get(R),z=m.state.lights,he=m.state.shadowsArray,Me=z.state.version,Le=G.getParameters(R,z.state,he,B,j),Re=G.getProgramCacheKey(Le);let Oe=J.programs;J.environment=R.isMeshStandardMaterial?B.environment:null,J.fog=B.fog,J.envMap=(R.isMeshStandardMaterial?Se:re).get(R.envMap||J.environment),J.envMapRotation=J.environment!==null&&R.envMap===null?B.environmentRotation:R.envMapRotation,Oe===void 0&&(R.addEventListener("dispose",se),Oe=new Map,J.programs=Oe);let ze=Oe.get(Re);if(ze!==void 0){if(J.currentProgram===ze&&J.lightsStateVersion===Me)return Sf(R,Le),ze}else Le.uniforms=G.getUniforms(R),R.onBeforeCompile(Le,x),ze=G.acquireProgram(Le,Re),Oe.set(Re,ze),J.uniforms=Le.uniforms;const Ne=J.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ne.clippingPlanes=le.uniform),Sf(R,Le),J.needsLights=Jm(R),J.lightsStateVersion=Me,J.needsLights&&(Ne.ambientLightColor.value=z.state.ambient,Ne.lightProbe.value=z.state.probe,Ne.directionalLights.value=z.state.directional,Ne.directionalLightShadows.value=z.state.directionalShadow,Ne.spotLights.value=z.state.spot,Ne.spotLightShadows.value=z.state.spotShadow,Ne.rectAreaLights.value=z.state.rectArea,Ne.ltc_1.value=z.state.rectAreaLTC1,Ne.ltc_2.value=z.state.rectAreaLTC2,Ne.pointLights.value=z.state.point,Ne.pointLightShadows.value=z.state.pointShadow,Ne.hemisphereLights.value=z.state.hemi,Ne.directionalShadowMap.value=z.state.directionalShadowMap,Ne.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ne.spotShadowMap.value=z.state.spotShadowMap,Ne.spotLightMatrix.value=z.state.spotLightMatrix,Ne.spotLightMap.value=z.state.spotLightMap,Ne.pointShadowMap.value=z.state.pointShadowMap,Ne.pointShadowMatrix.value=z.state.pointShadowMatrix),J.currentProgram=ze,J.uniformsList=null,ze}function xf(R){if(R.uniformsList===null){const B=R.currentProgram.getUniforms();R.uniformsList=Sa.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function Sf(R,B){const j=Z.get(R);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function jm(R,B,j,J,z){B.isScene!==!0&&(B=De),ne.resetTextureUnits();const he=B.fog,Me=J.isMeshStandardMaterial?B.environment:null,Le=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ts,Re=(J.isMeshStandardMaterial?Se:re).get(J.envMap||Me),Oe=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ze=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ne=!!j.morphAttributes.position,$e=!!j.morphAttributes.normal,ot=!!j.morphAttributes.color;let Mt=$i;J.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Mt=x.toneMapping);const pt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,lt=pt!==void 0?pt.length:0,Fe=Z.get(J),gt=m.state.lights;if(Xe===!0&&(ie===!0||R!==b)){const Kt=R===b&&J.id===M;le.setState(J,R,Kt)}let Qe=!1;J.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==gt.state.version||Fe.outputColorSpace!==Le||z.isBatchedMesh&&Fe.batching===!1||!z.isBatchedMesh&&Fe.batching===!0||z.isBatchedMesh&&Fe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Fe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Fe.instancing===!1||!z.isInstancedMesh&&Fe.instancing===!0||z.isSkinnedMesh&&Fe.skinning===!1||!z.isSkinnedMesh&&Fe.skinning===!0||z.isInstancedMesh&&Fe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Fe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Fe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Fe.instancingMorph===!1&&z.morphTexture!==null||Fe.envMap!==Re||J.fog===!0&&Fe.fog!==he||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==le.numPlanes||Fe.numIntersection!==le.numIntersection)||Fe.vertexAlphas!==Oe||Fe.vertexTangents!==ze||Fe.morphTargets!==Ne||Fe.morphNormals!==$e||Fe.morphColors!==ot||Fe.toneMapping!==Mt||Fe.morphTargetsCount!==lt)&&(Qe=!0):(Qe=!0,Fe.__version=J.version);let mn=Fe.currentProgram;Qe===!0&&(mn=Do(J,B,z));let Fr=!1,_n=!1,Cs=!1;const vt=mn.getUniforms(),Cn=Fe.uniforms;if(k.useProgram(mn.program)&&(Fr=!0,_n=!0,Cs=!0),J.id!==M&&(M=J.id,_n=!0),Fr||b!==R){k.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),vt.setValue(y,"projectionMatrix",R.projectionMatrix),vt.setValue(y,"viewMatrix",R.matrixWorldInverse);const nn=vt.map.cameraPosition;nn!==void 0&&nn.setValue(y,we.setFromMatrixPosition(R.matrixWorld)),Y.logarithmicDepthBuffer&&vt.setValue(y,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&vt.setValue(y,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,_n=!0,Cs=!0)}if(z.isSkinnedMesh){vt.setOptional(y,z,"bindMatrix"),vt.setOptional(y,z,"bindMatrixInverse");const Kt=z.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),vt.setValue(y,"boneTexture",Kt.boneTexture,ne))}z.isBatchedMesh&&(vt.setOptional(y,z,"batchingTexture"),vt.setValue(y,"batchingTexture",z._matricesTexture,ne),vt.setOptional(y,z,"batchingIdTexture"),vt.setValue(y,"batchingIdTexture",z._indirectTexture,ne),vt.setOptional(y,z,"batchingColorTexture"),z._colorsTexture!==null&&vt.setValue(y,"batchingColorTexture",z._colorsTexture,ne));const Pn=j.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&ce.update(z,j,mn),(_n||Fe.receiveShadow!==z.receiveShadow)&&(Fe.receiveShadow=z.receiveShadow,vt.setValue(y,"receiveShadow",z.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Cn.envMap.value=Re,Cn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&B.environment!==null&&(Cn.envMapIntensity.value=B.environmentIntensity),_n&&(vt.setValue(y,"toneMappingExposure",x.toneMappingExposure),Fe.needsLights&&Zm(Cn,Cs),he&&J.fog===!0&&te.refreshFogUniforms(Cn,he),te.refreshMaterialUniforms(Cn,J,H,K,m.state.transmissionRenderTarget[R.id]),Sa.upload(y,xf(Fe),Cn,ne)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Sa.upload(y,xf(Fe),Cn,ne),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&vt.setValue(y,"center",z.center),vt.setValue(y,"modelViewMatrix",z.modelViewMatrix),vt.setValue(y,"normalMatrix",z.normalMatrix),vt.setValue(y,"modelMatrix",z.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Kt=J.uniformsGroups;for(let nn=0,ol=Kt.length;nn<ol;nn++){const sr=Kt[nn];He.update(sr,mn),He.bind(sr,mn)}}return mn}function Zm(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function Jm(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,B,j){const J=Z.get(R);J.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Z.get(R.texture).__webglTexture=B,Z.get(R.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:j,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,B){const j=Z.get(R);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0};const Qm=y.createFramebuffer();this.setRenderTarget=function(R,B=0,j=0){C=R,P=B,D=j;let J=!0,z=null,he=!1,Me=!1;if(R){const Re=Z.get(R);if(Re.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(y.FRAMEBUFFER,null),J=!1;else if(Re.__webglFramebuffer===void 0)ne.setupRenderTarget(R);else if(Re.__hasExternalTextures)ne.rebindTextures(R,Z.get(R.texture).__webglTexture,Z.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ne=R.depthTexture;if(Re.__boundDepthTexture!==Ne){if(Ne!==null&&Z.has(Ne)&&(R.width!==Ne.image.width||R.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(R)}}const Oe=R.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Me=!0);const ze=Z.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ze[B])?z=ze[B][j]:z=ze[B],he=!0):R.samples>0&&ne.useMultisampledRTT(R)===!1?z=Z.get(R).__webglMultisampledFramebuffer:Array.isArray(ze)?z=ze[j]:z=ze,L.copy(R.viewport),F.copy(R.scissor),O=R.scissorTest}else L.copy(Te).multiplyScalar(H).floor(),F.copy(Ue).multiplyScalar(H).floor(),O=Je;if(j!==0&&(z=Qm),k.bindFramebuffer(y.FRAMEBUFFER,z)&&J&&k.drawBuffers(R,z),k.viewport(L),k.scissor(F),k.setScissorTest(O),he){const Re=Z.get(R.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+B,Re.__webglTexture,j)}else if(Me){const Re=B;for(let Oe=0;Oe<R.textures.length;Oe++){const ze=Z.get(R.textures[Oe]);y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0+Oe,ze.__webglTexture,j,Re)}}else if(R!==null&&j!==0){const Re=Z.get(R.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Re.__webglTexture,j)}M=-1},this.readRenderTargetPixels=function(R,B,j,J,z,he,Me,Le=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Z.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Me!==void 0&&(Re=Re[Me]),Re){k.bindFramebuffer(y.FRAMEBUFFER,Re);try{const Oe=R.textures[Le],ze=Oe.format,Ne=Oe.type;if(!Y.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Y.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-J&&j>=0&&j<=R.height-z&&(R.textures.length>1&&y.readBuffer(y.COLOR_ATTACHMENT0+Le),y.readPixels(B,j,J,z,Ae.convert(ze),Ae.convert(Ne),he))}finally{const Oe=C!==null?Z.get(C).__webglFramebuffer:null;k.bindFramebuffer(y.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(R,B,j,J,z,he,Me,Le=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Z.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Me!==void 0&&(Re=Re[Me]),Re)if(B>=0&&B<=R.width-J&&j>=0&&j<=R.height-z){k.bindFramebuffer(y.FRAMEBUFFER,Re);const Oe=R.textures[Le],ze=Oe.format,Ne=Oe.type;if(!Y.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Y.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,$e),y.bufferData(y.PIXEL_PACK_BUFFER,he.byteLength,y.STREAM_READ),R.textures.length>1&&y.readBuffer(y.COLOR_ATTACHMENT0+Le),y.readPixels(B,j,J,z,Ae.convert(ze),Ae.convert(Ne),0);const ot=C!==null?Z.get(C).__webglFramebuffer:null;k.bindFramebuffer(y.FRAMEBUFFER,ot);const Mt=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await Kx(y,Mt,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,$e),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,he),y.deleteBuffer($e),y.deleteSync(Mt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,B=null,j=0){const J=Math.pow(2,-j),z=Math.floor(R.image.width*J),he=Math.floor(R.image.height*J),Me=B!==null?B.x:0,Le=B!==null?B.y:0;ne.setTexture2D(R,0),y.copyTexSubImage2D(y.TEXTURE_2D,j,0,0,Me,Le,z,he),k.unbindTexture()};const e_=y.createFramebuffer(),t_=y.createFramebuffer();this.copyTextureToTexture=function(R,B,j=null,J=null,z=0,he=null){he===null&&(z!==0?(vo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=z,z=0):he=0);let Me,Le,Re,Oe,ze,Ne,$e,ot,Mt;const pt=R.isCompressedTexture?R.mipmaps[he]:R.image;if(j!==null)Me=j.max.x-j.min.x,Le=j.max.y-j.min.y,Re=j.isBox3?j.max.z-j.min.z:1,Oe=j.min.x,ze=j.min.y,Ne=j.isBox3?j.min.z:0;else{const Pn=Math.pow(2,-z);Me=Math.floor(pt.width*Pn),Le=Math.floor(pt.height*Pn),R.isDataArrayTexture?Re=pt.depth:R.isData3DTexture?Re=Math.floor(pt.depth*Pn):Re=1,Oe=0,ze=0,Ne=0}J!==null?($e=J.x,ot=J.y,Mt=J.z):($e=0,ot=0,Mt=0);const lt=Ae.convert(B.format),Fe=Ae.convert(B.type);let gt;B.isData3DTexture?(ne.setTexture3D(B,0),gt=y.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ne.setTexture2DArray(B,0),gt=y.TEXTURE_2D_ARRAY):(ne.setTexture2D(B,0),gt=y.TEXTURE_2D),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,B.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,B.unpackAlignment);const Qe=y.getParameter(y.UNPACK_ROW_LENGTH),mn=y.getParameter(y.UNPACK_IMAGE_HEIGHT),Fr=y.getParameter(y.UNPACK_SKIP_PIXELS),_n=y.getParameter(y.UNPACK_SKIP_ROWS),Cs=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,pt.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,pt.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Oe),y.pixelStorei(y.UNPACK_SKIP_ROWS,ze),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Ne);const vt=R.isDataArrayTexture||R.isData3DTexture,Cn=B.isDataArrayTexture||B.isData3DTexture;if(R.isDepthTexture){const Pn=Z.get(R),Kt=Z.get(B),nn=Z.get(Pn.__renderTarget),ol=Z.get(Kt.__renderTarget);k.bindFramebuffer(y.READ_FRAMEBUFFER,nn.__webglFramebuffer),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,ol.__webglFramebuffer);for(let sr=0;sr<Re;sr++)vt&&(y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Z.get(R).__webglTexture,z,Ne+sr),y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Z.get(B).__webglTexture,he,Mt+sr)),y.blitFramebuffer(Oe,ze,Me,Le,$e,ot,Me,Le,y.DEPTH_BUFFER_BIT,y.NEAREST);k.bindFramebuffer(y.READ_FRAMEBUFFER,null),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(z!==0||R.isRenderTargetTexture||Z.has(R)){const Pn=Z.get(R),Kt=Z.get(B);k.bindFramebuffer(y.READ_FRAMEBUFFER,e_),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,t_);for(let nn=0;nn<Re;nn++)vt?y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Pn.__webglTexture,z,Ne+nn):y.framebufferTexture2D(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Pn.__webglTexture,z),Cn?y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Kt.__webglTexture,he,Mt+nn):y.framebufferTexture2D(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Kt.__webglTexture,he),z!==0?y.blitFramebuffer(Oe,ze,Me,Le,$e,ot,Me,Le,y.COLOR_BUFFER_BIT,y.NEAREST):Cn?y.copyTexSubImage3D(gt,he,$e,ot,Mt+nn,Oe,ze,Me,Le):y.copyTexSubImage2D(gt,he,$e,ot,Oe,ze,Me,Le);k.bindFramebuffer(y.READ_FRAMEBUFFER,null),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else Cn?R.isDataTexture||R.isData3DTexture?y.texSubImage3D(gt,he,$e,ot,Mt,Me,Le,Re,lt,Fe,pt.data):B.isCompressedArrayTexture?y.compressedTexSubImage3D(gt,he,$e,ot,Mt,Me,Le,Re,lt,pt.data):y.texSubImage3D(gt,he,$e,ot,Mt,Me,Le,Re,lt,Fe,pt):R.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,he,$e,ot,Me,Le,lt,Fe,pt.data):R.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,he,$e,ot,pt.width,pt.height,lt,pt.data):y.texSubImage2D(y.TEXTURE_2D,he,$e,ot,Me,Le,lt,Fe,pt);y.pixelStorei(y.UNPACK_ROW_LENGTH,Qe),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,mn),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Fr),y.pixelStorei(y.UNPACK_SKIP_ROWS,_n),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Cs),he===0&&B.generateMipmaps&&y.generateMipmap(gt),k.unbindTexture()},this.initRenderTarget=function(R){Z.get(R).__webglFramebuffer===void 0&&ne.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ne.setTextureCube(R,0):R.isData3DTexture?ne.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ne.setTexture2DArray(R,0):ne.setTexture2D(R,0),k.unbindTexture()},this.resetState=function(){P=0,D=0,C=null,k.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}function Km(){return{initBackgroundScene:(e="canvas-container")=>{const t=typeof e=="string"?document.getElementById(e):e;if(!t)return;t.innerHTML="";const i=new SS,r=new Un(75,t.clientWidth/t.clientHeight,.1,1e3);r.position.z=12;const s=new pb({antialias:!0,alpha:!0});s.setSize(t.clientWidth,t.clientHeight),s.setClearColor(0,0),t.appendChild(s.domElement);const o=new PS(16777215,.7);i.add(o);const a=new Va(2.5,0),l=new gu({color:5213439,linewidth:2}),u=new zh(new Vh(a),l);i.add(u);const f=new Va(5.5,0),h=new gu({color:16777215,linewidth:2}),d=new zh(new Vh(f),h);i.add(d);const p=new Hn,v=600,g=new Float32Array(v*3);for(let O=0;O<v;O++){const Q=Math.acos(2*Math.random()-1),$=2*Math.PI*Math.random(),X=7.5+Math.random()*2.5;g[O*3]=X*Math.sin(Q)*Math.cos($),g[O*3+1]=X*Math.sin(Q)*Math.sin($),g[O*3+2]=X*Math.cos(Q)}p.setAttribute("position",new $n(g,3));const _=new km({size:.08,color:11766015,transparent:!0,opacity:.7}),m=new bS(p,_);i.add(m);const E=()=>{r.aspect=t.clientWidth/t.clientHeight,r.updateProjectionMatrix(),s.setSize(t.clientWidth,t.clientHeight)};window.addEventListener("resize",E);let T=!1,x=0,w=0,P={x:0,y:0};const D=O=>{T=!0,x=O.clientX,w=O.clientY},C=()=>{T=!1},M=O=>{if(!T)return;const Q=(O.clientX-x)*.01,$=(O.clientY-w)*.01;x=O.clientX,w=O.clientY,P.x+=$,P.y+=Q,Dt.to(u.rotation,{x:P.x,y:P.y,duration:.5,overwrite:!0}),Dt.to(d.rotation,{x:P.x*.5,y:P.y*.5,duration:.7,overwrite:!0}),Dt.to(m.rotation,{y:P.y*.3,duration:.8,overwrite:!0})};s.domElement.addEventListener("pointerdown",D),window.addEventListener("pointerup",C),window.addEventListener("pointermove",M);let b=0,L=!1;const F=()=>{if(L)return;requestAnimationFrame(F),u.rotation.x+=.012,u.rotation.y+=.018,d.rotation.x+=.003,d.rotation.y+=.004,b+=.005;const O=p.attributes.position;for(let Q=0;Q<v;Q++){const $=Q*3;O.array[$+0]+=Math.sin(b+Q)*.002,O.array[$+1]+=Math.cos(b+Q*1.2)*.002}O.needsUpdate=!0,m.rotation.y+=.0015,s.render(i,r)};return F(),()=>{L=!0,window.removeEventListener("resize",E),s.domElement.removeEventListener("pointerdown",D),window.removeEventListener("pointerup",C),window.removeEventListener("pointermove",M),t&&s&&s.domElement&&t.contains(s.domElement)&&t.removeChild(s.domElement),p.dispose(),_.dispose(),a.dispose(),l.dispose(),f.dispose(),h.dispose(),s.dispose()}}}}const mb={class:"home",id:"home"},_b={class:"hero"},gb={class:"container"},vb={class:"hero__content"},xb={class:"categories"},Sb={class:"container"},Mb={class:"categories__grid"},yb=["onMouseenter","onMouseleave"],Eb={class:"category-card__icon"},Tb={class:"category-card__title"},bb={class:"category-card__description"},Ab={id:"articles",class:"articles"},wb={class:"container"},Rb={class:"articles__grid"},Cb={__name:"Home",setup(n){const e=wt([{id:1,title:"golang开发",description:"探索Golang语言与框架",icon:"fa fa-code",color:"blue"},{id:2,title:"3D技术",description:"Three.js与WebGL实践指南",icon:"fa fa-cubes",color:"purple"},{id:3,title:"前端开发",description:"现代前端框架与工具",icon:"fa fa-mobile",color:"green"},{id:4,title:"云计算",description:"服务架构与云原生技术",icon:"fa fa-cloud",color:"yellow"}]),t=wt([{id:1,title:"Three.js性能优化实战指南",description:"探索提升Three.js应用性能的关键技术，包括模型简化、材质优化和渲染策略，让你的3D应用在各种设备上流畅运行。",category:"3D技术",date:"2023-10-10",image:"https://picsum.photos/seed/threejs1/600/400",readTime:"8分钟"},{id:2,title:"WebGL底层原理与着色器编程",description:"深入理解WebGL的工作原理，从图形管线到着色器编程，掌握自定义渲染效果的核心技术，打造独特的视觉体验。",category:"WebGL",date:"2023-10-05",image:"https://picsum.photos/seed/webgl2/600/400",readTime:"12分钟"},{id:3,title:"现代前端工程化最佳实践",description:"从模块化设计到自动化测试，从CI/CD到性能监控，全面介绍现代前端工程化的关键环节和最佳实践。",category:"前端开发",date:"2023-09-28",image:"https://picsum.photos/seed/frontend3/600/400",readTime:"10分钟"}]),{initBackgroundScene:i}=Km(),r=wt(null),s=wt(null),o=wt([]),a=wt([]);return So(()=>{Dt.from(r.value,{y:40,opacity:0,duration:.8,ease:"power3.out"}),Dt.from(s.value,{y:30,opacity:0,duration:.7,delay:.3}),i("demo-canvas"),o.value.forEach((l,u)=>{Dt.from(l,{y:40,opacity:0,scale:.8,duration:.6,delay:.2+u*.1,ease:"back.out(1.7)"})}),a.value.forEach((l,u)=>{Dt.from(l,{y:30,opacity:0,duration:.7,delay:.5+u*.1,ease:"power2.out"})})}),(l,u)=>(Ft(),Gt("div",mb,[ue("section",_b,[ue("div",gb,[ue("div",vb,[ue("h1",{class:"hero__title",ref_key:"heroTitle",ref:r},[...u[0]||(u[0]=[ls(" 探索",-1),ue("span",{class:"text-gradient"},"前沿技术",-1),ls("的无限可能 ",-1)])],512),ue("p",{class:"hero__description",ref_key:"heroDesc",ref:s}," 深入解析编程、设计与创新，带你领略技术世界的精彩 ",512),u[1]||(u[1]=ue("div",{class:"hero__actions"},[ue("a",{href:"#articles",class:"btn btn--primary"},"浏览文章"),ue("a",{href:"#demos",class:"btn btn--secondary"},"查看技术演示")],-1))])])]),ue("section",xb,[ue("div",Sb,[ue("div",Mb,[(Ft(!0),Gt(Mn,null,Aa(e.value,(f,h)=>(Ft(),Gt("div",{key:f.id,class:on(["category-card",f.color]),ref_for:!0,ref:"el => categoryCardRefs.value[idx] = el",onMouseenter:d=>Nt(Dt).to(o.value.value[h],{scale:1.08,boxShadow:"0 8px 32px rgba(79,140,255,0.18)",duration:.3}),onMouseleave:d=>Nt(Dt).to(o.value.value[h],{scale:1,boxShadow:"0 0 0 rgba(0,0,0,0)",duration:.3})},[ue("div",Eb,[ue("i",{class:on(f.icon)},null,2)]),ue("h3",Tb,Vt(f.title),1),ue("p",bb,Vt(f.description),1)],42,yb))),128))])])]),u[3]||(u[3]=Ou('<section id="demos" class="demos" data-v-2694a379><div class="container" data-v-2694a379><div class="section-header" data-v-2694a379><h2 class="section-header__title" data-v-2694a379>技术演示</h2><p class="section-header__link" data-v-2694a379>交互式 Three.js 示例</p></div><div class="demos__canvas" id="demo-canvas" style="height:360px;border-radius:8px;overflow:hidden;background:transparent;" data-v-2694a379></div></div></section>',1)),ue("section",Ab,[ue("div",wb,[u[2]||(u[2]=ue("div",{class:"section-header"},[ue("h2",{class:"section-header__title"},"最新技术文章"),ue("a",{href:"#",class:"section-header__link"},[ls(" 查看全部 "),ue("i",{class:"fa fa-arrow-right"})])],-1)),ue("div",Rb,[(Ft(!0),Gt(Mn,null,Aa(t.value,(f,h)=>(Ft(),hp(rx,{key:f.id,article:f,ref_for:!0,ref:"el => articleCardRefs.value[idx] = el"},null,8,["article"]))),128))])])])]))}},Pb=yo(Cb,[["__scopeId","data-v-2694a379"]]),Db={key:0,class:"music-player__collapsed"},Lb={key:1,class:"music-player__expanded"},Ib={class:"music-player__header"},Ub={class:"music-player__current"},Nb={class:"current-song"},Fb=["src","alt"],Ob={class:"current-song__info"},Bb={class:"current-song__title"},zb={class:"current-song__artist"},Hb={class:"music-progress"},kb={class:"music-progress__time"},Vb={class:"music-controls"},Gb={class:"playlist"},Wb={class:"playlist__items"},Xb=["onClick"],qb=["src","alt"],Yb={class:"playlist__item-info"},$b={class:"playlist__item-title"},Kb={class:"playlist__item-artist"},jb={class:"playlist__item-duration"},Zb={key:0,class:"lyrics"},Jb={class:"lyrics__container"},Qb={__name:"MusicPlayer",props:{expanded:Boolean,currentSong:Object,isPlaying:Boolean,currentTime:Number,duration:Number,progressPercent:Number,playlist:Array,currentSongIndex:Number,lyrics:Array,currentLyricIndex:Number,lyricsOffset:Number},emits:["toggle-player","toggle-play","play-song","next-song","previous-song","seek-audio"],setup(n,{emit:e}){const t=n,i=e,r=wt(!1);Ar(()=>t.currentSong,f=>{r.value=!1}),Ar(()=>t.isPlaying,f=>{f&&(c,showLyris.value=!0)}),Ar(()=>t.expanded,f=>{f?Dt.from(".music-player__expanded",{y:60,opacity:0,duration:.5,ease:"power2.out"}):Dt.to(".music-player__expanded",{y:60,opacity:0,duration:.4,ease:"power2.in",onComplete:()=>{Dt.set(".music-player__expanded",{y:0,opacity:1})}})});const s=f=>{if(!f||isNaN(f))return"0:00";const h=Math.floor(f/60),d=Math.floor(f%60);return`${h}:${d<10?"0":""}${d}`},o=f=>{i("seek-audio",f,void 0)},a=()=>{i("toggle-play")},l=f=>{i("play-song",f),r.value=!0};So(()=>{Dt.from(".lyrics__close",{scale:.5,opacity:0,duration:.5,ease:"back.out(1.7)"})});const u=()=>{Dt.to(".lyrics",{opacity:0,y:-30,duration:.4,onComplete:()=>{r.value=!1,Dt.set(".lyrics",{opacity:1,y:0})}})};return(f,h)=>(Ft(),Gt("div",{class:on(["music-player",{expanded:n.expanded}])},[n.expanded?(Ft(),Gt("div",Lb,[ue("div",Ib,[h[6]||(h[6]=ue("h3",{class:"music-player__title"},"音乐播放器",-1)),ue("button",{class:"music-player__close",onClick:h[1]||(h[1]=d=>f.$emit("toggle-player"))},[...h[5]||(h[5]=[ue("i",{class:"fa fa-chevron-right"},null,-1)])])]),ue("div",Ub,[ue("div",Nb,[ue("img",{src:n.currentSong.cover,alt:n.currentSong.title,class:"current-song__cover"},null,8,Fb),ue("div",Ob,[ue("h4",Bb,Vt(n.currentSong.title),1),ue("p",zb,Vt(n.currentSong.artist),1)])]),ue("div",Hb,[ue("div",kb,[ue("span",null,Vt(s(n.currentTime)),1),ue("span",null,Vt(s(n.duration)),1)]),ue("div",{class:"music-progress__bar",onClick:o},[ue("div",{class:"music-progress__fill",style:eo({width:n.progressPercent+"%"})},null,4)])])]),ue("div",Vb,[ue("button",{class:"music-controls__btn",onClick:h[2]||(h[2]=d=>f.$emit("previous-song"))},[...h[7]||(h[7]=[ue("i",{class:"fa fa-step-backward"},null,-1)])]),ue("button",{class:"music-controls__btn music-controls__play",onClick:a},[ue("i",{class:on(["fa",n.isPlaying?"fa-pause":"fa-play"])},null,2)]),ue("button",{class:"music-controls__btn",onClick:h[3]||(h[3]=d=>f.$emit("next-song"))},[...h[8]||(h[8]=[ue("i",{class:"fa fa-step-forward"},null,-1)])])]),ue("div",Gb,[h[9]||(h[9]=ue("h4",{class:"playlist__title"},"播放列表",-1)),ue("div",Wb,[(Ft(!0),Gt(Mn,null,Aa(n.playlist,(d,p)=>(Ft(),Gt("div",{key:p,class:on(["playlist__item",{active:n.currentSongIndex===p}]),onClick:v=>l(p)},[ue("img",{src:d.cover,alt:d.title,class:"playlist__item-cover"},null,8,qb),ue("div",Yb,[ue("p",$b,Vt(d.title),1),ue("p",Kb,Vt(d.artist),1)]),ue("span",jb,Vt(d.duration),1)],10,Xb))),128))])]),r.value?(Ft(),Gt("div",Zb,[ue("div",{class:"lyrics__header"},[h[11]||(h[11]=ue("h4",{class:"lyrics__title"},"歌词",-1)),ue("button",{class:"lyrics__close",onClick:u,title:"关闭歌词"},[...h[10]||(h[10]=[ue("i",{class:"fa fa-times"},null,-1)])])]),ue("div",Jb,[ue("ul",{class:"lyrics__list",style:eo({transform:`translateY(-${n.lyricsOffset}px)`})},[(Ft(!0),Gt(Mn,null,Aa(n.lyrics,(d,p)=>(Ft(),Gt("li",{key:p,class:on({active:n.currentLyricIndex===p})},Vt(d.text),3))),128))],4)])])):Vg("",!0)])):(Ft(),Gt("div",Db,[ue("button",{class:"music-player__toggle",onClick:h[0]||(h[0]=d=>f.$emit("toggle-player"))},[...h[4]||(h[4]=[ue("i",{class:"fa fa-music"},null,-1)])])]))],2))}},eA=yo(Qb,[["__scopeId","data-v-a0b00995"]]),tA=[{title:"踊り子",artist:"Vaundy",src:"/audio/Vaundy - 踊り子.flac",cover:"https://picsum.photos/seed/music1/100/100",duration:"3:45",lyrics:`[00:00.00]踊り子 - Vaundy
[00:00.00]   
[00:00.00]词：Vaundy
[00:01.00]   
[00:01.00]曲：Vaundy
[00:12.00]   
[00:12.00]ねぇ どっかに置いてきたような
[00:17.00]呐 搁浅在心底某个角落的事情
[00:17.00]事が一つ二つ浮いているけど
[00:24.00]一件两件地开始浮现在脑海
[00:24.00]ねぇ ちゃんと拾っておこう
[00:29.00]呐 把它们一一捡起来收好吧
[00:29.00]はじけて忘れてしまう前に
[00:36.00]在脑容量难以负荷 完全遗忘之前
[00:36.00]回り出したあの子と僕の未来が
[00:42.00]开始旋转的她 还有我的未来
[00:42.00]止まりどっかでまたやり直せたら
[00:48.00]一度停滞后 要是还能重新开始
[00:48.00]回り出したあの子と僕が被害者
[00:55.00]开始旋转的她和我 要是还能
[00:55.00]づらでどっかを
[00:57.00]装作受害人的姿态
[00:57.00]また練り歩けたらな
[01:01.00]再次结伴同行就好了
[01:01.00]とぅるるるとぅるるるとぅるる
[01:04.00]turururu turururu tururu
[01:04.00]とぅるるるとぅるるるとぅるる
[01:07.00]turururu turururu tururu
[01:07.00]とぅるるるとぅるるるとぅるる
[01:10.00]turururu turururu tururu
[01:10.00]とぅるるるとぅるるるとぅるる
[01:13.00]turururu turururu tururu
[01:13.00]あのね 私あなたに会ったの
[01:18.00]听我说 我又和你不期而遇了
[01:18.00]夢の中に置いてきたけどね
[01:25.00]只是我已把那场相逢留在了梦中
[01:25.00]ねぇ どうして私が好きなの
[01:31.00]呐 你为什么会喜欢我呢
[01:31.00]一度しか会ったことがないのにね
[01:37.00]明明我们不过一面之缘而已
[01:37.00]思いを蹴って
[01:39.00]踢却杂念
[01:39.00]二人でしてんだ
[01:40.00]是我们一起做下的决定
[01:40.00]壊れない愛を歌う
[01:43.00]讴歌永远不会毁灭的爱
[01:43.00]言葉を二人に課して
[01:45.00]一同背负话语的重量
[01:45.00]誓いをたてんだ
[01:46.00]许下相同的誓言
[01:46.00]忘れない愛を歌うようにね
[01:50.00]如同讴歌永远不会遗忘的爱
[01:50.00]回り出したあの子と僕の未来が
[01:56.00]开始旋转的她 还有我的未来
[01:56.00]止まりどっかでまたやり直せたら
[02:02.00]一度停滞后 要是还能重新开始
[02:02.00]回り出したあの子と僕が被害者
[02:08.00]开始旋转的她和我 要是还能
[02:08.00]づらでどっかを
[02:10.00]装作受害人的姿态
[02:10.00]また練り歩けたらな
[02:14.00]再次结伴同行就好了
[02:14.00]とぅるるるとぅるるるとぅるる
[02:17.00]turururu turururu tururu
[02:17.00]とぅるるるとぅるるるとぅるる
[02:20.00]turururu turururu tururu
[02:20.00]とぅるるるとぅるるるとぅるる
[02:23.00]turururu turururu tururu
[02:23.00]とぅるるるとぅるるるとぅるる
[02:26.00]turururu turururu tururu
[02:26.00]とぅるるるとぅるるるとぅるる
[02:29.00]turururu turururu tururu
[02:29.00]とぅるるるとぅるるるとぅるる
[02:32.00]turururu turururu tururu
[02:32.00]とぅるるるとぅるるるとぅるる
[02:35.00]turururu turururu tururu
[02:35.00]とぅるるるとぅるるるとぅるる
[02:42.00]turururu turururu tururu
[02:42.00]回り出したあの子と僕の未来が
[02:48.00]开始旋转的她 还有我的未来
[02:48.00]止まりどっかでまたやり直せたら
[02:54.00]一度停滞后 要是还能重新开始
[02:54.00]回り出したあの子と僕が被害者
[03:00.00]开始旋转的她和我 要是还能
[03:00.00]づらでどっかを
[03:02.00]装作受害人的姿态
[03:02.00]また練り歩けたらな
[03:06.00]再次结伴同行就好了
[03:06.00]時代に乗って僕たちは
[03:09.00]跟随着时代的脚步前行的我们
[03:09.00]変わらず愛に生きるだろう
[03:12.00]一定仍会一如从前那般为爱而活吧
[03:12.00]僕らが散って残るのは
[03:15.00]当我们的生命走到尽头 也一定会留下
[03:15.00]変わらぬ愛の歌なんだろうな
[03:18.00]这一支永不改变的爱之歌吧
[03:18.00]時代に乗って僕たちは
[03:21.00]跟随着时代的脚步前行的我们
[03:21.00]変わらず愛に生きるだろう
[03:24.00]一定仍会一如从前那般为爱而活吧
[03:24.00]僕らが散って残るのは
[03:27.00]当我们的生命走到尽头 也一定会留下
[03:27.00]変わらぬ愛の歌なんだろうな
[03:31.00]这一支永不改变的爱之歌吧
[03:31.00]とぅるるるとぅるるるとぅるる
[03:34.00]turururu turururu tururu
[03:34.00]とぅるるるとぅるるるとぅるる
[03:37.00]turururu turururu tururu
[03:37.00]とぅるるるとぅるるるとぅるる
[03:40.00]turururu turururu tururu
[03:40.00]とぅるるるとぅるるるとぅるる
[03:45.00]turururu turururu tururu`},{title:"Lemon",artist:"米津玄師",src:"/audio/sample2.mp3",cover:"https://picsum.photos/seed/music2/100/100",duration:"4:15",lyrics:`[00:00.00]Lemon - 米津玄師
[00:05.00]夢ならばどれほどよかったでしょう
[00:15.00]如果这一切都是梦境该有多好`},{title:"Pretender",artist:"Official髭男dism",src:"/audio/sample3.mp3",cover:"https://picsum.photos/seed/music3/100/100",duration:"5:26",lyrics:`[00:00.00]Pretender - Official髭男dism
[00:10.00]どれだけ強がってたんだろう
[00:20.00]我到底在逞强些什么呢`}];function nA(){const n=wt(!1),e=wt(0),t=wt(0),i=wt(0),r=wt(tA),s=wt([]),o=wt(0),a=wt(null),l={mp3:"audio/mpeg",m4a:"audio/mp4",mp4:"audio/mp4",ogg:"audio/ogg",wav:"audio/wav",flac:"audio/flac"},u=()=>{if(typeof document>"u")return 0;const C=document.createElement("audio");for(let M=0;M<r.value.length;M++){const L=(r.value[M].src||"").split(".").pop().toLowerCase(),F=l[L];if(F&&C.canPlayType(F))return M}return 0};e.value=u();const f=fa(()=>r.value[e.value]||r.value[0]),h=fa(()=>i.value===0?0:t.value/i.value*100),d=fa(()=>o.value*30-150),p=async()=>{if(a.value)if(n.value)a.value.pause(),n.value=!1;else try{const C=a.value.play();C!==void 0&&await C,n.value=!0}catch(C){console.warn("播放失败：",C),n.value=!1}},v=C=>{if(C<0||C>=r.value.length)return;let M=C,b=0;for(;!P(r.value[M].src)&&b<r.value.length;)M=(M+1)%r.value.length,b++;e.value=M,E(r.value[M].lyrics),a.value&&(a.value.src=r.value[M].src),n.value=!0,setTimeout(()=>{a.value&&a.value.play().catch(L=>{console.warn("播放失败:",L)})},100)},g=()=>{let C=(e.value+1)%r.value.length;v(C)},_=()=>{let C=(e.value-1+r.value.length)%r.value.length;v(C)},m=C=>{if(!C||isNaN(C))return"0:00";const M=Math.floor(C/60),b=Math.floor(C%60);return`${M}:${b<10?"0":""}${b}`},E=C=>{if(!C){s.value=[];return}const M=C.split(`
`),b=[];for(let L=0;L<M.length;L++){const O=M[L].split("]");if(O.length<2)continue;const Q=O[0].substring(1),$=O[1];if(!$.trim())continue;const X={time:T(Q),content:$};b.push(X)}s.value=b},T=C=>{const M=C.split(":");return+M[0]*60+ +M[1]},x=()=>{for(let C=0;C<s.value.length;C++)if(t.value<s.value[C].time)return C-1;return s.value.length-1},w=(C,M)=>{if(!a.value)return;const b=C.currentTarget,L=C.offsetX,F=b.clientWidth,O=L/F;a.value.currentTime=O*(M||i.value)},P=C=>{if(!C||typeof document>"u")return!1;const M=document.createElement("audio"),b=C.split(".").pop().toLowerCase(),L=l[b];return L?!!M.canPlayType(L):!1};return(()=>{if(a.value=new Audio,a.value.addEventListener("loadedmetadata",()=>{i.value=a.value.duration}),a.value.addEventListener("timeupdate",()=>{t.value=a.value.currentTime,o.value=x()}),a.value.addEventListener("ended",()=>{g()}),r.value.length>0){const C=u();e.value=C,a.value.src=r.value[C].src,E(r.value[C].lyrics)}})(),Ar(e,async()=>{if(a.value&&r.value[e.value]){const C=r.value[e.value].src;if(P(C)){if(a.value.src=C,n.value)try{await a.value.play()}catch(M){console.warn("自动播放失败：",M),n.value=!1}}else g()}}),{isPlaying:n,currentSongIndex:e,currentTime:t,duration:i,playlist:r,currentSong:f,progressPercent:h,lyrics:s,currentLyricIndex:o,lyricsOffset:d,togglePlay:p,playSong:v,nextSong:g,previousSong:_,seekAudio:w,formatTime:m}}const iA={id:"app"},rA={class:"main-content"},sA={__name:"App",setup(n){const e=wt(!1),t=wt(!1),{isPlaying:i,currentSongIndex:r,currentTime:s,duration:o,playlist:a,currentSong:l,progressPercent:u,lyrics:f,currentLyricIndex:h,lyricsOffset:d,togglePlay:p,playSong:v,nextSong:g,previousSong:_,seekAudio:m}=nA(),E=()=>{e.value=window.scrollY>50},T=()=>{t.value=!t.value},{initBackgroundScene:x}=Km();return So(()=>{window.addEventListener("scroll",E),x()}),Uu(()=>{window.removeEventListener("scroll",E)}),(w,P)=>(Ft(),Gt("div",iA,[P[0]||(P[0]=ue("div",{id:"canvas-container",class:"canvas-container"},null,-1)),an(C0,{scrolled:e.value},null,8,["scrolled"]),ue("main",rA,[an(Pb)]),an(qv),an(eA,{expanded:t.value,"current-song":Nt(l),"is-playing":Nt(i),"current-time":Nt(s),duration:Nt(o),"progress-percent":Nt(u),playlist:Nt(a),"current-song-index":Nt(r),lyrics:Nt(f),"current-lyric-index":Nt(h),"lyrics-offset":Nt(d),onTogglePlayer:T,onTogglePlay:Nt(p),onPlaySong:Nt(v),onNextSong:Nt(g),onPreviousSong:Nt(_),onSeekAudio:Nt(m)},null,8,["expanded","current-song","is-playing","current-time","duration","progress-percent","playlist","current-song-index","lyrics","current-lyric-index","lyrics-offset","onTogglePlay","onPlaySong","onNextSong","onPreviousSong","onSeekAudio"])]))}};y0(sA).mount("#app");
