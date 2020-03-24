import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Row, Col, Input } from "antd"
import { CompositeField, DeleteButton } from "../../../../../../shared"

function DevelopmentObjectivesForm({data, onChange}) {
  const onSpecificObjectivesChange = (newObjectives) => {
    console.log(newObjectives)
    onChange({
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
            label="Objetivo de desarrollo">
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
            label="Objetivo general">
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
            label="Objetivos específicos (máximo 5)">
            <CompositeField
              maxItems={5}
              onChange={onSpecificObjectivesChange}
              defaultValue={data?.Submission?.specificObjectives || []}
              addLabel="Agregar objetivo específico"
              onClickAdd={(addNew) => addNew({description: ""})}>
              {({ items, updateItem, removeItem }) => 
                <div>
                  { items.map((item, index) => 
                    <Form.Item key={`specific_objective_${index}`}>
                      <Row>
                        <Col flex="auto">
                          <Input.TextArea
                            id="description"
                            name="description"
                            defaultValue={item.description}
                            onChange={updateItem(index)}
                            autoSize={{minRows: 3}} />
                        </Col>
                        <Col>
                          <DeleteButton style={{marginLeft: "10px"}} onClick={() => removeItem(index)} />
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
