import { withForm } from "../../../../../../helpers"
import { Button, List, Typography } from "antd"
import { useRouter } from "next/router"

function CalendarizationList({ data }){
  const router = useRouter() || {}
  const { query } = router || {}

  const userType = router?.route.includes("admin") ? "admin" : "implementer"

  return (
    <List>
      <Typography.Text>
        Agrega las actividades y eventos que sucederán durante tu próximo periodo de trabajo.
      </Typography.Text>
      <List.Item
        actions={[
          <Button
            onClick={() => router.push(`/${userType}/projects/${query?.id}/schedule`)}
            style={{ backgroundColor: "#2593fc", color: "white" }}>
            Actualizar
          </Button>
        ]}>
        <Typography.Text strong>
          Ultima actualización 10/01/2020
        </Typography.Text>
      </List.Item>
    </List>
  )
}

export default withForm(CalendarizationList)
