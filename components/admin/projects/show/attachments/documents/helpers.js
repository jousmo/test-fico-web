import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { extendMoment } from "moment-range"
import Moment from "moment"
import numeral from "numeral"
const moment = extendMoment(Moment)
moment.locale("es")

const projectMonths = ({ startDate,  endDate }) => Array
  .from(
    moment
      .range(moment(startDate), moment(endDate))
      .by("month")
  )
  .map(r => r.format("MMMM YYYY"))

const displayMonthTotal = (unitCost, value) =>
  numeral(unitCost * Number(value || 0)).format("$0,0.00")

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
        data?.type,
        data?.name,
        data?.applyingCall,
        data?.township,
        data?.region,
        data?.allies?.join(','),
        data?.implementationPlace,
        data?.responsible,
        data?.startDate,
        data?.endDate,
        data?.strategicAxis,
        data?.preventionLevel?.join(','),
        data?.scope?.join(','),
        data?.issueDescription,
        data?.description,
        data?.justification
      ]
    ]
  })

  titleInfo = worksheet.getCell(`A${worksheet?.lastRow?._number + 2}`)
  titleInfo.value = "Consultores"
  titleInfo.font = { size: 20, bold: true }

  let consultants = data?.consultants.map(({
    id,
    supports,
    documents,
    comments,
    ...item
  }) => Object.values(item))

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
    comments,
    ...el
  }) => {
    el.products = el?.products?.join(' | ')
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
      { name: "Tipo" },
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
    comments,
    ...el
  }) => {
    el.products = el?.products?.join(' | ')
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
      { name: "Tipo" },
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

    let indicators = specificObjectives?.indicators.map(({
      id,
      comments,
      orderIndex,
      ...el
    }) => {
      el.products = el?.products?.join(' | ')
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
        { name: "Tipo" },
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

    let activities = specificObjectives?.activities.map(({
      id,
      comments,
      orderIndex,
      schedules,
      ...el
    }) => {
      el.inputs = el?.inputs?.join(' | ')
      el.products = el?.products?.join(' | ')
      el.months = el?.months?.reduce((prev, next) => prev.concat(next.join(',')), []).join(' | ')
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

    let titleInfo = worksheet.getCell("A1")
    titleInfo.value = `Recursos Humanos - ${concept.name}`
    titleInfo.font = { size: 20, bold: true }

    let rh = concept?.humanResource?.map(({
      id,
      documents,
      comments,
      ...el
    }) => {
      return Object.values(el)
    })

    rh = rh?.length ? rh : [[]]

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

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Cronograma.xlsx")
}
