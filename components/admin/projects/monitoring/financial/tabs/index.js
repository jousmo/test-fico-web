import { Tabs, Alert, Statistic, Row, Col, Divider } from "antd"
import { SearchFieldPrimary, Section } from "../../../../../shared"
import "./style.sass"

export function MonitoringFinancialTabs() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Gastos" key="1">
        <div style={{margin: "0 1rem"}}>
          <Alert
            type="info"
            showIcon
            message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen,
                     solo se admiten facturas emitidas a tu organización"
          />
          <SearchFieldPrimary style={{marginTop: "1rem"}}/>
          <Section style={{padding: 0, margin: "1rem 0"}}>
            <Row>
              <Col flex="auto" style={{textAlign: "center"}}>
                <Statistic title="Presupuesto a FICOSEC" value="$189,436.00" />
              </Col>
              <Col span={1} style={{textAlign: "center"}}>
                <Divider type="vertical" style={{height: "100%"}}/>
              </Col>
              <Col flex="auto" style={{textAlign: "center"}}>
                <Statistic title="Comprobado a FICOSEC" value="$456.00" />
              </Col>
              <Col span={1} style={{textAlign: "center"}}>
                <Divider type="vertical" style={{height: "100%"}}/>
              </Col>
              <Col flex="auto" style={{textAlign: "center"}}>
                <Statistic title="Diferencia" value="$188,980.00" valueStyle={{ color: '#cf1322' }} />
              </Col>
            </Row>
          </Section>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Resumen conceptos" key="2">
        <SearchFieldPrimary style={{margin: "0 1rem"}}/>
      </Tabs.TabPane>
    </Tabs>
  )
}