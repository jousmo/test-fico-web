import { List, Space } from "antd"
import { MailOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, IconLabel } from "../../../shared"

export function UserItem ({ user }) {
  return (
    <List.Item>
      <div onClick={null}>
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
      </div>
    </List.Item>
  )
}
