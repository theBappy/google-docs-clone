import { Editor } from "./editor"

interface DocumentIdPageProps{
    params: Promise<{documentId: string}>
}

const DocumentsPage = ({params}: DocumentIdPageProps) => {
  const { documentId } = params  
  return (
    <div className="min-h-screen bg-[#FAFBFD]">    
        <Editor />
    </div>
  )
}

export default DocumentsPage