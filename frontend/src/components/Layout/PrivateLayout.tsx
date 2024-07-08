import { PropsWithChildren } from "react"
import ResponsiveAppBarAdmin from "../NavBar/AppBarAdmin"

export const PrivateLayout = (props: PropsWithChildren) => {

    return (
        <div style={{ background: 'primary.main' }} className="private-layout">
            <ResponsiveAppBarAdmin />
          {props.children}
        </div>
    )
}