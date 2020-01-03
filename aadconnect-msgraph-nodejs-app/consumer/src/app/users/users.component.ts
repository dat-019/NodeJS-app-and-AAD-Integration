import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: any = [];
  constructor(private alertsService: AlertsService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(u => this.users = u.value);
  }

}
