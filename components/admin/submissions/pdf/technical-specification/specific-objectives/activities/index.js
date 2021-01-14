import { Card, Descriptions, Typography } from "antd"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")


export default function ActivitiesPDF({ activity }){

  let formattedMonths = activity.months

  if(Array.isArray(activity.months)) {
    const range = Array
      .from(moment.range(activity.months[0], activity.months[1]).by("month"))
      ?.map(r => r.format("MMMM YYYY"))

    formattedMonths = `${range.join(", ")}.`
  }

  return (
    <Card>
      <Typography.Title level={4}>
        {activity.description}
      </Typography.Title>
      <Typography.Text>
        {activity.responsible}
      </Typography.Text>
      <Descriptions column={4}>
        <Descriptions.Item label="Línea base">
          {activity.baseline}
        </Descriptions.Item>
        <Descriptions.Item label="Meta">
          {activity.goal}
        </Descriptions.Item>
        <Descriptions.Item label="Fórmula">
          {activity.formula}
        </Descriptions.Item>
        <Descriptions.Item label="Medio de verificación">
          {activity.meansOfVerification}
        </Descriptions.Item>
        <Descriptions.Item label="Lugar de intervención">
          {activity.place}
        </Descriptions.Item>
        <Descriptions.Item label="Mes de implementación">
          {formattedMonths}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
