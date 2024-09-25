import{b2 as R,b3 as _,bI as C,aT as U,b6 as h,aU as $,bJ as m,r as S,b9 as M,b4 as A,j as i,bd as E,bf as X,ae as N,af as T,G as r}from"./index-DL-CLDEe.js";function B(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function F(t){return parseFloat(t)}function G(t){return R("MuiSkeleton",t)}_("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const K=["animation","className","component","height","style","variant","width"];let d=t=>t,b,f,x,v;const P=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:c,height:o}=t;return X({root:["root",a,n,s&&"withChildren",s&&!c&&"fitContent",s&&!o&&"heightAuto"]},G,e)},W=C(b||(b=d`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),I=C(f||(f=d`
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
`)),J=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const a=B(t.shape.borderRadius)||"px",n=F(t.shape.borderRadius);return h({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:$(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&m(x||(x=d`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),W),({ownerState:t,theme:e})=>t.animation==="wave"&&m(v||(v=d`
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
    `),I,(e.vars||e).palette.action.hover)),l=S.forwardRef(function(e,a){const n=M({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:c,component:o="span",height:u,style:j,variant:k="text",width:w}=n,g=A(n,K),p=h({},n,{animation:s,component:o,variant:k,hasChildren:!!g.children}),y=P(p);return i.jsx(J,h({as:o,ref:a,className:E(y.root,c),ownerState:p},g,{style:h({width:w,height:u},j)}))}),O=()=>i.jsx(N,{children:i.jsx(T,{children:i.jsxs(r,{container:!0,direction:"column",children:[i.jsx(r,{item:!0,children:i.jsxs(r,{container:!0,justifyContent:"space-between",children:[i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",width:44,height:44})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",width:34,height:34})})]})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",sx:{my:2},height:40})}),i.jsx(r,{item:!0,children:i.jsx(l,{variant:"rectangular",height:30})})]})})});export{O as E};
