export const getRoute = (router, step) => {
  const {
    route,
    query: { id }
  } = router

  const routes = {
    0: "general-information",
    1: "technical-specification",
    2: "budget",
    3: "schedule",
    4: "human-resources"
  }
  if (route.includes("implementer")) {
    return `/implementer/submissions/${id}/edit/${routes[step]}`
  } else {
    return `/admin/submissions/${id}/review/${routes[step]}`
  }
}
