
export const data = ({ data }) => {
  return {
    home: {label: "Solicitudes", url: "/admin/submissions"},
    itemsList: [
      {
        label: data?.Submission?.name,
        url: `/admin/submissions/${data?.Submission?.id}`
      }
    ]
  }
}
