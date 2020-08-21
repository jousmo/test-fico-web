import convert from "xml-js"

export const INIT_STATE = {
  amount: 0,
  percentage: 0,
  ficosecPaymentPercentage: 0,
  investmentOnePaymentPercentage: 0,
  investmentTwoPaymentPercentage: 0,
  implementerPaymentPercentage: 0
}

export const readXmlFile = async (documents, budgeted) => {
  const document = documents?.find(el => el.type === "XML")

  if (!document) return {}

  try {
    const response = await fetch(document.url)
    const xml = await response.text()
    const xmlJson = convert.xml2js(xml, { compact: true, ignoreComment: true, alwaysChildren: true })
    const { UUID: uuid, FechaTimbrado: issuedAt } = xmlJson["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["_attributes"]
    const { Nombre: issuer, Rfc: rfc } = xmlJson["cfdi:Comprobante"]["cfdi:Emisor"]["_attributes"]
    const { Nombre: receptor } = xmlJson["cfdi:Comprobante"]["cfdi:Receptor"]["_attributes"]
    const amount = +xmlJson["cfdi:Comprobante"]["_attributes"]["Total"]
    const percentage = +((amount * 100) / budgeted).toFixed(2)

    return { uuid, issuedAt, issuer, rfc, receptor, amount, percentage }
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

export const validateDocuments = (formData, { budgeted, evidenced, difference }, oldAmount) => {
  const { amount, documents, ficosecPayment, implementerPayment, investmentOnePayment, investmentTwoPayment } = formData

  const isLength = documents.length < 2
  if (isLength) return { error: true, message: "Se requiere que subas tu factura XML y PDF" }

  const isXML = documents?.some(document => document.type === "XML")
  const isPDF = documents?.some(document => document.type === "PDF")
  if (!isXML) return { error: true, message: "Se requiere que subas tu archivo XML" }
  if (!isPDF) return { error: true, message: "Se requiere que subas tu archivo PDF" }

  if (oldAmount) {
    const isValidAmountXml = (amount - oldAmount) > difference
    if (isValidAmountXml) return { error: true, message: "El monto de la factura sobrepasa a lo presupuestado" }
  } else {
    const isValidAmountXml = amount > (budgeted - evidenced)
    if (isValidAmountXml) return { error: true, message: "El monto de la factura sobrepasa a lo presupuestado" }
  }

  const totalDistribution = ficosecPayment + implementerPayment + investmentOnePayment + investmentTwoPayment
  if (totalDistribution > amount)
    return { error: true, message: "La distribucción de las coinversiones sobrepasa el monto de la factura" }
  if (totalDistribution < amount)
    return { error: true, message: "La distribucción de las coinversiones es menor que el monto de la factura" }

  return { error: false }
}