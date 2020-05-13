import { Typography } from "antd"
import { Section } from "../../../../../shared"
import DevelopmentObjectiveIndicatorPDF from "./indicators"

export default function DevelopmentObjectivePDF({ description, indicators }){
  return (
    <Section title="Objetivo de desarrollo">
      <Typography.Text>
        {description}
      </Typography.Text>
      <Typography.Title level={4}>
        Indicadores
      </Typography.Title>
      {indicators?.map((indicator, index) => (
        <DevelopmentObjectiveIndicatorPDF indicator={indicator} key={index} />
      ))}
    </Section>
  )
}