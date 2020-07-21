export const handleApprove = (id, router, save, onChange) => {
  const { query: { status_name } } = router
  const nextStatus = {
    "on_council": "ON_COMMITTEE",
    "on_committee": "ON_AGREEMENT"
  }
  save(id, nextStatus[status_name])
  onChange(id)
}

export const handleReject = (id, save, onChange) => {
  save(id, "REJECTED")
  onChange(id)
}

export const handleView = (id, router) => {
  router.push(`/admin/submissions/${id}/review/general-information`)
}
