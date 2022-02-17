import { PartyCharModel } from '../articles/party-char.model';

export interface PollModel {
  forWhom: string
  people: number
  surveying: string
  when: Date
  items: PartyCharModel[]
  title: string
  id?: string
}
