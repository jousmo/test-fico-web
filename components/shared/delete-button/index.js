import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export function DeleteButton({
  onClick,
  confirmText="Confirma que deseas eliminar este elemento",
  style
}) {
  return (
    <Popconfirm title={confirmText}
      onConfirm={onClick}
      okText="Eliminar"
      cancelText="Cancelar">
      <Button
        style={{float: "right", ...style}}
        shape="circle"
        icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
