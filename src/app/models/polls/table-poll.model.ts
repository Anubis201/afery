import { PartiesEnum } from '../articles/enums/parties.enum';

export interface TablePollModel {
  party: PartiesEnum
  difference: Number
  previousValue: Number
  percentage: Number
}
