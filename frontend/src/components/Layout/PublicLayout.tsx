import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

export const PublicLayout = (props: PropsWithChildren) => {
    return (
        <div style={{ background: 'blue' }} className="public-layout">

          {props.children}
        </div>
    )
}