import { Component, OnInit } from '@angular/core';
import { MongoDBService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { MultimediaHeroe } from '../../interfaces/multimediaH.interface';

@Component({
  selector: 'app-multimedia-heroe',
  templateUrl: './multimedia-heroe.component.html',
  styleUrls: ['./multimedia-heroe.component.css']
})
export class MultimediaHeroeComponent implements OnInit {
  MultimediaHeroes!: MultimediaHeroe[];
  HeroeSeleccionado: string = '';

  constructor(
    private dataBD: MongoDBService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarMultimediaHeroe();
  }

  async cargarMultimediaHeroe() {
    console.log(this.HeroeSeleccionado)
    try {
      const data = await this.dataBD.getMultimediaHeroes(this.HeroeSeleccionado).toPromise();
      this.MultimediaHeroes = data.resp;
      console.log(this.MultimediaHeroes);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }



}
