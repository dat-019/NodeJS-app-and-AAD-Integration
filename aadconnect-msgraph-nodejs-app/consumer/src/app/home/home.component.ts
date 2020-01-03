import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Is a user logged in?
  authenticated: boolean;
  // The user
  user: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.authenticated = false;
    this.user = {};
    this.dataService.isAuthenticated().subscribe(isAuthenticated => this.authenticated = isAuthenticated);

    // get current user
    this.dataService.getCurrentUser().subscribe(currentUser => this.user = currentUser);
  }

  signIn(): void {
    this.router.navigate(['/signin']);
  }

}
