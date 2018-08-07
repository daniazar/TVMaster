import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import Channel from '../../entities/Channel';
import { Observable} from 'rxjs';
import {ChannelService} from '../../services/channel/channel.service';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {
  channels : Observable<Channel[]>;
  constructor(private bottomSheet: MatBottomSheet,
    private channelService : ChannelService 
) {}
 
    openBottomSheet(): void {
      console.log(this.channels);
      this.bottomSheet.open(ChannelSheet, {
        data: this.channels
      });
    }
    ngOnInit() {
      this.loadChannels();

    }

    loadChannels() {
      this.channels = this.channelService.getChannelList();
    }
  }
  
  @Component({
    selector: 'channels-bottom-sheet',
    templateUrl: 'channels-bottom-sheet.html',
    styleUrls: ['./channels-bottom-sheet.scss']

  })
  export class ChannelSheet {
    constructor (private bottomSheetRef: MatBottomSheetRef<ChannelSheet>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,     private channelService : ChannelService 
  ) {
      this.channels = data;
    }
    channels : Channel[];
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }

    setChannel(channel: Channel){
      this.channelService.setChannel(channel);
      this.bottomSheetRef.dismiss();
    }
  }
