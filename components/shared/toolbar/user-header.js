import { Button, Dropdown, Menu, Space } from "antd"
import { useState, useEffect } from "react"
import { BellOutlined, UserOutlined } from "@ant-design/icons"

function UserHeader(){
  const [userState, setUserState] = useState(undefined)

  useEffect(() => {
    const { claims } = JSON.parse(localStorage.getItem("user"))
    setUserState(claims.name)
  }, [])

  const menu = (
    <Menu>
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
        {userState}
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
