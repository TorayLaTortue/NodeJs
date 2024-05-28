import React, { PropsWithChildren } from "react";
import ResponsiveAppBarHome from "../NavBar/AppBarHome";

export const PublicLayout = (props: PropsWithChildren) => {
  return (
    <div style={{ background: 'black' }} className="public-layout">
        <ResponsiveAppBarHome />
        {props.children}
    </div>
  );
};

export default PublicLayout;
