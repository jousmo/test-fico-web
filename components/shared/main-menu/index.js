import "./style.sass"
import { Menu } from "antd";
import { InboxOutlined } from "@ant-design/icons"

export function MainMenu() {
  return (
    <Menu theme="dark" className="fico main-menu">
      <Menu.Item>
        <InboxOutlined />
        <span>Perfil de implementadora</span>
      </Menu.Item>
    </Menu>
  )
}
