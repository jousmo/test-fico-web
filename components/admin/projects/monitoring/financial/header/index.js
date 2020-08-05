import { Typography, Tabs } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Section } from "../../../../../shared/section"

export function MonitoringFinancialHeader() {
  return (
    <Section style={{padding: 0, margin: "0 !important"}}>
      <Typography.Title level={2} style={{paddingLeft: "2rem", margin: 0}}>
        <ArrowLeftOutlined /> Monitoreo financiero
      </Typography.Title>
    </Section>
  )
}