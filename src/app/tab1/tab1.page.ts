import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { T1DbServiceService, Creds, Alias } from './t1-db-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{

  aliases: Alias[] = [];
  crd: Creds[] = [];

  alias = {};

  constructor(private router: Router, public alertController: AlertController, 
    private db: T1DbServiceService, private toast: ToastController,
    private nc: NavController) {}

  ngOnInit(){
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getAlias()
      }
    });
  }

  ionViewWillEnter(){
    this.getAlias()
  }

  getAlias(){
    this.db.getAlias().subscribe(als => {
      this.aliases = als
    })
  }

  deleteAlias(id){
    this.db.deleteAlias(id)
    .then(_ => {
      this.db.getAlias().subscribe(async (dals) => {
        let toast = await this.toast.create({
          message: 'Credentials deleted',
          duration: 2500
        });
        this.aliases = dals
        toast.present();
      });
    });  
  }

  addCred(){
    this.nc.navigateRoot(['add-account']);
  }

  alertPrompt(id, alias) {
    this.db.getCredential(id).subscribe(crds => {
      this.crd = crds
      this.createPrompt(0, alias)
    })
  }

  async createPrompt(index, alias){
    const alert = await this.alertController.create({
      header: alias,
      animated: true,
      inputs: [
        {
        name: 'User Name',
          type: 'text',
          value: this.crd[index].userName
        },
        {
          name: 'Username / Email',
          type: 'text',
          value: this.crd[index].password
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
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
