export function getFilterOptions(options){
  return options?.map(option => (
    {
      text: option.label,
      value: option.value
    }
  ))
}
