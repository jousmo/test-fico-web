import PDFHeading from "../heading"
import "../style.sass"

export function SchedulePDF(){
  return (
    <div className="fico pdf schedule">
      <PDFHeading title="Cronograma" />
    </div>
  )
}
