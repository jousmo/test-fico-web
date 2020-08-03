import { Popconfirm, Button } from "antd";

export function ConfirmButton({
  icon,
  onClick,
  confirmText,
  style
}) {
  return (
    <Popconfirm
      title={confirmText}
      onConfirm={onClick}
      okText="Aceptar"
      cancelText="Cancelar">
      <Button
        style={{...style}}
        shape="circle"
        icon={icon} />
    </Popconfirm>
  )
}
