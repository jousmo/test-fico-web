import { Col, Form, Input, Row } from "antd"
import { CompositeField, DeleteButton, SelectField } from "../../../../../../shared"
import { implementer } from "../../../../../../../helpers/selectOptions"

export function FinancingField({ total, value, ...props }) {
  const onAddProject = addNew => {
    addNew({ type: undefined, institution: undefined, amount: undefined })
  }

  const getPercentage = value => {
    value = value || 0
    return total > 0 ? ((value * 100) / total).toFixed(2) : 0
  }

  return (
    <CompositeField
      addLabel="Agregar financiamiento"
      onClickAdd={onAddProject}
      value={value}
      {...props}>
      {({ items, updateItem, removeItem }) =>
        <Row
          gutter={[10, 8]}
          justify="start">
          <Col span={6}>Tipo</Col>
          <Col span={8}>Aportador</Col>
          <Col span={6}>Monto ($)</Col>
          { items?.map((item, index) =>
            <Col span={24} key={item.id}>
              <Row gutter={[10, 8]}>
                <Col span={6}>
                  <Form.Item
                    style={{ marginBottom: 0 }}>
                    <SelectField
                      id="type"
                      name="type"
                      value={item.type}
                      onChange={updateItem(index)}
                      options={implementer.profile.budgetTypes} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      id="institution"
                      name="institution"
                      value={item.institution}
                      disabled={item.type === "OWN"}
                      onChange={updateItem(index)}
                      type="text" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      id="amount"
                      name="amount"
                      value={item.amount}
                      onChange={updateItem(index)} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    {getPercentage(item.amount)}%
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <DeleteButton onClick={removeItem(index)} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          ) }
        </Row>
      }
    </CompositeField>
  )
}
