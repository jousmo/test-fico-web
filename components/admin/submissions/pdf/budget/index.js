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

  const getAmount = (row, percentage) => {
    return (row.unitCost * row.totalUnits) * percentage / 100
  }

  const submission = submissionResult?.data?.Submission

  return (
    <div className="fico pdf budget">
      <PDFHeading title="Presupuesto" />
      <Table
        dataSource={submission?.concepts}
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
          {submission?.allies?.map(ally => (
            <Table.Column
              render={(text, row) => {
                const percentage = row.investmentDistribution
                  .find(e => e.name === ally).percentage
                const total = getAmount(row, percentage)
                return <>${total}&nbsp;<Tag>{percentage}%</Tag></>
              }}
              title={ally} />
          ))}
          <Table.Column
            render={(text, row) => {
              const allies = row.investmentDistribution
                .filter(e => e.type === "ALLIED")
              let totalPercentage = 0
              let totalAmount = 0
              allies.forEach(ally => {
                totalPercentage += ally.percentage
                totalAmount += getAmount(row, ally.percentage)
              })
              return <>${totalAmount}&nbsp;<Tag>{totalPercentage}%</Tag></>
            }}
            title="TOTAL"/>
        </Table.Column>
      </Table>
    </div>
  )
}
