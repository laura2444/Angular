import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroeEditComponent } from './components/heroe-edit/heroe-edit.component';

const routes: Routes = [
  {path: 'hogar',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'heroes',component: HeroesListComponent},
  {path: 'heroeedit/:idheroe',component: HeroeEditComponent},


  {path: '**',pathMatch: 'full',redirectTo: 'home'}

];


'navbar no se incluye porque se hace referencia en la app, estos los necesitamos porque se van a enrutar'

'si la ruta no esta definida se define por defecto, en este caso por defecto si no hay rutas se redirige al home, yo podria enrutar desde el navbar como notaaa'

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }