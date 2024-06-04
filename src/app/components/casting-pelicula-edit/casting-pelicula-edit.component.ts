import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBService } from '../../services/mongo-db.service';
import { Casting } from '../../interfaces/casting.interface'
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';
import { error } from 'node:console';

@Component({
  selector: 'app-casting-pelicula-edit',
  templateUrl: './casting-pelicula-edit.component.html',
  styleUrl: './casting-pelicula-edit.component.css'
})
export class CastingPeliculaEditComponent {

  idCasting: any;

  unResultado: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  Peliculas!: Pelicula [];
  Heroes!: Heroe[];

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
    private activatedRoute: ActivatedRoute, //Con esta libreria es como se obtiene la información de otra parte(COMPONENTE MULTIMEDIAPELICULA)
    private router: Router,
    private dataBD: MongoDBService
  ) {

    this.activatedRoute.params.subscribe((params) => {
      this.idCasting = params['idCasting'];
      console.log('Información de IdPelicula', this.idCasting);
      console.log(this.idCasting)

    });

  }

  actualizarCasting(){
    this.modificarCasting(this.unCasting)
  }


  ngOnInit(){
    this.cargarCastingPelicula();
  }

  async cargarCastingPelicula(){
    try {
      const data = await this.dataBD.getHeroes().toPromise();
      this.Heroes = data.resp;
      
      const data2 = await this.dataBD.getPeliculas().toPromise();
      this.Peliculas = data2.resp;

      const data3 = await this.dataBD.getCastingPeliculaID(this.idCasting).toPromise();
      this.unCasting = data3.resp;

    } catch (error) {
      console.error('Error al cargar datos:', error);
    }

  }

  modificarCasting(unCasting: Casting){
    this.dataBD.crud_castingPelicula(unCasting, 'modificar').subscribe((res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_ACTUALIZAR', this.unResultado);
        
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });
          this.router.navigate(['/CastingPelicula/']);

        
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



  }


