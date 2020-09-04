import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { T2DbServiceService, Alias } from '../tab2/t2-db-service.service';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  aliases: Alias[] = []

  constructor(private formBuilder: FormBuilder, private db: T2DbServiceService, 
    private router: Router, private toast: ToastController,
    private nc: NavController, private plt: Platform) { 
      this.plt.backButton.subscribeWithPriority(10, () => {
        nc.navigateRoot(['./tabs/tab2'])
      })
    }

  addCardForm = this.formBuilder.group({
    alias: ['', [Validators.required, Validators.maxLength(20)]],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    cvvNumber: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    pinNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  });

  get alias(){
    return this.addCardForm.get('alias');
  }

  get cardNumber(){
    return this.addCardForm.get('cardNumber');
  }

  get cvvNumber(){
    return this.addCardForm.get('cvvNumber');
  }

  get pinNumber(){
    return this.addCardForm.get('pinNumber');
  }

  addCard(){
    let type = "Card"
    this.db.addAlias(this.addCardForm.value.alias, type)
    this.db.addCard(this.addCardForm.value.cardNumber, this.addCardForm.value.cvvNumber, this.addCardForm.value.pinNumber)
    .then(async () => {
      console.log("Add Account Page: "+this.addCardForm.value.cardNumber, this.addCardForm.value.cvvNumber, this.addCardForm.value.pinNumber)
      let toast = await this.toast.create({
        message: 'Card Added',
        duration: 2500
      });
      toast.present().then(() => {
        this.nc.navigateRoot(['./tabs/tab2'])
      })
    })
  }

  public errorMessage = {

    alias: [
      { type: 'required', message: "Alias is required" },
      { type: 'maxlength', message: "Alias can't be longer than 20 characters" }
    ],

    cardNumber: [
      { type: 'required', message: "Card number is required" },
      { type: 'pattern', message: "Card number must be all numbers & 16 digits long" }
    ],

    cvvNumber: [
      { type: 'required', message: "CVV number is required" },
      { type: 'pattern', message: "CVV number must be all numbers & 3 digits long" }
    ],

    pinNumber: [
      { type: 'required', message: "Pin number is required" },
      { type: 'pattern', message: "Pin number must be all numbers & 4 digits long" }
    ]
  }

  public submit() {
    console.log(this.addCardForm.value);
  }

  ngOnInit() {
  }

}
