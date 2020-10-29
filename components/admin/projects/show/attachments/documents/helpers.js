import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"

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

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "Tecnica.xlsx")
}
