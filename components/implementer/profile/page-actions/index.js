import { Button } from "antd"

export function PageActions({save}) {
  return (
    <Button onClick={() => { save() }}>Guardar</Button>
  )
}
