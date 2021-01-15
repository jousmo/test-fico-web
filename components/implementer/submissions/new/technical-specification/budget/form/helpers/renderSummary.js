import { Table, Tag } from "antd"
import numeral from "numeral"

const getAmount = (row, percentage) => {
  return (row.unitCost * row.totalUnits) * percentage / 100
}

const getPercentage = (total, amount) => {
  return ((amount * 100) / total).toFixed(2)
}

export const renderSummary = (concepts, submission) => {
  if (!concepts.length) {
    return null
  }

  const firstAlly = submission?.allies?.[0]
  const secondAlly = submission?.allies?.[1]

  let result = { ficosec: 0, implementer: 0, absoluteTotal: 0, totalFirstAlly: 0, totalSecondAlly: 0, units: 0 }

  concepts.forEach(concept => {
    const totalCost = concept.totalUnits * concept.unitCost

    const firstAllyPercentage = concept.investmentDistribution
      ?.find(e => e.name === firstAlly)?.percentage
    const secondAllyPercentage = secondAlly ? concept.investmentDistribution
      ?.find(e => e.name === secondAlly)?.percentage : 0
    const ficosecPercentage = concept.investmentDistribution
      ?.find(e => e.name === "FICOSEC")?.percentage
    const implementerPercentage = concept.investmentDistribution
      ?.find(e => e.name === "Implementadora")?.percentage

    result = {
      units: result.units + concept.totalUnits,
      ficosec: result.ficosec + getAmount(concept, ficosecPercentage),
      implementer: result.implementer + getAmount(concept, implementerPercentage),
      absoluteTotal: result.absoluteTotal + totalCost,
      totalFirstAlly: result.totalFirstAlly + getAmount(concept, firstAllyPercentage),
      totalSecondAlly: result.totalSecondAlly + (secondAlly ? getAmount(concept, secondAllyPercentage) : 0),
    }
  });

  const { absoluteTotal, totalFirstAlly, totalSecondAlly, ficosec, implementer, units } = result

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell>Totales</Table.Summary.Cell>
      <Table.Summary.Cell/>
      <Table.Summary.Cell/>
      <Table.Summary.Cell/>
      <Table.Summary.Cell/>
      <Table.Summary.Cell/>
      <Table.Summary.Cell>
        {numeral(absoluteTotal).format("$0,0.00")}
      </Table.Summary.Cell>
      <Table.Summary.Cell>
        {numeral(implementer).format("$0,0.00")}&nbsp;<Tag>{getPercentage(absoluteTotal, ficosec)}%</Tag>
      </Table.Summary.Cell>
      <Table.Summary.Cell>
        {numeral(ficosec).format("$0,0.00")}&nbsp;<Tag>{getPercentage(absoluteTotal, implementer)}%</Tag>
      </Table.Summary.Cell>
      <Table.Summary.Cell>
        {numeral(totalFirstAlly).format("$0,0.00")}&nbsp;<Tag>{getPercentage(absoluteTotal, totalFirstAlly)}%</Tag>
      </Table.Summary.Cell>
      {submission?.allies?.[1] && (
        <Table.Summary.Cell>
          ${totalSecondAlly}&nbsp;<Tag>{getPercentage(absoluteTotal, totalSecondAlly)}%</Tag>
        </Table.Summary.Cell>
      )}
      <Table.Summary.Cell>
        {units}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  )
}
