import{r as h,H as vt,z as tt,x as je,b2 as St,_ as m,d as xt,g as It,s as M,O as Be,e as Lt,a as rt,j as y,c as ge,h as Ot,b3 as ot,b4 as ne,b5 as ft,b6 as fe,J as yt,t as Pt,v as Ct,i as nt,b7 as At,u as kt,E as Rt,b8 as Tt}from"./index-BrIZ1aRM.js";import{C as wt}from"./Close-BzhvbiYv.js";const Dt=o=>{const a=h.useRef({});return h.useEffect(()=>{a.current=o}),a.current};function gt(o){return typeof o.normalize<"u"?o.normalize("NFD").replace(/[\u0300-\u036f]/g,""):o}function Nt(o={}){const{ignoreAccents:a=!0,ignoreCase:p=!0,limit:x,matchFrom:L="any",stringify:v,trim:P=!1}=o;return(g,{inputValue:_,getOptionLabel:z})=>{let A=P?_.trim():_;p&&(A=A.toLowerCase()),a&&(A=gt(A));const V=A?g.filter(Y=>{let D=(v||z)(Y);return p&&(D=D.toLowerCase()),a&&(D=gt(D)),L==="start"?D.indexOf(A)===0:D.indexOf(A)>-1}):g;return typeof x=="number"?V.slice(0,x):V}}function We(o,a){for(let p=0;p<o.length;p+=1)if(a(o[p]))return p;return-1}const Mt=Nt(),bt=5,Ft=o=>{var a;return o.current!==null&&((a=o.current.parentElement)==null?void 0:a.contains(document.activeElement))};function Et(o){const{unstable_isActiveElementInListbox:a=Ft,unstable_classNamePrefix:p="Mui",autoComplete:x=!1,autoHighlight:L=!1,autoSelect:v=!1,blurOnSelect:P=!1,clearOnBlur:g=!o.freeSolo,clearOnEscape:_=!1,componentName:z="useAutocomplete",defaultValue:A=o.multiple?[]:null,disableClearable:V=!1,disableCloseOnSelect:Y=!1,disabled:D,disabledItemsFocusable:_e=!1,disableListWrap:Ge=!1,filterOptions:at=Mt,filterSelectedOptions:be=!1,freeSolo:J=!1,getOptionDisabled:G,getOptionKey:Ue,getOptionLabel:ve=t=>{var e;return(e=t.label)!=null?e:t},groupBy:he,handleHomeEndKeys:Q=!o.freeSolo,id:st,includeInputInList:Ke=!1,inputValue:Se,isOptionEqualToValue:re=(t,e)=>t===e,multiple:d=!1,onChange:me,onClose:Le,onHighlightChange:Ae,onInputChange:U,onOpen:ke,open:lt,openOnFocus:it=!1,options:xe,readOnly:Z=!1,selectOnFocus:Ie=!o.freeSolo,value:Re}=o,T=vt(st);let S=ve;S=t=>{const e=ve(t);return typeof e!="string"?String(e):e};const Oe=h.useRef(!1),Te=h.useRef(!0),I=h.useRef(null),w=h.useRef(null),[ae,qe]=h.useState(null),[k,ye]=h.useState(-1),we=L?0:-1,C=h.useRef(we),[s,pt]=tt({controlled:Re,default:A,name:z}),[u,K]=tt({controlled:Se,default:"",name:z,state:"inputValue"}),[se,De]=h.useState(!1),ee=h.useCallback((t,e)=>{if(!(d?s.length<e.length:e!==null)&&!g)return;let n;if(d)n="";else if(e==null)n="";else{const l=S(e);n=typeof l=="string"?l:""}u!==n&&(K(n),U&&U(t,n,"reset"))},[S,u,d,U,K,g,s]),[X,Ne]=tt({controlled:lt,default:!1,name:z,state:"open"}),[Je,Me]=h.useState(!0),Fe=!d&&s!=null&&u===S(s),R=X&&!Z,f=R?at(xe.filter(t=>!(be&&(d?s:[s]).some(e=>e!==null&&re(t,e)))),{inputValue:Fe&&Je?"":u,getOptionLabel:S}):[],F=Dt({filteredOptions:f,value:s,inputValue:u});h.useEffect(()=>{const t=s!==F.value;se&&!t||J&&!t||ee(null,s)},[s,ee,se,F.value,J]);const Pe=X&&f.length>0&&!Z,le=je(t=>{t===-1?I.current.focus():ae.querySelector(`[data-tag-index="${t}"]`).focus()});h.useEffect(()=>{d&&k>s.length-1&&(ye(-1),le(-1))},[s,d,k,le]);function ie(t,e){if(!w.current||t<0||t>=f.length)return-1;let r=t;for(;;){const n=w.current.querySelector(`[data-option-index="${r}"]`),l=_e?!1:!n||n.disabled||n.getAttribute("aria-disabled")==="true";if(n&&n.hasAttribute("tabindex")&&!l)return r;if(e==="next"?r=(r+1)%f.length:r=(r-1+f.length)%f.length,r===t)return-1}}const j=je(({event:t,index:e,reason:r="auto"})=>{if(C.current=e,e===-1?I.current.removeAttribute("aria-activedescendant"):I.current.setAttribute("aria-activedescendant",`${T}-option-${e}`),Ae&&Ae(t,e===-1?null:f[e],r),!w.current)return;const n=w.current.querySelector(`[role="option"].${p}-focused`);n&&(n.classList.remove(`${p}-focused`),n.classList.remove(`${p}-focusVisible`));let l=w.current;if(w.current.getAttribute("role")!=="listbox"&&(l=w.current.parentElement.querySelector('[role="listbox"]')),!l)return;if(e===-1){l.scrollTop=0;return}const c=w.current.querySelector(`[data-option-index="${e}"]`);if(c&&(c.classList.add(`${p}-focused`),r==="keyboard"&&c.classList.add(`${p}-focusVisible`),l.scrollHeight>l.clientHeight&&r!=="mouse"&&r!=="touch")){const b=c,B=l.clientHeight+l.scrollTop,dt=b.offsetTop+b.offsetHeight;dt>B?l.scrollTop=dt-l.clientHeight:b.offsetTop-b.offsetHeight*(he?1.3:0)<l.scrollTop&&(l.scrollTop=b.offsetTop-b.offsetHeight*(he?1.3:0))}}),E=je(({event:t,diff:e,direction:r="next",reason:n="auto"})=>{if(!R)return;const c=ie((()=>{const b=f.length-1;if(e==="reset")return we;if(e==="start")return 0;if(e==="end")return b;const B=C.current+e;return B<0?B===-1&&Ke?-1:Ge&&C.current!==-1||Math.abs(e)>1?0:b:B>b?B===b+1&&Ke?-1:Ge||Math.abs(e)>1?b:0:B})(),r);if(j({index:c,reason:n,event:t}),x&&e!=="reset")if(c===-1)I.current.value=u;else{const b=S(f[c]);I.current.value=b,b.toLowerCase().indexOf(u.toLowerCase())===0&&u.length>0&&I.current.setSelectionRange(u.length,b.length)}}),pe=()=>{const t=(e,r)=>{const n=e?S(e):"",l=r?S(r):"";return n===l};if(C.current!==-1&&F.filteredOptions&&F.filteredOptions.length!==f.length&&F.inputValue===u&&(d?s.length===F.value.length&&F.value.every((e,r)=>S(s[r])===S(e)):t(F.value,s))){const e=F.filteredOptions[C.current];if(e)return We(f,r=>S(r)===S(e))}return-1},Ce=h.useCallback(()=>{if(!R)return;const t=pe();if(t!==-1){C.current=t;return}const e=d?s[0]:s;if(f.length===0||e==null){E({diff:"reset"});return}if(w.current){if(e!=null){const r=f[C.current];if(d&&r&&We(s,l=>re(r,l))!==-1)return;const n=We(f,l=>re(l,e));n===-1?E({diff:"reset"}):j({index:n});return}if(C.current>=f.length-1){j({index:f.length-1});return}j({index:C.current})}},[f.length,d?!1:s,be,E,j,R,u,d]),Qe=je(t=>{St(w,t),t&&Ce()});h.useEffect(()=>{Ce()},[Ce]);const N=t=>{X||(Ne(!0),Me(!0),ke&&ke(t))},q=(t,e)=>{X&&(Ne(!1),Le&&Le(t,e))},W=(t,e,r,n)=>{if(d){if(s.length===e.length&&s.every((l,c)=>l===e[c]))return}else if(s===e)return;me&&me(t,e,r,n),pt(e)},ue=h.useRef(!1),te=(t,e,r="selectOption",n="options")=>{let l=r,c=e;if(d){c=Array.isArray(s)?s.slice():[];const b=We(c,B=>re(e,B));b===-1?c.push(e):n!=="freeSolo"&&(c.splice(b,1),l="removeOption")}ee(t,c),W(t,c,l,{option:e}),!Y&&(!t||!t.ctrlKey&&!t.metaKey)&&q(t,l),(P===!0||P==="touch"&&ue.current||P==="mouse"&&!ue.current)&&I.current.blur()};function Ee(t,e){if(t===-1)return-1;let r=t;for(;;){if(e==="next"&&r===s.length||e==="previous"&&r===-1)return-1;const n=ae.querySelector(`[data-tag-index="${r}"]`);if(!n||!n.hasAttribute("tabindex")||n.disabled||n.getAttribute("aria-disabled")==="true")r+=e==="next"?1:-1;else return r}}const He=(t,e)=>{if(!d)return;u===""&&q(t,"toggleInput");let r=k;k===-1?u===""&&e==="previous"&&(r=s.length-1):(r+=e==="next"?1:-1,r<0&&(r=0),r===s.length&&(r=-1)),r=Ee(r,e),ye(r),le(r)},ze=t=>{Oe.current=!0,K(""),U&&U(t,"","clear"),W(t,d?[]:null,"clear")},Xe=t=>e=>{if(t.onKeyDown&&t.onKeyDown(e),!e.defaultMuiPrevented&&(k!==-1&&["ArrowLeft","ArrowRight"].indexOf(e.key)===-1&&(ye(-1),le(-1)),e.which!==229))switch(e.key){case"Home":R&&Q&&(e.preventDefault(),E({diff:"start",direction:"next",reason:"keyboard",event:e}));break;case"End":R&&Q&&(e.preventDefault(),E({diff:"end",direction:"previous",reason:"keyboard",event:e}));break;case"PageUp":e.preventDefault(),E({diff:-bt,direction:"previous",reason:"keyboard",event:e}),N(e);break;case"PageDown":e.preventDefault(),E({diff:bt,direction:"next",reason:"keyboard",event:e}),N(e);break;case"ArrowDown":e.preventDefault(),E({diff:1,direction:"next",reason:"keyboard",event:e}),N(e);break;case"ArrowUp":e.preventDefault(),E({diff:-1,direction:"previous",reason:"keyboard",event:e}),N(e);break;case"ArrowLeft":He(e,"previous");break;case"ArrowRight":He(e,"next");break;case"Enter":if(C.current!==-1&&R){const r=f[C.current],n=G?G(r):!1;if(e.preventDefault(),n)return;te(e,r,"selectOption"),x&&I.current.setSelectionRange(I.current.value.length,I.current.value.length)}else J&&u!==""&&Fe===!1&&(d&&e.preventDefault(),te(e,u,"createOption","freeSolo"));break;case"Escape":R?(e.preventDefault(),e.stopPropagation(),q(e,"escape")):_&&(u!==""||d&&s.length>0)&&(e.preventDefault(),e.stopPropagation(),ze(e));break;case"Backspace":if(d&&!Z&&u===""&&s.length>0){const r=k===-1?s.length-1:k,n=s.slice();n.splice(r,1),W(e,n,"removeOption",{option:s[r]})}break;case"Delete":if(d&&!Z&&u===""&&s.length>0&&k!==-1){const r=k,n=s.slice();n.splice(r,1),W(e,n,"removeOption",{option:s[r]})}break}},ut=t=>{De(!0),it&&!Oe.current&&N(t)},ce=t=>{if(a(w)){I.current.focus();return}De(!1),Te.current=!0,Oe.current=!1,v&&C.current!==-1&&R?te(t,f[C.current],"blur"):v&&J&&u!==""?te(t,u,"blur","freeSolo"):g&&ee(t,s),q(t,"blur")},$=t=>{const e=t.target.value;u!==e&&(K(e),Me(!1),U&&U(t,e,"input")),e===""?!V&&!d&&W(t,null,"clear"):N(t)},O=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));C.current!==e&&j({event:t,index:e,reason:"mouse"})},H=t=>{j({event:t,index:Number(t.currentTarget.getAttribute("data-option-index")),reason:"touch"}),ue.current=!0},ct=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));te(t,f[e],"selectOption"),ue.current=!1},Ye=t=>e=>{const r=s.slice();r.splice(t,1),W(e,r,"removeOption",{option:s[t]})},Ze=t=>{X?q(t,"toggleInput"):N(t)},et=t=>{t.currentTarget.contains(t.target)&&t.target.getAttribute("id")!==T&&t.preventDefault()},Ve=t=>{t.currentTarget.contains(t.target)&&(I.current.focus(),Ie&&Te.current&&I.current.selectionEnd-I.current.selectionStart===0&&I.current.select(),Te.current=!1)},$e=t=>{!D&&(u===""||!X)&&Ze(t)};let oe=J&&u.length>0;oe=oe||(d?s.length>0:s!==null);let de=f;return he&&(de=f.reduce((t,e,r)=>{const n=he(e);return t.length>0&&t[t.length-1].group===n?t[t.length-1].options.push(e):t.push({key:r,index:r,group:n,options:[e]}),t},[])),D&&se&&ce(),{getRootProps:(t={})=>m({"aria-owns":Pe?`${T}-listbox`:null},t,{onKeyDown:Xe(t),onMouseDown:et,onClick:Ve}),getInputLabelProps:()=>({id:`${T}-label`,htmlFor:T}),getInputProps:()=>({id:T,value:u,onBlur:ce,onFocus:ut,onChange:$,onMouseDown:$e,"aria-activedescendant":R?"":null,"aria-autocomplete":x?"both":"list","aria-controls":Pe?`${T}-listbox`:void 0,"aria-expanded":Pe,autoComplete:"off",ref:I,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:D}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:ze}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:Ze}),getTagProps:({index:t})=>m({key:t,"data-tag-index":t,tabIndex:-1},!Z&&{onDelete:Ye(t)}),getListboxProps:()=>({role:"listbox",id:`${T}-listbox`,"aria-labelledby":`${T}-label`,ref:Qe,onMouseDown:t=>{t.preventDefault()}}),getOptionProps:({index:t,option:e})=>{var r;const n=(d?s:[s]).some(c=>c!=null&&re(e,c)),l=G?G(e):!1;return{key:(r=Ue==null?void 0:Ue(e))!=null?r:S(e),tabIndex:-1,role:"option",id:`${T}-option-${t}`,onMouseMove:O,onClick:ct,onTouchStart:H,"data-option-index":t,"aria-disabled":l,"aria-selected":n}},id:T,inputValue:u,value:s,dirty:oe,expanded:R&&ae,popupOpen:R,focused:se||k!==-1,anchorEl:ae,setAnchorEl:qe,focusedTag:k,groupedOptions:de}}function Ht(o){return xt("MuiListSubheader",o)}It("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const zt=["className","color","component","disableGutters","disableSticky","inset"],Vt=o=>{const{classes:a,color:p,disableGutters:x,inset:L,disableSticky:v}=o,P={root:["root",p!=="default"&&`color${Be(p)}`,!x&&"gutters",L&&"inset",!v&&"sticky"]};return Ot(P,Ht,a)},jt=M("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:p}=o;return[a.root,p.color!=="default"&&a[`color${Be(p.color)}`],!p.disableGutters&&a.gutters,p.inset&&a.inset,!p.disableSticky&&a.sticky]}})(({theme:o,ownerState:a})=>m({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(o.vars||o).palette.text.secondary,fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(14)},a.color==="primary"&&{color:(o.vars||o).palette.primary.main},a.color==="inherit"&&{color:"inherit"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.inset&&{paddingLeft:72},!a.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(o.vars||o).palette.background.paper})),$t=h.forwardRef(function(a,p){const x=Lt({props:a,name:"MuiListSubheader"}),{className:L,color:v="default",component:P="li",disableGutters:g=!1,disableSticky:_=!1,inset:z=!1}=x,A=rt(x,zt),V=m({},x,{color:v,component:P,disableGutters:g,disableSticky:_,inset:z}),Y=Vt(V);return y.jsx(jt,m({as:P,className:ge(Y.root,L),ref:p,ownerState:V},A))});$t.muiSkipListHighlight=!0;function Wt(o){return xt("MuiAutocomplete",o)}const i=It("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);var ht,mt;const Bt=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionKey","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],_t=["ref"],Gt=Tt(),Ut=o=>{const{classes:a,disablePortal:p,expanded:x,focused:L,fullWidth:v,hasClearIcon:P,hasPopupIcon:g,inputFocused:_,popupOpen:z,size:A}=o,V={root:["root",x&&"expanded",L&&"focused",v&&"fullWidth",P&&"hasClearIcon",g&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",_&&"inputFocused"],tag:["tag",`tagSize${Be(A)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",z&&"popupIndicatorOpen"],popper:["popper",p&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return Ot(V,Wt,a)},Kt=M("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:p}=o,{fullWidth:x,hasClearIcon:L,hasPopupIcon:v,inputFocused:P,size:g}=p;return[{[`& .${i.tag}`]:a.tag},{[`& .${i.tag}`]:a[`tagSize${Be(g)}`]},{[`& .${i.inputRoot}`]:a.inputRoot},{[`& .${i.input}`]:a.input},{[`& .${i.input}`]:P&&a.inputFocused},a.root,x&&a.fullWidth,v&&a.hasPopupIcon,L&&a.hasClearIcon]}})({[`&.${i.focused} .${i.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${i.clearIndicator}`]:{visibility:"visible"}},[`& .${i.tag}`]:{margin:3,maxWidth:"calc(100% - 6px)"},[`& .${i.inputRoot}`]:{flexWrap:"wrap",[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:30},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:56},[`& .${i.input}`]:{width:0,minWidth:30}},[`& .${ot.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${ot.root}.${ne.sizeSmall}`]:{[`& .${ot.input}`]:{padding:"2px 4px 3px 0"}},[`& .${ft.root}`]:{padding:9,[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:39},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:65},[`& .${i.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${i.endAdornment}`]:{right:9}},[`& .${ft.root}.${ne.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${i.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${fe.root}`]:{paddingTop:19,paddingLeft:8,[`.${i.hasPopupIcon}&, .${i.hasClearIcon}&`]:{paddingRight:39},[`.${i.hasPopupIcon}.${i.hasClearIcon}&`]:{paddingRight:65},[`& .${fe.input}`]:{padding:"7px 4px"},[`& .${i.endAdornment}`]:{right:9}},[`& .${fe.root}.${ne.sizeSmall}`]:{paddingBottom:1,[`& .${fe.input}`]:{padding:"2.5px 4px"}},[`& .${ne.hiddenLabel}`]:{paddingTop:8},[`& .${fe.root}.${ne.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${i.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${fe.root}.${ne.hiddenLabel}.${ne.sizeSmall}`]:{[`& .${i.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${i.input}`]:{flexGrow:1,textOverflow:"ellipsis",opacity:0},variants:[{props:{fullWidth:!0},style:{width:"100%"}},{props:{size:"small"},style:{[`& .${i.tag}`]:{margin:2,maxWidth:"calc(100% - 4px)"}}},{props:{inputFocused:!0},style:{[`& .${i.input}`]:{opacity:1}}}]}),qt=M("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(o,a)=>a.endAdornment})({position:"absolute",right:0,top:"50%",transform:"translate(0, -50%)"}),Jt=M(yt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(o,a)=>a.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),Qt=M(yt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:o},a)=>m({},a.popupIndicator,o.popupOpen&&a.popupIndicatorOpen)})({padding:2,marginRight:-2,variants:[{props:{popupOpen:!0},style:{transform:"rotate(180deg)"}}]}),Xt=M(Pt,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(o,a)=>{const{ownerState:p}=o;return[{[`& .${i.option}`]:a.option},a.popper,p.disablePortal&&a.popperDisablePortal]}})(({theme:o})=>({zIndex:(o.vars||o).zIndex.modal,variants:[{props:{disablePortal:!0},style:{position:"absolute"}}]})),Yt=M(Ct,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(o,a)=>a.paper})(({theme:o})=>m({},o.typography.body1,{overflow:"auto"})),Zt=M("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(o,a)=>a.loading})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),eo=M("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(o,a)=>a.noOptions})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),to=M("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(o,a)=>a.listbox})(({theme:o})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${i.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[o.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${i.focused}`]:{backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(o.vars||o).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${i.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:nt(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${i.focused}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:nt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(o.vars||o).palette.action.selected}},[`&.${i.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:nt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}}}})),oo=M($t,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(o,a)=>a.groupLabel})(({theme:o})=>({backgroundColor:(o.vars||o).palette.background.paper,top:-8})),no=M("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(o,a)=>a.groupUl})({padding:0,[`& .${i.option}`]:{paddingLeft:24}}),so=h.forwardRef(function(a,p){var x,L,v,P;const g=Gt({props:a,name:"MuiAutocomplete"}),{autoComplete:_=!1,autoHighlight:z=!1,autoSelect:A=!1,blurOnSelect:V=!1,ChipProps:Y,className:D,clearIcon:_e=ht||(ht=y.jsx(wt,{fontSize:"small"})),clearOnBlur:Ge=!g.freeSolo,clearOnEscape:at=!1,clearText:be="Clear",closeText:J="Close",componentsProps:G={},defaultValue:Ue=g.multiple?[]:null,disableClearable:ve=!1,disableCloseOnSelect:he=!1,disabled:Q=!1,disabledItemsFocusable:st=!1,disableListWrap:Ke=!1,disablePortal:Se=!1,filterSelectedOptions:re=!1,forcePopupIcon:d="auto",freeSolo:me=!1,fullWidth:Le=!1,getLimitTagsText:Ae=n=>`+${n}`,getOptionLabel:U,groupBy:ke,handleHomeEndKeys:lt=!g.freeSolo,includeInputInList:it=!1,limitTags:xe=-1,ListboxComponent:Z="ul",ListboxProps:Ie,loading:Re=!1,loadingText:T="Loading…",multiple:S=!1,noOptionsText:Oe="No options",openOnFocus:Te=!1,openText:I="Open",PaperComponent:w=Ct,PopperComponent:ae=Pt,popupIcon:qe=mt||(mt=y.jsx(At,{})),readOnly:k=!1,renderGroup:ye,renderInput:we,renderOption:C,renderTags:s,selectOnFocus:pt=!g.freeSolo,size:u="medium",slotProps:K={}}=g,se=rt(g,Bt),{getRootProps:De,getInputProps:ee,getInputLabelProps:X,getPopupIndicatorProps:Ne,getClearProps:Je,getTagProps:Me,getListboxProps:Fe,getOptionProps:R,value:f,dirty:F,expanded:Pe,id:le,popupOpen:ie,focused:j,focusedTag:E,anchorEl:pe,setAnchorEl:Ce,inputValue:Qe,groupedOptions:N}=Et(m({},g,{componentName:"Autocomplete"})),q=!ve&&!Q&&F&&!k,W=(!me||d===!0)&&d!==!1,{onMouseDown:ue}=ee(),{ref:te}=Ie??{},Ee=Fe(),{ref:He}=Ee,ze=rt(Ee,_t),Xe=kt(He,te),ce=U||(n=>{var l;return(l=n.label)!=null?l:n}),$=m({},g,{disablePortal:Se,expanded:Pe,focused:j,fullWidth:Le,getOptionLabel:ce,hasClearIcon:q,hasPopupIcon:W,inputFocused:E===-1,popupOpen:ie,size:u}),O=Ut($);let H;if(S&&f.length>0){const n=l=>m({className:O.tag,disabled:Q},Me(l));s?H=s(f,n,$):H=f.map((l,c)=>y.jsx(Rt,m({label:ce(l),size:u},n({index:c}),Y)))}if(xe>-1&&Array.isArray(H)){const n=H.length-xe;!j&&n>0&&(H=H.splice(0,xe),H.push(y.jsx("span",{className:O.tag,children:Ae(n)},H.length)))}const Ye=ye||(n=>y.jsxs("li",{children:[y.jsx(oo,{className:O.groupLabel,ownerState:$,component:"div",children:n.group}),y.jsx(no,{className:O.groupUl,ownerState:$,children:n.children})]},n.key)),et=C||((n,l)=>h.createElement("li",m({},n,{key:n.key}),ce(l))),Ve=(n,l)=>{const c=R({option:n,index:l});return et(m({},c,{className:O.option}),n,{selected:c["aria-selected"],index:l,inputValue:Qe},$)},$e=(x=K.clearIndicator)!=null?x:G.clearIndicator,oe=(L=K.paper)!=null?L:G.paper,de=(v=K.popper)!=null?v:G.popper,t=(P=K.popupIndicator)!=null?P:G.popupIndicator,e=n=>y.jsx(Xt,m({as:ae,disablePortal:Se,style:{width:pe?pe.clientWidth:null},ownerState:$,role:"presentation",anchorEl:pe,open:ie},de,{className:ge(O.popper,de==null?void 0:de.className),children:y.jsx(Yt,m({ownerState:$,as:w},oe,{className:ge(O.paper,oe==null?void 0:oe.className),children:n}))}));let r=null;return N.length>0?r=e(y.jsx(to,m({as:Z,className:O.listbox,ownerState:$},ze,Ie,{ref:Xe,children:N.map((n,l)=>ke?Ye({key:n.key,group:n.group,children:n.options.map((c,b)=>Ve(c,n.index+b))}):Ve(n,l))}))):Re&&N.length===0?r=e(y.jsx(Zt,{className:O.loading,ownerState:$,children:T})):N.length===0&&!me&&!Re&&(r=e(y.jsx(eo,{className:O.noOptions,ownerState:$,role:"presentation",onMouseDown:n=>{n.preventDefault()},children:Oe}))),y.jsxs(h.Fragment,{children:[y.jsx(Kt,m({ref:p,className:ge(O.root,D),ownerState:$},De(se),{children:we({id:le,disabled:Q,fullWidth:!0,size:u==="small"?"small":void 0,InputLabelProps:X(),InputProps:m({ref:Ce,className:O.inputRoot,startAdornment:H,onClick:n=>{n.target===n.currentTarget&&ue(n)}},(q||W)&&{endAdornment:y.jsxs(qt,{className:O.endAdornment,ownerState:$,children:[q?y.jsx(Jt,m({},Je(),{"aria-label":be,title:be,ownerState:$},$e,{className:ge(O.clearIndicator,$e==null?void 0:$e.className),children:_e})):null,W?y.jsx(Qt,m({},Ne(),{disabled:Q,"aria-label":ie?J:I,title:ie?J:I,ownerState:$},t,{className:ge(O.popupIndicator,t==null?void 0:t.className),children:qe})):null]})}),inputProps:m({className:O.input,disabled:Q,readOnly:k},ee())})})),pe?r:null]})});export{so as A};
