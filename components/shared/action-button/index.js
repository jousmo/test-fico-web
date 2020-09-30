import React from "react"
import { Button, Menu, Dropdown } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

export function ActionButton({onDelete, ...props}) {
  const menu = (
    <Menu>
      <Menu.Item onClick={onDelete}>
        Eliminar
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        shape="circle"
        icon={<EllipsisOutlined />}
        {...props} />
    </Dropdown>
  )
}
