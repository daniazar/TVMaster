import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { AuthService } from '../../core/auth.service';
import Channel from '../../entities/Channel';
import { ChannelService } from '../../services/channel/channel.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  login = true;
  constructor(private channelService: ChannelService,
    private reportService: ReportService,
    private auth: AuthService,
    public snackBar: MatSnackBar

  ) { }
  sub: Subscription;
  channel: Channel;
  ngOnInit() {
    this.login = true;
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
        console.log(channel);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reportChannel(channel: Channel) {
    if (this.auth.authenticated) {
      this.login = true;
      this.reportService.createReport(channel, this.auth.currentUser.email);
      const snackBarRef = this.snackBar.open('Channel Reported');

    } else {
      this.login = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openShows(channel: Channel) {
    console.log(channel.shows);
    window.open(channel.shows);
  }
}
