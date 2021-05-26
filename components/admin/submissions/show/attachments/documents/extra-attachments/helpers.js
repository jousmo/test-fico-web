import * as ExcelJS from "exceljs"
import Moment from "moment"
import { loadingAlert, warning } from "../../../../../../../helpers"

const getPeriodColumns = periods => {
  return periods.map((el, index) => (
    {
      name: `Periodo ${index + 1} | ${Moment(el[0]).format("DD/MM/YY")} - ${Moment(el[1]).endOf('month').format("DD/MM/YY")}`,
      totalsRowFunction: 'sum'
    }
  ))
}

export const attachmentThree = async (submission, periods) => {
  const downloading = loadingAlert("Generando anexo...")
  try {
    if (!periods || !periods.length) {
      warning("Favor de agregar periodos")
      return
    }
    const workbook = new ExcelJS.Workbook()
    let worksheet = workbook.addWorksheet("Anexo 3")
    let titleInfo = worksheet.getCell("A1")
    titleInfo.value = "Anexo 3"
    titleInfo.font = { size: 20, bold: true }

    const periodColumns = getPeriodColumns(periods)

    const investments = { Implementadora: {}, FICOSEC: {} }

    const firstAlly = submission?.allies[0]
    const secondAlly = submission?.allies[0]
    if (firstAlly) investments[firstAlly] = {}
    if (secondAlly) investments[secondAlly] = {}

    const periodsMonths = periods?.map(([startDate, endDate], index) => {
      investments["Implementadora"][index] = 0
      investments["FICOSEC"][index] = 0
      if (firstAlly) {
        investments[firstAlly][index] = 0
      }
      if (secondAlly) {
        investments[secondAlly][index] = 0
      }
      return Moment(endDate).diff(startDate, "months", true)
    })
    investments["Implementadora"]["total"] = 0
    investments["FICOSEC"]["total"] = 0
    if (firstAlly) {
      investments[firstAlly]["total"] = 0
    }
    if (secondAlly) {
      investments[secondAlly]["total"] = 0
    }

    submission?.concepts?.forEach(concept => {
      const { unitCost, monthlyDistribution, investmentDistribution } = concept
      const distribution = Array.from(monthlyDistribution)

      const percentages = investmentDistribution.reduce((prev, current) => {
        prev[current.name] = current.percentage
        return prev
      }, {})

      periodsMonths.forEach((months, index) => {
        let totalUnits = 0
        for (let x = 0; x < months; x++) {
          const value = distribution.shift()
          totalUnits += value
        }
        const total = unitCost * totalUnits
        investments["Implementadora"][index] += (total * percentages["Implementadora"]) / 100
        investments["Implementadora"]["total"] += (total * percentages["Implementadora"]) / 100
        investments["FICOSEC"][index] += (total * percentages["FICOSEC"]) / 100
        investments["FICOSEC"]["total"] += (total * percentages["FICOSEC"]) / 100
        if (firstAlly) {
          const totalAlly = total * percentages[firstAlly]
          if (isNaN(totalAlly)) {
            throw ("ALLIES")
          }
          investments[firstAlly][index] += totalAlly / 100
          investments[firstAlly]["total"] += totalAlly / 100
        }
        if (secondAlly) {
          const totalAlly = total * percentages[secondAlly]
          if (isNaN(totalAlly)) {
            throw ("ALLIES")
          }
          investments[secondAlly][index] += totalAlly / 100
          investments[secondAlly]["total"] += totalAlly / 100
        }
      })
    })

    const rows = Object.entries(investments).map(([key, value]) => {
      return [key, ...Object.values(value)]
    })

    worksheet.addTable({
      name: "Anexo3",
      ref: `B3`,
      headerRow: true,
      totalsRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Aportante \\ Fecha" },
        ...periodColumns,
        { name: "TOTAL", totalsRowFunction: 'sum' },
      ],
      rows
    })

    const buf = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buf]), "Anexo_3.xlsx")
  } catch (err) {
    if (typeof err === 'string' || err.includes("ALLIES")) {
      console.log(err)
      warning("Favor de revisar los aliados en el presupuesto...")
    } else {
      warning()
      console.log(err)
    }
  }
  downloading()
}

export const attachmentFour = async (periods) => {
  const downloading = loadingAlert("Generando anexo...")
  try {
    if (!periods || !periods.length) {
      warning("Favor de agregar periodos")
      return
    }
    const workbook = new ExcelJS.Workbook()
    let worksheet = workbook.addWorksheet("Anexo 4")
    let titleInfo = worksheet.getCell("A1")
    titleInfo.value = "Anexo 4"
    titleInfo.font = { size: 20, bold: true }

    const periodColumns = periods?.map((el, index) => ({ name: `Periodo ${index + 1}` }))

    const dates = {
      'Fecha de entrega de parte de "DESEC"': [],
      'Fecha inicial del periodo': [],
      'Fecha final del periodo': []
    }

    periods?.forEach(([start, end]) => {
      dates["Fecha inicial del periodo"].push(Moment(start).format("DD/MM/YYYY"))
      dates["Fecha final del periodo"].push(Moment(end).endOf('month').format("DD/MM/YYYY"))
    })

    worksheet.addTable({
      name: "Anexo4",
      ref: `B3`,
      headerRow: true,
      totalsRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: " " },
        ...periodColumns,
      ],
      rows: Object.entries(dates).map(([key, value]) => {
        return [key, ...value]
      })
    })

    const buf = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buf]), "Anexo_4.xlsx")
  } catch (err) {
    warning()
    console.log(err)
  }
  downloading()
}
