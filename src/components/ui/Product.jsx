export default function Product ({ rotation, modelRotation, textRotation, priceRotation, shirt, shirtModel, backgroundColor, textColor}) {
  return (
      <div className={`relative group w-11/12 ${rotation}`}>
        {/* Fondo */}
        <div className={`fondo ${backgroundColor} w-8/12 h-8/12 rounded-full absolute top-8 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

        {/* Imagen principal */}
        <img
          className='relative z-50'
          src={shirt.src}
          alt=""
        />

        {/* Imagen del modelo */}
        <img
          className={`imagen-modelo z-50 absolute top-2 left-38 w-4/9 ${modelRotation} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          src={shirtModel.src}
          alt=""
        />

        {/* Texto del producto */}
        <div className={`text-center w-6/12 relative -top-4 left-25 ${textRotation} flex flex-col items-center`}>
          <h1 className='text-2xl'>MOONWAVE SHIRT</h1>
          <h1 className={`text-2xl ${backgroundColor} w-3/12 relative ${priceRotation} border-2 border-white -top-1 ${textColor}`}>$499</h1>
        </div>
      </div>
  )
}
