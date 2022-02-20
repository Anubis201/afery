import { PresidentsEnum } from './enums/presidents.enum';

export interface PresidentPollModel {
  president: PresidentsEnum,
  percentage: number
}
