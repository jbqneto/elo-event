import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMember } from 'src/app/models/member.model';
import { QRCoder } from 'src/app/services/qr-code/qr-code.service';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit, AfterViewInit {
  public user: IMember | null = null;

  constructor(private session: SessionService) {}

  public ngOnInit(): void {
      this.user = this.session.get(SessionKeys.USER) ?? null;
  }

  public ngAfterViewInit(): void {
    console.log(this.user);
    QRCoder.generate('qr-code', {
      content: `member:${this.user?.id}`,
      height: 128,
      width: 128,
    })
  }


}
