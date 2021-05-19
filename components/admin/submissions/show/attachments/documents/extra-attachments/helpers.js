import * as ExcelJS from "exceljs"

export const attachmentThree = async submission => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Anexo 3")
  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = "Anexo 3"
  titleInfo.font = { size: 20, bold: true }

  const months = projectMonths(submission)
  const monthColumns = monthsColumns(months)
  const investorsColumns = [
    { name: "Implementadora" },
    { name: "FICOSEC" }
  ]
  const investors = ["Implementadora", "FICOSEC"]
  submission?.allies?.forEach(ally => {
    investorsColumns.push({ name: ally })
    investors.push(ally)
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
      .sort((a, b) => investors.indexOf(a.name) - investors.indexOf(b.name))
      .forEach(el => {
        result?.push(`${el?.percentage}%`)
      })

    const investorDifference = investorsColumns.length - investmentDistribution.length
    if (investorDifference > 0) {
      Array.from([investorDifference]).forEach(el => {
        result?.push("0%")
      })
    }

    months.forEach((month, index) => {
      result.push(...[
        monthlyDistribution?.[index],
        displayAmount(concept?.unitCost, monthlyDistribution?.[index])
      ])
    })

    conceptsInfo.push(result)
  })

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
      ...investorsColumns,
      ...monthColumns
    ],
    rows: conceptsInfo
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Presupuesto.xlsx")
}
