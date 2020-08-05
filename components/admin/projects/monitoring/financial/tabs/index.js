import { Tabs, Alert, Input } from "antd"
import "./style.sass"

export function MonitoringFinancialTabs() {
  return (
    <Tabs defaultActiveKey="1" className="monitoring">
      <Tabs.TabPane tab="Gastos" key="1">
        <div style={{margin: "0 1rem"}}>
          <Alert
            message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen,
                     solo se admiten facturas emitidas a tu organización"
            type="info"
            showIcon
          />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Resumen conceptos" key="2">
        <div style={{margin: "0 1rem"}}>
          <Input.Search placeholder="Buscar" enterButton/>
        </div>
      </Tabs.TabPane>
    </Tabs>
  )
}