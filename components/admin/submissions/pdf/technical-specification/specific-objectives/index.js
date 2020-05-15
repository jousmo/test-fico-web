import { Typography } from "antd"
import { Section } from "../../../../../shared"
import ObjectiveIndicatorPDF from "../objective/indicators"
import ActivitiesPDF from "./activities"

export default function SpecificObjectivePDF({ index, objective }){
   return (
    <Section title={`Objetivo específico ${index}`}>
      <Typography.Text>
        {objective.description}
      </Typography.Text>
      <Typography.Title level={4}>
        Indicadores
      </Typography.Title>
      {objective?.indicators?.map((indicator, index) => (
        <ObjectiveIndicatorPDF indicator={indicator} key={index} />
      ))}
      <Typography.Title level={4}>
        Actividades
      </Typography.Title>
      {objective?.activities?.map((activity, index) => (
        <ActivitiesPDF activity={activity} key={index} />
      ))}
    </Section>
   )
}