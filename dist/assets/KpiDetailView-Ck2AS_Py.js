import{bB as de,r as c,br as B,b6 as p,bC as K,b2 as _,b3 as $,aT as E,t as G,bD as ue,b9 as U,b4 as A,j as e,bd as xe,bf as Y,be as R,l as w,bE as he,bl as me,bk as ge,P as q,a5 as X,R as k,bp as Z,m as I,G as t,b as u,ai as C,f as pe,h as N,ae as je,af as fe,ag as be,q as Ce,v as ye,w as Se,x as T,y as S,z as ve,Z as ke,F as H,n as Ie,a as Te,g as we}from"./index-DL-CLDEe.js";import{E as J}from"./EarningCard-BMH7Gi22.js";import{A as Re}from"./Alert-B6r8ITbi.js";import"./Close-B1KvSMQT.js";function Ee(n={}){const{autoHideDuration:r=null,disableWindowBlurListener:s=!1,onClose:l,open:d,resumeHideDuration:b}=n,x=de();c.useEffect(()=>{if(!d)return;function i(a){a.defaultPrevented||(a.key==="Escape"||a.key==="Esc")&&(l==null||l(a,"escapeKeyDown"))}return document.addEventListener("keydown",i),()=>{document.removeEventListener("keydown",i)}},[d,l]);const y=B((i,a)=>{l==null||l(i,a)}),g=B(i=>{!l||i==null||x.start(i,()=>{y(null,"timeout")})});c.useEffect(()=>(d&&g(r),x.clear),[d,r,g,x]);const j=i=>{l==null||l(i,"clickaway")},o=x.clear,v=c.useCallback(()=>{r!=null&&g(b??r*.5)},[r,b,g]),f=i=>a=>{const h=i.onBlur;h==null||h(a),v()},m=i=>a=>{const h=i.onFocus;h==null||h(a),o()},z=i=>a=>{const h=i.onMouseEnter;h==null||h(a),o()},L=i=>a=>{const h=i.onMouseLeave;h==null||h(a),v()};return c.useEffect(()=>{if(!s&&d)return window.addEventListener("focus",v),window.addEventListener("blur",o),()=>{window.removeEventListener("focus",v),window.removeEventListener("blur",o)}},[s,d,v,o]),{getRootProps:(i={})=>{const a=p({},K(n),K(i));return p({role:"presentation"},i,a,{onBlur:f(a),onFocus:m(a),onMouseEnter:z(a),onMouseLeave:L(a)})},onClickAway:j}}function ze(n){return _("MuiSnackbarContent",n)}$("MuiSnackbarContent",["root","message","action"]);const Le=["action","className","message","role"],Pe=n=>{const{classes:r}=n;return Y({root:["root"],action:["action"],message:["message"]},ze,r)},We=E(G,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(n,r)=>r.root})(({theme:n})=>{const r=n.palette.mode==="light"?.8:.98,s=ue(n.palette.background.default,r);return p({},n.typography.body2,{color:n.vars?n.vars.palette.SnackbarContent.color:n.palette.getContrastText(s),backgroundColor:n.vars?n.vars.palette.SnackbarContent.bg:s,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(n.vars||n).shape.borderRadius,flexGrow:1,[n.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),Me=E("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(n,r)=>r.message})({padding:"8px 0"}),Ae=E("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(n,r)=>r.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),Oe=c.forwardRef(function(r,s){const l=U({props:r,name:"MuiSnackbarContent"}),{action:d,className:b,message:x,role:y="alert"}=l,g=A(l,Le),j=l,o=Pe(j);return e.jsxs(We,p({role:y,square:!0,elevation:6,className:xe(o.root,b),ownerState:j,ref:s},g,{children:[e.jsx(Me,{className:o.message,ownerState:j,children:x}),d?e.jsx(Ae,{className:o.action,ownerState:j,children:d}):null]}))});function De(n){return _("MuiSnackbar",n)}$("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const Be=["onEnter","onExited"],Ke=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],Ne=n=>{const{classes:r,anchorOrigin:s}=n,l={root:["root",`anchorOrigin${R(s.vertical)}${R(s.horizontal)}`]};return Y(l,De,r)},F=E("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(n,r)=>{const{ownerState:s}=n;return[r.root,r[`anchorOrigin${R(s.anchorOrigin.vertical)}${R(s.anchorOrigin.horizontal)}`]]}})(({theme:n,ownerState:r})=>{const s={left:"50%",right:"auto",transform:"translateX(-50%)"};return p({zIndex:(n.vars||n).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},r.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},r.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},r.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[n.breakpoints.up("sm")]:p({},r.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},r.anchorOrigin.horizontal==="center"&&s,r.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},r.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),He=c.forwardRef(function(r,s){const l=U({props:r,name:"MuiSnackbar"}),d=w(),b={enter:d.transitions.duration.enteringScreen,exit:d.transitions.duration.leavingScreen},{action:x,anchorOrigin:{vertical:y,horizontal:g}={vertical:"bottom",horizontal:"left"},autoHideDuration:j=null,children:o,className:v,ClickAwayListenerProps:f,ContentProps:m,disableWindowBlurListener:z=!1,message:L,open:P,TransitionComponent:i=ge,transitionDuration:a=b,TransitionProps:{onEnter:h,onExited:O}={}}=l,ee=A(l.TransitionProps,Be),te=A(l,Ke),W=p({},l,{anchorOrigin:{vertical:y,horizontal:g},autoHideDuration:j,disableWindowBlurListener:z,TransitionComponent:i,transitionDuration:a}),ne=Ne(W),{getRootProps:re,onClickAway:se}=Ee(p({},W)),[oe,D]=c.useState(!0),ie=he({elementType:F,getSlotProps:re,externalForwardedProps:te,ownerState:W,additionalProps:{ref:s},className:[ne.root,v]}),ae=M=>{D(!0),O&&O(M)},le=(M,ce)=>{D(!1),h&&h(M,ce)};return!P&&oe?null:e.jsx(me,p({onClickAway:se},f,{children:e.jsx(F,p({},ie,{children:e.jsx(i,p({appear:!0,in:P,timeout:a,direction:y==="top"?"down":"up",onEnter:le,onExited:ae},ee,{children:o||e.jsx(Oe,p({message:L,action:x},m))}))}))}))}),Q=()=>{const n=w();X(),k.useState(null),k.useState(null);const[r,s]=k.useState(0),[l,d]=k.useState(0),[b,x]=k.useState(!1),y=()=>{x(!0),pe().then(g=>{const j=N.api+N.getCount;fetch(j,{method:"GET",headers:{Authorization:`Bearer ${g}`,accept:"application/json","Content-Type":"application/json"}}).then(o=>o.json()).then(o=>{o.success?(s(o.data.used_kpis),d(o.data.my_kpi)):(s(0),d(0),toast.warning(o.message)),x(!1)}).catch(o=>{s(0),d(0),toast.warning(o.message),x(!1)})})};return c.useEffect(()=>{y()},[]),e.jsx(e.Fragment,{children:b?e.jsx(J,{}):e.jsx(Z,{border:!1,content:!1,children:e.jsx(I,{sx:{ml:1},children:e.jsxs(t,{container:!0,direction:"column",children:[e.jsx(t,{item:!0,children:e.jsx(t,{container:!0,justifyContent:"space-between",children:e.jsx(t,{item:!0,children:e.jsx(u,{variant:"h3",sx:{mt:1.2,color:"grey.500"},children:"KPI"})})})}),e.jsx(C,{sx:{borderBottom:.4,borderColor:n.palette.grey[300],marginY:3}}),e.jsx(t,{item:!0,sx:{mb:.75,cursor:"pointer"},children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(t,{item:!0,xs:5,children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:15,borderColor:"rgb(77, 173, 127)",mr:2,height:"9vh"}}),e.jsxs(t,{item:!0,sx:{mt:1},children:[e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"Total KPI"}),e.jsxs(u,{sx:{fontSize:"2.125rem",fontWeight:500,mr:1,mt:0,mb:.75},children:[r,e.jsx(u,{component:"span",sx:{fontSize:"0.75rem",verticalAlign:"sub"},children:"Number of KPI"})]})]})]})}),e.jsx(t,{item:!0,xs:0,children:e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:.4,borderColor:n.palette.grey[300],height:"15vh",mr:5}})}),e.jsx(t,{item:!0,xs:5,children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:15,borderColor:"rgb(234,170,103)",mr:2,height:"9vh"}}),e.jsxs(t,{item:!0,sx:{mt:1},children:[e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"Assigned KPI"}),e.jsxs(u,{sx:{fontSize:"2.125rem",fontWeight:500,mr:1,mt:0,mb:.75},children:[l,e.jsx(u,{component:"span",sx:{fontSize:"0.75rem",verticalAlign:"sub",color:"grey.500"},children:"Number of KPI"})]})]})]})})]})})]})})})})};Q.propTypes={isLoading:q.bool};const Fe=()=>{c.useState(!1),c.useState(null);const[n,r]=c.useState(!1),[s,l]=c.useState(""),[d,b]=c.useState("success");c.useState({date:new Date().toISOString().split("T")[0],revenue:"",expenses:"",profit:"",customer_satisfaction:"",plan:"",completed:"",challenge_faced:""}),c.useState(null),c.useState(null);const[x,y]=c.useState(!1),[g,j]=c.useState(null),[o,v]=c.useState([{id:1,plan:"Increase Revenue",completed:"75%",status:"Assigned",department:"Marketing",date:"2024-08-01"},{id:2,plan:"Reduce Costs",completed:"50%",status:"Assigned",department:"Finance",date:"2024-08-05"},{id:3,plan:"Improve Customer Satisfaction",completed:"90%",status:"Not Assigned",department:"Sales",date:"2024-08-10"}]),f=w();return e.jsxs(je,{children:[e.jsxs(fe,{children:[e.jsx(C,{sx:{borderBottom:.4,borderColor:f.palette.grey[300],marginY:3}}),e.jsxs(t,{container:!0,justifyContent:"space-between",children:[e.jsx(t,{item:!0,children:e.jsx(u,{variant:"h3",sx:{mt:0,color:"grey.500"},children:"All KPI"})}),e.jsx(be,{})]}),e.jsx(I,{mt:1,children:e.jsx(Ce,{component:G,children:e.jsxs(ye,{children:[e.jsx(Se,{children:e.jsx(T,{children:["KPI Name","Weight","Status","Department","Date"].map(m=>e.jsx(S,{sx:{background:f.palette.grey[100],color:"#000",fontWeight:"bold",fontSize:"0.9rem",borderBottom:`2px solid ${f.palette.divider}`,position:"relative",padding:"12px 16px","&:not(:last-of-type)":{borderRight:`1px solid ${f.palette.divider}`}},children:m},m))})}),e.jsx(ve,{children:x?e.jsx(T,{children:e.jsx(S,{colSpan:5,children:e.jsx(I,{sx:{padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(ke,{size:22})})})}):g?e.jsx(T,{children:e.jsx(S,{colSpan:5,children:e.jsx(I,{sx:{padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(H,{severity:"error",title:"Server error",description:"There is an error fetching data"})})})}):o.length===0?e.jsx(T,{children:e.jsx(S,{colSpan:5,children:e.jsx(I,{sx:{paddingTop:6,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(H,{severity:"info",title:"No Data",description:"No KPI records found"})})})}):o.map(m=>e.jsxs(T,{sx:{backgroundColor:f.palette.background.paper,borderRadius:2,"&:nth-of-type(odd)":{backgroundColor:f.palette.grey[50]},"&:hover":{backgroundColor:f.palette.grey[100]}},children:[e.jsx(S,{sx:{border:0,padding:"12px 16px"},children:m.plan}),e.jsx(S,{sx:{border:0,padding:"12px 16px"},children:m.completed}),e.jsx(S,{sx:{border:0,padding:"12px 16px"},children:m.status}),e.jsx(S,{sx:{border:0,padding:"12px 16px"},children:m.department}),e.jsx(S,{sx:{border:0,padding:"12px 16px"},children:m.date})]},m.id))})]})})})]}),e.jsx(He,{open:n,autoHideDuration:6e3,onClose:()=>r(!1),children:e.jsx(Re,{onClose:()=>r(!1),severity:d,sx:{width:"100%"},children:s})})]})},V=({isLoading:n})=>{const r=w();return X(),k.useState(null),k.useState(null),e.jsx(e.Fragment,{children:n?e.jsx(J,{}):e.jsx(Z,{border:!1,content:!1,children:e.jsx(I,{sx:{ml:1},children:e.jsxs(t,{container:!0,direction:"column",children:[e.jsx(t,{item:!0,children:e.jsx(t,{container:!0,justifyContent:"space-between",children:e.jsx(t,{item:!0,children:e.jsx(u,{variant:"h3",sx:{mt:1.2,color:"grey.500"},children:"KPI List"})})})}),e.jsx(C,{sx:{borderBottom:.4,borderColor:r.palette.grey[300],marginY:3}}),e.jsxs(t,{item:!0,sx:{mb:0,cursor:"pointer"},children:[e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(t,{item:!0,xs:4,children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:15,borderColor:"rgb(77, 173, 127)",mr:2,height:"3vh"}}),e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1.2rem",fontWeight:500,color:"grey.800"},children:"Revenue Growth"})})]})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"Not Assigned"})})})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"80%"})})})})]}),e.jsxs(t,{container:!0,alignItems:"center",sx:{mt:2},children:[e.jsx(t,{item:!0,xs:4,children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:15,borderColor:"rgb(77, 173, 127)",mr:2,height:"3vh"}}),e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1.2rem",fontWeight:500,color:"grey.800"},children:"Employee Turnover Rate"})})]})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"Not Assigned"})})})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"80%"})})})})]}),e.jsxs(t,{container:!0,alignItems:"center",sx:{mt:2},children:[e.jsx(t,{item:!0,xs:4,children:e.jsxs(t,{container:!0,alignItems:"center",children:[e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:15,borderColor:"rgb(234,170,103)",mr:2,height:"3vh"}}),e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1.2rem",fontWeight:500,color:"grey.800"},children:"Customer Satisfaction"})})]})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"Assigned"})})})}),e.jsx(t,{item:!0,xs:4,children:e.jsx(t,{container:!0,alignItems:"center",children:e.jsx(t,{item:!0,sx:{mt:1},children:e.jsx(u,{sx:{fontSize:"1rem",fontWeight:500,color:"grey.800"},children:"80%"})})})})]})]})]})})})})};V.propTypes={isLoading:q.bool};const Ye=()=>{const[n,r]=c.useState(!0),s=w();return c.useEffect(()=>{r(!1)},[]),e.jsx(Ie,{maxWidth:"lg",title:"Detail Report",children:e.jsx(Te,{sx:{marginLeft:"10px",padding:"8px",marginTop:"25px"},children:e.jsx(t,{container:!0,spacing:we,children:e.jsx(t,{item:!0,xs:12,children:e.jsxs(t,{container:!0,spacing:"0",children:[e.jsx(t,{item:!0,lg:6,md:6,sm:6,xs:12,children:e.jsx(Q,{isLoading:n})}),e.jsx(t,{item:!0,xs:0,children:e.jsx(C,{orientation:"vertical",flexItem:!0,sx:{borderRightWidth:.4,borderColor:s.palette.grey[300],height:"38vh",ml:1}})}),e.jsx(t,{item:!0,lg:5.9,md:6,sm:6,xs:12,children:e.jsx(V,{isLoading:n})}),e.jsx(t,{item:!0,lg:12,md:6,sm:6,xs:12,children:e.jsx(Fe,{isLoading:n})})]})})})})})};export{Ye as default};
