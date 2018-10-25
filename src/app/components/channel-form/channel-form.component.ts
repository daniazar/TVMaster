import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Channel, { ChannelOptions } from '../../entities/Channel';
import { ChannelService } from '../../services/channel/channel.service';

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.scss']
})
export class ChannelFormComponent implements OnInit, OnDestroy {

  channelFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  channelOptions: ChannelOptions = new ChannelOptions();
  sub: Subscription;
  sub2: Subscription;

  channel: Channel;
  name: string;
  loading = false;
  success = false;

  ngOnInit() {
    this.channel = new Channel();
    this.route.params.subscribe(params => {
      this.name = params['channel'];
      this.channelService.setChannelByName(this.name);

    });
    const aux = this.channelService.getChannelList().subscribe(
      par => {
        this.channelService.setChannelByName(this.name);
        // aux.unsubscribe();
      }

    );

    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
        if (!channel) {
          this.channel = new Channel();
        }
        // channel.originalUrl.push('');
        this.channelFormGroup = this.formBuilder.group({
          'country': this.channel.country,
          'name': this.channel.name,
          'id': this.channel.id,
          'logo': this.channel.logo,
          'desc': this.channel.desc,
          'originalUrl': this.formBuilder.array(this.createItem()),
          'shows': this.channel.shows,
          'category': this.channel.category,
          'lang': this.channel.lang,
        });
        this.channelFormGroup.value.originaUrl.setValue(this.channel.originalUrl);
        console.log('channel: ');
        console.log(this.channel);
        console.log('channelFormGroup: ');
        console.log(this.channelFormGroup);
      });
  }
  createItem(): any {
    return {
      uri: ''
    };
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  async submitHandler() {
    this.loading = true;
    const formValue = this.channelFormGroup.value;
    console.log('submit');
    try {
      await this.channelService.createChannel(formValue);
      this.success = true;
      this.channel = new Channel();
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  deleteUrl(index) {
    this.channelFormGroup.value.originalUrl.splice(index, 1);
  }
  addUrl(index) {
    this.channelFormGroup.value.originalUrl.push({ uri: '' });
  }
}
