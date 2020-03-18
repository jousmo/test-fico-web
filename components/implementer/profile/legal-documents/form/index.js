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
            label='Para continuar, por favor adjuntar los documentos que se
            solicitan a continuación y al finalizar da click en
            "Enviar documentos"'>
            <List bordered>
              <FileInput
                label="Carta intención"
                helpText="Con ficha técnica firmada por el representante legal" />
              <FileInput label="Curriculum de la implementadora" />
              <FileInput
                label="Acta constitutiva"
                helpText="Protocolizada ante Notario Público
                de la o las OSC que intervienen en el proyecto" />
              <FileInput
                label="Poder notariado del representante legal"
                helpText="Registrado ante el Registro Público" />
              <FileInput label="Identificación oficial del representante legal" />
              <FileInput
                label="Copia de comprobante de domicilio fiscal"
                helpText="Que coincida con el RFC no mayor a tres meses" />
              <FileInput label="Cédula de identificación fiscal vigente" />
              <FileInput label="Oficio de donataria autorizada por la SAT" />
              <FileInput label="Opinión de cumplimiento de obligaciones fiscales emitida por la SAT" />
              <FileInput
                label="Copia de convenio con aliados"
                helpText="Solo en caso de ser más actores financiadores del proyecto" />
              <FileInput label="Copia del último informe de actividades" />
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
