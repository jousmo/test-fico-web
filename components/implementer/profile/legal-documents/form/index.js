import { Form, List, Row, Col } from "antd";
import { FileInput } from "./fileInput";
import { Visibility } from "../../../../shared";

export function LegalDocumentsForm({isGovernment}) {
  const letterOfIntentActor = isGovernment ?
    "titular de la dependencia" :
    "representante legal"

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
                helpText={`Con ficha técnica firmada por
                el ${letterOfIntentActor}`} />
              <FileInput label="Identificación oficial del representante legal" />
              <FileInput
                label="Copia de comprobante de domicilio fiscal"
                helpText="Que coincida con el RFC no mayor a tres meses" />
              <FileInput label="Cédula de identificación fiscal vigente" />
              <FileInput
                label="Copia de convenio con aliados"
                helpText="Solo en caso de ser más actores financiadores del proyecto" />
              <Visibility visible={isGovernment}>
                <FileInput
                  label="Decreto de creación" />
                <FileInput
                  label="Ley o reglamento que otorga facultades
                  al representante legal" />
                <FileInput
                  label="Nombramiento de quien funge como representante legal
                  o titular" />
              </Visibility>
              <Visibility visible={!isGovernment}>
                <FileInput label="Curriculum de la implementadora" />
                <FileInput
                  label="Acta constitutiva"
                  helpText="Protocolizada ante Notario Público
                  de la o las OSC que intervienen en el proyecto" />
                <FileInput
                  label="Poder notariado del representante legal"
                  helpText="Registrado ante el Registro Público" />
                <FileInput label="Oficio de donataria autorizada por la SAT" />
                <FileInput
                  label="Opinión de cumplimiento de obligaciones fiscales
                  emitida por la SAT" />
                <FileInput label="Copia del último informe de actividades" />
              </Visibility>
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
