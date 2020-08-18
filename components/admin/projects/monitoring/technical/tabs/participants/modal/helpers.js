export const decoratedData = data => {
  const items = {}
  data?.forEach(({ amount, key, gender }) => {
    if (!items[key]){
      items[key] = { name: getItemName(key) }
    }
    if (gender === "M"){
      if (!items[key].men){
        items[key].men = 0
      }
      items[key].men += amount
    } else {
      if (!items[key].women){
        items[key].women = 0
      }
      items[key].women += amount
    }
    if (!items[key].total){
      items[key].total = 0
    }
    items[key].total += amount
  })
  return items
}

const getItemName = key => {
  const [item, number] = key.split("_")
  if (item.includes("A")){
    return `Actividad ${number}`
  } else if(item.includes("OD")){
    return `Objetivo de desarrollo ${number}`
  } else if(item.includes("OG")){
    return `Objetivo general ${number}`
  } else{
    return `Indicador ${number}`
  }
}
