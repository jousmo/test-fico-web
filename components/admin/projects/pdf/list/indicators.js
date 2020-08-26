import { Col, Divider, Row, Typography } from "antd"
import { getGoalBeneficiaries } from "./helpers"

export function ProjectIndicators({ data }){
  const indicatorTypes = {
    IE: "Indicador específico",
    OD: "Indicador de desarrollo",
    OG: "Indicador general",
    AE: "Actividad",
  }

  const getIndicatorName = key => {
    const [indicator, number] = key.split("_")
    return `${indicatorTypes[indicator]} ${number}`
  }

  let totalB = 0

  return (
    <Row>
      <Col span={12}>
        <Typography.Text strong>Indicador de resultados final</Typography.Text>
      </Col>
      <Col span={8}>
        <Typography.Text strong>Meta</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text strong>Resultado</Typography.Text>
      </Col>
      <Divider />
      {data?.technicalMonitoringReports?.map(report => {
        totalB += report.completed
        return (
          <>
            <Col span={12}>{getIndicatorName(report.key)}</Col>
            <Col span={8}>{report.goal}</Col>
            <Col span={4}>{report.completed}</Col>
            <Divider />
          </>
        )
      })}
      <Col span={12}>Beneficiarios atendidos</Col>
      <Col span={8}>{getGoalBeneficiaries(data)}</Col>
      <Col span={4}>{totalB}</Col>
      <Divider />
    </Row>
  )
}
