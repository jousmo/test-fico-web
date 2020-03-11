import { Select, Form, Row, Col, Input, Button, Upload } from "antd";
import { Section, SelectField } from "../../../shared";
import { useContext } from "react";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";
import { implementer } from "../../../../helpers/selectOptions";
import { UploadOutlined } from "@ant-design/icons";

export function OrganizationalChart() {
  return (
    <Section title="6. Organigrama">
      <Form
        name="organizational-chart"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Sube un documento donde se muestre la estructura de la
              implementadora en un organigrama">
              <Upload>
                <Button>
                  <UploadOutlined /> Subir
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
