import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { T2DbServiceService, Alias, Card } from './t2-db-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  aliases: Alias[] = []
  card: Card[] = []
  alias = {}

  constructor(private router: Router, public alertController: AlertController, 
    private db: T2DbServiceService, private toast: ToastController,
    private nc: NavController) {}

  ngOnInit(){
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getAlias()
      }
    });
  }

  ionViewWillEnter(){
    console.log("View Will Enter")
    this.getAlias()
  }

  ionViewDidEnter(){
    console.log("View Did Enter")
    this.nc.pop()
  }

  ionViewWillLeave(){
    console.log("View Will Leave")
  }

  getAlias(){
    this.db.getAlias().subscribe(als => {
      this.aliases = als;
    })
  }

  deleteAlias(id){
    this.db.deleteAlias(id)
    .then(_ => {
      this.db.getAlias().subscribe(async (dals) => {
        let toast = await this.toast.create({
          message: 'Card deleted',
          duration: 2500
        });
        this.aliases = dals
        toast.present()
      });
    });      
  }

  addCard(){
    this.nc.navigateRoot(['add-card']);
    // this.nc.pop()
  }

  alertPrompt(id,index) {
    this.db.getCard(id).subscribe(crds => {
      this.card = crds
      this.createPrompt(index)
    })
  }

  async createPrompt(index){
    const alert = await this.alertController.create({
      header: 'Credential 1',
      animated: true,
      inputs: [
        {
          name: 'Card Number',
          type: 'text',
          value: this.card[index].cardNumber
        },
        {
          name: 'CVV Number',
          type: 'text',
          value: this.card[index].cvvNumber
        },
        {
          name: 'Pin Number',
          type: 'text',
          value: this.card[index].pinNumber
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: () => {
            console.log('Update');
          }
        }
      ]
    });
  
    await alert.present();
  }

}
