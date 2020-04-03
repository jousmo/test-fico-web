import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"

export function IndicatorItem({data, onDelete, onEdit}) {
  const {
    title,
    description,
    methodology,
    baseLine,
    goal,
    formula,
    inputs,
    meansOfVerification,
    key
  } = data

  return (
    <Card key={`indicator_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text type="secondary">
        {description}
      </Typography.Text>
      <br />
      <Typography.Text strong>Metodología: </Typography.Text>
      <Typography.Text>
        {`${methodology}`}
      </Typography.Text>
      <br />
      <Typography.Text strong>Linea base: </Typography.Text>
      <Typography.Text>{baseLine}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Formula: </Typography.Text>
      <Typography.Text>{formula}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Insumos: </Typography.Text>
      <Typography.Text>{inputs}</Typography.Text>
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
