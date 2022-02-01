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

  getNewestPoll() {
    return from(this.getRef().ref.orderBy('when', 'desc').limit(1).get())
  }

  getSinglePoll(id: string) {
    return from(this.getRef().doc(id).get())
  }

  deletePoll(docId: string) {
    return from(this.getRef().doc(docId).delete())
  }

  editPoll(data: PollModel, id: string) {
    return from(this.getRef().doc(id).update(data))
  }
}
