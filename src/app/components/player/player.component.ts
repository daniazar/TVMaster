import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChannelService} from '../../services/channel/channel.service';
import Channel from '../../entities/Channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor( private channelService : ChannelService) { }
  sub : Subscription;
  channel : Channel;
  ngOnInit() {
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
      }
    );
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
