import { Row, Form, Col, Input } from "antd"
import { useState } from "react"
import { implementer } from "../../../../../../../helpers/selectOptions"
import { SelectField, DateField, FieldLabel } from "../../../../../../shared"
import { withForm } from "../../../../../../../helpers/withForm"
import { PreventionLevelsText } from "./prevention-levels-text"
import { ScopeText } from "./scope-text"
import { JustificationText } from "./justification-text"
import { TownshipSelect } from "./township-select"
import moment from "moment"
import { useAuth } from "../../../../../../../contexts/auth"

function ProjectDetailsForm({
  data,
  onChange,
  isCall,
  hiddenComments
}) {
  const { user } = useAuth()
  const [state, setState] = useState({
    startDate: data?.startDate,
    endDate: data?.endDate
  })
  const [form] = Form.useForm()

  const onAddAlly = (value) => {
    if (value.currentTarget.value.length > 2){
      value.currentTarget.value.length = 2
    }
    onChange(value)
  }

  const onSetDate = (date, type) => {
    const { currentTarget: { value }} = date

    setState({ ...state, [type]: value })
    onChange(date)
  }

  const readOnly = data?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && data?.status.includes("REVIEW"))

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
                hidden: hiddenComments,
                name: "type",
                section: "SUBMISSION"}}>
                Tipo de solicitud
              </FieldLabel>
            }>
            <SelectField
              id="type"
              name="type"
              disabled={readOnly}
              onChange={onChange}
              defaultValue={data?.type}
              options={implementer.submission.submissionTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "applyingCall",
                section: "SUBMISSION"}}>
                Convocatoria a la que aplica
              </FieldLabel>
            }>
            <Input
              id="applyingCall"
              name="applyingCall"
              defaultValue={data?.applyingCall}
              onChange={onChange}
              type="text"
              disabled={!isCall || readOnly} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "name",
                section: "SUBMISSION"}}>
                Nombre del proyecto
              </FieldLabel>
            }>
            <Input
              id="name"
              name="name"
              defaultValue={data?.name}
              onChange={onChange}
              disabled={readOnly}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "township",
                section: "SUBMISSION"}}>
                Municipio
              </FieldLabel>
            }>
            <TownshipSelect
              defaultValue={data?.township || []}
              onChange={onChange}
              disabled={readOnly}
              setRegion={form.setFieldsValue} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="region"
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "region",
                section: "SUBMISSION"}}>
                Región
              </FieldLabel>
            }>
            <SelectField
              id="region"
              name="region"
              disabled
              onChange={onChange}
              defaultValue={data?.region}
              options={implementer.submission.regions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "allies",
                section: "SUBMISSION"}}>
                Aliados del proyecto
              </FieldLabel>
            }>
            <SelectField
              id="allies"
              name="allies"
              defaultValue={data?.allies || []}
              maxTagCount={2}
              mode="tags"
              disabled={readOnly}
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
              defaultValue={data?.implementationPlace}
              onChange={onChange}
              disabled={readOnly}
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
              defaultValue={data?.responsible}
              onChange={onChange}
              disabled={readOnly}
              type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "startDate",
                section: "SUBMISSION"}}>
                Fecha de inicio
              </FieldLabel>
            }>
            <DateField
              id="startDate"
              name="startDate"
              disabledDate={date => date && date > moment(state.endDate)}
              defaultValue={data?.startDate}
              onChange={date => onSetDate(date, "startDate")}
              disabled={readOnly}
              format="DD/MM/YYYY"
              fullWidth />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "endDate",
                section: "SUBMISSION"}}>
                Fecha de conclusión
              </FieldLabel>
            }>
            <DateField
              id="endDate"
              name="endDate"
              disabledDate={date => date && date < moment(state.startDate)}
              defaultValue={data?.endDate}
              onChange={date => onSetDate(date, "endDate")}
              disabled={readOnly}
              format="DD/MM/YYYY"
              fullWidth />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "strategicAxis",
                section: "SUBMISSION"}}>
                Eje estratégico
              </FieldLabel>
            }>
            <SelectField
              id="strategicAxis"
              name="strategicAxis"
              onChange={onChange}
              defaultValue={data?.strategicAxis}
              disabled={readOnly}
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
                  hidden: hiddenComments,
                  name: "preventionLevel",
                  section: "SUBMISSION"}}>
                Nivel de prevención
              </FieldLabel>
            }>
            <SelectField
              id="preventionLevel"
              name="preventionLevel"
              onChange={onChange}
              mode="tags"
              defaultValue={data?.preventionLevel || []}
              disabled={readOnly}
              options={implementer.submission.preventionLevelTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel
                helpText={<ScopeText />}
                comentable={{
                  hidden: hiddenComments,
                  name: "scope",
                  section: "SUBMISSION"}}>
                Ámbitos de intervención del Proyecto
              </FieldLabel>
            }>
            <SelectField
              id="scope"
              name="scope"
              mode="tags"
              onChange={onChange}
              defaultValue={data?.scope || []}
              disabled={readOnly}
              options={implementer.submission.scopeTypes} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "issueDescription",
                section: "SUBMISSION"}}>
                Problemática a tratar
              </FieldLabel>
            }>
            <SelectField
              id="issueDescription"
              name="issueDescription"
              defaultValue={data?.issueDescription}
              onChange={onChange}
              filterOption={(value, option) =>
                option.children.toLowerCase().includes(value.toLowerCase())
              }
              disabled={readOnly}
              showSearch
              options={implementer.submission.issueTypes} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel comentable={{
                hidden: hiddenComments,
                name: "description",
                section: "SUBMISSION"}}>
                Descripción del proyecto
              </FieldLabel>
            }>
            <Input.TextArea
              id="description"
              name="description"
              defaultValue={data?.description}
              onChange={onChange}
              disabled={readOnly}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <FieldLabel
                helpText={<JustificationText />}
                comentable={{
                  hidden: hiddenComments,
                  name: "justification",
                  section: "SUBMISSION"}}>
                Justificación
              </FieldLabel>
            }
            style={{display: "inline"}}>
            <Input.TextArea
              id="justification"
              name="justification"
              defaultValue={data?.justification}
              onChange={onChange}
              disabled={readOnly}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(ProjectDetailsForm)
