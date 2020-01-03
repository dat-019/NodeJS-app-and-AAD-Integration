import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  // Should the collapsed nav show?
  showNav: boolean;
  // Is a user logged in?
  authenticated: boolean;
  // The user
  user: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.showNav = false;
    this.authenticated = false;
    this.user = {};

    this.dataService.isAuthenticated().subscribe(isAuthenticated => this.authenticated = isAuthenticated);

    this.dataService.getCurrentUser().subscribe(currentUser => this.user = currentUser);
  }

  // Used by the Bootstrap navbar-toggler button to hide/show
  // the nav in a collapsed state
  toggleNavBar(): void {
    this.showNav = !this.showNav;
  }

  signIn(): void {
    this.router.navigate(['/signin']);
  }

  signOut(): void {
    // Temporary
    this.authenticated = false;
    this.user = {};
    this.router.navigate(['/signout']);
  }

}
