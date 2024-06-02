import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBService } from '../../services/mongo-db.service';
import { Multimedia } from '../../interfaces/multimedia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrl: './multimedia.component.css'
})
export class MultimediaComponent {
  idMultimedia!: any;

  unMultimedia: Multimedia = {
    _id:'',
    descripcion:'',
    url:'',
  };

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(     
    private activatedRoute: ActivatedRoute, //Con esta libreria es como se obtiene la información de otra parte(COMPONENTE MULTIMEDIAPELICULA)
    private router: Router,
    private dataBD: MongoDBService 
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.idMultimedia = params['idImagen'];
      console.log('idMultimedia', this.idMultimedia);
      
      if (this.idMultimedia != 'nuevo') {
        this.cargarMultimediaBD();
      }

      console.log(this.unMultimedia)
    });
  }


  async cargarMultimediaBD() {
    await this.dataBD
    .getUnMultimediaID(this.idMultimedia)
    .toPromise()
    .then((data:any) => {
      this.unMultimedia = data.resp;

    });
  }

  actualizarMultimedia(){
    
  }


}
