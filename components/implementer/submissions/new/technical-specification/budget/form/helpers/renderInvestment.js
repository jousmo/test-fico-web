import { Typography } from "antd"
import numeral from "numeral"

export const renderInvestment = (type, allyIndex) => (text, record, index) => {
  let percentage = 0
  if (type.includes("ALLIED")) {
    const alliesInvestment = record.investmentDistribution
      .filter(el => el.type.includes("ALLIED"))
    const typePercentage = alliesInvestment?.find(i => i.type === type)?.percentage
    percentage = isNaN(typePercentage) ? alliesInvestment[allyIndex]?.percentage : typePercentage
  } else {
    percentage = record.investmentDistribution
      ?.find(i => i.type === type)?.percentage || 0
  }

  const total = Number(record.unitCost) * Number(record.totalUnits)

  const totalFormatted = numeral(total / 100 * percentage).format("$0,0.00")
  const percentageFormatted = numeral(percentage / 100).format("0.00%")

  return <>
    <Typography.Text>{totalFormatted}</Typography.Text>
    &nbsp;
    <Typography.Text type="danger">({percentageFormatted})</Typography.Text>
  </>
}
