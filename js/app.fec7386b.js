(function(t){function e(e){for(var r,o,s=e[0],u=e[1],c=e[2],f=0,d=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/tic-tac-toe-with-gravels/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"43dd":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v("Mesterséges intelligencia alkalmazások")]),n("h2",[t._v("2. feladat - Amőba kavicsokkal")]),n("h3",[t._v("Szatmári Mihály")]),t.isGameStarted?t._e():n("el-button",{attrs:{type:"success"},on:{click:t.startGame}},[t._v(" Játék indítása ")]),t.isGameStarted?n("div",{attrs:{id:"board-header-container"}},[n("div",{attrs:{id:"board-header"}},[n("el-button",{attrs:{type:"success"},on:{click:t.resetGame}},[t._v(" Új játék ")]),t.winner?t._e():n("div",[t.isLoading?n("i",{staticClass:"el-icon-loading",attrs:{id:"loading-icon"}}):t._e(),n("span",[t._v(t._s(t.currentPlayerText))])])],1)]):t._e(),t.isGameStarted?n("div",[n("div",{attrs:{id:"board-container"}},[n("board",{attrs:{state:t.state,winner:t.winner,"current-player":t.currentPlayer},on:{"on-field-click":t.handleFieldClick}})],1)]):t._e()],1)},i=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"board-container"}},[n("table",t._l(t.state,(function(e,r){return n("tr",{key:r},t._l(e,(function(e,a){return n("td",{key:a,on:{click:function(e){return t.handleFieldClick(r,a)}}},[n("el-avatar",{staticClass:"animated",class:{hidden:t.isEmptyCell(r,a)},style:{background:t.getGravelColor(r,a)},attrs:{icon:t.getGravelIcon(r,a)}})],1)})),0)})),0)])},s=[],u=(n("fb6a"),n("a9e3"),{AI:1,HUMAN:2,BOTH:3}),c={EMPTY:"0",RED:"r",ORANGE:"o",GREEN:"g"};n("99af"),n("a623"),n("7db0"),n("caad"),n("d81d"),n("45fc"),n("2532");function l(t){var e=t.row,n=t.column,r=t.state,a=t.player,i=r[e][n].slice(-1),o=c.EMPTY,s=c.RED,u=c.ORANGE,l=c.GREEN;switch(i){case o:r[e][n]="".concat(a).concat(s);break;case s:r[e][n]="".concat(a).concat(u);break;case u:r[e][n]="".concat(a).concat(l);break}return w(r)}function f(t,e,n){return n[t][e].slice(-1)===c.GREEN}function d(t,e){var n=h(t)||p(t)||m(t);return n?+n[0][0]:g(t,e)?u.BOTH:null}function h(t){var e=t.map((function(e,n){return t[n][n]})),n=t.map((function(e,n){return t[n][t.length-1-n]}));return v(e)||v(n)}function p(t){return t.find((function(t){return v(t)}))}function m(t){var e=t.map((function(e,n){return e.map((function(e,r){return t[r][n]}))}));return e.find((function(t){return v(t)}))}function v(t){var e=t.every((function(e){return e===t[0]&&e!==c.EMPTY}));return e?t:null}function y(){var t=c.EMPTY,e=[[t,t,t],[t,t,t],[t,t,t]];return w(e)}function g(t,e){return t.every((function(t){return t.every((function(t){return e?t.slice(-1)!==e:t.slice(-1)===c.GREEN}))}))}function w(t){return JSON.parse(JSON.stringify(t))}function b(t,e){return e.some((function(n,r){return n.some((function(n,a){return e[r][a].includes(t)}))}))}function k(t){return b(c.EMPTY,t)?c.EMPTY:b(c.RED,t)?c.RED:b(c.ORANGE,t)?c.ORANGE:c.GREEN}var E={name:"Board",props:{state:Array,winner:Number,currentPlayer:Number},methods:{handleFieldClick:function(t,e){var n=!this.winner&&this.currentPlayer===u.HUMAN,r=f(t,e,this.state);n&&(r?this.showInvalidStepMessage():this.emitCoordinates({row:t,column:e}))},emitCoordinates:function(t){this.$emit("on-field-click",t)},showInvalidStepMessage:function(){this.$message.warning("Oda nem léphetsz!")},isEmptyCell:function(t,e){return this.state[t][e]===c.EMPTY},getGravelIcon:function(t,e){var n=+this.state[t][e][0]===u.AI;return"el-icon-".concat(n?"s-tools":"user-solid")},getGravelColor:function(t,e){switch(this.state[t][e].slice(-1)){case c.RED:return"red";case c.ORANGE:return"orange";case c.GREEN:return"green"}}}},G=E,M=(n("e715"),n("2877")),P=Object(M["a"])(G,o,s,!1,null,"83d8b760",null),S=P.exports;function O(t,e){for(var n,r=-1/0,a=0;a<3;a++)for(var i=0;i<3;i++)if(t[a][i].includes(e)){var o=l({row:a,column:i,state:w(t),player:u.AI}),s=A(o,0,!1,-1/0,1/0,e);s>r&&(r=s,n={row:a,column:i})}return n}var R=[10,-10,0];function A(t,e,n,r,a,i){var o=d(t,i);if(null!==o)return R[o-1];if(n){for(var s=-1/0,c=0;c<3;c++)for(var f=0;f<3;f++)if(t[c][f].includes(i)){var h=l({row:c,column:f,state:w(t),player:u.AI}),p=A(w(h),e+1,!1,r,a,i);if(s=Math.max(p,s),r=Math.max(r,s),a<=r)break}return s}for(var m=1/0,v=0;v<3;v++)for(var y=0;y<3;y++)if(t[v][y].includes(i)){var g=l({row:v,column:y,state:w(t),player:u.HUMAN}),b=A(w(g),e+1,!0,r,a,i);if(m=Math.min(b,m),a=Math.min(a,m),a<=r)break}return m}var _={name:"App",components:{Board:S},data:function(){return{winner:null,isGameStarted:!1,currentPlayer:u.HUMAN,state:y()}},computed:{isLoading:function(){return this.currentPlayer===u.AI&&!this.winner},currentPlayerText:function(){return this.isLoading?"Az ellenfél következik":"Te következel"}},methods:{switchPlayer:function(){var t=u.AI,e=u.HUMAN;this.currentPlayer=this.currentPlayer===t?e:t},handleFieldClick:function(t){var e=this,n=t.row,r=t.column;this.makeStep(n,r),this.winner||setTimeout((function(){return e.makeAIStep()}),500)},showGameResult:function(){var t=this.getResultDialogText(),e=t.title,n=t.message,r=t.type;this.$alert(n,e,{confirmButtonText:"Bezárás",type:r})},getResultDialogText:function(){switch(this.winner){case u.HUMAN:return{title:"Győzelem",message:"Gratulálok, győztél!",type:"success"};case u.AI:return{title:"Vereség",message:"Sajnálom, vesztettél!",type:"error"};case u.BOTH:return{title:"Döntetlen",message:"A játék eredménye döntetlen",type:"warning"}}},startGame:function(){this.isGameStarted=!0},resetGame:function(){this.winner=null,this.currentPlayer=2,this.state=y()},makeAIStep:function(){var t=k(this.state),e=O(w(this.state),t),n=e.row,r=e.column;this.makeStep(n,r)},makeStep:function(t,e){this.state=l({row:t,column:e,state:this.state,player:this.currentPlayer}),this.winner=d(this.state),this.winner?this.showGameResult():this.switchPlayer()},getValidSteps:function(){var t=!1,e=this.getRandomSteps(),n=JSON.parse(JSON.stringify(this.state));while(!t){var r=e,a=r.row,i=r.column;f(a,i,n)?e=this.getRandomSteps():t=!0}return e},getRandomSteps:function(){var t=this.getRandomIndex(),e=this.getRandomIndex();return{row:t,column:e}},getRandomIndex:function(){return Math.floor(3*Math.random())}}},N=_,T=(n("034f"),Object(M["a"])(N,a,i,!1,null,null,null)),x=T.exports,I=n("5c96"),j=n.n(I);n("0fae"),n("3d5b");r["default"].config.productionTip=!1,r["default"].use(j.a),new r["default"]({render:function(t){return t(x)}}).$mount("#app")},"85ec":function(t,e,n){},e715:function(t,e,n){"use strict";var r=n("43dd"),a=n.n(r);a.a}});
//# sourceMappingURL=app.fec7386b.js.map