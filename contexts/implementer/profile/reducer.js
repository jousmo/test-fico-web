export const reducer = (state, action) => {
  switch(action.type) {
    case "updateGeneralData":
      const newData = {}
      newData[String(action.data.name)] = action.data.value

      return { 
        ...state,
        generalData: {
          ...state.generalData,
          ...newData
        }
      }
    default:
      return state
  }
}
