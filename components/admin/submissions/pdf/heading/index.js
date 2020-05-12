import { Button, Typography } from "antd"

export default function PDFHeading({ title }){
  return (
    <Typography.Title level={3}>
      {title}
      <Button
        className="export-button"
        onClick={() => window.print()}
        type="primary">
        Exportar
      </Button>
    </Typography.Title>
  )
}
