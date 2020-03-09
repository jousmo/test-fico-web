import { PageHeader } from "antd"
import { MenuUnfoldOutlined } from "@ant-design/icons"
import { extra } from "./extra"
import { PageContext } from "../../../contexts/page"
import { useContext } from "react"

function Toolbar() {
  const { title, actions } = useContext(PageContext)

  return (
    <div>
      <PageHeader
        backIcon={<MenuUnfoldOutlined />}
        extra={extra}>
        <PageHeader
          title={title}
          extra={actions} />
      </PageHeader>
    </div>
  )
}

export { Toolbar }
