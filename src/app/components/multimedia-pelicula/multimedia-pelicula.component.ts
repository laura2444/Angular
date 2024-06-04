import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { MultimediaPelicula, MultimediaPeliculaSolo } from '../../interfaces/multimediaP.interface';
import { Multimedia } from '../../interfaces/multimedia.interface';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-multimedia-pelicula',
  templateUrl: './multimedia-pelicula.component.html',
  styleUrls: ['./multimedia-pelicula.component.css']
})
export class MultimediaPeliculaComponent implements OnInit {

  MultimediaPeliculas!: MultimediaPelicula[];
  peliculaSeleccionada: string = '';
  titulosUnicos: string[] = [];
  res: string = '';
  res1: any;

  EnviarMultimediaPelicula: MultimediaPeliculaSolo = {
    _id: '-1',
    peliculas_id: '',
    imagenes_id: ''
  };
  peliculas!: Pelicula[];
  crearMultimedias: Multimedia = {
    descripcion: '',
    url: '',
    _id: '-1',
  };

  nuevo_id: string = '';

  constructor(
    private dataBD: MongoDBService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarMultimediaPelicula();
  }

  async cargarMultimediaPelicula() {
    try {
      const data = await this.dataBD.getMultimediaPeliculas().toPromise();
      this.MultimediaPeliculas = data.resp;
      
      const data2 = await this.dataBD.getPeliculas().toPromise();
      this.peliculas = data2.resp;

      this.generarTitulosUnicos();
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  generarTitulosUnicos() {
    const titulosSet = new Set<string>();
    this.MultimediaPeliculas.forEach(multimedia => {
      titulosSet.add(multimedia.peliculas_id.titulo);
    });
    this.titulosUnicos = Array.from(titulosSet);
  }

  eliminarMultimediaPelicula(idMultimedia: MultimediaPelicula) {
    this.dataBD.crud_multimediaPelicula(idMultimedia, 'eliminar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarMultimediaPelicula();
    });
  }

  async crearMultimediaPelicula() {
    try {
      const res1 = await this.dataBD.crud_multimedia(this.crearMultimedias, 'insertar').toPromise();
      //console.log("Respuesta del servicio:", res1); // Imprimimos la respuesta completa para depuración

      // Verificamos si res1.resp contiene _id y lo asignamos
      if (res1 && res1.resp && res1.resp._id) {
        this.crearMultimedias._id = res1.resp._id as string;
        this.nuevo_id = this.crearMultimedias._id;
        this.EnviarMultimediaPelicula.imagenes_id = this.nuevo_id;
        //console.log("ID de la imagen creada: " + this.nuevo_id);

        await this.dataBD.crud_multimediaPelicula(this.EnviarMultimediaPelicula, 'insertar').toPromise();
        //console.log("MultimediaPelicula creada con éxito");

        this.cargarMultimediaPelicula();
        // Restablecer los valores de los campos de entrada después de crear la multimedia
        this.crearMultimedias = {
          descripcion: '',
          url: '',
          _id: '-1',
        };
        this.EnviarMultimediaPelicula = {
          _id: '-1',
          peliculas_id: '',
          imagenes_id: ''
        };

      } else {
        console.error('Error: el _id es undefined en la respuesta de crud_multimedia.');
      }
    } catch (error) {
      console.error('Error al crear multimedia pelicula:', error);
    }
  }

  imagenesPeliculas(idImagen: string) {
    this.router.navigate(['/multimedia', idImagen]);
  }

  async clasificarPeliculas() {
    if (this.peliculaSeleccionada !== '') {
      try {
        const data = await this.dataBD.getMultimediaPeliculasTitulo(this.peliculaSeleccionada).toPromise();
        this.MultimediaPeliculas = data.resp;
        console.log(this.MultimediaPeliculas);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    } else {
      // Si no hay selección, cargar todas las películas nuevamente
      this.cargarMultimediaPelicula();
    }
  }
}
