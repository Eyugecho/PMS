import{bg as q,r as h,x as P,_ as c,bh as T,d as z,g as B,s as k,v as X,bi as Y,e as A,a as M,j as b,c as J,h as H,O as C,Y as Q,bj as V,aK as Z,G as nn}from"./index-CB3M8AEN.js";function en(n={}){const{autoHideDuration:e=null,disableWindowBlurListener:s=!1,onClose:r,open:i,resumeHideDuration:g}=n,u=q();h.useEffect(()=>{if(!i)return;function o(t){t.defaultPrevented||(t.key==="Escape"||t.key==="Esc")&&(r==null||r(t,"escapeKeyDown"))}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[i,r]);const m=P((o,t)=>{r==null||r(o,t)}),d=P(o=>{!r||o==null||u.start(o,()=>{m(null,"timeout")})});h.useEffect(()=>(i&&d(e),u.clear),[i,e,d,u]);const p=o=>{r==null||r(o,"clickaway")},l=u.clear,f=h.useCallback(()=>{e!=null&&d(g??e*.5)},[e,g,d]),x=o=>t=>{const a=o.onBlur;a==null||a(t),f()},v=o=>t=>{const a=o.onFocus;a==null||a(t),l()},y=o=>t=>{const a=o.onMouseEnter;a==null||a(t),l()},w=o=>t=>{const a=o.onMouseLeave;a==null||a(t),f()};return h.useEffect(()=>{if(!s&&i)return window.addEventListener("focus",f),window.addEventListener("blur",l),()=>{window.removeEventListener("focus",f),window.removeEventListener("blur",l)}},[s,i,f,l]),{getRootProps:(o={})=>{const t=c({},T(n),T(o));return c({role:"presentation"},o,t,{onBlur:x(t),onFocus:v(t),onMouseEnter:y(t),onMouseLeave:w(t)})},onClickAway:p}}function on(n){return z("MuiSnackbarContent",n)}B("MuiSnackbarContent",["root","message","action"]);const tn=["action","className","message","role"],rn=n=>{const{classes:e}=n;return H({root:["root"],action:["action"],message:["message"]},on,e)},sn=k(X,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(n,e)=>e.root})(({theme:n})=>{const e=n.palette.mode==="light"?.8:.98,s=Y(n.palette.background.default,e);return c({},n.typography.body2,{color:n.vars?n.vars.palette.SnackbarContent.color:n.palette.getContrastText(s),backgroundColor:n.vars?n.vars.palette.SnackbarContent.bg:s,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(n.vars||n).shape.borderRadius,flexGrow:1,[n.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),an=k("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(n,e)=>e.message})({padding:"8px 0"}),cn=k("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(n,e)=>e.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),ln=h.forwardRef(function(e,s){const r=A({props:e,name:"MuiSnackbarContent"}),{action:i,className:g,message:u,role:m="alert"}=r,d=M(r,tn),p=r,l=rn(p);return b.jsxs(sn,c({role:m,square:!0,elevation:6,className:J(l.root,g),ownerState:p,ref:s},d,{children:[b.jsx(an,{className:l.message,ownerState:p,children:u}),i?b.jsx(cn,{className:l.action,ownerState:p,children:i}):null]}))});function un(n){return z("MuiSnackbar",n)}B("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const dn=["onEnter","onExited"],pn=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],gn=n=>{const{classes:e,anchorOrigin:s}=n,r={root:["root",`anchorOrigin${C(s.vertical)}${C(s.horizontal)}`]};return H(r,un,e)},j=k("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(n,e)=>{const{ownerState:s}=n;return[e.root,e[`anchorOrigin${C(s.anchorOrigin.vertical)}${C(s.anchorOrigin.horizontal)}`]]}})(({theme:n,ownerState:e})=>{const s={left:"50%",right:"auto",transform:"translateX(-50%)"};return c({zIndex:(n.vars||n).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},e.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},e.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},e.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[n.breakpoints.up("sm")]:c({},e.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},e.anchorOrigin.horizontal==="center"&&s,e.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},e.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),hn=h.forwardRef(function(e,s){const r=A({props:e,name:"MuiSnackbar"}),i=Q(),g={enter:i.transitions.duration.enteringScreen,exit:i.transitions.duration.leavingScreen},{action:u,anchorOrigin:{vertical:m,horizontal:d}={vertical:"bottom",horizontal:"left"},autoHideDuration:p=null,children:l,className:f,ClickAwayListenerProps:x,ContentProps:v,disableWindowBlurListener:y=!1,message:w,open:E,TransitionComponent:o=nn,transitionDuration:t=g,TransitionProps:{onEnter:a,onExited:O}={}}=r,D=M(r.TransitionProps,dn),N=M(r,pn),S=c({},r,{anchorOrigin:{vertical:m,horizontal:d},autoHideDuration:p,disableWindowBlurListener:y,TransitionComponent:o,transitionDuration:t}),_=gn(S),{getRootProps:F,onClickAway:U}=en(c({},S)),[W,R]=h.useState(!0),$=V({elementType:j,getSlotProps:F,externalForwardedProps:N,ownerState:S,additionalProps:{ref:s},className:[_.root,f]}),I=L=>{R(!0),O&&O(L)},G=(L,K)=>{R(!1),a&&a(L,K)};return!E&&W?null:b.jsx(Z,c({onClickAway:U},x,{children:b.jsx(j,c({},$,{children:b.jsx(o,c({appear:!0,in:E,timeout:t,direction:m==="top"?"down":"up",onEnter:G,onExited:I},D,{children:l||b.jsx(ln,c({message:w,action:u},v))}))}))}))});export{hn as S};
