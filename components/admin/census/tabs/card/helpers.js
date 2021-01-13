export const onSearch = (data, setState, value) => {
  if (!value) {
    setState(undefined)
    return
  }

  const filter = data?.filter(assistant =>
    assistant.phone?.includes(value) ||
    assistant.name?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.curp?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.colony?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.lastName?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.maidenName?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.problematic?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.municipality?.toLowerCase().includes(value.toLowerCase())
  )
  setState(filter)
}
