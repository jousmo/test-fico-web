import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"
import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")

export function ActivityItem({data, onDelete, onEdit}) {
  const {
    description="N/A",
    responsible="N/A",
    baseline="N/A",
    goal="N/A",
    meansOfVerification="N/A",
    place="N/A",
    months="N/A",
    key
  } = data

  let formattedMonths = months

  if(Array.isArray(months)) {
    const ranges = months.map(value => {
      const range = Array
        .from(moment.range(value.months[0], value.months[1]).by("month"))
        .map(r => r.format("MMMM YYYY"))

      return range.join(", ")
    })

    formattedMonths = `| ${ranges.join(" | ")} |`
  }

  return (
    <Card key={`indicator_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>{description}</Typography.Title>
      <Typography.Text type="secondary">
        {responsible}
      </Typography.Text>
      <br />
      <Typography.Text strong>Línea base: </Typography.Text>
      <Typography.Text>{baseline}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Medio de verificación: </Typography.Text>
      <Typography.Text>{meansOfVerification}</Typography.Text>
      <br />
      <Typography.Text strong>Lugar de intervención: </Typography.Text>
      <Typography.Text>{place}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Mes de implementación: </Typography.Text>
      <Typography.Text>{formattedMonths}</Typography.Text>
      <DeleteButton
        onClick={onDelete}
        style={{marginLeft: "8px"}} />
      <EditButton onClick={onEdit} />
    </Card>
  )
}
