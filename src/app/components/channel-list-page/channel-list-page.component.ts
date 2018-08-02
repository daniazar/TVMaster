import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel/channel.service';
import { Observable } from '../../../../node_modules/rxjs';
import Channel from '../../entities/Channel';

@Component({
  selector: 'app-channel-list-page',
  templateUrl: './channel-list-page.component.html',
  styleUrls: ['./channel-list-page.component.scss']
})
export class ChannelListPageComponent implements OnInit {

  constructor(    private channelService : ChannelService ) { }
  channels : Observable<Channel[]>;
  

  ngOnInit() {
    this.loadChannels();

  }

  loadChannels() {
    this.channels = this.channelService.getChannelList();
  }
  setChannel(channel: Channel){
    this.channelService.setChannel(channel);
  }
}
