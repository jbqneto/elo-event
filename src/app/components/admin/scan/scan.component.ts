import { Component, OnDestroy, OnInit } from '@angular/core';

import { Html5QrcodeScanner } from 'html5-qrcode/esm/html5-qrcode-scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {
  private scanner: Html5QrcodeScanner | null = null;

  public onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    window.alert(JSON.stringify(decodedText));
  }

  public onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  public ngOnInit(): void {
    this.scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: {width: 250, height: 250} },
      /* verbose= */ false);
      this.scanner.render(this.onScanSuccess, this.onScanFailure);
  }

  public ngOnDestroy(): void {
      if (this.scanner !== null) {
        this.scanner.clear();
        this.scanner = null;
      }
  }
}
