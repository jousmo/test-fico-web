import { withForm } from "../../../../../../helpers"
import { Button, List, Typography } from "antd"
import { useRouter } from "next/router"
import moment from "moment"

function CalendarizationList({ data }){
  const router = useRouter() || {}
  const { query } = router || {}

  const latestUpdated = data?.Submission?.specificObjectives?.reduce((result, objective) => {
    objective.activities?.forEach(activity => {
      activity.schedules?.map(({ scheduledAt }) => {
        if (scheduledAt > result){
          result = scheduledAt
        }
      })
    })
    return result
  }, "")

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
          Fecha de ultima actividad agendada
          {latestUpdated !== "" && moment(latestUpdated).format("DD/MM/YYYY")}
        </Typography.Text>
      </List.Item>
    </List>
  )
}

export default withForm(CalendarizationList)
