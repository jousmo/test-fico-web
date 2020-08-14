import { Button, Table } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { decoratedData } from "./data-decorator"
import { ObjectivesModal } from "./modal"
import { useContext, useState, useEffect } from "react"
import {
  AdminSubmissionContext
} from "../../../../../../../../contexts/admin/submissions/show"

export function ObjectivesList({ data, completed, setCompleted }) {
  const [state, setState] = useState({
    selectedRows: [],
    isModalOpen: false,
    edit: undefined,
    reports: []
  })

  useEffect(() => {
    setState({ ...state, reports: data.technicalMonitoringReports })
  }, [data])

  const dataSource = decoratedData(data)
  const { save, update, refetch } = useContext(AdminSubmissionContext)

  const onSelectChange = selectedRowKeys => {
    setState(prevState => (
      { ...prevState,  selectedRows: selectedRowKeys }
    ))
  }

  const getReport = row => {
    const report = state.reports.find(r => r.key === row.key)
    return report
  }

  const getReal = (row) => {
    const report = state.reports.find(r => r.key === row.key)
    return report?.completed || 0
  }

  const getParticipants = row => {
    const report = getReport(row)
    const total = report?.participants?.reduce((acc, item) => (
      acc += Number(item.amount || 0)
    ), 0) || 0
    return total
  }

  const onSave = monitoring => {
    const newReports = [ ...state.reports ]

    const index = newReports.findIndex(r => r.key === monitoring.key)
    if (index >= 0){
      newReports[index] = monitoring
      update(monitoring)
    } else {
      newReports.push(monitoring)
      save(monitoring)
    }
    setState({ ...state, reports: newReports })
    refetch()

    onCancel()
  }

  const onEdit = row => {
    const report = state?.reports?.find(report =>
      report.key === row.key
    ) || {}
    setState({ ...state, isModalOpen: true, edit: { ...row, ...report } })
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
          align="center"
          render={(t, row) => getReal(row)}
          title="Real"
          width={90} />
        <Table.Column
          align="center"
          render={(t, row) => `${getReport(row)?.compliance || 0}%`}
          title="Cumplimiento" />
        <Table.Column
          align="center"
          render={(t, row) => getParticipants(row)}
          title="Participantes" />
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
