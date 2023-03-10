import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMember, Member } from 'src/app/models/member.model';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: string = '';

  private member: Member | null = null;

  public constructor(private session: SessionService, private router: Router) {
    try {
      const dbUser = session.get<IMember>(SessionKeys.USER);

      if (dbUser === null)
        throw new Error('User not found on session');

      this.member = new Member(dbUser);
      this.user = this.member?.getFirstName() ?? '';  
    } catch (error) {
      console.log(error);
      this.session.remove(SessionKeys.USER);
      this.gotoLogin();
    }
  }

  public ngOnInit(): void {
    if (this.router.url === '/main/logout') {
      this.session.clear();
      this.gotoLogin(100); 
    }
  }

  private gotoLogin(timeout = 500) {
    setTimeout(() => {
      this.router.navigate(['/login']);  
    }, timeout);
  }
}
