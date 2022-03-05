import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from 'firebase/firestore';
import { from } from 'rxjs';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getRef() {
    return this.firestore.collection('chat');
  }

  addChat(chat: ChatTextModel) {
    return from(this.getRef().add(chat));
  }

  getDiscussions(limit: number, lastSnapshot = null, order: OrderEnum, date: Date) {
    const ref = this.getRef().ref
      .where('isAnswer', '==', false)
      .orderBy('date', 'desc')
      .limit(limit);

    if (lastSnapshot === null)
      if (order === OrderEnum.Latest) return from(ref.get())
      else return from(ref.where('date', '>=', date).get())
    else
      if (order === OrderEnum.Latest) return from(ref.startAt(lastSnapshot).get())
      else return from(ref.startAt(lastSnapshot).where('date', '>=', date).get())
  }

  updateDislikes(id: string, incrementValue: number) {
    return from(this.getRef().doc(id).update({ dislikes: increment(incrementValue) }))
  }

  updateLikes(id: string, incrementValue: number) {
    return from(this.getRef().doc(id).update({ likes: increment(incrementValue) }))
  }

  deteleMe(id: string) {
    return from(this.getRef().doc(id).delete())
  }

  getAnswers(id: string) {
    return from(this.getRef().ref.where('parentId', '==', id).get())
  }

  // TODO narazie tylko obsluga dodawanie i wylacznie glowne komentarze bez odpowiedzi
  onChatChange() {
    return this.getRef().ref.where('isAnswer', '==', false).orderBy('date', 'desc').limit(20)
  }

  getDiscussion(id: string) {
    return this.getRef().doc(id).get()
  }
}
