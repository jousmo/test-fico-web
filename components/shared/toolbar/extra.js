import { Avatar, Button } from "antd";

export const extra = [
  <Button
    id="search"
    type="link"
    shape="circle"
    icon="search_outlined" />,
  <Button
    id="notifications"
    type="link"
    shape="circle"
    icon="bell_outlined" />,
  <span id="user_avatar">
    <Avatar size="large" />
    Username
  </span>
]
