import { Section } from "../../../../../shared"
import { Button, Col, Row, Typography } from "antd"
import { scheduleExport } from "../../../../../admin/projects/show/attachments/documents/helpers"
import { useContext } from "react"
import { ImplementerSubmissionContext } from "../../../../../../contexts"

export function Heading({ admin }) {
  const { data } = useContext(ImplementerSubmissionContext)

  return (
    <Section fullWidth>
      <Row align="middle">
        <Col span={22}>
          <Typography.Text>Cronograma</Typography.Text>
          <br />
          <Typography.Text type="secondary">
            Se muestra un resumen de todas las actividades agendadas, para ver el
            detalle coloca el ratón encima de una marca.
          </Typography.Text>
        </Col>
        {admin &&
          <Col>
            <Button onClick={() => scheduleExport(data?.TechnicalSpecification)}>Exportar</Button>
          </Col>
        }
      </Row>
    </Section>
  )
}
