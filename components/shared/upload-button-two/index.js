import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

export function UploadButtonTwo({
  children,
  onDone,
  files = [],
  accept
}) {
  const newFiles = files?.map(file => ({ uid: file.id, ...file }))
  const [state, setState] = useState(newFiles)

  const uploadProps = {
    action:`${process.env.NEXT_PUBLIC_S3_URI}/asset-upload`,
    multiple: true,
    fileList: state,
    accept,

    onChange (info) {
      let fileList = [...info.fileList]

      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.imageUrl
        }
        return file
      })

      if (info.file.status === "done") {
        onDone(state)
      }

      setState(fileList)
    }
  }

  return (
    <Upload
      {...uploadProps}>
      <Button>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}