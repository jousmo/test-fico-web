import { Table, Tag } from "antd"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { getReadableValue } from "../../../../../helpers/selectOptions"
import {
  conceptTypes
} from "../../../../../helpers/selectOptions/implementer/submission"
import PDFHeading from "../heading"
import "../style.sass"

export function BudgetPDF() {
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)

  return (
    <div className="fico pdf budget">
      <PDFHeading title="Presupuesto" />
      <Table
        dataSource={submissionResult?.data?.Submission?.concepts}
        pagination={false}
        rowKey={(row, index) => index}>
        <Table.Column
          render={(text, row, index) => index + 1}
          title="#" />
        <Table.Column
          dataIndex="name"
          title="Concepto" />
        <Table.Column
          dataIndex="type"
          render={text => getReadableValue(conceptTypes, text)}
          title="Tipo" />
        <Table.Column title="Aportaciones">
          <Table.Column
            title="FF AC" />
          <Table.Column
            title="FECHAC" />
          <Table.Column
            title="OSC" />
          <Table.Column
            render={(text, row) => {
              const percentageAllies = row.investmentDistribution
                .find(investor => (
                  investor.name === "Aliado(s)"
                )).percentage
              const total = (row.unitCost * row.totalUnits) *
                percentageAllies / 100
              return <>${total}&nbsp;<Tag>100%</Tag></>
            }}
            title="TOTAL" />
        </Table.Column>
      </Table>
    </div>
  )
}
