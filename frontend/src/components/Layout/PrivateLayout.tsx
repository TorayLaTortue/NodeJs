import { PropsWithChildren } from "react"
import ResponsiveAppBarHome from "../NavBar/AppBarPrivate";

export const PrivateLayout = (props: PropsWithChildren) => {

    return (
        <div style={{ background: 'black' }} className="private-layout">
            <ResponsiveAppBarHome />
          {props.children}
        </div>
    )
}