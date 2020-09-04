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

  alertPrompt(id) {
    this.db.getCredential(4).subscribe(crds => {
      this.crd = crds
      console.log(this.crd,id)
      this.createPrompt(0)
    })
  }

  async createPrompt(index){
    const alert = await this.alertController.create({
      header: 'Credential 1',
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
