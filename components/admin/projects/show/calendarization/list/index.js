import { Button, List, Typography } from "antd"
import { useRouter } from "next/router"

function CalendarizationList(){
  const router = useRouter() || {}
  const { query } = router || {}

  const userType = router?.route.includes("admin") ? "admin" : "implementer"

  return (
    <List>
      <List.Item
        actions={[
          <Button
            onClick={() => router.push(`/${userType}/projects/${query?.id}/schedule`)}
            style={{ backgroundColor: "#2593fc", color: "white" }}>
            Actualizar
          </Button>
        ]}>
        <Typography.Text>
          Agrega las actividades y eventos que sucederán durante tu próximo periodo de trabajo.
        </Typography.Text>
      </List.Item>
    </List>
  )
}

export default CalendarizationList
