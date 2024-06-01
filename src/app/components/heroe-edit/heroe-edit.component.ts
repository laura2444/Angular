import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBService } from '../../services/mongo-db.service';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.component.html',
  styleUrl: './heroe-edit.component.css'
})
export class HeroeEditComponent {
  idHeroe!: any;

  unHeroe: Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
    _id: '-1',
  };

   unResultado!:any;
   unaAccion: string = 'Mensaje';
   unMensaje: string = '';
 
  constructor( //ACÁ ES COMO LOGRO OBTENER LA INFORMACIÓN DE OTRO PARTE
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataBD: MongoDBService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idHeroe = params['idheroe'];
      console.log('IDHEROE', this.idHeroe);

      if (this.idHeroe != 'nuevo') {
        this.cargarHeroeBD();
      }
      console.log(this.unHeroe)

    });

  }

  async cargarHeroeBD() {
    //this.cargando = true;
    await this.dataBD
      .getUnHeroe(this.idHeroe)
      .toPromise()
      .then((data: any) => {
        this.unHeroe = data.resp;
      });
  }


  guardar(){
    console.log("Se envio Guardar");
    if (this.idHeroe == 'nuevo') {

      this.nuevoHeroe();

    } else {

      this.actualizarHeroe();

    }



  }

  actualizarHeroe() {
    //console.log(this.unaDivision);
    this.dataBD.crud_Heroes(this.unHeroe, 'modificar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_ACTUALIZAR', this.unResultado);

        if (this.unResultado.Ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });

          this.router.navigate(['/heroes']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.error.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  async nuevoHeroe() {
    await this.dataBD.crud_Heroes(this.unHeroe, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_NUEVO', this.unResultado);

        if (this.unResultado.Ok == true) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          this.router.navigate(['/heroes']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }




}