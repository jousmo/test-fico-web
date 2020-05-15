import { Typography } from "antd"
import { Section } from "../../../../../shared"
import ObjectiveIndicatorPDF from "./indicators"

export default function ObjectivePDF({ description, indicators, title }){
  return (
    <Section title={title}>
      <Typography.Text>
        {description}
      </Typography.Text>
      <Typography.Title level={4}>
        Indicadores
      </Typography.Title>
      {indicators?.map((indicator, index) => (
        <ObjectiveIndicatorPDF indicator={indicator} key={index} />
      ))}
    </Section>
  )
}