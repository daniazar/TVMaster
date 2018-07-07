import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import Channel from '../../entities/Channel';
import { Observable} from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {
  channels : Channel[];
  constructor(private bottomSheet: MatBottomSheet,
      private afStorage: AngularFireStorage,
      private afs: AngularFirestore) {}
 
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
      this.channelCollection = this.afs.collection<Channel>('channels', ref => ref.orderBy('name', 'desc'));
      this.channels = this.channelCollection.valueChanges();
    }
  }
  
  @Component({
    selector: 'channels-bottom-sheet',
    templateUrl: 'channels-bottom-sheet.html',
  })
  export class ChannelSheet {
    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
      this.channels = data;
    }
    channels : Channel[];
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }
  


}
