import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import { UploadButton } from "../../../../../shared/upload-button"

function ProjectClosureForm({ data }) {
  return (
    <div>
      <Typography.Text>
        Subir el documento firmado de cierre de proyecto en formato .PDF
      </Typography.Text>
      <br />
      <UploadButton style={{ marginTop: "5px" }}>
        Subir
      </UploadButton>
    </div>
  )
}

export default withForm(ProjectClosureForm)
