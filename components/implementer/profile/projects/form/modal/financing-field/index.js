import { Col, Form, Input, Row } from "antd"
import { CompositeField, DeleteButton, SelectField } from "../../../../../../shared"
import { implementer } from "../../../../../../../helpers/selectOptions"

export function FinancingField({ total, ...props }) {
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
      {...props}>
      {({ items, updateItem, removeItem }) =>
        <Row
          gutter={[10, 8]}
          justify="start">
          <Col span={6}>Tipo</Col>
          <Col span={8}>Aportador</Col>
          <Col span={6}>Monto ($)</Col>
          { items.map((item, index) =>
            <>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 0 }}>
                  <SelectField
                    id="type"
                    name="type"
                    onChange={updateItem(index)}
                    options={implementer.profile.budgetTypes} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    id="institution"
                    name="institution"
                    disabled={item.type === "Propio"}
                    onChange={updateItem(index)}
                    type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    id="amount"
                    name="amount"
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
            </>
          ) }
        </Row>
      }
    </CompositeField>
  )
}
