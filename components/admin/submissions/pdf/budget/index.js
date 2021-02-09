import { Table, Tag, Typography } from "antd"
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
  const { data } = useContext(AdminSubmissionContext)
  const submission = data?.Ministrations

  const getAmount = (row, percentage = 0) => {
    return (row.unitCost * row.totalUnits) * percentage / 100
  }

  const getPercentage = (total, amount) => {
    return (amount * 100) / total
  }

  const getSummary = (concepts) => {
    const firstAlly = submission?.allies?.[0]
    const secondAlly = submission?.allies?.[1]

    let totalAllies = 0
    let totalFirstAlly = 0
    let totalSecondAlly = 0
    let absoluteTotal = 0

    concepts.forEach(concept => {
      const totalCost = concept.totalUnits * concept.unitCost

      const firstAllyPercentage = concept.investmentDistribution
        ?.find(e => e.name === firstAlly)?.percentage || 0
      const secondAllyPercentage = secondAlly ? concept.investmentDistribution
        ?.find(e => e.name === secondAlly).percentage : 0

      absoluteTotal += totalCost
      totalFirstAlly += getAmount(concept, firstAllyPercentage)
      totalSecondAlly += secondAlly ? getAmount(concept, secondAllyPercentage) : 0
      totalAllies += (totalCost * firstAllyPercentage / 100) +
        (totalCost * secondAllyPercentage / 100)
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell>Totales</Table.Summary.Cell>
          <Table.Summary.Cell/>
          <Table.Summary.Cell/>
          <Table.Summary.Cell>
            ${totalFirstAlly}&nbsp;
            <Tag>{getPercentage(totalAllies > 0 ? totalAllies : 1, totalFirstAlly)}%</Tag>
          </Table.Summary.Cell>
          {submission?.allies?.[1] && (
            <Table.Summary.Cell>
              ${totalSecondAlly}&nbsp;<Tag>{getPercentage(totalAllies, totalSecondAlly)}%</Tag>
            </Table.Summary.Cell>
          )}
          <Table.Summary.Cell>
            <Typography.Text>
              ${totalAllies}&nbsp;<Tag>{getPercentage(absoluteTotal, totalAllies)}%</Tag>
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    )
  }

  return (
    <div className="fico pdf budget">
      <PDFHeading title="Presupuesto" />
      <Table
        dataSource={submission?.concepts}
        pagination={false}
        rowKey={(row, index) => index}
        summary={pageData => getSummary(pageData)}>
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
                  ?.find(e => e.name === ally)?.percentage
                const total = getAmount(row, percentage)
                return <>${total}&nbsp;<Tag>{percentage || 0}%</Tag></>
              }}
              title={ally} />
          ))}
          <Table.Column
            render={(text, row) => {
              const allies = row.investmentDistribution
                ?.filter(e => e.type === "ALLIED")
              let totalPercentage = 0
              let totalAmount = 0
              allies?.forEach(ally => {
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
