import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map } from 'rxjs';
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

  getPolls(limit: number, isMore: boolean, snapshot: any) {
    const ref = this.getRef().ref.orderBy('when', 'desc').limit(limit)

    if (isMore)
      return from(ref.startAfter(snapshot).get())
    else
      return from(ref.get())
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

  getPreviousPoll(surveying: string, dataSnapshot: any) {
    return from(this.getRef().ref.startAt(dataSnapshot).where('surveying', '==', surveying).orderBy('when', 'desc').get())
      .pipe(map(data => {
        data.forEach(doc => {
          console.log(doc.data());
        })
      }))
  }
}
