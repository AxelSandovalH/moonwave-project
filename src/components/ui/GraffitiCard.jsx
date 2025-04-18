export default function GraffitiCard ({graffitiImage, rotation}) {
    return (
        <img className={`${rotation} border-12 border-white rounded-2xl`} src={graffitiImage.src} alt="" />
    )
}