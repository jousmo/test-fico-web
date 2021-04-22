import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import numeral from "numeral"
import Moment from "moment"
import { conceptTypes } from "../../../../../../helpers/selectOptions/implementer/submission"

const displayAmount = (unitCost, value) =>
  numeral(unitCost * Number(value || 0)).format("$0,0.00")

const typeConcept = type => conceptTypes?.find(el => el.value === type)

const projectMonths = ({ startDate,  endDate }) => Array
  .from(
    Moment
      .range(Moment(startDate), Moment(endDate))
      .by("month")
  )

const monthsColumns = months => {
  const result = []
  months?.forEach(r => {
    result.push({ name: `Unidades ${Moment(r).format("MMMM YYYY")}` })
    result.push({ name: `Costo ${Moment(r).format("MMMM YYYY")}` })
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
  const monthColumns = monthsColumns(months)
  let investors = new Set()

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

    investmentDistribution?.forEach(el => {
      investors.add(el?.name)
      result?.push(`${el?.percentage}%`)
    })

    months.forEach((month, index) => {
      result.push(...[
        monthlyDistribution?.[index],
        displayAmount(concept?.unitCost, monthlyDistribution?.[index])
      ])
    })

    conceptsInfo.push(result)
  })

  investors = Array.from(investors).map(el => ({ name: el }))

  worksheet.addTable({
    name: "Presupuesto",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
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
      { name: "Costo total" },
      ...investors,
      ...monthColumns
    ],
    rows: conceptsInfo
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Presupuesto.xlsx")
}
