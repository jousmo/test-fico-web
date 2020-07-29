import { withForm } from "../../../../../../../helpers/withForm"
import { Alert, Col, Form, Input, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"
import {
  CompositeField,
  SelectField,
  UploadTooltip
} from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review";
import {
  benefits,
  contractTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { HumanResourcesColumns } from "./form-columns"

function HumanResourcesTable({ data, onChange }) {
  const concepts = data?.Submission?.concepts || []
  const humanResources = concepts?.map((concept, index) =>
    concept.type === "HUMAN_RESOURCE" &&
    {
      key: index,
      position: concept.name,
      ...concept.humanResource[0]
    }
  ).filter(e => e !== false) || []

  const hasDuplicates = humanResources
    .map(r => r.position)
    .some((p, i, a) => a.indexOf(p) !== i)

  const onConceptsChange = (newHumanResources) => {
    const newConcepts = [...concepts]
    newHumanResources?.forEach(humanResource => (
      newConcepts[humanResource.key].humanResource[0] = humanResource
    ))

    onChange && onChange(newConcepts)
  }

  return (
    <Form
      name="human-resources"
      layout="vertical">
      {hasDuplicates && (
        <Alert
          banner
          message='El campo "Puesto" no debe repetirse.'
          type="error" />
      )}
      <Col>
        <Form.Item>
          <CompositeField
            onChange={onConceptsChange}
            isAddDisabled
            defaultValue={humanResources}>
            {({items, updateItem}) =>
              <div style={{overflowX: "auto"}}>
                <div style={{width: "1650px"}}>
                  <HumanResourcesColumns />
                  {items.map((item, index) =>
                    <Row gutter={[10, 8]} justify="start" key={index}>
                      <Col flex="50px">
                        <CommentButton
                          index={item.key}
                          name={item.name}
                          small
                          section="HUMAN_RESOURCE" />
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
                          disabled={item.contract_type === "EMPLOYEE"}
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
                      <Col flex="80px">
                        <UploadTooltip
                          body="Adjunta el CV y el documento que certifica los
                          estudios de esta persona"
                          title="Experiencia y profesión"
                          small />
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
