// ==UserScript==
// @name         快岸漫画3秒自动机
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  打开图片页3秒跳一个快岸图片
// @author       hunzsig
// @match        *://www.kanbook.net/*
// @icon         http://www.kanbook.net/static/comic_kanbook/images/favicon.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  document.body.style.background = "#272727";

  function down() {
    let s = document.getElementById("img_c_0").src;
    let ss = s.split(".")
    let suffix = ss[ss.length - 1]
    if (suffix === "jpg" || suffix === "png" || suffix === "webp") {
      let u = document.URL.split("/");
      let n = "";
      if (u.length >= 6) {
        n = u[3] + "_" + u[4] + "_" + u[5] + "_" + (u[6] || "1");
      }
      fetch(s).then(res => res.blob().then(blob => {
        let a = document.createElement('a');
        let p = window.URL.createObjectURL(blob);
        console.log(p);
        a.href = p;
        a.download = n + "." + suffix;
        a.click();
        window.URL.revokeObjectURL(p);
      }))
      return true
    }
    return false
  }

  let t = window.setInterval(function () {
    if (down()) {
      window.clearInterval(t);
      window.setTimeout(function () {
        document.getElementById("right").click();
      }, 3000)
    }
  }, 100)

})();
