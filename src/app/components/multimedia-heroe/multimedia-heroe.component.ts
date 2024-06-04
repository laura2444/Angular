import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MultimediaHeroe, MultimediaHeroeSolo } from '../../interfaces/multimediaH.interface';
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

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  EnviarMultimediaHeroe: MultimediaHeroeSolo = {
    _id: '-1',
    heroes_id: '',
    imagenes_id: ''
  };

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

  eliminarMultimediaHeroe(HeroeSeleccionado:MultimediaHeroe) {
    console.log("aad",HeroeSeleccionado)
    this.dataBD.crudMultimediaHeroes(HeroeSeleccionado, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;
  
        Swal.fire({
          icon: 'info',
          title: 'Information',
          text: 'Heroe Eliminado',
        });
        this.unaAccion = 'Mensaje:';
        this.unMensaje = 'Heroe Eliminado';
        setTimeout(() => (this.unMensaje = ''), 3000);
  
  
      }
      ,(error:any) => {
        console.error(error)
      }
    );

  }

  crearMultimediaHeroe() {
    
  }

  imagenesHeroes(idImagen: string) {
    this.router.navigate(['/multimedia', idImagen]);
  }



}
