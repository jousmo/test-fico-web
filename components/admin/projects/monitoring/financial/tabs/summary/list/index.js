import { useContext, useState } from "react"
import { Modal } from "antd"
import { ListSummaryConcept} from "./concepts"
import { ListSummaryComparative } from "./comparative"
import { ListSummaryInvestment } from "./investment"
import { StatisticSummaryConcepts } from "../statistic"
import { AdminSubmissionContext } from "../../../../../../../../contexts/admin/submissions/show"
import {
  getInvoicesPerYearOrSearch,
  getConceptsPerMonths,
  getConceptsPerTrimestre,
  getConceptsSummaryPerMonth
} from "../../../helpers"

export function ListSummary({ view, year, search }) {
  const { data: { Submission } } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({ showModal: false, title: "", summaryConcepts: [], totalsSummaryConcepts: {} })

  const invoicesPerYearOrSearch = getInvoicesPerYearOrSearch(Submission, year, search)
  const onlyConcepts = _.intersection(invoicesPerYearOrSearch.map(invoice => invoice.concept))
  const conceptsPerMonths = getConceptsPerMonths(Submission, onlyConcepts, invoicesPerYearOrSearch)
  const conceptsPerTrimestre = getConceptsPerTrimestre(Submission, onlyConcepts, invoicesPerYearOrSearch)

  const onChange = (a, b, { field }) => {
    const {
      summaryConcepts,
      totalsSummaryConcepts
    } = getConceptsSummaryPerMonth(Submission, onlyConcepts, invoicesPerYearOrSearch, field)
    const title = `${_.capitalize(field)} ${year}`
    setState({ showModal: true, title, summaryConcepts, totalsSummaryConcepts })
  }

  const onCancel = () => {
    setState({ showModal: false, title: "", summaryConcepts: [], totalsSummaryConcepts: {} })
  }

  return (
    <>
      {view === "Mensual" ? (
        <ListSummaryConcept
          onChange={onChange}
          dataSource={conceptsPerMonths } />
      ) : (
        <ListSummaryComparative
          onChange={onChange}
          dataSource={conceptsPerTrimestre} />
      )}

      <Modal
        className="fico investment-modal"
        title={`Resumen de inversión: ${state.title}`}
        visible={state.showModal}
        width={1400}
        onCancel={onCancel}
        footer={<StatisticSummaryConcepts totalsSummaryConcepts={state.totalsSummaryConcepts} />}>
        <ListSummaryInvestment dataSource={state.summaryConcepts} />
      </Modal>
    </>
  )
}
