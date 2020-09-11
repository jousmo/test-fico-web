import { Button, Dropdown, Menu, message, Space } from "antd"
import { useState, useEffect } from "react"
import { BellOutlined, UserOutlined } from "@ant-design/icons"
import { Logout } from "../../../helpers/auth/logout"
import { useRouter } from "next/router"

function UserHeader(){
  const router = useRouter()
  const [userState, setUserState] = useState(undefined)

  useEffect(() => {
    try {
      const { claims } = JSON.parse(localStorage.getItem("user"))
      setUserState(claims.name)
    }
    catch(e){
      router.push("/")
      message.warn("Favor de iniciar sesión")
    }
  }, [])

  const menu = (
    <Menu onClick={() => Logout()}>
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
