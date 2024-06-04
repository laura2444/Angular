import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MultimediaHeroe } from '../../interfaces/multimediaH.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multimedia-heroe',
  templateUrl: './multimedia-heroe.component.html',
  styleUrls: ['./multimedia-heroe.component.css']
})
export class MultimediaHeroeComponent implements OnInit {
  MultimediaHeroes!: MultimediaHeroe[];
  HeroeSeleccionado: string = '';
  info: string = '';

  constructor(
    private dataBD: MongoDBService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 


    this.activatedRoute.params.subscribe((params) => {
      this.info = params['unHeroe'];
      console.log('idMultimedia', this.info);

    });



  }

  ngOnInit() {
    this.cargarMultimediaHeroe();
  }

  async cargarMultimediaHeroe() {
    console.log(this.HeroeSeleccionado)
    try {
      const data = await this.dataBD.getMultimediaHeroes(this.info).toPromise();
      this.MultimediaHeroes = data.resp;

      if (this.MultimediaHeroes.length== 0){
        Swal.fire("El heroe no tiene imagenes");

      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  eliminarMultimediaPelicula() {

  }

  crearMultimediaPelicula() {
    
  }

  imagenesHeroes(idImagen: string) {
    this.router.navigate(['/multimedia', idImagen]);
  }



}
