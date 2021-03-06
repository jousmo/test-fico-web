import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Row, Col, Input } from "antd"
import { CompositeField, DeleteButton, FieldLabel } from "../../../../../../shared"
import { GeneralObjectiveText } from "./general-objective-text"
import { DevelopmentObjectiveText } from "./development-objective-text"
import { SpecificObjectiveText } from "./specific-objective-text"

function DevelopmentObjectivesForm({ data, onChange, hiddenComments, readOnly, review }) {
  const onSpecificObjectivesChange = newObjectives => {
    const objectives = newObjectives?.map((el, index) => ({ ...el, orderIndex: index + 1 }))
    onChange && onChange({
      currentTarget: {
        id: "specificObjectives",
        value: objectives
      }
    })
  }

  const specificObjectives = data?.specificObjectives?.sort((a, b) =>
    a.orderIndex - b.orderIndex
  ) || []

  return (
    <Form
      name="objectives-form"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel
                helpText={<DevelopmentObjectiveText />}
                comentable={{
                  hidden: hiddenComments,
                  name: "developmentObjective",
                  section: "SUBMISSION"
                }}>
                Objetivo de desarrollo
              </FieldLabel>
            }>
            <Input.TextArea
              id="developmentObjective"
              name="developmentObjective"
              defaultValue={data?.developmentObjective}
              onChange={onChange}
              disabled={readOnly}
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
                  hidden: hiddenComments,
                  name: "generalObjective",
                  section: "SUBMISSION"
                }}>
                Objetivo general
              </FieldLabel>
            }>
            <Input.TextArea
              id="generalObjective"
              name="generalObjective"
              defaultValue={data?.generalObjective}
              onChange={onChange}
              disabled={readOnly}
              autoSize={{minRows: 3}} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label={
              <FieldLabel helpText={<SpecificObjectiveText />}>
                Objetivos espec??ficos (m??ximo 5)
              </FieldLabel>
            }>
            <CompositeField
              maxItems={5}
              onChange={onSpecificObjectivesChange}
              defaultValue={specificObjectives}
              addLabel="Agregar objetivo espec??fico"
              isAddDisabled={readOnly || review}
              onClickAdd={(addNew) => addNew({description: ""})}>
              {({ items, updateItem, removeItem }) =>
                <div>
                  { items?.map((item, index) =>
                    <Form.Item key={`specific_objective_${item.orderIndex}`}>
                      <Row>
                        <Col flex="auto">
                          <Input.TextArea
                            id="description"
                            name="description"
                            defaultValue={item.description}
                            disabled={readOnly}
                            onBlur={updateItem(index)}
                            autoSize={{minRows: 3}} />
                        </Col>
                        {(!readOnly && !review) && (
                          <Col>
                            <DeleteButton style={{marginLeft: "10px"}} onClick={removeItem(index)} />
                          </Col>
                        )}
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
