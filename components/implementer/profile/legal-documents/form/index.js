import { Form, List, Row, Col } from "antd";
import { FileInput } from "./fileInput";

export function LegalDocumentsForm() {
  return (
    <Form
      name="organizational-chart"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Para continuar con la firma del convenio, por favor adjunta
            los documentos que se solicitan a continuación y al finalizar
            da click en 'Enviar documentos'.">
            <List bordered>
              <FileInput label="Acta constitutiva" />
              <FileInput label="Poder representante legal" />
              <FileInput
                label="Copia de la identificación oficial de representante
                legal" />
              <FileInput label="Copia de CIF" />
              <FileInput label="Comprobante de domicilio" />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
