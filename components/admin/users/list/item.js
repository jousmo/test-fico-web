import { List, Space } from "antd"
import { MailOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, IconLabel } from "../../../shared"
import { ActionButton } from "../../../shared/action-button"

export function UserItem ({ user, onRecovery, onEdit }) {
  const ROLES = {
    "IMPLEMENTER": "Implementadora",
    "ADMIN": "Administrador"
  }

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{user?.displayName}</Avatar>}
        title={user?.displayName}
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
          </>
        } />
      <ActionButton
        role={user?.role}
        onRecovery={() => onRecovery(user?.email)}
        onEdit={() => onEdit(user?.id)}
        onDelete={null}
      />
    </List.Item>
  )
}
