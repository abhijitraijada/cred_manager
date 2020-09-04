import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { SqlService } from '../Sql/sql.service'

export interface Alias {
  id: number,
  alias: string,
}

export interface Card {
  id: number,
  cardNumber: number,
  cvvNumber: number,
  pinNumber: number
}

@Injectable({
  providedIn: 'root'
})

export class T2DbServiceService {

  private database: SQLiteObject
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // alias = new BehaviorSubject([])
  // card = new BehaviorSubject([])

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private toast: ToastController, private http: HttpClient ) { 
    console.log("DB Service Constructor")
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'CredMngr.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS Alias(id INTEGER PRIMARY KEY AUTOINCREMENT,alias TEXT NOT NULL,type TEXT NOT NULL);", [])
        // .then(() => {db.executeSql("INSERT or IGNORE INTO Alias(alias, type) VALUES ('Just Test', 'Card');", [])
        .then(() => {this.dbReady.next(true)
        });
      // });
      });
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getAlias(): Observable<Alias[]> {
    let alias = new BehaviorSubject([])
    this.database.executeSql('SELECT * FROM Alias WHERE type = "Card"', []).then(data => {
      let list: Alias[] = []
      if(data.rows.length > 0){
        for (var i=0; i < data.rows.length; i++){
          list.push({
            id: data.rows.item(i).id,
            alias: data.rows.item(i).alias
          });
        }
      }
      alias.next(list)
    });
    return alias.asObservable()
  }

  getCard(id): Observable<Card[]>{
    let card = new BehaviorSubject([])
    this.database.executeSql("SELECT * FROM CreditOrDebitCard WHERE id = ?",[id]).then(data => {
      let crd: Card [] = []
      console.log(data)
      if(data.rows.length > 0){
        crd.push({
          id: data.rows.item(0).id,
          cardNumber: data.rows.item(0).cardNumber,
          cvvNumber: data.rows.item(0).cvvNumber,
          pinNumber: data.rows.item(0).pinNumber
        })
      }
      card.next(crd)
    })
    return card.asObservable()
  }
  
  deleteAlias(id){
    return this.database.executeSql('DELETE FROM Alias WHERE id = ?', [id])
  }
  
  addAlias(insertAlias, insertType){
    return this.database.executeSql("CREATE TABLE IF NOT EXISTS CreditOrDebitCard(card_id INTEGER PRIMARY KEY AUTOINCREMENT,cardNumber INTEGER NOT NULL,cvvNumber INTEGER NOT NULL,pinNumber INTEGER NOT NULL,id INTEGER, FOREIGN KEY (id) REFERENCES Alias (id)  ON UPDATE CASCADE ON DELETE CASCADE);", [])
    .then(() => {
      this.database.executeSql("INSERT or IGNORE INTO Alias(alias, type) VALUES (?,?);",[insertAlias,insertType])
    })
  }

  addCard(insertCardNumber, insertCvvNumber, insertPinNumber){
    return this.database.executeSql("SELECT * FROM Alias", [])
      .then((data: any) => {
        console.log(data)
        let flag = data.rows.length - 1
        let id = data.rows.item(flag).id
        this.database.executeSql("INSERT or IGNORE INTO CreditOrDebitCard(cardNumber, cvvNumber, pinNumber, id) VALUES (?,?,?,?);",[insertCardNumber, insertCvvNumber, insertPinNumber, id])
      })
  }
}

