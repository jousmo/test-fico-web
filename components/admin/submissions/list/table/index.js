import { withForm, format } from "../../../../../helpers"
import { Table } from "antd"
import { useRouter } from "next/router"
import Moment from "moment"
Moment.locale("es")
import { capitalize } from "lodash"
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  getReadableValue,
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import { Tooltip } from "../../../../shared/tooltip"
import "./styles.sass"

function SubmissionsListingTable({ data }) {
  const router = useRouter()
  const { submissionStatusOptions, getFilterOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    },
  } = implementer

  const statusFilterOptions = getFilterOptions(submissionStatusOptions)
  const axisFilterOptions = getFilterOptions(strategicAxisTypes)
  const regionFilterOptions = getFilterOptions(regions)

  const handleClick = record => {
    return {
      onClick: () => {
        router.push(`/admin/submissions/${record.id}`)
      }
    }
  }

  return (
    <Table
      className="fico submissions list table"
      dataSource={data}
      rowKey={(row, index) => index}
      onRow={record => handleClick(record)}
      size="small">
      <Table.Column
        width={1}
        title={<MinusSquareTwoTone />} />
      <Table.Column
        dataIndex="createdAt"
        render={text => (
          Moment(text).format("DD/MM/YYYY")
        )}
        title="Fecha de solicitud" />
      <Table.Column
        dataIndex="name"
        title="Nombre de proyecto" />
      <Table.Column
        dataIndex="status"
        filters={statusFilterOptions}
        onFilter={(value, record) => record.status.indexOf(value) === 0}
        render={text =>
          getReadableValue(submissionStatusOptions, text)
        }
        title="Estatus" />
      <Table.Column
        render={(text, record) => (
          record.implementer?.name || "N/A"
        )}
        title="Implementadora" />
      <Table.Column
        dataIndex="region"
        filters={regionFilterOptions}
        onFilter={(value, record) => record.region.indexOf(value) === 0}
        title="Región" />
      <Table.Column
        dataIndex="strategicAxis"
        filters={axisFilterOptions}
        onFilter={(value, record) => record.strategicAxis.indexOf(value) === 0}
        render={text =>
          <Tooltip value={getReadableValue(strategicAxisTypes, text)} />
        }
        title="Eje" />
      <Table.Column
        dataIndex="budgeted"
        render={text => format.money(text)}
        title="Aprobado" />
    </Table>
  )
}

export default withForm(SubmissionsListingTable)
