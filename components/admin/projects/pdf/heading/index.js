import { Button, Typography } from "antd"

export default function PDFHeading({ title }){
  return (
    <>
      <Button
        className="export-button"
        onClick={() => window.print()}
        type="primary">
        Exportar
      </Button>
      <br />
      <Typography.Text strong>
        {title}
      </Typography.Text>
    </>
  )
}
