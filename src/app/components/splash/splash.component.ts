import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements AfterViewInit {

  public constructor(private router: Router) {
    
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.goNext();
    }, 2_000);
  }

  public goNext(): void {
    this.router.navigate(['login']);
  }

}
