import imagen from '../assets/unet-logo.png'
export default function Header(){
    return (
        <header className="flex flex-row h-4s  bg-slate-50 ">
                <p className="inline-flex text-blue-800 ml-auto text-5xl m-3 mr-12 ">
                    Servicio Comunitario
                </p>
                <img src={imagen} className='h-14 w-14 m-3 mr-6'  />
        </header>
    )
}