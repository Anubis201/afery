import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  private getRef() {
    return this.firestore.collection('polls');
  }

  addPoll(data: PollModel) {
    return from(this.getRef().add(data))
  }

  getPolls() {
    return from(this.getRef().ref.orderBy('when', 'desc').get())
  }
}
