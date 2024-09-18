import{d as $e,g as Se,a as ce,z as ra,_ as S,K as ze,j as a,s as K,B as oe,i as F,r as p,e as Ie,A as sa,c as ie,O as X,h as Te,o as Be,P as Y,Y as J,v as Z,q as na,R as De,a0 as C,a$ as Me,p as v,a8 as M,ab as we,ac as N,ad as Le,aA as Re,ah as Ae,ag as k,W as R,aj as H,C as Ne,a9 as oa,a4 as ia,at as la,a6 as B,a2 as P,a5 as ca}from"./index-BrIZ1aRM.js";import{A as da}from"./AddButton-Z1cywGJl.js";import{S as pa}from"./search-f3t_tkff.js";import{D as le}from"./DotMenu-7ewWz4Gi.js";import{a as G}from"./axios-B2-DI6Hg.js";import{D as Oe}from"./DrogaButton-DGfkej71.js";import{a as Ue,c as We,b as re,D as Ee}from"./DialogTitle-CTwNxPSd.js";import{D as ua}from"./DeletePrompt-Bj6JOZh3.js";import{E as fe}from"./ErrorPrompt-BxXhExEH.js";import{n as be}from"./no_result-CfkzRtwQ.js";import{F as je,L as Ce}from"./LastPage-C9NjV3u0.js";import"./IconPlus-CfO6zmqS.js";import"./IconDotsVertical-TdrOCuv3.js";import"./IconTrash-7HD_GTTn.js";import"./Box-DiQAjjjZ.js";import"./error-DW4k7GIP.js";function ga(e){return $e("MuiPagination",e)}Se("MuiPagination",["root","ul","outlined","text"]);const xa=["boundaryCount","componentName","count","defaultPage","disabled","hideNextButton","hidePrevButton","onChange","page","showFirstButton","showLastButton","siblingCount"];function ma(e={}){const{boundaryCount:t=1,componentName:l="usePagination",count:s=1,defaultPage:m=1,disabled:h=!1,hideNextButton:y=!1,hidePrevButton:n=!1,onChange:o,page:i,showFirstButton:r=!1,showLastButton:b=!1,siblingCount:z=1}=e,d=ce(e,xa),[u,O]=ra({controlled:i,default:m,name:l,state:"page"}),w=(x,$)=>{i||O($),o&&o(x,$)},_=(x,$)=>{const j=$-x+1;return Array.from({length:j},(se,ne)=>x+ne)},U=_(1,Math.min(t,s)),I=_(Math.max(s-t+1,t+1),s),W=Math.max(Math.min(u-z,s-t-z*2-1),t+2),T=Math.min(Math.max(u+z,t+z*2+2),I.length>0?I[0]-2:s-1),E=[...r?["first"]:[],...n?[]:["previous"],...U,...W>t+2?["start-ellipsis"]:t+1<s-t?[t+1]:[],..._(W,T),...T<s-t-1?["end-ellipsis"]:s-t>t?[s-t]:[],...I,...y?[]:["next"],...b?["last"]:[]],V=x=>{switch(x){case"first":return 1;case"previous":return u-1;case"next":return u+1;case"last":return s;default:return null}},L=E.map(x=>typeof x=="number"?{onClick:$=>{w($,x)},type:"page",page:x,selected:x===u,disabled:h,"aria-current":x===u?"true":void 0}:{onClick:$=>{w($,V(x))},type:x,page:V(x),selected:!1,disabled:h||x.indexOf("ellipsis")===-1&&(x==="next"||x==="last"?u>=s:u<=1)});return S({items:L},d)}function ha(e){return $e("MuiPaginationItem",e)}const D=Se("MuiPaginationItem",["root","page","sizeSmall","sizeLarge","text","textPrimary","textSecondary","outlined","outlinedPrimary","outlinedSecondary","rounded","ellipsis","firstLast","previousNext","focusVisible","disabled","selected","icon","colorPrimary","colorSecondary"]),_e=ze(a.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"NavigateBefore"),Pe=ze(a.jsx("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext"),va=["className","color","component","components","disabled","page","selected","shape","size","slots","type","variant"],Ve=(e,t)=>{const{ownerState:l}=e;return[t.root,t[l.variant],t[`size${X(l.size)}`],l.variant==="text"&&t[`text${X(l.color)}`],l.variant==="outlined"&&t[`outlined${X(l.color)}`],l.shape==="rounded"&&t.rounded,l.type==="page"&&t.page,(l.type==="start-ellipsis"||l.type==="end-ellipsis")&&t.ellipsis,(l.type==="previous"||l.type==="next")&&t.previousNext,(l.type==="first"||l.type==="last")&&t.firstLast]},ya=e=>{const{classes:t,color:l,disabled:s,selected:m,size:h,shape:y,type:n,variant:o}=e,i={root:["root",`size${X(h)}`,o,y,l!=="standard"&&`color${X(l)}`,l!=="standard"&&`${o}${X(l)}`,s&&"disabled",m&&"selected",{page:"page",first:"firstLast",last:"firstLast","start-ellipsis":"ellipsis","end-ellipsis":"ellipsis",previous:"previousNext",next:"previousNext"}[n]],icon:["icon"]};return Te(i,ha,t)},fa=K("div",{name:"MuiPaginationItem",slot:"Root",overridesResolver:Ve})(({theme:e,ownerState:t})=>S({},e.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,padding:"0 6px",margin:"0 3px",color:(e.vars||e).palette.text.primary,height:"auto",[`&.${D.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.size==="small"&&{minWidth:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,borderRadius:40/2,padding:"0 10px",fontSize:e.typography.pxToRem(15)})),ba=K(oe,{name:"MuiPaginationItem",slot:"Root",overridesResolver:Ve})(({theme:e,ownerState:t})=>S({},e.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,height:32,padding:"0 6px",margin:"0 3px",color:(e.vars||e).palette.text.primary,[`&.${D.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${D.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},transition:e.transitions.create(["color","background-color"],{duration:e.transitions.duration.short}),"&:hover":{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${D.selected}`]:{backgroundColor:(e.vars||e).palette.action.selected,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:F(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${D.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:F(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},[`&.${D.disabled}`]:{opacity:1,color:(e.vars||e).palette.action.disabled,backgroundColor:(e.vars||e).palette.action.selected}}},t.size==="small"&&{minWidth:26,height:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,height:40,borderRadius:40/2,padding:"0 10px",fontSize:e.typography.pxToRem(15)},t.shape==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius}),({theme:e,ownerState:t})=>S({},t.variant==="text"&&{[`&.${D.selected}`]:S({},t.color!=="standard"&&{color:(e.vars||e).palette[t.color].contrastText,backgroundColor:(e.vars||e).palette[t.color].main,"&:hover":{backgroundColor:(e.vars||e).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(e.vars||e).palette[t.color].main}},[`&.${D.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}},{[`&.${D.disabled}`]:{color:(e.vars||e).palette.action.disabled}})},t.variant==="outlined"&&{border:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${e.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${D.selected}`]:S({},t.color!=="standard"&&{color:(e.vars||e).palette[t.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`:F(e.palette[t.color].main,.5)}`,backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.activatedOpacity})`:F(e.palette[t.color].main,e.palette.action.activatedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / calc(${e.vars.palette.action.activatedOpacity} + ${e.vars.palette.action.focusOpacity}))`:F(e.palette[t.color].main,e.palette.action.activatedOpacity+e.palette.action.focusOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${D.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / calc(${e.vars.palette.action.activatedOpacity} + ${e.vars.palette.action.focusOpacity}))`:F(e.palette[t.color].main,e.palette.action.activatedOpacity+e.palette.action.focusOpacity)}},{[`&.${D.disabled}`]:{borderColor:(e.vars||e).palette.action.disabledBackground,color:(e.vars||e).palette.action.disabled}})})),ja=K("div",{name:"MuiPaginationItem",slot:"Icon",overridesResolver:(e,t)=>t.icon})(({theme:e,ownerState:t})=>S({fontSize:e.typography.pxToRem(20),margin:"0 -8px"},t.size==="small"&&{fontSize:e.typography.pxToRem(18)},t.size==="large"&&{fontSize:e.typography.pxToRem(22)})),Ca=p.forwardRef(function(t,l){const s=Ie({props:t,name:"MuiPaginationItem"}),{className:m,color:h="standard",component:y,components:n={},disabled:o=!1,page:i,selected:r=!1,shape:b="circular",size:z="medium",slots:d={},type:u="page",variant:O="text"}=s,w=ce(s,va),_=S({},s,{color:h,disabled:o,selected:r,shape:b,size:z,type:u,variant:O}),U=sa(),I=ya(_),T=(U?{previous:d.next||n.next||Pe,next:d.previous||n.previous||_e,last:d.first||n.first||je,first:d.last||n.last||Ce}:{previous:d.previous||n.previous||_e,next:d.next||n.next||Pe,first:d.first||n.first||je,last:d.last||n.last||Ce})[u];return u==="start-ellipsis"||u==="end-ellipsis"?a.jsx(fa,{ref:l,ownerState:_,className:ie(I.root,m),children:"…"}):a.jsxs(ba,S({ref:l,ownerState:_,component:y,disabled:o,className:ie(I.root,m)},w,{children:[u==="page"&&i,T?a.jsx(ja,{as:T,ownerState:_,className:I.icon}):null]}))}),_a=["boundaryCount","className","color","count","defaultPage","disabled","getItemAriaLabel","hideNextButton","hidePrevButton","onChange","page","renderItem","shape","showFirstButton","showLastButton","siblingCount","size","variant"],Pa=e=>{const{classes:t,variant:l}=e;return Te({root:["root",l],ul:["ul"]},ga,t)},$a=K("nav",{name:"MuiPagination",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:l}=e;return[t.root,t[l.variant]]}})({}),Sa=K("ul",{name:"MuiPagination",slot:"Ul",overridesResolver:(e,t)=>t.ul})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"});function za(e,t,l){return e==="page"?`${l?"":"Go to "}page ${t}`:`Go to ${e} page`}const Ia=p.forwardRef(function(t,l){const s=Ie({props:t,name:"MuiPagination"}),{boundaryCount:m=1,className:h,color:y="standard",count:n=1,defaultPage:o=1,disabled:i=!1,getItemAriaLabel:r=za,hideNextButton:b=!1,hidePrevButton:z=!1,renderItem:d=L=>a.jsx(Ca,S({},L)),shape:u="circular",showFirstButton:O=!1,showLastButton:w=!1,siblingCount:_=1,size:U="medium",variant:I="text"}=s,W=ce(s,_a),{items:T}=ma(S({},s,{componentName:"Pagination"})),E=S({},s,{boundaryCount:m,color:y,count:n,defaultPage:o,disabled:i,getItemAriaLabel:r,hideNextButton:b,hidePrevButton:z,renderItem:d,shape:u,showFirstButton:O,showLastButton:w,siblingCount:_,size:U,variant:I}),V=Pa(E);return a.jsx($a,S({"aria-label":"pagination navigation",className:ie(V.root,h),ownerState:E,ref:l},W,{children:a.jsx(Sa,{className:V.ul,ownerState:E,children:T.map((L,x)=>a.jsx("li",{children:d(S({},L,{color:y,"aria-label":r(L.type,L.page,L.selected),shape:u,size:U,variant:I}))},x))})}))});var Ta=Be("layout-grid","IconLayoutGrid",[["path",{d:"M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",key:"svg-0"}],["path",{d:"M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",key:"svg-1"}],["path",{d:"M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",key:"svg-2"}],["path",{d:"M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",key:"svg-3"}]]),Ba=Be("layout-list","IconLayoutList",[["path",{d:"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-1"}]]);const de=({sx:e,children:t,onPress:l})=>{const s=J();return a.jsx(Z,{sx:{backgroundColor:s.palette.background.default,padding:2,border:1,borderColor:s.palette.divider,cursor:"pointer",":hover":{boxShadow:1},...e},onClick:l,children:t})};de.propTypes={sx:Y.object,children:Y.node,onPress:Y.func};const qe=({data:e,onEdit:t,onDelete:l})=>{const s=J(),m=na(s.breakpoints.down("md")),[h,y]=p.useState(null),n=o=>{y(h===o?null:o)};return a.jsx(De.Fragment,{children:e.map((o,i)=>{var r,b;return a.jsxs(de,{sx:{padding:3,marginY:1.6},onPress:()=>n(o.id),children:[a.jsxs(C,{container:!0,justifyContent:"space-between",alignItems:"center",children:[a.jsxs(C,{item:!0,xs:12,sm:12,md:1,lg:1,xl:1,sx:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[a.jsx(Me,{size:"1.8rem",stroke:1.4})," ",m&&a.jsx(le,{orientation:"horizontal",onEdit:()=>t(o),onDelete:()=>l(o)})]}),a.jsxs(C,{item:!0,xs:12,sm:12,md:5,lg:5,xl:5,children:[a.jsx(v,{variant:"h4",color:s.palette.text.primary,children:o==null?void 0:o.name}),a.jsx(v,{variant:"subtitle1",color:s.palette.text.secondary,children:(r=o==null?void 0:o.perspective_type)==null?void 0:r.name})]}),a.jsxs(C,{item:!0,xs:12,sm:12,md:4,lg:4,xl:4,children:[a.jsx(v,{variant:"subtitle1",color:s.palette.text.primary,children:o==null?void 0:o.metric_type}),a.jsx(v,{variant:"body2",color:s.palette.text.secondary,children:(b=o==null?void 0:o.measuring_unit)==null?void 0:b.name})]}),!m&&a.jsx(C,{item:!0,xs:12,sm:12,md:1,lg:1,xl:1,children:a.jsx(le,{orientation:"horizontal",onEdit:()=>t(o),onDelete:()=>l(o)})})]}),h===o.id&&a.jsxs(Z,{sx:{backgroundColor:s.palette.primary.light,padding:1.6,marginY:.6},children:[a.jsxs(M,{children:[a.jsx(v,{variant:"h5",color:s.palette.text.primary,children:"Variation"}),a.jsx(v,{variant:"body2",color:s.palette.text.primary,marginTop:.4,children:o==null?void 0:o.variation_category})]}),(o==null?void 0:o.description)&&a.jsxs(M,{sx:{marginTop:2},children:[a.jsx(v,{variant:"h5",color:s.palette.text.primary,children:"Description"}),a.jsx(v,{variant:"body2",color:s.palette.text.primary,marginTop:.4,children:o==null?void 0:o.description})]})]})]},i)})})};qe.propTypes={data:Y.array,options:Y.node};const Fe=({data:e,onEdit:t,onDelete:l})=>{const s=J(),[m,h]=p.useState(null),y=n=>{h(m===n?null:n)};return a.jsx(De.Fragment,{children:e.map((n,o)=>{var i,r;return a.jsx(C,{item:!0,xs:12,sm:6,md:6,lg:4,xl:3,children:a.jsxs(de,{sx:{paddingX:2,paddingY:1},onPress:()=>y(n.id),children:[a.jsxs(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2.4},children:[a.jsx(Me,{size:"1.8rem",stroke:1.4})," ",a.jsx(le,{orientation:"horizontal",onEdit:()=>t(n),onDelete:()=>l(n)})]}),a.jsxs(M,{sx:{marginBottom:1},children:[a.jsx(v,{variant:"h4",color:s.palette.text.primary,children:n==null?void 0:n.name}),a.jsx(v,{variant:"subtitle1",color:s.palette.text.secondary,children:(i=n==null?void 0:n.perspective_type)==null?void 0:i.name})]}),a.jsxs(M,{sx:{marginBottom:1},children:[a.jsx(v,{variant:"subtitle1",color:s.palette.text.primary,children:n==null?void 0:n.metric_type}),a.jsx(v,{variant:"body2",color:s.palette.text.secondary,children:(r=n==null?void 0:n.measuring_unit)==null?void 0:r.name})]}),m===n.id&&a.jsxs(Z,{sx:{backgroundColor:s.palette.primary.light,padding:1.6,marginY:.6},children:[a.jsxs(M,{children:[a.jsx(v,{variant:"h5",color:s.palette.text.primary,children:"Variation"}),a.jsx(v,{variant:"body2",color:s.palette.text.primary,marginTop:.4,children:n==null?void 0:n.variation_category})]}),(n==null?void 0:n.description)&&a.jsxs(M,{sx:{marginTop:2},children:[a.jsx(v,{variant:"h5",color:s.palette.text.primary,children:"Description"}),a.jsx(v,{variant:"body2",color:s.palette.text.primary,marginTop:.4,children:n==null?void 0:n.description})]})]})]})},o)})})};Fe.propTypes={data:Y.array};const Da=we().shape({name:N().required("KPI name is required"),perspective_type_id:N().required("Perspective type is required"),measuring_unit_id:N().required("Measuring unit is required"),variation_category:N().required("Variation category is required"),description:N()}),Ma=({open:e,handleClose:t,isLoading:l,measuringUnits:s,perspectiveTypes:m,handleSubmission:h,isAdding:y,variationCategories:n})=>{const o=J(),i=Le({initialValues:{name:"",perspective_type_id:"",measuring_unit_id:"",variation_category:"",description:""},validationSchema:Da,onSubmit:r=>{h(r)}});return a.jsxs(Ue,{open:e,onClose:t,sx:{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.1)"},children:[a.jsxs(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingX:1},children:[a.jsx(We,{variant:"h3",color:o.palette.text.primary,children:"Create new KPI"}),a.jsx(Re.div,{whileHover:{rotate:90},transition:{duration:.3},style:{cursor:"pointer",marginRight:16},onClick:t,children:a.jsx(Ae,{size:"1.4rem",stroke:2})})]}),l?a.jsx(re,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx(k,{size:20})}):a.jsx(re,{children:a.jsxs("form",{onSubmit:i.handleSubmit,children:[a.jsx(R,{margin:"normal",fullWidth:!0,id:"name",name:"name",label:"KPI name",value:i.values.name,onChange:i.handleChange,error:i.touched.name&&!!i.errors.name,helperText:i.touched.name&&i.errors.name}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"perspective_type_id",name:"perspective_type_id",label:"Perspective Type",select:!0,value:i.values.perspective_type_id,onChange:i.handleChange,error:i.touched.perspective_type_id&&!!i.errors.perspective_type_id,helperText:i.touched.perspective_type_id&&i.errors.perspective_type_id,children:m.map(r=>a.jsx(H,{value:r.id,children:r.name},r.id))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"measuring_unit_id",name:"measuring_unit_id",label:"Measuring Unit",select:!0,value:i.values.measuring_unit_id,onChange:i.handleChange,error:i.touched.measuring_unit_id&&!!i.errors.measuring_unit_id,helperText:i.touched.measuring_unit_id&&i.errors.measuring_unit_id,children:s.map(r=>a.jsx(H,{value:r.id,children:r.name},r.id))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"variation_category",name:"variation_category",label:"Variation Category",select:!0,value:i.values.variation_category,onChange:i.handleChange,error:i.touched.variation_category&&!!i.errors.variation_category,helperText:i.touched.variation_category&&i.errors.variation_category,children:n.map((r,b)=>a.jsx(H,{value:r,children:r},b))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"description",name:"description",label:"Description (Optional)",multiline:!0,rows:4,value:i.values.description,onChange:i.handleChange,error:i.touched.description&&!!i.errors.description,helperText:i.touched.description&&i.errors.description}),a.jsxs(Ee,{children:[a.jsx(Ne,{onClick:t,color:"primary",children:"Cancel"}),a.jsx(Oe,{type:"submit",title:y?a.jsx(k,{size:22,sx:{color:o.palette.background.default}}):"Done",sx:{paddingX:6}})]})]})})]})},wa=we().shape({name:N().required("KPI Name is required"),perspective_type_id:N().required("Perspective type is required"),measuring_unit_id:N().required("Measuring unit is required"),variation_category:N().required("Variation category is required")}),La=({open:e,selectedKPI:t,handleClose:l,isLoading:s,measuringUnits:m,perspectiveTypes:h,handleSubmission:y,isUpdating:n,variationCategories:o})=>{var b,z;const i=J(),r=Le({initialValues:{name:t==null?void 0:t.name,perspective_type_id:(b=t==null?void 0:t.perspective_type)==null?void 0:b.id,measuring_unit_id:(z=t==null?void 0:t.measuring_unit)==null?void 0:z.id,variation_category:t==null?void 0:t.variation_category,description:t==null?void 0:t.description},validationSchema:wa,onSubmit:d=>{y(d)}});return a.jsxs(Ue,{open:e,onClose:l,children:[a.jsxs(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingX:1},children:[a.jsx(We,{variant:"h3",color:i.palette.text.primary,children:"Update KPI"}),a.jsx(Re.div,{whileHover:{rotate:90},transition:{duration:.3},style:{cursor:"pointer",marginRight:16},onClick:l,children:a.jsx(Ae,{size:"1.4rem",stroke:2})})]}),s?a.jsx(re,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx(k,{size:20})}):a.jsx(re,{children:a.jsxs("form",{onSubmit:r.handleSubmit,children:[a.jsx(R,{margin:"normal",fullWidth:!0,id:"name",name:"name",label:"KPI name",value:r.values.name,onChange:r.handleChange,error:r.touched.name&&!!r.errors.name,helperText:r.touched.name&&r.errors.name}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"perspective_type_id",name:"perspective_type_id",label:"Perspective Type",select:!0,value:r.values.perspective_type_id,onChange:r.handleChange,error:r.touched.perspective_type_id&&!!r.errors.perspective_type_id,helperText:r.touched.perspective_type_id&&r.errors.perspective_type_id,children:h.map(d=>a.jsx(H,{value:d.id,children:d.name},d.id))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"measuring_unit_id",name:"measuring_unit_id",label:"Measuring Unit",select:!0,value:r.values.measuring_unit_id,onChange:r.handleChange,error:r.touched.measuring_unit_id&&!!r.errors.measuring_unit_id,helperText:r.touched.measuring_unit_id&&r.errors.measuring_unit_id,children:m.map(d=>a.jsx(H,{value:d.id,children:d.name},d.id))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"variation_category",name:"variation_category",label:"Variation Category",select:!0,value:r.values.variation_category,onChange:r.handleChange,error:r.touched.variation_category&&!!r.errors.variation_category,helperText:r.touched.variation_category&&r.errors.variation_category,children:o.map((d,u)=>a.jsx(H,{value:d,children:d},u))}),a.jsx(R,{fullWidth:!0,margin:"normal",id:"description",name:"description",label:"Description (Optional)",multiline:!0,rows:4,value:r.values.description,onChange:r.handleChange,error:r.touched.description&&!!r.errors.description,helperText:r.touched.description&&r.errors.description}),a.jsxs(Ee,{children:[a.jsx(Ne,{onClick:l,color:"primary",children:"Cancel"}),a.jsx(Oe,{type:"submit",title:"Done",sx:{paddingX:6}})]})]})})]})},Za=()=>{const e=J(),[t,l]=p.useState(!1),[s,m]=p.useState("card"),[h,y]=p.useState(!1),[n,o]=p.useState([]),[i,r]=p.useState(!1),[b,z]=p.useState(""),[d,u]=p.useState({page:0,per_page:10,last_page:0,total:0}),[O,w]=p.useState(!1),[_,U]=p.useState([]),[I,W]=p.useState([]),[T,E]=p.useState([]),[V,L]=p.useState(!1),[x,$]=p.useState(!1),[j,se]=p.useState(),[ne,pe]=p.useState(!1),[Ge,Q]=p.useState(!1),[ue,ee]=p.useState(!1),[Xe,ae]=p.useState(!1),[Ye,ge]=p.useState(!1),[q,He]=p.useState(null),Je=()=>{L(!0),_.length===0&&ye()},xe=()=>{L(!1)},me=c=>{pe(!0),se(c),_.length===0&&ye()},he=c=>{se(c),ee(!0)},ve=()=>{pe(!1)},ye=async()=>{w(!0);try{const c=localStorage.getItem("token"),f=B.api+B.preSetups,g=await G.get(f,{headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"}});g.data.success?(W(g.data.data.perspective_types),U(g.data.data.measuring_units),E(g.data.data.variation_categories),w(!1)):(w(!1),P.error(g.data.data.message))}catch(c){w(!1),P.error(c.message)}},Qe=async c=>{$(!0);try{const f=localStorage.getItem("token"),g=B.api+B.kpi;if(!T.includes(c.variation_category))throw new Error("Invalid variation category selected");const A=await G(g,{method:"POST",headers:{Authorization:`Bearer ${f}`,"Content-Type":"application/json",Accept:"application/json, text/plain, */*"},data:JSON.stringify(c)});A.data.success?(te(),xe(),P.success(A.data.data.message),$(!1)):(P.error(A.data.message||"Error occurred"),$(!1))}catch(f){P.error(f.message),$(!1)}},Ze=async c=>{Q(!0);try{const f=localStorage.getItem("token"),g=B.api+B.kpi+`/${j==null?void 0:j.id}`;if(!T.includes(c.variation_category))throw Q(!1),new Error("Invalid variation category selected");const A=await G(g,{method:"PATCH",headers:{Authorization:`Bearer ${f}`,"Content-Type":"application/json",Accept:"application/json"},data:JSON.stringify(c)});A.data.success?(te(),ve(),P.success(A.data.data.message),Q(!1)):(P.error(A.data.message||"Error occurred"),Q(!1))}catch(f){P.error(f.message),Q(!1)}},ke=async()=>{ae(!0);try{const c=await ca(),f=B.api+B.kpi+`/${j==null?void 0:j.id}`,g=await G.delete(f,{headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"}});g.data.success?(ae(!1),ee(!1),o(A=>A.filter(ta=>ta.id!==(j==null?void 0:j.id))),P.success(g.data.data.message)):(ae(!1),P.error(g.data.data.message))}catch(c){ae(!1),P.error(c.message)}},Ke=c=>{const f=c.target.value;z(f),u({...d,page:0})},ea=(c,f)=>{u({...d,page:f})},te=async()=>{y(!0);try{const c=localStorage.getItem("token"),f=B.api+B.kpi+`?page=${d.page}&per_page=${d.per_page}&search=${b}`,g=await G.get(f,{headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"}});g.data.success?(o(g.data.data.data),u({...d,total:g.data.data.total,last_page:g.data.data.last_page})):P.error(g.data.data.message)}catch(c){P.error(c.message),r(!0)}finally{y(!1)}},aa=async()=>{ge(!0);try{const c=localStorage.getItem("token"),f=B.api+B.getStats,g=await G.get(f,{headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"}});g.data.success?He(g.data.data):P.error(g.data.data.message)}catch(c){P.error(c.message)}finally{ge(!1)}};return p.useEffect(()=>{t?te():l(!0)},[d.page,d.per_page]),p.useEffect(()=>(aa(),()=>{}),[]),p.useEffect(()=>{const c=setTimeout(()=>{te()},800);return()=>{clearTimeout(c)}},[b]),a.jsxs(oa,{title:"KPI Management",rightOption:a.jsx(da,{props:{varaint:"contained"},title:"Create New KPI",onPress:()=>Je(),sx:{}}),children:[a.jsx(C,{container:!0,padding:2,sx:{marginTop:2},children:a.jsx(C,{item:!0,xs:12,children:a.jsxs(C,{container:!0,spacing:2,sx:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:[a.jsxs(C,{item:!0,xs:12,sm:12,md:11,lg:8,xl:8,children:[a.jsx(C,{container:!0,children:a.jsx(C,{item:!0,xs:12,children:a.jsxs(Z,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,border:1,borderColor:e.palette.divider},children:[a.jsx(pa,{title:"Filter KPI",value:b,onChange:c=>Ke(c),filter:!1}),a.jsxs(Z,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",minWidth:90,paddingY:.6,paddingX:.8},children:[a.jsx(oe,{onClick:()=>m("card"),sx:{padding:.6,borderRadius:2,":hover":{backgroundColor:e.palette.grey[100]},transition:"all 0.4s ease",backgroundColor:s==="card"&&e.palette.grey[100]},children:a.jsx(Ta,{stroke:1.6,size:"1.5rem",style:{color:s==="card"&&e.palette.primary[800]}})}),a.jsx(oe,{onClick:()=>m("list"),sx:{padding:.6,borderRadius:2,":hover":{backgroundColor:e.palette.grey[100]},transition:"all 0.4s ease",backgroundColor:s==="list"&&e.palette.grey[100]},children:a.jsx(Ba,{stroke:1.6,size:"1.5rem",style:{color:s==="list"&&e.palette.primary[800]}})})]})]})})}),h?a.jsx(C,{container:!0,sx:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",padding:8},children:a.jsx(k,{size:22})}):i?a.jsx(fe,{image:be,title:"Server Error",message:"Unable to retrive the KPI's!"}):s==="list"?a.jsx(qe,{data:n,onEdit:c=>me(c),onDelete:c=>he(c)}):a.jsx(C,{container:!0,sx:{display:"flex",flexWrap:"wrap",marginTop:.6},spacing:2,children:a.jsx(Fe,{data:n,onEdit:c=>me(c),onDelete:c=>he(c)})}),!h&&a.jsx(Ia,{sx:{marginTop:2},count:d.last_page,page:d.page,variant:"outlined",shape:"rounded",onChange:ea})]}),a.jsx(C,{item:!0,xs:12,sm:12,md:11,lg:4,xl:4,children:a.jsxs(ia,{children:[a.jsx(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",pb:1.4,borderBottom:.8,borderColor:e.palette.divider},children:a.jsx(v,{variant:"h3",color:e.palette.text.primary,sx:{marginLeft:1},children:"KPI Summary"})}),Ye?a.jsx(C,{container:!0,sx:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",padding:8},children:a.jsx(k,{size:18})}):i?a.jsx(fe,{image:be,title:"Server Error",message:"error retriving summarries"}):a.jsxs(a.Fragment,{children:[a.jsxs(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,my:1},children:[a.jsx(v,{variant:"subtitle1",color:e.palette.text.primary,children:"Total KPI's"}),a.jsx(v,{variant:"h4",color:e.palette.text.primary,children:q==null?void 0:q.kpis})]}),a.jsxs(M,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,my:1},children:[a.jsx(v,{variant:"subtitle1",color:e.palette.text.primary,children:"Total Perspective Types"}),a.jsx(v,{variant:"h4",color:e.palette.text.primary,children:q==null?void 0:q.perspectiveTypes})]})]})]})})]})})}),a.jsx(Ma,{open:V,handleClose:xe,isLoading:O,measuringUnits:_,perspectiveTypes:I,variationCategories:T,handleSubmission:c=>Qe(c),isAdding:x}),j&&a.jsx(La,{open:ne,selectedKPI:j,handleClose:ve,isLoading:O,measuringUnits:_,perspectiveTypes:I,variationCategories:T,handleSubmission:c=>Ze(c),isUpdating:Ge}),ue&&a.jsx(ua,{type:"Delete",open:ue,title:"Deleting KPI",description:"Are you sure you want to delete "+(j==null?void 0:j.name),onNo:()=>ee(!1),onYes:()=>ke(),deleting:Xe,handleClose:()=>ee(!1)}),a.jsx(la,{})]})};export{Za as default};
