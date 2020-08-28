import { Checkbox } from "antd"
import { SearchFieldPrimary } from "../../../../../../shared/search-field-primary"
import { Section } from "../../../../../../shared/section"
import { ListSummary } from "./list"
import { SelectField } from "../../../../../../shared/selectField"
import { useContext, useState } from "react"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
import { selectProjectYears, projectInitYear } from "../../helpers"

export function SummaryConcept () {
  const { data: { Submission } } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({
    year: projectInitYear(Submission),
    checked: "Mensual"
  })

  const onChange = value => {
    const checked = value.find(el => el !== state.checked)
    setState({ checked })
  }

  const onChangeYear = ({ currentTarget }) => {
    setState({
      ...state,
      year: currentTarget.value
    })
  }

  const filterHeader = () => (
    <>
      <SelectField
        value={state.year}
        options={selectProjectYears(Submission)}
        onChange={onChangeYear} />
      <Checkbox.Group
        style={{marginLeft: "1rem"}}
        options={["Mensual", "Trimestral"]}
        defaultValue={[state.checked]}
        value={[state.checked]}
        onChange={onChange} />
    </>
  )

  return (
    <>
      <SearchFieldPrimary />
      <Section
        style={{padding: 0, margin: "1rem 0"}}
        title={state.checked === "Mensual" ? "Conceptos" : "Resumen comparativo"}
        extra={filterHeader()}>
        <ListSummary view={state.checked} year={state.year} />
      </Section>
    </>
  )
}