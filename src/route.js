import React, { createElement, useState } from "react";
import { Router, browserHistory, RouterContext } from "react-router";
import MLayout from "./layout";

const routePatches = [
  {
    path: "d",
    component: function DD() {
      const [msg, _setMsg] = useState("Hello");
      return <div> {msg}</div>;
    },
  },
];

window.PATCH_ROUTE = (route) => {
  console.log(78234, route[0].component.toString());
  if (Array.isArray(route)) {
    routePatches.push(
      ...route
      //   .map((it) => ({
      //   ...it,
      //   component: function useComponent() {
      //     return <it.component />;
      //   },
      // }))
    );
  } else {
    routePatches.push(route);
  }
  console.log(35, routePatches);
  const currentLocation = browserHistory.getCurrentLocation();
  console.log(435, currentLocation);
  browserHistory.replace(currentLocation);
};

export default function RouterIndex() {
  function getRoutes() {
    return [
      {
        path: "/",
        component: MLayout,
        getChildRoutes(partialNextState, cb) {
          cb(null, [
            // NOTE: GPU/CD 插件下线后没有管理界面的需要，考虑到不确定的需求暂时只隐藏入口
            // moduleManage,
            ...routePatches,
            // .map((r) => (r instanceof Function ? r() : r)),
          ]);
        },
      },
    ];
  }

  return <Router history={browserHistory} routes={getRoutes()} />;
}
