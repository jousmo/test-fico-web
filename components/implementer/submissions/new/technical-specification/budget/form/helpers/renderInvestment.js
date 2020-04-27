import { Typography } from "antd"
import numeral from "numeral"

export const renderInvestment = (type) => (text, record, index) => {
  const percentage = record.investmentDistribution
    .find(i => i.name === type)?.percentage || 0
  
  const total = Number(record.unitCost) * Number(record.totalUnits)

  const totalFormatted = numeral(total / 100 * percentage).format("$0,0.00")
  const percentageFormatted = numeral(percentage / 100).format("0.00%")

  return <>
    <Typography.Text>{totalFormatted}</Typography.Text>
    &nbsp;
    <Typography.Text type="danger">({percentageFormatted})</Typography.Text>
  </>
}
