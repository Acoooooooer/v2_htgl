"use strict";(self["webpackChunkv2_htxt"]=self["webpackChunkv2_htxt"]||[]).push([[968],{64968:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"label-position":"left"},nativeOn:{submit:function(e){e.preventDefault()}}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[e._v("用户登录")])]),s("el-form-item",{attrs:{prop:"username"}},[s("span",{staticClass:"icon-container"},[s("span",{staticClass:"iconfont icon-yonghu"})]),s("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1",autocomplete:"off"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"icon-container"},[s("span",{staticClass:"iconfont icon-suo"})]),s("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"off"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin.apply(null,arguments)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[s("span",{class:["iconfont","icon-"+(e.passwordType?"biyan":"yanjing")]})])],1),s("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin.apply(null,arguments)}}},[e._v("登录")]),s("div",{staticClass:"tips"},[s("span",{staticStyle:{"margin-right":"20px"}},[e._v("管理权限")]),s("span",{staticStyle:{"margin-right":"20px"}},[e._v(" username: "),s("span",{staticClass:"user"},[e._v("admin")])]),s("span",[e._v(" password: "),s("span",{staticClass:"pwd"},[e._v("111111")])])]),s("div",{staticClass:"tips"},[s("span",{staticStyle:{"margin-right":"20px"}},[e._v("普通权限")]),s("span",{staticStyle:{"margin-right":"20px"}},[e._v(" username: "),s("span",{staticClass:"user"},[e._v("wode")])]),s("span",[e._v("  password: "),s("span",{staticClass:"pwd"},[e._v("111111")])])])],1)],1)},a=[],r=s(93019),i=(s(21703),s(74549)),o=s(34665),l={name:"LoinIndex",data:function(){var e=function(e,t,s){t?s():s(new Error("Please enter the correct user name"))},t=function(e,t,s){t.length<6?s(new Error("The password can not be less than 6 digits")):s()};return{loginForm:{username:"admin",password:"111111"},loginRules:{username:[{required:!0,trigger:"change",validator:e}],password:[{required:!0,trigger:"change",validator:t}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query.redirect},immediate:!0}},computed:(0,r.Z)({},(0,o.rn)({routeStr:function(e){return e.user.routeStr}})),methods:(0,r.Z)((0,r.Z)((0,r.Z)({},(0,o.OI)({CHANEG_ROUTESTR:function(e,t){return e("user/CHANEG_ROUTESTR",t)}})),(0,o.nv)({login:function(e,t){return e("user/login",t)},permission:function(e,t){return e("user/permission",t)}})),{},{aaa:function(){this.permission()},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return(0,i.Message)("请完成表单"),!1;e.loading=!0,e.login(e.loginForm).then((function(t){sessionStorage.setItem("path",e.redirect||"/"),e.$router.push({path:e.redirect||"/"}),e.loading=!1})).catch((function(t){console.log(t),(0,i.Message)({type:"error",message:t}),e.loading=!1}))}))}})},p=l,c=s(1001),u=(0,c.Z)(p,n,a,!1,null,"823b7afa",null),d=u.exports}}]);
//# sourceMappingURL=968-legacy.d1c4ee84.js.map