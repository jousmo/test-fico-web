import { withForm, format } from "../../../../../helpers"
import { useRouter } from "next/router"
import { Table } from "antd"
import Moment from "moment"
Moment.locale("es")
import { MinusSquareTwoTone } from "@ant-design/icons"
import {
  getReadableValue,
  implementer,
  shared
} from "../../../../../helpers/selectOptions"
import { Tooltip } from "../../../../shared"
import "./styles.sass"

function SubmissionsListingTable({ data }) {
  const router = useRouter()
  const { submissionStatusOptions } = shared
  const {
    submission: {
      strategicAxisTypes,
      regions
    }
  } = implementer

  const statusFilterOptions = submissionStatusOptions?.map(option => (
    {text: option.label, value: option.value}
  ))

  const axisFilterOptions = strategicAxisTypes?.map(option => (
    {text: option.label, value: option.value}
  ))

  const regionFilterOptions = regions?.map(option => (
    {text: option.label, value: option.value}
  ))

  const handleClick = record => {
    return {
      onClick: () => {
        router.push(`/implementer/submissions/${record.id}`)
      }
    }
  }

  return (
    <Table
      className="fico submissions list table"
      dataSource={data}
      rowKey={row  => row.id}
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
        onFilter={(value, record) => record.status?.indexOf(value) === 0}
        render={text =>
          getReadableValue(submissionStatusOptions, text)
        }
        title="Estatus" />
      <Table.Column
        dataIndex="region"
        filters={regionFilterOptions}
        onFilter={(value, record) => record.region?.indexOf(value) === 0}
        title="Región" />
      <Table.Column
        dataIndex="strategicAxis"
        filters={axisFilterOptions}
        onFilter={(value, record) => record.strategicAxis?.indexOf(value) === 0}
        render={text =>
          <Tooltip value={getReadableValue(strategicAxisTypes, text)} />
        }
        title="Eje" />
      <Table.Column
        dataIndex="approved"
        render={text => format.money(text)}
        title="Aprobado" />
    </Table>
  )
}

export default withForm(SubmissionsListingTable)
