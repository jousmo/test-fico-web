import { Checkbox } from "antd"
import { SearchFieldPrimary } from "../../../../../../shared/search-field-primary"
import { Section } from "../../../../../../shared/section"
import { ListSummary } from "./list"
import { SelectField } from "../../../../../../shared/selectField"
import { useState } from "react"

export function SummaryConcept () {
  const [state, setState] = useState({ checked: "Mensual" })

  const onChange = value => {
    const checked = value.find(el => el !== state.checked)
    setState({ checked })
  }

  const filterHeader = () => (
    <>
      <SelectField />
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
        <ListSummary view={state.checked} />
      </Section>
    </>
  )
}