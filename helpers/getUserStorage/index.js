export function getUserStorage(){
  return JSON.parse(localStorage.getItem("user")) || null
}
