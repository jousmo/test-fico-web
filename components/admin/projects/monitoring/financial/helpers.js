import convert from "xml-js"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")
import * as _ from "lodash"
import axios from "axios"
import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { conceptTypes } from "../../../../../helpers/selectOptions/implementer/submission"
import { cellFormat } from "../../../../../helpers"

const typeConcept = type => conceptTypes?.find(el => el.value === type)

export const INIT_STATE = {
  amount: 0,
  percentage: 0,
  ficosecPaymentPercentage: 0,
  investmentOnePaymentPercentage: 0,
  investmentTwoPaymentPercentage: 0,
  implementerPaymentPercentage: 0
}

export const RESET_XML_DATA = {
  documents: [],
  uuid: undefined,
  issuedAt: undefined,
  issuer: undefined,
  rfc: undefined,
  receptor: undefined,
  amount: 0,
  percentage: 0,
  ficosecPayment: 0,
  investmentOnePayment: 0,
  investmentTwoPayment: 0,
  implementerPayment: 0
}

export const getConceptsSummaryPerTrimestre = (Submission, concepts, invoicesPerYearOrSearch, title) => {
  const typeTitle = title.substring(0, 5)
  const trimestre = Number(typeTitle[0])
  const monthlyDistributionIndex = getMonthlyDistributionIndex(Submission)

  const summaryConcepts = concepts?.map(concept => {
    const nameConcept = getConcept(Submission?.concepts, concept)
    const budgeted = typeTitle === "Total"
      ? getConceptBudgetGeneral(Submission?.concepts, concept, title, monthlyDistributionIndex) || 0
      : getConceptBudgetTrimestre(Submission?.concepts, concept, title, monthlyDistributionIndex) || 0

    const filter = invoicesPerYearOrSearch?.filter(invoice => {
      if (typeTitle === "Total") {
        if (invoice?.concept === concept) return invoice
      } else {
        const quarter = moment(invoice.monthAt, "MMYYYY").quarter()
        if (invoice?.concept === concept && quarter === trimestre) {
          return invoice
        }
      }
    }).reduce((prev, current) => {
      return {
        amount: (prev.amount || 0) + current.amount,
        ficosecPayment: (prev.ficosecPayment || 0) + current.ficosecPayment,
        implementerPayment: (prev.implementerPayment || 0) + current.implementerPayment,
        investmentOnePayment: (prev.investmentOnePayment || 0) + current.investmentOnePayment,
        investmentTwoPayment: (prev.investmentTwoPayment || 0) + current.investmentTwoPayment,
      }
    }, {})

    return {
      key: concept,
      concept: nameConcept,
      ...filter,
      budgeted
    }
  })

  const totalsSummaryConcepts = getSummaryConcepts(summaryConcepts)

  return {
    summaryConcepts,
    totalsSummaryConcepts: {
      totalConcepts: summaryConcepts.length,
      ...totalsSummaryConcepts
    }
  }
}

export const getConceptsSummaryPerMonth = (Submission, concepts, invoicesPerYearOrSearch, title) => {
  const typeTitle = title.substring(0, 5)
  const monthSelect = moment(title, "MMMM YYYY").format("MMYYYY")
  const monthlyDistributionIndex = getMonthlyDistributionIndex(Submission)

  const summaryConcepts = concepts?.map(concept => {
    const nameConcept = getConcept(Submission?.concepts, concept)
    const budgeted = typeTitle === "Total"
      ? getConceptBudgetGeneral(Submission?.concepts, concept, title, monthlyDistributionIndex) || 0
      : getConceptBudget(Submission?.concepts, concept, monthlyDistributionIndex[monthSelect]) || 0

    const filter = invoicesPerYearOrSearch?.filter(invoice => {
      if (typeTitle === "Total") {
        if (invoice?.concept === concept) return invoice
      } else {
        if (invoice?.concept === concept && invoice?.monthAt === monthSelect) {
          return invoice
        }
      }
    }).reduce((prev, current) => {
        return {
          amount: (prev.amount || 0) + current.amount,
          ficosecPayment: (prev.ficosecPayment || 0) + current.ficosecPayment,
          implementerPayment: (prev.implementerPayment || 0) + current.implementerPayment,
          investmentOnePayment: (prev.investmentOnePayment || 0) + current.investmentOnePayment,
          investmentTwoPayment: (prev.investmentTwoPayment || 0) + current.investmentTwoPayment,
        }
      }, {})

    return {
      key: concept,
      concept: nameConcept,
      ...filter,
      budgeted,
      diference: budgeted - (filter?.amount || 0)
    }
  })

  const totalsSummaryConcepts = getSummaryConcepts(summaryConcepts)

  return {
    summaryConcepts,
    totalsSummaryConcepts: {
      totalConcepts: summaryConcepts.length,
      ...totalsSummaryConcepts
    }
  }
}

export const getSummaryConcepts = (summaryConcepts) => {
  return summaryConcepts.reduce((prev, current) => {
    const budgeted = (prev.budgeted || 0) + current.budgeted
    const amount = (prev.amount || 0) + current.amount

    return {
      budgeted,
      amount,
      ficosecPayment: (prev.ficosecPayment || 0) + current.ficosecPayment,
      implementerPayment: (prev.implementerPayment || 0) + current.implementerPayment,
      investmentOnePayment: (prev.investmentOnePayment || 0) + current.investmentOnePayment,
      investmentTwoPayment: (prev.investmentTwoPayment || 0) + current.investmentTwoPayment,
      diference: budgeted - amount
    }
  }, {})
}

export const getConceptsPerTrimestre = (Submission, concepts, invoicesPerYearOrSearch) => {
  return concepts?.map(concept => {
    const amountTrimestre = {}
    const nameConcept = getConcept(Submission?.concepts, concept)

    for (let i = 1; i <= 4; i++) {
      const sufix = (i === 1 || i === 3) ? 'er' : i === 2 ? "do" : "to"
      amountTrimestre[`${i}${sufix}`] = invoicesPerYearOrSearch?.filter(invoice => {
        const quarter = moment(invoice.monthAt, "MMYYYY").quarter()
        if (invoice.concept === concept && quarter === i) return invoice
      }).reduce((prev, current) => prev + current.amount, 0)
    }

    const total = Object.values(amountTrimestre).reduce((prev, current) => prev + current, 0)
    return { key: concept, concept: nameConcept, ...amountTrimestre, total }
  })
}

export const getConceptsPerMonths = (Submission, concepts, invoicesPerYearOrSearch) => {
  return concepts?.map(concept => {
    const amountMonths = {}
    const nameConcept = getConcept(Submission?.concepts, concept)
    const months = moment.months()

    months?.forEach(month => {
      amountMonths[month] = invoicesPerYearOrSearch?.filter(invoice => {
        const monthAt = moment(invoice.monthAt, "MMYYYY").format("MMMM")
        if (invoice.concept === concept && monthAt === month) return invoice
      })?.reduce((prev, current) => prev + current.amount, 0)
    })

    const total = Object.values(amountMonths)?.reduce((prev, current) => prev + current, 0)
    return { key: concept, concept: nameConcept, ...amountMonths, total }
  })
}

export const getInvoicesPerYearOrSearch = ({ invoices, concepts }, year, search) => {
  return invoices?.filter(invoice => {
    const yearInvoice = moment(invoice.monthAt, "MMYYYY").format("YYYY")

    if (search) {
      const nameConcept = getConcept(concepts, invoice.concept)
      if (yearInvoice === year && nameConcept?.toLowerCase() === search?.toLowerCase()) return invoice
    } else {
      if (yearInvoice === year) return invoice
    }
  })
}

export const getConceptBudgetGeneral = (concepts, concept, title, monthlyDistributionIndex) => {
  const months = Object.keys(monthlyDistributionIndex)
  const year = title.substring(6)
  const filterMonths = months?.filter(month => moment(month, "MMYYYY").format("YYYY") === year)
  const findConcept = concepts?.find(el => el.id === concept)
  let budgeted = 0

  filterMonths?.forEach(el => {
    const index = monthlyDistributionIndex[el]
    budgeted += findConcept.monthlyDistribution[index] * findConcept.unitCost || 0
  })

  return budgeted
}

export const getConceptBudgetTrimestre = (concepts, concept, title, monthlyDistributionIndex) => {
  const months = Object.keys(monthlyDistributionIndex)
  const trimestre = Number(title[0])
  const year = title.slice(-4)

  const filterMonths = months?.filter(month => {
    const quarter = moment(month, "MMYYYY").quarter()
    const monthYear = moment(month, "MMYYYY").format("YYYY")
    if (monthYear === year && quarter === trimestre) return month
  })

  const findConcept = concepts?.find(el => el.id === concept)
  let budgeted = 0

  filterMonths?.forEach(el => {
    const index = monthlyDistributionIndex[el]
    budgeted += findConcept.monthlyDistribution[index] * findConcept.unitCost || 0
  })

  return budgeted
}

export const getConceptBudget = (concepts, id, index) => {
  const find = concepts?.find(concept => concept.id === id)
  return find?.unitCost * find?.monthlyDistribution[index] || 0
}

export const getMonthlyDistributionIndex = (Submission) => {
  const obj = {}
  const months = projectMonths(Submission)

  months?.forEach((el, index) => {
    obj[el.value] = index
  })

  return obj
}

export const getConcept = (concepts, id) => concepts?.find(concept => concept.id === id)?.name

export const listConcepts = ({ concepts }) => concepts?.map(concept => ({ label: concept.name, value: concept.id }))

export const monthYearConvert = date => _.capitalize(moment(date, "MMYYYY").format("MMMM YYYY"))

export const projectInitYear = ({ startDate }) => moment(startDate).format("YYYY")

export const selectProjectYears = ({ startDate, endDate }) => Array
  .from(
    moment
      .range(
        moment(startDate) || moment(),
        moment(endDate) || moment())
      .snapTo("year")
      .by("year")
  )
  ?.map((r, index) => ({ label: `A??o ${index + 1}`, value: r.format("YYYY")}))

export const projectMonths = ({ startDate, endDate }) => Array
  .from(
    moment
      .range(
        moment(startDate) || moment(),
        moment(endDate) || moment())
      .by("month")
  )
  ?.map(r => ({ label: _.capitalize(r.format("MMMM YYYY")), value: r.format("MMYYYY")}))

export const readXmlFile = async (documents, budgeted) => {
  const document = documents?.find(el => el.type === "XML")

  if (!document) return {}

  try {
    const response = await fetch(document.url)
    const xml = await response.text()
    const xmlJson = convert.xml2js(xml, { compact: true, ignoreComment: true, alwaysChildren: true })
    const { UUID: uuid, FechaTimbrado: issuedAt } = xmlJson["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["_attributes"]
    const { Nombre: issuer, Rfc: rfc } = xmlJson["cfdi:Comprobante"]["cfdi:Emisor"]["_attributes"]
    const { Nombre: receptor, Rfc: rfcRec } = xmlJson["cfdi:Comprobante"]["cfdi:Receptor"]["_attributes"]
    const amount = +xmlJson["cfdi:Comprobante"]["_attributes"]["Total"]
    const percentage = +((amount * 100) / budgeted).toFixed(2)
    return { uuid, issuedAt, issuer, rfc, rfcRec, receptor, amount, percentage, total: amount }
  } catch (err) {
    throw new Error(err)
  }
}

export const toFileList = files => {
  return files?.map((document, index) => ({ uid: index, status: "done", ...document }))
}

export const getPercentagePayment = formData => {
  const {
    amount,
    percentage,
    ficosecPayment,
    implementerPayment,
    investmentOnePayment,
    investmentTwoPayment
  } = formData

  return {
    amount,
    percentage,
    ficosecPaymentPercentage: ((ficosecPayment * 100) / amount).toFixed(2),
    implementerPaymentPercentage: ((implementerPayment * 100) / amount).toFixed(2),
    investmentOnePaymentPercentage: ((investmentOnePayment * 100) / amount).toFixed(2),
    investmentTwoPaymentPercentage: ((investmentTwoPayment * 100) / amount).toFixed(2)
  }
}

export const validateDocuments = async (formData, { budgeted, evidenced, difference }, oldAmount) => {
  try {
    const { data: { status, statusCode } } = await axios.post('/api/cfdi', formData)

    if (statusCode === 500) return { error: true, message: "No se puede validar el estatus vigente de la factura" }
    if (statusCode === 200 && status?.toUpperCase() !== 'VIGENTE')
      return { error: true, message: `Tu factura esta en un estatus ${status} y no puede ser admitida` }

    const { amount, documents, ficosecPayment, implementerPayment, investmentOnePayment, investmentTwoPayment } = formData

    const isLength = documents.length < 2
    if (isLength) return { error: true, message: "Se requiere que subas tu factura XML y PDF" }

    const isXML = documents?.some(document => document.type === "XML")
    const isPDF = documents?.some(document => document.type === "PDF")
    if (!isXML) return { error: true, message: "Se requiere que subas tu archivo XML" }
    if (!isPDF) return { error: true, message: "Se requiere que subas tu archivo PDF" }

    const fullAmount = +(difference + oldAmount).toFixed(2)

    if (amount > fullAmount) return { error: true, message: "El monto de la factura sobrepasa a lo presupuestado" }

    const totalDistribution = +(ficosecPayment + implementerPayment + investmentOnePayment + investmentTwoPayment).toFixed(2)

    if (totalDistribution > amount)
      return { error: true, message: "La distribucci??n de las coinversiones sobrepasa el monto de la factura" }
    if (totalDistribution < amount)
      return { error: true, message: "La distribucci??n de las coinversiones es menor que el monto de la factura" }

    return { error: false }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

export const getUrlPdf = documents => documents?.find(el => el.type === "PDF")?.url

export const invoicesExport = async (invoices, concepts) => {
  const workbook = new ExcelJS.Workbook()
  let worksheet = workbook.addWorksheet("Monitoreo Financiero")

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = `Monitoreo financiero`
  titleInfo.font = { size: 20, bold: true }

  let data = invoices.map(({ id, documents, reviewed, typeRH, ...el}) => {
    el.category = typeConcept(el?.category)?.label
    el.monthAt = monthYearConvert(el?.monthAt)
    el.concept = getConcept(concepts, el.concept)
    el.issuedAt = moment(el?.issuedAt).format("DD/MMMM/YYYY").toUpperCase()
    el.paymentAt = moment(el?.paymentAt).format("DD/MMMM/YYYY").toUpperCase()
    el.amount = cellFormat.money(el?.amount)?.children
    el.ficosecPayment = cellFormat.money(el?.ficosecPayment)?.children
    el.implementerPayment = cellFormat.money(el?.implementerPayment)?.children
    el.investmentOnePayment = cellFormat.money(el?.investmentOnePayment)?.children
    el.investmentTwoPayment = cellFormat.money(el?.investmentTwoPayment)?.children
    el.percentage = `${el?.percentage} %`
    return Object.values(el)
  })

  data = data?.length ? data : [[]]

  worksheet.addTable({
    name: "Facturas",
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true,
      theme: "TableStyleMedium10"
    },
    columns: [
      { name: "Folio SAT" },
      { name: "Emisor" },
      { name: "RFC" },
      { name: "Emisi??n" },
      { name: "Receptor" },
      { name: "Mes/A??o" },
      { name: "Concepto" },
      { name: "Categor??a" },
      { name: "Fecha de pago" },
      { name: "Ficosec" },
      { name: "Inversionista 1" },
      { name: "Inversionista 2" },
      { name: "Implementadora" },
      { name: "Total" },
      { name: "Porcentaje" },
      { name: "Estatus CFDI" }
    ],
    rows: data
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "MonitoreoFinanciero.xlsx")
}
