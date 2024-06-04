import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBService } from '../../services/mongo-db.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import Swal from 'sweetalert2';
import { error } from 'node:console';

@Component({
  selector: 'app-pelicula-edit',
  templateUrl: './pelicula-edit.component.html',
  styleUrl: './pelicula-edit.component.css'
})
export class PeliculaEditComponent {

  idPelicula!: any;

  unPelicula: Pelicula = {
    _id: '-1',
    descripcion: '',
    titulo: '',
    fecha_lanzamiento: '',
    img: '',
  }

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
      this.idPelicula = params['idPelicula'];
      console.log('Información de IdPelicula', this.idPelicula);

      if (this.idPelicula != 'nuevo') {
        this.cargarPeliculaBD();
      }

      console.log(this.unPelicula)
    });

  }

  async cargarPeliculaBD() {
    await this.dataBD.getPeliculasID(this.idPelicula)
      .toPromise()
      .then((data: any) => {
        this.unPelicula = data.resp
      });

  }

  guardarPelicula() {
    console.log("Guarda Cambios");
    this.actualizarPelicula()


  }

  actualizarPelicula() {
    this.dataBD.crud_Peliculas(this.unPelicula, 'modificar').subscribe(
      (res: any) => {
        //console.log('RESULTADO ACTUALIZADO', res);

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

          this.router.navigate(['/ListaP']);
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

          this.router.navigate(['/ListaP']);
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
