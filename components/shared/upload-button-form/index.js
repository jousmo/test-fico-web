import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useState } from "react"

export function UploadButtonForm({ children, onDoneFile, defaultFileList }) {
  const [state, setState] = useState([])

  const onChange = info => {
    let fileList = [...info.fileList]

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.imageUrl || file.response.url
      }
      return file
    })

    if (info.file.status === "done") {
      onDoneFile && onDoneFile(state)
    }

    setState(fileList)
  }

  return (
    <Upload
      defaultFileList={defaultFileList}
      action={`${process.env.NEXT_PUBLIC_S3_URI}/asset-upload`}
      onChange={onChange}>
      <Button>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}