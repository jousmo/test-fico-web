import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Row, Col, Input } from "antd"
import { CompositeField, DeleteButton, FieldLabel } from "../../../../../../shared"
import { v4 as uuid } from "uuid"
import { GeneralObjectiveText } from "./general-objective-text"
import { DevelopmentObjectiveText } from "./development-objective-text"
import { SpecificObjectiveText } from "./specific-objective-text"

function DevelopmentObjectivesForm({data, onChange}) {
  const onSpecificObjectivesChange = (newObjectives) => {
    onChange && onChange({
      currentTarget: {
        id: "specificObjectives",
        value: newObjectives
      }
    })
  }

  return (
    <Form
      name="project-details"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel
                helpText={<DevelopmentObjectiveText />}
                comentable={{
                  name: "developmentObjective",
                  section: "SUBMISSION"
                }}>
                Objetivo de desarrollo
              </FieldLabel>
            }>
            <Input.TextArea
              id="developmentObjective"
              name="developmentObjective"
              defaultValue={data?.Submission?.developmentObjective}
              onChange={onChange}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel
                helpText={<GeneralObjectiveText />}
                comentable={{
                  name: "generalObjective",
                  section: "SUBMISSION"
                }}>
                Objetivo general
              </FieldLabel>
            }>
            <Input.TextArea
              id="generalObjective"
              name="generalObjective"
              defaultValue={data?.Submission?.generalObjective}
              onChange={onChange}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel helpText={<SpecificObjectiveText />}>
                Objetivos específicos (máximo 5)
              </FieldLabel>
            }>
            <CompositeField
              maxItems={5}
              onChange={onSpecificObjectivesChange}
              defaultValue={data?.Submission?.specificObjectives || []}
              addLabel="Agregar objetivo específico"
              onClickAdd={(addNew) => addNew({description: "", uuid: uuid()})}>
              {({ items, updateItem, removeItem }) =>
                <div>
                  { items.map((item, index) =>
                    <Form.Item key={`specific_objective_${item.uuid}`}>
                      <Row>
                        <Col flex="auto">
                          <Input.TextArea
                            id="description"
                            name="description"
                            defaultValue={item.description}
                            onBlur={updateItem(index)}
                            autoSize={{minRows: 3}} />
                        </Col>
                        <Col>
                          <DeleteButton style={{marginLeft: "10px"}} onClick={removeItem(index)} />
                        </Col>
                      </Row>
                    </Form.Item>
                  ) }
                </div>
              }
            </CompositeField>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(DevelopmentObjectivesForm)
