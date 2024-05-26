import { useAppDispatch } from "@/app/store"
import { removeUser } from "@/features/user/userSlice";
import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import ResponsiveAppBarPrivate from "../NavBar/AppBarPrivate";

export const PrivateLayout = (props: PropsWithChildren) => {

    return (
        <div style={{ background: 'black' }} className="private-layout">
            <ResponsiveAppBarPrivate />
          {props.children}
        </div>
    )
}