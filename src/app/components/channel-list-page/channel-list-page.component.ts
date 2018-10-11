import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Channel from '../../entities/Channel';
import { ChannelService } from '../../services/channel/channel.service';

@Component({
  selector: 'app-channel-list-page',
  templateUrl: './channel-list-page.component.html',
  styleUrls: ['./channel-list-page.component.scss']
})
export class ChannelListPageComponent implements OnInit {

  constructor(private channelService: ChannelService) { }
  channels: Observable<Channel[]>;


  ngOnInit() {
    this.loadChannels();

  }

  loadChannels() {
    this.channels = this.channelService.getChannelList();
  }
  setChannel(channel: Channel) {
    this.channelService.setChannel(channel);
  }
}
