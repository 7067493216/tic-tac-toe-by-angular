import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { User } from '../services/user.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // modalRef!:BsModalRef 
  squares: any = [];
  xIsNext: boolean = true;
  winner = '';
  counter = 0;
  isDraw = '';
  freshPage: boolean = true;
  public name1: any;
  public name2: any;
  submitted: boolean = false;
  userdata: User[] = [];
  invalidData: boolean = false;

  public playerForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    player1: new FormControl(null, Validators.required),
    player2: new FormControl(null, Validators.required),
  })

  constructor(
    private apiService: ApiService,
    // private modalService:BsModalService
  ) {}

  ngOnInit(): void {
  }
  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  get v() {
    return this.playerForm.controls;
  }
  submitForm(event: any) {
    this.submitted = true;
    if (this.playerForm.invalid) {
      this.invalidData = false;
      return
    }
    this.apiService.addUsers(this.playerForm.value).subscribe((data: any) => {
    })
    this.apiService.getUsers().subscribe((x: any) => {
      this.userdata = x;
      this.name1 = this.userdata[0].player1;
      this.name2 = this.userdata[0].player2;
    })
    this.closePopup();
    this.newGame();
    this.invalidData = true;
  }
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isDraw = '';
    this.counter = 0;
    this.freshPage = false;
  }
  get player() {
    return this.xIsNext ? 'x' : '0'
  }
  calculateWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] == this.squares[b] && this.squares[a] == this.squares[c]) {
        // console.log(this.squares[a],"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        // console.log(JSON.stringify(this.squares), "yyyyyyyyyyyyyy");
        return this.squares[a];
      }
    }
    return null;
  }
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.counter++;
    }
    this.winner = this.calculateWinner();

    if (!this.winner && this.counter == 9) {
      this.isDraw = 'yes'
    }
  }
}
