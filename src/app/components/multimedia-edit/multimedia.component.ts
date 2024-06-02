import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBService } from '../../services/mongo-db.service';
import { Multimedia } from '../../interfaces/multimedia.interface';
import Swal from 'sweetalert2';
import { error } from 'node:console';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrl: './multimedia.component.css'
})
export class MultimediaComponent {
  idMultimedia!: any;

  unMultimedia: Multimedia = {
    _id: '',
    descripcion: '',
    url: '',
  };

  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';



  constructor(
    private activatedRoute: ActivatedRoute, //Con esta libreria es como se obtiene la información de otra parte(COMPONENTE MULTIMEDIAPELICULA)
    private router: Router,
    private dataBD: MongoDBService
  ) {
    /////FUNCIÓN PARA OBTENER EL ENVIÓ DE UN COMPONENTE A OTRO
    this.activatedRoute.params.subscribe((params) => {
      this.idMultimedia = params['idImagen'];
      console.log('idMultimedia', this.idMultimedia);

      if (this.idMultimedia != 'nuevo') {
        this.cargarMultimediaBD();
      }

      console.log(this.unMultimedia)
    });
  }

  ///METODO ASYNCRONICOQ QUE GENERA SIEMPRE CAMBIOS AL REALIZAR UN ENVIO O HABER CAMBIOS EN LA INFORMACIÓN
  async cargarMultimediaBD() {
    await this.dataBD
      .getUnMultimediaID(this.idMultimedia)
      .toPromise()
      .then((data: any) => {
        this.unMultimedia = data.resp;

      });
  }

///FUNCIÓN GLOBAL PARA ENVIOS DE INFORMACIÓ
guardarMultimedia(){
  console.log("Se piensa guardar");
  this.actualizarMultimedia();


}





////METODOS PARA EL FRONTED Y OBTENER INFORMACIÓN Y ENVIAR MENSAJE DE CREACIÓN
actualizarMultimedia() {
  this.dataBD.crud_multimedia(this.unMultimedia, 'modificar').subscribe(
    (res: any) => {
      console.log('RESULTADO ACTUALIZADO', res);

      if (res && res.data) {
        this.unResultado = res.data;

        this.unaAccion = 'Mensaje:';
        this.unMensaje = 'Datos actualizados correctamente.';
        setTimeout(() => (this.unMensaje = ''), 3000);

        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: 'Datos actualizados correctamente.',
        });

        this.router.navigate(['/home']);
      } else if (res && res.Ok) {
        this.unResultado = res.resp;  

        this.unaAccion = 'Mensaje:';
        this.unMensaje = 'Datos actualizados correctamente.';
        setTimeout(() => (this.unMensaje = ''), 3000);

        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: 'Datos actualizados correctamente.',
        });

        this.router.navigate(['/home']);
      } else {
        this.unaAccion = 'Error:';
        this.unMensaje = res && res.error && res.error.msg
          ? res.error.msg
          : 'Ocurrió un error desconocido.';
        setTimeout(() => (this.unMensaje = ''), 3000);
      }
    },
    (error: any) => {
      console.error('Error en la suscripción:', error);
      this.unaAccion = 'Error:';
      this.unMensaje = 'Ocurrió un error en la solicitud.';
      setTimeout(() => (this.unMensaje = ''), 3000);
    }
  );
}


}
