import { Col, Form, Row } from "antd"
import { CompositeField, DateField } from "../../../../../../../../../shared"
import moment from "moment"

export function SchedulesField({ readOnly, ...props }) {
  return (
    <CompositeField
      isAddDisabled
      {...props}>
      {({ items, updateItem }) =>
        <Row>
          { items?.map((item, index) =>
            <>
              <Col span={10} style={{ padding: "0 5px" }}>
                <Form.Item
                  label="Fecha planeada"
                  style={{ marginBottom: "0" }}>
                  {moment(item.scheduledAt).format("DD/MM/YYYY")}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "0 5px" }}>
                <Form.Item
                  label="Lugar"
                  style={{ marginBottom: "0" }}>
                  {item.place}
                </Form.Item>
              </Col>
              <Col span={6} style={{ padding: "0 5px" }}>
                <Form.Item
                  style={{ marginBottom: "0" }}>
                  <DateField
                    disabled={readOnly}
                    id="completedAt"
                    bordered={false}
                    onChange={updateItem(index)}
                    defaultValue={item.completedAt}
                    placeholder="Realizado"
                    format="DD/MM/YYYY"
                    size="small" />
                </Form.Item>
              </Col>
            </>
          ) }
        </Row>
      }
    </CompositeField>
  )
}
