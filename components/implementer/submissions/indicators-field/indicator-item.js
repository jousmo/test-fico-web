import { Card, Typography } from "antd"
import { EditButton, DeleteButton } from "../../../shared"
import {
  implementer,
  getReadableValue
} from "../../../../helpers/selectOptions"

export function IndicatorItem({ data, onDelete, onEdit, readOnly, review }) {
  const {
    title = "Indicador sin título",
    description = "N/A",
    methodology = "N/A",
    baseline = "N/A",
    goal = "N/A",
    formula = "N/A",
    meansOfVerification = [],
    key
  } = data

  const { submission: { verificationTypes }} = implementer

  return (
    <Card key={`indicator_${key}`} style={{marginBottom: "20px"}}>
      <Typography.Text strong>
        {title || "Indicador sin título"}
      </Typography.Text>
      <br />
      <Typography.Text type="secondary">
        {description || "N/A"}
      </Typography.Text>
      <br />
      <Typography.Text strong>Metodología: </Typography.Text>
      <Typography.Text>
        {methodology || "N/A"}
      </Typography.Text>
      <br />
      <Typography.Text strong>Línea base: </Typography.Text>
      <Typography.Text>{baseline || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Meta: </Typography.Text>
      <Typography.Text>{goal || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Formula: </Typography.Text>
      <Typography.Text>{formula || "N/A"}</Typography.Text>
      &nbsp;
      <Typography.Text strong>Medio de verificación: </Typography.Text>
      <Typography.Text>
        {meansOfVerification?.length ? (
          meansOfVerification.map(method => getReadableValue(verificationTypes, method)).join(", ")
        ) : "N/A"}
      </Typography.Text>
      {!readOnly && (
        <>
          {!review &&
            <DeleteButton
              onClick={onDelete}
              style={{marginLeft: "8px"}} />
          }
          <EditButton onClick={onEdit} />
        </>
      )}
    </Card>
  )
}
