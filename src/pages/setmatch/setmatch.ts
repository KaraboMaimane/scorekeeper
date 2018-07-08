import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fixture } from '../../assets/match';

/**
 * Generated class for the SetmatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setmatch',
  templateUrl: 'setmatch.html',
})
export class SetmatchPage {
  awayTeamStats;
  homeTeamStats;
  victor: any;
  fixtures = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetmatchPage');
  }

  ionViewDidEnter(){
    this.homeTeamStats = this.navParams.get('homeTeamStats');
    this.awayTeamStats = this.navParams.get('awayTeamStats');
    this.victor = this.navParams.get('victor');
    let fixture = new Fixture(this.homeTeamStats, this.awayTeamStats, this.victor);
    this.fixtures.push(fixture);
    console.log(this.fixtures);
  }

}
