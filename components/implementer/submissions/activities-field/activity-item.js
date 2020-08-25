import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"
import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")

export function ActivityItem({data, onDelete, onEdit, readOnly}) {
  const {
    description = "N/A",
    responsible = "N/A",
    baseline = "N/A",
    goal = "N/A",
    meansOfVerification = "N/A",
    place = "N/A",
    months = "N/A",
    title = "N/A",
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
      <Typography.Title level={4}>
        {title || "Actividad sin titulo"}
      </Typography.Title>
      <Typography.Text>{description || "N/A"}</Typography.Text>
      <br />
      <Typography.Text type="secondary">
        {responsible || "N/A"}
      </Typography.Text>
      <br />
      <Typography.Text strong>Línea base: </Typography.Text>
      <Typography.Text>{baseline || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Medio de verificación: </Typography.Text>
      <Typography.Text>{meansOfVerification || "N/A"}</Typography.Text>
      <br />
      <Typography.Text strong>Lugar de intervención: </Typography.Text>
      <Typography.Text>{place || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Mes de implementación: </Typography.Text>
      <Typography.Text>{formattedMonths || "N/A"}</Typography.Text>
      {!readOnly && (
        <>
          <DeleteButton
            onClick={onDelete}
            style={{marginLeft: "8px"}} />
          <EditButton onClick={onEdit} />
        </>
      )}
    </Card>
  )
}
