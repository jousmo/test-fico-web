import { Typography } from 'antd';

function ActivityTooltip({ activity }) {
  return (
    <div>
      <Typography.Text strong>Actividad</Typography.Text><br/>
      <Typography.Text type="secondary">{activity.description}</Typography.Text><br/>
      <Typography.Text strong>Meta</Typography.Text><br/>
      <Typography.Text type="secondary">{activity.goal} Asistentes</Typography.Text><br/>
      <Typography.Text strong>Medida de Verificación</Typography.Text><br/>
      <Typography.Text type="secondary">{activity.meansOfVerification}</Typography.Text><br/>
      <Typography.Text strong>Presupuesto designado</Typography.Text><br/>
      <Typography.Text type="secondary">${activity.baseline}</Typography.Text><br/>
    </div>
  )
}

export default ActivityTooltip