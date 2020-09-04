import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { T1DbServiceService, Alias } from '../tab1/t1-db-service.service';
import { Router } from '@angular/router';
import { ToastController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  aliases: Alias[] = []

  constructor(private formBuilder: FormBuilder, private db: T1DbServiceService, 
    private router: Router, private toast: ToastController,
    private plt: Platform, private nc: NavController) {
      this.plt.backButton.subscribeWithPriority(10, () => {
        nc.navigateRoot(['./tabs/tab1'])
      })
     }

  addAccountForm = this.formBuilder.group({
    alias: ['', [Validators.required, Validators.maxLength(20)]],
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-@]*$'), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
  });

  get alias(){
    return this.addAccountForm.get('alias');
  }

  get userName(){
    return this.addAccountForm.get('userName');
  }

  get password(){
    return this.addAccountForm.get('password');
  }

  addAccount(){
    let type = "Account"
    this.db.addAlias(this.addAccountForm.value.alias, type)
    .then(() => {
      this.db.addAccount(this.addAccountForm.value.userName, this.addAccountForm.value.password)
      .then(async () => {
        console.log("Add Account Page: "+this.addAccountForm.value.userName, this.addAccountForm.value.password)
        let toast = await this.toast.create({
          message: 'Credential Added',
          duration: 2500
        });
        toast.present()
        this.nc.navigateRoot(['./tabs/tab1'])
      })
    })
  }

  public errorMessage = {

    alias: [
      { type: 'required', message: "Alias is required" },
      { type: 'maxlength', message: "Alias can't be longer than 20 characters" }
    ],

    userName: [
      { type: 'required', message: "Username is required" },
      { type: 'maxlength', message: "Username / Email can't be longer than 50 characters" },
      { type: 'pattern', message: "Username / Email can't have white space" }
    ],

    password: [
      { type: 'required', message: "Password is required" },
      { type: 'maxlength', message: "Password can't be longer than 20 characters" }
    ]

  }

  public submit() {
    console.log("Submit()"+this.addAccountForm.value);
  }

  ngOnInit() {
  }

}
