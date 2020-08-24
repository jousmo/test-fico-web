import PDFHeading from "./heading"
import "./styles.sass"

export function ProjectPDF(){
  return (
    <div className="fico pdf project">
      <img alt="logo" src="/assets/redLogo.svg" />
      <PDFHeading title="Cierre de proyecto" />
    </div>
  )
}
