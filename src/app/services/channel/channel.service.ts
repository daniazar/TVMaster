import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import Channel from '../../entities/Channel';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels: Observable<Channel[]>;
  private sub: Subscription;
  private channelSubject = new BehaviorSubject<Channel>(null);
  currChannel: Channel[];
  private channelCollection: AngularFirestoreCollection<Channel>;
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer) { }
  private channelsSubject = new BehaviorSubject<Channel[]>(null);

  loadChannels() {
    console.log('loading channels ');
    this.channelCollection = this.afs.collection<Channel>('channels', ref => ref.orderBy('name', 'desc'));
    this.channels = this.channelCollection.valueChanges();



    this.sub = this.channels.subscribe(
      channels => {
        this.currChannel = channels;
        console.log(this.currChannel);
        this.sendChannelList(channels);
        this.sub.unsubscribe();
      }
    );

  }

  sendChannelList(message: Channel[]) {
    this.channelsSubject.next(message);
  }

  clearChannelList() {
    this.channelsSubject.next([]);
  }

  getChannelList(): Observable<Channel[]> {
    return this.channelsSubject.asObservable();
    // return this.channels;
  }
  getChannel(): Observable<Channel> {
    return this.channelSubject.asObservable();
  }
  setChannelByName(name: string) {
    if (this.currChannel) {
      const chan = this.currChannel.find(
        element => name === (element.name)
      );
      this.setChannel(chan);

    }
  }
  setChannel(channel: Channel) {
    if (!channel) {
      return;
    }
    if (typeof channel.originalUrl === 'string') {
      channel.originalUrl = [channel.originalUrl];
    }
    channel.urls = JSON.parse(JSON.stringify(channel.originalUrl));
    channel.urls = channel.urls.map(element => {
      if (element.includes && element.includes('youtube')) {
        element = 'https://www.youtube.com/embed/' + this.youtube_parser(element);
      }
      if (!element.changingThisBreaksApplicationSecurity) {
        return element = this.sanitizer.bypassSecurityTrustResourceUrl(element);
      }
    });
    console.log(channel);
    this.channelSubject.next(channel);
  }

  youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  createChannel(channel: Channel) {
    if (!channel.id) {
      channel.id = this.afs.createId();
    }
    channel.urls = channel.originalUrl;
    return this.afs.collection('channels').doc(channel.id).set(channel);

  }
}
