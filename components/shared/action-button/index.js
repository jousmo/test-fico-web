import { Button, Menu, Dropdown } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

export function ActionButton({onRecovery, onEdit, onDelete, role, ...props}) {
  const menu = (
    <Menu>
      <Menu.Item onClick={onRecovery}>
        Recuperar contraseña
      </Menu.Item>
      {role === "ADMIN" && (
        <Menu.Item onClick={onEdit}>
          Cambiar a implementadora
        </Menu.Item>
      )}
      <Menu.Item onClick={onDelete}>
        Desactivar cuenta
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
