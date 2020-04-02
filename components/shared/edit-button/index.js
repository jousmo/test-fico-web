import { Button } from "antd"
import { EditOutlined } from "@ant-design/icons"

export function EditButton({
  onClick,
  style
}) {
  return (
    <Button
      onClick={onClick}
      style={{float: "right", ...style}}
      shape="circle"
      icon={<EditOutlined />} />
  )
}
