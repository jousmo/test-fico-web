import { ListSummaryConcept} from "./concepts"
import { ListSummaryComparative } from "./comparative"

export function ListSummary({ view }) {
  return (
    view === "Mensual" ? (
      <ListSummaryConcept />
    ) : (
      <ListSummaryComparative />
    )
  )
}