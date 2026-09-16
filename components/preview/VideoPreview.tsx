export default function VideoPreview({ src }: { src: string }) { return <video controls playsInline src={src} style={{maxWidth:'100%',maxHeight:'70vh',borderRadius:12}} />; }
