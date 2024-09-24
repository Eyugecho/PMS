import{K as je,j as e,ab as fe,ac as te,Y as ce,r as n,ad as ye,J as se,ae as We,a8 as v,p as _,S as B,U as I,af as de,V as K,C as R,ag as V,ah as Oe,ai as ae,aj as w,ak as Ne,v as Le,al as Ve,am as be,an as ne,ao as qe,W as le,a2 as x,a6 as u,ap as Ge,a9 as Xe,a4 as He,a0 as J,aq as Je,ar as Ye,R as Ke,as as Qe,at as Ze,a5 as Y}from"./index-BrIZ1aRM.js";import{F as ee}from"./index-CJagu-9E.js";import{S as et}from"./search-f3t_tkff.js";import{I as tt}from"./IconPlus-CfO6zmqS.js";import{I as at}from"./IconCheck-FoBfTDry.js";import{a as Ce,c as Te,b as Se,D as Ue}from"./DialogTitle-CTwNxPSd.js";import{d as ke,a as nt}from"./Delete-CJ0mWhfC.js";import{T as st}from"./TableContainer-CbJxeCPv.js";import{T as rt,a as it,b as me,c as ot}from"./TableRow-BXiBQlkf.js";import{T as L}from"./TableCell-BqWHfhA4.js";import{A as dt}from"./AddButton-Z1cywGJl.js";import{T as lt}from"./TablePagination-Cpy0D8zw.js";import"./error-DW4k7GIP.js";import"./KeyboardArrowRight-pfrJvB3H.js";import"./LastPage-C9NjV3u0.js";const ct=je(e.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert"),pt=je(e.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVertOutlined"),ht=fe().shape({name:te().required("Type name is required")});function ut({isAdding:g,handleSubmission:l}){const c=ce(),[p,m]=n.useState(null),b=y=>{m(y.currentTarget)},a=()=>{m(null)},o=!!p,j=o?"popover":void 0,s=ye({initialValues:{name:""},validationSchema:ht,onSubmit:y=>{l(y),a()}});return e.jsxs("div",{children:[e.jsx(se,{"aria-describedby":j,onClick:b,sx:{backgroundColor:c.palette.grey[50]},children:e.jsx(tt,{size:18})}),e.jsx(We,{id:j,open:o,anchorEl:p,onClose:a,anchorOrigin:{vertical:"bottom",horizontal:"left"},sx:{"& .MuiPaper-root":{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.5)",borderRadius:2,boxShadow:c.shadows[1]}},children:e.jsxs(v,{sx:{padding:2},children:[e.jsx(_,{variant:"subtitle1",children:"New Unit Type"}),e.jsxs("form",{noValidate:!0,onSubmit:s.handleSubmit,children:[e.jsxs(B,{fullWidth:!0,error:s.touched.name&&!!s.errors.name,sx:{marginY:3},children:[e.jsx(I,{htmlfor:"name",children:"Type name"}),e.jsx(de,{id:"name",name:"name",label:"Type name",value:s.values.name,onChange:s.handleChange,fullWidth:!0}),s.touched.name&&s.errors.name&&e.jsx(K,{error:!0,id:"standard-weight-helper-text-name",children:s.errors.name})]}),e.jsx(R,{type:"submit",variant:"contained",fullWidth:!0,sx:{padding:1.4,boxShadow:0},disabled:g,children:g?e.jsx(V,{size:18,sx:{color:"white"}}):e.jsx(at,{size:18})})]})]})})]})}const xt=fe().shape({name:te().required("Unit name is required"),parent_id:te().required("Parent Unit is required"),type:te().required("Unit type is required")}),gt=({add:g,isAdding:l,unitss:c,types:p,onClose:m,handleSubmission:b})=>{const a=ye({initialValues:{name:"",parent_id:"",type:"",unit:null,description:""},validationSchema:xt,onSubmit:o=>{b(o)}});return e.jsx(n.Fragment,{children:e.jsxs(Ce,{open:g,onClose:m,sx:{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.1)"},children:[e.jsxs(v,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:2},children:[e.jsx(Te,{variant:"h3",children:"Add Unit"}),e.jsx(se,{onClick:m,children:e.jsx(Oe,{size:20})})]}),e.jsxs("form",{noValidate:!0,onSubmit:a.handleSubmit,children:[e.jsxs(Se,{children:[e.jsxs(B,{fullWidth:!0,error:a.touched.name&&!!a.errors.name,sx:{marginTop:3},children:[e.jsx(I,{htmlfor:"name",children:"Name"}),e.jsx(de,{id:"name",name:"name",label:"name",value:a.values.name,onChange:a.handleChange,fullWidth:!0}),a.touched.name&&a.errors.name&&e.jsx(K,{error:!0,id:"standard-weight-helper-text-name",children:a.errors.name})]}),e.jsxs(B,{fullWidth:!0,error:a.touched.type&&!!a.errors.type,sx:{marginTop:3},children:[e.jsx(I,{htmlfor:"type",children:"Unit type"}),e.jsx(ae,{id:"type",name:"type",label:"Unit type",value:a.values.type,onChange:a.handleChange,children:p.length===0?e.jsx(_,{variant:"body2",sx:{padding:1},children:"Unit type is not found"}):p==null?void 0:p.map((o,j)=>e.jsx(w,{value:o.id,children:o.name},j))}),a.touched.type&&a.errors.type&&e.jsx(K,{error:!0,id:"standard-weight-helper-text-type",children:a.errors.type})]}),e.jsxs(B,{fullWidth:!0,error:a.touched.parent_id&&!!a.errors.parent_id,sx:{marginTop:3},children:[e.jsx(I,{htmlfor:"unit",children:"Select parent unit"}),e.jsx(ae,{id:"unit",name:"parent_id",label:"Select parent unit",value:a.values.parent_id,onChange:a.handleChange,children:c.length===0?e.jsx(_,{variant:"body2",sx:{padding:1},children:"Unit is not found"}):c==null?void 0:c.map((o,j)=>e.jsx(w,{value:o.id,children:o.name},j))}),a.touched.parent_id&&a.errors.parent_id&&e.jsx(K,{error:!0,id:"standard-weight-helper-text-parent_id",children:a.errors.parent_id})]}),e.jsxs(B,{fullWidth:!0,error:a.touched.description&&!!a.errors.description,sx:{marginTop:3},children:[e.jsx(I,{htmlfor:"description",children:"Description (optional)"}),e.jsx(de,{id:"description",name:"description",label:"Description (optional)",value:a.values.description,onChange:a.handleChange,fullWidth:!0,multiline:!0,rows:4}),a.touched.description&&a.errors.description&&e.jsx(K,{error:!0,id:"standard-weight-helper-text-description",children:a.errors.description})]})]}),e.jsxs(Ue,{sx:{paddingX:2},children:[e.jsx(R,{variant:"",onClick:m,sx:{marginLeft:10},children:"Cancel"}),e.jsx(R,{type:"submit",variant:"contained",sx:{paddingX:6,boxShadow:0},disabled:l,children:l?e.jsx(V,{size:18,sx:{color:"white"}}):"Done"})]})]})]})})},mt=({units:g,onEdit:l,onDelete:c})=>{const p=ce(),m=Ne(),[b,a]=n.useState(null),[o,j]=n.useState(null),s=(r,U)=>{a(r.currentTarget),j(U)},y=()=>{a(null),j(null)},A=()=>{m("/units/view",{state:o}),y()},S=()=>{l&&o&&l(o),y()};return e.jsx(Le,{sx:{minHeight:"66dvh",border:.4,borderColor:p.palette.grey[300],borderRadius:2,overflow:"hidden",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"},children:e.jsx(st,{children:e.jsxs(rt,{sx:{minWidth:650,borderCollapse:"collapse"},"aria-label":"Organization unit table",children:[e.jsx(it,{children:e.jsx(me,{children:["Unit Name","Parent Unit","Unit Type","Manager","Actions"].map(r=>e.jsx(L,{sx:{background:p.palette.grey[100],color:"#000",fontWeight:"bold",fontSize:"0.9rem",borderBottom:`2px solid ${p.palette.divider}`,position:"relative",padding:"12px 16px","&:not(:last-of-type)":{borderRight:`1px solid ${p.palette.divider}`}},children:r},r))})}),e.jsx(ot,{children:g==null?void 0:g.map(r=>{var U,D,E,$,P,M,C;return e.jsxs(me,{sx:{backgroundColor:p.palette.background.paper,borderRadius:2,"&:nth-of-type(odd)":{backgroundColor:p.palette.grey[50]},"&:hover":{backgroundColor:p.palette.grey[100]}},children:[e.jsx(L,{sx:{display:"flex",alignItems:"center",border:0,padding:"12px 16px"},children:e.jsx(_,{variant:"subtitle3",sx:{flexGrow:1},children:r.name})}),e.jsx(L,{sx:{border:0,padding:"12px 16px"},children:r!=null&&r.parent?(U=r==null?void 0:r.parent)==null?void 0:U.name:"No Parent"}),e.jsx(L,{sx:{border:0,padding:"12px 16px"},children:(D=r.unit_type)==null?void 0:D.name}),e.jsxs(L,{sx:{border:0,padding:"12px 14px",display:"flex",alignItems:"center"},children:[e.jsx(Ve,{alt:($=(E=r.manager)==null?void 0:E.user)==null?void 0:$.name,sx:{width:25,height:25,marginRight:1}}),e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx(_,{variant:"subtitle3",sx:{flexGrow:1},children:(M=(P=r.manager)==null?void 0:P.user)==null?void 0:M.name}),e.jsx(_,{variant:"subtitle2",children:(C=r.manager)==null?void 0:C.position})]})]}),e.jsxs(L,{sx:{border:0,padding:"12px 16px"},children:[e.jsx(se,{onClick:d=>s(d,r),size:"small",children:e.jsx(ct,{})}),e.jsxs(be,{anchorEl:b,open:!!b,onClose:y,sx:{"& .MuiPaper-root":{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:2,boxShadow:p.shadows[1]}},children:[e.jsxs(w,{onClick:A,children:[e.jsx(ne,{children:e.jsx(qe,{fontSize:"small",style:{paddingRight:"4px",color:"gray"}})}),"View"]}),e.jsxs(w,{onClick:S,children:[e.jsx(ne,{children:e.jsx(ke,{fontSize:"small",style:{paddingRight:"4px",color:"#11365A"}})}),"Edit"]})]})]})]},r.id)})})]})})})},jt=({open:g,onClose:l,unit:c,onUpdate:p})=>{const[m,b]=n.useState(""),[a,o]=n.useState(""),[j,s]=n.useState(""),[y,A]=n.useState(""),[S,r]=n.useState([]),[U,D]=n.useState([]),[E,$]=n.useState(!1),[P,M]=n.useState(!0);n.useEffect(()=>{c&&(b(c.name),s(c.manager_id||""),o(c.description),A(c.unit_type_id||"")),(async()=>{const F=localStorage.getItem("token"),q=u.api+u.types,W=u.api+u.getManagers,k={Authorization:`Bearer ${F}`,accept:"application/json","Content-Type":"application/json"};try{const[G,re]=await Promise.all([fetch(q,{method:"GET",headers:k}),fetch(W,{method:"GET",headers:k})]),O=await G.json(),z=await re.json();O.success&&Array.isArray(O.data)?r(O.data):x.error("Failed to fetch unit types"),z.success&&Array.isArray(z.data)?D(z.data):x.error("Failed to fetch managers")}catch{x.error("Error fetching data")}finally{M(!1)}})()},[c]);const C=()=>{$(!0);const d=localStorage.getItem("token"),F=`${u.api}${u.units}/${c.id}`,q={Authorization:`Bearer ${d}`,accept:"application/json","Content-Type":"application/json"};fetch(F,{method:"PUT",headers:q,body:JSON.stringify({name:m,manager_id:j,unit_type_id:y,description:a})}).then(k=>k.json()).then(k=>{k.success?(x.success("Successfully updated unit"),p(),l()):x.error(k.message),$(!1)}).catch(k=>{x.error(k.message),$(!1)})};return e.jsxs(Ce,{open:g,onClose:l,sx:{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.1)"},children:[e.jsx(Te,{children:"Edit Unit"}),e.jsx(Se,{children:P?e.jsx(V,{}):e.jsxs(e.Fragment,{children:[e.jsx(le,{autoFocus:!0,margin:"dense",label:"Name",fullWidth:!0,variant:"outlined",value:m,onChange:d=>b(d.target.value)}),e.jsxs(B,{fullWidth:!0,margin:"dense",children:[e.jsx(I,{children:"Manager"}),e.jsx(ae,{value:j,onChange:d=>s(d.target.value),label:"Manager",children:Array.isArray(U)&&U.length>0?U.map(d=>e.jsx(w,{value:d.id,children:d.user.name},d.id)):e.jsx(w,{disabled:!0,children:"No managers available"})})]}),e.jsxs(B,{fullWidth:!0,margin:"dense",children:[e.jsx(I,{children:"Unit Type"}),e.jsx(ae,{value:y,onChange:d=>A(d.target.value),label:"Unit Type",children:Array.isArray(S)&&S.length>0?S.map(d=>e.jsx(w,{value:d.id,children:d.name},d.id)):e.jsx(w,{disabled:!0,children:"No unit types available"})})]}),e.jsx(le,{margin:"dense",label:"Description",fullWidth:!0,variant:"outlined",value:a,onChange:d=>o(d.target.value)})]})}),e.jsxs(Ue,{children:[e.jsx(R,{onClick:l,disabled:E,children:"Cancel"}),e.jsx(R,{onClick:C,disabled:E,color:"primary",children:E?e.jsx(V,{size:24}):"Update"})]})]})},ft=({open:g,unitType:l,onClose:c,onUpdate:p})=>{const[m,b]=n.useState(""),[a,o]=n.useState(!1);n.useEffect(()=>{l&&b(l.name)},[l]);const j=async()=>{if(!(l!=null&&l.id)){x.error("Unit type ID is undefined.");return}o(!0);const s=localStorage.getItem("token"),y=`${u.api}unit-types/${l.id}`,A={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"},S={name:m};try{const r=await fetch(y,{method:"PATCH",headers:A,body:JSON.stringify(S)}),U=await r.json();r.ok?(p({...l,name:m}),x.success("Unit type updated successfully"),c()):x.error(U.message||"Failed to update unit type")}catch(r){x.error(r.message||"An error occurred")}finally{o(!1)}};return e.jsx(Ge,{open:g,onClose:c,sx:{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.1)"},children:e.jsxs(v,{sx:{width:300,margin:"auto",marginTop:"20%",padding:2,backgroundColor:"white",borderRadius:2},children:[e.jsx(le,{fullWidth:!0,label:"Unit Type",value:m,onChange:s=>b(s.target.value),sx:{marginBottom:2},disabled:a}),e.jsx(R,{variant:"contained",color:"primary",onClick:j,disabled:a||!m.trim(),children:a?"Updating...":"Update"}),e.jsx(R,{variant:"outlined",onClick:c,sx:{marginLeft:1},disabled:a,children:"Cancel"})]})})},Bt=()=>{const g=ce(),[l,c]=n.useState(!1),[p,m]=n.useState(!0),[b,a]=n.useState([]),[o,j]=n.useState(!1),[s,y]=n.useState({page:0,per_page:10,last_page:0,total:0}),[A,S]=n.useState(!0),[r,U]=n.useState([]),[D,E]=n.useState([]),[$,P]=n.useState(!1),[M,C]=n.useState(!1),[d,F]=n.useState(!1),[q,W]=n.useState(null),[k,G]=n.useState(!1),[re,O]=n.useState(!1),[z,ie]=n.useState(null),[oe,ve]=n.useState(""),we=(t,h)=>{F(t.currentTarget),ie(h)},Q=()=>{F(!1),W(null)},Ae=t=>{const h=t.target.value;ve(h),y({...s,page:0})},N=async()=>{S(!0);const t=await Y(),h=u.api+u.types,T={Authorization:`Bearer ${t}`,accept:"application/json","Content-Type":"application/json"};fetch(h,{method:"GET",headers:T}).then(i=>i.json()).then(i=>{i.success?(S(!1),U(i.data)):S(!1)}).catch(i=>{S(!1),x(i.message)})},Ee=async()=>{const t=await Y(),h=u.api+u.employees+"?role=manager",T={Authorization:`Bearer ${t}`,accept:"application/json","Content-Type":"application/json"};fetch(h,{method:"GET",headers:T}).then(i=>i.json()).then(i=>{i.success&&E(i.data.data)}).catch(i=>{x(i.message)})},$e=()=>{P(!0),N(),Ee()},pe=()=>{P(!1)},_e=async t=>{C(!0);const h=await Y(),T=u.api+u.units,i={Authorization:`Bearer ${h}`,accept:"application/json","Content-Type":"application/json"},X={parent_id:t==null?void 0:t.parent_id,unit_type_id:t==null?void 0:t.type,name:t==null?void 0:t.name,description:t==null?void 0:t.description};fetch(T,{method:"POST",headers:i,body:JSON.stringify(X)}).then(f=>f.json()).then(f=>{f.success?(C(!1),pe(),x(f.message)):(C(!1),x.error(f.data.message))}).catch(f=>{x.error(f.message),C(!1)})},Pe=async t=>{C(!0);const h=await Y(),T=u.api+u.types,i={Authorization:`Bearer ${h}`,accept:"application/json","Content-Type":"application/json"},X={name:t==null?void 0:t.name};fetch(T,{method:"POST",headers:i,body:JSON.stringify(X)}).then(f=>f.json()).then(f=>{f.success?(C(!1),N(),x(f.message)):(C(!1),x(f.message))}).catch(f=>{x.error(f.message),C(!1)})},he=(t,h)=>{y({...s,page:h})},ue=t=>{y({...s,per_page:parseInt(t.target.value),page:0})},Me=t=>{W(t),G(!0)},ze=()=>{N(),Z()},Be=()=>{G(!1),W(null)},Ie=t=>{ie(t),O(!0),Q()},Re=()=>{N()},De=()=>{O(!1),ie(null)},xe=async(t,h="unit")=>{var f;const T=localStorage.getItem("token"),i=h==="unit"?`${u.api}${u.units}/${t}`:`${u.api}${u.types}/${t}`,X={Authorization:`Bearer ${T}`,accept:"application/json","Content-Type":"application/json"};try{const H=await fetch(i,{method:"DELETE",headers:X});if(!H.ok){const Fe=((f=(await H.json()).data)==null?void 0:f.message)||"Failed to delete";throw new Error(Fe)}const ge=await H.json();if(ge.success)x(`${h==="unit"?"Unit":"Unit Type"} deleted successfully`),h==="unit"?(Z(),Q()):(N(),Q());else throw new Error(ge.message||"Failed to delete")}catch(H){x.error(`Error deleting ${h==="unit"?"unit":"unit type"}: ${H.message}`)}},Z=async()=>{const t=await Y(),h=u.api+u.units+`?page=${s.page}&per_page=${s.per_page}&search=${oe}`,T={Authorization:`Bearer ${t}`,accept:"application/json","Content-Type":"application/json"};fetch(h,{method:"GET",headers:T}).then(i=>i.json()).then(i=>{i.success?(a(i.data.data),y({...s,last_page:i.data.last_page,total:i.data.total}),m(!1),j(!1)):(m(!1),j(!1))}).catch(i=>{x(i.message),j(!0),m(!1)})};return n.useEffect(()=>{const t=setTimeout(()=>{Z()},800);return()=>{clearTimeout(t)}},[oe]),n.useEffect(()=>{l?Z():c(!0)},[s.page,s.per_page]),n.useEffect(()=>{N()},[]),e.jsx(Xe,{maxWidth:"lg",title:"Units Managment",children:e.jsxs(He,{sx:{marginLeft:"10px"},children:[e.jsxs(J,{container:!0,sx:{borderRadius:2,marginTop:2,paddingY:3,paddingX:2},children:[e.jsx(J,{item:!0,xs:10,md:8.4,children:e.jsx(Je,{children:e.jsx(Ye,{children:e.jsxs(v,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(et,{title:"Search units",value:oe,onChange:t=>Ae(t),filter:!1}),e.jsx(dt,{title:"Add unit",onPress:()=>$e()})]})})})}),e.jsxs(J,{container:!0,sx:{display:"flex",justifyContent:"space-between"},children:[e.jsx(J,{xs:12,sm:12,md:8,lg:8,xl:8,sx:{minHeight:"64dvh",margin:2},children:p?e.jsx(v,{sx:{padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(V,{size:22})}):o?e.jsx(ee,{severity:"error",title:"Server error",description:"There is error fetching units"}):b.length===0?e.jsx(ee,{severity:"department",title:"Unit not found",description:"The list of added units will be listed here",sx:{paddingTop:6}}):e.jsxs(Ke.Fragment,{children:[e.jsx(mt,{units:b,onEdit:Me,onDelete:xe,onPageChange:he,onRowsPerPageChange:ue,pagination:s}),e.jsx(lt,{component:"div",rowsPerPageOptions:[10,25,50,100],count:s.total,rowsPerPage:s.per_page,page:s.page,onPageChange:he,onRowsPerPageChange:ue})]})}),e.jsx(J,{xs:12,sm:12,md:3.6,lg:3.6,xl:3.6,sx:{paddingTop:1},children:e.jsxs(v,{sx:{background:g.palette.grey[100],color:"#000",borderRadius:2,fontSize:"0.9rem",marginTop:1,borderBottom:`2px solid ${g.palette.divider}`,position:"relative",padding:"12px 16px","&:not(:last-of-type)":{borderRight:`1px solid ${g.palette.divider}`},boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"},children:[e.jsxs(v,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingX:1.6,borderColor:g.palette.grey[300]},children:[e.jsx(_,{variant:"subtitle1",sx:{fontWeight:"bold"},children:"Unit Types"}),e.jsx(ut,{isAdding:M,handleSubmission:t=>Pe(t)})]}),e.jsx(Qe,{sx:{borderBottom:.4,borderColor:g.palette.grey[400],marginY:1}}),e.jsx(v,{children:A?e.jsx(v,{sx:{padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(V,{size:20})}):o?e.jsx(ee,{severity:"error",title:"Server error",description:"There is error fetching unit type"}):r.length===0?e.jsx(ee,{severity:"department",title:"Unit type not found",description:"The list of added unit types will be listed here",sx:{paddingTop:6}}):r.map((t,h)=>e.jsxs(v,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingY:.8,paddingX:2,":hover":{backgroundColor:g.palette.grey[50],borderRadius:2}},children:[e.jsx(_,{variant:"subtitle3",sx:{textTransform:"capitalize"},children:t.name}),e.jsx(se,{onClick:T=>we(T,t),size:"small",children:e.jsx(pt,{})}),e.jsxs(be,{anchorEl:d,open:!!d,onClose:Q,sx:{"& .MuiPaper-root":{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:2,boxShadow:g.shadows[1]}},children:[e.jsxs(w,{onClick:()=>Ie(z),children:[e.jsx(ne,{children:e.jsx(ke,{fontSize:"small",style:{paddingRight:"4px",color:"#11365A"}})}),"Edit"]}),e.jsxs(w,{onClick:()=>xe(z.id,"type"),children:[e.jsx(ne,{children:e.jsx(nt,{fontSize:"small",style:{paddingRight:"4px",color:"red"}})}),"Delete"]})]})]},h))})]})})]})]}),e.jsx(gt,{add:$,isAdding:M,types:r,unitss:b,managers:D,onClose:pe,handleSubmission:t=>_e(t)}),e.jsx(Ze,{}),e.jsx(jt,{open:k,unit:q,onClose:Be,onUpdate:ze}),e.jsx(ft,{open:re,unitType:z,onClose:De,onUpdate:Re})]})})};export{Bt as default};
