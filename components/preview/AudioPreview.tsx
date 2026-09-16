export default function AudioPreview({ src }: { src: string }) { return <div style={{minWidth:280}}><audio controls src={src} style={{width:'100%'}} /></div>; }
