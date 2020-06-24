import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"

function ProjectAgreementForm({ data }) {
  /* Todo: Update to show actual agreement document */

  return (
    <div>
      <Typography.Text>
        Este es el convenido firmado por tu organización y FICOSEC
      </Typography.Text>
      <br />
      <a>
        <PaperClipOutlined /> Convenio2020.PDF
      </a>
    </div>
  )
}

export default withForm(ProjectAgreementForm)
