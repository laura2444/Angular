import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MultimediaHeroe, MultimediaHeroeSolo } from '../../interfaces/multimediaH.interface';
import Swal from 'sweetalert2';
import { Multimedia } from '../../interfaces/multimedia.interface';
import { Heroe } from '../../interfaces/heroe.interface';

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
  res: string = '';
  res1: any;

  EnviarMultimediaHeroe: MultimediaHeroeSolo = {
    _id: '-1',
    heroes_id: '',
    imagenes_id: ''
  };

  heroes!: Heroe[];
  crearMultimedias: Multimedia = {
    descripcion: '',
    url: '',
    _id: '-1',
  };

  nuevo_id: string = '';

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

        this.cargarMultimediaHeroe();
        this.router.navigate(['/multimediaHeroe/',this.info]);
  
  
      }
      ,(error:any) => {
        console.error(error)
      }
    );

  }

  async crearMultimediaHeroe() {
    try{
      const res1= await this.dataBD.crud_multimedia(this.crearMultimedias, 'insertar').toPromise();
      console.log("das",res1,"ad", res1.resp, "ad",res1.resp._id)
      if(res1 && res1.resp && res1.resp._id){
        console.log("ads")
        this.crearMultimedias._id=res1.resp._id as string; //asigno id mongo de imagenes al _id de crearMultimedias
        this.nuevo_id= this.crearMultimedias._id;
        this.EnviarMultimediaHeroe.imagenes_id= this.nuevo_id; //asigno a MultimediaHeroes en su campo imagenes_id el campo creador en la linea 103
        
        //para asignar el id del heroe
        this.EnviarMultimediaHeroe.heroes_id= this.info

        await this.dataBD.crudMultimediaHeroes(this.EnviarMultimediaHeroe,'insertar').toPromise();

        this.cargarMultimediaHeroe();
        this.router.navigate(['/multimediaHeroe/',this.info]);

        // Despues de cargar pagina, Restablecer los valores de los campos de entrada

        this.EnviarMultimediaHeroe={
          _id: '-1',
          heroes_id: '',
          imagenes_id: ''
        };

        this.crearMultimedias={
          descripcion: '',
          url: '',
          _id: '-1',
        };
      }else{
        console.error('Error: el _id es undefined en la respuesta de crud_multimedia.');
    }
    }catch(error){
      
    }
  }

  imagenesHeroes(idImagen: string) {
    this.router.navigate(['/multimedia', idImagen]);
  }



}
