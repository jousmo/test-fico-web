import { CompositeField, SelectField } from "../../../../shared";
import { Row, Col, Input, Form, Checkbox, Skeleton, Alert } from "antd";
import { implementer } from "../../../../../helpers/selectOptions";

export function GovernmentForm({data, isLoading, onChange, error}) {
  if(isLoading) {
    return <Skeleton active />
  }

  if(!data || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
        por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

  return (
    <Form layout="vertical">
      <Form.Item
        label="Incluye nombres y cargos del consejo directivo"
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Implementer?.councilMembers}
          onClickAdd={(addNew) => addNew({name: "", charge: "", remuneration: false})}
          addLabel="Agregar directivo">
          {({ items, updateItem }) => 
            <div>
              { items.map((item, index) => 
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
                          onChange={updateItem(index)}
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
                          onChange={updateItem(index)}
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
                          onChange={updateItem(index)}
                          checked={item.remuneration}>
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
