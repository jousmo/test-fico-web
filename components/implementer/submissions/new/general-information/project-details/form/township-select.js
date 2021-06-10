import { Select } from "antd"
import { kebabCase } from "lodash"
import { implementer } from "../../../../../../../helpers/selectOptions"

export function TownshipSelect({
  onChange,
  defaultValue,
  setRegion,
  ...props
}) {
  const options = implementer.submission.townships

  const onSelectChange = values => {
    const township = { id: "township", value: values }

    let regions = new Set()
    values.forEach(township => {
      regions.add(options.find(el => el.townships.includes(township))?.region)
    })

    let region = null
    regions = Array.from(regions)
    if (regions.length > 1 || values.includes("Zona centro sur")) {
      region = "Zona centro sur"
    } else if (regions[0] !== "Otro") {
      region = regions[0]
    }

    setRegion({ region })
    onChange([{ id: "region", value: region }, township])
  }


  return (
    <Select
      id="township"
      name="township"
      onChange={onSelectChange}
      mode="multiple"
      placeholder="Selecciona..."
      defaultValue={defaultValue}
      {...props}>
      { options?.map((o, i) => (
        <Select.OptGroup
          key={kebabCase(`${o.region}-${i}`)}
          label={o.region}>
          { o.townships?.map((township, index) => (
            <Select.Option
              key={kebabCase(`${township}-${index}`)}
              value={township}>
              {township}
            </Select.Option>
          ))}
        </Select.OptGroup>
      ))}
    </Select>
  )
}
