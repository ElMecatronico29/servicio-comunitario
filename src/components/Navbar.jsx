import LinkNavBar from "./LinkNavBar";
export default function Navbar()
{
    return (
        <nav className="bg-blue-900 bg-opacity-80 shadow-md py-8">
          <div className="container mx-auto pr-8 flex justify-between items-center">
            <ul className="flex ml-auto space-x-6">
              <LinkNavBar titulo="Inicio" referencia="/" />
              <LinkNavBar titulo="Acerca de " referencia="/"/>
              <LinkNavBar titulo="Noticias" referencia="/"/>
              <LinkNavBar titulo="Contacto" referencia="/"/>
              <li>
                <a className="rounded-full p-2 px-6 bg-white text-blue-900 text-xl" href="/login">Login</a>
              </li>
            </ul>
          </div>
        </nav>
      );
};
