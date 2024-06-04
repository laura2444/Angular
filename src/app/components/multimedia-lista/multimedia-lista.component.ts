import { Component } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Route, Router } from '@angular/router';
import { Multimedia } from '../../interfaces/multimedia.interface';


@Component({
  selector: 'app-multimedia-lista',
  templateUrl: './multimedia-lista.component.html',
  styleUrl: './multimedia-lista.component.css'
})
export class MultimediaListaComponent {

  Multimedias!: Multimedia[];
  temp!: any;

  ///
  res: any;

  /////
  unMultimedia: Multimedia = {
    _id: '-1',
    descripcion: '',
    url: '',  
  }



  constructor(
    private dataBD: MongoDBService,
    private router: Router

  ) { }

  ngOnInit() {
    this.cargarMultimediaBD();
  }

  ///METODO ASYNCRONICOQ QUE GENERA SIEMPRE CAMBIOS AL REALIZAR UN ENVIO O HABER CAMBIOS EN LA INFORMACIÓN
  async cargarMultimediaBD() {
    await this.dataBD
      .getMultimedia()
      .toPromise()
      .then((data: any) => {
        this.Multimedias = data.resp;

      });
  }

  crearMultimedia(){
    console.log( "Información de datos guardados"+this.unMultimedia)
    this.agregarImagen(this.unMultimedia)
  }


  imagenEditar(multimedia: any) {
    this.router.navigate(['/multimedia', multimedia]);
  }

  agregarImagen(multimedia: Multimedia){
    this.dataBD.crud_multimedia(multimedia, 'insertar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarMultimediaBD();
    });

    this.unMultimedia = {
    _id: '-1',
    descripcion: '',
    url: '',
    }

  }


  
  eliminarImagen(unMultimedia : Multimedia){
    this.dataBD.crud_multimedia(unMultimedia, 'eliminar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarMultimediaBD();
    });
    this.cargarMultimediaBD()
    
  }

}
