export const toFileList = files => {
  return files?.map((document, index) => ({ uid: index, status: "done", ...document }))
}
