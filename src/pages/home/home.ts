import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchPage } from '../match/match';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeTeam = 'Karabos Elites';
  awayTeam = 'Tiger Boys';
  someProperty = false;
  constructor(public navCtrl: NavController) {

  }
  assignHome(event){
    this.homeTeam = event.target.value;
  }

  assignAway(event){
    this.awayTeam = event.target.value;
  }

  somePropertyAss(){
    
    if(this.someProperty != true){
      this.someProperty = true;
    }else{
      this.someProperty = false;
    }
  }

  submit(){
    this.navCtrl.push(MatchPage,{
      home: this.homeTeam,
      away: this.awayTeam
    });
  }
}
