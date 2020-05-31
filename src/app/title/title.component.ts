import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TitleService} from './title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  login = '';
  password = '';
  typeUser = 'student';


  constructor(private router: Router, private titleService: TitleService) {
  }

  ngOnInit(): void {

  }

  clkButSingIn() {
    // check data and go to user page
    if (this.login === '' || this.password === '') {
      alert('Fill all fields');
    } else {
      this.titleService.login(this.login, this.password, this.typeUser).subscribe(isRegistered => {
        if (isRegistered) {
          this.router.navigate([this.typeUser]); // user type equals url
        } else {
          alert('User not found :(\nCheck data and try again or click button Sing up');
          this.router.navigate(['title']);
        }
      });
    }
  }

  clkButSingUp() {
    // go to register page
    this.router.navigate(['register']);
  }
}
