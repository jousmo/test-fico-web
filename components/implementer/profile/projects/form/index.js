import { CompositeField, Tooltip } from "../../../../shared";
import { withForm } from "../../../../../helpers"
import { Form, Table, Empty } from "antd";
import { ProjectModal } from "./modal";
import { useState } from "react"
import * as cellFormat from "../../../../../helpers/cellFormat";
import { money } from "../../../../../helpers/valueFormat"

function ProjectsForm({ data, onChange, disabled }) {
  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined
  })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (addNew, replaceItemAtIndex) => (values) => {
    if(values.index !== undefined) {
      const { index, ...project } = values
      replaceItemAtIndex(index, project)
    } else {
      addNew(values)
    }
    onCancel()
  }

  const getFinancing = row => {
    const result = { own: 0, public: 0, private: 0 }
    row.financing?.forEach(el => {
      if (el.type === "OWN") {
        result.own = result.own + el.amount
      } else if (el.type === "PRIVATE") {
        result.private = result.private + el.amount
      } else {
        result.public = result.public + el.amount
      }
    })
    return result
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ isModalOpen: true, edit: item })
  }

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Implementer?.projects}
          onClickAdd={onClickAdd}
          addLabel="Agregar proyecto"
          isAddDisabled={disabled}>
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <ProjectModal
                edit={state.edit}
                onSave={onSave(addNew, replaceItemAtIndex)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              <Table
                dataSource={items}
                pagination={false}
                locale={{emptyText: <Empty description="Agrega proyectos haciendo click en el botón de abajo" />}}
                >
                <Table.Column
                  title="Nombre del proyecto"
                  render={value => <Tooltip length={20} value={value}/>}
                  dataIndex="name" />
                <Table.Column
                  title="Monto"
                  render={(t, row) => money(row.financing?.reduce((prev, current) => prev + current.amount, 0))}
                  dataIndex="amount" />
                <Table.Column
                  render={(t, row) => money(getFinancing(row).own)}
                  title="Propio" />
                <Table.Column
                  render={(t, row) => money(getFinancing(row).public)}
                  title="Publico" />
                <Table.Column
                  render={(t, row) => money(getFinancing(row).private)}
                  title="Privado" />
                <Table.Column
                  title="Objetivo general"
                  render={value => <Tooltip length={15} value={value}/>}
                  dataIndex="objective" />
                {!disabled && (
                  <Table.Column
                    title=""
                    key="actions"
                    dataIndex="name"
                    render={cellFormat.actions(onEdit, removeItem, false)} />
                )}
              </Table>
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}

export default withForm(ProjectsForm)
