import React, { PropsWithChildren } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBarHome from "../NavBar/AppBarHome";
import Home from "@mui/icons-material/Home";

export const PublicLayout = (props: PropsWithChildren) => {
  return (
    <div style={{ background: 'black' }} className="public-layout">
        <ResponsiveAppBarHome />
        {props.children}
    </div>
  );
};

export default PublicLayout;
