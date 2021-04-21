import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { extendMoment } from "moment-range"
import Moment from "moment"
import numeral from "numeral"
const moment = extendMoment(Moment)
moment.locale("es")
import {
  submissionTypes,
  strategicAxisTypes,
  preventionLevelTypes,
  scopeTypes,
  issueTypes,
  fiscalPersonTypes,
  educationLevelTypes,
  measurementPeriodicityTypes,
  conceptTypes,
  verificationTypes,
  contractTypes
} from "../../../../../../helpers/selectOptions/implementer/submission"
import { capitalize } from "lodash"
import { getReadableValue } from "../../../../../../helpers/selectOptions"

const projectMonths = ({ startDate,  endDate }) => Array
  .from(
    moment
      .range(moment(startDate), moment(endDate))
      .by("month")
  )
  ?.map(r => r.format("MMMM YYYY"))

const displayMonthTotal = (unitCost, value) =>
  numeral(unitCost * Number(value || 0)).format("$0,0.00")

const typeSubmission = type => submissionTypes?.find(el => el.value === type)

const axisTypesStrategic = type => strategicAxisTypes?.find(el => el.value === type)

const levelTypesPrevention = type => preventionLevelTypes?.find(el => el.value === type)

const typesScope = type => scopeTypes?.find(el => el.value === type)

const typesIssue = type => issueTypes?.find(el => el.value === type)

const personTypesFiscal = type => fiscalPersonTypes?.find(el => el.value === type)

const levelTypesEducation = type => educationLevelTypes?.find(el => el.value === type)

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

export const generalInformationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Información General")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = "Detalles del proyecto"
  titleInfo.font = { size: 20, bold: true }

  worksheet.addTable({
    name: "General",
    ref: "A3",
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "Tipo de solicitud" },
      { name: "Convocatoria a la que aplica" },
      { name: "Nombre del proyecto" },
      { name: "Municipio" },
      { name: "Región" },
      { name: "Aliados del proyecto" },
      { name: "Lugar de implementación" },
      { name: "Responsable del proyecto" },
      { name: "Fecha de inicio" },
      { name: "Fecha de conclusión" },
      { name: "Eje estratégico" },
      { name: "Nivel de prevención" },
      { name: "Ámbitos de intervención del Proyecto" },
      { name: "Problemática a tratar" },
      { name: "Descripción del proyecto" },
      { name: "Justificación" }
    ],
    rows: [
      [
        typeSubmission(data?.type)?.label,
        data?.applyingCall,
        data?.name,
        data?.township,
        data?.region,
        data?.allies?.join(','),
        data?.implementationPlace,
        data?.responsible,
        translateDate(data?.startDate, "DD/MM/YYYY"),
        translateDate(data?.endDate, "DD/MM/YYYY"),
        axisTypesStrategic(data?.strategicAxis)?.label,
        levelTypesPrevention(data?.preventionLevel?.join(','))?.label,
        typesScope(data?.scope?.join(','))?.label,
        typesIssue(data?.issueDescription)?.label,
        data?.description,
        data?.justification
      ]
    ]
  })

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Consultores"
  titleInfo.font = { size: 20, bold: true }

  let consultants = data?.consultants?.map(({
    id,
    supports,
    documents,
    comments,
    ...el
  }) => {
    el.fiscalPersonType = personTypesFiscal(el?.fiscalPersonType)?.label
    el.hadReceivedSupports = typeBooleans(el?.hadReceivedSupports)
    return Object.values(el)
  })

  consultants = consultants?.length ? consultants : [[]]

  worksheet.addTable({
    name: "General2",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true
    },
    columns: [
      { name: "Descripción" },
      { name: "Nombre comercial" },
      { name: "Dirección comercial"},
      { name: "Contacto responsable" },
      { name: "Número de teléfono" },
      { name: "Rfc"},
      { name: "Dirección fiscal" },
      { name: "Tipo de persona" },
      { name: "Apoyos"}
    ],
    rows: consultants
  })

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Objetivos"
  titleInfo.font = { size: 20, bold: true }

  let objectives = []
  data?.specificObjectives?.forEach(el => {
    objectives.push([data?.developmentObjective, data?.generalObjective, el?.description])
  })

  objectives = objectives.length ? objectives : [[data?.developmentObjective, data?.generalObjective, ""]]

  worksheet.addTable({
    name: "General3",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true
    },
    columns: [
      { name: "Objetivo de desarrollo" },
      { name: "Objetivo general" },
      { name: "Objetivos específicos" }
    ],
    rows: objectives
  })

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Beneficiarios"
  titleInfo.font = { size: 20, bold: true }

  let beneficiaries = data?.beneficiaries?.map(({
    id,
    comments,
    ...el
  }) => {
    el.age = el?.age?.join(' | ')
    el.gender = el?.gender?.join(' | ')
    el.educationLevel = el.educationLevel?.map(el => levelTypesEducation(el)?.label).join(' | ')
    el.preventionLevel = levelTypesPrevention(el?.preventionLevel).label
    return Object.values(el)
  })

  beneficiaries = beneficiaries?.length ? beneficiaries : [[]]

  worksheet.addTable({
    name: "General4",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true
    },
    columns: [
      { name: "Descripción" },
      { name: "Cantidad" },
      { name: "Sexo" },
      { name: "Nivel de educación" },
      { name: "Edad" },
      { name: "Prevención" }
    ],
    rows: beneficiaries
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "General.xlsx")
}

export const technicalSpecificationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Ficha Tecnica")

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
