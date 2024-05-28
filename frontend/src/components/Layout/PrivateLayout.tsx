import { PropsWithChildren } from "react"
import ResponsiveAppBar from "../NavBar/AppBarPrivate";

export const PrivateLayout = (props: PropsWithChildren) => {

    return (
        <div style={{ background: 'black' }} className="private-layout">
            <ResponsiveAppBar />
          {props.children}
        </div>
    )
}