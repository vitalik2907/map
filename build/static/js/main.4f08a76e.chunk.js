(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,i){"use strict";i.r(e);var o,n,a=i(0),l=i.n(a),h=i(5),r=i.n(h),s=i(1),c=i(3),u={height:400,width:400},g={height:256,width:256},d={height:5,width:5},f={x:0,y:0},p={x:0,y:0},y=function(t,e){return Math.floor((1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,e))},w=function(t,e){return Math.floor((t+180)/360*Math.pow(2,e))},b=function(t,e){return t/Math.pow(2,e)*360-180},m=function(t,e){var i=Math.PI-2*Math.PI*t/Math.pow(2,e);return 180/Math.PI*Math.atan(.5*(Math.exp(i)-Math.exp(-i)))},M=function(t,e){return(1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,e)},x=function(t,e){return(t+180)/360*Math.pow(2,e)},v=function(t,e){return{x:w(t.lng,e),y:y(t.lat,e)}},k=function(t,e){return{lng:b(t.x,e),lat:m(t.y,e)}},j=function(t){return 110.574*t},O=function(t,e){return 111.32*t*Math.cos(e*Math.PI/180)},S=function(t){return t/110.574},z=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g,o=v(t,e);return function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g,o=arguments.length>3?arguments[3]:void 0,n=arguments.length>4?arguments[4]:void 0,a=k(o,e),l=k(n,e);return{x:(t.lng-a.lng)*i.width/(l.lng-a.lng),y:(t.lat-a.lat)*i.height/(l.lat-a.lat)}}(t,e,i,o,{x:o.x+1,y:o.y+1})},P=function(t,e,i,o,n,a,l){var h=k(i,l),r=k({x:i.x+o.width,y:i.y+o.height},l);return{lng:(t.x-e.x)*(r.lng-h.lng)/(o.width*a.width)+h.lng,lat:(t.y-e.y)*(r.lat-h.lat)/(o.height*a.height)+h.lat}},T=function(t,e){var i={height:Math.ceil(t.height/e.height)+2,width:Math.ceil(t.width/e.width)+2};return i.height+=i.height%2===0?1:0,i.width+=i.width%2===0?1:0,i},C=function(t,e){return e?{x:t.clientX-e.getBoundingClientRect().left,y:t.clientY-e.getBoundingClientRect().top}:{x:0,y:0}},E=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},L=function(t,e){return{x:t.x+e.x,y:t.y+e.y}};!function(t){t[t.Default=0]="Default",t[t.Marker=1]="Marker",t[t.Square=2]="Square",t[t.Line=3]="Line",t[t.Polygon=4]="Polygon"}(o||(o={})),function(t){t[t.Circle=0]="Circle",t[t.Line=1]="Line",t[t.Polygon=2]="Polygon",t[t.Marker=3]="Marker",t[t.Cursor=4]="Cursor"}(n||(n={}));var I=i(2),F=function t(e,i,o){var n=this;Object(I.a)(this,t),this.zoom=void 0,this.coordinates=void 0,this.image=void 0,this.getImage=function(){return n.image},this.isTile=function(t,e){return n.zoom===t&&n.coordinates.lat===e.lat&&n.coordinates.lng===e.lng},this.getCoordinates=function(){return n.coordinates},this.zoom=e,this.coordinates=i,this.image=l.a.createElement("img",{src:"https://maps.wikimedia.org/osm-intl/".concat(e,"/").concat(i.lng,"/").concat(i.lat,".png"),onLoad:o})},D=new function t(){var e=this;Object(I.a)(this,t),this.list=[],this.isHiddenLoadingStarted=!1,this.center={lat:0,lng:0},this.zoom=0,this.getTile=function(t,i){var o=e.list.find(function(e){return e.isTile(t,i)});return void 0===o&&(o=new F(t,i,e.hiddenLoading),e.list.push(o)),o},this.setCurentMapState=function(t,i){e.center=t,e.zoom=i},this.continueHiddenLoading=function(){},this.findTile=function(t,i){return-1===e.list.findIndex(function(e){return e.isTile(t,i)})?{zoom:t,coordinates:i}:null},this.findNextPosition=function(t){for(var i=v(e.center,e.zoom),o=-t;o<=t;o++)for(var n=-t;n<=t;n++)if(Math.abs(o)===t||Math.abs(n)===t){var a=e.findTile(e.zoom,{lat:i.y+o,lng:i.x+n});if(null!=a)return a}for(var l=1;l<=t;l++)for(var h=v(e.center,e.zoom+l),r=v(e.center,e.zoom-l),s=-t;s<=t;s++)for(var c=-t;c<=t;c++)if(Math.abs(s)===t||Math.abs(c)===t){var u=e.findTile(e.zoom+l,{lat:h.y+s,lng:h.x+c});if(null!=u)return u;if(null!=(u=e.findTile(e.zoom-l,{lat:r.y+s,lng:r.x+c})))return u}},this.hiddenLoading=function(){if(!e.isHiddenLoadingStarted){e.isHiddenLoadingStarted=!0;var t=null,i=0;do{t=e.findNextPosition(i),i++}while(null===t);e.continueHiddenLoading()}}},q=new Array,B=new Array,R=function(t){for(var e=t.tilesCount,i=t.tileSize,o=t.center,n=t.zoom,h=t.startTilePosition,r=0;r<e.height;r++){B[r]=new Array,q[r]=new Array;for(var c=0;c<e.width;c++)B[r][c]=D.getTile(n,{lat:h.y+r,lng:h.x+c}).getImage()}var u=Object(a.useState)(0),g=Object(s.a)(u,2);g[0],g[1];return Object(a.useEffect)(function(){},[o]),l.a.createElement(l.a.Fragment,null,B.map(function(t,o){return l.a.createElement("div",{style:{height:"".concat(i.height,"px"),width:"".concat(i.width*e.width,"px")},key:o},t.map(function(t,n){return l.a.createElement("div",{style:{float:"left",height:"".concat(i.height,"px"),width:"".concat(i.width,"px"),backgroundColor:o===Math.floor(e.height/2)&&n===Math.floor(e.width/2)?"rgba(0, 255, 0, 0.5)":"#fff"},key:n},t)}))}))},W=function(t){var e=t.displayMapSize,i=t.delta,o=t.center,n=t.startTilePosition,h=(t.zoom,Object(a.useState)(d)),r=Object(s.a)(h,2),c=r[0],u=r[1],p=Object(a.useState)(f),y=Object(s.a)(p,2);y[0],y[1];return Object(a.useEffect)(function(){u(T(e,g))},[e]),l.a.createElement("div",{style:{height:"".concat(g.height*c.height,"px"),marginLeft:"".concat(i.x,"px"),marginTop:"".concat(i.y,"px"),width:"".concat(g.width*c.width,"px")}},l.a.createElement(R,{tilesCount:c,tileSize:g,center:o,startTilePosition:n,zoom:t.zoom}))},H=i(6),A=i.n(H),U=function(t){var e=a.useState(null),i=Object(s.a)(e,2),o=i[0],n=i[1],l=a.useState(d),h=Object(s.a)(l,2),r=h[0],c=h[1];return a.useEffect(function(){c(T(t.size,g))},[t.size]),a.useEffect(function(){if(o){var e=o.getContext("2d");if(e){var i=new Image;i.src=A.a,e.clearRect(0,0,t.size.width,t.size.height),t.markers.forEach(function(o){e.fillStyle="rgba(0, 0, 200, 0.5)";var n=o.size||{width:20,height:32};e.drawImage(i,(x(o.lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x-n.width/2,(M(o.lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y-n.height,n.width,n.height)}),t.squares.forEach(function(i){i.color?(e.fillStyle=i.color,e.strokeStyle=i.color):(e.fillStyle="#000000",e.strokeStyle="#000000"),e.beginPath(),e.moveTo((x(i.points[0].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[0].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);for(var o=1;o<i.points.length;o++)e.lineTo((x(i.points[o].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[o].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);e.lineTo((x(i.points[0].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[0].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y),i.filled?e.fill():e.stroke()}),t.rounds.forEach(function(i){i.color?(e.fillStyle=i.color,e.strokeStyle=i.color):(e.fillStyle="#000000",e.strokeStyle="#000000"),e.beginPath();var o=x(i.center.lng,t.zoom),n=M(i.center.lat,t.zoom);e.arc((o-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(n-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y,Math.abs(M(i.center.lat+S(i.radius.km),t.zoom)-n)*r.height*g.height/r.height,0,2*Math.PI),i.filled?e.fill():e.stroke()}),t.line.forEach(function(i){i.color?(e.fillStyle=i.color,e.strokeStyle=i.color):(e.fillStyle="#000000",e.strokeStyle="#000000"),e.beginPath(),e.moveTo((x(i.points[0].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[0].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);for(var o=1;o<i.points.length;o++)e.lineTo((x(i.points[o].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[o].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);i.filled?e.fill():e.stroke()}),t.polygon.forEach(function(i){i.color?(e.fillStyle=i.color,e.strokeStyle=i.color):(e.fillStyle="#000000",e.strokeStyle="#000000"),e.beginPath(),e.moveTo((x(i.points[0].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[0].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);for(var o=1;o<i.points.length;o++)e.lineTo((x(i.points[o].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[o].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y);e.lineTo((x(i.points[0].lng,t.zoom)-t.startTilePosition.x)*r.width*g.width/r.width+t.delta.x,(M(i.points[0].lat,t.zoom)-t.startTilePosition.y)*r.height*g.height/r.height+t.delta.y),i.filled?e.fill():e.stroke()})}}}),a.createElement("canvas",{style:{width:"100%",height:"100%",position:"absolute",top:0,left:0},width:t.size.width,height:t.size.height,ref:function(t){return n(t)}})},Y={controlFlowStyle:{height:"100%",width:"100%",left:0,position:"absolute",top:0},helpFlowStyle:{height:"50%",width:"50%",left:0,position:"absolute",top:0,backgroundColor:"rgba(255, 0, 0, 0.25)"}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J={center:{lat:50.1102,lng:3.1506},zoom:7,markers:[],squares:[],rounds:[{center:{lat:50.3102,lng:3.3506},radius:{km:10},filled:!0,color:"rgba(255, 255, 0, 0.5)"}],line:[{filled:!1,points:[{lat:50.1102,lng:3.1506},{lat:50.2102,lng:3.1506}]}],polygon:[{filled:!1,points:[{lat:50.3102,lng:3.1506},{lat:50.2102,lng:3.2506},{lat:50.1102,lng:3.2506}]}],onMouseMove:function(t,e,i,o){switch(o){case n.Line:1===i&&(this.line[this.line.length-1].points[1]=e);break;case n.Circle:if(1===i){var a=this.rounds[this.rounds.length-1].center.lat-e.lat,l=this.rounds[this.rounds.length-1].center.lng-e.lng;this.rounds[this.rounds.length-1].radius.km=Math.sqrt(Math.pow(j(a),2)+Math.pow(O(l,e.lat),2))}break;case n.Polygon:0!==i&&(this.polygon[this.polygon.length-1].points[this.polygon[this.polygon.length-1].points.length-1]=e)}},onClick:function(t,e,i,o,a){switch(i){case n.Marker:this.markers.push(e);break;case n.Line:0===o?(a(1),this.line.push({filled:!1,points:[e,e]})):(a(0),this.line[this.line.length-1].points[1]=e);break;case n.Circle:if(0===o)a(1),this.rounds.push({center:e,radius:{km:10},filled:!0,color:"rgba(255, 255, 0, 0.5)"});else{a(0);var l=this.rounds[this.rounds.length-1].center.lat-e.lat,h=this.rounds[this.rounds.length-1].center.lng-e.lng;this.rounds[this.rounds.length-1].radius.km=Math.sqrt(Math.pow(j(l),2)+Math.pow(O(h,e.lat),2))}break;case n.Polygon:0===o?(a(1),this.polygon.push({filled:!1,points:[e,e]})):(a(o+1),this.polygon[this.polygon.length-1].points[this.polygon[this.polygon.length-1].points.length-1]=e,this.polygon[this.polygon.length-1].points.push(e))}},onDoubleClick:function(t,e,i,o){switch(i(0),o){case n.Marker:this.markers.pop(),this.markers.pop(),this.markers.pop();break;case n.Line:this.line.pop(),this.line.pop(),1===e&&i(0);break;case n.Circle:this.rounds.pop(),this.rounds.pop(),1===e&&i(0);break;case n.Polygon:2!==e?(i(0),this.polygon[this.polygon.length-1].points.pop(),this.polygon[this.polygon.length-1].points.pop(),this.polygon[this.polygon.length-1].points.pop()):(this.polygon.pop(),this.polygon.pop())}}};r.a.render(l.a.createElement(function(t){var e=Object(c.a)({position:"relative"},t.style,{overflow:"hidden",userSelect:"none"}),i=Object(a.useState)(t.zoom),h=Object(s.a)(i,2),r=h[0],f=h[1],y=Object(a.useState)(t.center),w=Object(s.a)(y,2),b=w[0],m=w[1],M=Object(a.useState)(null),x=Object(s.a)(M,2),k=x[0],j=x[1],O=Object(a.useState)(u),S=Object(s.a)(O,2),I=S[0],F=S[1],D=Object(a.useState)(!1),q=Object(s.a)(D,2),B=q[0],R=q[1],H=Object(a.useState)(p),A=Object(s.a)(H,2),J=A[0],N=A[1],X=Object(a.useState)(p),$=Object(s.a)(X,2),G=$[0],K=$[1],Q=Object(a.useState)(d),V=Object(s.a)(Q,2),Z=V[0],_=V[1],tt=Object(a.useState)({x:((Z.width-1)*g.width-I.width)/2+z(b,r).x,y:((Z.height-1)*g.height-I.height)/2+z(b,r).y}),et=Object(s.a)(tt,2),it=et[0],ot=et[1],nt=Object(a.useState)(E(v(b,r),{x:Math.floor(d.width/2),y:Math.floor(d.height/2)})),at=Object(s.a)(nt,2),lt=at[0],ht=at[1],rt=Object(a.useState)(it),st=Object(s.a)(rt,2),ct=st[0],ut=st[1],gt=Object(a.useState)(b),dt=Object(s.a)(gt,2),ft=dt[0],pt=dt[1],yt=Object(a.useState)(o.Default),wt=Object(s.a)(yt,2),bt=(wt[0],wt[1],Object(a.useState)(t.markers)),mt=Object(s.a)(bt,2),Mt=mt[0],xt=(mt[1],Object(a.useState)(t.squares)),vt=Object(s.a)(xt,2),kt=vt[0],jt=(vt[1],Object(a.useState)(t.rounds)),Ot=Object(s.a)(jt,2),St=Ot[0],zt=(Ot[1],Object(a.useState)(t.line)),Pt=Object(s.a)(zt,2),Tt=Pt[0],Ct=(Pt[1],Object(a.useState)(0)),Et=Object(s.a)(Ct,2),Lt=Et[0],It=Et[1],Ft=Object(a.useState)(t.polygon),Dt=Object(s.a)(Ft,2),qt=Dt[0],Bt=(Dt[1],Object(a.useState)(n.Cursor)),Rt=Object(s.a)(Bt,2),Wt=Rt[0],Ht=Rt[1];Object(a.useEffect)(function(){var t=function(t){if(!t)return{height:0,width:0};var e=window.getComputedStyle(t,null);return{height:t.getBoundingClientRect().height-parseFloat(e.paddingTop||"0")-parseFloat(e.paddingBottom||"0")-parseFloat(e.borderTopWidth||"0")-parseFloat(e.borderBottomWidth||"0"),width:t.getBoundingClientRect().width-parseFloat(e.paddingLeft||"0")-parseFloat(e.paddingRight||"0")-parseFloat(e.borderLeftWidth||"0")-parseFloat(e.borderRightWidth||"0")}}(k);F(t);var e=T(t,g);_(e);var i=E(v(b,r),{x:Math.floor(e.width/2),y:Math.floor(e.height/2)});ht(i);var o={x:-(((e.width-1)*g.width-t.width)/2+z(b,r).x),y:-(((e.height-1)*g.height-t.height)/2+z(b,r).y)};ot(o)},[k,r]),Object(a.useEffect)(function(){var t=E(ct,it),e={x:-Math.round(t.x/g.width),y:-Math.round(t.y/g.height)};1!==Math.abs(e.x)&&1!==Math.abs(e.y)||ht(L(lt,e)),ut(it)},[it]);return Object(a.useEffect)(function(){console.log(Wt)},[Wt]),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){return Ht(n.Circle)}},"Circle"),l.a.createElement("button",{onClick:function(){return Ht(n.Line)}},"Line"),l.a.createElement("button",{onClick:function(){return Ht(n.Polygon)}},"Polygon"),l.a.createElement("button",{onClick:function(){return Ht(n.Marker)}},"Marker"),l.a.createElement("button",{onClick:function(){return Ht(n.Cursor)}},"Cursor")),l.a.createElement("div",{style:e,ref:function(t){return j(t)}},l.a.createElement(W,{displayMapSize:I,delta:it,center:b,startTilePosition:lt,zoom:r}),l.a.createElement(U,{markers:Mt,squares:kt,rounds:St,line:Tt,polygon:qt,delta:it,startTilePosition:lt,size:I,zoom:r}),l.a.createElement("div",{style:Y.controlFlowStyle,onMouseMove:function(e){var i=C(e,k);if(N(i),B){var o=function(t,e,i){for(var o=Object(c.a)({},t),n=(e.width-(i.width-Math.floor(i.width/e.width)*e.width))/2,a=(e.height-(i.height-Math.floor(i.height/e.height)*e.height))/2;e.width+n>-o.x;)o.x-=e.width;for(;2*e.width+n<-o.x;)o.x+=e.width;for(;e.height+a>-o.y;)o.y-=e.height;for(;2*e.height+a<-o.y;)o.y+=e.height;return o}(E(i,G),g,I);ot(o),t.onMouseMove&&t.onMouseMove(i,ft,Lt,Wt)}else{var n=P(i,it,lt,Z,0,g,r);pt(n),t.onMouseMove&&t.onMouseMove(i,n,Lt,Wt)}},onMouseUp:function(e){K(L(J,it)),R(!0),t.onMouseUp&&t.onMouseUp(e)},onMouseDown:function(e){K(E(J,it)),R(!0),t.onMouseDown&&t.onMouseDown(e)},onClick:function(e){var i=C(e,k);if(console.log(ft,ct,G),B)R(!1),t.onClick&&t.onClick(i,ft,Wt,Lt,It);else{console.log(i,it,lt);var o=P(i,it,lt,Z,0,g,r);pt(o),t.onClick&&t.onClick(i,o,Wt,Lt,It)}},onDoubleClick:function(e){R(!1),t.onDoubleClick&&t.onDoubleClick(e,Lt,It,Wt)},onMouseLeave:function(t){R(!1)},onWheel:function(t){t.deltaY>0&&r>4&&(m(ft),f(r-1)),t.deltaY<0&&r<19&&(m(ft),f(r+1))}})))},Object.assign({style:{border:"solid 1px #000",height:"800px",left:"200px",position:"absolute",top:"50px",width:"800px"}},J)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},6:function(t,e,i){t.exports=i.p+"static/media/marker.25a6aff3.png"},7:function(t,e,i){t.exports=i(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.4f08a76e.chunk.js.map