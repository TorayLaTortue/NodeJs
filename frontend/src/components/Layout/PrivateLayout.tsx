import { useAppDispatch } from "@/app/store"
import { removeCredentials } from "@/features/user/userSlice";
import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

export const PrivateLayout = (props: PropsWithChildren) => {
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(removeCredentials());
    }

    return (
        <div style={{ background: 'red' }} className="private-layout">
          <div className="sidebar">
            <Link to="/dashboard/profile">Mon profil</Link>
            <Link to="/dashboard/command">Mes commandes</Link>
            <a href="#" onClick={logout}>Logout</a>
          </div>
          {props.children}
        </div>
    )
}