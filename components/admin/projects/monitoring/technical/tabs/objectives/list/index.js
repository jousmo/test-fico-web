import { Button, InputNumber, Table } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { decoratedData } from "./data-decorator"
import { ObjectivesModal } from "./modal"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../../../../contexts/admin/submissions/show"

export function ObjectivesList({ data, state, setState }) {
  const dataSource = decoratedData(data)
  const { save } = useContext(AdminSubmissionContext)

  const onSelectChange = selectedRowKeys => {
    setState(prevState => (
      { ...prevState,  selectedRows: selectedRowKeys }
    ))
  }

  const getFulfilled = row => {
    const real = state.fulfilled[row.key] || 0
    const goal = isNaN(parseInt(row.goal)) ? 1 : row.goal

    const result = (real * 100) / goal
    return `${result.toString().substring(0, 4)}%`
  }

  const handleChangeReal = (value, row) => {
    const newFulfilled = { ...state.fulfilled }
    newFulfilled[row.key] = value

    setState(prevState => (
      { ...prevState, fulfilled: newFulfilled }
    ))
  }

  const onSave = monitoring => {
    save(monitoring)
    onCancel()
  }

  const onEdit = row => {
    setState({ ...state, isModalOpen: true, edit: row })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: undefined })
  }

  return (
    <>
      <ObjectivesModal
        edit={state.edit}
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <Table
        className="table-list"
        dataSource={dataSource}
        rowSelection={{ state, onChange: onSelectChange }}
        size="middle">
        <Table.Column
          dataIndex="level"
          title="Nivel" />
        <Table.Column title="Resumen narrativo" dataIndex="description" />
        <Table.Column title="Realizado" />
        <Table.Column
          dataIndex="title"
          title="Indicador" />
        <Table.Column
          dataIndex="meansOfVerification"
          title="Medio de verificación" />
        <Table.Column
          align="center"
          dataIndex="goal"
          title="Meta" />
        <Table.Column
          render={(t, row) =>
            <InputNumber
              defaultValue={0}
              max={row.goal}
              min={0}
              onChange={value => handleChangeReal(value, row)} />
          }
          title="Real"
          width={90} />
        <Table.Column
          align="center"
          render={(t, row) => getFulfilled(row)}
          title="Cumplimiento" />
        <Table.Column title="Participantes" />
        <Table.Column
          render={(t, row) =>
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(row)}
              shape="circle" />
          } />
      </Table>
    </>
  )
}
