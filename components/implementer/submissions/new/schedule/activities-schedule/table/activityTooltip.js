import { Typography } from "antd"

function ActivityTooltip({ activity = {} }) {
  const {
    description = "N/A",
    goal = "N/A",
    meansOfVerification = "N/A",
    baseline = "N/A"
  } = activity

  return (
    <div>
      <Typography.Text strong>Actividad</Typography.Text>
      <br />
      <Typography.Text type="secondary">{description}</Typography.Text>
      <br />
      <Typography.Text strong>Meta</Typography.Text>
      <br />
      <Typography.Text type="secondary">{goal}</Typography.Text>
      <br />
      <Typography.Text strong>Medida de Verificación</Typography.Text>
      <br />
      <Typography.Text type="secondary">{meansOfVerification}</Typography.Text>
      <br />
      <Typography.Text strong>Presupuesto designado</Typography.Text>
      <br />
      <Typography.Text type="secondary">${baseline}</Typography.Text>
    </div>
  )
}

export default ActivityTooltip