import { CompositeField, SelectField } from "../../../../shared";
import { Row, Col, Input, Form, Checkbox } from "antd";
import { implementer } from "../../../../../helpers/selectOptions";

export function GovernmentForm() {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Incluye nombres y cargos del consejo directivo"
        style={{display: "inline"}}>
        <CompositeField
          onClickAdd={(addNew) => addNew({name: undefined, charge: undefined, remuneration: undefined})}
          addLabel="Agregar directivo">
          {({ items }) => 
            <div>
              { items.map(item => 
                <Form layout="vertical">
                  <Row gutter={[10, 8]} justify="start">
                    <Col span={8}>
                      <Form.Item
                        style={{display: "inline"}}
                        label="Nombre">
                        <Input
                          id="name"
                          name="name"
                          defaultValue={item.name}
                          type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        style={{display: "inline"}}
                        label="Cargo">
                        <SelectField
                          id="charge"
                          name="charge"
                          defaultValue={item.charge}
                          options={implementer.profile.chargeTypes} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        style={{display: "inline"}}
                        label=" ">
                        <Checkbox
                          id="remuneration"
                          name="remuneration"
                          defaultValue={item.remuneration}>
                          Recibe remuneración
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ) }
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}
