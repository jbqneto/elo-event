import { Component, OnInit } from '@angular/core';
import { EventMember, IMember } from 'src/app/models/member.model';
import { AppService } from 'src/app/services/app/app.service';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  public guests: EventMember[] = [];

  public constructor(private session: SessionService, private service: AppService) {
    
  }

  public async ngOnInit(): Promise<void> {
    const eventList = this.session.get<EventMember[]>(SessionKeys.MEMBERS);

    if (eventList === null) {
      this.guests = (await this.service.getMembers()).map((member) => ({
        id: member.id,
        admin: member.admin,
        name: member.name,
        phone: member.phone,
        checked: false,
        confirmed: null,
      }));

      this.session.put(SessionKeys.MEMBERS, this.guests);
    } else {
      this.guests = eventList;
    }
  }

}
