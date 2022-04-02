import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';


export type ResultElectionType = {
  [key in PartiesEnum]: number
}
