import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"

export function ActivityItem({data, onDelete, onEdit}) {
  const {
    title="Indicador sin título",
    description="N/A",
    methodology="N/A",
    baseline="N/A",
    goal="N/A",
    formula="N/A",
    inputs,
    meansOfVerification="N/A",
    key
  } = data

  const formatInputs = inputs => {
    if(!inputs?.length) {
      return "N/A"
    }

    return `${inputs.join(", ")}.`
  }

  return (
    <Card key={`indicator_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text type="secondary">
        {description}
      </Typography.Text>
      <br />
      <Typography.Text strong>Metodología: </Typography.Text>
      <Typography.Text>
        {methodology}
      </Typography.Text>
      <br />
      <Typography.Text strong>Línea base: </Typography.Text>
      <Typography.Text>{baseline}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Formula: </Typography.Text>
      <Typography.Text>{formula}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Insumos: </Typography.Text>
      <Typography.Text>{formatInputs(inputs)}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Medio de verificación: </Typography.Text>
      <Typography.Text>{meansOfVerification}</Typography.Text>
      <DeleteButton
        onClick={onDelete}
        style={{marginLeft: "8px"}} />
      <EditButton onClick={onEdit} />
    </Card>
  )
}
