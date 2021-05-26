import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import Moment from "moment"
import { conceptTypes } from "../../../../../../helpers/selectOptions/implementer/submission"

const displayAmount = (unitCost, value) => unitCost * Number(value || 0)

const typeConcept = type => conceptTypes?.find(el => el.value === type)

const projectMonths = ({ startDate,  endDate }) => Array
  .from(
    Moment
      .range(Moment(startDate), Moment(endDate))
      .by("month")
  )

const monthsColumns = (months, allies) => {
  const result = []
  months?.forEach(r => {
    result.push({ name: `FF ${Moment(r).format("MMMM")}`, totalsRowFunction: 'sum' })
    result.push({ name: `IMP. ${Moment(r).format("MMMM")}`, totalsRowFunction: 'sum' })
    allies?.forEach(ally => {
      result.push({ name: `${ally} ${Moment(r).format("MMMM")}`, totalsRowFunction: 'sum' })
    })
    result.push({ name: `Unidades ${Moment(r).format("MMMM YYYY")}` })
    result.push({ name: `Costo ${Moment(r).format("MMMM YYYY")}`, totalsRowFunction: 'sum' })
  })
  return result
}

export const exportBudget = async submission => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Presupuesto")
  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = "Presupuesto"
  titleInfo.font = { size: 20, bold: true }

  const months = projectMonths(submission)
  const monthColumns = monthsColumns(months, submission?.allies)
  const investorsColumns = [
    { name: "Implementadora" },
    { name: "FICOSEC" }
  ]
  const investors = ["IMPLEMENTER", "FICOSEC", "ALLIED1", "ALLIED2", "ALLIED"]
  submission?.allies?.forEach(ally => {
    investorsColumns.push({ name: ally })
  })

  const conceptsInfo = []
  submission?.concepts?.forEach(concept => {
    const {
      id,
      index,
      monthlyDistribution,
      investmentDistribution,
      humanResource,
      comments,
      ...el
    } = concept

    el.unitCost = displayAmount(1, el?.unitCost)
    el.budgeted = displayAmount(1, el?.budgeted)
    el.type = typeConcept(el?.type)?.label
    const result = Array.from(Object.values(el))

    investmentDistribution
      .sort((a, b) => investors.indexOf(a.type) - investors.indexOf(b.type))
      .forEach(el => {
        result?.push(`${el?.percentage}%`)
      })

    const investorDifference = investorsColumns.length - investmentDistribution.length
    if (investorDifference > 0) {
      Array.from([investorDifference]).forEach(el => {
        result?.push("0%")
      })
    }

    result.push(displayAmount(concept?.budgeted, (investmentDistribution[1].percentage / 100)))

    months.forEach((month, index) => {
      const total = concept?.unitCost * monthlyDistribution?.[index]
      result.push(displayAmount(total, (investmentDistribution[1].percentage / 100)))
      result.push(displayAmount(total, (investmentDistribution[0].percentage / 100)))
      if (investorsColumns.length > 2) {
        result.push(displayAmount(total, (investmentDistribution[2].percentage / 100)))
      }
      if (investorsColumns.length > 3) {
        result.push(total)
      }
      result.push(monthlyDistribution?.[index])
      result.push(total)
    })

    conceptsInfo.push(result)
  })

  worksheet.addTable({
    name: "Presupuesto",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    totalsRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "Concepto" },
      { name: "Región" },
      { name: "Tipo de gasto" },
      { name: "Unidad de medida" },
      { name: "Costo unitario" },
      { name: "Total de unidades" },
      { name: "Costo total", totalsRowFunction: 'sum' },
      ...investorsColumns,
      { name: "Aportación de FICOSEC", totalsRowFunction: 'sum' },
      ...monthColumns
    ],
    rows: conceptsInfo
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Presupuesto.xlsx")
}
