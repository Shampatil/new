!function(e,n,r){"use strict";function t(e,n){return("string"==typeof n||n instanceof String)&&(n=new RegExp(n)),n instanceof RegExp?n.test(e):n&&Array.isArray(n.and)?n.and.every(function(n){return t(e,n)}):n&&Array.isArray(n.or)?n.or.some(function(n){return t(e,n)}):n&&n.not?!t(e,n.not):!1}function o(e,n){return("string"==typeof n||n instanceof String)&&(n=new RegExp(n)),n instanceof RegExp?n.exec(e):n&&Array.isArray(n)?n.reduce(function(n,r){return n?n:o(e,r)},null):null}r&&r.module("reTree",[]).factory("reTree",[function(){return{test:t,exec:o}}]),n&&(n.reTree={test:t,exec:o}),e&&(e.exports={test:t,exec:o})}("undefined"==typeof module?null:module,"undefined"==typeof window?null:window,"undefined"==typeof angular?null:angular);