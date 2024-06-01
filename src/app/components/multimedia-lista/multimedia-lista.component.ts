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

  Multimedias!:Multimedia[];
  temp!: any;

  constructor(
    private dataBD:MongoDBService,
    private router: Router

  ){}


}
