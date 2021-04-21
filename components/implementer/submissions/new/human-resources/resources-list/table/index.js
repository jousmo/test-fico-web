import { withForm, getSelectValue } from "../../../../../../../helpers"
import { Alert, Col, Form, Input, Row, Radio } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import {
  SelectField,
  UploadTooltip
} from "../../../../../../shared"
import { CommentButton } from "../../../../../../admin/submissions/review"
import {
  contractTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"
import { HumanResourcesColumns } from "./form-columns"

function HumanResourcesTable({ data, form, hiddenComments, readOnly }) {

  const hrState = {}
  let hrCount = 0
  const conceptIndices = {}
  const humanResources = data?.Concepts?.reduce((prev, current, index) => {
    const humanResource = current.humanResource[0]
    if (humanResource) {
      conceptIndices[hrCount] = index
      hrState[hrCount] = {
        salary: humanResource.salary || 0,
        hasTax: humanResource.contractType !== "EMPLOYEE",
        tax: humanResource.taxes,
        budgeted: current.budgeted
      }
      hrCount++
      return [...prev, current.humanResource[0]]
    }
    return prev
  }, [])

  const [state, setState] = useState(hrState)
  const [totalState, setTotalState] = useState(false)

  const updateValue = (index, data) => {
    const { humanResources } = form.getFieldsValue()
    Object.assign(humanResources[index], data)
    form.setFieldsValue({ humanResources })
  }

  const onDoneFile = (files, index) => {
    const documents = files?.map(el => ({ name: el.name, url: el.url }))
    updateValue(index, { documents })
  }

  const onRemoveFile = (file, index) => {
    const { humanResources } = form.getFieldsValue()
    const { documents: oldDocuments } = humanResources[index]
    const documents = oldDocuments?.filter(document => document.url !== file.url)
    updateValue(index, { documents })
  }

  const onContracyTypeChange = (event, index) => {
    const { currentTarget: { value } } = event
    if (value === "EMPLOYEE"){
      setState({ ...state, [index]: { ...state[index], hasTax: false, tax: 0 } })
    } else {
      setState({ ...state, [index]: { ...state[index], hasTax: true } })
    }
    return value
  }

  const checkBudgeted = (humanResources) => {
    let correctlyBudgeted = true
    humanResources?.forEach((humanResource, index) => {
      const { taxes, salary } = humanResource
      const total = !isNaN(taxes) ? salary + ((taxes * salary) / 100) : salary
      if (total !== state[index].budgeted) {
        correctlyBudgeted = false
      }
    })
    setTotalState(!correctlyBudgeted)
  }

  const totalFactors = { tax: "salary", salary: "taxes" }

  const onNumberChange = (event, index, type) => {
    const { currentTarget: { value } } = event
    setState({ ...state, [index]: { ...state[index], [type]: Number(value) } })

    const { humanResources } = form.getFieldsValue()
    checkBudgeted(humanResources)
    const total = state[index].hasTax
      ? Number(value) * (humanResources[index][totalFactors[type]] || 0)
      : Number(value)
    updateValue(index, { total })
  }

  return (
    <Col>
      {totalState && (
        <Alert
          banner
          message='Los totales deben concordar con lo presupuestado.'
          type="error" />
      )}
      <div style={{ overflowX: "auto" }}>
        <div style={{ width: "1650px" }}>
          <Form form={form} initialValues={{ humanResources }}>
            <HumanResourcesColumns />
            <Form.List name="humanResources">
              {humanResources => {
                return (
                  <>
                    {humanResources.map((humanResource, index) => (
                      <Row
                        align="top"
                        gutter={[10, 8]}
                        justify="start"
                        key={humanResource.key}>
                        <Col flex="50px" style={{marginTop: "5px"}}>
                          {!hiddenComments &&
                          <CommentButton
                            index={index}
                            name={conceptIndices[index].toString()}
                            small
                            section="HUMAN_RESOURCE" />
                          }
                        </Col>
                        <Col flex="30px" style={{marginTop: "5px"}}>
                          <span key={`userIcon-${humanResource.key}`}>
                            &nbsp;<UserOutlined />
                          </span>
                        </Col>
                        <Col flex="150px">
                          <Form.Item name={[index, "position"]} style={{ margin: 0 }}>
                            <Input disabled={readOnly} />
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item name={[index, "name"]} style={{ margin: 0 }}>
                            <Input disabled={readOnly} />
                          </Form.Item>
                        </Col>
                        <Col flex="180px">
                          <Form.Item name={[index, "tasks"]} style={{ margin: 0 }}>
                            <Input disabled={readOnly} />
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item name={[index, "overseer"]} style={{ margin: 0 }}>
                            <Input disabled={readOnly} />
                          </Form.Item>
                        </Col>
                        <Col flex="80px">
                          <Form.Item
                            getValueFromEvent={event => Number(getSelectValue(event))}
                            name={[index, "hours"]}
                            style={{ margin: 0 }}>
                            <Input min={1} disabled={readOnly} type="number" />
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item
                            getValueFromEvent={event => onContracyTypeChange(event, index)}
                            name={[index, "contractType"]}
                            style={{ margin: 0 }}>
                            <SelectField disabled={readOnly} options={contractTypes} />
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item
                            getValueFromEvent={event => Number(getSelectValue(event))}
                            name={[index, "salary"]}
                            style={{ margin: 0 }}>
                            <Input
                              addonBefore="$"
                              disabled={readOnly}
                              onBlur={event => onNumberChange(event, index, "salary")}
                              type="number" />
                          </Form.Item>
                        </Col>
                        <Col flex="130px">
                          <Form.Item name={[index, "benefits"]} style={{ margin: 0 }}>
                            <Radio.Group disabled={readOnly}>
                              <Radio value={true}>Si</Radio>
                              <Radio value={false}>No</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item
                            getValueFromEvent={event => Number(getSelectValue(event))}
                            name={[index, "taxes"]}
                            style={{ margin: 0 }}>
                            <Input
                              addonBefore="$"
                              disabled={readOnly || !state[index]?.hasTax}
                              onBlur={event => onNumberChange(event, index, "tax")}
                              type="number" />
                          </Form.Item>
                        </Col>
                        <Col flex="150px">
                          <Form.Item name={[index, "total"]} style={{ margin: 0 }}>
                            <Input
                              addonBefore="$"
                              disabled
                              type="number" />
                          </Form.Item>
                        </Col>
                        <Col flex="80px">
                          <Form.Item name={[index, "documents"]} style={{ margin: 0 }}>
                            <UploadTooltip
                              readOnly={readOnly}
                              body="Adjunta el CV y el documento que certifica los
                              estudios de esta persona"
                              title="Experiencia y profesión"
                              small
                              onRemoveFile={file =>
                                onRemoveFile(file, index)
                              }
                              onChange={files =>
                                onDoneFile(files, index)
                              }
                              maxFile={2}
                              accept={"application/pdf"} />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  </>
                )
              }}
            </Form.List>
          </Form>
        </div>
      </div>
    </Col>
  )
}

export default withForm(HumanResourcesTable)
