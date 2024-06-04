export interface MultimediaHeroe {
    _id: string;
    heroes_id: {
      _id: string;
      nombre: string;
    };
    imagenes_id: {
      _id: string;
      descripcion:string,
      url:string
    };
  }

export interface MultimediaHeroeSolo {
  _id: string;
  heroes_id: string;
  imagenes_id: string;
}