import { Button, Menu, Dropdown } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

export function ActionButton({ onAlias, onRecovery, onEdit, onDisabled, role, disabled, ...props }) {
  const menu = (
    <Menu>
      <Menu.Item onClick={onAlias}>
        Cambiar alias
      </Menu.Item>
      <Menu.Item onClick={onRecovery}>
        Recuperar contraseña
      </Menu.Item>
      {role === "ADMIN" && (
        <Menu.Item onClick={onEdit}>
          Cambiar a implementadora
        </Menu.Item>
      )}
      <Menu.Item onClick={onDisabled}>
        {!disabled ? "Desactivar cuenta" : "Activar cuenta"}
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
