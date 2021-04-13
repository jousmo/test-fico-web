import soapRequest from "easy-soap-request"
import convert from "xml-js"

const validateCfdi = async ({ rfc, rfcRec, total, uuid }) => {
  const { response: { body, statusCode } } = await soapRequest({
    url: "https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl",
    headers: {
      "Content-Type": "text/xml;charset=UTF-8",
      soapAction: "http://tempuri.org/IConsultaCFDIService/Consulta"
    },
    xml: `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:Consulta>
            <tem:expresionImpresa>
              <![CDATA[?re=${rfc}&rr=${rfcRec}&tt=${total}&id=${uuid}]]>
            </tem:expresionImpresa>
          </tem:Consulta>
        </soapenv:Body>
      </soapenv:Envelope>
    `
  })
  const xmlJson = convert.xml2js(body, { compact: true, ignoreComment: true, alwaysChildren: true })
  const status = xmlJson["s:Envelope"]["s:Body"]?.ConsultaResponse?.ConsultaResult["a:Estado"]?._text
  return { status, statusCode }
}

export default async function handler (req, res) {
  try {
    const { body } = req
    const { status, statusCode } = await validateCfdi(body)
    res.status(200).json({ status, statusCode })
  } catch (error) {
    res.status(500).json({ error, statusCode: 500 })
  }
}
