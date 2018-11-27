import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Channel from '../../entities/Channel';
import { ChannelService } from '../../services/channel/channel.service';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit, OnDestroy {

  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute

  ) { }
  sub: Subscription;
  sub2: Subscription;

  channel: Channel;
  name: string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['channel'];

    });
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
        if (!channel) {
          this.channelService.getChannelList().subscribe(
            par =>
              this.channelService.setChannelByName(this.name)

          );
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }


}
