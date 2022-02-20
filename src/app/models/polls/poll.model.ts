import { PartyCharModel } from '../articles/party-char.model';
import { PollDataEnum } from './enums/poll-data.enum';
import { PresidentPollModel } from './president-poll.mode';

export interface PollModel {
  forWhom: string
  people: number
  surveying: string
  when: Date
  items: PartyCharModel[] | PresidentPollModel[]
  typeItems: PollDataEnum
  title: string
  id?: string
}
