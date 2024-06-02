import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { MultimediaPelicula } from '../../interfaces/multimediaP.interface';

@Component({
  selector: 'app-multimedia-pelicula',
  templateUrl: './multimedia-pelicula.component.html',
  styleUrls: ['./multimedia-pelicula.component.css']
})
export class MultimediaPeliculaComponent implements OnInit {

  MultimediaPeliculas!: MultimediaPelicula[];
  peliculaSeleccionada: string = '';
  titulosUnicos: string[] = [];

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
      this.generarTitulosUnicos();
      console.log(this.MultimediaPeliculas);
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

  editarMultimedia(multimedia: MultimediaPelicula) {
    // Implementar lógica para editar multimedia
  }

  eliminarMultimedia(idMultimedia: string) {
    // Implementar lógica para eliminar multimedia
  }

  imagenesPeliculas(idImagen: string) {
    this.router.navigate(['/multimedia', idImagen]);
  }

  async clasificarPeliculas() {
    if (this.peliculaSeleccionada != '') {
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
