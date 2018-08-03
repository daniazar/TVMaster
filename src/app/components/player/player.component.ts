import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChannelService} from '../../services/channel/channel.service';
import Channel from '../../entities/Channel';
import { Subscription } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../core/auth.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  login : boolean = true;
  constructor( private channelService : ChannelService,
    private reportService : ReportService,
    private auth : AuthService,
    public snackBar: MatSnackBar

  ) { }
  sub : Subscription;
  channel : Channel;
  ngOnInit() {
    this.login = true;
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
      }
    );
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  reportChannel(channel : Channel){
    if( this.auth.authenticated){
      this.login = true;
      this.reportService.createReport(channel, this.auth.currentUser.email)
      let snackBarRef = this.snackBar.open('Channel Reported');

    }else{
      this.login = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openShows(channel : Channel){
    console.log(channel.shows);
    window.open(channel.shows);
  }
}
