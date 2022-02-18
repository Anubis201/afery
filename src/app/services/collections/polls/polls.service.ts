import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map } from 'rxjs';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
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

  getPolls(limit: number, isMore: boolean, snapshot: any, pollData: PollDataEnum) {
    const ref = this.getRef().ref.where('typeItems', '==', pollData).orderBy('when', 'desc').limit(limit)

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

  getPreviousPoll(surveying: string, after: any) {
    return from(this.getRef().ref.orderBy('when', 'desc').startAfter(after).where('surveying', '==', surveying).limit(1).get())
      .pipe(map(docs => {
        let data: PollModel = null;

        docs.forEach(doc => {
          data = {
            ...doc.data() as PollModel,
            when: (doc.data() as any).when.toDate(),
          }
        })

        return data;
      }))
  }
}
