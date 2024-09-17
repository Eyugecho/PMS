import{o as L,Y as R,j as e,R as U,a8 as d,aM as He,P as c,q as Je,a4 as Y,p as n,a0 as i,v as Xe,a1 as K,a3 as Pe,r as u,a9 as Ve,as as Se,W as Ze,at as De,a2 as v,a5 as et,a6 as G}from"./index-CB3M8AEN.js";import{g as tt,M as rt,f as st}from"./index-C_-DKd_R.js";import{S as nt}from"./search-BIP7CrFZ.js";import{I as it}from"./IconInfoCircle-BBJgs9pe.js";import{A as _e}from"./ActivityIndicator-DCoQxF--.js";import{E as Ie}from"./ErrorPrompt-fWlGKA_A.js";import{F as Ae}from"./index-DjuwT8zP.js";import{S as Me}from"./SelectorMenu-BsQ72mfU.js";import{D as F}from"./DrogaButton-BeZAw_Sg.js";import{A as w}from"./workflow-CsLwfZqg.js";import{P as at}from"./PlanCard-ByzLE8L8.js";import{D as ot}from"./DrogaFormModal-D1R9lXL_.js";import{D as lt}from"./DrogaDonutChart-Cs_8_W2m.js";import{T as ct}from"./TablePagination-DbGtClqp.js";import"./error-DW4k7GIP.js";import"./DotMenu-BozKlmcu.js";import"./IconDotsVertical-Me1WCLyu.js";import"./IconTrash-BvNCbRAX.js";import"./DialogTitle-By-U4odQ.js";import"./Box-DxZ2QpnW.js";import"./KeyboardArrowRight-4XYPRTPY.js";import"./LastPage-Z-YOeIDc.js";import"./TableCell-HbngNqTB.js";var Ee=L("circle-check-filled","IconCircleCheckFilled",[["path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z",fill:"currentColor",key:"svg-0",strokeWidth:"0"}]]),pt=L("circle-x","IconCircleX",[["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",key:"svg-0"}],["path",{d:"M10 10l4 4m0 -4l-4 4",key:"svg-1"}]]),dt=L("circle","IconCircle",[["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",key:"svg-0"}]]),mt=L("clipboard-list","IconClipboardList",[["path",{d:"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",key:"svg-0"}],["path",{d:"M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z",key:"svg-1"}],["path",{d:"M9 12l.01 0",key:"svg-2"}],["path",{d:"M13 12l2 0",key:"svg-3"}],["path",{d:"M9 16l.01 0",key:"svg-4"}],["path",{d:"M13 16l2 0",key:"svg-5"}]]);const xt=({numberOfSteps:s,status:h})=>{R();const a=Array.from({length:s-1},(S,T)=>e.jsxs(U.Fragment,{children:[e.jsx(Ee,{size:"1.1rem",stroke:"2",style:{color:"green"}}),e.jsx(d,{sx:{width:12,height:2,backgroundColor:"green"}})]},T)),o=h==="approved"?e.jsx(Ee,{size:"1.1rem",stroke:"2",style:{color:"green"}}):h==="rejected"?e.jsx(pt,{size:"1.1rem",stroke:"2",style:{color:"red"}}):h==="amended"?e.jsx(it,{size:"1.1rem",stroke:"2",style:{color:"orange"}}):e.jsx(dt,{size:"1.1rem",stroke:"2",style:{color:"gray"}});return e.jsx(d,{sx:{marginTop:1},children:e.jsxs(He,{direction:"row",alignItems:"center",children:[a,o]})})},ze=({type:s,status:h,title:a,description:o,step:S,date:T,onPress:P})=>{const j=R(),A=Je(j.breakpoints.down("sm"));return e.jsxs(Y,{sx:{margin:1,width:A?"98%":"47.5%",":hover":{transform:"scale(1.02)",transition:"all 0.2s ease-in-out",cursor:"pointer"}},onPress:P,children:[e.jsxs(d,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:1.6},children:[e.jsx(d,{sx:{borderRadius:12,backgroundColor:j.palette.grey[50],px:1.4,py:.4},children:e.jsx(n,{variant:"body2",color:j.palette.text.primary,sx:{textTransform:"capitalize"},children:s})}),e.jsx(n,{variant:"subtitle2",sx:{textTransform:"capitalize",color:tt(h)},children:h})]}),e.jsx(n,{variant:"h3",color:j.palette.text.primary,children:a}),e.jsx(n,{variant:"body2",color:j.palette.text.primary,marginTop:.6,children:o}),e.jsxs(d,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:3},children:[e.jsx(xt,{numberOfSteps:S,status:h}),e.jsx(n,{variant:"subtitle2",children:T})]})]})};ze.propTypes={type:c.string,status:c.string,title:c.string,description:c.string,step:c.number,date:c.string,onPress:c.func};c.bool,c.string,c.node,c.func,c.func,c.func,c.bool;const q=({name:s,position:h})=>{const a=R();return e.jsxs(d,{children:[e.jsx(n,{variant:"subtitle1",color:a.palette.text.primary,children:"Employee"}),s&&e.jsxs(Y,{sx:{p:1.4,backgroundColor:a.palette.background.default},children:[e.jsx(n,{variant:"h4",color:a.palette.text.primary,children:s}),e.jsx(n,{variant:"body2",color:a.palette.text.primary,children:h})]})]})};q.propTypes={name:c.string,position:c.string};const Q=({name:s,managerName:h,position:a})=>{const o=R();return e.jsxs(d,{mt:2,children:[e.jsx(n,{variant:"subtitle1",color:o.palette.text.primary,children:"Unit"}),e.jsxs(Y,{sx:{border:0,p:0},children:[s&&e.jsx(n,{variant:"h3",color:o.palette.text.primary,children:s}),h&&e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"subtitle2",marginTop:1,children:"Manager"}),e.jsx(n,{variant:"h4",color:o.palette.text.primary,children:h}),e.jsx(n,{variant:"body2",color:o.palette.text.primary,children:a})]})]})]})};Q.propTypes={name:c.string,managerName:c.string,position:c.string};const Fe=({evaluation:s,onPress:h,sx:a})=>{var S,T,P,j,A,W,$,M,O,y,_,E,C,N,m;const o=R();return e.jsxs(Y,{onPress:h,sx:{...a},children:[e.jsx(d,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-start"},children:e.jsx(n,{variant:"body1",children:"KPI Name"})}),e.jsx(n,{variant:"h3",color:o.palette.text.primary,sx:{marginTop:.6},children:(T=(S=s==null?void 0:s.kpi_tracker)==null?void 0:S.kpi)==null?void 0:T.name}),e.jsxs(i,{container:!0,sx:{paddingTop:2},children:[e.jsxs(i,{item:!0,xs:6,sx:{paddingY:2.4},children:[e.jsxs(d,{children:[e.jsx(n,{variant:"body1",children:"Perspective Type"}),e.jsx(n,{variant:"h4",children:(A=(j=(P=s==null?void 0:s.kpi_tracker)==null?void 0:P.kpi)==null?void 0:j.perspective_type)==null?void 0:A.name})]}),e.jsxs(d,{sx:{paddingTop:2},children:[e.jsx(n,{variant:"body1",children:"Measuring Unit"}),e.jsx(n,{variant:"h4",children:(M=($=(W=s==null?void 0:s.kpi_tracker)==null?void 0:W.kpi)==null?void 0:$.measuring_unit)==null?void 0:M.name})]})]}),e.jsxs(i,{item:!0,xs:6,sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:2},children:[e.jsx(lt,{value:(O=s==null?void 0:s.kpi_tracker)==null?void 0:O.weight}),e.jsx(n,{variant:"subtitle1",color:o.palette.text.primary,sx:{marginTop:2},children:"Weight"})]})]}),e.jsxs(i,{container:!0,marginTop:1,children:[e.jsx(i,{item:!0,xs:6,children:e.jsxs(d,{children:[e.jsx(n,{variant:"body1",color:o.palette.text.primary,children:"Frequency"}),e.jsx(n,{variant:"h4",children:(_=(y=s==null?void 0:s.period)==null?void 0:y.frequency)==null?void 0:_.name})]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(Xe,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:1.6,backgroundColor:o.palette.grey[50]},children:[e.jsx(n,{variant:"subtitle1",color:o.palette.text.primary,children:"Target"}),e.jsxs(n,{variant:"h4",children:[(E=s==null?void 0:s.kpi_tracker)==null?void 0:E.total_target,rt((m=(N=(C=s==null?void 0:s.kpi_tracker)==null?void 0:C.kpi)==null?void 0:N.measuring_unit)==null?void 0:m.name)]})]})})]}),e.jsxs(i,{container:!0,sx:{display:"flex",flexDirection:"column",marginTop:3,borderTop:.8,borderColor:o.palette.divider,padding:.8,paddingTop:2},spacing:K,children:[e.jsx(n,{variant:"h4",color:o.palette.text.primary,children:"Quarter 1"}),e.jsxs(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center"},children:[e.jsx(n,{variant:"subtitle1",color:o.palette.text.primary,children:"Targeted"}),e.jsx(d,{sx:{padding:1,m:1,backgroundColor:o.palette.grey[50],borderRadius:2},children:e.jsx(n,{variant:"h4",color:o.palette.text.primary,children:s==null?void 0:s.target})})]}),e.jsxs(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center"},children:[e.jsx(n,{variant:"subtitle1",color:o.palette.text.primary,children:"Evaluated"}),e.jsx(d,{sx:{padding:1,m:1,backgroundColor:o.palette.grey[50],borderRadius:2},children:e.jsx(n,{variant:"h4",color:o.palette.text.primary,children:s==null?void 0:s.actual_value})})]})]})]})};Fe.propTypes={evaluation:c.object,onPress:c.func,sx:c.object};const ht=[{label:"All Status",value:""},{label:"Pending",value:"pending"},{label:"Approved",value:"approved"},{label:"Rejected",value:"rejected"},{label:"Amended",value:"amended"}],Bt=()=>{var D,ee,te,re,se,ne,ie,ae,oe,le,ce,pe,de,me,xe,he,ge,ue,je,ye,fe,ke,be,ve,Te,Ce,we;const s=R(),h=Pe(r=>r.customization.selectedFiscalYear),a=Pe(r=>r.user.user),[o,S]=u.useState(!1),[T,P]=u.useState(!0),[j,A]=u.useState([]),[W,$]=u.useState(!1),[M,O]=u.useState(""),[y,_]=u.useState({page:0,per_page:10,total:0}),[E]=u.useState([{label:"All Types",value:""}]),[C,N]=u.useState({type:"",status:"",sort:!1}),[m,Re]=u.useState(),H=r=>{const{value:l,name:p}=r.target;N({...C,[p]:l})},[We,J]=u.useState(!1),[t,X]=u.useState([]),[f,B]=u.useState({type:"",comment:"",openModal:!1,submitting:!1}),z=r=>{B({...f,type:r,openModal:!0})},$e=r=>{const l=r.target.value;B({...f,comment:l})},V=()=>{B({...f,openModal:!1})},Be=r=>{var l;if(r.preventDefault(),m&&a&&f.type){B({...f,submitting:!0});const p=w.api+w.taskAction,k={Authorization:`${w.API_KEY}`,accept:"application/json","Content-Type":"application/json"},b=[];(l=a==null?void 0:a.roles)==null||l.forEach(g=>b.push({role_id:g.uuid,role_name:g.name}));const x={result:f.type,comments:f.comment,roles:b,task_id:m==null?void 0:m.id,user_id:a==null?void 0:a.id};fetch(p,{method:"POST",headers:k,body:JSON.stringify(x)}).then(g=>g.json()).then(g=>{g.success?v.success(g.message):v.warning(g.message)}).catch(g=>{v.warning(g.message)}).finally(()=>{B({...f,submitting:!1})})}},Ye=r=>{const l=r.target.value;O(l),_({...y,page:0})},Oe=(r,l)=>{_({...y,page:l})},Ne=r=>{_({...y,per_page:r.target.value,page:0})},Ge=r=>{E.length<2&&r.forEach(l=>E.push({label:l.name,value:l.id}))},Ke=async()=>{const r=w.api+w.id+"/workflows",l={Authorization:`${w.API_KEY}`,accept:"application/json"};fetch(r,{method:"GET",headers:l}).then(p=>p.json()).then(p=>{var k,b,x,g;p.success?(b=(k=p==null?void 0:p.data)==null?void 0:k.applicationWorkflows)!=null&&b.workflows&&Ge((g=(x=p==null?void 0:p.data)==null?void 0:x.applicationWorkflows)==null?void 0:g.workflows):v.warning(p.data.message)}).catch(p=>{v.error(p.message)}).finally(()=>{P(!1)})},Z=async()=>{var r;if(h){P(!0);const l=w.api+w.tasks+`?page=${y.page}&per_page=${y.per_page}&search=${M}&type=${C.type}&status=${C.status}`,p={Authorization:`${w.API_KEY}`,accept:"application/json","Content-Type":"application/json"},k=[];(r=a==null?void 0:a.roles)==null||r.forEach(x=>k.push({role_id:x.uuid,role_name:x.name}));const b={user_id:a==null?void 0:a.id,roles:k};fetch(l,{method:"POST",headers:p,body:JSON.stringify(b)}).then(x=>x.json()).then(x=>{x.success?(A(x.data.tasks),_({...y,total:x.data.total}),$(!1)):v.warning(x.message)}).catch(x=>{v.warning(x.message),$(!0)}).finally(()=>{P(!1)})}},Le=async r=>{var l,p,k,b;if((l=r==null?void 0:r.data)!=null&&l.id){Re(r),J(!0);const x=await et(),g=G.api+G.showPlan+`/${(p=r==null?void 0:r.data)==null?void 0:p.id}`,Ue=G.api+G.showTarget+`${(k=r==null?void 0:r.data)==null?void 0:k.id}`,qe=((b=r.workflow)==null?void 0:b.name)==="Evaluation"?Ue:g,Qe={Authorization:`Bearer ${x}`,accept:"application/json","Content-Type":"application/json"};fetch(qe,{method:"GET",headers:Qe}).then(I=>I.json()).then(I=>{I.success?X(I.data):(X([]),v.warning(I.message))}).catch(I=>{v.warning(I.message)}).finally(()=>{J(!1)})}else v.error("There is error fetching task detail")};return u.useEffect(()=>{Ke()},[]),u.useEffect(()=>{const r=setTimeout(()=>{Z()},800);return()=>{clearTimeout(r)}},[M]),u.useEffect(()=>{o?Z():S(!0)},[h,y.page,y.per_page,C]),e.jsxs(Ve,{title:"Tasks",children:[e.jsx(i,{container:!0,padding:2.4,children:e.jsxs(i,{container:!0,spacing:K,marginTop:.2,children:[e.jsx(i,{item:!0,xs:12,sm:12,md:8,lg:8,xl:8,children:e.jsxs(d,{sx:{minHeight:400},children:[e.jsxs(d,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3,px:2},children:[e.jsx(d,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:e.jsx(nt,{value:M,onChange:r=>Ye(r)})}),e.jsxs(d,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(d,{sx:{marginRight:2},children:e.jsx(Me,{name:"type",options:E,selected:C.type,handleSelection:H})}),e.jsx(Me,{name:"status",options:ht,selected:C.status,handleSelection:H})]})]}),e.jsx(i,{container:!0,children:T?e.jsx(i,{container:!0,children:e.jsx(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",justifyContent:"center",padding:4},children:e.jsx(_e,{size:20})})}):W?e.jsx(Ie,{title:"Server Error",message:"There is error retriving tasks"}):j.length===0?e.jsx(Ae,{severity:"tasks",title:"Tasks are not found",description:"The list of task will be listed here",sx:{paddingTop:6}}):e.jsx(i,{item:!0,xs:12,sm:12,sx:{display:"flex",flexWrap:"wrap"},children:j==null?void 0:j.map((r,l)=>e.jsx(ze,{type:r.workflow.name,status:r.status,title:r.title,description:r.description,step:r.step,date:st(r.created_at).formattedDate,onPress:()=>Le(r)},l))})}),!T&&j.length>0&&e.jsx(ct,{component:"div",rowsPerPageOptions:[10,25,50,100],count:y.total,rowsPerPage:y.per_page,page:y.page,onPageChange:Oe,onRowsPerPageChange:Ne,labelRowsPerPage:"Items per page"})]})}),e.jsx(i,{item:!0,xs:12,sm:12,md:4,lg:4,xl:4,children:e.jsxs(Y,{sx:{minHeight:240},children:[e.jsx(n,{variant:"h4",children:"Task Details"}),m&&t?e.jsx(i,{container:!0,sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:We?e.jsx(i,{container:!0,children:e.jsx(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",justifyContent:"center",padding:4},children:e.jsx(_e,{size:20})})}):W?e.jsx(Ie,{title:"Server Error",message:"There is error retriving task detail"}):t.length===0?e.jsx(Ae,{severity:"tasks",title:"Tasks details is not found",description:"The detail of task is shown here",sx:{paddingTop:6}}):((D=m==null?void 0:m.workflow)==null?void 0:D.name)==="Planning"?e.jsxs(i,{item:!0,xs:12,children:[(t==null?void 0:t.employee)&&e.jsx(q,{name:(te=(ee=t==null?void 0:t.employee)==null?void 0:ee.user)==null?void 0:te.name,position:(re=t==null?void 0:t.employee)==null?void 0:re.position}),(t==null?void 0:t.unit)&&e.jsx(Q,{name:(se=t==null?void 0:t.unit)==null?void 0:se.name,managerName:(ae=(ie=(ne=t==null?void 0:t.unit)==null?void 0:ne.manager)==null?void 0:ie.user)==null?void 0:ae.name,position:(le=(oe=t==null?void 0:t.unit)==null?void 0:oe.manager)==null?void 0:le.position}),e.jsx(Se,{sx:{borderColor:s.palette.divider,my:1.4}}),(t==null?void 0:t.target)&&e.jsx(at,{plan:{...t},sx:{border:0,p:.4,my:3}}),(m==null?void 0:m.status)==="pending"&&e.jsxs(U.Fragment,{children:[e.jsx(F,{title:"Approve",variant:"contained",sx:{backgroundColor:"green",":hover":{backgroundColor:"green"},width:"100%",boxShadow:0,p:1.4,marginTop:2},onPress:()=>z("approved")}),e.jsxs(i,{container:!0,mt:1,spacing:K,children:[e.jsx(i,{item:!0,xs:12,children:e.jsx(F,{title:"Amend",variant:"text",sx:{width:"100%"},onPress:()=>z("amended")})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(F,{title:"Reject",variant:"text",color:"error",sx:{width:"100%"},onPress:()=>z("rejected")})})]})]})]}):((ce=m.workflow)==null?void 0:ce.name)==="Evaluation"?e.jsxs(i,{item:!0,xs:12,children:[((pe=t==null?void 0:t.kpi_tracker)==null?void 0:pe.employee)&&e.jsx(q,{name:(xe=(me=(de=t==null?void 0:t.kpi_tracker)==null?void 0:de.employee)==null?void 0:me.user)==null?void 0:xe.name,position:(ge=(he=t==null?void 0:t.kpi_tracker)==null?void 0:he.employee)==null?void 0:ge.position}),((ue=t==null?void 0:t.kpi_tracker)==null?void 0:ue.unit)&&e.jsx(Q,{name:(ye=(je=t==null?void 0:t.kpi_tracker)==null?void 0:je.unit)==null?void 0:ye.name,managerName:(ve=(be=(ke=(fe=t==null?void 0:t.kpi_tracker)==null?void 0:fe.unit)==null?void 0:ke.manager)==null?void 0:be.user)==null?void 0:ve.name,position:(we=(Ce=(Te=t==null?void 0:t.kpi_tracker)==null?void 0:Te.unit)==null?void 0:Ce.manager)==null?void 0:we.position}),e.jsx(Se,{sx:{borderColor:s.palette.divider,my:1.4}}),t&&e.jsx(Fe,{evaluation:{...t},sx:{border:0,p:.4,my:3}}),(m==null?void 0:m.status)==="pending"&&e.jsxs(U.Fragment,{children:[e.jsx(F,{title:"Approve",variant:"contained",sx:{backgroundColor:"green",":hover":{backgroundColor:"green"},width:"100%",boxShadow:0,p:1.4,marginTop:2},onPress:()=>z("approved")}),e.jsxs(i,{container:!0,mt:1,spacing:K,children:[e.jsx(i,{item:!0,xs:12,children:e.jsx(F,{title:"Amend",variant:"text",sx:{width:"100%"},onPress:()=>z("amended")})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(F,{title:"Reject",variant:"text",color:"error",sx:{width:"100%"},onPress:()=>z("rejected")})})]})]})]}):e.jsx(n,{variant:"subtitle1",children:" The task does not have categorized type"})}):e.jsxs(d,{sx:{margin:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx(mt,{size:"3rem",stroke:"1.2",color:"grey"}),e.jsx(n,{variant:"h4",color:s.palette.text.primary,mt:1.6,children:"Selected task detail view"}),e.jsx(n,{variant:"subtitle2",children:"The detail of task you choosed shown here"})]})]})})]})}),e.jsx(ot,{open:f.openModal,title:"Remark",handleClose:V,onCancel:V,onSubmit:Be,submitting:f.submitting,children:e.jsx(Ze,{multiline:!0,minRows:5,name:"remark",value:f.comment,onChange:$e,placeholder:"Write remark here",variant:"standard",fullWidth:!0})}),e.jsx(De,{})]})};export{Bt as default};
