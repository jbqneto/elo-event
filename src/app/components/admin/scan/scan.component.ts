import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Html5QrcodeScanner } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { EventMember, IMember, Member } from 'src/app/models/member.model';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {
  private scanner: Html5QrcodeScanner | null = null;

  public constructor(private session: SessionService, private router: Router) {}

  public onScanSuccess(decodedText: string, decodedResult: any) {
    if (decodedText.indexOf('member:') > -1) {
      const split = decodedText.split(':');
      console.log(decodedText, split);
      this.confirmUser(parseInt(split[1]));  
    } else {
      window.alert('QR Code inválido.');
    }  
  }

  public onScanFailure(error: any) {
    console.log(error);
  }

  private confirmUser(id: number) {
    const members = this.session.get<EventMember[]>(SessionKeys.MEMBERS) ?? [];
    const member = (members ?? []).find((mem) => mem.id === id);

    if (member) {
      member.checked = true;
    } else {
      console.log('NOT FOUND: ' + id);
    }

    this.session.put(SessionKeys.MEMBERS, members);
    this.scanner?.pause();
    this.scanner?.clear();
    setTimeout(() => {
      window.alert('Usuário confirmado: ' + member?.name);
      this.router.navigate(['main/admin/members']);
    }, 500);
  }

  public ngOnInit(): void {
    this.scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: {width: 250, height: 250} }, false);

      this.scanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
  }

  public ngOnDestroy(): void {
      if (this.scanner !== null) {
        this.scanner.clear();
        this.scanner = null;
      }
  }
}
