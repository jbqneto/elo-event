import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'pwa-elo-event';
  
  public isOnline: boolean;

  public constructor() {
    this.isOnline = false;
  }

  public ngOnInit(): void {
    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }


  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
  }
}
