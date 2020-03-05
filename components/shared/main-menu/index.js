import { Menu } from "antd";
import { InboxOutlined } from "@ant-design/icons"

export function MainMenu() {
  return (
    <Menu theme="dark">
      <Menu.Item>
        <InboxOutlined />
        <span>Perfil de implementadora</span>
      </Menu.Item>
    </Menu>
  )
}
