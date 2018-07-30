import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import Channel from '../../entities/Channel';
import { Subscription } from '../../../../node_modules/rxjs';
import { ChannelService } from '../../services/channel/channel.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.scss']
})
export class ChannelFormComponent implements OnInit {

    channelFormGroup :FormGroup;

  constructor(private formBuilder : FormBuilder
  ,    private route: ActivatedRoute,
  private channelService : ChannelService
) { }

  sub : Subscription;
  sub2 : Subscription;

  channel : Channel;
  name: string;
  loading = false;
  success = false;

  ngOnInit() {
    this.sub = this.channelService.getChannel().subscribe(
      channel => {
        this.channel = channel;
        if(!channel){
          this.channel = new Channel()
        }
        this.channelFormGroup = this.formBuilder.group(this.channel);

      });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

  async submitHandler(){
    this.loading = true;
    const formValue = this.channelFormGroup.value;
    console.log("submit");
    try {
      await this.channelService.createChannel(formValue);
      this.success=true;
      
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }
}