export const handleApprove = (id, router, save) => {
  const { query: { status_name } } = router
  const nextStatus = {
    "on_council": "ON_COMMITTEE",
    "on_committee": "ON_AGREEMENT"
  }
  save(id, nextStatus[status_name])
}

export const handleReject = (id, save) => {
  save(id, "REJECTED")
}

export const handleView = (id, router) => {
  router.push(`/admin/submissions/${id}/review/general-information`)
}
