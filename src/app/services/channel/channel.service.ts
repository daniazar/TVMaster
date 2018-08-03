import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import Channel from '../../entities/Channel';
import { unwatchFile } from 'fs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels : Observable<Channel[]>;
  private sub : Subscription;
  private channelSubject = new BehaviorSubject<Channel>(null);
  currChannel : Channel[];
  private channelCollection: AngularFirestoreCollection<Channel>;
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer) {}
  private channelsSubject = new BehaviorSubject<Channel[]>(null);
    
  loadChannels() {
    console.log("loading channels ");
    this.channelCollection = this.afs.collection<Channel>('channels', ref => ref.orderBy('name', 'desc'));
    this.channels = this.channelCollection.valueChanges();


    
    this.sub = this.channels.subscribe(
      channels => {
        this.currChannel =channels;
        console.log(this.currChannel);
        this.sendChannelList(channels)
        this.sub.unsubscribe();
      }
    );

  }

  sendChannelList(message: Channel[]) {
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
  setChannelByName(name : string){
    if(this.currChannel){
      let chan =this.currChannel.find(
        element => name === (element.name)
      );
      this.setChannel(chan);
  
    }
  }
  setChannel(channel :Channel) {
    if(! channel){
      return ;
    }
    if(! (channel.url instanceof Object)){
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

createChannel( channel :Channel){
  if( ! channel.id){
    channel.id = this.afs.createId();
  }
    channel.url = channel.originalUrl;
  return this.afs.collection('channels').doc(channel.id).set(channel);
  
  }
}
