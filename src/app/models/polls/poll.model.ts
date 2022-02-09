import { PartyCharModel } from '../articles/party-char.model';

export interface PollModel {
  forWhom: string
  people: number
  surveying: string
  when: Date
  parties: PartyCharModel[]
  id?: string
}
