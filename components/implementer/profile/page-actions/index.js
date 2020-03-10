import { Button } from "antd"

export function PageActions({save}) {
  return (
    <Button
      onClick={() => { save() }}
      type="primary"
    >
      Guardar
    </Button>
  )
}
