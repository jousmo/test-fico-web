import { List, Space } from "antd"
import { MailOutlined, UserOutlined, CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons"
import { Avatar, IconLabel } from "../../../shared"
import { ActionButton } from "../../../shared/action-button"
import Link from "next/link"

export function UserItem ({ user, onRecovery, onEdit, onDisabled }) {
  const ROLES = {
    "IMPLEMENTER": "Implementadora",
    "ADMIN": "Administrador"
  }

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{user?.displayName}</Avatar>}
        title={
          user?.role !== "ADMIN" ? (
            <Link href={`/admin/implementer/${user?.implementer?.id}`}>
              <a>{user?.displayName}</a>
            </Link>
          ) : user?.displayName
        }
        description={
          <>
            <IconLabel icon={<UserOutlined />}>
              {ROLES[user?.role]}
            </IconLabel>
            <Space style={{marginLeft: "1rem"}}>
              <IconLabel icon={<MailOutlined />}>
                {user?.email}
              </IconLabel>
            </Space>
            <Space style={{marginLeft: "1rem"}}>
              <IconLabel icon={!user?.disabled ? <CheckSquareOutlined /> : <CloseSquareOutlined />}>
                {!user?.disabled ? "Activo" : "Desactivado" }
              </IconLabel>
            </Space>
          </>
        } />
      <ActionButton
        role={user?.role}
        disabled={user?.disabled}
        onRecovery={() => onRecovery(user?.email)}
        onEdit={() => onEdit(user?.id)}
        onDisabled={() => onDisabled(user?.id, !user?.disabled)}
      />
    </List.Item>
  )
}
