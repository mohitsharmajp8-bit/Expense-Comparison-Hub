import{R as X,d as H,c as re,g as er}from"./vendor-p0hbqSo2.js";import{j as he}from"./animations-BjiLMTk2.js";function nr(t){var e,n,r="";if(typeof t=="string"||typeof t=="number")r+=t;else if(typeof t=="object")if(Array.isArray(t)){var i=t.length;for(e=0;e<i;e++)t[e]&&(n=nr(t[e]))&&(r&&(r+=" "),r+=n)}else for(n in t)t[n]&&(r&&(r+=" "),r+=n);return r}function Et(){for(var t,e,n=0,r="",i=arguments.length;n<i;n++)(t=arguments[n])&&(e=nr(t))&&(r&&(r+=" "),r+=e);return r}var Xt=t=>typeof t=="number"&&!isNaN(t),Ct=t=>typeof t=="string",kt=t=>typeof t=="function",ni=t=>Ct(t)||Xt(t),Ee=t=>Ct(t)||kt(t)?t:null,ri=(t,e)=>t===!1||Xt(t)&&t>0?t:e,Ce=t=>H.isValidElement(t)||Ct(t)||kt(t)||Xt(t);function ii(t,e,n=300){let{scrollHeight:r,style:i}=t;requestAnimationFrame(()=>{i.minHeight="initial",i.height=r+"px",i.transition=`all ${n}ms`,requestAnimationFrame(()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(e,n)})})}function oi({enter:t,exit:e,appendPosition:n=!1,collapse:r=!0,collapseDuration:i=300}){return function({children:o,position:a,preventExitTransition:l,done:s,nodeRef:c,isIn:u,playToast:p}){let m=n?`${t}--${a}`:t,f=n?`${e}--${a}`:e,y=H.useRef(0);return H.useLayoutEffect(()=>{let x=c.current,S=m.split(" "),k=v=>{v.target===c.current&&(p(),x.removeEventListener("animationend",k),x.removeEventListener("animationcancel",k),y.current===0&&v.type!=="animationcancel"&&x.classList.remove(...S))};x.classList.add(...S),x.addEventListener("animationend",k),x.addEventListener("animationcancel",k)},[]),H.useEffect(()=>{let x=c.current,S=()=>{x.removeEventListener("animationend",S),r?ii(x,s,i):s()};u||(l?S():(y.current=1,x.className+=` ${f}`,x.addEventListener("animationend",S)))},[u]),X.createElement(X.Fragment,null,o)}}function sn(t,e){return{content:rr(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function rr(t,e,n=!1){return H.isValidElement(t)&&!Ct(t.type)?H.cloneElement(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:n}):kt(t)?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:n}):t}function ai({closeToast:t,theme:e,ariaLabel:n="close"}){return X.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:r=>{r.stopPropagation(),t(!0)},"aria-label":n},X.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},X.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function li({delay:t,isRunning:e,closeToast:n,type:r="default",hide:i,className:o,controlledProgress:a,progress:l,rtl:s,isIn:c,theme:u}){let p=i||a&&l===0,m={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};a&&(m.transform=`scaleX(${l})`);let f=Et("Toastify__progress-bar",a?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${u}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":s}),y=kt(o)?o({rtl:s,type:r,defaultClassName:f}):Et(f,o),x={[a&&l>=1?"onTransitionEnd":"onAnimationEnd"]:a&&l<1?null:()=>{c&&n()}};return X.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":p},X.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${u} Toastify__progress-bar--${r}`}),X.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer","aria-valuenow":a?Math.round(l*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:y,style:m,...x}))}var si=1,ir=()=>`${si++}`;function ui(t,e,n){let r=1,i=0,o=[],a=[],l=e,s=new Map,c=new Set,u=v=>(c.add(v),()=>c.delete(v)),p=()=>{a=Array.from(s.values()),c.forEach(v=>v())},m=({containerId:v,toastId:_,updateId:E})=>{let L=v?v!==t:t!==1,b=s.has(_)&&E==null;return L||b},f=(v,_)=>{s.forEach(E=>{var L;(_==null||_===E.props.toastId)&&((L=E.toggle)==null||L.call(E,v))})},y=v=>{var _,E;v.isActive&&((E=(_=v.props)==null?void 0:_.onClose)==null||E.call(_,v.removalReason),v.isActive=!1,n(sn(v,"removed")))},x=v=>{if(v==null)s.forEach(y);else{let _=s.get(v);_&&y(_)}p()},S=()=>{i-=o.length,o=[]},k=v=>{var _,E;let{toastId:L,updateId:b}=v.props,C=b==null;v.staleId&&s.delete(v.staleId),v.isActive=!0,s.set(L,v),p(),n(sn(v,C?"added":"updated")),C&&((E=(_=v.props).onOpen)==null||E.call(_))};return{id:t,props:l,observe:u,toggle:f,removeToast:x,toasts:s,clearQueue:S,buildToast:(v,_)=>{if(m(_))return;let{toastId:E,updateId:L,data:b,staleId:C,delay:P}=_,O=L==null;O&&i++;let R={...l,style:l.toastStyle,key:r++,...Object.fromEntries(Object.entries(_).filter(([A,j])=>j!=null)),toastId:E,updateId:L,data:b,isIn:!1,className:Ee(_.className||l.toastClassName),progressClassName:Ee(_.progressClassName||l.progressClassName),autoClose:_.isLoading?!1:ri(_.autoClose,l.autoClose),closeToast(A){let j=s.get(E);j&&(j.removalReason=A,x(E))},deleteToast(){if(s.get(E)!=null){if(s.delete(E),i--,i<0&&(i=0),o.length>0){k(o.shift());return}p()}}};R.closeButton=l.closeButton,_.closeButton===!1||Ce(_.closeButton)?R.closeButton=_.closeButton:_.closeButton===!0&&(R.closeButton=Ce(l.closeButton)?l.closeButton:!0);let I={content:v,props:R,staleId:C};l.limit&&l.limit>0&&i>l.limit&&O?o.push(I):Xt(P)?setTimeout(()=>{k(I)},P):k(I)},setProps(v){l=v},setToggle:(v,_)=>{let E=s.get(v);E&&(E.toggle=_)},isToastActive:v=>{var _;return(_=s.get(v))==null?void 0:_.isActive},getSnapshot:()=>a}}var et=new Map,qt=[],Ie=new Set,ci=t=>Ie.forEach(e=>e(t)),or=()=>et.size>0;function fi(){qt.forEach(t=>lr(t.content,t.options)),qt=[]}var pi=(t,{containerId:e})=>{var n;return(n=et.get(e||1))==null?void 0:n.toasts.get(t)};function ar(t,e){var n;if(e)return!!((n=et.get(e))!=null&&n.isToastActive(t));let r=!1;return et.forEach(i=>{i.isToastActive(t)&&(r=!0)}),r}function hi(t){if(!or()){qt=qt.filter(e=>t!=null&&e.options.toastId!==t);return}if(t==null||ni(t))et.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=et.get(t.containerId);e?e.removeToast(t.id):et.forEach(n=>{n.removeToast(t.id)})}}var di=(t={})=>{et.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})};function lr(t,e){Ce(t)&&(or()||qt.push({content:t,options:e}),et.forEach(n=>{n.buildToast(t,e)}))}function mi(t){var e;(e=et.get(t.containerId||1))==null||e.setToggle(t.id,t.fn)}function sr(t,e){et.forEach(n=>{(e==null||!(e!=null&&e.containerId)||(e==null?void 0:e.containerId)===n.id)&&n.toggle(t,e==null?void 0:e.id)})}function gi(t){let e=t.containerId||1;return{subscribe(n){let r=ui(e,t,ci);et.set(e,r);let i=r.observe(n);return fi(),()=>{i(),et.delete(e)}},setProps(n){var r;(r=et.get(e))==null||r.setProps(n)},getSnapshot(){var n;return(n=et.get(e))==null?void 0:n.getSnapshot()}}}function yi(t){return Ie.add(t),()=>{Ie.delete(t)}}function xi(t){return t&&(Ct(t.toastId)||Xt(t.toastId))?t.toastId:ir()}function Yt(t,e){return lr(t,e),e.toastId}function ae(t,e){return{...e,type:e&&e.type||t,toastId:xi(e)}}function le(t){return(e,n)=>Yt(e,ae(t,n))}function V(t,e){return Yt(t,ae("default",e))}V.loading=(t,e)=>Yt(t,ae("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e}));function ki(t,{pending:e,error:n,success:r},i){let o;e&&(o=Ct(e)?V.loading(e,i):V.loading(e.render,{...i,...e}));let a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(c,u,p)=>{if(u==null){V.dismiss(o);return}let m={type:c,...a,...i,data:p},f=Ct(u)?{render:u}:u;return o?V.update(o,{...m,...f}):V(f.render,{...m,...f}),p},s=kt(t)?t():t;return s.then(c=>l("success",r,c)).catch(c=>l("error",n,c)),s}V.promise=ki;V.success=le("success");V.info=le("info");V.error=le("error");V.warning=le("warning");V.warn=V.warning;V.dark=(t,e)=>Yt(t,ae("default",{theme:"dark",...e}));function bi(t){hi(t)}V.dismiss=bi;V.clearWaitingQueue=di;V.isActive=ar;V.update=(t,e={})=>{let n=pi(t,e);if(n){let{props:r,content:i}=n,o={delay:100,...r,...e,toastId:e.toastId||t,updateId:ir()};o.toastId!==t&&(o.staleId=t);let a=o.render||i;delete o.render,Yt(a,o)}};V.done=t=>{V.update(t,{progress:1})};V.onChange=yi;V.play=t=>sr(!0,t);V.pause=t=>sr(!1,t);function _i(t){var e;let{subscribe:n,getSnapshot:r,setProps:i}=H.useRef(gi(t)).current;i(t);let o=(e=H.useSyncExternalStore(n,r,r))==null?void 0:e.slice();function a(l){if(!o)return[];let s=new Map;return t.newestOnTop&&o.reverse(),o.forEach(c=>{let{position:u}=c.props;s.has(u)||s.set(u,[]),s.get(u).push(c)}),Array.from(s,c=>l(c[0],c[1]))}return{getToastToRender:a,isToastActive:ar,count:o==null?void 0:o.length}}function wi(t){let[e,n]=H.useState(!1),[r,i]=H.useState(!1),o=H.useRef(null),a=H.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:s,closeToast:c,onClick:u,closeOnClick:p}=t;mi({id:t.toastId,containerId:t.containerId,fn:n}),H.useEffect(()=>{if(t.pauseOnFocusLoss)return m(),()=>{f()}},[t.pauseOnFocusLoss]);function m(){document.hasFocus()||k(),window.addEventListener("focus",S),window.addEventListener("blur",k)}function f(){window.removeEventListener("focus",S),window.removeEventListener("blur",k)}function y(C){if(t.draggable===!0||t.draggable===C.pointerType){v();let P=o.current;a.canCloseOnClick=!0,a.canDrag=!0,P.style.transition="none",t.draggableDirection==="x"?(a.start=C.clientX,a.removalDistance=P.offsetWidth*(t.draggablePercent/100)):(a.start=C.clientY,a.removalDistance=P.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function x(C){let{top:P,bottom:O,left:R,right:I}=o.current.getBoundingClientRect();C.pointerType==="mouse"&&t.pauseOnHover&&C.clientX>=R&&C.clientX<=I&&C.clientY>=P&&C.clientY<=O?k():S()}function S(){n(!0)}function k(){n(!1)}function v(){a.didMove=!1,document.addEventListener("pointermove",E),document.addEventListener("pointerup",L)}function _(){document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",L)}function E(C){let P=o.current;if(a.canDrag&&P){a.didMove=!0,e&&k(),t.draggableDirection==="x"?a.delta=C.clientX-a.start:a.delta=C.clientY-a.start,a.start!==C.clientX&&(a.canCloseOnClick=!1);let O=t.draggableDirection==="x"?`${a.delta}px, var(--y)`:`0, calc(${a.delta}px + var(--y))`;P.style.transform=`translate3d(${O},0)`,P.style.opacity=`${1-Math.abs(a.delta/a.removalDistance)}`}}function L(){_();let C=o.current;if(a.canDrag&&a.didMove&&C){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance){i(!0),t.closeToast(!0),t.collapseAll();return}C.style.transition="transform 0.2s, opacity 0.2s",C.style.removeProperty("transform"),C.style.removeProperty("opacity")}}let b={onPointerDown:y,onPointerUp:x};return l&&s&&(b.onMouseEnter=k,t.stacked||(b.onMouseLeave=S)),p&&(b.onClick=C=>{u&&u(C),a.canCloseOnClick&&c(!0)}),{playToast:S,pauseToast:k,isRunning:e,preventExitTransition:r,toastRef:o,eventHandlers:b}}var ur=typeof window<"u"?H.useLayoutEffect:H.useEffect,se=({theme:t,type:e,isLoading:n,...r})=>X.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${e})`,...r});function vi(t){return X.createElement(se,{...t},X.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function Ti(t){return X.createElement(se,{...t},X.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function Si(t){return X.createElement(se,{...t},X.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function Ei(t){return X.createElement(se,{...t},X.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function Ci(){return X.createElement("div",{className:"Toastify__spinner"})}var Ae={info:Ti,warning:vi,success:Si,error:Ei,spinner:Ci},Ii=t=>t in Ae;function Ai({theme:t,type:e,isLoading:n,icon:r}){let i=null,o={theme:t,type:e};return r===!1||(kt(r)?i=r({...o,isLoading:n}):H.isValidElement(r)?i=H.cloneElement(r,o):n?i=Ae.spinner():Ii(e)&&(i=Ae[e](o))),i}var Pi=t=>{let{isRunning:e,preventExitTransition:n,toastRef:r,eventHandlers:i,playToast:o}=wi(t),{closeButton:a,children:l,autoClose:s,onClick:c,type:u,hideProgressBar:p,closeToast:m,transition:f,position:y,className:x,style:S,progressClassName:k,updateId:v,role:_,progress:E,rtl:L,toastId:b,deleteToast:C,isIn:P,isLoading:O,closeOnClick:R,theme:I,ariaLabel:A}=t,j=Et("Toastify__toast",`Toastify__toast-theme--${I}`,`Toastify__toast--${u}`,{"Toastify__toast--rtl":L},{"Toastify__toast--close-on-click":R}),Y=kt(x)?x({rtl:L,position:y,type:u,defaultClassName:j}):Et(j,x),F=Ai(t),G=!!E||!s,Q={closeToast:m,type:u,theme:I},Z=null;return a===!1||(kt(a)?Z=a(Q):H.isValidElement(a)?Z=H.cloneElement(a,Q):Z=ai(Q)),X.createElement(f,{isIn:P,done:C,position:y,preventExitTransition:n,nodeRef:r,playToast:o},X.createElement("div",{id:b,tabIndex:0,onClick:c,"data-in":P,className:Y,...i,style:S,ref:r,...P&&{role:_,"aria-label":A}},F!=null&&X.createElement("div",{className:Et("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!O})},F),rr(l,t,!e),Z,!t.customProgressBar&&X.createElement(li,{...v&&!G?{key:`p-${v}`}:{},rtl:L,theme:I,delay:s,isRunning:e,isIn:P,closeToast:m,hide:p,type:u,className:k,controlledProgress:G,progress:E||0})))},zi=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),Li=oi(zi("bounce",!0)),Mi={position:"top-right",transition:Li,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function Ni(t){let e={...Mi,...t},n=t.stacked,[r,i]=H.useState(!0),o=H.useRef(null),{getToastToRender:a,isToastActive:l,count:s}=_i(e),{className:c,style:u,rtl:p,containerId:m,hotKeys:f}=e;function y(S){let k=Et("Toastify__toast-container",`Toastify__toast-container--${S}`,{"Toastify__toast-container--rtl":p});return kt(c)?c({position:S,rtl:p,defaultClassName:k}):Et(k,Ee(c))}function x(){n&&(i(!0),V.play())}return ur(()=>{var S;if(n){let k=o.current.querySelectorAll('[data-in="true"]'),v=12,_=(S=e.position)==null?void 0:S.includes("top"),E=0,L=0;Array.from(k).reverse().forEach((b,C)=>{let P=b;P.classList.add("Toastify__toast--stacked"),C>0&&(P.dataset.collapsed=`${r}`),P.dataset.pos||(P.dataset.pos=_?"top":"bot");let O=E*(r?.2:1)+(r?0:v*C),R=Math.max(.5,1-(r?L:0));P.style.setProperty("--y",`${_?O:O*-1}px`),P.style.setProperty("--g",`${v}`),P.style.setProperty("--s",`${R}`),E+=P.offsetHeight,L+=.025})}},[r,s,n]),H.useEffect(()=>{function S(k){var v;let _=o.current;f(k)&&((v=_==null?void 0:_.querySelector('[tabIndex="0"]'))==null||v.focus(),i(!1),V.pause()),k.key==="Escape"&&(document.activeElement===_||_!=null&&_.contains(document.activeElement))&&(i(!0),V.play())}return document.addEventListener("keydown",S),()=>{document.removeEventListener("keydown",S)}},[f]),X.createElement("section",{ref:o,className:"Toastify",id:m,onMouseEnter:()=>{n&&(i(!1),V.pause())},onMouseLeave:x,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},a((S,k)=>{let v=k.length?{...u}:{...u,pointerEvents:"none"};return X.createElement("div",{tabIndex:-1,className:y(S),"data-stacked":n,style:v,key:`c-${S}`},k.map(({content:_,props:E})=>X.createElement(Pi,{...E,stacked:n,collapseAll:x,isIn:l(E.toastId,E.containerId),key:`t-${E.key}`},_)))}))}var Oi=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,un=new Map,Di=(t,e)=>{ur(()=>{if(typeof document>"u")return;let n=document,r=un.get(n);if(r){e&&r.setAttribute("nonce",e);return}let i=n.createElement("style");i.textContent=t,e&&i.setAttribute("nonce",e),n.head.appendChild(i),un.set(n,i)},[e])};function yc(t){return Di(Oi,t.nonce),X.createElement(Ni,{...t})}/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=(...t)=>t.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=t=>{const e=Fi(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var de={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bi=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},ji=H.createContext({}),$i=()=>H.useContext(ji),Hi=H.forwardRef(({color:t,size:e,strokeWidth:n,absoluteStrokeWidth:r,className:i="",children:o,iconNode:a,...l},s)=>{const{size:c=24,strokeWidth:u=2,absoluteStrokeWidth:p=!1,color:m="currentColor",className:f=""}=$i()??{},y=r??p?Number(n??u)*24/Number(e??c):n??u;return H.createElement("svg",{ref:s,...de,width:e??c??de.width,height:e??c??de.height,stroke:t??m,strokeWidth:y,className:cr("lucide",f,i),...!o&&!Bi(l)&&{"aria-hidden":"true"},...l},[...a.map(([x,S])=>H.createElement(x,S)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(t,e)=>{const n=H.forwardRef(({className:r,...i},o)=>H.createElement(Hi,{ref:o,iconNode:e,className:cr(`lucide-${Ri(cn(t))}`,`lucide-${t}`,r),...i}));return n.displayName=cn(t),n};/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ui=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],xc=D("arrow-left",Ui);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vi=[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]],kc=D("banknote",Vi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],bc=D("bell",qi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],_c=D("bot",Wi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],wc=D("chart-column",Xi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yi=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],vc=D("check",Yi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Tc=D("chevron-down",Qi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ki=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Sc=D("chevron-up",Ki);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Ec=D("circle-check-big",Gi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Cc=D("clock",Ji);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],Ic=D("credit-card",Zi);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],Ac=D("dollar-sign",to);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Pc=D("eye-off",eo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],zc=D("eye",no);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ro=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],Lc=D("heart",ro);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],Mc=D("house",io);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Nc=D("log-out",oo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Oc=D("map-pin",ao);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Dc=D("message-square",lo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],Rc=D("moon",so);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]],Fc=D("navigation",uo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Bc=D("package",co);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],jc=D("phone",fo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],$c=D("search",po);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],Hc=D("shopping-bag",ho);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],Uc=D("shopping-cart",mo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const go=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],Vc=D("smartphone",go);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],qc=D("sparkles",yo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],Wc=D("square-pen",xo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Xc=D("star",ko);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bo=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Yc=D("sun",bo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Qc=D("trash-2",_o);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],Kc=D("trending-down",wo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Gc=D("user",vo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Jc=D("users",To);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],Zc=D("wallet",So);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],tf=D("x",Eo);/**
 * @license lucide-react v1.21.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ef=D("zap",Co);function Io(t,e){const n={};return(t[t.length-1]===""?[...t,""]:t).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const Ao=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Po=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,zo={};function fn(t,e){return(zo.jsx?Po:Ao).test(t)}const Lo=/[ \t\n\f\r]/g;function Mo(t){return typeof t=="object"?t.type==="text"?pn(t.value):!1:pn(t)}function pn(t){return t.replace(Lo,"")===""}class Qt{constructor(e,n,r){this.normal=n,this.property=e,r&&(this.space=r)}}Qt.prototype.normal={};Qt.prototype.property={};Qt.prototype.space=void 0;function fr(t,e){const n={},r={};for(const i of t)Object.assign(n,i.property),Object.assign(r,i.normal);return new Qt(n,r,e)}function Pe(t){return t.toLowerCase()}class it{constructor(e,n){this.attribute=n,this.property=e}}it.prototype.attribute="";it.prototype.booleanish=!1;it.prototype.boolean=!1;it.prototype.commaOrSpaceSeparated=!1;it.prototype.commaSeparated=!1;it.prototype.defined=!1;it.prototype.mustUseProperty=!1;it.prototype.number=!1;it.prototype.overloadedBoolean=!1;it.prototype.property="";it.prototype.spaceSeparated=!1;it.prototype.space=void 0;let No=0;const N=It(),K=It(),ze=It(),w=It(),q=It(),Mt=It(),at=It();function It(){return 2**++No}const Le=Object.freeze(Object.defineProperty({__proto__:null,boolean:N,booleanish:K,commaOrSpaceSeparated:at,commaSeparated:Mt,number:w,overloadedBoolean:ze,spaceSeparated:q},Symbol.toStringTag,{value:"Module"})),me=Object.keys(Le);class $e extends it{constructor(e,n,r,i){let o=-1;if(super(e,n),hn(this,"space",i),typeof r=="number")for(;++o<me.length;){const a=me[o];hn(this,me[o],(r&Le[a])===Le[a])}}}$e.prototype.defined=!0;function hn(t,e,n){n&&(t[e]=n)}function Ot(t){const e={},n={};for(const[r,i]of Object.entries(t.properties)){const o=new $e(r,t.transform(t.attributes||{},r),i,t.space);t.mustUseProperty&&t.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),e[r]=o,n[Pe(r)]=r,n[Pe(o.attribute)]=r}return new Qt(e,n,t.space)}const pr=Ot({properties:{ariaActiveDescendant:null,ariaAtomic:K,ariaAutoComplete:null,ariaBusy:K,ariaChecked:K,ariaColCount:w,ariaColIndex:w,ariaColSpan:w,ariaControls:q,ariaCurrent:null,ariaDescribedBy:q,ariaDetails:null,ariaDisabled:K,ariaDropEffect:q,ariaErrorMessage:null,ariaExpanded:K,ariaFlowTo:q,ariaGrabbed:K,ariaHasPopup:null,ariaHidden:K,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:q,ariaLevel:w,ariaLive:null,ariaModal:K,ariaMultiLine:K,ariaMultiSelectable:K,ariaOrientation:null,ariaOwns:q,ariaPlaceholder:null,ariaPosInSet:w,ariaPressed:K,ariaReadOnly:K,ariaRelevant:null,ariaRequired:K,ariaRoleDescription:q,ariaRowCount:w,ariaRowIndex:w,ariaRowSpan:w,ariaSelected:K,ariaSetSize:w,ariaSort:null,ariaValueMax:w,ariaValueMin:w,ariaValueNow:w,ariaValueText:null,role:null},transform(t,e){return e==="role"?e:"aria-"+e.slice(4).toLowerCase()}});function hr(t,e){return e in t?t[e]:e}function dr(t,e){return hr(t,e.toLowerCase())}const Oo=Ot({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Mt,acceptCharset:q,accessKey:q,action:null,allow:null,allowFullScreen:N,allowPaymentRequest:N,allowUserMedia:N,alt:null,as:null,async:N,autoCapitalize:null,autoComplete:q,autoFocus:N,autoPlay:N,blocking:q,capture:null,charSet:null,checked:N,cite:null,className:q,cols:w,colSpan:null,content:null,contentEditable:K,controls:N,controlsList:q,coords:w|Mt,crossOrigin:null,data:null,dateTime:null,decoding:null,default:N,defer:N,dir:null,dirName:null,disabled:N,download:ze,draggable:K,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:N,formTarget:null,headers:q,height:w,hidden:ze,high:w,href:null,hrefLang:null,htmlFor:q,httpEquiv:q,id:null,imageSizes:null,imageSrcSet:null,inert:N,inputMode:null,integrity:null,is:null,isMap:N,itemId:null,itemProp:q,itemRef:q,itemScope:N,itemType:q,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:N,low:w,manifest:null,max:null,maxLength:w,media:null,method:null,min:null,minLength:w,multiple:N,muted:N,name:null,nonce:null,noModule:N,noValidate:N,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:N,optimum:w,pattern:null,ping:q,placeholder:null,playsInline:N,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:N,referrerPolicy:null,rel:q,required:N,reversed:N,rows:w,rowSpan:w,sandbox:q,scope:null,scoped:N,seamless:N,selected:N,shadowRootClonable:N,shadowRootDelegatesFocus:N,shadowRootMode:null,shape:null,size:w,sizes:null,slot:null,span:w,spellCheck:K,src:null,srcDoc:null,srcLang:null,srcSet:null,start:w,step:null,style:null,tabIndex:w,target:null,title:null,translate:null,type:null,typeMustMatch:N,useMap:null,value:K,width:w,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:q,axis:null,background:null,bgColor:null,border:w,borderColor:null,bottomMargin:w,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:N,declare:N,event:null,face:null,frame:null,frameBorder:null,hSpace:w,leftMargin:w,link:null,longDesc:null,lowSrc:null,marginHeight:w,marginWidth:w,noResize:N,noHref:N,noShade:N,noWrap:N,object:null,profile:null,prompt:null,rev:null,rightMargin:w,rules:null,scheme:null,scrolling:K,standby:null,summary:null,text:null,topMargin:w,valueType:null,version:null,vAlign:null,vLink:null,vSpace:w,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:N,disableRemotePlayback:N,prefix:null,property:null,results:w,security:null,unselectable:null},space:"html",transform:dr}),Do=Ot({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:at,accentHeight:w,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:w,amplitude:w,arabicForm:null,ascent:w,attributeName:null,attributeType:null,azimuth:w,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:w,by:null,calcMode:null,capHeight:w,className:q,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:w,diffuseConstant:w,direction:null,display:null,dur:null,divisor:w,dominantBaseline:null,download:N,dx:null,dy:null,edgeMode:null,editable:null,elevation:w,enableBackground:null,end:null,event:null,exponent:w,externalResourcesRequired:null,fill:null,fillOpacity:w,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Mt,g2:Mt,glyphName:Mt,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:w,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:w,horizOriginX:w,horizOriginY:w,id:null,ideographic:w,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:w,k:w,k1:w,k2:w,k3:w,k4:w,kernelMatrix:at,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:w,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:w,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:w,overlineThickness:w,paintOrder:null,panose1:null,path:null,pathLength:w,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:q,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:w,pointsAtY:w,pointsAtZ:w,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:at,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:at,rev:at,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:at,requiredFeatures:at,requiredFonts:at,requiredFormats:at,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:w,specularExponent:w,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:w,strikethroughThickness:w,string:null,stroke:null,strokeDashArray:at,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:w,strokeOpacity:w,strokeWidth:null,style:null,surfaceScale:w,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:at,tabIndex:w,tableValues:null,target:null,targetX:w,targetY:w,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:at,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:w,underlineThickness:w,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:w,values:null,vAlphabetic:w,vMathematical:w,vectorEffect:null,vHanging:w,vIdeographic:w,version:null,vertAdvY:w,vertOriginX:w,vertOriginY:w,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:w,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:hr}),mr=Ot({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(t,e){return"xlink:"+e.slice(5).toLowerCase()}}),gr=Ot({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:dr}),yr=Ot({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(t,e){return"xml:"+e.slice(3).toLowerCase()}}),Ro={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},Fo=/[A-Z]/g,dn=/-[a-z]/g,Bo=/^data[-\w.:]+$/i;function jo(t,e){const n=Pe(e);let r=e,i=it;if(n in t.normal)return t.property[t.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&Bo.test(e)){if(e.charAt(4)==="-"){const o=e.slice(5).replace(dn,Ho);r="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=e.slice(4);if(!dn.test(o)){let a=o.replace(Fo,$o);a.charAt(0)!=="-"&&(a="-"+a),e="data"+a}}i=$e}return new i(r,e)}function $o(t){return"-"+t.toLowerCase()}function Ho(t){return t.charAt(1).toUpperCase()}const Uo=fr([pr,Oo,mr,gr,yr],"html"),He=fr([pr,Do,mr,gr,yr],"svg");function Vo(t){return t.join(" ").trim()}var Ue={},mn=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,qo=/\n/g,Wo=/^\s*/,Xo=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,Yo=/^:\s*/,Qo=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,Ko=/^[;\s]*/,Go=/^\s+|\s+$/g,Jo=`
`,gn="/",yn="*",St="",Zo="comment",ta="declaration";function ea(t,e){if(typeof t!="string")throw new TypeError("First argument must be a string");if(!t)return[];e=e||{};var n=1,r=1;function i(y){var x=y.match(qo);x&&(n+=x.length);var S=y.lastIndexOf(Jo);r=~S?y.length-S:r+y.length}function o(){var y={line:n,column:r};return function(x){return x.position=new a(y),c(),x}}function a(y){this.start=y,this.end={line:n,column:r},this.source=e.source}a.prototype.content=t;function l(y){var x=new Error(e.source+":"+n+":"+r+": "+y);if(x.reason=y,x.filename=e.source,x.line=n,x.column=r,x.source=t,!e.silent)throw x}function s(y){var x=y.exec(t);if(x){var S=x[0];return i(S),t=t.slice(S.length),x}}function c(){s(Wo)}function u(y){var x;for(y=y||[];x=p();)x!==!1&&y.push(x);return y}function p(){var y=o();if(!(gn!=t.charAt(0)||yn!=t.charAt(1))){for(var x=2;St!=t.charAt(x)&&(yn!=t.charAt(x)||gn!=t.charAt(x+1));)++x;if(x+=2,St===t.charAt(x-1))return l("End of comment missing");var S=t.slice(2,x-2);return r+=2,i(S),t=t.slice(x),r+=2,y({type:Zo,comment:S})}}function m(){var y=o(),x=s(Xo);if(x){if(p(),!s(Yo))return l("property missing ':'");var S=s(Qo),k=y({type:ta,property:xn(x[0].replace(mn,St)),value:S?xn(S[0].replace(mn,St)):St});return s(Ko),k}}function f(){var y=[];u(y);for(var x;x=m();)x!==!1&&(y.push(x),u(y));return y}return c(),f()}function xn(t){return t?t.replace(Go,St):St}var na=ea,ra=re&&re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ue,"__esModule",{value:!0});Ue.default=oa;const ia=ra(na);function oa(t,e){let n=null;if(!t||typeof t!="string")return n;const r=(0,ia.default)(t),i=typeof e=="function";return r.forEach(o=>{if(o.type!=="declaration")return;const{property:a,value:l}=o;i?e(a,l,o):l&&(n=n||{},n[a]=l)}),n}var ue={};Object.defineProperty(ue,"__esModule",{value:!0});ue.camelCase=void 0;var aa=/^--[a-zA-Z0-9_-]+$/,la=/-([a-z])/g,sa=/^[^-]+$/,ua=/^-(webkit|moz|ms|o|khtml)-/,ca=/^-(ms)-/,fa=function(t){return!t||sa.test(t)||aa.test(t)},pa=function(t,e){return e.toUpperCase()},kn=function(t,e){return"".concat(e,"-")},ha=function(t,e){return e===void 0&&(e={}),fa(t)?t:(t=t.toLowerCase(),e.reactCompat?t=t.replace(ca,kn):t=t.replace(ua,kn),t.replace(la,pa))};ue.camelCase=ha;var da=re&&re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},ma=da(Ue),ga=ue;function Me(t,e){var n={};return!t||typeof t!="string"||(0,ma.default)(t,function(r,i){r&&i&&(n[(0,ga.camelCase)(r,e)]=i)}),n}Me.default=Me;var ya=Me;const xa=er(ya),xr=kr("end"),Ve=kr("start");function kr(t){return e;function e(n){const r=n&&n.position&&n.position[t]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function ka(t){const e=Ve(t),n=xr(t);if(e&&n)return{start:e,end:n}}function Ht(t){return!t||typeof t!="object"?"":"position"in t||"type"in t?bn(t.position):"start"in t||"end"in t?bn(t):"line"in t||"column"in t?Ne(t):""}function Ne(t){return _n(t&&t.line)+":"+_n(t&&t.column)}function bn(t){return Ne(t&&t.start)+"-"+Ne(t&&t.end)}function _n(t){return t&&typeof t=="number"?t:1}class tt extends Error{constructor(e,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",o={},a=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof e=="string"?i=e:!o.cause&&e&&(a=!0,i=e.message,o.cause=e),!o.ruleId&&!o.source&&typeof r=="string"){const s=r.indexOf(":");s===-1?o.ruleId=r:(o.source=r.slice(0,s),o.ruleId=r.slice(s+1))}if(!o.place&&o.ancestors&&o.ancestors){const s=o.ancestors[o.ancestors.length-1];s&&(o.place=s.position)}const l=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=l?l.line:void 0,this.name=Ht(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=a&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}tt.prototype.file="";tt.prototype.name="";tt.prototype.reason="";tt.prototype.message="";tt.prototype.stack="";tt.prototype.column=void 0;tt.prototype.line=void 0;tt.prototype.ancestors=void 0;tt.prototype.cause=void 0;tt.prototype.fatal=void 0;tt.prototype.place=void 0;tt.prototype.ruleId=void 0;tt.prototype.source=void 0;const qe={}.hasOwnProperty,ba=new Map,_a=/[A-Z]/g,wa=new Set(["table","tbody","thead","tfoot","tr"]),va=new Set(["td","th"]),br="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function Ta(t,e){if(!e||e.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=e.filePath||void 0;let r;if(e.development){if(typeof e.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=La(n,e.jsxDEV)}else{if(typeof e.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof e.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=za(n,e.jsx,e.jsxs)}const i={Fragment:e.Fragment,ancestors:[],components:e.components||{},create:r,elementAttributeNameCase:e.elementAttributeNameCase||"react",evaluater:e.createEvaluater?e.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:e.ignoreInvalidStyle||!1,passKeys:e.passKeys!==!1,passNode:e.passNode||!1,schema:e.space==="svg"?He:Uo,stylePropertyNameCase:e.stylePropertyNameCase||"dom",tableCellAlignToStyle:e.tableCellAlignToStyle!==!1},o=_r(i,t,void 0);return o&&typeof o!="string"?o:i.create(t,i.Fragment,{children:o||void 0},void 0)}function _r(t,e,n){if(e.type==="element")return Sa(t,e,n);if(e.type==="mdxFlowExpression"||e.type==="mdxTextExpression")return Ea(t,e);if(e.type==="mdxJsxFlowElement"||e.type==="mdxJsxTextElement")return Ia(t,e,n);if(e.type==="mdxjsEsm")return Ca(t,e);if(e.type==="root")return Aa(t,e,n);if(e.type==="text")return Pa(t,e)}function Sa(t,e,n){const r=t.schema;let i=r;e.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=He,t.schema=i),t.ancestors.push(e);const o=vr(t,e.tagName,!1),a=Ma(t,e);let l=Xe(t,e);return wa.has(e.tagName)&&(l=l.filter(function(s){return typeof s=="string"?!Mo(s):!0})),wr(t,a,o,e),We(a,l),t.ancestors.pop(),t.schema=r,t.create(e,o,a,n)}function Ea(t,e){if(e.data&&e.data.estree&&t.evaluater){const r=e.data.estree.body[0];return r.type,t.evaluater.evaluateExpression(r.expression)}Wt(t,e.position)}function Ca(t,e){if(e.data&&e.data.estree&&t.evaluater)return t.evaluater.evaluateProgram(e.data.estree);Wt(t,e.position)}function Ia(t,e,n){const r=t.schema;let i=r;e.name==="svg"&&r.space==="html"&&(i=He,t.schema=i),t.ancestors.push(e);const o=e.name===null?t.Fragment:vr(t,e.name,!0),a=Na(t,e),l=Xe(t,e);return wr(t,a,o,e),We(a,l),t.ancestors.pop(),t.schema=r,t.create(e,o,a,n)}function Aa(t,e,n){const r={};return We(r,Xe(t,e)),t.create(e,t.Fragment,r,n)}function Pa(t,e){return e.value}function wr(t,e,n,r){typeof n!="string"&&n!==t.Fragment&&t.passNode&&(e.node=r)}function We(t,e){if(e.length>0){const n=e.length>1?e:e[0];n&&(t.children=n)}}function za(t,e,n){return r;function r(i,o,a,l){const c=Array.isArray(a.children)?n:e;return l?c(o,a,l):c(o,a)}}function La(t,e){return n;function n(r,i,o,a){const l=Array.isArray(o.children),s=Ve(r);return e(i,o,a,l,{columnNumber:s?s.column-1:void 0,fileName:t,lineNumber:s?s.line:void 0},void 0)}}function Ma(t,e){const n={};let r,i;for(i in e.properties)if(i!=="children"&&qe.call(e.properties,i)){const o=Oa(t,i,e.properties[i]);if(o){const[a,l]=o;t.tableCellAlignToStyle&&a==="align"&&typeof l=="string"&&va.has(e.tagName)?r=l:n[a]=l}}if(r){const o=n.style||(n.style={});o[t.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function Na(t,e){const n={};for(const r of e.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&t.evaluater){const o=r.data.estree.body[0];o.type;const a=o.expression;a.type;const l=a.properties[0];l.type,Object.assign(n,t.evaluater.evaluateExpression(l.argument))}else Wt(t,e.position);else{const i=r.name;let o;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&t.evaluater){const l=r.value.data.estree.body[0];l.type,o=t.evaluater.evaluateExpression(l.expression)}else Wt(t,e.position);else o=r.value===null?!0:r.value;n[i]=o}return n}function Xe(t,e){const n=[];let r=-1;const i=t.passKeys?new Map:ba;for(;++r<e.children.length;){const o=e.children[r];let a;if(t.passKeys){const s=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(s){const c=i.get(s)||0;a=s+"-"+c,i.set(s,c+1)}}const l=_r(t,o,a);l!==void 0&&n.push(l)}return n}function Oa(t,e,n){const r=jo(t.schema,e);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?Io(n):Vo(n)),r.property==="style"){let i=typeof n=="object"?n:Da(t,String(n));return t.stylePropertyNameCase==="css"&&(i=Ra(i)),["style",i]}return[t.elementAttributeNameCase==="react"&&r.space?Ro[r.property]||r.property:r.attribute,n]}}function Da(t,e){try{return xa(e,{reactCompat:!0})}catch(n){if(t.ignoreInvalidStyle)return{};const r=n,i=new tt("Cannot parse `style` attribute",{ancestors:t.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=t.filePath||void 0,i.url=br+"#cannot-parse-style-attribute",i}}function vr(t,e,n){let r;if(!n)r={type:"Literal",value:e};else if(e.includes(".")){const i=e.split(".");let o=-1,a;for(;++o<i.length;){const l=fn(i[o])?{type:"Identifier",name:i[o]}:{type:"Literal",value:i[o]};a=a?{type:"MemberExpression",object:a,property:l,computed:!!(o&&l.type==="Literal"),optional:!1}:l}r=a}else r=fn(e)&&!/^[a-z]/.test(e)?{type:"Identifier",name:e}:{type:"Literal",value:e};if(r.type==="Literal"){const i=r.value;return qe.call(t.components,i)?t.components[i]:i}if(t.evaluater)return t.evaluater.evaluateExpression(r);Wt(t)}function Wt(t,e){const n=new tt("Cannot handle MDX estrees without `createEvaluater`",{ancestors:t.ancestors,place:e,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=t.filePath||void 0,n.url=br+"#cannot-handle-mdx-estrees-without-createevaluater",n}function Ra(t){const e={};let n;for(n in t)qe.call(t,n)&&(e[Fa(n)]=t[n]);return e}function Fa(t){let e=t.replace(_a,Ba);return e.slice(0,3)==="ms-"&&(e="-"+e),e}function Ba(t){return"-"+t.toLowerCase()}const ge={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},ja={};function $a(t,e){const n=ja,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Tr(t,r,i)}function Tr(t,e,n){if(Ha(t)){if("value"in t)return t.type==="html"&&!n?"":t.value;if(e&&"alt"in t&&t.alt)return t.alt;if("children"in t)return wn(t.children,e,n)}return Array.isArray(t)?wn(t,e,n):""}function wn(t,e,n){const r=[];let i=-1;for(;++i<t.length;)r[i]=Tr(t[i],e,n);return r.join("")}function Ha(t){return!!(t&&typeof t=="object")}const vn=document.createElement("i");function Ye(t){const e="&"+t+";";vn.innerHTML=e;const n=vn.textContent;return n.charCodeAt(n.length-1)===59&&t!=="semi"||n===e?!1:n}function dt(t,e,n,r){const i=t.length;let o=0,a;if(e<0?e=-e>i?0:i+e:e=e>i?i:e,n=n>0?n:0,r.length<1e4)a=Array.from(r),a.unshift(e,n),t.splice(...a);else for(n&&t.splice(e,n);o<r.length;)a=r.slice(o,o+1e4),a.unshift(e,0),t.splice(...a),o+=1e4,e+=1e4}function st(t,e){return t.length>0?(dt(t,t.length,0,e),t):e}const Tn={}.hasOwnProperty;function Ua(t){const e={};let n=-1;for(;++n<t.length;)Va(e,t[n]);return e}function Va(t,e){let n;for(n in e){const i=(Tn.call(t,n)?t[n]:void 0)||(t[n]={}),o=e[n];let a;if(o)for(a in o){Tn.call(i,a)||(i[a]=[]);const l=o[a];qa(i[a],Array.isArray(l)?l:l?[l]:[])}}}function qa(t,e){let n=-1;const r=[];for(;++n<e.length;)(e[n].add==="after"?t:r).push(e[n]);dt(t,0,0,r)}function Sr(t,e){const n=Number.parseInt(t,e);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Nt(t){return t.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const ht=wt(/[A-Za-z]/),lt=wt(/[\dA-Za-z]/),Wa=wt(/[#-'*+\--9=?A-Z^-~]/);function Oe(t){return t!==null&&(t<32||t===127)}const De=wt(/\d/),Xa=wt(/[\dA-Fa-f]/),Ya=wt(/[!-/:-@[-`{-~]/);function z(t){return t!==null&&t<-2}function rt(t){return t!==null&&(t<0||t===32)}function $(t){return t===-2||t===-1||t===32}const Qa=wt(new RegExp("\\p{P}|\\p{S}","u")),Ka=wt(/\s/);function wt(t){return e;function e(n){return n!==null&&n>-1&&t.test(String.fromCharCode(n))}}function Dt(t){const e=[];let n=-1,r=0,i=0;for(;++n<t.length;){const o=t.charCodeAt(n);let a="";if(o===37&&lt(t.charCodeAt(n+1))&&lt(t.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(a=String.fromCharCode(o));else if(o>55295&&o<57344){const l=t.charCodeAt(n+1);o<56320&&l>56319&&l<57344?(a=String.fromCharCode(o,l),i=1):a="�"}else a=String.fromCharCode(o);a&&(e.push(t.slice(r,n),encodeURIComponent(a)),r=n+i+1,a=""),i&&(n+=i,i=0)}return e.join("")+t.slice(r)}function W(t,e,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return a;function a(s){return $(s)?(t.enter(n),l(s)):e(s)}function l(s){return $(s)&&o++<i?(t.consume(s),l):(t.exit(n),e(s))}}const Ga={tokenize:Ja};function Ja(t){const e=t.attempt(this.parser.constructs.contentInitial,r,i);let n;return e;function r(l){if(l===null){t.consume(l);return}return t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),W(t,e,"linePrefix")}function i(l){return t.enter("paragraph"),o(l)}function o(l){const s=t.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,a(l)}function a(l){if(l===null){t.exit("chunkText"),t.exit("paragraph"),t.consume(l);return}return z(l)?(t.consume(l),t.exit("chunkText"),o):(t.consume(l),a)}}const Za={tokenize:tl},Sn={tokenize:el};function tl(t){const e=this,n=[];let r=0,i,o,a;return l;function l(_){if(r<n.length){const E=n[r];return e.containerState=E[1],t.attempt(E[0].continuation,s,c)(_)}return c(_)}function s(_){if(r++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,i&&v();const E=e.events.length;let L=E,b;for(;L--;)if(e.events[L][0]==="exit"&&e.events[L][1].type==="chunkFlow"){b=e.events[L][1].end;break}k(r);let C=E;for(;C<e.events.length;)e.events[C][1].end={...b},C++;return dt(e.events,L+1,0,e.events.slice(E)),e.events.length=C,c(_)}return l(_)}function c(_){if(r===n.length){if(!i)return m(_);if(i.currentConstruct&&i.currentConstruct.concrete)return y(_);e.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return e.containerState={},t.check(Sn,u,p)(_)}function u(_){return i&&v(),k(r),m(_)}function p(_){return e.parser.lazy[e.now().line]=r!==n.length,a=e.now().offset,y(_)}function m(_){return e.containerState={},t.attempt(Sn,f,y)(_)}function f(_){return r++,n.push([e.currentConstruct,e.containerState]),m(_)}function y(_){if(_===null){i&&v(),k(0),t.consume(_);return}return i=i||e.parser.flow(e.now()),t.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:o}),x(_)}function x(_){if(_===null){S(t.exit("chunkFlow"),!0),k(0),t.consume(_);return}return z(_)?(t.consume(_),S(t.exit("chunkFlow")),r=0,e.interrupt=void 0,l):(t.consume(_),x)}function S(_,E){const L=e.sliceStream(_);if(E&&L.push(null),_.previous=o,o&&(o.next=_),o=_,i.defineSkip(_.start),i.write(L),e.parser.lazy[_.start.line]){let b=i.events.length;for(;b--;)if(i.events[b][1].start.offset<a&&(!i.events[b][1].end||i.events[b][1].end.offset>a))return;const C=e.events.length;let P=C,O,R;for(;P--;)if(e.events[P][0]==="exit"&&e.events[P][1].type==="chunkFlow"){if(O){R=e.events[P][1].end;break}O=!0}for(k(r),b=C;b<e.events.length;)e.events[b][1].end={...R},b++;dt(e.events,P+1,0,e.events.slice(C)),e.events.length=b}}function k(_){let E=n.length;for(;E-- >_;){const L=n[E];e.containerState=L[1],L[0].exit.call(e,t)}n.length=_}function v(){i.write([null]),o=void 0,i=void 0,e.containerState._closeFlow=void 0}}function el(t,e,n){return W(t,t.attempt(this.parser.constructs.document,e,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function En(t){if(t===null||rt(t)||Ka(t))return 1;if(Qa(t))return 2}function Qe(t,e,n){const r=[];let i=-1;for(;++i<t.length;){const o=t[i].resolveAll;o&&!r.includes(o)&&(e=o(e,n),r.push(o))}return e}const Re={name:"attention",resolveAll:nl,tokenize:rl};function nl(t,e){let n=-1,r,i,o,a,l,s,c,u;for(;++n<t.length;)if(t[n][0]==="enter"&&t[n][1].type==="attentionSequence"&&t[n][1]._close){for(r=n;r--;)if(t[r][0]==="exit"&&t[r][1].type==="attentionSequence"&&t[r][1]._open&&e.sliceSerialize(t[r][1]).charCodeAt(0)===e.sliceSerialize(t[n][1]).charCodeAt(0)){if((t[r][1]._close||t[n][1]._open)&&(t[n][1].end.offset-t[n][1].start.offset)%3&&!((t[r][1].end.offset-t[r][1].start.offset+t[n][1].end.offset-t[n][1].start.offset)%3))continue;s=t[r][1].end.offset-t[r][1].start.offset>1&&t[n][1].end.offset-t[n][1].start.offset>1?2:1;const p={...t[r][1].end},m={...t[n][1].start};Cn(p,-s),Cn(m,s),a={type:s>1?"strongSequence":"emphasisSequence",start:p,end:{...t[r][1].end}},l={type:s>1?"strongSequence":"emphasisSequence",start:{...t[n][1].start},end:m},o={type:s>1?"strongText":"emphasisText",start:{...t[r][1].end},end:{...t[n][1].start}},i={type:s>1?"strong":"emphasis",start:{...a.start},end:{...l.end}},t[r][1].end={...a.start},t[n][1].start={...l.end},c=[],t[r][1].end.offset-t[r][1].start.offset&&(c=st(c,[["enter",t[r][1],e],["exit",t[r][1],e]])),c=st(c,[["enter",i,e],["enter",a,e],["exit",a,e],["enter",o,e]]),c=st(c,Qe(e.parser.constructs.insideSpan.null,t.slice(r+1,n),e)),c=st(c,[["exit",o,e],["enter",l,e],["exit",l,e],["exit",i,e]]),t[n][1].end.offset-t[n][1].start.offset?(u=2,c=st(c,[["enter",t[n][1],e],["exit",t[n][1],e]])):u=0,dt(t,r-1,n-r+3,c),n=r+c.length-u-2;break}}for(n=-1;++n<t.length;)t[n][1].type==="attentionSequence"&&(t[n][1].type="data");return t}function rl(t,e){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=En(r);let o;return a;function a(s){return o=s,t.enter("attentionSequence"),l(s)}function l(s){if(s===o)return t.consume(s),l;const c=t.exit("attentionSequence"),u=En(s),p=!u||u===2&&i||n.includes(s),m=!i||i===2&&u||n.includes(r);return c._open=!!(o===42?p:p&&(i||!m)),c._close=!!(o===42?m:m&&(u||!p)),e(s)}}function Cn(t,e){t.column+=e,t.offset+=e,t._bufferIndex+=e}const il={name:"autolink",tokenize:ol};function ol(t,e,n){let r=0;return i;function i(f){return t.enter("autolink"),t.enter("autolinkMarker"),t.consume(f),t.exit("autolinkMarker"),t.enter("autolinkProtocol"),o}function o(f){return ht(f)?(t.consume(f),a):f===64?n(f):c(f)}function a(f){return f===43||f===45||f===46||lt(f)?(r=1,l(f)):c(f)}function l(f){return f===58?(t.consume(f),r=0,s):(f===43||f===45||f===46||lt(f))&&r++<32?(t.consume(f),l):(r=0,c(f))}function s(f){return f===62?(t.exit("autolinkProtocol"),t.enter("autolinkMarker"),t.consume(f),t.exit("autolinkMarker"),t.exit("autolink"),e):f===null||f===32||f===60||Oe(f)?n(f):(t.consume(f),s)}function c(f){return f===64?(t.consume(f),u):Wa(f)?(t.consume(f),c):n(f)}function u(f){return lt(f)?p(f):n(f)}function p(f){return f===46?(t.consume(f),r=0,u):f===62?(t.exit("autolinkProtocol").type="autolinkEmail",t.enter("autolinkMarker"),t.consume(f),t.exit("autolinkMarker"),t.exit("autolink"),e):m(f)}function m(f){if((f===45||lt(f))&&r++<63){const y=f===45?m:p;return t.consume(f),y}return n(f)}}const ce={partial:!0,tokenize:al};function al(t,e,n){return r;function r(o){return $(o)?W(t,i,"linePrefix")(o):i(o)}function i(o){return o===null||z(o)?e(o):n(o)}}const Er={continuation:{tokenize:sl},exit:ul,name:"blockQuote",tokenize:ll};function ll(t,e,n){const r=this;return i;function i(a){if(a===62){const l=r.containerState;return l.open||(t.enter("blockQuote",{_container:!0}),l.open=!0),t.enter("blockQuotePrefix"),t.enter("blockQuoteMarker"),t.consume(a),t.exit("blockQuoteMarker"),o}return n(a)}function o(a){return $(a)?(t.enter("blockQuotePrefixWhitespace"),t.consume(a),t.exit("blockQuotePrefixWhitespace"),t.exit("blockQuotePrefix"),e):(t.exit("blockQuotePrefix"),e(a))}}function sl(t,e,n){const r=this;return i;function i(a){return $(a)?W(t,o,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a):o(a)}function o(a){return t.attempt(Er,e,n)(a)}}function ul(t){t.exit("blockQuote")}const Cr={name:"characterEscape",tokenize:cl};function cl(t,e,n){return r;function r(o){return t.enter("characterEscape"),t.enter("escapeMarker"),t.consume(o),t.exit("escapeMarker"),i}function i(o){return Ya(o)?(t.enter("characterEscapeValue"),t.consume(o),t.exit("characterEscapeValue"),t.exit("characterEscape"),e):n(o)}}const Ir={name:"characterReference",tokenize:fl};function fl(t,e,n){const r=this;let i=0,o,a;return l;function l(p){return t.enter("characterReference"),t.enter("characterReferenceMarker"),t.consume(p),t.exit("characterReferenceMarker"),s}function s(p){return p===35?(t.enter("characterReferenceMarkerNumeric"),t.consume(p),t.exit("characterReferenceMarkerNumeric"),c):(t.enter("characterReferenceValue"),o=31,a=lt,u(p))}function c(p){return p===88||p===120?(t.enter("characterReferenceMarkerHexadecimal"),t.consume(p),t.exit("characterReferenceMarkerHexadecimal"),t.enter("characterReferenceValue"),o=6,a=Xa,u):(t.enter("characterReferenceValue"),o=7,a=De,u(p))}function u(p){if(p===59&&i){const m=t.exit("characterReferenceValue");return a===lt&&!Ye(r.sliceSerialize(m))?n(p):(t.enter("characterReferenceMarker"),t.consume(p),t.exit("characterReferenceMarker"),t.exit("characterReference"),e)}return a(p)&&i++<o?(t.consume(p),u):n(p)}}const In={partial:!0,tokenize:hl},An={concrete:!0,name:"codeFenced",tokenize:pl};function pl(t,e,n){const r=this,i={partial:!0,tokenize:L};let o=0,a=0,l;return s;function s(b){return c(b)}function c(b){const C=r.events[r.events.length-1];return o=C&&C[1].type==="linePrefix"?C[2].sliceSerialize(C[1],!0).length:0,l=b,t.enter("codeFenced"),t.enter("codeFencedFence"),t.enter("codeFencedFenceSequence"),u(b)}function u(b){return b===l?(a++,t.consume(b),u):a<3?n(b):(t.exit("codeFencedFenceSequence"),$(b)?W(t,p,"whitespace")(b):p(b))}function p(b){return b===null||z(b)?(t.exit("codeFencedFence"),r.interrupt?e(b):t.check(In,x,E)(b)):(t.enter("codeFencedFenceInfo"),t.enter("chunkString",{contentType:"string"}),m(b))}function m(b){return b===null||z(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),p(b)):$(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),W(t,f,"whitespace")(b)):b===96&&b===l?n(b):(t.consume(b),m)}function f(b){return b===null||z(b)?p(b):(t.enter("codeFencedFenceMeta"),t.enter("chunkString",{contentType:"string"}),y(b))}function y(b){return b===null||z(b)?(t.exit("chunkString"),t.exit("codeFencedFenceMeta"),p(b)):b===96&&b===l?n(b):(t.consume(b),y)}function x(b){return t.attempt(i,E,S)(b)}function S(b){return t.enter("lineEnding"),t.consume(b),t.exit("lineEnding"),k}function k(b){return o>0&&$(b)?W(t,v,"linePrefix",o+1)(b):v(b)}function v(b){return b===null||z(b)?t.check(In,x,E)(b):(t.enter("codeFlowValue"),_(b))}function _(b){return b===null||z(b)?(t.exit("codeFlowValue"),v(b)):(t.consume(b),_)}function E(b){return t.exit("codeFenced"),e(b)}function L(b,C,P){let O=0;return R;function R(F){return b.enter("lineEnding"),b.consume(F),b.exit("lineEnding"),I}function I(F){return b.enter("codeFencedFence"),$(F)?W(b,A,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(F):A(F)}function A(F){return F===l?(b.enter("codeFencedFenceSequence"),j(F)):P(F)}function j(F){return F===l?(O++,b.consume(F),j):O>=a?(b.exit("codeFencedFenceSequence"),$(F)?W(b,Y,"whitespace")(F):Y(F)):P(F)}function Y(F){return F===null||z(F)?(b.exit("codeFencedFence"),C(F)):P(F)}}}function hl(t,e,n){const r=this;return i;function i(a){return a===null?n(a):(t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),o)}function o(a){return r.parser.lazy[r.now().line]?n(a):e(a)}}const ye={name:"codeIndented",tokenize:ml},dl={partial:!0,tokenize:gl};function ml(t,e,n){const r=this;return i;function i(c){return t.enter("codeIndented"),W(t,o,"linePrefix",5)(c)}function o(c){const u=r.events[r.events.length-1];return u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?a(c):n(c)}function a(c){return c===null?s(c):z(c)?t.attempt(dl,a,s)(c):(t.enter("codeFlowValue"),l(c))}function l(c){return c===null||z(c)?(t.exit("codeFlowValue"),a(c)):(t.consume(c),l)}function s(c){return t.exit("codeIndented"),e(c)}}function gl(t,e,n){const r=this;return i;function i(a){return r.parser.lazy[r.now().line]?n(a):z(a)?(t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),i):W(t,o,"linePrefix",5)(a)}function o(a){const l=r.events[r.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(a):z(a)?i(a):n(a)}}const yl={name:"codeText",previous:kl,resolve:xl,tokenize:bl};function xl(t){let e=t.length-4,n=3,r,i;if((t[n][1].type==="lineEnding"||t[n][1].type==="space")&&(t[e][1].type==="lineEnding"||t[e][1].type==="space")){for(r=n;++r<e;)if(t[r][1].type==="codeTextData"){t[n][1].type="codeTextPadding",t[e][1].type="codeTextPadding",n+=2,e-=2;break}}for(r=n-1,e++;++r<=e;)i===void 0?r!==e&&t[r][1].type!=="lineEnding"&&(i=r):(r===e||t[r][1].type==="lineEnding")&&(t[i][1].type="codeTextData",r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),e-=r-i-2,r=i+2),i=void 0);return t}function kl(t){return t!==96||this.events[this.events.length-1][1].type==="characterEscape"}function bl(t,e,n){let r=0,i,o;return a;function a(p){return t.enter("codeText"),t.enter("codeTextSequence"),l(p)}function l(p){return p===96?(t.consume(p),r++,l):(t.exit("codeTextSequence"),s(p))}function s(p){return p===null?n(p):p===32?(t.enter("space"),t.consume(p),t.exit("space"),s):p===96?(o=t.enter("codeTextSequence"),i=0,u(p)):z(p)?(t.enter("lineEnding"),t.consume(p),t.exit("lineEnding"),s):(t.enter("codeTextData"),c(p))}function c(p){return p===null||p===32||p===96||z(p)?(t.exit("codeTextData"),s(p)):(t.consume(p),c)}function u(p){return p===96?(t.consume(p),i++,u):i===r?(t.exit("codeTextSequence"),t.exit("codeText"),e(p)):(o.type="codeTextData",c(p))}}class _l{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(e,r):e>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(e,n,r){const i=n||0;this.setCursor(Math.trunc(e));const o=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&jt(this.left,r),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),jt(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),jt(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){const n=this.left.splice(e,Number.POSITIVE_INFINITY);jt(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);jt(this.left,n.reverse())}}}function jt(t,e){let n=0;if(e.length<1e4)t.push(...e);else for(;n<e.length;)t.push(...e.slice(n,n+1e4)),n+=1e4}function Ar(t){const e={};let n=-1,r,i,o,a,l,s,c;const u=new _l(t);for(;++n<u.length;){for(;n in e;)n=e[n];if(r=u.get(n),n&&r[1].type==="chunkFlow"&&u.get(n-1)[1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,o=0,o<s.length&&s[o][1].type==="lineEndingBlank"&&(o+=2),o<s.length&&s[o][1].type==="content"))for(;++o<s.length&&s[o][1].type!=="content";)s[o][1].type==="chunkText"&&(s[o][1]._isInFirstContentOfListItem=!0,o++);if(r[0]==="enter")r[1].contentType&&(Object.assign(e,wl(u,n)),n=e[n],c=!0);else if(r[1]._container){for(o=n,i=void 0;o--;)if(a=u.get(o),a[1].type==="lineEnding"||a[1].type==="lineEndingBlank")a[0]==="enter"&&(i&&(u.get(i)[1].type="lineEndingBlank"),a[1].type="lineEnding",i=o);else if(!(a[1].type==="linePrefix"||a[1].type==="listItemIndent"))break;i&&(r[1].end={...u.get(i)[1].start},l=u.slice(i,n),l.unshift(r),u.splice(i,n-i+1,l))}}return dt(t,0,Number.POSITIVE_INFINITY,u.slice(0)),!c}function wl(t,e){const n=t.get(e)[1],r=t.get(e)[2];let i=e-1;const o=[];let a=n._tokenizer;a||(a=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(a._contentTypeTextTrailing=!0));const l=a.events,s=[],c={};let u,p,m=-1,f=n,y=0,x=0;const S=[x];for(;f;){for(;t.get(++i)[1]!==f;);o.push(i),f._tokenizer||(u=r.sliceStream(f),f.next||u.push(null),p&&a.defineSkip(f.start),f._isInFirstContentOfListItem&&(a._gfmTasklistFirstContentOfListItem=!0),a.write(u),f._isInFirstContentOfListItem&&(a._gfmTasklistFirstContentOfListItem=void 0)),p=f,f=f.next}for(f=n;++m<l.length;)l[m][0]==="exit"&&l[m-1][0]==="enter"&&l[m][1].type===l[m-1][1].type&&l[m][1].start.line!==l[m][1].end.line&&(x=m+1,S.push(x),f._tokenizer=void 0,f.previous=void 0,f=f.next);for(a.events=[],f?(f._tokenizer=void 0,f.previous=void 0):S.pop(),m=S.length;m--;){const k=l.slice(S[m],S[m+1]),v=o.pop();s.push([v,v+k.length-1]),t.splice(v,2,k)}for(s.reverse(),m=-1;++m<s.length;)c[y+s[m][0]]=y+s[m][1],y+=s[m][1]-s[m][0]-1;return c}const vl={resolve:Sl,tokenize:El},Tl={partial:!0,tokenize:Cl};function Sl(t){return Ar(t),t}function El(t,e){let n;return r;function r(l){return t.enter("content"),n=t.enter("chunkContent",{contentType:"content"}),i(l)}function i(l){return l===null?o(l):z(l)?t.check(Tl,a,o)(l):(t.consume(l),i)}function o(l){return t.exit("chunkContent"),t.exit("content"),e(l)}function a(l){return t.consume(l),t.exit("chunkContent"),n.next=t.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function Cl(t,e,n){const r=this;return i;function i(a){return t.exit("chunkContent"),t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),W(t,o,"linePrefix")}function o(a){if(a===null||z(a))return n(a);const l=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(a):t.interrupt(r.parser.constructs.flow,n,e)(a)}}function Pr(t,e,n,r,i,o,a,l,s){const c=s||Number.POSITIVE_INFINITY;let u=0;return p;function p(k){return k===60?(t.enter(r),t.enter(i),t.enter(o),t.consume(k),t.exit(o),m):k===null||k===32||k===41||Oe(k)?n(k):(t.enter(r),t.enter(a),t.enter(l),t.enter("chunkString",{contentType:"string"}),x(k))}function m(k){return k===62?(t.enter(o),t.consume(k),t.exit(o),t.exit(i),t.exit(r),e):(t.enter(l),t.enter("chunkString",{contentType:"string"}),f(k))}function f(k){return k===62?(t.exit("chunkString"),t.exit(l),m(k)):k===null||k===60||z(k)?n(k):(t.consume(k),k===92?y:f)}function y(k){return k===60||k===62||k===92?(t.consume(k),f):f(k)}function x(k){return!u&&(k===null||k===41||rt(k))?(t.exit("chunkString"),t.exit(l),t.exit(a),t.exit(r),e(k)):u<c&&k===40?(t.consume(k),u++,x):k===41?(t.consume(k),u--,x):k===null||k===32||k===40||Oe(k)?n(k):(t.consume(k),k===92?S:x)}function S(k){return k===40||k===41||k===92?(t.consume(k),x):x(k)}}function zr(t,e,n,r,i,o){const a=this;let l=0,s;return c;function c(f){return t.enter(r),t.enter(i),t.consume(f),t.exit(i),t.enter(o),u}function u(f){return l>999||f===null||f===91||f===93&&!s||f===94&&!l&&"_hiddenFootnoteSupport"in a.parser.constructs?n(f):f===93?(t.exit(o),t.enter(i),t.consume(f),t.exit(i),t.exit(r),e):z(f)?(t.enter("lineEnding"),t.consume(f),t.exit("lineEnding"),u):(t.enter("chunkString",{contentType:"string"}),p(f))}function p(f){return f===null||f===91||f===93||z(f)||l++>999?(t.exit("chunkString"),u(f)):(t.consume(f),s||(s=!$(f)),f===92?m:p)}function m(f){return f===91||f===92||f===93?(t.consume(f),l++,p):p(f)}}function Lr(t,e,n,r,i,o){let a;return l;function l(m){return m===34||m===39||m===40?(t.enter(r),t.enter(i),t.consume(m),t.exit(i),a=m===40?41:m,s):n(m)}function s(m){return m===a?(t.enter(i),t.consume(m),t.exit(i),t.exit(r),e):(t.enter(o),c(m))}function c(m){return m===a?(t.exit(o),s(a)):m===null?n(m):z(m)?(t.enter("lineEnding"),t.consume(m),t.exit("lineEnding"),W(t,c,"linePrefix")):(t.enter("chunkString",{contentType:"string"}),u(m))}function u(m){return m===a||m===null||z(m)?(t.exit("chunkString"),c(m)):(t.consume(m),m===92?p:u)}function p(m){return m===a||m===92?(t.consume(m),u):u(m)}}function Ut(t,e){let n;return r;function r(i){return z(i)?(t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),n=!0,r):$(i)?W(t,r,n?"linePrefix":"lineSuffix")(i):e(i)}}const Il={name:"definition",tokenize:Pl},Al={partial:!0,tokenize:zl};function Pl(t,e,n){const r=this;let i;return o;function o(f){return t.enter("definition"),a(f)}function a(f){return zr.call(r,t,l,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(f)}function l(f){return i=Nt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),f===58?(t.enter("definitionMarker"),t.consume(f),t.exit("definitionMarker"),s):n(f)}function s(f){return rt(f)?Ut(t,c)(f):c(f)}function c(f){return Pr(t,u,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(f)}function u(f){return t.attempt(Al,p,p)(f)}function p(f){return $(f)?W(t,m,"whitespace")(f):m(f)}function m(f){return f===null||z(f)?(t.exit("definition"),r.parser.defined.push(i),e(f)):n(f)}}function zl(t,e,n){return r;function r(l){return rt(l)?Ut(t,i)(l):n(l)}function i(l){return Lr(t,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function o(l){return $(l)?W(t,a,"whitespace")(l):a(l)}function a(l){return l===null||z(l)?e(l):n(l)}}const Ll={name:"hardBreakEscape",tokenize:Ml};function Ml(t,e,n){return r;function r(o){return t.enter("hardBreakEscape"),t.consume(o),i}function i(o){return z(o)?(t.exit("hardBreakEscape"),e(o)):n(o)}}const Nl={name:"headingAtx",resolve:Ol,tokenize:Dl};function Ol(t,e){let n=t.length-2,r=3,i,o;return t[r][1].type==="whitespace"&&(r+=2),n-2>r&&t[n][1].type==="whitespace"&&(n-=2),t[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&t[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:t[r][1].start,end:t[n][1].end},o={type:"chunkText",start:t[r][1].start,end:t[n][1].end,contentType:"text"},dt(t,r,n-r+1,[["enter",i,e],["enter",o,e],["exit",o,e],["exit",i,e]])),t}function Dl(t,e,n){let r=0;return i;function i(u){return t.enter("atxHeading"),o(u)}function o(u){return t.enter("atxHeadingSequence"),a(u)}function a(u){return u===35&&r++<6?(t.consume(u),a):u===null||rt(u)?(t.exit("atxHeadingSequence"),l(u)):n(u)}function l(u){return u===35?(t.enter("atxHeadingSequence"),s(u)):u===null||z(u)?(t.exit("atxHeading"),e(u)):$(u)?W(t,l,"whitespace")(u):(t.enter("atxHeadingText"),c(u))}function s(u){return u===35?(t.consume(u),s):(t.exit("atxHeadingSequence"),l(u))}function c(u){return u===null||u===35||rt(u)?(t.exit("atxHeadingText"),l(u)):(t.consume(u),c)}}const Rl=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Pn=["pre","script","style","textarea"],Fl={concrete:!0,name:"htmlFlow",resolveTo:$l,tokenize:Hl},Bl={partial:!0,tokenize:Vl},jl={partial:!0,tokenize:Ul};function $l(t){let e=t.length;for(;e--&&!(t[e][0]==="enter"&&t[e][1].type==="htmlFlow"););return e>1&&t[e-2][1].type==="linePrefix"&&(t[e][1].start=t[e-2][1].start,t[e+1][1].start=t[e-2][1].start,t.splice(e-2,2)),t}function Hl(t,e,n){const r=this;let i,o,a,l,s;return c;function c(d){return u(d)}function u(d){return t.enter("htmlFlow"),t.enter("htmlFlowData"),t.consume(d),p}function p(d){return d===33?(t.consume(d),m):d===47?(t.consume(d),o=!0,x):d===63?(t.consume(d),i=3,r.interrupt?e:h):ht(d)?(t.consume(d),a=String.fromCharCode(d),S):n(d)}function m(d){return d===45?(t.consume(d),i=2,f):d===91?(t.consume(d),i=5,l=0,y):ht(d)?(t.consume(d),i=4,r.interrupt?e:h):n(d)}function f(d){return d===45?(t.consume(d),r.interrupt?e:h):n(d)}function y(d){const ct="CDATA[";return d===ct.charCodeAt(l++)?(t.consume(d),l===ct.length?r.interrupt?e:A:y):n(d)}function x(d){return ht(d)?(t.consume(d),a=String.fromCharCode(d),S):n(d)}function S(d){if(d===null||d===47||d===62||rt(d)){const ct=d===47,vt=a.toLowerCase();return!ct&&!o&&Pn.includes(vt)?(i=1,r.interrupt?e(d):A(d)):Rl.includes(a.toLowerCase())?(i=6,ct?(t.consume(d),k):r.interrupt?e(d):A(d)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(d):o?v(d):_(d))}return d===45||lt(d)?(t.consume(d),a+=String.fromCharCode(d),S):n(d)}function k(d){return d===62?(t.consume(d),r.interrupt?e:A):n(d)}function v(d){return $(d)?(t.consume(d),v):R(d)}function _(d){return d===47?(t.consume(d),R):d===58||d===95||ht(d)?(t.consume(d),E):$(d)?(t.consume(d),_):R(d)}function E(d){return d===45||d===46||d===58||d===95||lt(d)?(t.consume(d),E):L(d)}function L(d){return d===61?(t.consume(d),b):$(d)?(t.consume(d),L):_(d)}function b(d){return d===null||d===60||d===61||d===62||d===96?n(d):d===34||d===39?(t.consume(d),s=d,C):$(d)?(t.consume(d),b):P(d)}function C(d){return d===s?(t.consume(d),s=null,O):d===null||z(d)?n(d):(t.consume(d),C)}function P(d){return d===null||d===34||d===39||d===47||d===60||d===61||d===62||d===96||rt(d)?L(d):(t.consume(d),P)}function O(d){return d===47||d===62||$(d)?_(d):n(d)}function R(d){return d===62?(t.consume(d),I):n(d)}function I(d){return d===null||z(d)?A(d):$(d)?(t.consume(d),I):n(d)}function A(d){return d===45&&i===2?(t.consume(d),G):d===60&&i===1?(t.consume(d),Q):d===62&&i===4?(t.consume(d),ut):d===63&&i===3?(t.consume(d),h):d===93&&i===5?(t.consume(d),mt):z(d)&&(i===6||i===7)?(t.exit("htmlFlowData"),t.check(Bl,gt,j)(d)):d===null||z(d)?(t.exit("htmlFlowData"),j(d)):(t.consume(d),A)}function j(d){return t.check(jl,Y,gt)(d)}function Y(d){return t.enter("lineEnding"),t.consume(d),t.exit("lineEnding"),F}function F(d){return d===null||z(d)?j(d):(t.enter("htmlFlowData"),A(d))}function G(d){return d===45?(t.consume(d),h):A(d)}function Q(d){return d===47?(t.consume(d),a="",Z):A(d)}function Z(d){if(d===62){const ct=a.toLowerCase();return Pn.includes(ct)?(t.consume(d),ut):A(d)}return ht(d)&&a.length<8?(t.consume(d),a+=String.fromCharCode(d),Z):A(d)}function mt(d){return d===93?(t.consume(d),h):A(d)}function h(d){return d===62?(t.consume(d),ut):d===45&&i===2?(t.consume(d),h):A(d)}function ut(d){return d===null||z(d)?(t.exit("htmlFlowData"),gt(d)):(t.consume(d),ut)}function gt(d){return t.exit("htmlFlow"),e(d)}}function Ul(t,e,n){const r=this;return i;function i(a){return z(a)?(t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),o):n(a)}function o(a){return r.parser.lazy[r.now().line]?n(a):e(a)}}function Vl(t,e,n){return r;function r(i){return t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),t.attempt(ce,e,n)}}const ql={name:"htmlText",tokenize:Wl};function Wl(t,e,n){const r=this;let i,o,a;return l;function l(h){return t.enter("htmlText"),t.enter("htmlTextData"),t.consume(h),s}function s(h){return h===33?(t.consume(h),c):h===47?(t.consume(h),L):h===63?(t.consume(h),_):ht(h)?(t.consume(h),P):n(h)}function c(h){return h===45?(t.consume(h),u):h===91?(t.consume(h),o=0,y):ht(h)?(t.consume(h),v):n(h)}function u(h){return h===45?(t.consume(h),f):n(h)}function p(h){return h===null?n(h):h===45?(t.consume(h),m):z(h)?(a=p,Q(h)):(t.consume(h),p)}function m(h){return h===45?(t.consume(h),f):p(h)}function f(h){return h===62?G(h):h===45?m(h):p(h)}function y(h){const ut="CDATA[";return h===ut.charCodeAt(o++)?(t.consume(h),o===ut.length?x:y):n(h)}function x(h){return h===null?n(h):h===93?(t.consume(h),S):z(h)?(a=x,Q(h)):(t.consume(h),x)}function S(h){return h===93?(t.consume(h),k):x(h)}function k(h){return h===62?G(h):h===93?(t.consume(h),k):x(h)}function v(h){return h===null||h===62?G(h):z(h)?(a=v,Q(h)):(t.consume(h),v)}function _(h){return h===null?n(h):h===63?(t.consume(h),E):z(h)?(a=_,Q(h)):(t.consume(h),_)}function E(h){return h===62?G(h):_(h)}function L(h){return ht(h)?(t.consume(h),b):n(h)}function b(h){return h===45||lt(h)?(t.consume(h),b):C(h)}function C(h){return z(h)?(a=C,Q(h)):$(h)?(t.consume(h),C):G(h)}function P(h){return h===45||lt(h)?(t.consume(h),P):h===47||h===62||rt(h)?O(h):n(h)}function O(h){return h===47?(t.consume(h),G):h===58||h===95||ht(h)?(t.consume(h),R):z(h)?(a=O,Q(h)):$(h)?(t.consume(h),O):G(h)}function R(h){return h===45||h===46||h===58||h===95||lt(h)?(t.consume(h),R):I(h)}function I(h){return h===61?(t.consume(h),A):z(h)?(a=I,Q(h)):$(h)?(t.consume(h),I):O(h)}function A(h){return h===null||h===60||h===61||h===62||h===96?n(h):h===34||h===39?(t.consume(h),i=h,j):z(h)?(a=A,Q(h)):$(h)?(t.consume(h),A):(t.consume(h),Y)}function j(h){return h===i?(t.consume(h),i=void 0,F):h===null?n(h):z(h)?(a=j,Q(h)):(t.consume(h),j)}function Y(h){return h===null||h===34||h===39||h===60||h===61||h===96?n(h):h===47||h===62||rt(h)?O(h):(t.consume(h),Y)}function F(h){return h===47||h===62||rt(h)?O(h):n(h)}function G(h){return h===62?(t.consume(h),t.exit("htmlTextData"),t.exit("htmlText"),e):n(h)}function Q(h){return t.exit("htmlTextData"),t.enter("lineEnding"),t.consume(h),t.exit("lineEnding"),Z}function Z(h){return $(h)?W(t,mt,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h):mt(h)}function mt(h){return t.enter("htmlTextData"),a(h)}}const Ke={name:"labelEnd",resolveAll:Kl,resolveTo:Gl,tokenize:Jl},Xl={tokenize:Zl},Yl={tokenize:ts},Ql={tokenize:es};function Kl(t){let e=-1;const n=[];for(;++e<t.length;){const r=t[e][1];if(n.push(t[e]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",e+=i}}return t.length!==n.length&&dt(t,0,t.length,n),t}function Gl(t,e){let n=t.length,r=0,i,o,a,l;for(;n--;)if(i=t[n][1],o){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;t[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(a){if(t[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(o=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(a=n);const s={type:t[o][1].type==="labelLink"?"link":"image",start:{...t[o][1].start},end:{...t[t.length-1][1].end}},c={type:"label",start:{...t[o][1].start},end:{...t[a][1].end}},u={type:"labelText",start:{...t[o+r+2][1].end},end:{...t[a-2][1].start}};return l=[["enter",s,e],["enter",c,e]],l=st(l,t.slice(o+1,o+r+3)),l=st(l,[["enter",u,e]]),l=st(l,Qe(e.parser.constructs.insideSpan.null,t.slice(o+r+4,a-3),e)),l=st(l,[["exit",u,e],t[a-2],t[a-1],["exit",c,e]]),l=st(l,t.slice(a+1)),l=st(l,[["exit",s,e]]),dt(t,o,t.length,l),t}function Jl(t,e,n){const r=this;let i=r.events.length,o,a;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){o=r.events[i][1];break}return l;function l(m){return o?o._inactive?p(m):(a=r.parser.defined.includes(Nt(r.sliceSerialize({start:o.end,end:r.now()}))),t.enter("labelEnd"),t.enter("labelMarker"),t.consume(m),t.exit("labelMarker"),t.exit("labelEnd"),s):n(m)}function s(m){return m===40?t.attempt(Xl,u,a?u:p)(m):m===91?t.attempt(Yl,u,a?c:p)(m):a?u(m):p(m)}function c(m){return t.attempt(Ql,u,p)(m)}function u(m){return e(m)}function p(m){return o._balanced=!0,n(m)}}function Zl(t,e,n){return r;function r(p){return t.enter("resource"),t.enter("resourceMarker"),t.consume(p),t.exit("resourceMarker"),i}function i(p){return rt(p)?Ut(t,o)(p):o(p)}function o(p){return p===41?u(p):Pr(t,a,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(p)}function a(p){return rt(p)?Ut(t,s)(p):u(p)}function l(p){return n(p)}function s(p){return p===34||p===39||p===40?Lr(t,c,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(p):u(p)}function c(p){return rt(p)?Ut(t,u)(p):u(p)}function u(p){return p===41?(t.enter("resourceMarker"),t.consume(p),t.exit("resourceMarker"),t.exit("resource"),e):n(p)}}function ts(t,e,n){const r=this;return i;function i(l){return zr.call(r,t,o,a,"reference","referenceMarker","referenceString")(l)}function o(l){return r.parser.defined.includes(Nt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?e(l):n(l)}function a(l){return n(l)}}function es(t,e,n){return r;function r(o){return t.enter("reference"),t.enter("referenceMarker"),t.consume(o),t.exit("referenceMarker"),i}function i(o){return o===93?(t.enter("referenceMarker"),t.consume(o),t.exit("referenceMarker"),t.exit("reference"),e):n(o)}}const ns={name:"labelStartImage",resolveAll:Ke.resolveAll,tokenize:rs};function rs(t,e,n){const r=this;return i;function i(l){return t.enter("labelImage"),t.enter("labelImageMarker"),t.consume(l),t.exit("labelImageMarker"),o}function o(l){return l===91?(t.enter("labelMarker"),t.consume(l),t.exit("labelMarker"),t.exit("labelImage"),a):n(l)}function a(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):e(l)}}const is={name:"labelStartLink",resolveAll:Ke.resolveAll,tokenize:os};function os(t,e,n){const r=this;return i;function i(a){return t.enter("labelLink"),t.enter("labelMarker"),t.consume(a),t.exit("labelMarker"),t.exit("labelLink"),o}function o(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):e(a)}}const xe={name:"lineEnding",tokenize:as};function as(t,e){return n;function n(r){return t.enter("lineEnding"),t.consume(r),t.exit("lineEnding"),W(t,e,"linePrefix")}}const ee={name:"thematicBreak",tokenize:ls};function ls(t,e,n){let r=0,i;return o;function o(c){return t.enter("thematicBreak"),a(c)}function a(c){return i=c,l(c)}function l(c){return c===i?(t.enter("thematicBreakSequence"),s(c)):r>=3&&(c===null||z(c))?(t.exit("thematicBreak"),e(c)):n(c)}function s(c){return c===i?(t.consume(c),r++,s):(t.exit("thematicBreakSequence"),$(c)?W(t,l,"whitespace")(c):l(c))}}const nt={continuation:{tokenize:fs},exit:hs,name:"list",tokenize:cs},ss={partial:!0,tokenize:ds},us={partial:!0,tokenize:ps};function cs(t,e,n){const r=this,i=r.events[r.events.length-1];let o=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,a=0;return l;function l(f){const y=r.containerState.type||(f===42||f===43||f===45?"listUnordered":"listOrdered");if(y==="listUnordered"?!r.containerState.marker||f===r.containerState.marker:De(f)){if(r.containerState.type||(r.containerState.type=y,t.enter(y,{_container:!0})),y==="listUnordered")return t.enter("listItemPrefix"),f===42||f===45?t.check(ee,n,c)(f):c(f);if(!r.interrupt||f===49)return t.enter("listItemPrefix"),t.enter("listItemValue"),s(f)}return n(f)}function s(f){return De(f)&&++a<10?(t.consume(f),s):(!r.interrupt||a<2)&&(r.containerState.marker?f===r.containerState.marker:f===41||f===46)?(t.exit("listItemValue"),c(f)):n(f)}function c(f){return t.enter("listItemMarker"),t.consume(f),t.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||f,t.check(ce,r.interrupt?n:u,t.attempt(ss,m,p))}function u(f){return r.containerState.initialBlankLine=!0,o++,m(f)}function p(f){return $(f)?(t.enter("listItemPrefixWhitespace"),t.consume(f),t.exit("listItemPrefixWhitespace"),m):n(f)}function m(f){return r.containerState.size=o+r.sliceSerialize(t.exit("listItemPrefix"),!0).length,e(f)}}function fs(t,e,n){const r=this;return r.containerState._closeFlow=void 0,t.check(ce,i,o);function i(l){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,W(t,e,"listItemIndent",r.containerState.size+1)(l)}function o(l){return r.containerState.furtherBlankLines||!$(l)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,a(l)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,t.attempt(us,e,a)(l))}function a(l){return r.containerState._closeFlow=!0,r.interrupt=void 0,W(t,t.attempt(nt,e,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function ps(t,e,n){const r=this;return W(t,i,"listItemIndent",r.containerState.size+1);function i(o){const a=r.events[r.events.length-1];return a&&a[1].type==="listItemIndent"&&a[2].sliceSerialize(a[1],!0).length===r.containerState.size?e(o):n(o)}}function hs(t){t.exit(this.containerState.type)}function ds(t,e,n){const r=this;return W(t,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(o){const a=r.events[r.events.length-1];return!$(o)&&a&&a[1].type==="listItemPrefixWhitespace"?e(o):n(o)}}const zn={name:"setextUnderline",resolveTo:ms,tokenize:gs};function ms(t,e){let n=t.length,r,i,o;for(;n--;)if(t[n][0]==="enter"){if(t[n][1].type==="content"){r=n;break}t[n][1].type==="paragraph"&&(i=n)}else t[n][1].type==="content"&&t.splice(n,1),!o&&t[n][1].type==="definition"&&(o=n);const a={type:"setextHeading",start:{...t[r][1].start},end:{...t[t.length-1][1].end}};return t[i][1].type="setextHeadingText",o?(t.splice(i,0,["enter",a,e]),t.splice(o+1,0,["exit",t[r][1],e]),t[r][1].end={...t[o][1].end}):t[r][1]=a,t.push(["exit",a,e]),t}function gs(t,e,n){const r=this;let i;return o;function o(c){let u=r.events.length,p;for(;u--;)if(r.events[u][1].type!=="lineEnding"&&r.events[u][1].type!=="linePrefix"&&r.events[u][1].type!=="content"){p=r.events[u][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||p)?(t.enter("setextHeadingLine"),i=c,a(c)):n(c)}function a(c){return t.enter("setextHeadingLineSequence"),l(c)}function l(c){return c===i?(t.consume(c),l):(t.exit("setextHeadingLineSequence"),$(c)?W(t,s,"lineSuffix")(c):s(c))}function s(c){return c===null||z(c)?(t.exit("setextHeadingLine"),e(c)):n(c)}}const ys={tokenize:xs};function xs(t){const e=this,n=t.attempt(ce,r,t.attempt(this.parser.constructs.flowInitial,i,W(t,t.attempt(this.parser.constructs.flow,i,t.attempt(vl,i)),"linePrefix")));return n;function r(o){if(o===null){t.consume(o);return}return t.enter("lineEndingBlank"),t.consume(o),t.exit("lineEndingBlank"),e.currentConstruct=void 0,n}function i(o){if(o===null){t.consume(o);return}return t.enter("lineEnding"),t.consume(o),t.exit("lineEnding"),e.currentConstruct=void 0,n}}const ks={resolveAll:Nr()},bs=Mr("string"),_s=Mr("text");function Mr(t){return{resolveAll:Nr(t==="text"?ws:void 0),tokenize:e};function e(n){const r=this,i=this.parser.constructs[t],o=n.attempt(i,a,l);return a;function a(u){return c(u)?o(u):l(u)}function l(u){if(u===null){n.consume(u);return}return n.enter("data"),n.consume(u),s}function s(u){return c(u)?(n.exit("data"),o(u)):(n.consume(u),s)}function c(u){if(u===null)return!0;const p=i[u];let m=-1;if(p)for(;++m<p.length;){const f=p[m];if(!f.previous||f.previous.call(r,r.previous))return!0}return!1}}}function Nr(t){return e;function e(n,r){let i=-1,o;for(;++i<=n.length;)o===void 0?n[i]&&n[i][1].type==="data"&&(o=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==o+2&&(n[o][1].end=n[i-1][1].end,n.splice(o+2,i-o-2),i=o+2),o=void 0);return t?t(n,r):n}}function ws(t,e){let n=0;for(;++n<=t.length;)if((n===t.length||t[n][1].type==="lineEnding")&&t[n-1][1].type==="data"){const r=t[n-1][1],i=e.sliceStream(r);let o=i.length,a=-1,l=0,s;for(;o--;){const c=i[o];if(typeof c=="string"){for(a=c.length;c.charCodeAt(a-1)===32;)l++,a--;if(a)break;a=-1}else if(c===-2)s=!0,l++;else if(c!==-1){o++;break}}if(e._contentTypeTextTrailing&&n===t.length&&(l=0),l){const c={type:n===t.length||s||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?a:r.start._bufferIndex+a,_index:r.start._index+o,line:r.end.line,column:r.end.column-l,offset:r.end.offset-l},end:{...r.end}};r.end={...c.start},r.start.offset===r.end.offset?Object.assign(r,c):(t.splice(n,0,["enter",c,e],["exit",c,e]),n+=2)}n++}return t}const vs={42:nt,43:nt,45:nt,48:nt,49:nt,50:nt,51:nt,52:nt,53:nt,54:nt,55:nt,56:nt,57:nt,62:Er},Ts={91:Il},Ss={[-2]:ye,[-1]:ye,32:ye},Es={35:Nl,42:ee,45:[zn,ee],60:Fl,61:zn,95:ee,96:An,126:An},Cs={38:Ir,92:Cr},Is={[-5]:xe,[-4]:xe,[-3]:xe,33:ns,38:Ir,42:Re,60:[il,ql],91:is,92:[Ll,Cr],93:Ke,95:Re,96:yl},As={null:[Re,ks]},Ps={null:[42,95]},zs={null:[]},Ls=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:Ps,contentInitial:Ts,disable:zs,document:vs,flow:Es,flowInitial:Ss,insideSpan:As,string:Cs,text:Is},Symbol.toStringTag,{value:"Module"}));function Ms(t,e,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},o=[];let a=[],l=[];const s={attempt:C(L),check:C(b),consume:v,enter:_,exit:E,interrupt:C(b,{interrupt:!0})},c={code:null,containerState:{},defineSkip:x,events:[],now:y,parser:t,previous:null,sliceSerialize:m,sliceStream:f,write:p};let u=e.tokenize.call(c,s);return e.resolveAll&&o.push(e),c;function p(I){return a=st(a,I),S(),a[a.length-1]!==null?[]:(P(e,0),c.events=Qe(o,c.events,c),c.events)}function m(I,A){return Os(f(I),A)}function f(I){return Ns(a,I)}function y(){const{_bufferIndex:I,_index:A,line:j,column:Y,offset:F}=r;return{_bufferIndex:I,_index:A,line:j,column:Y,offset:F}}function x(I){i[I.line]=I.column,R()}function S(){let I;for(;r._index<a.length;){const A=a[r._index];if(typeof A=="string")for(I=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===I&&r._bufferIndex<A.length;)k(A.charCodeAt(r._bufferIndex));else k(A)}}function k(I){u=u(I)}function v(I){z(I)?(r.line++,r.column=1,r.offset+=I===-3?2:1,R()):I!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===a[r._index].length&&(r._bufferIndex=-1,r._index++)),c.previous=I}function _(I,A){const j=A||{};return j.type=I,j.start=y(),c.events.push(["enter",j,c]),l.push(j),j}function E(I){const A=l.pop();return A.end=y(),c.events.push(["exit",A,c]),A}function L(I,A){P(I,A.from)}function b(I,A){A.restore()}function C(I,A){return j;function j(Y,F,G){let Q,Z,mt,h;return Array.isArray(Y)?gt(Y):"tokenize"in Y?gt([Y]):ut(Y);function ut(J){return Rt;function Rt(bt){const At=bt!==null&&J[bt],Pt=bt!==null&&J.null,Gt=[...Array.isArray(At)?At:At?[At]:[],...Array.isArray(Pt)?Pt:Pt?[Pt]:[]];return gt(Gt)(bt)}}function gt(J){return Q=J,Z=0,J.length===0?G:d(J[Z])}function d(J){return Rt;function Rt(bt){return h=O(),mt=J,J.partial||(c.currentConstruct=J),J.name&&c.parser.constructs.disable.null.includes(J.name)?vt():J.tokenize.call(A?Object.assign(Object.create(c),A):c,s,ct,vt)(bt)}}function ct(J){return I(mt,h),F}function vt(J){return h.restore(),++Z<Q.length?d(Q[Z]):G}}}function P(I,A){I.resolveAll&&!o.includes(I)&&o.push(I),I.resolve&&dt(c.events,A,c.events.length-A,I.resolve(c.events.slice(A),c)),I.resolveTo&&(c.events=I.resolveTo(c.events,c))}function O(){const I=y(),A=c.previous,j=c.currentConstruct,Y=c.events.length,F=Array.from(l);return{from:Y,restore:G};function G(){r=I,c.previous=A,c.currentConstruct=j,c.events.length=Y,l=F,R()}}function R(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Ns(t,e){const n=e.start._index,r=e.start._bufferIndex,i=e.end._index,o=e.end._bufferIndex;let a;if(n===i)a=[t[n].slice(r,o)];else{if(a=t.slice(n,i),r>-1){const l=a[0];typeof l=="string"?a[0]=l.slice(r):a.shift()}o>0&&a.push(t[i].slice(0,o))}return a}function Os(t,e){let n=-1;const r=[];let i;for(;++n<t.length;){const o=t[n];let a;if(typeof o=="string")a=o;else switch(o){case-5:{a="\r";break}case-4:{a=`
`;break}case-3:{a=`\r
`;break}case-2:{a=e?" ":"	";break}case-1:{if(!e&&i)continue;a=" ";break}default:a=String.fromCharCode(o)}i=o===-2,r.push(a)}return r.join("")}function Ds(t){const r={constructs:Ua([Ls,...(t||{}).extensions||[]]),content:i(Ga),defined:[],document:i(Za),flow:i(ys),lazy:{},string:i(bs),text:i(_s)};return r;function i(o){return a;function a(l){return Ms(r,o,l)}}}function Rs(t){for(;!Ar(t););return t}const Ln=/[\0\t\n\r]/g;function Fs(){let t=1,e="",n=!0,r;return i;function i(o,a,l){const s=[];let c,u,p,m,f;for(o=e+(typeof o=="string"?o.toString():new TextDecoder(a||void 0).decode(o)),p=0,e="",n&&(o.charCodeAt(0)===65279&&p++,n=void 0);p<o.length;){if(Ln.lastIndex=p,c=Ln.exec(o),m=c&&c.index!==void 0?c.index:o.length,f=o.charCodeAt(m),!c){e=o.slice(p);break}if(f===10&&p===m&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),p<m&&(s.push(o.slice(p,m)),t+=m-p),f){case 0:{s.push(65533),t++;break}case 9:{for(u=Math.ceil(t/4)*4,s.push(-2);t++<u;)s.push(-1);break}case 10:{s.push(-4),t=1;break}default:r=!0,t=1}p=m+1}return l&&(r&&s.push(-5),e&&s.push(e),s.push(null)),s}}const Bs=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function js(t){return t.replace(Bs,$s)}function $s(t,e,n){if(e)return e;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),o=i===120||i===88;return Sr(n.slice(o?2:1),o?16:10)}return Ye(n)||t}const Or={}.hasOwnProperty;function Hs(t,e,n){return e&&typeof e=="object"&&(n=e,e=void 0),Us(n)(Rs(Ds(n).document().write(Fs()(t,e,!0))))}function Us(t){const e={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(an),autolinkProtocol:O,autolinkEmail:O,atxHeading:o(nn),blockQuote:o(Pt),characterEscape:O,characterReference:O,codeFenced:o(Gt),codeFencedFenceInfo:a,codeFencedFenceMeta:a,codeIndented:o(Gt,a),codeText:o(Xr,a),codeTextData:O,data:O,codeFlowValue:O,definition:o(Yr),definitionDestinationString:a,definitionLabelString:a,definitionTitleString:a,emphasis:o(Qr),hardBreakEscape:o(rn),hardBreakTrailing:o(rn),htmlFlow:o(on,a),htmlFlowData:O,htmlText:o(on,a),htmlTextData:O,image:o(Kr),label:a,link:o(an),listItem:o(Gr),listItemValue:m,listOrdered:o(ln,p),listUnordered:o(ln),paragraph:o(Jr),reference:d,referenceString:a,resourceDestinationString:a,resourceTitleString:a,setextHeading:o(nn),strong:o(Zr),thematicBreak:o(ei)},exit:{atxHeading:s(),atxHeadingSequence:L,autolink:s(),autolinkEmail:At,autolinkProtocol:bt,blockQuote:s(),characterEscapeValue:R,characterReferenceMarkerHexadecimal:vt,characterReferenceMarkerNumeric:vt,characterReferenceValue:J,characterReference:Rt,codeFenced:s(S),codeFencedFence:x,codeFencedFenceInfo:f,codeFencedFenceMeta:y,codeFlowValue:R,codeIndented:s(k),codeText:s(F),codeTextData:R,data:R,definition:s(),definitionDestinationString:E,definitionLabelString:v,definitionTitleString:_,emphasis:s(),hardBreakEscape:s(A),hardBreakTrailing:s(A),htmlFlow:s(j),htmlFlowData:R,htmlText:s(Y),htmlTextData:R,image:s(Q),label:mt,labelText:Z,lineEnding:I,link:s(G),listItem:s(),listOrdered:s(),listUnordered:s(),paragraph:s(),referenceString:ct,resourceDestinationString:h,resourceTitleString:ut,resource:gt,setextHeading:s(P),setextHeadingLineSequence:C,setextHeadingText:b,strong:s(),thematicBreak:s()}};Dr(e,(t||{}).mdastExtensions||[]);const n={};return r;function r(g){let T={type:"root",children:[]};const M={stack:[T],tokenStack:[],config:e,enter:l,exit:c,buffer:a,resume:u,data:n},B=[];let U=-1;for(;++U<g.length;)if(g[U][1].type==="listOrdered"||g[U][1].type==="listUnordered")if(g[U][0]==="enter")B.push(U);else{const ft=B.pop();U=i(g,ft,U)}for(U=-1;++U<g.length;){const ft=e[g[U][0]];Or.call(ft,g[U][1].type)&&ft[g[U][1].type].call(Object.assign({sliceSerialize:g[U][2].sliceSerialize},M),g[U][1])}if(M.tokenStack.length>0){const ft=M.tokenStack[M.tokenStack.length-1];(ft[1]||Mn).call(M,void 0,ft[0])}for(T.position={start:_t(g.length>0?g[0][1].start:{line:1,column:1,offset:0}),end:_t(g.length>0?g[g.length-2][1].end:{line:1,column:1,offset:0})},U=-1;++U<e.transforms.length;)T=e.transforms[U](T)||T;return T}function i(g,T,M){let B=T-1,U=-1,ft=!1,Tt,yt,Ft,Bt;for(;++B<=M;){const ot=g[B];switch(ot[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ot[0]==="enter"?U++:U--,Bt=void 0;break}case"lineEndingBlank":{ot[0]==="enter"&&(Tt&&!Bt&&!U&&!Ft&&(Ft=B),Bt=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Bt=void 0}if(!U&&ot[0]==="enter"&&ot[1].type==="listItemPrefix"||U===-1&&ot[0]==="exit"&&(ot[1].type==="listUnordered"||ot[1].type==="listOrdered")){if(Tt){let zt=B;for(yt=void 0;zt--;){const xt=g[zt];if(xt[1].type==="lineEnding"||xt[1].type==="lineEndingBlank"){if(xt[0]==="exit")continue;yt&&(g[yt][1].type="lineEndingBlank",ft=!0),xt[1].type="lineEnding",yt=zt}else if(!(xt[1].type==="linePrefix"||xt[1].type==="blockQuotePrefix"||xt[1].type==="blockQuotePrefixWhitespace"||xt[1].type==="blockQuoteMarker"||xt[1].type==="listItemIndent"))break}Ft&&(!yt||Ft<yt)&&(Tt._spread=!0),Tt.end=Object.assign({},yt?g[yt][1].start:ot[1].end),g.splice(yt||B,0,["exit",Tt,ot[2]]),B++,M++}if(ot[1].type==="listItemPrefix"){const zt={type:"listItem",_spread:!1,start:Object.assign({},ot[1].start),end:void 0};Tt=zt,g.splice(B,0,["enter",zt,ot[2]]),B++,M++,Ft=void 0,Bt=!0}}}return g[T][1]._spread=ft,M}function o(g,T){return M;function M(B){l.call(this,g(B),B),T&&T.call(this,B)}}function a(){this.stack.push({type:"fragment",children:[]})}function l(g,T,M){this.stack[this.stack.length-1].children.push(g),this.stack.push(g),this.tokenStack.push([T,M||void 0]),g.position={start:_t(T.start),end:void 0}}function s(g){return T;function T(M){g&&g.call(this,M),c.call(this,M)}}function c(g,T){const M=this.stack.pop(),B=this.tokenStack.pop();if(B)B[0].type!==g.type&&(T?T.call(this,g,B[0]):(B[1]||Mn).call(this,g,B[0]));else throw new Error("Cannot close `"+g.type+"` ("+Ht({start:g.start,end:g.end})+"): it’s not open");M.position.end=_t(g.end)}function u(){return $a(this.stack.pop())}function p(){this.data.expectingFirstListItemValue=!0}function m(g){if(this.data.expectingFirstListItemValue){const T=this.stack[this.stack.length-2];T.start=Number.parseInt(this.sliceSerialize(g),10),this.data.expectingFirstListItemValue=void 0}}function f(){const g=this.resume(),T=this.stack[this.stack.length-1];T.lang=g}function y(){const g=this.resume(),T=this.stack[this.stack.length-1];T.meta=g}function x(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function S(){const g=this.resume(),T=this.stack[this.stack.length-1];T.value=g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function k(){const g=this.resume(),T=this.stack[this.stack.length-1];T.value=g.replace(/(\r?\n|\r)$/g,"")}function v(g){const T=this.resume(),M=this.stack[this.stack.length-1];M.label=T,M.identifier=Nt(this.sliceSerialize(g)).toLowerCase()}function _(){const g=this.resume(),T=this.stack[this.stack.length-1];T.title=g}function E(){const g=this.resume(),T=this.stack[this.stack.length-1];T.url=g}function L(g){const T=this.stack[this.stack.length-1];if(!T.depth){const M=this.sliceSerialize(g).length;T.depth=M}}function b(){this.data.setextHeadingSlurpLineEnding=!0}function C(g){const T=this.stack[this.stack.length-1];T.depth=this.sliceSerialize(g).codePointAt(0)===61?1:2}function P(){this.data.setextHeadingSlurpLineEnding=void 0}function O(g){const M=this.stack[this.stack.length-1].children;let B=M[M.length-1];(!B||B.type!=="text")&&(B=ti(),B.position={start:_t(g.start),end:void 0},M.push(B)),this.stack.push(B)}function R(g){const T=this.stack.pop();T.value+=this.sliceSerialize(g),T.position.end=_t(g.end)}function I(g){const T=this.stack[this.stack.length-1];if(this.data.atHardBreak){const M=T.children[T.children.length-1];M.position.end=_t(g.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&e.canContainEols.includes(T.type)&&(O.call(this,g),R.call(this,g))}function A(){this.data.atHardBreak=!0}function j(){const g=this.resume(),T=this.stack[this.stack.length-1];T.value=g}function Y(){const g=this.resume(),T=this.stack[this.stack.length-1];T.value=g}function F(){const g=this.resume(),T=this.stack[this.stack.length-1];T.value=g}function G(){const g=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";g.type+="Reference",g.referenceType=T,delete g.url,delete g.title}else delete g.identifier,delete g.label;this.data.referenceType=void 0}function Q(){const g=this.stack[this.stack.length-1];if(this.data.inReference){const T=this.data.referenceType||"shortcut";g.type+="Reference",g.referenceType=T,delete g.url,delete g.title}else delete g.identifier,delete g.label;this.data.referenceType=void 0}function Z(g){const T=this.sliceSerialize(g),M=this.stack[this.stack.length-2];M.label=js(T),M.identifier=Nt(T).toLowerCase()}function mt(){const g=this.stack[this.stack.length-1],T=this.resume(),M=this.stack[this.stack.length-1];if(this.data.inReference=!0,M.type==="link"){const B=g.children;M.children=B}else M.alt=T}function h(){const g=this.resume(),T=this.stack[this.stack.length-1];T.url=g}function ut(){const g=this.resume(),T=this.stack[this.stack.length-1];T.title=g}function gt(){this.data.inReference=void 0}function d(){this.data.referenceType="collapsed"}function ct(g){const T=this.resume(),M=this.stack[this.stack.length-1];M.label=T,M.identifier=Nt(this.sliceSerialize(g)).toLowerCase(),this.data.referenceType="full"}function vt(g){this.data.characterReferenceType=g.type}function J(g){const T=this.sliceSerialize(g),M=this.data.characterReferenceType;let B;M?(B=Sr(T,M==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):B=Ye(T);const U=this.stack[this.stack.length-1];U.value+=B}function Rt(g){const T=this.stack.pop();T.position.end=_t(g.end)}function bt(g){R.call(this,g);const T=this.stack[this.stack.length-1];T.url=this.sliceSerialize(g)}function At(g){R.call(this,g);const T=this.stack[this.stack.length-1];T.url="mailto:"+this.sliceSerialize(g)}function Pt(){return{type:"blockquote",children:[]}}function Gt(){return{type:"code",lang:null,meta:null,value:""}}function Xr(){return{type:"inlineCode",value:""}}function Yr(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Qr(){return{type:"emphasis",children:[]}}function nn(){return{type:"heading",depth:0,children:[]}}function rn(){return{type:"break"}}function on(){return{type:"html",value:""}}function Kr(){return{type:"image",title:null,url:"",alt:null}}function an(){return{type:"link",title:null,url:"",children:[]}}function ln(g){return{type:"list",ordered:g.type==="listOrdered",start:null,spread:g._spread,children:[]}}function Gr(g){return{type:"listItem",spread:g._spread,checked:null,children:[]}}function Jr(){return{type:"paragraph",children:[]}}function Zr(){return{type:"strong",children:[]}}function ti(){return{type:"text",value:""}}function ei(){return{type:"thematicBreak"}}}function _t(t){return{line:t.line,column:t.column,offset:t.offset}}function Dr(t,e){let n=-1;for(;++n<e.length;){const r=e[n];Array.isArray(r)?Dr(t,r):Vs(t,r)}}function Vs(t,e){let n;for(n in e)if(Or.call(e,n))switch(n){case"canContainEols":{const r=e[n];r&&t[n].push(...r);break}case"transforms":{const r=e[n];r&&t[n].push(...r);break}case"enter":case"exit":{const r=e[n];r&&Object.assign(t[n],r);break}}}function Mn(t,e){throw t?new Error("Cannot close `"+t.type+"` ("+Ht({start:t.start,end:t.end})+"): a different token (`"+e.type+"`, "+Ht({start:e.start,end:e.end})+") is open"):new Error("Cannot close document, a token (`"+e.type+"`, "+Ht({start:e.start,end:e.end})+") is still open")}function qs(t){const e=this;e.parser=n;function n(r){return Hs(r,{...e.data("settings"),...t,extensions:e.data("micromarkExtensions")||[],mdastExtensions:e.data("fromMarkdownExtensions")||[]})}}function Ws(t,e){const n={type:"element",tagName:"blockquote",properties:{},children:t.wrap(t.all(e),!0)};return t.patch(e,n),t.applyData(e,n)}function Xs(t,e){const n={type:"element",tagName:"br",properties:{},children:[]};return t.patch(e,n),[t.applyData(e,n),{type:"text",value:`
`}]}function Ys(t,e){const n=e.value?e.value+`
`:"",r={},i=e.lang?e.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return e.meta&&(o.data={meta:e.meta}),t.patch(e,o),o=t.applyData(e,o),o={type:"element",tagName:"pre",properties:{},children:[o]},t.patch(e,o),o}function Qs(t,e){const n={type:"element",tagName:"del",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function Ks(t,e){const n={type:"element",tagName:"em",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function Gs(t,e){const n=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",r=String(e.identifier).toUpperCase(),i=Dt(r.toLowerCase()),o=t.footnoteOrder.indexOf(r);let a,l=t.footnoteCounts.get(r);l===void 0?(l=0,t.footnoteOrder.push(r),a=t.footnoteOrder.length):a=o+1,l+=1,t.footnoteCounts.set(r,l);const s={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(a)}]};t.patch(e,s);const c={type:"element",tagName:"sup",properties:{},children:[s]};return t.patch(e,c),t.applyData(e,c)}function Js(t,e){const n={type:"element",tagName:"h"+e.depth,properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function Zs(t,e){if(t.options.allowDangerousHtml){const n={type:"raw",value:e.value};return t.patch(e,n),t.applyData(e,n)}}function Rr(t,e){const n=e.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(e.label||e.identifier)+"]"),e.type==="imageReference")return[{type:"text",value:"!["+e.alt+r}];const i=t.all(e),o=i[0];o&&o.type==="text"?o.value="["+o.value:i.unshift({type:"text",value:"["});const a=i[i.length-1];return a&&a.type==="text"?a.value+=r:i.push({type:"text",value:r}),i}function tu(t,e){const n=String(e.identifier).toUpperCase(),r=t.definitionById.get(n);if(!r)return Rr(t,e);const i={src:Dt(r.url||""),alt:e.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"img",properties:i,children:[]};return t.patch(e,o),t.applyData(e,o)}function eu(t,e){const n={src:Dt(e.url)};e.alt!==null&&e.alt!==void 0&&(n.alt=e.alt),e.title!==null&&e.title!==void 0&&(n.title=e.title);const r={type:"element",tagName:"img",properties:n,children:[]};return t.patch(e,r),t.applyData(e,r)}function nu(t,e){const n={type:"text",value:e.value.replace(/\r?\n|\r/g," ")};t.patch(e,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return t.patch(e,r),t.applyData(e,r)}function ru(t,e){const n=String(e.identifier).toUpperCase(),r=t.definitionById.get(n);if(!r)return Rr(t,e);const i={href:Dt(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"a",properties:i,children:t.all(e)};return t.patch(e,o),t.applyData(e,o)}function iu(t,e){const n={href:Dt(e.url)};e.title!==null&&e.title!==void 0&&(n.title=e.title);const r={type:"element",tagName:"a",properties:n,children:t.all(e)};return t.patch(e,r),t.applyData(e,r)}function ou(t,e,n){const r=t.all(e),i=n?au(n):Fr(e),o={},a=[];if(typeof e.checked=="boolean"){const u=r[0];let p;u&&u.type==="element"&&u.tagName==="p"?p=u:(p={type:"element",tagName:"p",properties:{},children:[]},r.unshift(p)),p.children.length>0&&p.children.unshift({type:"text",value:" "}),p.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:e.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let l=-1;for(;++l<r.length;){const u=r[l];(i||l!==0||u.type!=="element"||u.tagName!=="p")&&a.push({type:"text",value:`
`}),u.type==="element"&&u.tagName==="p"&&!i?a.push(...u.children):a.push(u)}const s=r[r.length-1];s&&(i||s.type!=="element"||s.tagName!=="p")&&a.push({type:"text",value:`
`});const c={type:"element",tagName:"li",properties:o,children:a};return t.patch(e,c),t.applyData(e,c)}function au(t){let e=!1;if(t.type==="list"){e=t.spread||!1;const n=t.children;let r=-1;for(;!e&&++r<n.length;)e=Fr(n[r])}return e}function Fr(t){const e=t.spread;return e??t.children.length>1}function lu(t,e){const n={},r=t.all(e);let i=-1;for(typeof e.start=="number"&&e.start!==1&&(n.start=e.start);++i<r.length;){const a=r[i];if(a.type==="element"&&a.tagName==="li"&&a.properties&&Array.isArray(a.properties.className)&&a.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:e.ordered?"ol":"ul",properties:n,children:t.wrap(r,!0)};return t.patch(e,o),t.applyData(e,o)}function su(t,e){const n={type:"element",tagName:"p",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function uu(t,e){const n={type:"root",children:t.wrap(t.all(e))};return t.patch(e,n),t.applyData(e,n)}function cu(t,e){const n={type:"element",tagName:"strong",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function fu(t,e){const n=t.all(e),r=n.shift(),i=[];if(r){const a={type:"element",tagName:"thead",properties:{},children:t.wrap([r],!0)};t.patch(e.children[0],a),i.push(a)}if(n.length>0){const a={type:"element",tagName:"tbody",properties:{},children:t.wrap(n,!0)},l=Ve(e.children[1]),s=xr(e.children[e.children.length-1]);l&&s&&(a.position={start:l,end:s}),i.push(a)}const o={type:"element",tagName:"table",properties:{},children:t.wrap(i,!0)};return t.patch(e,o),t.applyData(e,o)}function pu(t,e,n){const r=n?n.children:void 0,o=(r?r.indexOf(e):1)===0?"th":"td",a=n&&n.type==="table"?n.align:void 0,l=a?a.length:e.children.length;let s=-1;const c=[];for(;++s<l;){const p=e.children[s],m={},f=a?a[s]:void 0;f&&(m.align=f);let y={type:"element",tagName:o,properties:m,children:[]};p&&(y.children=t.all(p),t.patch(p,y),y=t.applyData(p,y)),c.push(y)}const u={type:"element",tagName:"tr",properties:{},children:t.wrap(c,!0)};return t.patch(e,u),t.applyData(e,u)}function hu(t,e){const n={type:"element",tagName:"td",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}const Nn=9,On=32;function du(t){const e=String(t),n=/\r?\n|\r/g;let r=n.exec(e),i=0;const o=[];for(;r;)o.push(Dn(e.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(e);return o.push(Dn(e.slice(i),i>0,!1)),o.join("")}function Dn(t,e,n){let r=0,i=t.length;if(e){let o=t.codePointAt(r);for(;o===Nn||o===On;)r++,o=t.codePointAt(r)}if(n){let o=t.codePointAt(i-1);for(;o===Nn||o===On;)i--,o=t.codePointAt(i-1)}return i>r?t.slice(r,i):""}function mu(t,e){const n={type:"text",value:du(String(e.value))};return t.patch(e,n),t.applyData(e,n)}function gu(t,e){const n={type:"element",tagName:"hr",properties:{},children:[]};return t.patch(e,n),t.applyData(e,n)}const yu={blockquote:Ws,break:Xs,code:Ys,delete:Qs,emphasis:Ks,footnoteReference:Gs,heading:Js,html:Zs,imageReference:tu,image:eu,inlineCode:nu,linkReference:ru,link:iu,listItem:ou,list:lu,paragraph:su,root:uu,strong:cu,table:fu,tableCell:hu,tableRow:pu,text:mu,thematicBreak:gu,toml:Jt,yaml:Jt,definition:Jt,footnoteDefinition:Jt};function Jt(){}const Br=-1,fe=0,Vt=1,ie=2,Ge=3,Je=4,Ze=5,tn=6,jr=7,$r=8,xu=typeof self=="object"?self:globalThis,Rn=(t,e)=>{switch(t){case"Function":case"SharedWorker":case"Worker":case"eval":case"setInterval":case"setTimeout":throw new TypeError("unable to deserialize "+t)}return new xu[t](e)},ku=(t,e)=>{const n=(i,o)=>(t.set(o,i),i),r=i=>{if(t.has(i))return t.get(i);const[o,a]=e[i];switch(o){case fe:case Br:return n(a,i);case Vt:{const l=n([],i);for(const s of a)l.push(r(s));return l}case ie:{const l=n({},i);for(const[s,c]of a)l[r(s)]=r(c);return l}case Ge:return n(new Date(a),i);case Je:{const{source:l,flags:s}=a;return n(new RegExp(l,s),i)}case Ze:{const l=n(new Map,i);for(const[s,c]of a)l.set(r(s),r(c));return l}case tn:{const l=n(new Set,i);for(const s of a)l.add(r(s));return l}case jr:{const{name:l,message:s}=a;return n(Rn(l,s),i)}case $r:return n(BigInt(a),i);case"BigInt":return n(Object(BigInt(a)),i);case"ArrayBuffer":return n(new Uint8Array(a).buffer,a);case"DataView":{const{buffer:l}=new Uint8Array(a);return n(new DataView(l),a)}}return n(Rn(o,a),i)};return r},Fn=t=>ku(new Map,t)(0),Lt="",{toString:bu}={},{keys:_u}=Object,$t=t=>{const e=typeof t;if(e!=="object"||!t)return[fe,e];const n=bu.call(t).slice(8,-1);switch(n){case"Array":return[Vt,Lt];case"Object":return[ie,Lt];case"Date":return[Ge,Lt];case"RegExp":return[Je,Lt];case"Map":return[Ze,Lt];case"Set":return[tn,Lt];case"DataView":return[Vt,n]}return n.includes("Array")?[Vt,n]:n.includes("Error")?[jr,n]:[ie,n]},Zt=([t,e])=>t===fe&&(e==="function"||e==="symbol"),wu=(t,e,n,r)=>{const i=(a,l)=>{const s=r.push(a)-1;return n.set(l,s),s},o=a=>{if(n.has(a))return n.get(a);let[l,s]=$t(a);switch(l){case fe:{let u=a;switch(s){case"bigint":l=$r,u=a.toString();break;case"function":case"symbol":if(t)throw new TypeError("unable to serialize "+s);u=null;break;case"undefined":return i([Br],a)}return i([l,u],a)}case Vt:{if(s){let m=a;return s==="DataView"?m=new Uint8Array(a.buffer):s==="ArrayBuffer"&&(m=new Uint8Array(a)),i([s,[...m]],a)}const u=[],p=i([l,u],a);for(const m of a)u.push(o(m));return p}case ie:{if(s)switch(s){case"BigInt":return i([s,a.toString()],a);case"Boolean":case"Number":case"String":return i([s,a.valueOf()],a)}if(e&&"toJSON"in a)return o(a.toJSON());const u=[],p=i([l,u],a);for(const m of _u(a))(t||!Zt($t(a[m])))&&u.push([o(m),o(a[m])]);return p}case Ge:return i([l,a.toISOString()],a);case Je:{const{source:u,flags:p}=a;return i([l,{source:u,flags:p}],a)}case Ze:{const u=[],p=i([l,u],a);for(const[m,f]of a)(t||!(Zt($t(m))||Zt($t(f))))&&u.push([o(m),o(f)]);return p}case tn:{const u=[],p=i([l,u],a);for(const m of a)(t||!Zt($t(m)))&&u.push(o(m));return p}}const{message:c}=a;return i([l,{name:s,message:c}],a)};return o},Bn=(t,{json:e,lossy:n}={})=>{const r=[];return wu(!(e||n),!!e,new Map,r)(t),r},oe=typeof structuredClone=="function"?(t,e)=>e&&("json"in e||"lossy"in e)?Fn(Bn(t,e)):structuredClone(t):(t,e)=>Fn(Bn(t,e));function vu(t,e){const n=[{type:"text",value:"↩"}];return e>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(e)}]}),n}function Tu(t,e){return"Back to reference "+(t+1)+(e>1?"-"+e:"")}function Su(t){const e=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",n=t.options.footnoteBackContent||vu,r=t.options.footnoteBackLabel||Tu,i=t.options.footnoteLabel||"Footnotes",o=t.options.footnoteLabelTagName||"h2",a=t.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let s=-1;for(;++s<t.footnoteOrder.length;){const c=t.footnoteById.get(t.footnoteOrder[s]);if(!c)continue;const u=t.all(c),p=String(c.identifier).toUpperCase(),m=Dt(p.toLowerCase());let f=0;const y=[],x=t.footnoteCounts.get(p);for(;x!==void 0&&++f<=x;){y.length>0&&y.push({type:"text",value:" "});let v=typeof n=="string"?n:n(s,f);typeof v=="string"&&(v={type:"text",value:v}),y.push({type:"element",tagName:"a",properties:{href:"#"+e+"fnref-"+m+(f>1?"-"+f:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(s,f),className:["data-footnote-backref"]},children:Array.isArray(v)?v:[v]})}const S=u[u.length-1];if(S&&S.type==="element"&&S.tagName==="p"){const v=S.children[S.children.length-1];v&&v.type==="text"?v.value+=" ":S.children.push({type:"text",value:" "}),S.children.push(...y)}else u.push(...y);const k={type:"element",tagName:"li",properties:{id:e+"fn-"+m},children:t.wrap(u,!0)};t.patch(c,k),l.push(k)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...oe(a),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:t.wrap(l,!0)},{type:"text",value:`
`}]}}const Hr=function(t){if(t==null)return Au;if(typeof t=="function")return pe(t);if(typeof t=="object")return Array.isArray(t)?Eu(t):Cu(t);if(typeof t=="string")return Iu(t);throw new Error("Expected function, string, or object as test")};function Eu(t){const e=[];let n=-1;for(;++n<t.length;)e[n]=Hr(t[n]);return pe(r);function r(...i){let o=-1;for(;++o<e.length;)if(e[o].apply(this,i))return!0;return!1}}function Cu(t){const e=t;return pe(n);function n(r){const i=r;let o;for(o in t)if(i[o]!==e[o])return!1;return!0}}function Iu(t){return pe(e);function e(n){return n&&n.type===t}}function pe(t){return e;function e(n,r,i){return!!(Pu(n)&&t.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function Au(){return!0}function Pu(t){return t!==null&&typeof t=="object"&&"type"in t}const Ur=[],zu=!0,jn=!1,Lu="skip";function Mu(t,e,n,r){let i;typeof e=="function"&&typeof n!="function"?(r=n,n=e):i=e;const o=Hr(i),a=r?-1:1;l(t,void 0,[])();function l(s,c,u){const p=s&&typeof s=="object"?s:{};if(typeof p.type=="string"){const f=typeof p.tagName=="string"?p.tagName:typeof p.name=="string"?p.name:void 0;Object.defineProperty(m,"name",{value:"node ("+(s.type+(f?"<"+f+">":""))+")"})}return m;function m(){let f=Ur,y,x,S;if((!e||o(s,c,u[u.length-1]||void 0))&&(f=Nu(n(s,u)),f[0]===jn))return f;if("children"in s&&s.children){const k=s;if(k.children&&f[0]!==Lu)for(x=(r?k.children.length:-1)+a,S=u.concat(k);x>-1&&x<k.children.length;){const v=k.children[x];if(y=l(v,x,S)(),y[0]===jn)return y;x=typeof y[1]=="number"?y[1]:x+a}}return f}}}function Nu(t){return Array.isArray(t)?t:typeof t=="number"?[zu,t]:t==null?Ur:[t]}function Vr(t,e,n,r){let i,o,a;typeof e=="function"&&typeof n!="function"?(o=void 0,a=e,i=n):(o=e,a=n,i=r),Mu(t,o,l,i);function l(s,c){const u=c[c.length-1],p=u?u.children.indexOf(s):void 0;return a(s,p,u)}}const Fe={}.hasOwnProperty,Ou={};function Du(t,e){const n=e||Ou,r=new Map,i=new Map,o=new Map,a={...yu,...n.handlers},l={all:c,applyData:Fu,definitionById:r,footnoteById:i,footnoteCounts:o,footnoteOrder:[],handlers:a,one:s,options:n,patch:Ru,wrap:ju};return Vr(t,function(u){if(u.type==="definition"||u.type==="footnoteDefinition"){const p=u.type==="definition"?r:i,m=String(u.identifier).toUpperCase();p.has(m)||p.set(m,u)}}),l;function s(u,p){const m=u.type,f=l.handlers[m];if(Fe.call(l.handlers,m)&&f)return f(l,u,p);if(l.options.passThrough&&l.options.passThrough.includes(m)){if("children"in u){const{children:x,...S}=u,k=oe(S);return k.children=l.all(u),k}return oe(u)}return(l.options.unknownHandler||Bu)(l,u,p)}function c(u){const p=[];if("children"in u){const m=u.children;let f=-1;for(;++f<m.length;){const y=l.one(m[f],u);if(y){if(f&&m[f-1].type==="break"&&(!Array.isArray(y)&&y.type==="text"&&(y.value=$n(y.value)),!Array.isArray(y)&&y.type==="element")){const x=y.children[0];x&&x.type==="text"&&(x.value=$n(x.value))}Array.isArray(y)?p.push(...y):p.push(y)}}}return p}}function Ru(t,e){t.position&&(e.position=ka(t))}function Fu(t,e){let n=e;if(t&&t.data){const r=t.data.hName,i=t.data.hChildren,o=t.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const a="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:a}}n.type==="element"&&o&&Object.assign(n.properties,oe(o)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function Bu(t,e){const n=e.data||{},r="value"in e&&!(Fe.call(n,"hProperties")||Fe.call(n,"hChildren"))?{type:"text",value:e.value}:{type:"element",tagName:"div",properties:{},children:t.all(e)};return t.patch(e,r),t.applyData(e,r)}function ju(t,e){const n=[];let r=-1;for(e&&n.push({type:"text",value:`
`});++r<t.length;)r&&n.push({type:"text",value:`
`}),n.push(t[r]);return e&&t.length>0&&n.push({type:"text",value:`
`}),n}function $n(t){let e=0,n=t.charCodeAt(e);for(;n===9||n===32;)e++,n=t.charCodeAt(e);return t.slice(e)}function Hn(t,e){const n=Du(t,e),r=n.one(t,void 0),i=Su(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:`
`},i),o}function $u(t,e){return t&&"run"in t?async function(n,r){const i=Hn(n,{file:r,...e});await t.run(i,r)}:function(n,r){return Hn(n,{file:r,...t||e})}}function Un(t){if(t)throw t}var ne=Object.prototype.hasOwnProperty,qr=Object.prototype.toString,Vn=Object.defineProperty,qn=Object.getOwnPropertyDescriptor,Wn=function(e){return typeof Array.isArray=="function"?Array.isArray(e):qr.call(e)==="[object Array]"},Xn=function(e){if(!e||qr.call(e)!=="[object Object]")return!1;var n=ne.call(e,"constructor"),r=e.constructor&&e.constructor.prototype&&ne.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!n&&!r)return!1;var i;for(i in e);return typeof i>"u"||ne.call(e,i)},Yn=function(e,n){Vn&&n.name==="__proto__"?Vn(e,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):e[n.name]=n.newValue},Qn=function(e,n){if(n==="__proto__")if(ne.call(e,n)){if(qn)return qn(e,n).value}else return;return e[n]},Hu=function t(){var e,n,r,i,o,a,l=arguments[0],s=1,c=arguments.length,u=!1;for(typeof l=="boolean"&&(u=l,l=arguments[1]||{},s=2),(l==null||typeof l!="object"&&typeof l!="function")&&(l={});s<c;++s)if(e=arguments[s],e!=null)for(n in e)r=Qn(l,n),i=Qn(e,n),l!==i&&(u&&i&&(Xn(i)||(o=Wn(i)))?(o?(o=!1,a=r&&Wn(r)?r:[]):a=r&&Xn(r)?r:{},Yn(l,{name:n,newValue:t(u,a,i)})):typeof i<"u"&&Yn(l,{name:n,newValue:i}));return l};const ke=er(Hu);function Be(t){if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)}function Uu(){const t=[],e={run:n,use:r};return e;function n(...i){let o=-1;const a=i.pop();if(typeof a!="function")throw new TypeError("Expected function as last argument, not "+a);l(null,...i);function l(s,...c){const u=t[++o];let p=-1;if(s){a(s);return}for(;++p<i.length;)(c[p]===null||c[p]===void 0)&&(c[p]=i[p]);i=c,u?Vu(u,l)(...c):a(null,...c)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return t.push(i),e}}function Vu(t,e){let n;return r;function r(...a){const l=t.length>a.length;let s;l&&a.push(i);try{s=t.apply(this,a)}catch(c){const u=c;if(l&&n)throw u;return i(u)}l||(s&&s.then&&typeof s.then=="function"?s.then(o,i):s instanceof Error?i(s):o(s))}function i(a,...l){n||(n=!0,e(a,...l))}function o(a){i(null,a)}}const pt={basename:qu,dirname:Wu,extname:Xu,join:Yu,sep:"/"};function qu(t,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');Kt(t);let n=0,r=-1,i=t.length,o;if(e===void 0||e.length===0||e.length>t.length){for(;i--;)if(t.codePointAt(i)===47){if(o){n=i+1;break}}else r<0&&(o=!0,r=i+1);return r<0?"":t.slice(n,r)}if(e===t)return"";let a=-1,l=e.length-1;for(;i--;)if(t.codePointAt(i)===47){if(o){n=i+1;break}}else a<0&&(o=!0,a=i+1),l>-1&&(t.codePointAt(i)===e.codePointAt(l--)?l<0&&(r=i):(l=-1,r=a));return n===r?r=a:r<0&&(r=t.length),t.slice(n,r)}function Wu(t){if(Kt(t),t.length===0)return".";let e=-1,n=t.length,r;for(;--n;)if(t.codePointAt(n)===47){if(r){e=n;break}}else r||(r=!0);return e<0?t.codePointAt(0)===47?"/":".":e===1&&t.codePointAt(0)===47?"//":t.slice(0,e)}function Xu(t){Kt(t);let e=t.length,n=-1,r=0,i=-1,o=0,a;for(;e--;){const l=t.codePointAt(e);if(l===47){if(a){r=e+1;break}continue}n<0&&(a=!0,n=e+1),l===46?i<0?i=e:o!==1&&(o=1):i>-1&&(o=-1)}return i<0||n<0||o===0||o===1&&i===n-1&&i===r+1?"":t.slice(i,n)}function Yu(...t){let e=-1,n;for(;++e<t.length;)Kt(t[e]),t[e]&&(n=n===void 0?t[e]:n+"/"+t[e]);return n===void 0?".":Qu(n)}function Qu(t){Kt(t);const e=t.codePointAt(0)===47;let n=Ku(t,!e);return n.length===0&&!e&&(n="."),n.length>0&&t.codePointAt(t.length-1)===47&&(n+="/"),e?"/"+n:n}function Ku(t,e){let n="",r=0,i=-1,o=0,a=-1,l,s;for(;++a<=t.length;){if(a<t.length)l=t.codePointAt(a);else{if(l===47)break;l=47}if(l===47){if(!(i===a-1||o===1))if(i!==a-1&&o===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),i=a,o=0;continue}}else if(n.length>0){n="",r=0,i=a,o=0;continue}}e&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+t.slice(i+1,a):n=t.slice(i+1,a),r=a-i-1;i=a,o=0}else l===46&&o>-1?o++:o=-1}return n}function Kt(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}const Gu={cwd:Ju};function Ju(){return"/"}function je(t){return!!(t!==null&&typeof t=="object"&&"href"in t&&t.href&&"protocol"in t&&t.protocol&&t.auth===void 0)}function Zu(t){if(typeof t=="string")t=new URL(t);else if(!je(t)){const e=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+t+"`");throw e.code="ERR_INVALID_ARG_TYPE",e}if(t.protocol!=="file:"){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return tc(t)}function tc(t){if(t.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const e=t.pathname;let n=-1;for(;++n<e.length;)if(e.codePointAt(n)===37&&e.codePointAt(n+1)===50){const r=e.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(e)}const be=["history","path","basename","stem","extname","dirname"];class Wr{constructor(e){let n;e?je(e)?n={path:e}:typeof e=="string"||ec(e)?n={value:e}:n=e:n={},this.cwd="cwd"in n?"":Gu.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<be.length;){const o=be[r];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let i;for(i in n)be.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?pt.basename(this.path):void 0}set basename(e){we(e,"basename"),_e(e,"basename"),this.path=pt.join(this.dirname||"",e)}get dirname(){return typeof this.path=="string"?pt.dirname(this.path):void 0}set dirname(e){Kn(this.basename,"dirname"),this.path=pt.join(e||"",this.basename)}get extname(){return typeof this.path=="string"?pt.extname(this.path):void 0}set extname(e){if(_e(e,"extname"),Kn(this.dirname,"extname"),e){if(e.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=pt.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){je(e)&&(e=Zu(e)),we(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path=="string"?pt.basename(this.path,this.extname):void 0}set stem(e){we(e,"stem"),_e(e,"stem"),this.path=pt.join(this.dirname||"",e+(this.extname||""))}fail(e,n,r){const i=this.message(e,n,r);throw i.fatal=!0,i}info(e,n,r){const i=this.message(e,n,r);return i.fatal=void 0,i}message(e,n,r){const i=new tt(e,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(e){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(e||void 0).decode(this.value)}}function _e(t,e){if(t&&t.includes(pt.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+pt.sep+"`")}function we(t,e){if(!t)throw new Error("`"+e+"` cannot be empty")}function Kn(t,e){if(!t)throw new Error("Setting `"+e+"` requires `path` to be set too")}function ec(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const nc=function(t){const r=this.constructor.prototype,i=r[t],o=function(){return i.apply(o,arguments)};return Object.setPrototypeOf(o,r),o},rc={}.hasOwnProperty;class en extends nc{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Uu()}copy(){const e=new en;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];e.use(...r)}return e.data(ke(!0,{},this.namespace)),e}data(e,n){return typeof e=="string"?arguments.length===2?(Se("data",this.frozen),this.namespace[e]=n,this):rc.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Se("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;const e=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(e,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();const n=te(e),r=this.parser||this.Parser;return ve("parse",r),r(String(n),n)}process(e,n){const r=this;return this.freeze(),ve("process",this.parser||this.Parser),Te("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(o,a){const l=te(e),s=r.parse(l);r.run(s,l,function(u,p,m){if(u||!p||!m)return c(u);const f=p,y=r.stringify(f,m);ac(y)?m.value=y:m.result=y,c(u,m)});function c(u,p){u||!p?a(u):o?o(p):n(void 0,p)}}}processSync(e){let n=!1,r;return this.freeze(),ve("processSync",this.parser||this.Parser),Te("processSync",this.compiler||this.Compiler),this.process(e,i),Jn("processSync","process",n),r;function i(o,a){n=!0,Un(o),r=a}}run(e,n,r){Gn(e),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?o(void 0,r):new Promise(o);function o(a,l){const s=te(n);i.run(e,s,c);function c(u,p,m){const f=p||e;u?l(u):a?a(f):r(void 0,f,m)}}}runSync(e,n){let r=!1,i;return this.run(e,n,o),Jn("runSync","run",r),i;function o(a,l){Un(a),i=l,r=!0}}stringify(e,n){this.freeze();const r=te(n),i=this.compiler||this.Compiler;return Te("stringify",i),Gn(e),i(e,r)}use(e,...n){const r=this.attachers,i=this.namespace;if(Se("use",this.frozen),e!=null)if(typeof e=="function")s(e,n);else if(typeof e=="object")Array.isArray(e)?l(e):a(e);else throw new TypeError("Expected usable value, not `"+e+"`");return this;function o(c){if(typeof c=="function")s(c,[]);else if(typeof c=="object")if(Array.isArray(c)){const[u,...p]=c;s(u,p)}else a(c);else throw new TypeError("Expected usable value, not `"+c+"`")}function a(c){if(!("plugins"in c)&&!("settings"in c))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(c.plugins),c.settings&&(i.settings=ke(!0,i.settings,c.settings))}function l(c){let u=-1;if(c!=null)if(Array.isArray(c))for(;++u<c.length;){const p=c[u];o(p)}else throw new TypeError("Expected a list of plugins, not `"+c+"`")}function s(c,u){let p=-1,m=-1;for(;++p<r.length;)if(r[p][0]===c){m=p;break}if(m===-1)r.push([c,...u]);else if(u.length>0){let[f,...y]=u;const x=r[m][1];Be(x)&&Be(f)&&(f=ke(!0,x,f)),r[m]=[c,f,...y]}}}}const ic=new en().freeze();function ve(t,e){if(typeof e!="function")throw new TypeError("Cannot `"+t+"` without `parser`")}function Te(t,e){if(typeof e!="function")throw new TypeError("Cannot `"+t+"` without `compiler`")}function Se(t,e){if(e)throw new Error("Cannot call `"+t+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Gn(t){if(!Be(t)||typeof t.type!="string")throw new TypeError("Expected node, got `"+t+"`")}function Jn(t,e,n){if(!n)throw new Error("`"+t+"` finished async. Use `"+e+"` instead")}function te(t){return oc(t)?t:new Wr(t)}function oc(t){return!!(t&&typeof t=="object"&&"message"in t&&"messages"in t)}function ac(t){return typeof t=="string"||lc(t)}function lc(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const sc="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Zn=[],tr={allowDangerousHtml:!0},uc=/^(https?|ircs?|mailto|xmpp)$/i,cc=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function nf(t){const e=fc(t),n=pc(t);return hc(e.runSync(e.parse(n),n),t)}function fc(t){const e=t.rehypePlugins||Zn,n=t.remarkPlugins||Zn,r=t.remarkRehypeOptions?{...t.remarkRehypeOptions,...tr}:tr;return ic().use(qs).use(n).use($u,r).use(e)}function pc(t){const e=t.children||"",n=new Wr;return typeof e=="string"&&(n.value=e),n}function hc(t,e){const n=e.allowedElements,r=e.allowElement,i=e.components,o=e.disallowedElements,a=e.skipHtml,l=e.unwrapDisallowed,s=e.urlTransform||dc;for(const u of cc)Object.hasOwn(e,u.from)&&(""+u.from+(u.to?"use `"+u.to+"` instead":"remove it")+sc+u.id,void 0);return Vr(t,c),Ta(t,{Fragment:he.Fragment,components:i,ignoreInvalidStyle:!0,jsx:he.jsx,jsxs:he.jsxs,passKeys:!0,passNode:!0});function c(u,p,m){if(u.type==="raw"&&m&&typeof p=="number")return a?m.children.splice(p,1):m.children[p]={type:"text",value:u.value},p;if(u.type==="element"){let f;for(f in ge)if(Object.hasOwn(ge,f)&&Object.hasOwn(u.properties,f)){const y=u.properties[f],x=ge[f];(x===null||x.includes(u.tagName))&&(u.properties[f]=s(String(y||""),f,u))}}if(u.type==="element"){let f=n?!n.includes(u.tagName):o?o.includes(u.tagName):!1;if(!f&&r&&typeof p=="number"&&(f=!r(u,p,m)),f&&m&&typeof p=="number")return l&&u.children?m.children.splice(p,1,...u.children):m.children.splice(p,1),p}}}function dc(t){const e=t.indexOf(":"),n=t.indexOf("?"),r=t.indexOf("#"),i=t.indexOf("/");return e===-1||i!==-1&&e>i||n!==-1&&e>n||r!==-1&&e>r||uc.test(t.slice(0,e))?t:""}export{xc as A,kc as B,wc as C,Ac as D,zc as E,Lc as H,Nc as L,Oc as M,Fc as N,Bc as P,$c as S,Qc as T,Gc as U,Zc as W,tf as X,ef as Z,bc as a,_c as b,vc as c,Tc as d,Sc as e,Ec as f,Cc as g,Ic as h,Pc as i,Mc as j,nf as k,Dc as l,Rc as m,jc as n,Hc as o,Uc as p,Vc as q,qc as r,Wc as s,Xc as t,Yc as u,Kc as v,Jc as w,yc as x,V as y};
