import { Component, Input, OnInit } from '@angular/core';
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

  @Input()
  deliverer: User;
  isLoadingApprove = false;
  isLoadingDeny = false;

  constructor(private userService: UserService, private messageService: MessageService) { }

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
