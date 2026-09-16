export default function PdfPreview({ src }: { src: string }) { return <iframe title="PDF preview" src={src} style={{width:'100%',height:'70vh',border:0,borderRadius:12}} />; }
