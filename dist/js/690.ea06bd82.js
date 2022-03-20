"use strict";(self["webpackChunkv2_htxt"]=self["webpackChunkv2_htxt"]||[]).push([[690],{690:function(t,e,a){a.r(e),a.d(e,{default:function(){return u}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{border:"",data:t.skuList}},[a("el-table-column",{attrs:{prop:"id",type:"index",index:t.typedIndex,label:"序号",align:"center",width:"100"}}),a("el-table-column",{attrs:{prop:"skuName",label:"名称"}}),a("el-table-column",{attrs:{prop:"skuDesc",label:"描述"}}),a("el-table-column",{attrs:{prop:"defaultImage",label:"默认图片",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.skuDefaultImg}})]}}])}),a("el-table-column",{attrs:{prop:"weight",label:"重量(KG)",width:"100"}}),a("el-table-column",{attrs:{prop:"price",label:"价格(元)",width:"100"}}),a("el-table-column",{attrs:{prop:"active",label:"操作",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("el-tooltip",{attrs:{effect:"dark",content:1===s.isSale?"点击下架":"点击上架",placement:"bottom"}},[1===s.isSale?a("el-button",{attrs:{type:"success",icon:"el-icon-sort-up",size:"mini"},on:{click:function(e){return t.sortUp(s)}}}):a("el-button",{attrs:{icon:"el-icon-sort-down",size:"mini"},on:{click:function(e){return t.sortDown(s)}}})],1),a("el-button",{attrs:{type:"info",icon:"el-icon-info",size:"mini"},on:{click:function(e){return t.inof(s)}}}),a("el-popconfirm",{staticStyle:{marginLeft:"10px"},attrs:{"confirm-button-text":"好的","cancel-button-text":"不用了",icon:"el-icon-info","icon-color":"red",title:"这是一段内容确定删除吗？"},on:{confirm:function(e){return t.del(s)}}},[a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",size:"mini"},slot:"reference"})],1)]}}])})],1),a("el-drawer",{attrs:{title:"数据详情",visible:t.drawer,direction:"rtl",size:"50%","before-close":t.handleClose},on:{"update:visible":function(e){t.drawer=e}}},t._l(t.drawerArr,(function(e,s){return a("el-row",{key:s},[a("el-col",{attrs:{span:5}},[t._v(t._s(e)+":")]),0==s?a("el-col",{attrs:{span:16}},[t._v(t._s(t.drawerData.skuName))]):t._e(),1==s?a("el-col",{attrs:{span:16}},[t._v(t._s(t.drawerData.createTime))]):t._e(),2==s?a("el-col",{attrs:{span:16}},[t._v(t._s(t.drawerData.skuDesc))]):t._e(),3==s?a("el-col",{attrs:{span:16}},[a("div",{staticStyle:{marginTop:"3px"}},[t._v(t._s(t.drawerData.price)+" 元")])]):t._e(),4==s?a("el-col",{attrs:{span:16}},[a("div",{staticStyle:{marginTop:"5px"}},[t._v(t._s(t.drawerData.weight)+" kg")])]):t._e(),5==s?a("el-col",{attrs:{span:16}},t._l(t.drawerData.skuAttrValueList,(function(e,s){return a("el-tag",{key:s},[t._v(t._s(e.valueName))])})),1):t._e(),6==s?a("el-col",{attrs:{span:16}},[t.skuImageListLength?a("el-carousel",{attrs:{interval:4e3,type:"card",height:"200px","indicator-position":1==t.skuImageListLength?"none":"outside"}},t._l(t.drawerData.skuImageList,(function(t,e){return a("el-carousel-item",{key:e,staticClass:"card"},[a("div",{staticClass:"image"},[a("el-image",{attrs:{src:t.imgUrl,fit:"contain"}})],1),a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])])})),1):a("span",[t._v("暂无图片")])],1):t._e()],1)})),1),a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"current-page":t.pagination.page,"page-sizes":t.pagination.sizes,"page-size":t.pagination.limit,layout:"total, prev, pager, next, jumper, ->, sizes",total:t.pagination.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}})],1)},i=[],n=a(4665),r={name:"SkuIdex",data(){return{drawer:!1,drawerArr:["名称","创建时间","描述","价格","重量","平台属性","商品图片"]}},methods:{...(0,n.OI)({CHANGE_PAGINATION:(t,e)=>t("sku/CHANGE_PAGINATION",e),CHANGE_LOADING:(t,e)=>t("sku/CHANGE_LOADING",e)}),...(0,n.nv)({skuListAsync:(t,e)=>t("sku/skuListAsync",e),sortUpOnSale:(t,e)=>t("sku/sortUpOnSale",e),sortDownCancelSale:(t,e)=>t("sku/sortDownCancelSale",e),getSkuById:(t,e)=>t("sku/getSkuById",e),deleteSku:(t,e)=>t("sku/deleteSku",e)}),currentChange(t){this.CHANGE_LOADING(!0),this.CHANGE_PAGINATION({page:t}),this.skuListAsync(this.pagination)},sizeChange(t){this.CHANGE_LOADING(!0),this.CHANGE_PAGINATION({limit:t}),this.skuListAsync(this.pagination)},typedIndex(t){const{limit:e,page:a}=this.pagination;return e*(a-1)+t+1},sortDown(t){t.isSale=1,this.sortUpOnSale(t.id)},sortUp(t){t.isSale=0,this.sortDownCancelSale(t.id)},edit(){this.$message.closeAll(),this.$message("还不能使用")},handleClose(t){t()},inof(t){this.getSkuById(t.id).then((t=>{console.log({...this.drawerData}),this.drawer=!0})).catch((t=>{this.$message.closeAll(),this.$message({type:"error",message:t})}))},del(t){console.log(t),this.deleteSku(t.id)}},computed:{...(0,n.rn)({pagination:t=>t.sku.pagination,skuList:t=>t.sku.skuList,loading:t=>t.sku.loading,drawerData:t=>t.sku.drawerData}),skuImageListLength(){return this.drawerData.skuImageList&&this.drawerData.skuImageList.length}},mounted(){this.skuListAsync(this.pagination)}},l=r,o=a(1001),c=(0,o.Z)(l,s,i,!1,null,"31e61b51",null),u=c.exports}}]);
//# sourceMappingURL=690.ea06bd82.js.map