!function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=103)}({103:function(e,t,o){"use strict";o.r(t);o(104);var n=o(15),i=document.querySelector(".footer__date");new n.a("dark").addListeners();var r=(new Date).getFullYear();i.insertAdjacentHTML("afterBegin",r)},104:function(e,t,o){},15:function(e,t,o){"use strict";function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}o.d(t,"a",(function(){return i}));var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.headerBlock=document.querySelector(".header"),this.mobileMenuButton=document.querySelector(".header__mobile-button"),this.mobileMenuContainer=document.querySelector(".header__wrap"),this.logo=document.querySelector(".header__logo"),this.page=document.querySelector(".page"),this.popup=document.querySelector(".popup__container"),this.render=this.render.bind(this),this.color=t}var t,o,i;return t=e,(o=[{key:"render",value:function(){this.toggleMobileMenu(),this.mobileMenuContainer.classList.contains("header__wrap_open")?("dark"===this.color&&(this.changeColor(),this.logo.style.color="white",console.log(this.logo)),this.toggleMobileMenuIcon(),this.headerBlock.classList.toggle("header_fixed"),this.blockPage()):("dark"===this.color&&(this.changeColor(),this.logo.style.color="black"),this.toggleMobileMenuIcon(),this.headerBlock.classList.toggle("header_fixed"),this.unblockPage(),this.removeListeners())}},{key:"toggleMobileMenuIcon",value:function(){this.mobileMenuButton.classList.toggle("header__mobile-button_close"),this.mobileMenuButton.classList.toggle("header__mobile-button_open")}},{key:"checkPopupVisible",value:function(){this.mobileMenuContainer.classList.contains("header__wrap_open")&&(this.toggleMobileMenu(),this.headerBlock.classList.remove("header_fixed"),this.mobileMenuButton.classList.add("header__mobile-button_open"))}},{key:"changeColor",value:function(){this.mobileMenuButton.classList.toggle("header__mobile-button_dark"),this.mobileMenuButton.classList.toggle("header__mobile-button_light")}},{key:"toggleMobileMenu",value:function(){this.mobileMenuContainer.classList.toggle("header__wrap_open"),this.mobileMenuContainer.classList.toggle("header__wrap_close")}},{key:"hideMobileMenuIcon",value:function(){this.mobileMenuButton.style.display="none"}},{key:"showMobileMenuIcon",value:function(){"dark"===this.color&&this.changeColor(),this.mobileMenuButton.style.display="block",this.mobileMenuButton.classList.add("header__mobile-button_open"),this.mobileMenuButton.classList.remove("header__mobile-button_close")}},{key:"blockPage",value:function(){this.page.style.overflow="hidden"}},{key:"unblockPage",value:function(){this.page.style.removeProperty("overflow")}},{key:"addListeners",value:function(){this.mobileMenuButton.addEventListener("click",this.render.bind(this))}},{key:"removeListeners",value:function(){this.mobileMenuButton.removeEventListener("click",this.render.bind(this))}}])&&n(t.prototype,o),i&&n(t,i),e}()}});