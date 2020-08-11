import { Alert, Col, Divider, Row, Statistic } from "antd"
import { SearchFieldPrimary } from "../../../../../shared/search-field-primary"
import { Section } from "../../../../../shared/section"

export function Expense () {
  return (
    <div className="financial">
      <Alert
        type="info"
        showIcon
        message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen,
                     solo se admiten facturas emitidas a tu organización" />
      <SearchFieldPrimary style={{marginTop: "1rem"}} />
      <Section style={{padding: 0, margin: "1rem 0"}}>
        <Row>
          <Col flex="auto">
            <Statistic title="Presupuesto a FICOSEC" value="$189,436.00" />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic title="Comprobado a FICOSEC" value="$456.00" />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic
              title="Diferencia" value="$188,980.00"
              valueStyle={{ color: "#cf1322" }} />
          </Col>
        </Row>
      </Section>
    </div>
  )
}