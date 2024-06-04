import { Component } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { CastingSolo, Casting } from '../../interfaces/casting.interface';
import { Heroe } from '../../interfaces/heroe.interface';
import { Pelicula } from '../../interfaces/pelicula.interface';


@Component({
  selector: 'app-casting-pelicula',
  templateUrl: './casting-pelicula.component.html',
  styleUrl: './casting-pelicula.component.css'
})
export class CastingPeliculaComponent {

  Castings!: Casting[];
  Peliculas!: Pelicula[];
  Heroes!: Heroe[];

  res: string = '';
  res1: any;

  unCasting: Casting = {
    _id: '',
    heroes_id:{
      _id: '',
      nombre: '',
    },
    personaje: '',
    peliculas_id: {
      _id: '',
      titulo: '',
      img: '',
    },

  };

  constructor(
    private dataBD: MongoDBService,
    private router: Router
  ) { }

  ngOnInit(){
    this.cargarCastingPelicula();
  }

  async cargarCastingPelicula(){
    try {
      const data = await this.dataBD.getCastingPelicula().toPromise();
      this.Castings = data.resp;
      
      const data2 = await this.dataBD.getPeliculas().toPromise();
      this.Peliculas = data2.resp;

      const data3 = await this.dataBD.getHeroes().toPromise();
      this.Heroes = data3.resp;

    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  crearCasting(){
    this.crearCastingPelicula(this.unCasting)
  }


  eliminarCasting(unCast : Casting){
    this.dataBD.crud_castingPelicula(unCast, 'eliminar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarCastingPelicula();
    });

  }

  crearCastingPelicula(unCast : Casting){
    this.dataBD.crud_castingPelicula(unCast, 'insertar').subscribe((res: any) => {
      this.res = res;
      console.log("Eliminado: " + this.res);
      this.cargarCastingPelicula();
    });

  }
  
}



