import { List, Typography, Button } from "antd"

function MonitoringList({ router }){
  const getButton = type => {
    const { query: { id } } = router
    const url = `/admin/projects/${id}/monitoring/${type}`

    return (
      <Button
        onClick={() => router.push(url)}
        style={{ backgroundColor: "#2593fc", color: "white" }}>
        Actualizar
      </Button>
    )
  }

  return (
    <List>
      <Typography.Text>
        Actualiza mensualmente los resultados de tus actividades y movimientos
        financieros para el análisis del progreso del proyecto.
      </Typography.Text>
      <List.Item actions={[getButton("financial")]}>
        <div>
          <Typography.Text strong>Monitoreo financiero</Typography.Text>
          <br />
          <Typography.Text>
            Facturación de conceptos y desgloce de gastos
          </Typography.Text>
        </div>
      </List.Item>
      <List.Item actions={[getButton("technical")]}>
        <div>
          <Typography.Text strong>Monitoreo técnico</Typography.Text>
          <br />
          <Typography.Text>
            Verificación de actividades y sus beneficiarios
          </Typography.Text>
        </div>
      </List.Item>
    </List>
  )
}

export default MonitoringList
