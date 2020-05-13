import { Descriptions, Card, List, Typography } from "antd"

export default function DevelopmentObjectiveIndicatorPDF({ indicator }){
  return (
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
        {indicator?.inputs?.map((input, index) => (
          <List.Item key={index}>
            {input}
          </List.Item>
        ))}
      </List>
      <Typography.Text>
        Productos
      </Typography.Text>
      <List bordered>
        {indicator?.products?.map((product, index) => (
          <List.Item key={index}>
            {product}
          </List.Item>
        ))}
      </List>
    </Card>
  )
}