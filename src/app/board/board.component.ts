import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() value: 'x' | '0' | undefined
  constructor() {


  }
  ngOnInit(): void {

  }

}
