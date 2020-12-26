import React from "react"
import { Card, Typography, Row, Col, Space, Button } from "antd"
import { FundOutlined } from "@ant-design/icons"
import {
  issueTypes,
  strategicAxisTypes,
  preventionLevelTypes
} from "../../../../../../helpers/selectOptions/implementer/submission"

export function CensusBeneficiaryProjects({ data }) {
  return (
    <Row justify="start" gutter={[16, 24]}>
      {data?.map((el, index) =>
        <Col span={8} key={index}>
          <Card className="card">
            <Space className="title">
              <FundOutlined />
              <Typography.Title level={4}>{el?.name}</Typography.Title>
            </Space>
            <Space className="space">
              <Typography.Text type="secondary">
                Eje
                <Typography.Paragraph>
                  {strategicAxisTypes.find(item => item.value === el?.strategicAxis).label}
                </Typography.Paragraph>
              </Typography.Text>
              <Typography.Text type="secondary">
                Nivel de prevención
                <Typography.Paragraph>
                  {el?.preventionLevel?.map(i => preventionLevelTypes.find(item => item.value === i)?.label)?.join(',')}
                </Typography.Paragraph>
              </Typography.Text>
            </Space>
            <Typography.Text type="secondary">
              Temática
              <Typography.Paragraph>
                {issueTypes.find(item => item.value === el?.issueDescription).label}
              </Typography.Paragraph>
            </Typography.Text>
            <Button>Ver detalle</Button>
          </Card>
        </Col>
      )}
    </Row>
  )
}
