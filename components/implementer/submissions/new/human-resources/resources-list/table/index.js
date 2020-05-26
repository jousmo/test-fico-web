import { withForm } from "../../../../../../../helpers/withForm"
import { Button, Col, Form, Input, Row, Upload } from "antd"
import { PaperClipOutlined, UserOutlined } from "@ant-design/icons"
import { CompositeField, SelectField } from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review";
import {
  benefits,
  contractTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { HumanResourcesColumns } from "./form-columns"

function HumanResourcesTable({ data, onChange }) {
  const concepts = data?.Submission?.concepts || []
  const humanResources = concepts?.map((concept, index) =>
    concept.type === "HUMAN_RESOURCE" && {key: index, ...concept.humanResource}
  ).filter(e => e !== false) || []


  const onConceptsChange = (newHumanResources) => {
    const newConcepts = [...concepts]
    newHumanResources?.forEach(humanResource => (
      newConcepts[humanResource.key].humanResource = humanResource
    ))

    onChange && onChange(newConcepts)
  }

  return (
    <Form
      name="human-resources"
      layout="vertical">
      <Col>
        <Form.Item>
          <CompositeField
            onChange={onConceptsChange}
            isAddDisabled
            defaultValue={humanResources}>
            {({items, updateItem}) =>
              <div style={{overflowX: "auto"}}>
                <div style={{width: "1780px"}}>
                  <HumanResourcesColumns />
                  {items.map((item, index) =>
                    <Row gutter={[10, 8]} justify="start" key={index}>
                      <Col flex="50px">
                        <CommentButton
                          name={index}
                          small
                          section="humanResource" />
                      </Col>
                      <Col flex="30px">
                        <span key={`userIcon-${index}`}>
                          &nbsp;<UserOutlined />
                        </span>
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="position"
                          name="position"
                          defaultValue={item.position}
                          onChange={updateItem(index)}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="name"
                          name="name"
                          defaultValue={item.name}
                          onChange={updateItem(index)}
                          type="text" />
                      </Col>
                      <Col flex="180px">
                        <Input
                          id="tasks"
                          name="tasks"
                          onChange={updateItem(index)}
                          defaultValue={item.tasks}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="oversees"
                          name="oversees"
                          onChange={updateItem(index)}
                          defaultValue={item.oversees}
                          type="text" />
                      </Col>
                      <Col flex="80px">
                        <Input
                          id="hours"
                          name="hours"
                          onChange={updateItem(index)}
                          defaultValue={item.hours}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <SelectField
                          id="contract_type"
                          name="contract_type"
                          options={contractTypes}
                          onChange={updateItem(index)}
                          defaultValue={item.contract_type} />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="salary"
                          name="salary"
                          onChange={updateItem(index)}
                          defaultValue={item.salary}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <SelectField
                          id="benefits"
                          name="benefits"
                          options={benefits}
                          onChange={updateItem(index)}
                          defaultValue={item.benefits} />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="taxes"
                          name="taxes"
                          onChange={updateItem(index)}
                          defaultValue={item.taxes}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="total"
                          name="total"
                          onChange={updateItem(index)}
                          defaultValue={item.total}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Upload
                          id="documents"
                          name="documents">
                          <Button
                            icon={<PaperClipOutlined />}
                            shape="circle" />
                        </Upload>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            }
          </CompositeField>
        </Form.Item>
      </Col>
    </Form>
  )
}

export default withForm(HumanResourcesTable)
