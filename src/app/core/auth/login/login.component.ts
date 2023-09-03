import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
})

export class LoginComponent implements OnInit {
  public form: FormGroup;

  public toasterconfig: ToasterConfig = TOASTER_CONFIG;

  public loader: boolean = false;

  public urlRedirect: string = null;

  constructor(
    public settings: SettingsService,
    private fb: FormBuilder,
    private service: LoginService,
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  submitForm($ev) {
    $ev.preventDefault();

    this.helper.markAsDirty(this.form);
    if (this.form.valid) {
      this.login();
    } else {
      this.toasterService.pop(
        'error',
        null,
        'Verifique os campos obrigatórios.'
      );
    }
  }

  async login() {
    const lookup = await this.helper.getIpLookup();
    this.form.controls.lookup.setValue(lookup);
    this.form.updateValueAndValidity();

    this.loader = true;
    this.service
      .login(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          const menu = this.service.currentUserValue.menu || [];
          this.menuService.addMenu(menu);
          if (this.urlRedirect) {
            window.open(this.urlRedirect, '_self');
          } else {
            this.router.navigate(['/home']);
          }
        },
        (msg) => {
          this.toasterService.pop('error', null, msg);
          this.loader = false;
        }
      );
  }

  validations() {
    return {
      username: Validators.required,
    };
  }

  setForms() {
    this.form = this.fb.group(new Login());
    this.helper.setValidations(this.form, this.validations());
  }

  ngOnInit() {
    const url: string = decodeURIComponent(
      this.activatedRoute.snapshot.queryParams.url
    );
    if (url !== undefined && url !== 'undefined') this.urlRedirect = url;
    this.setForms();
  }
}
