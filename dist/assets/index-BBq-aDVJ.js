import{Y as _,r as o,j as e,a9 as A,a0 as i,p as R,a8 as k,E as U,at as B,a5 as D,a6 as j,a2 as f}from"./index-CB3M8AEN.js";import{D as F}from"./DotMenu-BozKlmcu.js";import{f as I}from"./index-C_-DKd_R.js";import{S as $}from"./search-BIP7CrFZ.js";import{A as G}from"./ActivityIndicator-DCoQxF--.js";import{E as N}from"./ErrorPrompt-fWlGKA_A.js";import{F as z}from"./index-DjuwT8zP.js";import{T as H}from"./TableContainer-BePYmVWY.js";import{T as M,a as Y,b,c as L}from"./TableRow-C8yWtStn.js";import{T as t}from"./TableCell-HbngNqTB.js";import{T as O}from"./TablePagination-DbGtClqp.js";import"./IconDotsVertical-Me1WCLyu.js";import"./IconTrash-BvNCbRAX.js";import"./error-DW4k7GIP.js";import"./KeyboardArrowRight-4XYPRTPY.js";import"./LastPage-Z-YOeIDc.js";const le=()=>{const l=_(),[T,u]=o.useState(!1),[y,x]=o.useState(!1),[c,C]=o.useState([]),[v,m]=o.useState(!1),[r,d]=o.useState({page:0,per_page:10,last_page:0,total:0}),[p,P]=o.useState(""),E=(a,n)=>{d({...r,page:n})},S=a=>{d({...r,per_page:a.target.value,page:0})},w=a=>{const n=a.target.value;P(n),d({...r,page:0})},g=async()=>{x(!0);const a=await D(),n=j.auth+j.users+`?page=${r.page}&per_page=${r.per_page}&search=${p}`,h={Authorization:`Bearer ${a}`,accept:"application/json","Content-Type":"application/json"};fetch(n,{method:"GET",headers:h}).then(s=>s.json()).then(s=>{s.success?(C(s.data.data),d({...r,last_page:s.data.last_page,total:s.data.total}),m(!1)):f.warning(s.data.message)}).catch(s=>{f.warning(s.message),m(!0)}).finally(()=>{x(!1)})};return o.useEffect(()=>{const a=setTimeout(()=>{g()},800);return()=>{clearTimeout(a)}},[p]),o.useEffect(()=>{T?g():u(!0)},[r.page,r.per_page]),e.jsxs(A,{title:"Users",children:[e.jsx(i,{container:!0,children:e.jsxs(i,{item:!0,xs:12,padding:3,children:[e.jsx(i,{container:!0,children:e.jsx(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingY:3},children:e.jsx($,{title:"Search Employees",value:p,onChange:a=>w(a),filter:!1})})}),e.jsx(i,{container:!0,children:e.jsx(i,{item:!0,xs:12,children:y?e.jsx(i,{container:!0,children:e.jsx(i,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",justifyContent:"center",padding:4},children:e.jsx(G,{size:20})})}):v?e.jsx(N,{title:"Server Error",message:"Unable to retrive users "}):c.length===0?e.jsx(z,{severity:"evaluation",title:"User is not found",description:"The list of user will be listed here",sx:{paddingTop:6}}):e.jsxs(H,{sx:{minHeight:"66dvh",border:.4,borderColor:l.palette.divider,borderRadius:2},children:[e.jsxs(M,{"aria-label":"users table",sx:{minWidth:650},children:[e.jsx(Y,{children:e.jsxs(b,{children:[e.jsx(t,{children:"Name"}),e.jsx(t,{children:"Email"}),e.jsx(t,{children:"Phone"}),e.jsx(t,{children:"Username"}),e.jsx(t,{children:"Roles"}),e.jsx(t,{children:"Created at"}),e.jsx(t,{children:"Actions"})]})}),e.jsx(L,{children:c==null?void 0:c.map(a=>{var n;return e.jsxs(b,{sx:{":hover":{backgroundColor:l.palette.grey[100],color:l.palette.background.default,cursor:"pointer",borderRadius:2}},children:[e.jsx(t,{sx:{display:"flex",alignItems:"center",border:0},children:e.jsx(R,{variant:"subtitle1",color:l.palette.text.primary,children:a==null?void 0:a.name})}),e.jsx(t,{sx:{border:0},children:a==null?void 0:a.email}),e.jsx(t,{sx:{border:0},children:a!=null&&a.phone?a==null?void 0:a.phone:"N/A"}),e.jsx(t,{sx:{border:0},children:a!=null&&a.username?a==null?void 0:a.username:"N/A"}),e.jsx(t,{sx:{border:0},children:(n=a==null?void 0:a.roles)==null?void 0:n.map((h,s)=>e.jsx(k,{children:e.jsx(U,{label:h.name,sx:{margin:.4}})},s))}),e.jsx(t,{sx:{border:0},children:I(a==null?void 0:a.created_at).formattedDate}),e.jsx(t,{sx:{border:0},children:e.jsx(F,{})})]},a.id)})})]}),e.jsx(O,{component:"div",rowsPerPageOptions:[10,25,50,100],count:r.total,rowsPerPage:r.per_page,page:r.page,onPageChange:E,onRowsPerPageChange:S})]})})})]})}),e.jsx(B,{})]})};export{le as default};
