import { CompositeField } from "../../../../shared";
import { withForm } from "../../../../../helpers"
import { Form, Table, Empty } from "antd";
import { ProjectModal } from "./modal";
import { useState } from "react"
import * as cellFormat from "../../../../../helpers/cellFormat";

function ProjectsForm({ data, onChange }) {
  const [state, setState] = useState({ isModalOpen: false })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  const onSave = (addNew) => (values) => {
    addNew(values)
    onCancel()
  }

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Implementer?.projects}
          onClickAdd={onClickAdd}
          addLabel="Agregar proyecto">
          {({ items, addNew, removeItem }) =>
            <div>
              <ProjectModal
                onSave={onSave(addNew)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              <Table
                dataSource={items}
                pagination={false}
                locale={{emptyText: <Empty description="Agrega proyectos haciendo click en el botón de abajo" />}}
                >
                <Table.Column
                  title="Nombre del proyecto"
                  dataIndex="name" />
                <Table.Column
                  title="Monto"
                  dataIndex="amount" />
                <Table.Column
                  title="Propio" />
                <Table.Column
                  title="Publico" />
                <Table.Column
                  title="Privado"
                  dataIndex="amount" />
                <Table.Column
                  title="Objetivo general"
                  dataIndex="objective" />
                <Table.Column
                  title=""
                  key="actions"
                  render={cellFormat.deleteAction(removeItem)} />
              </Table>
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}

export default withForm(ProjectsForm)
