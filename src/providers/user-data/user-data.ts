import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDataProvider {

  userKey;

  constructor(public http: HttpClient) {
    console.log('Hello UserDataProvider Provider');
  }

  setUserKey(userKey) {
    this.userKey = userKey;
  }

  getUserKey() {
    return this.userKey;
  }

}
