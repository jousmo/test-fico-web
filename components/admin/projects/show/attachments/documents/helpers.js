import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { extendMoment } from "moment-range"
import Moment from "moment"
import numeral from "numeral"
const moment = extendMoment(Moment)
moment.locale("es")
import {
  measurementPeriodicityTypes,
  conceptTypes,
  verificationTypes,
  contractTypes
} from "../../../../../../helpers/selectOptions/implementer/submission"
import { capitalize } from "lodash"
import { getReadableValue } from "../../../../../../helpers/selectOptions"
import { BENEFICIARIES, GENERAL_INFO, IMPLEMENTER } from "./constants"

const projectMonths = ({ startDate,  endDate }) => Array
  .from(
    moment
      .range(moment(startDate), moment(endDate))
      .by("month")
  )
  ?.map(r => r.format("MMMM YYYY"))

const displayMonthTotal = (unitCost, value) =>
  numeral(unitCost * Number(value || 0)).format("$0,0.00")

const periodicityTypesMeasurement = type => measurementPeriodicityTypes?.find(el => el.value === type)

const typeConcept = type => conceptTypes?.find(el => el.value === type)

const typeBooleans = type => [true].includes(type) ? "Si" : "No"

const translateDate = (date, format, currentFormat = "YYYY/MM/DD") => {
  if (!date) return ""
  return moment(date, currentFormat).format(format)
}

const findNameConcept = (concepts, id) => {
  const { name } = concepts?.find(concept => concept.id === id)
  return name
}

const getMergedCell = (worksheet, range, value) => {
  worksheet.mergeCells(range)
  getLabelCell(worksheet, range.split(":")[0], value)
}

const getLabelCell = (worksheet, cellKey, value, centered) => {
  const cell = worksheet.getCell(cellKey)
  cell.value = value
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 14 }
  cell.border = {
    top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }
  }
  cell.fill = {
    type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF80221C' }, bgColor: { argb: "FFFFFFFF" }
  }
  if (centered) {
    cell.alignment = { horizontal: 'center' }
  }
}

const getValueCell = (worksheet, cellKey, value, fn, bold, centered) => {
  const cell = worksheet.getCell(cellKey)
  cell.font = { size: 14, bold }
  cell.value = fn ? fn(value) : value
  cell.alignment = { wrapText: true, horizontal: centered ? 'center' : 'left' }
  cell.border = {
    top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }
  }
}

export const generalInformationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Anexo 1.1")
  worksheet.getColumn('C').width = 40
  worksheet.getColumn('D').width = 80

  let titleInfo = worksheet.getCell("C3")
  titleInfo.value = "ANEXO 1.1 Información General"
  titleInfo.font = { size: 20, bold: true }

  const {
    beneficiaries, implementer,
    specificObjectives, ...submission
  } = data

  let row = 4
  IMPLEMENTER.forEach(({ label, key }) => {
    getLabelCell(worksheet, `C${row}`, label)
    getValueCell(worksheet, `D${row}`, implementer[key])
    row++
  })

  const projectLabel = worksheet.getCell(`C${row}`)
  projectLabel.value = "Proyecto"
  projectLabel.font = { bold: true, size: 18 }
  row++

  GENERAL_INFO.forEach(({ label, key, getValue }) => {
    getLabelCell(worksheet, `C${row}`, label)
    getValueCell(worksheet, `D${row}`, submission[key], getValue)
    row++
  })

  specificObjectives.sort((a, b) => a.orderIndex - b.orderIndex).forEach(({ description }, index) => {
    getLabelCell(worksheet, `C${row}`, `Objetivo específico ${index + 1}`)
    getValueCell(worksheet, `D${row}`, description)
    row++
  })

  beneficiaries.forEach((beneficiary, index) => {
    getMergedCell(worksheet, `C${row}:C${row + 5}`, `Perfil del Beneficiario ${index + 1}`)
    BENEFICIARIES.forEach(({ key, getValue }) => {
      getValueCell(worksheet, `D${row}`, beneficiary[key], getValue)
      row++
    })
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Info_General.xlsx")
}

const getIndicator = (worksheet, row, el) => {
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, "")
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, `Indicador: ${el.title}`)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, el.description)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, "Metodología", undefined, true, true)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, el.methodology)
  row++
  getValueCell(worksheet, `B${row}`, "Línea base", undefined, true, true)
  getValueCell(worksheet, `C${row}`, "Meta", undefined, true, true)
  getValueCell(worksheet, `D${row}`, "Formula", undefined, true, true)
  row++
  getValueCell(worksheet, `B${row}`, el.baseline)
  getValueCell(worksheet, `C${row}`, el.goal)
  getValueCell(worksheet, `D${row}`, el.formula)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, "Medios de verificación", undefined, true)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(
    worksheet,
    `B${row}`,
    el.meansOfVerification?.map(mean => getReadableValue(verificationTypes, mean)).join(', ')
  )
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, "Productos", undefined, true)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, el.products?.join(', '))
  row++
  return row
}

const getActivity = (worksheet, row, activity, index) => {
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, `Actividad ${index + 1}: ${activity.title}`)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, `Responsable: ${activity.responsible}`)
  row++
  getValueCell(worksheet, `B${row}`, "Línea base", undefined, true, true)
  getValueCell(worksheet, `C${row}`, "Meta", undefined, true, true)
  getValueCell(worksheet, `D${row}`, "Formula", undefined, true, true)
  row++
  getValueCell(worksheet, `B${row}`, activity.baseline)
  getValueCell(worksheet, `C${row}`, activity.goal)
  getValueCell(worksheet, `D${row}`, activity.formula)
  row++
  getValueCell(worksheet, `B${row}`, "Medio de verificación", undefined, true, true)
  getValueCell(worksheet, `C${row}`, "Lugar de intervención", undefined, true, true)
  getValueCell(worksheet, `D${row}`, "Mes de implementación", undefined, true, true)
  row++
  getValueCell(
    worksheet,
    `B${row}`,
    activity.meansOfVerification?.map(mean => getReadableValue(verificationTypes, mean)).join(', ')
  )
  getValueCell(worksheet, `C${row}`, activity.place)
  getValueCell(
    worksheet,
    `D${row}`,
    activity.months.map(value =>
      Array.from(Moment.range(value[0], value[1]).by("month"))?.map(r => r.format("MMMM YYYY")).join(", ")
    ).join(", ")
  )
  row++
  return row
}

export const technicalSpecificationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Anexo 1.2")
  worksheet.getColumn('B').width = 35
  worksheet.getColumn('C').width = 35
  worksheet.getColumn('D').width = 35

  let titleInfo = worksheet.getCell("B3")
  titleInfo.value = "ANEXO 1.2 Ficha técnica"
  titleInfo.font = { size: 20, bold: true }

  getLabelCell(worksheet, "B4", "Proyecto")
  worksheet.mergeCells("C4:D4")
  getValueCell(worksheet, "C4", data?.name)

  worksheet.mergeCells("B5:D5")
  getLabelCell(worksheet, "B5", "Objetivo de desarrollo", true)
  worksheet.mergeCells("B6:D6")
  getValueCell(worksheet, "B6", data?.developmentObjective)

  let row = 7
  data?.developmentObjectiveIndicators?.forEach(el => {
    row = getIndicator(worksheet, row, el)
  })

  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getLabelCell(worksheet, `B${row}`, "Objetivo general", true)
  row++
  worksheet.mergeCells(`B${row}:D${row}`)
  getValueCell(worksheet, `B${row}`, data?.generalObjective)

  row++
  data?.generalObjectiveIndicators?.forEach(el => {
    row = getIndicator(worksheet, row, el)
  })

  data?.specificObjectives.sort((a, b) => a.orderIndex - b.orderIndex).forEach((el, index) => {
    row++
    worksheet.mergeCells(`B${row}:D${row}`)
    getLabelCell(worksheet, `B${row}`, `Objetivo específico ${index + 1}`, true)
    row++
    worksheet.mergeCells(`B${row}:D${row}`)
    getValueCell(worksheet, `B${row}`, el.description)

    row++
    el.indicators?.forEach(indicator => {
      row = getIndicator(worksheet, row, indicator)
    })

    row++
    worksheet.mergeCells(`B${row}:D${row}`)
    getLabelCell(worksheet, `B${row}`, 'Actividades', true)

    el.activities?.sort((a, b) => a.orderIndex - b.orderIndex).forEach((activity, index) => {
      row = getActivity(worksheet, row, activity, index)
    })
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Ficha_Tecnica.xlsx")
}

export const budgetExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Presupuesto")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = "Presupuesto"
  titleInfo.font = { size: 20, bold: true }

  let concepts = data?.concepts?.map(({
    id,
    monthlyDistribution,
    investmentDistribution,
    humanResource,
    comments,
    ...el
  }) => {
    el.unitCost = displayMonthTotal(1, el?.unitCost)
    el.budgeted = displayMonthTotal(1, el?.budgeted)
    el.type = typeConcept(el?.type)?.label
    return Object.values(el)
  })

  concepts = concepts?.length ? concepts : [[]]

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
    ],
    rows: concepts
  })

  data?.concepts?.forEach((concept, index)=> {
    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = `Distribución mensual - ${concept?.name}`
    titleInfo.font = { size: 20, bold: true }

    const months = projectMonths(data)
    const rowsMonths = months?.map((label, index) => {
      const data = {
        label,
        value: concept?.monthlyDistribution?.[index],
        total: displayMonthTotal(concept?.unitCost, concept?.monthlyDistribution?.[index])
      }
      return Object.values(data)
    })

    worksheet.addTable({
      name: `Mensual${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Mes" },
        { name: "Unidades" },
        { name: "Costo" }
      ],
      rows: rowsMonths
    })

    const columnsInvestment = []
    const rowsInvestment = []
    concept?.investmentDistribution?.forEach(el => {
      columnsInvestment?.push({ name: el?.name })
      rowsInvestment?.push(`${el?.percentage}%`)
    })

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = `Distribución de la inversión - ${concept?.name}`
    titleInfo.font = { size: 20, bold: true }

    worksheet.addTable({
      name: `Inversion${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: columnsInvestment,
      rows: [rowsInvestment]
    })
  })



  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Presupuesto.xlsx")
}

export const humanResourcesExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Recursos Humanos")

  data?.concepts?.forEach((concept, index) => {

    if (!concept?.humanResource.length) return;

    let titleInfo = worksheet.getCell("A1")
    titleInfo.value = `Recursos Humanos - ${concept.name}`
    titleInfo.font = { size: 20, bold: true }

    let rh = concept?.humanResource?.map(({
      id,
      documents,
      comments,
      ...el
    }) => {
      el.benefits = typeBooleans(el?.benefits)
      el.total = numeral(((el?.taxes / 100) * el?.salary) + el?.salary).format("$0,0.00")
      el.contractType = getReadableValue(contractTypes, el?.contractType)
      el.taxes = `${el?.taxes || 0} %`
      return Object.values(el)
    })

    worksheet.addTable({
      name: `RH${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Puesto" },
        { name: "Nombre completo" },
        { name: "Funciones" },
        { name: "Supervisa a" },
        { name: "Horas" },
        { name: "Contratación" },
        { name: "Salario" },
        { name: "Prestaciones" },
        { name: "Iva" },
        { name: "Total" }
      ],
      rows: rh
    })
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "RH.xlsx")
}

export const scheduleExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Cronograma")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = `Cronograma`
  titleInfo.font = { size: 20, bold: true }

  data?.specificObjectives?.forEach((objective, index) => {

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = `Objetivo especifico - ${objective?.description}`
    titleInfo.font = { size: 18, bold: true }

    let activities = objective?.activities?.map(({
      id,
      orderIndex,
      inputs,
      products,
      comments,
      schedules,
      ...el
    }) => {
      el.months = el.months = el?.months?.reduce((prev, next) => {
        const format = next?.map(el => capitalize(translateDate(el, "MMMM YYYY")))
        return prev?.concat(format?.join(' - '))
      }, [])?.join(' | ')
      return Object.values(el)
    })

    activities = activities?.length ? activities : [[]]

    worksheet.addTable({
      name: `Cronograma${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Actividad" },
        { name: "Descripción" },
        { name: "Responsable" },
        { name: "Metodología" },
        { name: "Formula" },
        { name: "Verificación" },
        { name: "Base" },
        { name: "Meta" },
        { name: "Lugar" },
        { name: "Meses" }
      ],
      rows: activities
    })
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Cronograma.xlsx")
}

export const financialMonitoringExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Monitoreo Financiero")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = `Monitoreo Financiero`
  titleInfo.font = { size: 20, bold: true }

  let invoices = data?.invoices?.map(({
    id,
    reviewed,
    documents,
    typeRH,
    ...el
  }) => {
    el.concept = findNameConcept(data?.concepts, el?.concept)
    el.issuedAt = translateDate(el?.issuedAt, "DD/MM/YYYY")
    el.monthAt = capitalize(translateDate(el?.monthAt, "MMMM YYYY", "MM YYYY"))
    el.paymentAt = translateDate(el?.paymentAt, "DD/MM/YYYY")
    el.category = typeConcept(el?.category)?.label
    el.amount = displayMonthTotal(1, el?.amount)
    el.ficosecPayment = displayMonthTotal(1, el?.ficosecPayment)
    el.implementerPayment = displayMonthTotal(1, el?.implementerPayment)
    el.investmentOnePayment = displayMonthTotal(1, el?.investmentOnePayment)
    el.investmentTwoPayment = displayMonthTotal(1, el?.investmentTwoPayment)
    el.percentage = `${el?.percentage} %`
    return Object.values(el)
  })

  invoices = invoices?.length ? invoices : [[]]

  worksheet.addTable({
    name: `Monitoreo`,
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "UUID" },
      { name: "Razon social del emisor" },
      { name: "Rfc del emisor" },
      { name: "Fecha de emisión" },
      { name: "Razon social del receptor" },
      { name: "Mes de asignación" },
      { name: "Concepto" },
      { name: "Categoria" },
      { name: "Fecha de pago" },
      { name: "Ficosec" },
      { name: "Coinversión 1" },
      { name: "Coinversión 2" },
      { name: "Implementadora" },
      { name: "Importe factura" },
      { name: "Uso del presupuesto" }
    ],
    rows: invoices
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "MonitoreoFinanciero.xlsx")
}
