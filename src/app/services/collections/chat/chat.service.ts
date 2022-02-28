import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
