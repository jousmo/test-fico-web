import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

export const deleteAction = (onDelete) => (text, record, index) => {
  return {
    children: <Button
      onClick={() => onDelete(index)}
      shape="circle"
      icon={<DeleteOutlined />} />
  }
}
