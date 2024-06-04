import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroeEditComponent } from './components/heroe-edit/heroe-edit.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { MultimediaPeliculaComponent } from './components/multimedia-pelicula/multimedia-pelicula.component';
import { MultimediaComponent } from './components/multimedia-edit/multimedia.component';
import { MultimediaListaComponent } from './components/multimedia-lista/multimedia-lista.component';
import { MultimediaHeroeComponent } from './components/multimedia-heroe/multimedia-heroe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroeEditComponent,
    NavbarComponent,
    HomeComponent,
    MultimediaPeliculaComponent,
    MultimediaComponent,
    MultimediaListaComponent,
    MultimediaHeroeComponent
  ],
  imports: [     /*modulos a importar en nuestro proyecto */
    BrowserModule,
    AppRoutingModule,

    //aqui involucro HttpClientModule para realizar las peticiones RESTFUL -> post,put, delete ....
    HttpClientModule,       /* modulos a diferencia de componentes importa NO EN DECLARACIONES SINO EN IMPORT  */
    FormsModule, //para formulario
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*incorpora todos componentes adicionales que se crean en mi aplicacion*/