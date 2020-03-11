import { Avatar, Button } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons"

export const extra = [
  <Button
    id="search"
    key="search-1"
    type="link"
    shape="circle"
    icon={<SearchOutlined />} />,
  <Button
    id="notifications"
    key="notifications-2"
    type="link"
    shape="circle"
    icon={<BellOutlined />} />,
  <span
    key="avatar-3"
    id="user_avatar">
    <Avatar size="large" />
    Username
  </span>
]
