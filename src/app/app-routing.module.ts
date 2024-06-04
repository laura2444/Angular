import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroeEditComponent } from './components/heroe-edit/heroe-edit.component';
import { MultimediaPeliculaComponent } from './components/multimedia-pelicula/multimedia-pelicula.component';
import { MultimediaComponent } from './components/multimedia-edit/multimedia.component';
import { MultimediaListaComponent } from './components/multimedia-lista/multimedia-lista.component';
import { MultimediaHeroeComponent } from './components/multimedia-heroe/multimedia-heroe.component';
import { PeliculaListComponent } from './components/pelicula-list/pelicula-list.component'
import { PeliculaEditComponent } from './components/pelicula-edit/pelicula-edit.component'
import { CastingPeliculaComponent } from './components/casting-pelicula/casting-pelicula.component'

const routes: Routes = [
  {path: 'hogar',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'heroes',component: HeroesListComponent}, 
  {path: 'heroeedit/:idheroe',component: HeroeEditComponent},
  {path: 'multimediaPelicula',component: MultimediaPeliculaComponent}, 
  {path: 'ListaM',component: MultimediaListaComponent }, 
  {path: 'multimedia/:idImagen',component: MultimediaComponent},
  {path: 'multimediaHeroe/:unHeroe',component: MultimediaHeroeComponent},
  {path: 'ListaP', component: PeliculaListComponent},
  {path: 'peliculaEdit/:idPelicula', component: PeliculaEditComponent},
  {path: 'CastingPelicula', component: CastingPeliculaComponent},
  
  
  



  {path: '**',pathMatch: 'full',redirectTo: 'home'}

];


'navbar no se incluye porque se hace referencia en la app, estos los necesitamos porque se van a enrutar'

'si la ruta no esta definida se define por defecto, en este caso por defecto si no hay rutas se redirige al home, yo podria enrutar desde el navbar como notaaa'

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }