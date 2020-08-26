import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import PDFHeading from "./heading"
import PDFList from "./list"
import "./styles.sass"

export function ProjectPDF(){
  const { data } = useContext(AdminSubmissionContext)

  return (
    <div className="fico pdf project">
      <img alt="logo" src="/assets/redLogo.svg" />
      <PDFHeading title="Cierre de proyecto" />
      <PDFList data={data?.Submission}/>
    </div>
  )
}
