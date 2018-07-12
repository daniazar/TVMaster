import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import Channel from '../../entities/Channel';
import { unwatchFile } from 'fs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels : Observable<Channel[]>;
  private sub : Subscription;
  private channelSubject = new BehaviorSubject<Channel>(new Channel);

  private channelCollection: AngularFirestoreCollection<Channel>;
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer) {}
  private channelsSubject = new BehaviorSubject<Channel[]>([]);

  loadChannels() {
    console.log("loading channels ");
    this.channelCollection = this.afs.collection<Channel>('channels', ref => ref.orderBy('name', 'desc'));
    this.channels = this.channelCollection.valueChanges();
    this.sub = this.channels.subscribe(
      channels => {
        this.sendChannelList(channels)
        this.sub.unsubscribe();
      }
    );

  }

  sendChannelList(message: Channel[]) {
    console.log("channel list: " + message);

      this.channelsSubject.next( message );
  }

  clearChannelList() {
      this.channelsSubject.next([]);
  }

  getChannelList(): Observable<Channel[]> {
      return this.channelsSubject.asObservable();
      //return this.channels;
  }
  getChannel() : Observable<Channel> {
    return this.channelSubject.asObservable();
  }
  setChannel(channel :Channel) {
    console.log(channel);
    if(! (channel.url instanceof Object){
      if( channel.url.includes('youtube')){
        channel.url = 'https://www.youtube.com/embed/' +this.youtube_parser(channel.url);
      }
    channel.url = this.sanitizer.bypassSecurityTrustResourceUrl(channel.url);
  }
    this.channelSubject.next(channel);
  }

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
}
