import module from "./module.ts";
import "./index.css";
import webpackSVG from "../../public/images/webpack.svg";
module();

function onloadImg(pic) {
  const img = createElement("img");
  img.setAttribute("src", pic);
  img.setAttribute("width", 100);
  document.body.appendChild(img);
}
onloadImg(webpackSVG);
function createElement(element, word) {
  const ele = document.createElement(element);
  ele.innerHTML = word;
  document.body.appendChild(ele);
  return ele;
}
createElement("div", "文字");
const button = createElement("button", "异步加载");
button.addEventListener("click", function () {
  // 异步加载 show.js
  import("../../public/images/webpack.jpg").then(({ default: webpackJPG }) => {
    console.log(webpackJPG);
    onloadImg(webpackJPG);
  });
});
