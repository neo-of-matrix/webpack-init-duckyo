import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import App from "./App";
import Optimization from "./optimization";
import Long from "./longTask";
import Context from "./context";
import Memo from "./memo";
import MemoComponent from "./memo/components";
import ReducerComponent from "./reducer";
import ReduxComponent from "./redux";
import Effect from "./effect";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/long",
    Component: Long,
  },
  {
    path: "/optimization",
    Component: Optimization,
  },
  {
    path: "/context",
    Component: Context,
  },
  {
    path: "/lazy",
    async lazy() {
      const { Lazy } = await import("./lazy");
      return { Component: Lazy };
    },
  },
  {
    path: "/memo",
    Component: Memo,
    children: [
      {
        path: ":id",
        Component: MemoComponent,
      },
    ],
  },
  {
    path: "/useReducer",
    Component: ReducerComponent,
  },
  {
    path: "/redux",
    Component: ReduxComponent,
  },
  {
    path: "/effect",
    Component: Effect,
  },
]);

const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
