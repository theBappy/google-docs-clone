import { Editor } from "./editor"
import { Toolbar } from "./Toolbar"


interface DocumentIdPageProps{
    params: Promise<{documentId: string}>
}

const DocumentsPage = ({params}: DocumentIdPageProps) => {
  const { documentId } = params  
  return (
    <div className="min-h-screen bg-[#FAFBFD]">  
        <Toolbar />  
        <Editor />
    </div>
  )
}

export default DocumentsPage