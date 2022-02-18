import { PartyCharModel } from '../articles/party-char.model';
import { PollDataEnum } from './enums/poll-data.enum';

export interface PollModel {
  forWhom: string
  people: number
  surveying: string
  when: Date
  items: PartyCharModel[]
  typeItems: PollDataEnum
  title: string
  id?: string
}
