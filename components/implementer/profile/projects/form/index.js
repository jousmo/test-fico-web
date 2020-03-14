import { CompositeField, SelectField } from "../../../../shared";
import { Row, Col, Input, Form, Checkbox, Skeleton, Alert, Table, Empty } from "antd";
import { implementer } from "../../../../../helpers/selectOptions";
import { ProjectModal } from "./projectModal";

export function ProjectsForm({data, isLoading, onChange, error}) {
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
    <>
      <ProjectModal visible={true} />
      <Form layout="vertical">
        <Form.Item
          style={{display: "inline"}}>
          <CompositeField
            onChange={onChange}
            defaultValue={data?.Implementer?.projects}
            onClickAdd={(addNew) => addNew({name: "", charge: "", remuneration: false})}
            addLabel="Agregar proyecto">
            {({ items }) => 
              <div>
                <Table
                  pagination={false}
                  locale={{emptyText: <Empty description="Agrega proyectos haciendo click en el botón de abajo" />}}
                  >
                  <Table.Column
                    title="Institución financiadora"
                    key="financialInstitution"
                    dataIndex="financingInstitution" />
                  <Table.Column
                    title="Monto"
                    key="amount"
                    dataIndex="amount" />
                  <Table.Column
                    title="Financiamiento"
                    key="financingPercentage"
                    dataIndex="financingPercentage" />
                  <Table.Column
                    title="Nombre del proyecto"
                    key="name"
                    dataIndex="name" />
                  <Table.Column
                    title="Año"
                    key="year"
                    dataIndex="year" />
                  <Table.Column
                    title="Presupuesto"
                    key="budget"
                    dataIndex="budget" />
                  <Table.Column
                    title="Objetivo general"
                    key="objective"
                    dataIndex="objective" />
                </Table>
              </div>
            }
          </CompositeField>
        </Form.Item>
      </Form>
    </>
  )
}
