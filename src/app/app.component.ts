import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'pwa-elo-event';
  
  public isOnline: boolean;

  private sheetId = '1jjoiPxnaH4omgNFs8GbmOTzXfBM9R_oj5flsVEFrq3s'; 
  private baseUrl = `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz`;

  public constructor() {
    this.isOnline = false;
  }

  public ngOnInit(): void {
    this.updateOnlineStatus();


    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    this.getSheetDate();
  }

  private getSheetDate(): any {
    const sheet = 'all_users';
    const query = encodeURIComponent('Select *');
    const url = `${this.baseUrl}/tq?&sheet=${sheet}&tq=${ query}`;

    axios.get(url).then((response) => {
      const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));

      console.log(jsonData);
    });
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
  }
}
