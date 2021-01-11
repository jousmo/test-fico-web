import { withForm, toFileList } from "../../../../../../../helpers"
import { Alert, Col, Form, Input, Row, Radio } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import {
  CompositeField,
  SelectField,
  UploadTooltip
} from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review"
import {
  contractTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { HumanResourcesColumns } from "./form-columns"
import { useAuth } from "../../../../../../../contexts/auth"

function HumanResourcesTable({ data, onChange, hiddenComments }) {
  const { user } = useAuth()

  const hrState = {}
  let hrCount = 0
  const concepts = data?.Submission?.concepts?.map(({ budgeted, ...concept }) => concept) || []
  const humanResources = concepts?.map((concept, index) => {
    if (["HUMAN_RESOURCE", "ADMINISTRATIVE_HUMAN_RESOURCE"].includes(concept.type)) {
      hrState[hrCount] = {
        salary: concept.humanResource[0]?.salary || 0,
        hasTax: concept.humanResource[0]?.contractType !== "EMPLOYEE",
        tax: concept.humanResource[0]?.taxes,
        budgeted: concept.totalUnits * concept.unitCost,
      }
      const hr = {
        conceptKey: index,
        hrKey: hrCount,
        position: concept.name,
        ...concept.humanResource[0]
      }
      hrCount++
      return hr
    }
  }).filter(e => e !== undefined) || []

  const [state, setState] = useState(hrState)
  const [totalState, setTotalState] = useState(false)

  const hasDuplicates = humanResources
    .map(r => r.position)
    .some((p, i, a) => a.indexOf(p) !== i)

  const onConceptsChange = newHumanResources => {
    const newConcepts = [...concepts]
    let correctlyBudgeted = true

    newHumanResources?.forEach(humanResource => {
      const formattedValues = formatValues(humanResource)
      newConcepts[humanResource.conceptKey].humanResource[0] = formattedValues

      const { taxes, salary } = formattedValues
      const total = !isNaN(taxes) ? salary + ((taxes * salary) / 100) : salary
      if (total !== state[humanResource.hrKey].budgeted) {
        correctlyBudgeted = false
      }
    })
    setTotalState(!correctlyBudgeted)

    onChange && onChange(newConcepts)
  }

  const formatValues = (hr) => {
    const { conceptKey, hrKey, ...humanResource } = hr

    humanResource.hours = Number(humanResource.hours)
    humanResource.salary = Number(humanResource.salary)
    humanResource.taxes = Number(humanResource.taxes)
    humanResource.total = Number(humanResource.total)

    return humanResource
  }

  const readOnly = data?.Submission?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && data?.Submission?.status.includes("REVIEW"))

  const onDoneFile = (index, files, onFilesChange) => {
    const documents = files?.map(el => {
      return { name: el.name, url: el.url }
    })

    onFilesChange(index, documents, "documents")
  }

  const onRemoveFile = (file, oldDocuments, index, onFilesChange) => {
    const documents = oldDocuments.filter(document => document.url !== file.url)
    onFilesChange(index, documents, "documents")
  }

  const onContracyTypeChange = (event, updateItem, index) => {
    const { currentTarget: { value } } = event
    if (value === "EMPLOYEE"){
      setState({ ...state, [index]: { ...state[index], hasTax: false, tax: 0 } })
      updateItem(index)({ currentTarget: { id: "taxes", value: null }})
    } else {
      setState({ ...state, [index]: { ...state[index], hasTax: true } })
    }
    updateItem(index)(event)
  }

  const onNumberChange = (event, updateItem, index, type) => {
    const { currentTarget: { value } } = event
    setState({ ...state, [index]: { ...state[index], [type]: Number(value) } })
    updateItem(index)(event)
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
      {totalState && (
        <Alert
          banner
          message='Los totales deben concordar con lo presupuestado.'
          type="error" />
      )}
      <Col>
        <Form.Item>
          <CompositeField
            onChange={onConceptsChange}
            isAddDisabled
            value={humanResources}>
            {({items, updateItem, onFilesChange}) =>
              <div style={{overflowX: "auto"}}>
                <div style={{width: "1650px"}}>
                  <HumanResourcesColumns />
                  {items.map(item =>
                    <Row
                      align="middle"
                      gutter={[10, 8]}
                      justify="start"
                      key={item.hrKey}>
                      <Col flex="50px">
                        {!hiddenComments &&
                          <CommentButton
                            index={item.hrKey}
                            name={item.hrKey.toString()}
                            small
                            section="HUMAN_RESOURCE" />
                        }
                      </Col>
                      <Col flex="30px">
                        <span key={`userIcon-${item.hrKey}`}>
                          &nbsp;<UserOutlined />
                        </span>
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="position"
                          name="position"
                          defaultValue={item.position}
                          onChange={updateItem(item.hrKey)}
                          disabled={readOnly}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="name"
                          name="name"
                          defaultValue={item.name}
                          onChange={updateItem(item.hrKey)}
                          disabled={readOnly}
                          type="text" />
                      </Col>
                      <Col flex="180px">
                        <Input
                          id="tasks"
                          name="tasks"
                          onChange={updateItem(item.hrKey)}
                          defaultValue={item.tasks}
                          disabled={readOnly}
                          type="text" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          id="overseer"
                          name="overseer"
                          onChange={updateItem(item.hrKey)}
                          defaultValue={item.overseer}
                          disabled={readOnly}
                          type="text" />
                      </Col>
                      <Col flex="80px">
                        <Input
                          id="hours"
                          name="hours"
                          min={1}
                          onChange={updateItem(item.hrKey)}
                          defaultValue={item.hours}
                          disabled={readOnly}
                          type="number" />
                      </Col>
                      <Col flex="150px">
                        <SelectField
                          id="contractType"
                          name="contractType"
                          options={contractTypes}
                          onChange={event => onContracyTypeChange(event, updateItem, item.hrKey)}
                          disabled={readOnly}
                          defaultValue={item.contractType} />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="salary"
                          name="salary"
                          min={0}
                          onBlur={event => onNumberChange(event, updateItem, item.hrKey, "salary")}
                          defaultValue={item.salary}
                          disabled={readOnly}
                          type="number" />
                      </Col>
                      <Col flex="130px">
                        <Radio.Group
                          id="benefits"
                          name="benefits"
                          onChange={updateItem(item.hrKey)}
                          disabled={readOnly}
                          defaultValue={item.benefits}>
                          <Radio value={true}>Si</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="%"
                          id="taxes"
                          disabled={readOnly || !state[item.hrKey]?.hasTax}
                          name="taxes"
                          onBlur={event => onNumberChange(event, updateItem, item.hrKey, "tax")}
                          defaultValue={item.taxes}
                          type="number" />
                      </Col>
                      <Col flex="150px">
                        <Input
                          addonBefore="$"
                          id="total"
                          name="total"
                          disabled
                          onChange={updateItem(item.hrKey)}
                          defaultValue={item.total}
                          value={
                            state[item.hrKey].hasTax ? (
                              state[item.hrKey].salary + ((state[item.hrKey].tax * state[item.hrKey].salary) / 100)
                            ) : (
                              state[item.hrKey].salary
                            )
                          }
                          type="number" />
                      </Col>
                      <Col flex="80px">
                        <UploadTooltip
                          readOnly={readOnly}
                          body="Adjunta el CV y el documento que certifica los
                          estudios de esta persona"
                          title="Experiencia y profesión"
                          small
                          fileList={toFileList(item.documents) || []}
                          onRemoveFile={file =>
                            onRemoveFile(file, item.documents, item.hrKey, onFilesChange)
                          }
                          onChange={files =>
                            onDoneFile(item.hrKey, files, onFilesChange)
                          }
                          maxFile={2}
                          accept={"application/pdf"} />
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
