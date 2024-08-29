type PaginationProps = {
  totalPages: number;
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
};

const Pagination = ({
  totalPages,
  paginaActual,
  setPaginaActual,
}: PaginationProps) => {
  const actualizarPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1) {
      setPaginaActual(1);
    } else if (nuevaPagina > totalPages) {
      setPaginaActual(totalPages);
    } else {
      setPaginaActual(nuevaPagina);
    }
  };

  const botonesPaginas = [];

  for (let i = 1; i <= totalPages; i++) {
    botonesPaginas.push(
      <button
        key={i}
        onClick={() => actualizarPagina(i)}
        className={
          paginaActual === i
            ? "bg-blue-500 text-white border rounded-md py-2 px-3  "
            : ""
        }
      >
        {i}
      </button>
    );
  }

  return (
    <div className="m-2">
      <div className="flex justify-between border rounded-md p-4">
        <button
          onClick={() => actualizarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={paginaActual === 1 ? "cursor-not-allowed" : ""}
        >
          Anterior
        </button>
        <div className="flex gap-4">{botonesPaginas}</div>
        <button
          onClick={() => actualizarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPages}
          className={paginaActual === totalPages ? "cursor-not-allowed" : ""}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
export default Pagination;
