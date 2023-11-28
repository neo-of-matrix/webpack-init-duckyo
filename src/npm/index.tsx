// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./main.css";

// import App from "./App";

// const root = createRoot(document.getElementById("app"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// 导出该组件供给其它模块使用

export default function HelloWebpack() {
    return <h1 className="hello-component">Hello,Webpack</h1>
}