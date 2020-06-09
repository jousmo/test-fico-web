import { useForm } from "antd/lib/form/util"
import { Row, Form, Col, Input, Select } from "antd"
import { implementer } from "../../../../../../../helpers/selectOptions"
import { SelectField, DateField, FieldLabel } from "../../../../../../shared"
import { withForm } from "../../../../../../../helpers/withForm"
import { PreventionLevelsText } from "./prevention-levels-text"
import { ScopeText } from "./scope-text"
import { JustificationText } from "./justification-text"
import { TownshipSelect } from "./township-select"

function ProjectDetailsForm({
  data,
  onChange,
  isCall
}) {
  const [form] = useForm()

  const onAddAlly = (value) => {
    if (value.currentTarget.value.length > 2){
      value.currentTarget.value.length = 2
    }
    onChange(value)
  }

  return (
    <Form
      form={form}
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                name: "type",
                section: "submission"}}>
                Tipo de solicitud
              </FieldLabel>
            }>
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
            label={
              <FieldLabel comentable={{
                name: "applyingCall",
                section: "submission"}}>
                Convocatoria a la que aplica
              </FieldLabel>
            }>
            <Input
              id="applyingCall"
              name="applyingCall"
              defaultValue={data?.Submission?.applyingCall}
              onChange={onChange}
              type="text"
              disabled={!isCall} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                name: "name",
                section: "submission"}}>
                Nombre del proyecto
              </FieldLabel>
            }>
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
            label={
              <FieldLabel comentable={{
                name: "township",
                section: "submission"}}>
                Municipio
              </FieldLabel>
            }>
            <TownshipSelect
              defaultValue={data?.Submission?.township}
              onChange={onChange}
              setRegion={form.setFieldsValue} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="region"
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                name: "region",
                section: "submission"}}>
                Región
              </FieldLabel>
            }>
            <SelectField
              id="region"
              name="region"
              disabled
              onChange={onChange}
              defaultValue={data?.Submission?.region}
              options={implementer.submission.regions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                name: "allies",
                section: "submission"}}>
                Aliados del proyecto
              </FieldLabel>
            }>
            <SelectField
              id="allies"
              name="allies"
              defaultValue={data?.Submission?.allies}
              maxTagCount={2}
              mode="tags"
              onChange={onAddAlly} />
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
            label={
              <FieldLabel comentable={{
                name: "startDate",
                section: "submission"}}>
                Fecha de inicio
              </FieldLabel>
            }>
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
            label={
              <FieldLabel comentable={{
                name: "endDate",
                section: "submission"}}>
                Fecha de conclusión
              </FieldLabel>
            }>
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
            label={
              <FieldLabel comentable={{
                name: "strategicAxis",
                section: "submission"}}>
                Eje estratégico
              </FieldLabel>
            }>
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
            label={
              <FieldLabel
                helpText={<PreventionLevelsText />}
                comentable={{
                  name: "preventionLevel",
                  section: "submission"}}>
                Nivel de prevención
              </FieldLabel>
            }>
            <SelectField
              id="preventionLevel"
              name="preventionLevel"
              onChange={onChange}
              mode="tags"
              defaultValue={data?.Submission?.preventionLevel}
              options={implementer.submission.preventionLevelTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel helpText={<ScopeText />}>
                Ámbitos de intervención del Proyecto
              </FieldLabel>}>
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
            label={
              <FieldLabel comentable={{
                name: "issueDescription",
                section: "submission"}}>
                Problemática a tratar
              </FieldLabel>
            }>
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
            label={
              <FieldLabel comentable={{
                name: "description",
                section: "submission"}}>
                Descripción del proyecto
              </FieldLabel>
            }>
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
            label={
              <FieldLabel helpText={<JustificationText />}>
                Justificación
              </FieldLabel>
            }
            style={{display: "inline"}}>
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

export default withForm(ProjectDetailsForm)
