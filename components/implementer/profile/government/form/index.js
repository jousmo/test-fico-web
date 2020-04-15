import { CompositeField, SelectField, DeleteButton } from "../../../../shared";
import { Row, Col, Input, Form, Checkbox, Skeleton, Alert, Button, Empty } from "antd";
import { implementer } from "../../../../../helpers/selectOptions";
import { DeleteOutlined } from "@ant-design/icons";

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
          {({ items, updateItem, removeItem }) => 
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
                          No recibe remuneración
                        </Checkbox>
                        <DeleteButton onClick={removeItem(index)} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ) }
              { !items.length ?
                <Empty
                  style={{marginBottom: "10px"}}
                  description="Agrega directivos haciendo click en el botón de abajo" />
              : null }
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}
