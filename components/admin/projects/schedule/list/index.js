import { withForm } from "../../../../../helpers/withForm"
import { Button, Table } from "antd"
import { CheckSquareTwoTone, EditOutlined } from "@ant-design/icons"
import { Tooltip } from "../../../../shared/tooltip"
import { useState } from "react"
import { ScheduleModal } from "./modal"
import { decoratedData } from "./data-decorator"

function ProjectScheduleList({ data }) {
  const [state, setState] = useState({ isModalOpen: false, edit: undefined })
  const dataSource = decoratedData(data)

  const onEdit = row => {
    setState({ isModalOpen: true, edit: row })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  return (
    <>
      <ScheduleModal
        edit={state.edit}
        onCancel={onCancel}
        visible={state.isModalOpen} />
      <Table
        className="activities-list"
        dataSource={dataSource}
        size="middle">
        <Table.Column
          render={(t, row) => <CheckSquareTwoTone />}
          title={<CheckSquareTwoTone />}/>
        <Table.Column
          dataIndex="level"
          title="Nivel" />
        <Table.Column
          title="Resumen narrativo"
          render={text => <Tooltip value={text || ""}/>}
          sorter={(a, b) => a.description?.localeCompare(b.description)}
          showSorterTooltip={false}
          dataIndex="description" />
          <Table.Column
            title="Fecha y hora"
            sorter={(a, b) => a.date?.localeCompare(b.date)}
            showSorterTooltip={false}
            dataIndex="date" />
          <Table.Column
            title="Lugar"
            sorter={(a, b) => a.location?.localeCompare(b.location)}
            showSorterTooltip={false}
            dataIndex="location" />
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

export default withForm(ProjectScheduleList)
