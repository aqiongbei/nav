(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Home"],{"2f67":function(t,e,i){},5319:function(t,e,i){"use strict";var n=i("d784"),s=i("825a"),r=i("7b0b"),o=i("50c4"),a=i("a691"),l=i("1d80"),c=i("8aa5"),u=i("14c3"),h=Math.max,d=Math.min,m=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,f=/\$([$&'`]|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,i,n){var _=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=n.REPLACE_KEEPS_$0,w=_?"$":"$0";return[function(i,n){var s=l(this),r=void 0==i?void 0:i[t];return void 0!==r?r.call(i,s,n):e.call(String(s),i,n)},function(t,n){if(!_&&g||"string"===typeof n&&-1===n.indexOf(w)){var r=i(e,t,this,n);if(r.done)return r.value}var l=s(t),m=String(this),p="function"===typeof n;p||(n=String(n));var f=l.global;if(f){var b=l.unicode;l.lastIndex=0}var $=[];while(1){var y=u(l,m);if(null===y)break;if($.push(y),!f)break;var x=String(y[0]);""===x&&(l.lastIndex=c(m,o(l.lastIndex),b))}for(var E="",S=0,C=0;C<$.length;C++){y=$[C];for(var I=String(y[0]),D=h(d(a(y.index),m.length),0),L=[],T=1;T<y.length;T++)L.push(v(y[T]));var A=y.groups;if(p){var P=[I].concat(L,D,m);void 0!==A&&P.push(A);var F=String(n.apply(void 0,P))}else F=k(I,m,D,L,A,n);D>=S&&(E+=m.slice(S,D)+F,S=D+I.length)}return E+m.slice(S)}];function k(t,i,n,s,o,a){var l=n+t.length,c=s.length,u=f;return void 0!==o&&(o=r(o),u=p),e.call(a,u,(function(e,r){var a;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return i.slice(0,n);case"'":return i.slice(l);case"<":a=o[r.slice(1,-1)];break;default:var u=+r;if(0===u)return e;if(u>c){var h=m(u/10);return 0===h?e:h<=c?void 0===s[h-1]?r.charAt(1):s[h-1]+r.charAt(1):e}a=s[u-1]}return void 0===a?"":a}))}}))},5577:function(t,e,i){"use strict";var n=i("2f67"),s=i.n(n);s.a},"81d3":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"links-wrapper"},t._l(t.data,(function(e){return i("a",{staticClass:"item-wrapper",attrs:{href:e.link,target:"_blank"},on:{touchstart:function(i){return i.stopPropagation(),t.t_start(e)},touchmove:t.t_move,touchend:t.t_end}},[i("Icon",{staticClass:"icon",attrs:{type:"md-open"}}),i("h5",{staticClass:"title"},[t._v(t._s(e.name))]),i("p",{staticClass:"link"},[t._v(t._s(t.getDomain(e.link)))])],1)})),0)},s=[],r=(i("ac1f"),i("5319"),i("1276"),{name:"Links",props:{data:{type:Array,default:function(){return[]}}},data:function(){return{timer:0,touch_item:{}}},methods:{t_start:function(t){this.touch_item=t,clearTimeout(this.timer),this.timer=setTimeout(this.notice,500)},t_move:function(){clearTimeout(this.timer)},t_end:function(){clearTimeout(this.timer)},notice:function(){this.$emit("long-touch",JSON.parse(JSON.stringify(this.touch_item)))},getDomain:function(t){return t.replace(/(https|http):\/\//,"").split("/")[0]}}}),o=r,a=(i("5577"),i("2877")),l=Object(a["a"])(o,n,s,!1,null,null,null);e["a"]=l.exports},"8d91":function(t,e,i){},bb51:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-wrapper"},[t.list.length?i("Links",{attrs:{data:t.list},on:{"long-touch":t.longtouchHandler}}):i("div",{staticClass:"no-data-info"},[i("h5",[t._v("空")]),i("p",[t._v("我的天呐!这里有个大写的空"),i("br"),t._v("赶紧去"),i("span",{on:{click:function(e){return t.openDialog("new")}}},[t._v("添加链接")]),t._v("吧")])]),i("Button",{staticClass:"add-btn",attrs:{shape:"circle",icon:"md-add",type:"primary"},on:{click:function(e){return t.openDialog("new")}}}),i("Modal",{attrs:{"class-name":"form-modal-wrapper"},model:{value:t.show_modal,callback:function(e){t.show_modal=e},expression:"show_modal"}},[i("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[t.is_edit?i("span",[t._v("修改 或者 删除 ?")]):i("span",[t._v("新建一个导航链接")])]),i("div",[i("Form",{ref:"form",attrs:{model:t.show_item,rules:t.rules}},[i("FormItem",{attrs:{prop:"name"}},[i("Input",{attrs:{type:"text",placeholder:"请输入网站名称"},model:{value:t.show_item.name,callback:function(e){t.$set(t.show_item,"name","string"===typeof e?e.trim():e)},expression:"show_item.name"}},[i("Icon",{attrs:{slot:"prepend",type:"md-create"},slot:"prepend"})],1)],1),i("FormItem",{attrs:{prop:"link"}},[i("Input",{attrs:{placeholder:"请输入网站链接"},model:{value:t.show_item.link,callback:function(e){t.$set(t.show_item,"link","string"===typeof e?e.trim():e)},expression:"show_item.link"}},[i("Icon",{attrs:{slot:"prepend",type:"ios-link"},slot:"prepend"})],1)],1)],1)],1),i("div",{attrs:{slot:"footer"},slot:"footer"},[t.is_edit?i("Button",{staticClass:"btn-error",attrs:{type:"text"},on:{click:t.remove}},[t._v("删除")]):t._e(),i("Button",{class:[!t.is_edit&&"long-btn"],attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")])],1)])],1)},s=[],r=i("81d3"),o={name:"Home",components:{Links:r["a"]},data:function(){return{list:[],is_edit:!1,show_modal:!1,show_item:{},rules:{name:[{required:!0,message:"咋回事小老弟,网站名称咋为空呢?"}],link:[{required:!0,message:"咋回事小老弟,网站链接咋为空呢?"},{type:"url",trigger:"blur",message:"你的这个网站链接好像有点不对劲儿唉"}]}}},watch:{$route:function(){this.getLinks()}},created:function(){this.getLinks()},methods:{longtouchHandler:function(t){this.show_item=t,this.openDialog("edit")},openDialog:function(t){"new"==t?(this.is_edit=!1,this.show_item={}):this.is_edit=!0,this.show_modal=!0,this.$refs.form.resetFields()},closeDialog:function(){this.show_item={},this.show_modal=!1},getLinks:function(){this.list=this.$links.get()},save:function(){var t=this;this.$refs.form.validate((function(e){e&&(t.is_edit?t.$links.update(t.show_item):t.$links.insert([t.show_item]),t.getLinks(),t.closeDialog())}))},remove:function(){this.$links.remove(this.show_item.id),this.getLinks(),this.closeDialog()}}},a=o,l=(i("de16"),i("2877")),c=Object(l["a"])(a,n,s,!1,null,null,null);e["default"]=c.exports},de16:function(t,e,i){"use strict";var n=i("8d91"),s=i.n(n);s.a}}]);
//# sourceMappingURL=Home.26dd29e8.js.map