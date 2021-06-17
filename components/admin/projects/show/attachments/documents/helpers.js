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

const getLabelCell = (worksheet, cellKey, value) => {
  const cell = worksheet.getCell(cellKey)
  cell.value = value
  cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 14 }
  cell.border = {
    top: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }
  }
  cell.fill = {
    type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF80221C' }, bgColor: { argb: "FFFFFFFF" }
  }
}

const getValueCell = (worksheet, cellKey, value, fn) => {
  const cell = worksheet.getCell(cellKey)
  cell.font = { size: 14 }
  cell.value = fn ? fn(value) : value
  cell.alignment = { wrapText: true }
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

  specificObjectives.forEach(({ description }, index) => {
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

export const technicalSpecificationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Ficha Técnica")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = "Objetivo de desarrollo"
  titleInfo.font = { size: 20, bold: true }

  titleInfo = worksheet.getCell("A3")
  titleInfo.value = data?.developmentObjective
  titleInfo.font = { size: 16, bold: true }

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Indicadores"
  titleInfo.font = { size: 14, bold: true }

  let developmentObjectiveIndicators = data?.developmentObjectiveIndicators?.map(({
    id,
    type,
    comments,
    ...el
  }) => {
    el.startDate = translateDate(el?.startDate, "DD/MM/YYYY")
    el.endDate = translateDate(el?.endDate, "DD/MM/YYYY")
    el.products = el?.products?.join(' | ')
    el.meansOfVerification = el?.meansOfVerification
      ?.map(mean => getReadableValue(verificationTypes, mean))
      .join(' | ')
    el.measurementPeriodicity = periodicityTypesMeasurement(el?.measurementPeriodicity)?.label
    return Object.values(el)
  })

  developmentObjectiveIndicators = developmentObjectiveIndicators?.length ? developmentObjectiveIndicators : [[]]

  worksheet.addTable({
    name: "FichaTecnica",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "Tipo del indicador" },
      { name: "Descripción" },
      { name: "Metodología" },
      { name: "Fórmula" },
      { name: "Medio de verificación" },
      { name: "Línea base" },
      { name: "Meta" },
      { name: "Fecha de inicio" },
      { name: "Fecha de fin" },
      { name: "Periodicidad de medición" },
      { name: "Productos" }
    ],
    rows: developmentObjectiveIndicators
  })

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Objetivo Generales"
  titleInfo.font = { size: 20, bold: true }

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = data?.generalObjective
  titleInfo.font = { size: 16, bold: true }

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Indicadores"
  titleInfo.font = { size: 14, bold: true }

  let generalObjectiveIndicators = data?.generalObjectiveIndicators?.map(({
    id,
    type,
    comments,
    ...el
  }) => {
    el.startDate = translateDate(el?.startDate, "DD/MM/YYYY")
    el.endDate = translateDate(el?.endDate, "DD/MM/YYYY")
    el.products = el?.products?.join(' | ')
    el.meansOfVerification = el?.meansOfVerification
      ?.map(mean => getReadableValue(verificationTypes, mean))
      .join(' | ')
    el.measurementPeriodicity = periodicityTypesMeasurement(el?.measurementPeriodicity)?.label
    return Object.values(el)
  })

  generalObjectiveIndicators = generalObjectiveIndicators?.length ? generalObjectiveIndicators : [[]]

  worksheet.addTable({
    name: "FichaTecnica2",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "Tipo del indicador" },
      { name: "Descripción" },
      { name: "Metodología" },
      { name: "Fórmula" },
      { name: "Medio de verificación" },
      { name: "Línea base" },
      { name: "Meta" },
      { name: "Fecha de inicio" },
      { name: "Fecha de fin" },
      { name: "Periodicidad de medición" },
      { name: "Productos" }
    ],
    rows: generalObjectiveIndicators
  })

  data?.specificObjectives?.forEach((specificObjectives, index) => {

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = `Objetivo epecifico ${index + 1}`
    titleInfo.font = { size: 20, bold: true }

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = specificObjectives?.description
    titleInfo.font = { size: 16, bold: true }

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = "Indicadores"
    titleInfo.font = { size: 14, bold: true }

    let indicators = specificObjectives?.indicators?.map(({
      id,
      type,
      comments,
      orderIndex,
      ...el
    }) => {
      el.startDate = translateDate(el?.startDate, "DD/MM/YYYY")
      el.endDate = translateDate(el?.endDate, "DD/MM/YYYY")
      el.products = el?.products?.join(' | ')
      el.meansOfVerification = el?.meansOfVerification
        ?.map(mean => getReadableValue(verificationTypes, mean))
        .join(' | ')
      el.measurementPeriodicity = periodicityTypesMeasurement(el?.measurementPeriodicity)?.label
      return Object.values(el)
    })

    indicators = indicators?.length ? indicators : [[]]

    worksheet.addTable({
      name: `Indicadores${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Tipo del indicador" },
        { name: "Descripción" },
        { name: "Metodología" },
        { name: "Fórmula" },
        { name: "Medio de verificación" },
        { name: "Línea base" },
        { name: "Meta" },
        { name: "Fecha de inicio" },
        { name: "Fecha de fin" },
        { name: "Periodicidad de medición" },
        { name: "Productos" }
      ],
      rows: indicators
    })

    titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
    titleInfo.value = "Actividades"
    titleInfo.font = { size: 14, bold: true }

    let activities = specificObjectives?.activities?.map(({
      id,
      comments,
      orderIndex,
      schedules,
      ...el
    }) => {
      el.inputs = el?.inputs?.join(' | ')
      el.products = el?.products?.join(' | ')
      el.months = el?.months?.reduce((prev, next) => {
        const format = next?.map(el => capitalize(translateDate(el, "MMMM YYYY")))
        return prev?.concat(format?.join(' - '))
      }, [])?.join(' | ')

      return Object.values(el)
    })

    activities = activities?.length ? activities : [[]]

    worksheet.addTable({
      name: `Actividades${index}`,
      ref: `A${worksheet?.lastRow?._number + 2}`,
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns: [
        { name: "Tipo del indicador" },
        { name: "Descripción" },
        { name: "Responsable" },
        { name: "Metodología" },
        { name: "Fórmula" },
        { name: "Medio de verificación" },
        { name: "Línea base" },
        { name: "Meta" },
        { name: "Lugar de intervención" },
        { name: "Meses de implementación" },
        { name: "Insumos" },
        { name: "Productos" }
      ],
      rows: activities
    })
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Tecnica.xlsx")
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
