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


  imagenesPeliculas(multimedia: string) {
    this.router.navigate(['/multimedia', multimedia]);
  }
  

}
