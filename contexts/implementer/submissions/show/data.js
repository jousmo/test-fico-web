
export const data = ({ data }) => {
  return {
    home: {label: "Solicitudes", url: "/implementer/submissions"},
    itemsList: [
      {
        label: data?.Submission?.name,
        url: `/implementer/submissions/${data?.Submission?.id}`
      }
    ]
  }
}
