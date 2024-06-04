import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { MongoDBService } from '../../services/mongo-db.service';  //mi servicio
import { Router } from '@angular/router'; //servicio de libreria de angular
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent {
Heroes!: Heroe[];  //traer lista de heroes de la bd, atributo de la clase

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

constructor(
    private dataBD:MongoDBService,
    private router: Router, //permite hacer los enrutamientos del angular router
  ){


   }//INYECTO EL SERVICIO QUE TRAE DATOS, aqui puedo usar cualquiera de los metodos para las peticiones http que se definicieron en mongo-db-setvice

//evento-> es un metodo que despues de haber cargado todo
ngOnInit(){
  this.cargarHeroesBD(); //llamo a metodo que permite traer datos
}



//traiga todos los heroes y los integre en la lista
async cargarHeroesBD(){ //metodo asincrono
  await this.dataBD
  .getHeroes() //llamar al metodo heroe como una promesa
  .toPromise()
  .then((data:any)=>{
    this.Heroes= data.resp;  //datos quedan en arreglo de Heroes, se lo asigno en atributo de clase de arreglo de heroes
    console.log(this.Heroes)
  });

}

editarHeroe(unIdHeroe:any){
  this.router.navigate(['/heroeedit', unIdHeroe]);
}


 eliminarHeroe(unHeroe: any) {
  if (!unHeroe && !unHeroe.data){
    console.log("No hay información para eliminar al héroe.");
  }
   this.dataBD.crud_Heroes(unHeroe, 'eliminar').subscribe(
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

      this.cargarHeroesBD() ;
      this.router.navigate(['/heroes']);

    }
    ,(error:any) => {
      console.error(error)
    }
  );
}

editarFotos(unHeroe:any){
  console.log(unHeroe)
  this.router.navigate(['/multimediaHeroe', unHeroe]);

}

}