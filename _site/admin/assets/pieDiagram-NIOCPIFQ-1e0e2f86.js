import{p as B}from"./chunk-353BL4L5-b3a5884b.js";import{Y as U,H as Z,I as H,s as Q,r as V,v as Y,u as j,_ as i,D,Q as q,w as J,Z as K,a3 as X,a5 as ee,a6 as z,a7 as te,E as ae,a8 as re}from"./index-fa1ba195.js";import{p as ie}from"./mermaid-parser.core-0cb3ff54.js";var F=U.pie,w={sections:new Map,showData:!1,config:F},h=w.sections,C=w.showData,se=structuredClone(F),ne=i(()=>structuredClone(se),"getConfig"),oe=i(()=>{h=new Map,C=w.showData,q()},"clear"),le=i(({label:e,value:a})=>{h.has(e)||(h.set(e,a),D.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>h,"getSections"),de=i(e=>{C=e},"setShowData"),pe=i(()=>C,"getShowData"),G={getConfig:ne,clear:oe,setDiagramTitle:Z,getDiagramTitle:H,setAccTitle:Q,getAccTitle:V,setAccDescription:Y,getAccDescription:j,addSection:le,getSections:ce,setShowData:de,getShowData:pe},ge=i((e,a)=>{B(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ue={parse:i(async e=>{const a=await ie("pie",e);D.debug(a),ge(a,G)},"parse")},fe=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),he=fe,me=i(e=>{const a=[...e.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,o)=>o.value-s.value);return re().value(s=>s.value)(a)},"createPieArcs"),ve=i((e,a,W,s)=>{D.debug(`rendering pie chart
`+e);const o=s.db,y=J(),T=K(o.getConfig(),y.pie),$=40,n=18,p=4,l=450,m=l,v=X(a),c=v.append("g");c.attr("transform","translate("+m/2+","+l/2+")");const{themeVariables:r}=y;let[A]=ee(r.pieOuterStrokeWidth);A??(A=2);const _=T.textPosition,g=Math.min(m,l)/2-$,I=z().innerRadius(0).outerRadius(g),M=z().innerRadius(g*_).outerRadius(g*_);c.append("circle").attr("cx",0).attr("cy",0).attr("r",g+A/2).attr("class","pieOuterCircle");const E=o.getSections(),S=me(E),O=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],d=te(O);c.selectAll("mySlices").data(S).enter().append("path").attr("d",I).attr("fill",t=>d(t.data.label)).attr("class","pieCircle");let b=0;E.forEach(t=>{b+=t}),c.selectAll("mySlices").data(S).enter().append("text").text(t=>(t.data.value/b*100).toFixed(0)+"%").attr("transform",t=>"translate("+M.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(l-50)/2).attr("class","pieTitleText");const x=c.selectAll(".legend").data(d.domain()).enter().append("g").attr("class","legend").attr("transform",(t,u)=>{const f=n+p,R=f*d.domain().length/2,L=12*n,N=u*f-R;return"translate("+L+","+N+")"});x.append("rect").attr("width",n).attr("height",n).style("fill",d).style("stroke",d),x.data(S).append("text").attr("x",n+p).attr("y",n-p).text(t=>{const{label:u,value:f}=t.data;return o.getShowData()?`${u} [${f}]`:u});const P=Math.max(...x.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),k=m+$+n+p+P;v.attr("viewBox",`0 0 ${k} ${l}`),ae(v,l,k,T.useMaxWidth)},"draw"),Se={draw:ve},Ce={parser:ue,db:G,renderer:Se,styles:he};export{Ce as diagram};
