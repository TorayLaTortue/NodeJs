import React, { PropsWithChildren } from "react";
import ResponsiveAppBar from "../NavBar/AppBar";

export const PublicLayout = (props: PropsWithChildren) => {
  return (
    <div style={{ background: 'black' }} className="public-layout">
        <ResponsiveAppBar />
        {props.children}
    </div>
  );
};

export default PublicLayout;
