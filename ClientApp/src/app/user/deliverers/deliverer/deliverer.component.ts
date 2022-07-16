import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-deliverer',
  templateUrl: './deliverer.component.html',
  styleUrls: ['./deliverer.component.scss'],
  providers: [MessageService]
})
export class DelivererComponent implements OnInit {

  @Input() set userDeliverer(user: User){
    this.deliverer = user;
    this.userService.downloadImage(user.email).subscribe(
      data => {
        if(data.type == HttpEventType.Response){
          const downloadedFile = new Blob([data!.body!], { type: data!.body!.type });
          let objectURL = URL.createObjectURL(downloadedFile);       
          this.profileImageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      }
    )
  }
  deliverer: User;
  isLoadingApprove = false;
  isLoadingDeny = false;
  profileImageSrc: any = "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

  constructor(private userService: UserService, private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  approve(){
    this.isLoadingApprove = true;
    this.userService.approveDeliverer(this.deliverer.email).subscribe(
      data => {
        this.deliverer.delivererStatus = 2;
        this.isLoadingApprove = false;
      },
      error => {
        this.isLoadingApprove = false;
      }
    )
  }

  deny(){
    this.isLoadingDeny = true;
    this.userService.denyDeliverer(this.deliverer.email).subscribe(
      data => {
        this.deliverer.delivererStatus = 3;
        this.isLoadingDeny = false;
      },
      error => {
        
        this.isLoadingDeny = false;
      }
    )
  }

}
