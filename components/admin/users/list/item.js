import { List, Space } from "antd"
import { MailOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, IconLabel } from "../../../shared"
import { ActionButton } from "../../../shared/action-button"

export function UserItem ({ user }) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{user?.displayName}</Avatar>}
        title={user?.displayName}
        description={
          <>
            <IconLabel icon={<UserOutlined />}>
              {user?.role}
            </IconLabel>
            <Space style={{marginLeft: "1rem"}}>
              <IconLabel icon={<MailOutlined />}>
                {user?.email}
              </IconLabel>
            </Space>
          </>
        } />
      <ActionButton onDelete={null} />
    </List.Item>
  )
}
