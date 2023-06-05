import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  teams = [
    { name: 'Team 1', score: 10 },
    { name: 'Team 2', score: 15 },
    { name: 'Team 3', score: 8 },
  ];
  constructor(private router: Router) { }

  goBack(){
    this.router.navigate(['/tabs/images']);
  }

  ngOnInit() {}

}
