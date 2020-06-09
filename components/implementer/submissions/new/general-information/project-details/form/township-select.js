import { Select } from "antd"
import { kebabCase } from "lodash"
import { implementer } from "../../../../../../../helpers/selectOptions"

export function TownshipSelect({
  onChange,
  defaultValue,
  setRegion,
}) {
  const options = implementer.submission.townships

  const onSelectChange = value => {
    const township = {
      id: "township",
      value: value
    }

    let region = options.find(region => (
      region.townships.includes(value)
    )).region

    if (region === "Otro"){
      setRegion({ region: null })
      region = undefined
    } else {
      setRegion({ region: region })
    }

    onChange([
      {
        id: "region",
        value: region
      },
      township
    ])
  }


  return (
    <Select
      id="township"
      name="township"
      onChange={onSelectChange}
      placeholder="Selecciona..."
      defaultValue={defaultValue}
      showSearch>
      { options.map((o, i) => (
        <Select.OptGroup
          key={kebabCase(`${o.region}-${i}`)}
          label={o.region}>
          { o.townships.map((township, index) => (
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
