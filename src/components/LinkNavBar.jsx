export default function LinkNavBar({titulo,referencia})
{
    return (
        <li>
            <a href={referencia} className="text-white hover:text-gray-200 transition duration-300 text-xl">
                {titulo}
            </a>
        </li>
    )
   
}