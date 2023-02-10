import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private mapUrl: string ='https://goo.gl/maps/LJt7VrVYenuYHcpN8';

  public constructor(private sanitizer: DomSanitizer) {}

  public get safeMapUrl(): SafeUrl {

    return this.sanitizer.bypassSecurityTrustUrl(this.mapUrl);
  }

}
