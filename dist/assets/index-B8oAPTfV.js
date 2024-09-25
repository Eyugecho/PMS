import{M as Fe,N as S,az as we,l as me,r as o,O as Pe,j as e,_ as Ue,m as je,$ as Ie,I as ke,a0 as Be,a1 as qe,U as b,V as y,W as G,X as w,aA as fe,aB as be,aC as K,aD as D,a2 as se,d as Re,b as N,a3 as re,C as le,T as We,a4 as ze,Y as ae,Z as Ce,f as H,B as g,h as u,P as Ze,R as Ke,G as Z,a5 as De,ad as et,n as tt,ag as nt,q as st,v as rt,w as at,x as de,y as f,z as it,aE as ot,aF as dt,ah as lt,aw as ct,aj as ht,ax as ut}from"./index-DL-CLDEe.js";import{A as Ee}from"./Autocomplete-D8TvuXv2.js";import{I as pt}from"./IconInfoCircle-CPDE5ygq.js";import{S as gt,U as xt}from"./UploadFile-DdDix8XF.js";import"./Close-B1KvSMQT.js";import"./LinearProgress-DLE-4oj1.js";const mt=Fe().shape({name:S().required("Full name is required"),gender:S().required("Unit type is required"),email:S().email().required("Email is required"),id:S().required("Employee ID is required"),phone:S().required("Phone number is required"),type:S().required("Unit type is required"),unit:S().required("Unit is required"),job_position_id:S().required("The employee position is required"),start_date:we().required("Stat date is required")}),jt=({add:P,isAdding:L,onClose:B,handleSubmission:i})=>{var V,te;const _=me(),[R,W]=o.useState(!0),[T,U]=o.useState([]),[z,E]=o.useState([]),[Y,A]=o.useState([]),[v,O]=o.useState([]),[M,ce]=o.useState([]),[X,J]=o.useState([]),Q=(d,j)=>{ce(j);const C=j.find(l=>!M.some(p=>p.uuid===l.uuid)),s=M.find(l=>!j.some(p=>p.uuid===l.uuid));C&&J(l=>[...l,C.uuid]),s&&J(l=>l.filter(p=>p!==s.uuid))},r=Pe({initialValues:{name:"",gender:"",email:"",id:"",phone:"",type:null,unit:"",job_position_id:"",role:"",start_date:""},validationSchema:mt,onSubmit:d=>{i(d,X)}}),I=async()=>{W(!0);const d=await H(),j=u.api+u.types,C={Authorization:`Bearer ${d}`,accept:"application/json","Content-Type":"application/json"};fetch(j,{method:"GET",headers:C}).then(s=>s.json()).then(s=>{s.success?(W(!1),U(s.data)):W(!1)}).catch(s=>{W(!1),g(s.message)})},n=async()=>{const d=await H(),j=u.api+u.unitByTypes+r.values.type,C={Authorization:`Bearer ${d}`,accept:"application/json","Content-Type":"application/json"};fetch(j,{method:"GET",headers:C}).then(s=>s.json()).then(s=>{s.success&&(E(s.data.units),console.log(s.data.units))}).catch(s=>{g(s.message)})},ie=async()=>{const d=await H(),j=u.auth+u.roles,C={Authorization:`Bearer ${d}`,accept:"application/json","Content-Type":"application/json"};fetch(j,{method:"GET",headers:C}).then(s=>s.json()).then(s=>{s.success&&A(s.data)}).catch(s=>{g(s.message)})},ee=async()=>{const d=await H(),j=u.api+u.jobposition,C={Authorization:`Bearer ${d}`,accept:"application/json","Content-Type":"application/json"};fetch(j,{method:"GET",headers:C}).then(s=>s.json()).then(s=>{s.success&&Array.isArray(s.data.data)?(O(s.data.data),console.log(s.data.data)):O([])}).catch(s=>{g(s.message)})};return o.useEffect(()=>{r.values.type&&n()},[r.values.type]),o.useEffect(()=>{ie(),ee(),I()},[]),e.jsx(o.Fragment,{children:e.jsxs(Ue,{open:P,onClose:B,sx:{backdropFilter:"blur(10px)",backgroundColor:"rgba(255, 255, 255, 0.1)"},children:[e.jsxs(je,{sx:{position:"sticky",top:0,zIndex:2,width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:2,paddingY:.2,backgroundColor:_.palette.background.default},children:[e.jsx(Ie,{variant:"h3",color:_.palette.text.primary,children:"Add Employee"}),e.jsx(ke,{onClick:B,children:e.jsx(Be,{size:20})})]}),e.jsxs("form",{noValidate:!0,onSubmit:r.handleSubmit,children:[e.jsxs(qe,{children:[e.jsxs(b,{fullWidth:!0,error:r.touched.id&&!!r.errors.id,sx:{marginTop:2.4},children:[e.jsx(y,{htmlFor:"id",children:"Employee ID"}),e.jsx(G,{id:"id",name:"id",label:"User Name",value:r.values.id.username,onChange:r.handleChange,fullWidth:!0}),r.touched.id&&r.errors.id&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:r.errors.id})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.name&&!!r.errors.name,sx:{marginTop:2.4},children:[e.jsx(y,{htmlFor:"name",children:"Full name"}),e.jsx(G,{id:"name",name:"name",label:"Full name",value:r.values.name,onChange:r.handleChange,fullWidth:!0}),r.touched.name&&r.errors.name&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:r.errors.name})]}),e.jsxs(b,{error:r.touched.gender&&!!r.errors.gender,sx:{marginLeft:1.4,marginTop:2.4},children:[e.jsx(fe,{id:"gender",children:"Gender"}),e.jsxs(be,{"aria-labelledby":"gender",name:"gender",value:r.values.gender,onChange:r.handleChange,sx:{display:"flex",flexDirection:"row",justifyContent:"space-around"},children:[e.jsx(K,{value:"Male",control:e.jsx(D,{}),label:"Male"}),e.jsx(K,{value:"Female",control:e.jsx(D,{}),label:"Female"})]})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.email&&!!r.errors.email,sx:{marginTop:2.4},children:[e.jsx(y,{htmlFor:"email",children:"Email address "}),e.jsx(G,{id:"email",name:"email",label:"Email address",value:r.values.email,onChange:r.handleChange,fullWidth:!0}),r.touched.email&&r.errors.email&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:r.errors.email})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.phone&&!!r.errors.phone,sx:{marginTop:3},children:[e.jsx(y,{htmlFor:"phone",children:"Phone number"}),e.jsx(G,{id:"phone",name:"phone",label:"Phone number",value:r.values.phone,onChange:r.handleChange,fullWidth:!0}),r.touched.phone&&r.errors.phone&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-phone",children:r.errors.phone})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.type&&!!r.errors.type,sx:{marginTop:3},children:[e.jsx(y,{htmlfor:"type",children:"Unit type"}),e.jsx(se,{id:"type",name:"type",label:"Unit type",value:r.values.type,onChange:r.handleChange,children:R?e.jsx(Re,{size:20}):T.length==0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Unit type is not found"}):T==null?void 0:T.map((d,j)=>e.jsx(re,{value:d.id,children:d.name},j))}),r.touched.type&&r.errors.type&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-type",children:r.errors.type})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.unit&&!!r.errors.unit,sx:{marginTop:3},disabled:((V=r==null?void 0:r.values)==null?void 0:V.type)==null,children:[e.jsx(y,{htmlFor:"unit",children:"Unit"}),e.jsx(se,{id:"unit",name:"unit",label:"Unit",value:r.values.unit,onChange:r.handleChange,children:z.length===0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Unit not found"}):z==null?void 0:z.map((d,j)=>e.jsx(re,{value:d.id,children:d.name},j))})]}),e.jsx(Ee,{id:"roles",multiple:!0,options:Y||[],getOptionLabel:d=>d.name||"",value:M,onChange:Q,renderTags:(d,j)=>d.map((C,s)=>e.jsx(le,{className:"employee-chips",label:C.name||"",...j({index:s})},s)),fullWidth:!0,renderInput:d=>e.jsx(We,{...d,label:"Select Roles",variant:"outlined"}),sx:{marginTop:4}}),e.jsxs(N,{variant:"caption",sx:{display:"flex",alignItems:"center",paddingX:1,marginTop:.8},children:[e.jsx(pt,{size:14,style:{paddingRight:2}})," The default role for employee is"," ",e.jsx("b",{style:{paddingLeft:3},children:"Employee"})]}),e.jsxs(b,{fullWidth:!0,error:r.touched.job_position_id&&!!r.errors.job_position_id,sx:{marginTop:3},disabled:((te=r==null?void 0:r.values)==null?void 0:te.job_position_id)==null,children:[e.jsx(y,{id:"position-label",children:"Position"}),e.jsx(se,{id:"position",name:"job_position_id",label:"Position",value:r.values.job_position_id,onChange:r.handleChange,labelId:"position-label",children:v.length===0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Position not found"}):v.map(d=>e.jsx(re,{value:d.id,children:d.name},d.id))}),r.touched.job_position_id&&r.errors.job_position_id?e.jsx(w,{children:r.errors.job_position_id}):null]}),e.jsxs(b,{fullWidth:!0,error:r.touched.phone&&!!r.errors.phone,sx:{marginTop:3},children:[e.jsx(y,{htmlFor:"start_date",shrink:!0,children:"Start Date"}),e.jsx(G,{id:"start_date",name:"start_date",label:"Start Date",type:"date",value:r.values.start_date,onChange:r.handleChange,fullWidth:!0}),r.touched.start_date&&r.errors.start_date&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-start_date",children:r.errors.start_date})]})]}),e.jsxs(ze,{sx:{paddingX:2},children:[e.jsx(ae,{onClick:B,sx:{marginLeft:10},children:"Cancel"}),e.jsx(ae,{type:"submit",variant:"contained",sx:{paddingX:6,boxShadow:0},disabled:L,children:L?e.jsx(Ce,{size:18,sx:{color:"white"}}):"Done"})]})]})]})})},$e=({handleClose:P,handleApplying:L})=>{const B=me(),[i,_]=Ke.useState({gender:""}),R=T=>{const{name:U,value:z}=T.target;_(E=>({...E,[U]:z}))},W=()=>{L(i)};return e.jsxs(je,{sx:{minHeight:280,p:.4},children:[e.jsxs(b,{component:"fieldset",sx:{marginTop:2,paddingX:2},onClick:P,children:[e.jsx(fe,{component:"legend",sx:{color:B.palette.text.primary},children:"Gender"}),e.jsxs(be,{"aria-label":"gender",name:"gender",value:i.gender,onChange:R,sx:{display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(K,{value:"",control:e.jsx(D,{}),label:"All"}),e.jsx(K,{value:"male",control:e.jsx(D,{}),label:"Males"}),e.jsx(K,{value:"female",control:e.jsx(D,{}),label:"Females"})]})]}),e.jsxs(Z,{container:!0,sx:{position:"absolute",bottom:2,padding:1,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(Z,{item:!0,xs:4.6,children:e.jsx(ae,{variant:"text",role:"button",fullWidth:!0,children:"Reset"})}),e.jsx(Z,{item:!0,xs:6.4,sx:{marginRight:1},children:e.jsx(ae,{variant:"contained",role:"button",fullWidth:!0,onClick:()=>W(),children:"Apply"})})]})]})};$e.propTypes={handleClose:Ze.func};const ft=Fe().shape({name:S().required("Full name is required"),gender:S().required("Unit type is required"),email:S().email().required("Email is required"),username:S().required("Username is required"),type:S().required("Unit type is required"),phone:S().required("Phone number is required"),unit:S().required("Unit is required"),job_position_id:S().required("The employee position is required"),start_date:we().required("Employee start date is required")}),bt=({update:P,isUpdating:L,onClose:B,EmployeeData:i,handleSubmission:_})=>{var j,C;const R=me(),[W,T]=o.useState(!0),[U,z]=o.useState([]),[E,Y]=o.useState([]),[A,v]=o.useState([]),[O,M]=o.useState([]),[ce,X]=o.useState([]),[J,Q]=o.useState([]),r=(s,l)=>{M(l);const p=l.find(k=>!O.some($=>$.uuid===k.uuid)),a=O.find(k=>!l.some($=>$.uuid===k.uuid));p&&X(k=>[...k,p.uuid]),a&&X(k=>k.filter($=>$!==a.uuid))},I=()=>O.map(s=>s.uuid),n=Pe({initialValues:{name:"",gender:"",email:"",username:"",phone:"",type:null,unit:"",job_position_id:"",role:"",start_date:""},validationSchema:ft,onSubmit:s=>{_(s,I())}}),ie=async()=>{T(!0);const s=await H(),l=u.api+u.types,p={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"};fetch(l,{method:"GET",headers:p}).then(a=>a.json()).then(a=>{a.success?(T(!1),z(a.data)):T(!1)}).catch(a=>{T(!1),g(a.message)})},ee=async()=>{const s=await H(),l=u.api+u.unitByTypes+n.values.type,p={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"};fetch(l,{method:"GET",headers:p}).then(a=>a.json()).then(a=>{a.success&&Y(a.data.units)}).catch(a=>{g(a.message)})},V=async()=>{const s=localStorage.getItem("token"),l=u.auth+u.roles,p={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"};fetch(l,{method:"GET",headers:p}).then(a=>a.json()).then(a=>{a.success?v(a.data):g.error(a.data.message)}).catch(a=>{g(a.message)})},te=async()=>{const s=await H(),l=u.api+u.jobposition,p={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"};fetch(l,{method:"GET",headers:p}).then(a=>a.json()).then(a=>{a.success&&Array.isArray(a.data.data)?Q(a.data.data):Q([])}).catch(a=>{g(a.message)})},d=()=>{var s,l,p,a,k,$,he,ue,pe,ge,oe;n.setValues({...n.values,name:(s=i==null?void 0:i.user)==null?void 0:s.name,gender:i==null?void 0:i.gender,email:(l=i==null?void 0:i.user)==null?void 0:l.email,username:(p=i==null?void 0:i.user)==null?void 0:p.username,phone:(a=i==null?void 0:i.user)==null?void 0:a.phone,type:($=(k=i==null?void 0:i.unit)==null?void 0:k.unit)==null?void 0:$.unit_type_id,unit:(ue=(he=i==null?void 0:i.unit)==null?void 0:he.unit)==null?void 0:ue.id,job_position_id:i==null?void 0:i.job_position_id,start_date:(ge=(pe=i==null?void 0:i.unit)==null?void 0:pe.started_date)==null?void 0:ge.split(" ")[0]}),M(((oe=i==null?void 0:i.user)==null?void 0:oe.roles)||[])};return o.useEffect(()=>{n.values.type&&ee()},[n.values.type]),o.useEffect(()=>(V(),d(),ie(),te(),()=>{}),[P]),e.jsx(o.Fragment,{children:e.jsxs(Ue,{open:P,onClose:B,children:[e.jsxs(je,{sx:{position:"sticky",top:0,zIndex:2,width:"100%",backgroundColor:R.palette.background.default,display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:2,paddingY:.6},children:[e.jsx(Ie,{variant:"h4",color:R.palette.text.primary,children:"Update Employee"}),e.jsx(ke,{onClick:B,children:e.jsx(Be,{size:20,color:R.palette.text.primary})})]}),e.jsxs("form",{noValidate:!0,onSubmit:n.handleSubmit,children:[e.jsxs(qe,{children:[e.jsxs(b,{fullWidth:!0,error:n.touched.name&&!!n.errors.name,sx:{marginTop:1},children:[e.jsx(y,{htmlFor:"name",children:"Full name"}),e.jsx(G,{id:"name",name:"name",label:"Full name",value:n.values.name,onChange:n.handleChange,fullWidth:!0}),n.touched.name&&n.errors.name&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:n.errors.name})]}),e.jsxs(b,{error:n.touched.gender&&!!n.errors.gender,sx:{marginLeft:1.4,marginTop:2.4},children:[e.jsx(fe,{id:"gender",children:"Gender"}),e.jsxs(be,{"aria-labelledby":"gender",name:"gender",value:n.values.gender,onChange:n.handleChange,sx:{display:"flex",flexDirection:"row",justifyContent:"space-around"},children:[e.jsx(K,{value:"Male",control:e.jsx(D,{}),label:"Male"}),e.jsx(K,{value:"Female",control:e.jsx(D,{}),label:"Female"})]})]}),e.jsxs(b,{fullWidth:!0,error:n.touched.email&&!!n.errors.email,sx:{marginTop:2.4},children:[e.jsx(y,{htmlFor:"email",children:"Email address "}),e.jsx(G,{id:"email",name:"email",label:"Email address",value:n.values.email,onChange:n.handleChange,fullWidth:!0}),n.touched.email&&n.errors.email&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:n.errors.email})]}),e.jsxs(b,{fullWidth:!0,error:n.touched.username&&!!n.errors.username,sx:{marginTop:2.4},children:[e.jsx(y,{htmlFor:"username",children:"User Name "}),e.jsx(G,{id:"username",name:"username",label:"User Name",value:n.values.username,onChange:n.handleChange,fullWidth:!0}),n.touched.username&&n.errors.username&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-name",children:n.errors.username})]}),e.jsxs(b,{fullWidth:!0,error:n.touched.phone&&!!n.errors.phone,sx:{marginTop:3},children:[e.jsx(y,{htmlFor:"phone",children:"Phone number"}),e.jsx(G,{id:"phone",name:"phone",label:"Phone number",value:n.values.phone,onChange:n.handleChange,fullWidth:!0}),n.touched.phone&&n.errors.phone&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-phone",children:n.errors.phone})]}),e.jsxs(b,{fullWidth:!0,error:n.touched.type&&!!n.errors.type,sx:{marginTop:3},children:[e.jsx(y,{htmlfor:"type",children:"Unit type"}),e.jsx(se,{id:"type",name:"type",label:"Unit type",value:n.values.type,onChange:n.handleChange,children:W?e.jsx(Re,{size:20}):U.length==0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Unit type is not found"}):U==null?void 0:U.map((s,l)=>e.jsx(re,{value:s.id,children:s.name},l))}),n.touched.type&&n.errors.type&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-type",children:n.errors.type})]}),e.jsxs(b,{fullWidth:!0,error:n.touched.unit&&!!n.errors.unit,sx:{marginTop:3},disabled:((j=n==null?void 0:n.values)==null?void 0:j.type)==null,children:[e.jsx(y,{htmlFor:"unit",children:"Unit"}),e.jsx(se,{id:"unit",name:"unit",label:"Unit",value:n.values.unit,onChange:n.handleChange,children:E.length===0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Unit not found"}):E==null?void 0:E.map((s,l)=>e.jsx(re,{value:s.id,children:s.name},l))})]}),e.jsx(Ee,{id:"roles",multiple:!0,options:A||[],getOptionLabel:s=>(s==null?void 0:s.name)||"",value:O,onChange:r,renderTags:(s,l)=>s.map((p,a)=>e.jsx(le,{className:"roles-chip",label:(p==null?void 0:p.name)||"",...l({index:a})})),fullWidth:!0,renderInput:s=>e.jsx(We,{...s,label:"Select Roles",variant:"outlined"}),sx:{marginTop:4}}),e.jsxs(b,{fullWidth:!0,error:n.touched.job_position_id&&!!n.errors.job_position_id,sx:{marginTop:3},disabled:((C=n==null?void 0:n.values)==null?void 0:C.job_position_id)==null,children:[e.jsx(y,{id:"position-label",children:"Position"}),e.jsx(se,{id:"position",name:"job_position_id",label:"Position",value:n.values.job_position_id,onChange:n.handleChange,labelId:"position-label",children:J.length===0?e.jsx(N,{variant:"body2",sx:{padding:1},children:"Position not found"}):J.map(s=>e.jsx(re,{value:s.id,children:s.name},s.id))}),n.touched.job_position_id&&n.errors.job_position_id?e.jsx(w,{children:n.errors.job_position_id}):null]}),e.jsxs(b,{fullWidth:!0,error:n.touched.phone&&!!n.errors.phone,sx:{marginTop:3},children:[e.jsx(y,{htmlFor:"start_date",shrink:!0,children:"Start Date"}),e.jsx(G,{id:"start_date",name:"start_date",label:"Start Date",type:"date",value:n.values.start_date,onChange:n.handleChange,fullWidth:!0}),n.touched.start_date&&n.errors.start_date&&e.jsx(w,{error:!0,id:"standard-weight-helper-text-start_date",children:n.errors.start_date})]})]}),e.jsxs(ze,{sx:{paddingX:2},children:[e.jsx(ae,{onClick:B,sx:{marginLeft:10},children:"Cancel"}),e.jsx(ae,{type:"submit",variant:"contained",sx:{paddingX:6,boxShadow:0},disabled:L,children:L?e.jsx(Ce,{size:18,sx:{color:"white"}}):"Done"})]})]})]})})},Ct=["Add Employee","Import From Excel"],wt=()=>{var Te;const P=me(),L=De(),[B,i]=o.useState(!1),[_,R]=o.useState(null),[W,T]=o.useState(!1),[U,z]=o.useState([]),[E,Y]=o.useState(!1),[A,v]=o.useState({page:0,perPage:10,last_page:0,total:0}),[O,M]=o.useState(!1),[ce,X]=o.useState(!1),[J,Q]=o.useState(!1),[r,I]=o.useState(!1),[n,ie]=o.useState(""),[ee,V]=o.useState(!1),[te,d]=o.useState(!1),[j,C]=o.useState(!1),[s,l]=o.useState(0),p=et(),a=p.some(t=>t.permissions.some(c=>c.name==="create:employee")),k=p.some(t=>t.permissions.some(c=>c.name==="update:employee")),$=p.some(t=>t.permissions.some(c=>c.name==="delete:employee")),he=()=>{C(!0)},ue=()=>{C(!1)},pe=async t=>{const c=localStorage.getItem("token"),F=u.api+u.employeeExcel,h={Authorization:`Bearer ${c}`,"Content-Type":"multipart/form-data"},q=new FormData;q.append("file",t);try{const x=await ut.post(F,q,{headers:h,onUploadProgress:m=>{const xe=Math.round(m.loaded*100/m.total);l(xe)}});x.success?g.success(x.data.data.message):g.success(x.data.data.message)}catch(x){g.error(x.message)}},ge=t=>{M(!0)},oe=()=>{M(!1)},Ge=t=>{R(t),Q(!0)},_e=()=>{Q(!1)},Ne=t=>{const c=t.target.value;ie(c),v({...A,page:0})},Le=t=>{t===0?ge():t===1?he():alert("We will be implement importing from odoo")},ve=(t,c)=>{X(!0);const F=localStorage.getItem("token"),h=u.api+u.employees,q={Authorization:`Bearer ${F}`,accept:"application/json","Content-Type":"application/json"},x={name:t==null?void 0:t.name,gender:t==null?void 0:t.gender,email:t==null?void 0:t.email,id:t==null?void 0:t.id,phone:t==null?void 0:t.phone,job_position_id:t==null?void 0:t.job_position_id,job_position:t==null?void 0:t.job_position,unit_id:t==null?void 0:t.unit,roles:c,started_date:t==null?void 0:t.start_date,password:"password",password_confirmation:"password"};fetch(h,{method:"POST",headers:q,body:JSON.stringify(x)}).then(m=>m.json()).then(m=>{m.success?(X(!1),oe(),g.success(m.data.message),ne()):g.error(m.data.message)}).catch(m=>{g.error(m.message)}).finally(()=>{X(!1)})},Oe=(t,c)=>{I(!0);const F=localStorage.getItem("token");if(!F){g.error("Authorization token is missing."),I(!1);return}const h=u.api+u.employees+`/${(_==null?void 0:_.id)||""}`,q={Authorization:`Bearer ${F}`,accept:"application/json","Content-Type":"application/json"},x={name:t==null?void 0:t.name,gender:t==null?void 0:t.gender,email:t==null?void 0:t.email,id:t==null?void 0:t.id,phone:t==null?void 0:t.phone,job_position_id:t==null?void 0:t.job_position_id,job_position:t==null?void 0:t.job_position,unit_id:t==null?void 0:t.unit,roles:c,started_date:t==null?void 0:t.start_date};console.log(x),fetch(h,{method:"PATCH",headers:q,body:JSON.stringify(x)}).then(m=>m.json()).then(m=>{m.success?(I(!1),_e(),ne()):(I(!1),g.error(m.data.message))}).catch(m=>{I(!1),g.error(m.message)})},Me=async t=>{I(!0);const c=await H();if(!c){g.error("Authorization token is missing."),I(!1);return}const F=u.api+u.employeeEligiblity+(t==null?void 0:t.id),h={Authorization:`Bearer ${c}`,accept:"application/json","Content-Type":"application/json"},q={eligible:t==null?void 0:t.is_eligible};fetch(F,{method:"POST",headers:h,body:JSON.stringify(q)}).then(x=>x.json()).then(x=>{var m;x.success?(g.success((m=x==null?void 0:x.data)==null?void 0:m.message),ne()):g.error(x.data.message)}).catch(x=>{g.error(x.message)}).finally(()=>{I(!1)})},Ve=t=>{R(t),V(!0)},Xe=()=>{d(!0);const t=localStorage.getItem("token"),c=u.api+u.employees+"/"+_.id,F={Authorization:"Bearer"+t,accept:"application/json","Content-Type":"application/json"};fetch(c,{method:"DELETE",headers:F}).then(h=>h.json()).then(h=>{h.success?(d(!1),V(!1),g.success(h.data.message),ne()):(d(!1),g.error(h.data.message))}).catch(h=>{d(!1),g.error(h.message)})},He=(t,c)=>{v({...A,page:c})},Ye=t=>{v({...A,perPage:t.target.value}),setPage(0)},ne=()=>{T(!0);const t=localStorage.getItem("token"),c=u.api+u.employees+`?page=${A.page}&per_page=${A.perPage}&search=${n}`,F={Authorization:`Bearer ${t}`,accept:"application/json","Content-Type":"application/json"};fetch(c,{method:"GET",headers:F}).then(h=>h.json()).then(h=>{h.success?(z(h.data.data),v({...A,last_page:h.data.last_page,total:h.data.total}),T(!1),Y(!1)):(T(!1),Y(!1),g.warning(h.data.message))}).catch(h=>{g.warning(h.message),Y(!0),T(!1)})};return o.useEffect(()=>{const t=setTimeout(()=>{ne()},800);return()=>{clearTimeout(t)}},[n]),o.useEffect(()=>(B?ne():i(!0),()=>{}),[A.page,A.perPage]),e.jsxs(tt,{title:"Employees",children:[e.jsx(Z,{container:!0,padding:2,children:e.jsxs(Z,{item:!0,xs:12,children:[e.jsx(Z,{container:!0,children:e.jsxs(Z,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingY:3},children:[e.jsx(nt,{title:"Filter Employees",value:n,onChange:t=>Ne(t),filter:!1,children:e.jsx($e,{})}),a&&e.jsx(gt,{options:Ct,handleSelection:t=>Le(t)})]})}),e.jsx(st,{sx:{minHeight:"66dvh",border:.4,borderColor:P.palette.divider,borderRadius:2},children:e.jsxs(rt,{sx:{minWidth:650},"aria-label":"Employes table",children:[e.jsx(at,{children:e.jsxs(de,{children:[e.jsx(f,{children:"Name"}),e.jsx(f,{children:"Gender"}),e.jsx(f,{children:"Email"}),e.jsx(f,{children:"Employee Id"}),e.jsx(f,{children:"Position"}),e.jsx(f,{children:"Role"}),e.jsx(f,{children:"Starting date"}),e.jsx(f,{children:"Eligiblity"}),e.jsx(f,{children:"Actions"})]})}),e.jsx(it,{children:W?e.jsx(de,{sx:{display:"flex",alignItems:"center",justifyContent:"center",padding:4},children:e.jsx(f,{colSpan:7,sx:{border:0,alignItems:"center",justifyContent:"center"},children:e.jsx(Ce,{size:20})})}):E?e.jsx(de,{sx:{padding:4},children:e.jsx(f,{colSpan:7,sx:{border:0},children:e.jsx(N,{variant:"body2",children:"There is error fetching the Employees"})})}):U.length===0?e.jsx(de,{sx:{padding:4},children:e.jsx(f,{colSpan:7,sx:{border:0},children:e.jsx(N,{variant:"body2",children:"Employee not found"})})}):U==null?void 0:U.map((t,c)=>{var F,h,q,x,m,xe,Se,ye,Ae;return e.jsxs(de,{sx:{backgroundColor:_==c?P.palette.grey[100]:P.palette.background.default,":hover":{backgroundColor:P.palette.grey[100],color:P.palette.background.default,cursor:"pointer",borderRadius:2}},children:[e.jsx(f,{sx:{display:"flex",alignItems:"center",border:0},children:e.jsx(N,{variant:"subtitle1",color:P.palette.text.primary,children:(F=t==null?void 0:t.user)==null?void 0:F.name})}),e.jsx(f,{sx:{border:0},children:t!=null&&t.gender?t==null?void 0:t.gender:"N/A"}),e.jsx(f,{sx:{border:0},children:(h=t==null?void 0:t.user)==null?void 0:h.email}),e.jsx(f,{sx:{border:0},children:(q=t==null?void 0:t.user)==null?void 0:q.username}),e.jsx(f,{sx:{border:0},children:(x=t==null?void 0:t.job_position)!=null&&x.name?(m=t==null?void 0:t.job_position)==null?void 0:m.name:"N/A"}),e.jsx(f,{sx:{border:0},children:((xe=t==null?void 0:t.user)==null?void 0:xe.roles.length)>0?(ye=(Se=t==null?void 0:t.user)==null?void 0:Se.roles)==null?void 0:ye.map((Je,Qe)=>e.jsx(je,{children:e.jsx(le,{label:Je.name,sx:{margin:.4}})},Qe)):"N/A"}),e.jsx(f,{sx:{border:0},children:ot((Ae=t==null?void 0:t.unit)==null?void 0:Ae.started_date)}),e.jsx(f,{sx:{border:0},children:t!=null&&t.is_eligible?e.jsx(le,{label:"Eligible",sx:{backgroundColor:"#d8edd9",color:"green"}}):e.jsx(le,{label:"Not Eligible",sx:{backgroundColor:"#f7e4e4",color:"red"}})}),e.jsx(f,{sx:{border:0},children:e.jsx(dt,{onView:()=>L("/employees/view",{state:t}),onEdit:k?()=>Ge(t):null,eligiblity:t!=null&&t.is_eligible?"Not Eligible":"Eligible",onEligible:()=>Me(t),onDelete:$?()=>Ve(t):null})})]},t.id)})})]})}),e.jsx(lt,{component:"div",rowsPerPageOptions:[10,25,50,100],count:A.total,rowsPerPage:A.perPage,page:A.page,onPageChange:He,onRowsPerPageChange:Ye})]})}),e.jsx(jt,{add:O,isAdding:ce,onClose:oe,handleSubmission:(t,c)=>ve(t,c)}),_&&e.jsx(bt,{update:J,isUpdating:r,EmployeeData:_,onClose:()=>_e(),handleSubmission:(t,c)=>Oe(t,c)}),ee&&e.jsx(ct,{type:"Delete",open:ee,title:"Removing Employee",description:"Are you sure you want to remove "+((Te=_==null?void 0:_.user)==null?void 0:Te.name),onNo:()=>V(!1),onYes:()=>Xe(),deleting:te,handleClose:()=>V(!1)}),e.jsx(xt,{open:j,onClose:ue,onUpload:pe,uploadProgress:s,onRemove:()=>l(0)}),e.jsx(ht,{})]})};export{wt as default};
