import { Collapse } from "antd"
import { Section } from "../../../../../../../shared"
import { HeaderColumns } from "./header"
import { ParticipantRow } from "./row"

export function ParticipantsList({ data = {}, title }){
  const { PRIMARY, SECONDARY, TERTIARY } = data

  const sort = object => {
    return Object.keys(object)?.sort()
  }

  const sortedPrimary = sort(PRIMARY)
  const sortedSecondary = sort(SECONDARY)
  const sortedTertiary = sort(TERTIARY)

  return (
    <Section title={title}>
      <HeaderColumns />
      <Collapse defaultActiveKey={["1"]} bordered={false}>
        <Collapse.Panel key="1" header="Primaria">
          {sortedPrimary.map((ages, index) =>
            <ParticipantRow items={PRIMARY[ages]} age={ages} key={index} />
          )}
        </Collapse.Panel>
        <Collapse.Panel key="2" header="Secundaria">
          {sortedSecondary.map((ages, index) =>
            <ParticipantRow items={SECONDARY[ages]} age={ages} key={index} />
          )}
        </Collapse.Panel>
        <Collapse.Panel key="3" header="Terciaria">
          {sortedTertiary.map((ages, index) =>
            <ParticipantRow items={TERTIARY[ages]} age={ages} key={index} />
          )}
        </Collapse.Panel>
      </Collapse>
    </Section>
  )
}
