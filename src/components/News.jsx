import imagenEdif from "../assets/unet-edif.png"

const columnData = [
    {
      imagen: imagenEdif,
      titulo: "Lorem ipsum",
      descripcion: "Lorem ipsum dolor sit amet consectetur. Nunc vivamus turpis in rhoncus faucibus neque cras in. Erat eget.rhoncus faucibus neque cras in. ",
    },
    {
      imagen: imagenEdif,
      titulo: "Lorem ipsum",
      descripcion: "Lorem ipsum dolor sit amet consectetur. Nunc vivamus turpis in rhoncus faucibus neque cras in. Erat eget.rhoncus faucibus neque cras in. ",
    },
    {
      imagen: imagenEdif,
      titulo: "Lorem ipsum",
      descripcion: "Lorem ipsum dolor sit amet consectetur. Nunc vivamus turpis in rhoncus faucibus neque cras in. Erat eget.rhoncus faucibus neque cras in. ",
    },
    {
      imagen: imagenEdif,
      titulo: "Lorem ipsum",
      descripcion: "Lorem ipsum dolor sit amet consectetur. Nunc vivamus turpis in rhoncus faucibus neque cras in. Erat eget.rhoncus faucibus neque cras in. ",
    },
  ];

export default function News(){
  return (
    <section className="py-12 bg-blue-900 bg-opacity-80  shadow-md">
      <div className="container mx-auto px-8">
       
        <h2 className="text-3xl font-bold mb-8 ml-6">Ultimas Noticias</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {columnData.map((columna, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md">
             
              <img
                src={columna.imagen}
                alt={columna.titulo}
                className="w-max h-44  mb-4 "
              />
              <h3 className="text-xl font-semibold mb-2">{columna.titulo}</h3>
              <p className="">{columna.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
}
