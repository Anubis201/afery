import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from 'firebase/firestore';
import { from } from 'rxjs';
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

  getDiscussions() {
    return from(this.getRef().ref.orderBy('date', 'desc').limit(20).get());
  }

  updateDislikes(id: string, incrementValue: number) {
    return from(this.getRef().doc(id).update({ dislikes: increment(incrementValue) }))
  }

  updateLikes(id: string, incrementValue: number) {
    return from(this.getRef().doc(id).update({ likes: increment(incrementValue) }))
  }
}
