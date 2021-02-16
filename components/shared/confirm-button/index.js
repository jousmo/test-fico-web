import { Popconfirm, Button } from "antd"

export function ConfirmButton({
  icon,
  onClick,
  confirmText,
  style,
  ...props
}) {
  return (
    <Popconfirm
      title={confirmText}
      onConfirm={onClick}
      okText="Aceptar"
      cancelText="Cancelar">
      <Button
        style={{...style}}
        icon={icon}
        {...props} />
    </Popconfirm>
  )
}
