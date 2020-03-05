import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

export const extra = [
  <Button
    type="link"
    shape="circle"
    icon={<SearchOutlined />} />,
  <Button
    type="link"
    shape="circle"
    icon={<BellOutlined />} />,
  <span>
    <Avatar size="large" />
    Username
  </span>
]
