import "./style.sass"
import { useContext } from "react"
import { PageContext } from "../../../contexts/page"
import AdminMenu from "./admin-menu"
import ImplementerMenu from "./implementer-menu"

export function MainMenu() {
  const { type, step, submenu } = useContext(PageContext)

  if (type === "implementer"){
    return <ImplementerMenu step={step} submenu={submenu} />
  }

  return <AdminMenu step={step} submenu={submenu} />
}
