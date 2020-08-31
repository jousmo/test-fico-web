import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"

export function IndicatorItem({data, onDelete, onEdit, readOnly}) {
  const {
    title = "Indicador sin título",
    description = "N/A",
    methodology = "N/A",
    baseline = "N/A",
    goal = "N/A",
    formula = "N/A",
    meansOfVerification = "N/A",
    key
  } = data

  return (
    <Card key={`indicator_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>
        {title || "Indicador sin título"}
      </Typography.Title>
      <Typography.Text type="secondary">
        {description || "N/A"}
      </Typography.Text>
      <br />
      <Typography.Text strong>Metodología: </Typography.Text>
      <Typography.Text>
        {methodology || "N/A"}
      </Typography.Text>
      <br />
      <Typography.Text strong>Línea base: </Typography.Text>
      <Typography.Text>{baseline || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Formula: </Typography.Text>
      <Typography.Text>{formula || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Medio de verificación: </Typography.Text>
      <Typography.Text>{meansOfVerification || "N/A"}</Typography.Text>
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
