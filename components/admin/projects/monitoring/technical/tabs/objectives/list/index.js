import { Button, Table } from "antd"
import { CheckSquareTwoTone } from "@ant-design/icons/lib"
import { EditOutlined } from "@ant-design/icons"
import { decoratedData } from "./data-decorator"
import { ObjectivesModal } from "./modal"
import { useContext, useState } from "react"
import moment from "moment"
moment.locale("es")
import {
  AdminSubmissionContext
} from "../../../../../../../../contexts/admin/submissions/show"

export function ObjectivesList({ data, dateFilter }) {
  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined,
    test: 0
  })

  const dataSource = decoratedData(data, dateFilter)
  const { save, update } = useContext(AdminSubmissionContext)

  const getReport = row => {
    return data.technicalMonitoringReports?.find(r => r.key === row.key)
  }

  const getParticipants = row => {
    const report = getReport(row)
    return report?.participants?.reduce((acc, item) => (
      acc += Number(item.amount || 0)
    ), 0) || 0
  }

  const getAppliedAt = row => {
    const { appliedAt } = getReport(row) || {}
    if (!appliedAt){
      return null
    }

    return moment(appliedAt).format("DD/MM/YYYY")
  }

  const onSave = monitoring => {
    const newReports = [ ...data.technicalMonitoringReports ]

    const index = newReports.findIndex(r => r.key === monitoring.key)
    if (index >= 0){
      newReports[index] = monitoring
      update(monitoring)
    } else {
      newReports.push(monitoring)
      save(monitoring)
    }

    onCancel()
  }

  const onEdit = row => {
    const report = data.technicalMonitoringReports?.find(report =>
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
        size="middle">
        <Table.Column
          render={(t, row) => getReport(row) && <CheckSquareTwoTone />}
          title={<CheckSquareTwoTone />}/>
        <Table.Column
          dataIndex="level"
          title="Nivel" />
        <Table.Column
          title="Resumen narrativo"
          sorter={(a, b) => a.description?.localeCompare(b.description)}
          showSorterTooltip={false}
          dataIndex="description" />
        <Table.Column
          render={(t, row) => getAppliedAt(row)}
          sorter={(a, b) =>
            moment(getReport(a)?.appliedAt) > moment(getReport(b)?.appliedAt)
          }
          showSorterTooltip={false}
          title="Realizado" />
        <Table.Column
          dataIndex="title"
          sorter={(a, b) => a.title?.localeCompare(b.title)}
          showSorterTooltip={false}
          title="Indicador" />
        <Table.Column
          dataIndex="meansOfVerification"
          sorter={(a, b) =>
            a.meansOfVerification?.localeCompare(b.meansOfVerification)
          }
          showSorterTooltip={false}
          title="Medio de verificación" />
        <Table.Column
          align="center"
          dataIndex="goal"
          sorter={(a, b) => (a.goal || 0) - (b.goal || 0)}
          showSorterTooltip={false}
          title="Meta" />
        <Table.Column
          align="center"
          render={(t, row) => getReport(row)?.completed || 0}
          title="Real"
          sorter={(a, b) =>
            (getReport(a)?.completed || 0) - (getReport(b)?.completed || 0)
          }
          showSorterTooltip={false}
          width={90} />
        <Table.Column
          align="center"
          render={(t, row) => `${getReport(row)?.compliance || 0}%`}
          sorter={(a, b) =>
            (getReport(a)?.compliance || 0) - (getReport(b)?.compliance || 0)
          }
          showSorterTooltip={false}
          title="Cumplimiento" />
        <Table.Column
          align="center"
          render={(t, row) => getParticipants(row)}
          sorter={(a, b) => getParticipants(a) - getParticipants(b)}
          showSorterTooltip={false}
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
