import { withForm } from "../../../../../../helpers/withForm"
import { Typography } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"

function ProjectAgreementForm({ data }) {
  const signedAgreement = data?.documents?.find(document =>
    document.type === "AGREEMENT"
  )

  return (
    <div>
      <Typography.Text>
        Este es el convenido firmado por tu organización y FICOSEC
      </Typography.Text>
      <br />
      <a href={signedAgreement?.url} target="_blank">
        <PaperClipOutlined /> &nbsp;{signedAgreement?.name}
      </a>
    </div>
  )
}

export default withForm(ProjectAgreementForm)
