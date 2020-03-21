import { PageHeader } from "antd"
import { MenuUnfoldOutlined } from "@ant-design/icons"
import { extra } from "./extra"
import { PageContext } from "../../../contexts/page"
import { useContext } from "react"

function Toolbar({subheader}) {
  const { title, actions } = useContext(PageContext)

  subheader = typeof subheader === "function" ?
    subheader({title, actions}) :
    subheader

  subheader = subheader || <PageHeader title={title} extra={actions} />

  return (
    <div>
      <PageHeader
        backIcon={<MenuUnfoldOutlined />}
        extra={extra}>
        {subheader}
      </PageHeader>
    </div>
  )
}

export { Toolbar }
