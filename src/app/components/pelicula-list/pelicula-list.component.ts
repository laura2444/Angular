import { Component } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Route, Router } from '@angular/router';
import { Pelicula } from '../../interfaces/pelicula.interface';


@Component({
  selector: 'app-pelicula-list',
  templateUrl: './pelicula-list.component.html',
  styleUrl: './pelicula-list.component.css'
})
export class PeliculaListComponent {

  Peliculas!: Pelicula[];
  temp!: any;

  ///
  res: any;

  ///
  unPelicula: Pelicula = {
    _id: '-1',
    titulo: '',
    descripcion: '',
    fecha_lanzamiento: '',
    img: '',
  }

  constructor(

    private dataBD: MongoDBService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarPeliculasBD()
  }

  async cargarPeliculasBD() {
    await this.dataBD
      .getPeliculas()
      .toPromise()
      .then((data: any) => {
        this.Peliculas = data.resp
      });
  }

  crearPelicula(){
    this.agregarPelicula(this.unPelicula)
  }



  eliminarPelicula(unaPelicula : Pelicula){
    this.dataBD.crud_Peliculas(unaPelicula, 'eliminar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarPeliculasBD();
    });
    this.cargarPeliculasBD()


  }

  editarPelicula(idPelicula : any){
    this.router.navigate(['/peliculaEdit', idPelicula]);
  }

  agregarPelicula(pelicula : Pelicula){
    console.log(this.unPelicula)
    this.dataBD.crud_Peliculas(pelicula, 'insertar').subscribe((res: any) => {
      this.res = res;
      console.log("Insertado: " + this.res);
      this.cargarPeliculasBD();
    });

    this.unPelicula = {
      _id: '-1',
      titulo: '',
      descripcion: '',
      fecha_lanzamiento: '',
      img: '',
    }

  }


}
