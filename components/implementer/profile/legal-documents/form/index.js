import { List, Typography } from "antd"
import { FileInputForm } from "./fileInput"
import { Visibility } from "../../../../shared"
import { toFileList, withForm } from "../../../../../helpers"
import "./styles.sass"

function LegalDocumentsForm({
  data,
  isGovernment,
  addDocument,
  removeDocument
}) {
  const letterOfIntentActor = isGovernment ?
    "titular de la dependencia" :
    "representante legal"

  const onDoneFile = (files, type) => {
    addDocument(files[0], type, data?.documents)
  }

  const onRemoveFile = type => {
    removeDocument(data?.documents, type)
  }

  const getFile = type => {
    const doc = data?.documents?.find(doc => doc.type === type)
    return doc ? toFileList(Array.from(doc)) : []
  }

  return (
    <div className="fico implementer legal-documents">
      <Typography.Text>
        Para continuar, por favor adjuntar los documentos que se
        solicitan a continuación y al finalizar da click en
        "Guardar"
      </Typography.Text>
      <List bordered>
        <FileInputForm
          label="Carta intención"
          helpText={`Con ficha técnica firmada por
              el ${letterOfIntentActor}`}
          fileList={getFile("INTENTION_LETTER")}
          onRemoveFile={() => onRemoveFile("INTENTION_LETTER")}
          onChange={files => onDoneFile(files, "INTENTION_LETTER")}
          accept={"application/pdf"} />
        <FileInputForm
          label="Identificación oficial del representante legal"
          fileList={getFile("REP_ID")}
          onRemoveFile={() => onRemoveFile("REP_ID")}
          onChange={files => onDoneFile(files, "REP_ID")}
          accept={"application/pdf"} />
        <FileInputForm
          label="Copia de comprobante de domicilio fiscal"
          helpText="Que coincida con el RFC no mayor a tres meses"
          fileList={getFile("FISCAL_ADDRESS_DOC")}
          onRemoveFile={() => onRemoveFile("FISCAL_ADDRESS_DOC")}
          onChange={files => onDoneFile(files, "FISCAL_ADDRESS_DOC")}
          accept={"application/pdf"} />
        <FileInputForm
          label="Cédula de identificación fiscal vigente"
          fileList={getFile("FISCAL_ID")}
          onRemoveFile={() => onRemoveFile("FISCAL_ID")}
          onChange={files => onDoneFile(files, "FISCAL_ID")}
          accept={"application/pdf"} />
        <FileInputForm
          label="Copia de convenio con aliados"
          helpText="Solo en caso de ser más actores financiadores del proyecto"
          fileList={getFile("ALLIES_AGREEMENT")}
          onRemoveFile={() => onRemoveFile("ALLIES_AGREEMENT")}
          onChange={files => onDoneFile(files, "ALLIES_AGREEMENT")}
          accept={"application/pdf"} />
        <Visibility visible={isGovernment}>
          <FileInputForm
            label="Decreto de creación"
            fileList={getFile("CREATION_ACT")}
            onRemoveFile={() => onRemoveFile("CREATION_ACT")}
            onChange={files => onDoneFile(files, "CREATION_ACT")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Ley o reglamento que otorga facultades
                  al representante legal"
            fileList={getFile("REP_RULES")}
            onRemoveFile={() => onRemoveFile("REP_RULES")}
            onChange={files => onDoneFile(files, "REP_RULES")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Nombramiento de quien funge como representante legal
                  o titular"
            fileList={getFile("REP_NAMING")}
            onRemoveFile={() => onRemoveFile("REP_NAMING")}
            onChange={files => onDoneFile(files, "REP_NAMING")}
            accept={"application/pdf"} />
        </Visibility>
        <Visibility visible={!isGovernment}>
          <FileInputForm
            label="Curriculum de la implementadora"
            fileList={getFile("IMPLEMENTER_RESUME")}
            onRemoveFile={() => onRemoveFile("IMPLEMENTER_RESUME")}
            onChange={files => onDoneFile(files, "IMPLEMENTER_RESUME")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Acta constitutiva"
            helpText="Protocolizada ante Notario Público
                  de la o las OSC que intervienen en el proyecto"
            fileList={getFile("CONSTITUTIVE")}
            onRemoveFile={() => onRemoveFile("CONSTITUTIVE")}
            onChange={files => onDoneFile(files, "CONSTITUTIVE")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Poder notariado del representante legal"
            helpText="Registrado ante el Registro Público"
            fileList={getFile("NOTARY")}
            onRemoveFile={() => onRemoveFile("NOTARY")}
            onChange={files => onDoneFile(files, "NOTARY")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Oficio de donataria autorizada por la SAT"
            fileList={getFile("SAT_DONATARY")}
            onRemoveFile={() => onRemoveFile("SAT_DONATARY")}
            onChange={files => onDoneFile(files, "SAT_DONATARY")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Opinión de cumplimiento de obligaciones fiscales
                  emitida por la SAT"
            fileList={getFile("SAT_OBLIGATIONS")}
            onRemoveFile={() => onRemoveFile("SAT_OBLIGATIONS")}
            onChange={files => onDoneFile(files, "SAT_OBLIGATIONS")}
            accept={"application/pdf"} />
          <FileInputForm
            label="Copia del último informe de actividades"
            fileList={getFile("ACTIVITIES_DOC")}
            onRemoveFile={() => onRemoveFile("ACTIVITIES_DOC")}
            onChange={files => onDoneFile(files, "ACTIVITIES_DOC")}
            accept={"application/pdf"} />
        </Visibility>
      </List>
    </div>
  )
}

export default withForm(LegalDocumentsForm)
