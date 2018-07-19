import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Match } from '../../assets/match';
import { SetmatchPage } from '../setmatch/setmatch';

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

export class MatchPage implements OnInit {
  team: string = 'No Advantage';
  //home team vars
  homeTeam: string = 'Karabos Elites';
  homeScore: number = 0;
  homeTries: number = 0;
  homeConversion: number = 0;
  homePenalties: number = 0;
  //away team vars
  awayTeam: string = 'Tiger Boys';
  awayScore: number = 0;
  awayTries: number = 0;
  awayConversion: number = 0;
  awayPenalties: number = 0;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController, private navParams: NavParams) {

  }

  ngOnInit() {
    this.homeTeam = this.navParams.get('home');
    this.awayTeam = this.navParams.get('away');
    const alert = this.alertCtrl.create({
      title: 'How To Work This App',
      subTitle: `
      1. Select a side by choosing one of these running men on the screen<br>
      2. Select whatever action that is desired in the match either try, conversion, penalty and ultimately undo<br>
      3.Enjoy the app!!!`,
      buttons: ['OK']
    });
    alert.present();
  }

  checkTry() {
    if (this.team == 'home') {
      this.homeScore += 5;
      this.homeTries++;
    } else if (this.team == 'away') {
      this.awayScore += 5;
      this.awayTries++;
    } else {
      const toast = this.toastCtrl.create({
        duration: 1000,
        message: 'No team advantage... Pick a side'
      });
      toast.present();
    }
  }

  undoTry() {
    if (this.team == 'home' && this.homeTries > 0) {
      this.homeScore -= 5;
      this.homeTries--;
    } else if (this.team == 'away' && this.awayTries > 0) {
      this.awayScore -= 5;
      this.awayTries--;
    } else {
      const toast = this.toastCtrl.create({
        message: 'Nothing to undo here...',
        duration: 2000
      });
      toast.present();
    }
  }

  checkPenalty() {
    if (this.team == 'home') {
      this.homeScore += 3;
      this.homePenalties++;
    } else if (this.team == 'away') {
      this.awayScore += 3;
      this.awayPenalties++;
    } else {
      const toast = this.toastCtrl.create({
        duration: 1000,
        message: 'No team advantage... Pick a side'
      });
      toast.present();
    }
  }

  undoPenalty() {
    if (this.team == 'home' && this.homePenalties > 0) {
      this.homeScore -= 3;
      this.homePenalties--;
    } else if (this.team == 'away' && this.awayPenalties > 0) {
      this.awayScore -= 3;
      this.awayPenalties--;
    } else {
      const toast = this.toastCtrl.create({
        message: 'Nothing to undo here...',
        duration: 2000
      });
      toast.present();
    }
  }

  checkConversion() {
    if (this.team == 'home') {
      this.homeScore += 2;
      this.homeConversion++;
    } else if (this.team == 'away') {
      this.awayScore += 2;
      this.awayConversion++;
    } else {
      const toast = this.toastCtrl.create({
        duration: 1000,
        message: 'No team advantage... Pick a side'
      });
      toast.present();
    }
  }

  undoConversion() {
    if (this.team == 'home' && this.homeConversion > 0) {
      this.homeScore -= 2;
      this.homeConversion--;
    } else if (this.team == 'away' && this.awayConversion > 0) {
      this.awayScore -= 2;
      this.awayConversion--;
    } else {
      const toast = this.toastCtrl.create({
        message: 'Nothing to undo here...',
        duration: 2000
      });
      toast.present();
    }
  }

  endMatch() {
    if (this.homeScore > this.awayScore) {
      const alert = this.alertCtrl.create({
        title: 'Winner!!!',
        subTitle: 'The winner for this match was ' + this.homeTeam,
        buttons: ['OK']
      });
      alert.present();

      let homeTeamStats = new Match(this.homeTeam, this.homeScore, this.homeTries, this.homeConversion, this.homePenalties);
      let awayTeamStats = new Match(this.awayTeam, this.awayScore, this.awayTries, this.awayConversion, this.awayPenalties);
      this.navCtrl.push(SetmatchPage, {
        victor: this.homeTeam,
        homeTeamStats: homeTeamStats,
        awayTeamStats: awayTeamStats
      });

    } else if (this.awayScore > this.homeScore) {
      const alert = this.alertCtrl.create({
        title: 'Winner!!!',
        subTitle: 'The winner for this match was ' + this.awayTeam,
        buttons: ['OK']
      });
      alert.present();
      let homeTeamStats = new Match(this.homeTeam, this.homeScore, this.homeTries, this.homeConversion, this.homePenalties);
      let awayTeamStats = new Match(this.awayTeam, this.awayScore, this.awayTries, this.awayConversion, this.awayPenalties);
      this.navCtrl.push(SetmatchPage, {
        victor: this.awayTeam,
        homeTeamStats: homeTeamStats,
        awayTeamStats: awayTeamStats
      });
    } else if (this.awayScore == this.homeScore) {
      const alert = this.alertCtrl.create({
        title: 'Draw',
        subTitle: 'Unfortunately for this match we dont have a victor!!!',
        buttons: ['OK']
      });
      alert.present();

      let homeTeamStats = new Match(this.awayTeam, this.homeScore, this.homeTries, this.homeConversion, this.homePenalties);
      let awayTeamStats = new Match(this.awayTeam, this.awayScore, this.awayTries, this.awayConversion, this.awayPenalties);
      this.navCtrl.push(SetmatchPage, {
        victor: 'none',
        homeTeamStats: homeTeamStats,
        awayTeamStats: awayTeamStats
      });
    }
  }
}
