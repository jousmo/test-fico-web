import { PageHeader } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons"
import { extra } from "./extra"

export function Toolbar() {
  return (
    <div>
      <PageHeader
        backIcon={<MenuUnfoldOutlined />}
        extra={extra}>
        <PageHeader title="Perfil de la implementadora" />
      </PageHeader>
    </div>
  )
}
