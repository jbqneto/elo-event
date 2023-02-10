import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app/app.service';
import { SessionKeys, SessionService } from 'src/app/services/session/sesssion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup<any>;
  public error: string = '';

  public constructor(fb: FormBuilder, private router: Router, private appService: AppService, private session: SessionService) {
    this.form = new FormGroup({
      username: fb.control(''),
      phone: fb.control('')
    });
  }

  public ngOnInit(): void {
      const user = this.session.get(SessionKeys.USER);
      console.log(user);
      if (user) {
        this.navigate();
      }
  }

  public async submit() {

    const value = this.form.getRawValue();
    
    this.form.disable();

    const user = await this.appService.login(value.username, value.phone);

    if (user) {
      this.session.put(SessionKeys.USER, user);
      this.navigate();
    } else {
      this.error = 'Combinação de primeiro nome e telefone não encontrados.';
      this.form.enable();
      setTimeout(() => {
        this.error = '';
      }, 8_000);
    }
  }

  private navigate(): void {
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 100);
  }

}
