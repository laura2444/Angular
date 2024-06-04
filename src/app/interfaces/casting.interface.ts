export interface Casting{
    _id:string;
    heroes_id:{
        _id: string;
        nombre: string;
    };
    personaje: string;
    peliculas_id: {
        _id: string;
        titulo: string;
    };
}

export interface CastingSolo{
    _id:string;
    heroes_id: string;
    peliculas_id: string;
}