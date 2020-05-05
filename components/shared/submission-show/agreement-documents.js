import { withForm } from "../../../helpers/withForm"
import { Typography } from "antd"

function AgreementDocuments({ data }) {
  const documents = null

  return (
    <div>
      { documents ? (
        <></>
      ) : (
        <Typography.Text>
          Cuando se apruebe el proyecto de la implementadora se podrá descargar
          los anexos de la solicitud.
        </Typography.Text>
      )}
    </div>
  )
}

export default withForm(AgreementDocuments)
