import { Component } from '@angular/core';
import { IMember, Member } from 'src/app/models/member.model';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-main',
  styleUrls: ['main.component.css'],
  templateUrl: './main.component.html',
})
export class MainComponent {
  public member: Member | null = null;
  public isAdmin: boolean = false;

  constructor(private session: SessionService) {
    const user = session.get<IMember>(SessionKeys.USER);

    if (user !== null) {
      this.member = new Member(user);
      this.isAdmin = this.member.admin;
    }
  }

}