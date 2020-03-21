import { Row, Form, DatePicker, Col, Alert, Skeleton, Input } from "antd"
import { implementer } from "../../../../../../../helpers/selectOptions"
import { SelectField, DateField } from "../../../../../../shared"

export function ProjectDetailsForm({data=true, onChange, error=false, isLoading}) {
  if(isLoading) {
    return <Skeleton active />
  }

  if(!data || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
        por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Tipo de solicitud">
            <SelectField
              id="type"
              name="type"
              onChange={onChange}
              defaultValue={data?.Submission?.type || "DIRECT"}
              options={implementer.submission.submissionTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Convocatoria a la que aplica">
            <Input
              id="applyingCall"
              name="applyingCall"
              defaultValue={data?.Submission?.applyingCall}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Nombre del proyecto">
            <Input
              id="name"
              name="name"
              defaultValue={data?.Submission?.name}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Región">
            <SelectField
              id="region"
              name="region"
              onChange={onChange}
              defaultValue={data?.Submission?.region}
              options={implementer.submission.regions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Aliado del proyecto">
            <Input
              id="ally"
              name="ally"
              defaultValue={data?.Submission?.ally}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{visibility: "hidden"}}
            label="Aliado del proyecto">
            <Input
              id="allyDummy"
              name="allyDummy"
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Lugar de implementación">
            <Input
              id="implementationPlace"
              name="implementationPlace"
              defaultValue={data?.Submission?.implementationPlace}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Responsable del proyecto">
            <Input
              id="responsible"
              name="responsible"
              defaultValue={data?.Submission?.responsible}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Fecha de inicio">
            <DateField
              id="startDate"
              name="startDate"
              defaultValue={data?.Submission?.startDate}
              onChange={onChange}
              fullWidth />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Fecha de conclusión">
            <DateField
              id="endDate"
              name="endDate"
              defaultValue={data?.Submission?.endDate}
              onChange={onChange}
              fullWidth />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Eje estratégico">
            <SelectField
              id="strategicAxis"
              name="strategicAxis"
              onChange={onChange}
              defaultValue={data?.Submission?.strategicAxis}
              options={implementer.submission.strategicAxisTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Nivel de prevención">
            <SelectField
              id="preventionLevel"
              name="preventionLevel"
              onChange={onChange}
              defaultValue={data?.Submission?.preventionLevel}
              options={implementer.submission.preventionLevelTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Ámbitos de intervención del Proyecto">
            <SelectField
              id="scope"
              name="scope"
              mode="tags"
              onChange={onChange}
              defaultValue={data?.Submission?.scope}
              options={implementer.submission.scopeTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label="Problemática a tratar">
            <Input
              id="issueDescription"
              name="issueDescription"
              defaultValue={data?.Submission?.issueDescription}
              onChange={onChange}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Descripción del proyecto">
            <Input.TextArea
              id="description"
              name="description"
              defaultValue={data?.Submission?.description}
              onChange={onChange}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Justificación">
            <Input.TextArea
              id="justification"
              name="justification"
              defaultValue={data?.Submission?.justification}
              onChange={onChange}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
