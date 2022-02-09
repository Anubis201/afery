import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface IpFromNet {
  ipAddress: string
  continentCode: string
  continentName: string
  countryCode: string
  countryName: string
  stateProv: string
  city: string
}

@Injectable({
  providedIn: 'root'
})
export class BanService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  getElement(ip: string) {
    return this.firestore.collection('banned').doc(ip).get()
  }

  addElement(ip: string, ban: boolean) {
    return this.firestore.collection('banned').doc(ip).set({ ban })
  }

  getIp() {
    return this.http.get<IpFromNet>('https://api.db-ip.com/v2/free/self')
  }
}
