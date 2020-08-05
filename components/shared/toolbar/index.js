import { PageHeader } from "antd"
import { MenuUnfoldOutlined } from "@ant-design/icons"
import UserHeader from "./user-header"
import { PageContext } from "../../../contexts/page"
import { useContext } from "react"

function Toolbar({subheader}) {
  const { title, actions, step } = useContext(PageContext)

  subheader = typeof subheader === "function" ?
    subheader({title, actions, step}) :
    subheader

  if (subheader !== false){
    subheader = subheader || <PageHeader title={title} extra={actions} />
  }

  return (
    <div>
      <PageHeader
        backIcon={<MenuUnfoldOutlined />}
        extra={<UserHeader />}>
        {subheader}
      </PageHeader>
    </div>
  )
}

export { Toolbar }
