"use strict";(self["webpackChunkv2_htxt"]=self["webpackChunkv2_htxt"]||[]).push([[899],{8899:function(t,e,a){a.r(e),a.d(e,{default:function(){return Ct}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-container"},[a("card-dash-board",{staticClass:"board",attrs:{num:4,titles:t.titles,counts:t.counts,footers:t.footers},scopedSlots:t._u([{key:"charts",fn:function(e){var s=e.$index;return[0===s?a("div",{staticClass:"index0"},[a("span",[t._v("周同比")]),a("span",{attrs:{"data-num":""}},[t._v("56.67%")]),a("span",{staticClass:"iconfont icon-sanjiao2"}),a("span",{attrs:{"data-num":""}},[t._v("日同比")]),a("span",{attrs:{"data-num":""}},[t._v("19.16%")]),a("span",{staticClass:"iconfont icon-sanjiao1"})]):t._e(),1===s?a("div",[a("line-chart")],1):t._e(),2===s?a("div",[a("bar-chart")],1):t._e(),3===s?a("div",[a("progress-chart",{attrs:{data:t.counts[3]}})],1):t._e()]}}])}),a("Sale",{attrs:{tabs:t.tabs,num:0,spans:t.spans,leftList:t.leftList},on:{clicktime:t.clicktime},scopedSlots:t._u([{key:"echarts",fn:function(e){var s=e.$index;return[a("sale-bar-chart",0==s?{attrs:{barData:t.line1,title:t.tabs[s]}}:{attrs:{barData:t.line2,title:t.tabs[s]}})]}}])}),a("observe-index")],1)},r=[],i=a(4665),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"box",staticClass:"charts"},[t._v("LineChart")])},o=[],l={name:"LineChart",computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened}),data(){return{lineChart:null}},dataArr(){let t=+new Date(1988,9,3);const e=864e5,a=[[t,300*Math.random()]];for(let s=1;s<2e4;s++){const r=new Date(t+=e);a.push([+r,Math.round(20*(Math.random()-.5)+a[s-1][1])])}return a}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.box.offsetWidth){const t={width:this.$refs.box.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.lineChart.resize(t),clearTimeout(e)}}),200)}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.box);this.lineChart=t,this.CHANGE_BARCHARTSINIT(t);const e={xAxis:{show:!1,type:"category"},yAxis:{show:!1},tooltip:{show:!0,trigger:"axis",formatter:function(t){let e="";const a='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(102, 0, 128, 0.5)"></span>';return t.forEach((t=>{e+=t.axisValue+"</br>"+a+t.data[1]})),e}},series:[{type:"line",data:this.dataArr,itemStyle:{opacity:0,borderJoin:"round"},lineStyle:{color:"purple"},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(102, 0, 128, 0.5)",opacity:.5},{offset:1,color:"#ffffff"}],global:!1}},smooth:!0}],grid:{left:0,top:2,right:8,bottom:10}};t.setOption(e)}))}},c=l,d=a(1001),h=(0,d.Z)(c,n,o,!1,null,"5585d4a6",null),p=h.exports,u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"box",staticClass:"charts"},[t._v("BarChart")])},m=[],f={name:"BarChart",data(){return{barChart:null}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.box.offsetWidth){const t={width:this.$refs.box.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.barChart.resize(t),clearTimeout(e)}}),200)}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.box);this.barChart=t,this.CHANGE_BARCHARTSINIT(t);const e={xAxis:{show:!1,type:"category"},yAxis:{show:!1},series:[{type:"bar",data:[3600,8636,13653,23613,9653,5998,15236,23613,9653,5998]}],tooltip:{show:!0},grid:{top:0,left:3,right:8,bottom:10}};t.setOption(e)}))}},C=f,b=(0,d.Z)(C,u,m,!1,null,"4a495145",null),v=b.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"box",staticClass:"charts"},[t._v(" progressChart "),a("div",{staticStyle:{width:"3px",height:"15px",background:"red"}})])},A=[],x={name:"progressChart",props:["data"],data(){return{lineChart:null}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.box.offsetWidth){const t={width:this.$refs.box.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.lineChart.resize(t),clearTimeout(e)}}),200)}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.box);this.lineChart=t,this.CHANGE_BARCHARTSINIT(t);const e={xAxis:{show:!1,min:0,max:100},yAxis:{show:!1,type:"category"},series:[{type:"bar",data:[parseInt(this.data)],barWidth:10,color:"yellowgreen",showBackground:!0,backgroundStyle:{color:"#eee"},label:{show:!0,formatter:"|",position:"right"}}],tooltip:{show:!0,formatter:t=>t.value+"%"},grid:{top:0,left:3,right:8,bottom:10}};t.setOption(e)}))}},g=x,w=(0,d.Z)(g,_,A,!1,null,"3eea2962",null),I=w.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"SaleIndex"},[a("el-card",[a("div",{staticClass:"flexbox"},[a("el-tabs",{staticClass:"left",on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(t.tabs,(function(e,s){return a("el-tab-pane",{key:s,attrs:{label:e,name:e}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:16}},[t._t("echarts",null,{$index:s})],2),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"collist"},t._l(t.leftList,(function(e,s){return a("div",{key:s+999,staticClass:"spanlist"},[a("span",{staticClass:"radis"},[t._v(t._s(s+1))]),a("span",[t._v(t._s(e.name))]),a("span",{staticClass:"ringhtspan"},[t._v(t._s(e.content))])])})),0)])],1)],1)})),1),a("div",{staticClass:"right"},[t._l(t.spans,(function(e,s){return a("span",{key:s,attrs:{data:s},on:{click:function(e){return t.clickSpan(s)}}},[t._v(t._s(e))])})),a("el-date-picker",{staticClass:"picker",attrs:{type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},on:{change:t.clickPicker},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}})],2)],1)])],1)},y=[],N={name:"SaleIndex",props:["tabs","num","spans","leftList"],data(){return{activeName:"请传入tabs",value1:""}},methods:{...(0,i.OI)({CHANGE_ACTIVENAME:(t,e)=>t("dash/CHANGE_ACTIVENAME",e)}),handleClick(t,e){},clickSpan(t){const e=new Date,a=new Date;1===t?a.setTime(a.getTime()-6048e5):2===t?a.setTime(a.getTime()-2592e6):3===t&&a.setTime(a.getTime()-31536e6),this.value1=[a,e],this.$emit("clicktime")},clickPicker(){this.$emit("clicktime")}},watch:{num:{immediate:!0,handler:function(){const{tabs:t,num:e}=this;this.activeName=t[e]}},activeName(t){this.CHANGE_ACTIVENAME(t)}},computed:{...(0,i.rn)({barChartsInit:t=>t.dash.barChartsInit,opened:t=>t.app.sidebar.opened})}},S=N,$=(0,d.Z)(S,T,y,!1,null,"6442c5fc",null),H=$.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"box",staticClass:"BarChart",staticStyle:{width:"100%"}})},R=[],k={name:"BarChart",props:["barData","title"],data(){return{barCharts:null}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened,activeName:t=>t.dash.activeName})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.box.offsetWidth){const t={width:this.$refs.box.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.barCharts.resize(t),clearTimeout(e)}}),200)},activeName(){this.barCharts.resize()}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.box);this.barCharts=t,this.CHANGE_BARCHARTSINIT(t);const e={title:{text:this.title+"趋势"},xAxis:{show:!0,data:new Array(12).fill(0).map(((t,e)=>e+1+"月"))},yAxis:{show:!0},tooltip:{trigger:"axis",axisPointer:{type:"shadow",shadowStyle:{color:"rgba(150,150,150,0.2)"}}},series:[{type:"bar",data:this.barData,barWidth:25}],grid:{left:30,top:40,right:0,bottom:20}};t.setOption(e)}))}},B=k,G=(0,d.Z)(B,E,R,!1,null,"3dc05817",null),O=G.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"observe"},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:12}},[a("search-index")],1),a("el-col",{attrs:{span:12}},[a("cate-gory")],1)],1)],1)},W=[],L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search"},[a("el-card",[a("div",{staticClass:"hotsearch"},[a("span",[t._v("线上热门搜索")]),a("el-dropdown",[a("i",{staticClass:"el-icon-more"}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[t._v("该页面")]),a("el-dropdown-item",[t._v("仅作展示")]),a("el-dropdown-item",[t._v("没用实际数据")]),a("el-dropdown-item",[t._v("其他模块")]),a("el-dropdown-item",[t._v("有真实")]),a("el-dropdown-item",[t._v("数据接口")])],1)],1)],1),a("div",[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:12}},[a("line-chart",{attrs:{dataArr:t._f("bignum")(t.dataArr()),title:"搜索用户数"},scopedSlots:t._u([{key:"icon",fn:function(){return[a("span",{staticClass:"bignum"},[t._v("111252")]),a("span",{staticClass:"rightnum"},[t._v("15.3")]),a("span",{staticClass:"iconfont icon-sanjiao2"})]},proxy:!0}])})],1),a("el-col",{attrs:{span:12}},[a("line-chart",{attrs:{dataArr:t.dataArr(),title:"人均搜索次数"},scopedSlots:t._u([{key:"icon",fn:function(){return[a("span",{staticClass:"bignum"},[t._v("2.7")]),a("span",{staticClass:"rightnum"},[t._v("26.2")]),a("span",{staticClass:"iconfont icon-sanjiao1",attrs:{slot:"icon"},slot:"icon"})]},proxy:!0}])})],1)],1)],1),a("el-table",{attrs:{border:"",data:[t.tableDate[t.page]]}},[a("el-table-column",{attrs:{label:"排名",type:"index",width:"80",align:"center"}}),a("el-table-column",{attrs:{label:"搜索关键字",prop:"a"}}),a("el-table-column",{attrs:{label:"用户数",prop:"b",sortable:""}}),a("el-table-column",{attrs:{label:"周涨幅",prop:"c",sortable:""}})],1),a("el-pagination",{attrs:{layout:"->, prev, pager, next","page-size":1,total:60},on:{"current-change":t.currentChange}})],1)],1)},z=[],D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"LineChart"},[a("div",{staticClass:"top"},[a("span",{staticClass:"search_user_num"},[t._v(t._s(t.title))]),a("span",{staticClass:"iconfont icon-Info"})]),a("div",{staticClass:"number"},[t._t("icon")],2),a("div",{ref:"charts",staticClass:"box"})])},Z=[],P={name:"LineChart",props:["dataArr","title"],data(){return{lineChart:null}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.charts.offsetWidth){const t={width:this.$refs.charts.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.lineChart.resize(t),clearTimeout(e)}}),200)}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.charts);this.lineChart=t,this.CHANGE_BARCHARTSINIT(t);const e={xAxis:{show:!1,type:"category"},yAxis:{show:!1},tooltip:{show:!0,trigger:"axis"},series:[{type:"line",data:this.dataArr,smooth:!0,itemStyle:{opacity:0,borderJoin:"round"},lineStyle:{color:"rgba(102, 0, 128)"},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(102, 0, 128, 0.5)",opacity:.5},{offset:1,color:"#ffffff"}],global:!1}}}]};t.setOption(e)}))}},j=P,V=(0,d.Z)(j,D,Z,!1,null,"60ffa2f0",null),J=V.exports,F={name:"SearchIndex",components:{LineChart:J},data(){const t=new Array(61).fill({}).map((t=>{const e={a:String.fromCharCode(parseInt(100*Math.random())),b:parseInt(1e4*Math.random()),c:parseInt(1e4*Math.random())};return e}));return{tableDate:t,page:1}},methods:{dataArr(){const t=[];for(let e=0;e<20;e++)t.push(parseInt(100*Math.random()+1));return t},currentChange(t){this.page=t}},filters:{bignum(t){return t.map((t=>1e4*t))}}},q=F,K=(0,d.Z)(q,L,z,!1,null,"0c9a71fc",null),Q=K.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category"},[a("el-card",[a("div",{staticClass:"shopsearch"},[a("span",[t._v("销售额类别占比")]),a("el-dropdown",[a("i",{staticClass:"el-icon-more"}),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[t._v("该页面")]),a("el-dropdown-item",[t._v("仅作展示")]),a("el-dropdown-item",[t._v("没用实际数据")]),a("el-dropdown-item",[t._v("其他模块")]),a("el-dropdown-item",[t._v("有真实")]),a("el-dropdown-item",[t._v("数据接口")])],1)],1)],1),a("pie-chart")],1)],1)},X=[],Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pieChart"},[a("div",{ref:"box",staticClass:"charts"})])},tt=[],et={name:"PieChart",data(){return{pieChart:null}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)})},computed:{...(0,i.rn)({opened:t=>t.app.sidebar.opened})},watch:{opened(t){const e=setTimeout((()=>{if(this.$refs.box.offsetWidth){const t={width:this.$refs.box.offsetWidth,animation:{duration:50,easing:"ease-out"}};this.pieChart.resize(t),clearTimeout(e)}}),200)}},mounted(){this.$nextTick((()=>{const t=this.$echarts.init(this.$refs.box);this.pieChart=t,this.CHANGE_BARCHARTSINIT(t);const e={title:{text:"视频广告",subtext:"300",left:"center",top:"center"},tooltip:{trigger:"item"},series:[{name:"Access From",type:"pie",radius:["40%","80%"],avoidLabelOverlap:!0,itemStyle:{borderRadius:3,borderColor:"#fff",borderWidth:1},label:{show:!0,fontSize:14},data:[{value:300,name:"视频广告"},{value:484,name:"邮件营销"},{value:580,name:"联盟广告"},{value:735,name:"直接访问"},{value:1048,name:"搜索引擎"}]}]};t.on("mousemove",(e=>{t.setOption({title:{text:e.name,subtext:e.value}})})),t.setOption(e)}))}},at=et,st=(0,d.Z)(at,Y,tt,!1,null,"23876548",null),rt=st.exports,it={name:"CateGory",components:{PieChart:rt}},nt=it,ot=(0,d.Z)(nt,U,X,!1,null,"61a19f9c",null),lt=ot.exports,ct={name:"ObserveIndex",components:{SearchIndex:Q,CateGory:lt}},dt=ct,ht=(0,d.Z)(dt,M,W,!1,null,"71fa4fc4",null),pt=ht.exports,ut={name:"DashBoard",components:{LineChart:p,BarChart:v,ProgressChart:I,Sale:H,SaleBarChart:O,ObserveIndex:pt},data(){return{titles:["总销售额","访问量","支付笔数","运营活动效果"],counts:["￥ 126560","88460","88460",`${parseInt(100*Math.random())}%`],footers:["日销售额 ￥12423","日访问量 1442","转化率 65%","同化比 18%"],tabs:["销售额","访问量"],spans:["今日","本周","本月","本年"],line1:new Array(12).fill(0).map((t=>parseInt(100*Math.random()+20))),line2:new Array(12).fill(0).map((t=>parseInt(100*Math.random()+20))),leftList:[]}},methods:{...(0,i.OI)({CHANGE_BARCHARTSINIT:(t,e)=>t("dash/CHANGE_BARCHARTSINIT",e)}),aaa(){},leftlisted(){let t=parseInt(7*Math.random());const e=["肯德基","麦当劳","海底捞","汉堡王","魏家凉皮","兰州拉面","康师傅"],a=()=>{e[t]||(t=parseInt(7*Math.random()),a())};return new Array(7).fill({}).map((s=>{a();const r={name:e[t],content:parseInt(1e6*Math.random()+1e4)};return e.splice(t,1),r}))},clicktime(){this.leftList=this.leftlisted()}},computed:{...(0,i.rn)({barChartsInit:t=>t.dash.barChartsInit,opened:t=>t.app.sidebar.opened})},mounted(){this.leftList=this.leftlisted(),window.onresize=()=>{this.barChartsInit.forEach((t=>{t.resize({width:"auto"})}))}},beforeDestroy(){this.CHANGE_BARCHARTSINIT([]),window.onresize=null}},mt=ut,ft=(0,d.Z)(mt,s,r,!1,null,"1227ccdd",null),Ct=ft.exports}}]);
//# sourceMappingURL=899.39a180ed.js.map