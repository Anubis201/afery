import { PartyCharModel } from '../articles/party-char.model';
import { PollDataEnum } from './enums/poll-data.enum';
import { OtherPollModel } from './other-poll.model';
import { PresidentPollModel } from './president-poll.mode';

export interface PollModel {
  forWhom: string
  people: number
  surveying: string
  when: Date
  items: PartyCharModel[] | PresidentPollModel[] | OtherPollModel[]
  typeItems: PollDataEnum
  title: string
  id?: string
}
