import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {StudentPageService} from '../student-page/student-page.service';
import {TitleService} from './title.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  login = 'ad4';
  password = 'pass ad4';
  typeUser = 'student';


  constructor(private router: Router, private titleService: TitleService) {
  }

  ngOnInit(): void {

  }

  clkButSingIn() {
    // check data and go to user page
    if (this.login === ''|| this.password==='')
    {
      alert('Fill all fields');
    }
    else
    {
      this.titleService.login(this.login, this.password, this.typeUser).subscribe(isRegistered => {
        console.log(isRegistered);
        if (isRegistered)
        {
          console.log(this.typeUser);
          this.router.navigate([this.typeUser]); // user type equals url
        }
        else
        {
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
