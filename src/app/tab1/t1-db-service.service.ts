import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { SqlService } from '../Sql/sql.service'

export interface Alias {
  id: number,
  alias: string,
}

export interface Creds {
  id: number,
  userName: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class T1DbServiceService {

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient, private sqlService: SqlService ) {  }

  async exp() {
    await this.sqlService.executeSql("CREATE TABLE IF NOT EXISTS Alias(id INTEGER PRIMARY KEY AUTOINCREMENT,alias TEXT NOT NULL,type TEXT NOT NULL);", [])
        .then(() => {this.dbReady.next(true)
      })
  }

  getDatabaseState() {
    this.exp()
    return this.dbReady.asObservable();
  }

  getAlias(): Observable<Alias[]> {
    let alias = new BehaviorSubject([])
    this.sqlService.executeSql('SELECT * FROM Alias WHERE type = "Account"', []).then(data => {
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

  getCredential(id): Observable<Creds[]>{
    let creds = new BehaviorSubject([])
    this.sqlService.executeSql("SELECT * FROM OnlineAccount WHERE id = ?",[id]).then(data => {
      let crd: Creds [] = []
      console.log(data)
      if(data.rows.length > 0){
        crd.push({
          id: data.rows.item(0).id,
          userName: data.rows.item(0).username,
          password: data.rows.item(0).password
        })
      }
      creds.next(crd)
    })
    return creds.asObservable()
  }

  deleteAlias(id){
    return this.sqlService.executeSql('DELETE FROM Alias WHERE id = ?', [id])
  }

  addAlias(insertAlias, insertType){
    return this.sqlService.executeSql("CREATE TABLE IF NOT EXISTS OnlineAccount(account_id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL,password TEXT NOT NULL,id INTEGER, FOREIGN KEY (id) REFERENCES Alias (id)  ON UPDATE CASCADE ON DELETE CASCADE);", [])
    .then(() => {
      this.sqlService.executeSql("INSERT INTO Alias(alias, type) VALUES (?,?);",[insertAlias,insertType])
    })
  }

  addAccount(insertUserName, insertPassword){
    return this.sqlService.executeSql('SELECT * FROM Alias', [])
      .then((data: any) => {
        let flag: number
        if (data.rows.length == 0){
          flag = 0
          console.log("here")
        }
        else{
          flag = data.rows.length - 1
        }
        let id = data.rows.item(flag).id
        this.sqlService.executeSql("INSERT INTO OnlineAccount(username, password, id) VALUES (?,?,?);",[insertUserName, insertPassword, id])
      })
  }

}