import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthRequest} from '../../models/auth-request';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  private password2: string;
  user: User = new User();
  authRequest: AuthRequest;

  form = new FormGroup({
    username: new FormControl('', Validators.minLength(3)),
    email: new FormControl('' ),
    password: new FormControl('', Validators.minLength(2)),
    password2: new FormControl('', Validators.minLength(2))
  });

  signForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    password2: ['']
  });
  signInError: boolean;
  errorMessage: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.authRequest = new AuthRequest();
  }

  onSubmit(form: FormGroup){
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.user.username = this.signForm.get('username')?.value;
    this.user.email = this.signForm.get('email')?.value;
    this.user.password = this.signForm.get('password')?.value;
    this.password2 = this.signForm.get('password2')?.value;
    if (form.get('password').value !== form.get('password2').value){
      this.signInError = true;
      this.errorMessage = 'Passwords must be identical';
      console.error('Les passwords sont différents');
      return;
    }
    this.userService.register(this.user).subscribe(
        (user: User) => {
          console.log('Utilisateur enregistré:', user);
          this.authRequest.username = user.username;
          this.authRequest.password = user.password;
          this.router.navigateByUrl("/login");
        },
        (resp)  => this.processError(resp)
    );

  }

  private processError(error: any) {
      console.log('erreur: ', error.status);
      if (error.status === 422) {
        console.error(error.status + ' ' + error.error.message);
        this.errorMessage = error.error.message;
    } else {
      console.error('other reason');
    }
  }



}