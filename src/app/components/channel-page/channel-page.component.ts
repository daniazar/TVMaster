import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel/channel.service';
import { Subscription } from '../../../../node_modules/rxjs';
import Channel from '../../entities/Channel';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {

  constructor(
    private channelService : ChannelService,
    private route: ActivatedRoute 

  ) { }
  sub : Subscription;
  sub2 : Subscription;

  channel : Channel;
  name: string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['channel'];

  });
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
        if(!channel){
          this.channelService.getChannelList().subscribe(
            par=>
            this.channelService.setChannelByName(this.name)

          );
        }
      }
    );
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }
 

}
