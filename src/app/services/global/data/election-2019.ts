import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';

export const Election2019: PollModel = {
  surveying: 'PKW',
  people: null,
  forWhom: null,
  when: new Date(2019, 9, 13),
  title: null,
  typeItems: PollDataEnum.Partie,
  items: [
    {
      party: PartiesEnum.pis,
      percentage: 43.6
    },
    {
      party: PartiesEnum.po,
      percentage: 27.4
    },
    {
      party: PartiesEnum.polska2050,
      percentage: 0
    },
    {
      party: PartiesEnum.konfederacja,
      percentage: 6.8
    },
    {
      party: PartiesEnum.lewica,
      percentage: 12.6
    },
    {
      party: PartiesEnum.psl,
      percentage: 8.6
    },
  ]
}
