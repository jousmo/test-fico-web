export function getReadableValue(types, value, placeholder="N/A") {
  const type = types.find(i => i.value === value)

  return type?.label || placeholder
}
