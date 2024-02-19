import React from "react";
export const lazyload = (componentPath) => {
  // if(componentPath)
  const Component = React.lazy(() => import("@/views/" + componentPath));
  return () => (
    <React.Suspense fallback={<div>正在加载</div>}>
      <Component />
    </React.Suspense>
  );
};
