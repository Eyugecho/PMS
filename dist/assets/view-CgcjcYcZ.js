import{c as M,ao as le,l as ce,u as de,r as d,j as e,n as pe,G as u,g as J,a as v,m as r,b as l,Z as he,J as ge,aq as Q,d as D,F as xe,T as me,at as ue,Q as fe,I as je,ah as ye,f as k,h as g,B as p,k as ve}from"./index-DL-CLDEe.js";import{D as y,I as be,a as ke,b as Ce}from"./DetailInfo-CrMK9Gpa.js";import{P as Te}from"./PlanTable-DGecXshL.js";import{P as Ie}from"./PerformanceCard-BGBIJSie.js";import{P as Pe}from"./PerKPI-fCT4UCeN.js";import{I as we,S as Ee,a as ze}from"./CreateTask-DTItplYo.js";import{I as Se}from"./IconTargetArrow-D7GkijEa.js";import"./KeyboardArrowUp-C1VMsA8Z.js";import"./DrogaDonutChart-gWJPFz3l.js";var De=M("gender-male","IconGenderMale",[["path",{d:"M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0",key:"svg-0"}],["path",{d:"M19 5l-5.4 5.4",key:"svg-1"}],["path",{d:"M19 5h-5",key:"svg-2"}],["path",{d:"M19 5v5",key:"svg-3"}]]),Me=M("phone","IconPhone",[["path",{d:"M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",key:"svg-0"}]]),Ae=M("tie","IconTie",[["path",{d:"M12 22l4 -4l-2.5 -11l.993 -2.649a1 1 0 0 0 -.936 -1.351h-3.114a1 1 0 0 0 -.936 1.351l.993 2.649l-2.5 11l4 4z",key:"svg-0"}],["path",{d:"M10.5 7h3l5 5.5",key:"svg-1"}]]);const Be=[{label:"Pending",value:"pending"},{label:"In-progrees",value:"inprogress"},{label:"Done",value:"done"},{label:"Blocked",value:"blocked"},{label:"Cancelled",value:"cancelled"}],We=()=>{var $,F,G,L,R,O,N,K,W,q;const{state:a}=le(),x=ce(),f=de(n=>n.customization.selectedFiscalYear),[Z,C]=d.useState(!1),[T,U]=d.useState([]),[V,I]=d.useState(!1),[A,B]=d.useState(!1),[b,P]=d.useState([]),[H,_]=d.useState(!1),[X,Y]=d.useState(null),[j,m]=d.useState({loading:!0,taskList:[],openModal:!1,submitting:!1,date:"",picker:!1,changing:!1}),[c,w]=d.useState({page:0,per_page:10,total:0}),ee=n=>{const o=n.target.value;m(i=>({...i,date:o}))},ae=()=>{m(n=>({...n,picker:!0}))},ne=(n,o)=>{w({...c,page:o})},te=n=>{w({...c,per_page:n.target.value}),setPage(0)},se=async(n,o)=>{const i=n.target.value;m(h=>({...h,changing:!0}));const s=await k(),t=g.api+g.employeeTaskStatus+o.id,z={Authorization:`Bearer ${s}`,accept:"application/json","Content-Type":"application/json"};fetch(t,{method:"POST",headers:z,body:JSON.stringify({status:i})}).then(h=>h.json()).then(h=>{h.success?E():p.error(h.message)}).catch(h=>{p.error(h.message)}).finally(()=>{m(h=>({...h,changing:!1}))})},ie=()=>{m(n=>({...n,openModal:!0}))},oe=()=>{m(n=>({...n,openModal:!1}))},re=async n=>{Y(n),_(!0);const o=await k(),i=g.api+g.employeeTasks+"/"+n,s={Authorization:"Bearer"+o,accept:"application/json","Content-Type":"application/json"};fetch(i,{method:"DELETE",headers:s}).then(t=>t.json()).then(t=>{t.success?(p.success(t.data.message),E()):p.error(t.data.message)}).catch(t=>{p.error(t.message)}).finally(()=>{_(!1)})},E=async()=>{m(s=>({...s,loading:!0}));const n=await k(),o=g.api+g.getEmployeeTask+(a==null?void 0:a.id)+`?date=${j.date}&fiscal_year_id=${f==null?void 0:f.id}&page=${c.page}&per_page=${c.per_page}`,i={Authorization:`Bearer ${n}`,accept:"application/json","Content-Type":"application/json"};fetch(o,{method:"GET",headers:i}).then(s=>s.json()).then(s=>{s.success?(m(t=>({...t,taskList:s.data.data})),w({...c,total:s.data.total}),oe()):p.warning(s.message)}).catch(s=>{p.warning(s.message)}).finally(()=>{m(s=>({...s,loading:!1}))})};return d.useEffect(()=>{E()},[j.date,c.page,c.per_page]),d.useEffect(()=>{(async()=>{if(f){B(!0);const o=await k(),i=g.api+g.employeePerformance+`${a==null?void 0:a.id}?fiscal_year_id=${f==null?void 0:f.id}`,s={Authorization:`Bearer ${o}`,accept:"application/json","Content-Type":"application/json"};fetch(i,{method:"GET",headers:s}).then(t=>t.json()).then(t=>{t.success?P(t.data.performance):(P([]),p.warning(t.data.message))}).catch(t=>{P([]),p.warning(t.message)}).finally(()=>{B(!1)})}else return e.jsx(ve,{})})()},[f]),d.useEffect(()=>((async()=>{C(!0);const o=await k(),i=g.api+g.getEmployeeTarget+(a==null?void 0:a.id),s={Authorization:`Bearer ${o}`,accept:"application/json","Content-Type":"application/json"};fetch(i,{method:"GET",headers:s}).then(t=>t.json()).then(t=>{t.success?(U(t.data),C(!1),I(!1)):(C(!1),I(!1),p.warning(t.data.message))}).catch(t=>{p.warning(t.message),I(!0),C(!1)})})(),()=>{}),[a==null?void 0:a.id]),e.jsxs(pe,{back:!0,title:"Employee Details",children:[e.jsx(u,{container:!0,sx:{display:"flex",justifyContent:"space-between",padding:2},spacing:J,children:e.jsx(u,{item:!0,xs:12,children:e.jsxs(v,{children:[e.jsx(r,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,paddingLeft:2,borderBottom:.4,borderColor:x.palette.divider},children:e.jsx(l,{variant:"h4",children:"Employee KPI's and Targets"})}),e.jsx(r,{children:Z?e.jsx(r,{sx:{padding:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(he,{size:20})}):V?e.jsx(r,{sx:{padding:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(l,{variant:"body2",children:"There is error fetching the Employees"})}):T.length===0?e.jsxs(r,{sx:{padding:4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx(Se,{size:80,color:x.palette.grey[400]}),e.jsx(l,{variant:"h4",sx:{marginTop:1.6},children:"Employee target is not found"}),e.jsx(l,{variant:"caption",children:"The list of assigned target will be listed here"})]}):e.jsx(Te,{plans:T,page:"employee"})})]})})}),e.jsxs(u,{container:!0,sx:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:2},spacing:J,children:[e.jsxs(u,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,children:[e.jsxs(v,{children:[e.jsx(r,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:.4,borderColor:x.palette.divider,paddingBottom:1.8},children:e.jsx(l,{variant:"h4",children:"Employee Details"})}),e.jsxs(r,{children:[(a==null?void 0:a.user)&&e.jsx(y,{label:"Full name",info:($=a==null?void 0:a.user)==null?void 0:$.name,icon:e.jsx(ge,{size:22})}),(a==null?void 0:a.gender)&&e.jsx(y,{label:"Gender",info:a==null?void 0:a.gender,icon:e.jsx(De,{size:22})}),((F=a==null?void 0:a.user)==null?void 0:F.email)&&e.jsx(y,{label:"Email",info:(G=a==null?void 0:a.user)==null?void 0:G.email,icon:e.jsx(be,{size:22})}),((L=a==null?void 0:a.user)==null?void 0:L.phone)&&e.jsx(y,{label:"Phone",info:(R=a==null?void 0:a.user)==null?void 0:R.phone,icon:e.jsx(Me,{size:22})}),((O=a==null?void 0:a.user)==null?void 0:O.role)&&e.jsx(y,{label:"Role",info:(N=a==null?void 0:a.user)==null?void 0:N.role,icon:e.jsx(Ae,{size:22})}),(a==null?void 0:a.position)&&e.jsx(y,{label:"Position",info:a==null?void 0:a.position,icon:e.jsx(ke,{size:22})}),((K=a==null?void 0:a.user)==null?void 0:K.created_at)&&e.jsx(y,{label:"Start date",info:Q((W=a==null?void 0:a.user)==null?void 0:W.created_at).formattedDate,icon:e.jsx(Ce,{size:22})})]})]}),e.jsxs(v,{sx:{mt:2},children:[e.jsx(l,{variant:"h4",children:"Overall Performance"}),e.jsx(u,{container:!0,children:e.jsx(u,{item:!0,xs:12,children:A?e.jsx(r,{sx:{display:"flex",alignItems:"center",justifyContent:"center",padding:2},children:e.jsx(D,{size:20})}):b.length>0?e.jsx(u,{container:!0,sx:{marginTop:2,borderTop:.8,borderColor:x.palette.divider,padding:1},children:e.jsx(u,{item:!0,xs:12,sx:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"},children:b==null?void 0:b.map((n,o)=>{var S;const i=Object.keys(n)[0],[s,t]=i.match(/[a-zA-Z]+|[0-9]+/g),z=`${s} ${t}`;return e.jsx(Ie,{isEvaluated:n[i].is_evaluated,performance:(S=n[i])==null?void 0:S.overall,frequency:z},o)})})}):e.jsx(xe,{severity:"performance",title:"No employee performance report",description:"The employee performances will be listed here",sx:{paddingTop:2}})})})]}),e.jsxs(v,{sx:{mt:2},children:[e.jsx(l,{variant:"h4",children:"Per KPI performance"}),e.jsx(Pe,{isLoading:A,performance:b})]})]}),e.jsx(u,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,children:e.jsxs(v,{children:[e.jsxs(r,{sx:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:[e.jsxs(r,{children:[e.jsx(l,{variant:"h4",children:"Daily Activities"}),j.picker?e.jsx(me,{id:"date",name:"date",type:"date",sx:{"& .MuiOutlinedInput-root":{"& fieldset":{border:"none"}},ml:-2,p:0,mt:-1},value:j.date,onChange:ee}):e.jsx(l,{variant:"body1",mt:1,onClick:()=>ae(),sx:{cursor:"pointer",":hover":{fontWeight:x.typography.fontWeightMedium}},children:"Today"})]}),e.jsx(ue,{title:"Create Task",variant:"text",icon:e.jsx(fe,{size:"1.2rem",stroke:"1.2",style:{marginRight:4}}),sx:{boxShadow:0,backgroundColor:x.palette.grey[50]},onPress:ie,disabled:T.length===0})]}),j.loading?e.jsx(r,{sx:{padding:4,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(D,{size:20})}):j.taskList.length===0?e.jsxs(r,{sx:{padding:4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx(we,{size:80,color:x.palette.grey[400]}),e.jsx(l,{variant:"h4",sx:{marginTop:1.6},children:"No task planned today"}),e.jsx(l,{variant:"caption",children:"The list of created task will be listed here"})]}):e.jsxs(r,{sx:{marginTop:3},children:[(q=j.taskList)==null?void 0:q.map((n,o)=>{var i,s;return e.jsxs(v,{sx:{backgroundColor:x.palette.grey[50],marginTop:1.6,display:"flex",alignItems:"center",justifyContent:"space-between",py:1},children:[e.jsxs(r,{children:[e.jsx(l,{variant:"body1",children:(s=(i=n.plan)==null?void 0:i.kpi)==null?void 0:s.name}),e.jsx(l,{variant:"h4",my:1,children:n.title}),e.jsx(l,{variant:"subtitle2",children:Q(n==null?void 0:n.date).formattedDate})]}),e.jsxs(r,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(Ee,{name:"status",options:Be,selected:n.status,handleSelection:t=>se(t,n)}),H&&X===n.id?e.jsx(D,{size:16}):e.jsx(je,{onClick:()=>re(n.id),title:"remove",children:e.jsx(ze,{size:"1.2rem",stroke:"1.6",color:x.palette.error.main})})]})]},o)}),c.total>c.per_page&&e.jsx(ye,{component:"div",rowsPerPageOptions:[10,25,50,100],count:c.total,rowsPerPage:c.per_page,page:c.page,onPageChange:ne,onRowsPerPageChange:te,labelRowsPerPage:"Tasks per page"})]})]})})]})]})};export{We as default};
