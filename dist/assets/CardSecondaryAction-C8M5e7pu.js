import{P as i,j as e,az as c,i as m,au as g,an as x}from"./index-CsFgNO3o.js";import{L as o}from"./Link-D1zGLmNm.js";const n=({color:t,outline:s,size:l,sx:r,...h})=>{const p=t&&!s&&{color:"background.paper",bgcolor:`${t}.main`},d=s&&{color:t?`${t}.main`:"primary.main",bgcolor:"background.paper",border:"2px solid",borderColor:t?`${t}.main`:"primary.main"};let a={};switch(l){case"badge":a={width:28,height:28};break;case"xs":a={width:34,height:34};break;case"sm":a={width:40,height:40};break;case"lg":a={width:72,height:72};break;case"xl":a={width:82,height:82};break;case"md":a={width:60,height:60};break;default:a={}}return e.jsx(c,{sx:{...p,...d,...a,...r},...h})};n.propTypes={color:i.string,outline:i.bool,size:i.string,sx:i.object};const b=({title:t,link:s,icon:l})=>{const r=m();return e.jsx(g,{title:t||"Reference",placement:"left",children:e.jsxs(x,{disableRipple:!0,children:[!l&&e.jsx(n,{component:o,href:s,"aria-label":"redirect pages",target:"_blank",alt:"MUI Logo",size:"badge",outline:!0,children:e.jsxs("svg",{width:"500",height:"500",viewBox:"0 0 500 500",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsxs("g",{clipPath:"url(#clip0)",children:[e.jsx("path",{d:"M100 260.9V131L212.5 195.95V239.25L137.5 195.95V282.55L100 260.9Z",fill:r.palette.primary[800]}),e.jsx("path",{d:"M212.5 195.95L325 131V260.9L250 304.2L212.5 282.55L287.5 239.25V195.95L212.5 239.25V195.95Z",fill:r.palette.primary.main}),e.jsx("path",{d:"M212.5 282.55V325.85L287.5 369.15V325.85L212.5 282.55Z",fill:r.palette.primary[800]}),e.jsx("path",{d:"M287.5 369.15L400 304.2V217.6L362.5 239.25V282.55L287.5 325.85V369.15ZM362.5 195.95V152.65L400 131V174.3L362.5 195.95Z",fill:r.palette.primary.main})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0",children:e.jsx("rect",{width:"300",height:"238.3",fill:"white",transform:"translate(100 131)"})})})]})}),l&&e.jsx(n,{component:o,href:s,target:"_blank",size:"badge",color:"primary",outline:!0,"aria-label":"material-ui",children:l})]})})};b.propTypes={icon:i.node,link:i.string,title:i.string};export{b as C};
