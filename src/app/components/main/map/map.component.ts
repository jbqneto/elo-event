import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  public mapUrl: string = 'https://www.google.com/maps/@-7.275722,-34.895194,16z?hl=pt-BR'

  public constructor(private sanitizer: DomSanitizer) {}

  public get safeMapUrl(): SafeUrl {

    return this.sanitizer.bypassSecurityTrustUrl(this.mapUrl);
  }

}
