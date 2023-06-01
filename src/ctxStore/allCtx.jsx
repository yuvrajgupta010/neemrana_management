"use client";

import AuthCtxProvider from "./authCtxProvider";
import StatusCtxProvider from "./statusCtxProvider";

const AllCtx = (props) => {
  return (
    <AuthCtxProvider>
      <StatusCtxProvider>{props.children}</StatusCtxProvider>
    </AuthCtxProvider>
  );
};

export default AllCtx;
