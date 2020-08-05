import { withForm } from "../../../../../../../helpers/withForm"
import { Alert, Col, Form, Input, Row, Radio } from "antd"
import { UserOutlined } from "@ant-design/icons"
import {
  CompositeField,
  SelectField,
  UploadTooltip
} from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review"
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
    newHumanResources?.forEach(humanResource => {
      newConcepts[humanResource.key].humanResource[0] = formatValues(humanResource)
    })

    onChange && onChange(newConcepts)
  }

  const formatValues = (hr) => {
    const humanResource = { ...hr }

    humanResource.hours = Number(humanResource.hours)
    humanResource.salary = Number(humanResource.salary)
    humanResource.taxes = Number(humanResource.taxes)
    humanResource.total = Number(humanResource.total)

    return humanResource
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
                    <Row
                      align="middle"
                      gutter={[10, 8]}
                      justify="start"
                      key={index}>
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
                          id="overseer"
                          name="overseer"
                          onChange={updateItem(index)}
                          defaultValue={item.overseer}
                          type="text" />
                      </Col>
                      <Col flex="80px">
                        <Input
                          id="hours"
                          name="hours"
                          min={1}
                          onChange={updateItem(index)}
                          defaultValue={item.hours}
                          type="number" />
                      </Col>
                      <Col flex="150px">
                        <SelectField
                          id="contractType"
                          name="contractType"
                          options={contractTypes}
                          onChange={updateItem(index)}
                          defaultValue={item.contractType} />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="salary"
                          name="salary"
                          min={0}
                          onChange={updateItem(index)}
                          defaultValue={item.salary}
                          type="number" />
                      </Col>
                      <Col flex="130px">
                        <Radio.Group
                          id="benefits"
                          name="benefits"
                          onChange={updateItem(index)}
                          defaultValue={item.benefits}>
                          <Radio value={true}>Si</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="%"
                          id="taxes"
                          disabled={item.contractType === "EMPLOYEE"}
                          name="taxes"
                          onChange={updateItem(index)}
                          defaultValue={item.taxes}
                          type="number" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="total"
                          name="total"
                          disabled
                          onChange={updateItem(index)}
                          defaultValue={item.total}
                          value={
                            Number(item.salary) + ((Number(item.taxes) * Number(item.salary)) / 100)
                          }
                          type="number" />
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
