import numeral from "numeral"

export const renderTotal = (text, record, index) => {  
  const total = Number(record.unitCost) * Number(record.totalUnits)

  return numeral(total).format("$0,0.00")
}
