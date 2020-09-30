import React from "react"
import { Button, Menu, Dropdown } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

export function ActionButton({onEdit, onDelete, ...props}) {
  const menu = (
    <Menu>
      <Menu.Item onClick={onEdit}>
        Editar
      </Menu.Item>
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
