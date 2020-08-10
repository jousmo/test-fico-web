import { Section } from "../../../../../shared/section"
import { Alert, Col, Divider, Row, Statistic } from "antd"
import { SearchFieldPrimary } from "../../../../../shared/search-field-primary"

export function MonitoringObjectives() {
  return (
    <div className="objectives" style={{ marginTop: "-2.5rem"}}>
      <Section style={{ padding: 0, margin: "1rem 0" }}>
        <Row>
          <Col flex="auto">
            <Statistic title="Meta" value="90" />
          </Col>
          <Col span={1} style={{textAlign: "center"}}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic title="Real" value="45" />
          </Col>
          <Col span={1} style={{textAlign: "center"}}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic
              value="50%"
              title="Cumplimiento"
              valueStyle={{ color: "#cf1322" }} />
          </Col>
        </Row>
      </Section>
      <SearchFieldPrimary style={{marginBottom: "1rem"}} />
      <Alert
        type="info"
        showIcon
        message="Selecciona las actividades que hayas realizado, espeficica
            cuántos participantes tuviste en cada una y cúantos beneficiarios
            atendiste de acuerdo a los objetivos específicos y generales" />
    </div>
  )
}
