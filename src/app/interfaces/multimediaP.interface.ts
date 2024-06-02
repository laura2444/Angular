export interface MultimediaPelicula {
    _id: string;
    peliculas_id: {
      _id: string;
      titulo: string;
      fecha_lanzamiento: string;
    };
    imagenes_id: {
      _id: string;
      descripcion: string;
      url: string;
    };
  }