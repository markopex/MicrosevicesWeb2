import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-deliverers-list',
  templateUrl: './deliverers-list.component.html',
  styleUrls: ['./deliverers-list.component.scss']
})
export class DeliverersListComponent implements OnInit {

  isLoading = true;
  deliverers: User[]

  constructor(private userService: UserService) { 
    this.userService.getDeliverers().subscribe(
      data =>{
        this.deliverers = data;
        this.isLoading = false;
      }
    )
  }

  ngOnInit(): void {
  }

}
