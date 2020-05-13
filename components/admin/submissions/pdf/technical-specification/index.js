import { Card, Descriptions, List, Typography } from "antd"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Section } from "../../../../shared"
import PDFHeading from "../heading"
import "../style.sass"

export function TechnicalSpecificationPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  const submission = submissionResult?.data?.Submission
  
  return (
    <div className="fico pdf technical-specification">
      <PDFHeading title="Especificación técnica" />
      <Section title="Objetivo de desarrollo">
        <Typography.Text>
          {submission?.developmentObjective}
        </Typography.Text>
        <Typography.Title level={4}>
          Indicadores
        </Typography.Title>
        {submission?.developmentObjectiveIndicators?.map(indicator => (
          <Card>
            <Typography.Title level={4}>
              {indicator.title}
            </Typography.Title>
            <Typography.Text>
              {indicator.narrativeSummary}
            </Typography.Text>
            <Descriptions column={4}>
              <Descriptions.Item label="Metodología" span={4}>
                {indicator.methodology}
              </Descriptions.Item>
              <Descriptions.Item label="Línea base">
                {indicator.baseline}
              </Descriptions.Item>
              <Descriptions.Item label="Meta">
                {indicator.goal}
              </Descriptions.Item>
              <Descriptions.Item label="Formula">
                {indicator.formula}
              </Descriptions.Item>
              <Descriptions.Item label="Insumos">
                {indicator.inputs.length}
              </Descriptions.Item>
              <Descriptions.Item label="Medio de verificación">
                {indicator.meansOfVerification}
              </Descriptions.Item>
            </Descriptions>
            <Typography.Text>
              Insumos
            </Typography.Text>
            <List bordered>
              {indicator?.inputs?.map(input => (
                <List.Item>
                  {input}
                </List.Item>
              ))}
            </List>
            <Typography.Text>
              Productos
            </Typography.Text>
            <List bordered>
              {indicator?.products?.map(product => (
                <List.Item>
                  {product}
                </List.Item>
              ))}
            </List>
          </Card>
        ))}
      </Section>
    </div>
  )
}