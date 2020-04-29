import { withForm } from "../../../../../../helpers/withForm"
import { Col, Row, Typography } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import Link from "next/link"
import {
  preventionLevelTypes,
  scopeTypes
} from "../../../../../../helpers/selectOptions/implementer/submission"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"

function SummaryBody({ data }) {
  const {
    id,
    name,
    scope,
    description,
    preventionLevel
  } = data

  return (
    <div>
      <Typography.Title level={3}>
        {name}
      </Typography.Title>
      <Row>
        <Typography.Text>
          {description}
        </Typography.Text>
      </Row>
      <Row className="prevention">
        <Col>
          <Typography.Text strong>
            Ámbito {getReadableValue(scopeTypes, scope).toLowerCase()}
          </Typography.Text>
        </Col>
        <Col offset={1}>
          <Typography.Text strong>
            {"Nivel de prevención "}
            {
              getReadableValue(preventionLevelTypes, preventionLevel)
                .toLowerCase()
            }
          </Typography.Text>
        </Col>
      </Row>
      <Row align="middle">
        <Link href={`/admin/submissions/${id}/`}>
          <a><EyeOutlined /> Ver la solicitud</a>
        </Link>
      </Row>
    </div>
  )
}

export default withForm(SummaryBody)
