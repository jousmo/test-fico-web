import "./style.sass"
import { useContext } from "react"
import { PageContext } from "../../../contexts/page"
import AdminMenu from "./admin-menu"

export function MainMenu() {
  const { type, step, submenu } = useContext(PageContext)

  if (type === "implementer"){
    //Todo: Return Implementer menu
    return
  }

  return <AdminMenu step={step} submenu={submenu} />
}
