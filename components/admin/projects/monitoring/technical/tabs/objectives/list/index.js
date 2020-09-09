import { Alert, Button, Table } from "antd"
import { SearchFieldPrimary, Tooltip } from "../../../../../../../shared"
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
import { getReport, getParticipants, getAppliedAt, onSearch } from "./helpers"

export function ObjectivesList({ data, dateFilter }) {
  const [state, setState] = useState({ isModalOpen: false, edit: undefined })
  const [filterState, setFilterState] = useState(false)

  const dataSource = decoratedData(data, dateFilter)
  const { save, update } = useContext(AdminSubmissionContext)

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
      <SearchFieldPrimary
        onSearch={value => onSearch(dataSource, value, setFilterState)}
        style={{marginBottom: "1rem"}} />
      <Alert
        type="info"
        showIcon
        message="Especifica cuántos participantes fueron atendidos y adjunta la
        evidencia necesaria en cada objetivo y actividad" />
      <ObjectivesModal
        edit={state.edit}
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <Table
        className="table-list"
        dataSource={filterState ? filterState : dataSource}
        size="middle">
        <Table.Column
          render={(t, row) => getReport(data, row)?.appliedAt && <CheckSquareTwoTone />}
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
          render={(t, row) => getAppliedAt(data, row)}
          sorter={(a, b) =>
            getReport(data, a)?.appliedAt?.localeCompare(getReport(data, b)?.appliedAt)
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
          render={(t, row) => getReport(data, row)?.completed || 0}
          title="Real"
          sorter={(a, b) =>
            (getReport(data, a)?.completed || 0) - (getReport(data, b)?.completed || 0)
          }
          showSorterTooltip={false}
          width={90} />
        <Table.Column
          align="center"
          render={(t, row) => `${getReport(data, row)?.compliance || 0}%`}
          sorter={(a, b) =>
            (getReport(data, a)?.compliance || 0) - (getReport(data, b)?.compliance || 0)
          }
          showSorterTooltip={false}
          title="Cumplimiento" />
        <Table.Column
          align="center"
          render={(t, row) => getParticipants(data, row)}
          sorter={(a, b) => getParticipants(data, a) - getParticipants(data, b)}
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
