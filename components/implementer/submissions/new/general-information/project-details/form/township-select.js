import { Select } from "antd"
import { kebabCase } from "lodash"
import { implementer } from "../../../../../../../helpers/selectOptions"

export function TownshipSelect({
  onChange,
  defaultValue,
  setRegion,
  value
}) {
  const options = implementer.submission.townships

  const onSelectChange = value => {
    onChange({
      currentTarget: {
        id: "township",
        value: kebabCase(value)
      }
    })

    const region = options.find(region => (
      region.townships.includes(value)
    )).region

    setRegion({ region: region })
    onChange({
      currentTarget: {
        id: "region",
        value: region
      }
    })
  }


  return (
    <Select
      id="region"
      name="region"
      onChange={onSelectChange}
      placeholder="Selecciona..."
      defaultValue={defaultValue}
      showSearch
      value={value}>
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
