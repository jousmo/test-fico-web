import { Button, Dropdown, Menu, Space } from "antd"
import { BellOutlined, UserOutlined } from "@ant-design/icons"
import { Logout } from "../../../helpers/auth/logout"
import { useAuth } from "../../../contexts/auth"

function UserHeader(){
  const { user } = useAuth()

  const menu = (
    <Menu onClick={Logout}>
      <Menu.Item key="0">
        Cerrar sesión
      </Menu.Item>
    </Menu>
  )

  return (
    <Space>
      <Button
        id="notifications"
        key="notifications-2"
        type="link"
        shape="circle"
        icon={<BellOutlined />} />
      <span
        key="avatar-3"
        id="user_avatar">
        {user?.claims?.name}
      </span>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          size="large"
          shape="circle"
          icon={<UserOutlined />} />
      </Dropdown>
    </Space>
  )
}

export default UserHeader
