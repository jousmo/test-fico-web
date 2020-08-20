import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"

export function UploadButtonForm({ children, onChange, onRemoveFile, defaultFileList, accept }) {
  const onUploadChange = info => {
    let fileList = Array.from(info.fileList)

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.imageUrl
      }
      return file
    })

    if (info.file.status === "done") {
      onChange && onChange(fileList)
    }
  }

  return (
    <Upload
      defaultFileList={defaultFileList}
      action={`${process.env.NEXT_PUBLIC_S3_URI}/asset-upload`}
      onChange={onUploadChange}
      onRemove={onRemoveFile}
      accept={accept}>
      <Button>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}