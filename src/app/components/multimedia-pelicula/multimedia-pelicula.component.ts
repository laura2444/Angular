import { Component } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { MultimediaPelicula } from '../../interfaces/multimediaP.interface';


@Component({
  selector: 'app-multimedia-pelicula',
  templateUrl: './multimedia-pelicula.component.html',
  styleUrl: './multimedia-pelicula.component.css'
})
export class MultimediaPeliculaComponent {

  MultimediaPeliculas!: any;  

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(
    private dataBD:MongoDBService,
    private router: Router, //permite hacer los enrutamientos del angular router
  ){}

  ngOnInit(){
    this.cargarHeroesBD(); 
  }

  async cargarHeroesBD() {
    try {
      const data = await this.dataBD.getMultimediaPeliculas().toPromise();
      this.MultimediaPeliculas = data.resp;
      console.log(this.MultimediaPeliculas);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }
  
  editarMultimedia(Multimedia:any){

  }

  eliminarMultimedia(idMultimedia:any){

  }

  imagenesPeliculas(idImagenes: any){
    
  }
}
