import React, { ReactNode } from "react";

interface LayoutPropsType {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: LayoutPropsType) => {
  return <div className="container">{children}</div>;
};

export default Layout;
