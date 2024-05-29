export interface MultimediaPelicula {
    _id: string;
    peliculas_id: {
      _id: string;
      titulo: string;
    };
    imagenes_id: {
      _id: string;
      descripcion: string;
      url: string;
    };
  }