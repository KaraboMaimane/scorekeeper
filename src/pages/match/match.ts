import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SetmatchPage } from '../setmatch/setmatch';
import { Match } from '../../assets/match';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  //setting up our variables
  selected = 'none';
  home = 'home';
  away = 'away';
  homeVal: number = 0;
  awayVal: number = 0;
  homeTries: number = 0;
  homeConversions: number = 0;
  awayTries: number = 0;
  awayConversions: number = 0;
  homePenalties: number = 0;
  awayPenalties: number = 0;
  homeScores = [];
  awayScores = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.home = this.navParams.get('home');
    this.away = this.navParams.get('away');
    const info = this.alertCtrl.create({
      title: 'Instructions',
      subTitle: `How the scoring system works: <br>
      1.Select the Red or Blue icon with the running man <br>
      2.Choose what function to apply to the selected side <br>
      3.Enjoy the app!!!
      `
    });
    info.present();
  }

  selectHome() {
    if (this.selected == 'none' || this.selected == 'away') {
      this.selected = 'home';
    }
  }

  selectAway() {
    if (this.selected == 'none' || this.selected == 'home') {
      this.selected = 'away';
    }
  }

  scoreTry() {
    if (this.selected == 'home') {
      const alert = this.alertCtrl.create({
        title: 'Conversion',
        subTitle: 'Was the conversion scored???',
        buttons: [
          {
            text: 'Missed',
            role: 'cancel',
            handler: data => {
              this.homeVal += 5;
              this.homeScores.push(this.homeVal);
              this.homeTries++;
            }
          },
          {
            text: 'Scored!!!',
            handler: data => {
              this.homeVal += 7;
              this.homeScores.push(this.homeVal);
              this.homeTries++;
              this.homeConversions++;
              this.presentToast();
            }
          }
        ]
      });
      alert.present();
    } else if (this.selected == 'away') {
      const alert = this.alertCtrl.create({
        title: 'Conversion',
        subTitle: 'Was the conversion scored???',
        buttons: [
          {
            text: 'Missed',
            role: 'cancel',
            handler: data => {
              this.awayVal += 5;
              this.awayScores.push(this.awayVal);
              this.awayTries++;
            }
          },
          {
            text: 'Scored!!!',
            handler: data => {
              this.awayVal += 7;
              this.awayScores.push(this.awayScores);
              this.awayTries++;
              this.awayConversions++;
            }
          }
        ]
      });
      alert.present();
    } else{
      this.warning();
    }
  }

  penalty() {
    if (this.selected == 'home') {
      const alert = this.alertCtrl.create({
        title: 'Penalty',
        subTitle: 'Was the penalty scored???',
        buttons: [
          {
            text: 'Missed',
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: 'Scored!!!',
            handler: data => {
              this.homeVal += 3;
              this.homeScores.push(this.homeVal);
              this.homePenalties++;
            }
          }
        ]
      });
      alert.present();
    } else if (this.selected == 'away') {
      const alert = this.alertCtrl.create({
        title: 'Penalty',
        subTitle: 'Was the penalty scored???',
        buttons: [
          {
            text: 'Missed',
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: 'Scored!!!',
            handler: data => {
              this.awayVal += 3;
              this.awayScores.push(this.awayVal);
              this.awayPenalties++;
            }
          }
        ]
      });
      alert.present();
    }
  }

  undo() {
    if (this.selected == 'home' && this.homeScores.length > 0) {
        this.homeVal = this.homeScores.pop();
    } else if (this.selected == 'away' && this.awayScores.length > 0) {
      this.awayVal = this.awayScores.pop();
    }
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Try has been scored',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
  warning() {
    const toast = this.toastCtrl.create({
      message: 'Select a team!!!',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  end(){
    if( this.homeVal > this.awayVal){
      const alert = this.alertCtrl.create({
        title: 'Home Team Wins',
        subTitle: this.home +  ' wins the match!!!'
      });
      alert.present();

      let homeTeamStats = new Match(this.home, this.homeVal, this.homeTries, this.homeConversions, this.homePenalties);
      let awayTeamStats = new Match(this.away, this.awayVal, this.awayTries, this.awayConversions, this.awayPenalties);

      this.navCtrl.push(SetmatchPage, {
        homeTeamStats: homeTeamStats,
        awayTeamStats: awayTeamStats,
        victor: this.home
      });

      //resetting all of our values
      this.homeVal = 0;
      this.awayVal = 0;
      this.homeTries = 0;
      this.homeConversions = 0;
      this.awayTries = 0;
      this.awayConversions = 0;
      this.homePenalties = 0;
      this.awayPenalties = 0;
      this.homeScores = [];
      this.awayScores = [];
    }else{
      const alert = this.alertCtrl.create({
        title: 'The Away team wins',
        subTitle: this.away + ' wins the match!!!'
      });
      alert.present();

      let homeTeamStats = new Match(this.home, this.homeVal, this.homeTries, this.homeConversions, this.homePenalties);
      let awayTeamStats = new Match(this.away, this.awayVal, this.awayTries, this.awayConversions, this.awayPenalties);
      
      this.navCtrl.push(SetmatchPage, {
        homeTeamStats: homeTeamStats,
        awayTeamStats: awayTeamStats,
        victor: this.away
      });

      //resetting all of our values
      this.homeVal = 0;
      this.awayVal = 0;
      this.homeTries = 0;
      this.homeConversions = 0;
      this.awayTries = 0;
      this.awayConversions = 0;
      this.homePenalties = 0;
      this.awayPenalties = 0;
      this.homeScores = [];
      this.awayScores = [];
    }
    
  }
}
