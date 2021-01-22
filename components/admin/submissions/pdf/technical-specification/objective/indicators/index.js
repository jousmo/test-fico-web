import { Descriptions, Card, List, Typography } from "antd"
import { getReadableValue, implementer } from "../../../../../../../helpers/selectOptions"

export default function ObjectiveIndicatorPDF({ indicator }){
  const { submission: { verificationTypes }} = implementer

  return (
    <Card>
      <Typography.Title level={4}>
        {indicator.title}
      </Typography.Title>
      <Typography.Text>
        {indicator.description}
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
        <Descriptions.Item label="Medios de verificación">
          {!!indicator.meansOfVerification?.length ? (
            indicator.meansOfVerification.map(method =>
              getReadableValue(verificationTypes, method)
            ).join(", ")
          ) : "N/A"}
        </Descriptions.Item>
      </Descriptions>
      {!!indicator?.products?.length && (
        <>
          <Typography.Text>
            Productos
          </Typography.Text>
          {indicator?.products?.map(product =>
            <List.Item key={product}>
              {product}
            </List.Item>
          )}
        </>
      )}
    </Card>
  )
}
