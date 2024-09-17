import{d as R,g as _,ba as C,s as U,_ as h,Z as $,bb as m,r as S,e as M,a as A,j as i,c as E,h as X,aq as N,ar as B,a0 as r}from"./index-CB3M8AEN.js";function F(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function K(t){return parseFloat(t)}function P(t){return R("MuiSkeleton",t)}_("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const T=["animation","className","component","height","style","variant","width"];let d=t=>t,f,x,b,v;const W=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:c,height:o}=t;return X({root:["root",a,n,s&&"withChildren",s&&!c&&"fitContent",s&&!o&&"heightAuto"]},P,e)},q=C(f||(f=d`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),G=C(x||(x=d`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),L=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const a=F(t.shape.borderRadius)||"px",n=K(t.shape.borderRadius);return h({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:$(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&m(b||(b=d`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),q),({ownerState:t,theme:e})=>t.animation==="wave"&&m(v||(v=d`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),G,(e.vars||e).palette.action.hover)),l=S.forwardRef(function(e,a){const n=M({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:c,component:o="span",height:u,style:j,variant:k="text",width:w}=n,g=A(n,T),p=h({},n,{animation:s,component:o,variant:k,hasChildren:!!g.children}),y=W(p);return i.jsx(L,h({as:o,ref:a,className:E(y.root,c),ownerState:p},g,{style:h({width:w,height:u},j)}))}),V=()=>i.jsx(N,{children:i.jsx(B,{children:i.jsxs(r,{container:!0,direction:"column",children:[i.jsx(r,{item:!0,children:i.jsxs(r,{container:!0,justifyContent:"space-between",children:[i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",width:44,height:44})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",width:34,height:34})})]})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",sx:{my:2},height:40})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",height:30})})]})})});export{V as E};
