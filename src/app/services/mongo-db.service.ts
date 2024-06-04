import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import { Multimedia } from '../interfaces/multimedia.interface';
import { MultimediaPelicula } from '../interfaces/multimediaP.interface';
import { URL_SERVICIOS } from '../config/utl.servicios';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {  //llamar al mongo db sercies en heroes list 

  //involucro HttpClient para poder hacer peticiones

  constructor(
    public http: HttpClient) { }  //itpo de deficiion se conoce como inyeccion, elemento principal queda definido a nivel del constructor, se construye a penas se crea la clase mongoDB sservicde
  //metodo para traer datos de la BD TRAER TODOS LOS HEROES PETICION GET

  getHeroes(): any{  //retorno lista de heroes,   any->retorna algo, en este caso una peticion
    let url = `${URL_SERVICIOS}/heroes`   //ruta de mongo  

    return this.http.get(url).pipe(  
      map((data) =>{ //mapea datos, funcion de flecha para
        console.log('DATOS',data); //imprimir datos en consola
        return data; //retornar datos 
      })
    );
  }

  //metodo 2 - TRAER UN solo HEROE POR ID PETICION GET

  getUnHeroe(unId:string): any{  //retorno lista de heroes
    let url = `${URL_SERVICIOS}/heroes/${unId}`   

    return this.http.get(url).pipe( //Realiza una solicitud HTTP GET a la URL especificada, llamo a pipe para usar map
      map((data) =>{
        console.log('DATOS',data);
        return data;
      })
    );
  }

  //metodo 3 - ACTUALIZAR INFORMACIÓN EN EL FORMULARIO DE HEROES
  crud_Heroes(unHeroe: Heroe, unaAccion: string):any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_SERVICIOS}/heroes/eliminarHeroe/${unHeroe._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {
      let parametros2 = new HttpParams();
      let url = URL_SERVICIOS+ '/heroes/crearHeroe';

      // Begin assigning parameters
      parametros2 = parametros2.append('nombre',unHeroe.nombre);
      parametros2 = parametros2.append('bio',unHeroe.bio);
      parametros2 = parametros2.append('img',unHeroe.img);
      parametros2 = parametros2.append('aparicion',unHeroe.aparicion);
      parametros2 = parametros2.append('casa',unHeroe.casa);

      const body = {
        nombre:unHeroe.nombre,
        bio:unHeroe.bio,
        img:unHeroe.img,
        aparicion:unHeroe.aparicion,
        casa:unHeroe.casa,
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      let parametros = new HttpParams();

      let url = `${URL_SERVICIOS}/heroes/moficarHeroe/${unHeroe._id}`;

      //let url = URL_SERVICIOS_MONGODB + '/heroes';

      // Begin assigning parameters
      parametros = parametros.append('nombre',unHeroe.nombre);
      parametros = parametros.append('bio',unHeroe.bio);
      parametros = parametros.append('img',unHeroe.img);
      parametros = parametros.append('aparicion',unHeroe.aparicion);
      parametros = parametros.append('casa',unHeroe.casa);

      const body = {
        nombre:unHeroe.nombre,
        bio:unHeroe.bio,
        img:unHeroe.img,
        aparicion:unHeroe.aparicion,
        casa:unHeroe.casa,
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }

/*es el que se va a conectar a la bd, VAMOS A HACER UNA INYECCION donde vamos a usar protocolo HTTP
AQUI CONCENTRO TODAS LAS PETICIONES EN UN SOLO ARCHIVO, PARA CONSULTAR LOS DATOS DE LA BD, LAS CONSULTAS
LOS SERVICIOS SE PONEN DE UNO A UNO, CADA SERVICIO A TRAVES DE PROTOCOLO RESTFUL Y PETICION DIFERENTE
*/


///////////////////////////////////////////////////////////////////////////////////////////DANIEL TAMARA RIVERA 
//ACESO A MULTIMEDIA PELICULAS

getMultimediaPeliculas(): any {  
  let url = `${URL_SERVICIOS}/multimediaP`     
  return this.http.get(url).pipe(  
    map((data) => { 
      console.log('DATOS', data); 
      return data;  
    })
  );
}

getMultimediaPeliculasTitulo(titulo: string): any {
  let url = `${URL_SERVICIOS}/multimediaP/titulo/${titulo}`     
  return this.http.get(url).pipe(  
    map((data) => { 
      console.log('Peliculas con clasificación: ', data); 
      return data;  
    })
  );
}


crud_multimediaPelicula(multimediaP : MultimediaPelicula, unaAccion : string): any{
  
  ///SERIA CREARLE UN CAMPO DIFERENTE PARA CREAR UNA GRUPO.
  if ( unaAccion === 'insertar'){

    let url = `${URL_SERVICIOS}/multimediaP/CrearGrupo`;

    const body = {
      descripcion:multimediaP.peliculas_id._id,
      url:multimediaP.imagenes_id._id,
    };
      console.log(body)

    return this.http.post(url, body).pipe(map((data) => data));

  }

  
  if(unaAccion === 'eliminar'){
    
      let url = `${URL_SERVICIOS}/multimediaP/eliminar/${multimediaP._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );

  }

}




/////////////////////////////////////////////////////////////////////////////////////////
//MULTIMEDIA HEROES
getMultimediaHeroes(heroes_id: string): any {
  let url = `${URL_SERVICIOS}/multimediaH/heroeM/${heroes_id}`     
  return this.http.get(url).pipe(  
    map((data) => { 
      console.log('heroes: ', data); 
      return data;  
    })
  );
}


/////////////////////////////////////////////////////////////////////////////////////////DANIEL TAMARA RIVERA
//ACCESO A MULTIMEDIA 

getUnMultimediaID(idMultimedia:string):any{
  console.log("Get multimedia")
  let url = `${URL_SERVICIOS}/multimedia/obtener/${idMultimedia}`;
  return this.http.get<any>(url).pipe(
    map((data) => {
      console.log('DATA INDEPENDIENTE', data);
      return data;  })
  );
}

crud_multimedia(multimedia: Multimedia, unaAccion: string):any{

  if ( unaAccion === 'insertar'){
    let parametros = new HttpParams();

    let url = `${URL_SERVICIOS}/crearMultimedia`;

    parametros = parametros.append('descripcion', multimedia.descripcion);
    parametros = parametros.append('url', multimedia.url); 

    
    const body = {
      descripcion:multimedia.descripcion,
      url:multimedia.url,
    };

      console.log(body)

    return this.http.post(url, body).pipe(map((data) => data));

  }


  if(unaAccion === 'modificar'){
    
    console.log('Datos antes de actualizar:', multimedia);

    let url = `${URL_SERVICIOS}/multimedia/actualizar/${multimedia._id}`;

    const body = {
      descripcion:multimedia.descripcion,
      url:multimedia.url,
    };
    console.log(body)

    return this.http.put(url, body).pipe(map((data) => data));

  }

  if(unaAccion === 'eliminar'){
    let parametros2 = new HttpParams();

      let url = `${URL_SERVICIOS}/multimedia/eliminar/${multimedia._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );

  }

}








}

