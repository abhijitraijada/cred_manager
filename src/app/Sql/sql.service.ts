import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { browserDBInstance } from './browser';

declare var window: any;
const SQL_DB_NAME = 'CredMngr'


@Injectable({
  providedIn: 'root'
})

export class SqlService {

  private dbInstance: any;

  constructor(public sqlite: SQLite, private platform: Platform) {
    this.init();
  }

  async init() {
    if (!this.platform.is('cordova')) {
      let db = window.openDatabase(SQL_DB_NAME, '', '', 5 * 1024 * 1024);
      this.dbInstance = browserDBInstance(db);
    } else {
      this.dbInstance = await this.sqlite.create({
        name: SQL_DB_NAME,
        location: 'default'
      });
    }
  }

  executeSql (sql, args: any[]){
    return this.dbInstance.executeSql(sql,args)
  }
}
