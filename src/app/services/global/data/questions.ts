import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { QuestionModel } from 'src/app/models/polls/question.model';

export const QuestionsData: QuestionModel[] = [
  {
    text: 'Czy polacy są dobrym narodem?',
    answers: [
      {
        text: 'Tak',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Może',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 1
          }
        ]
      },
      {
        text: 'I tak, i nie',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.po,
            points: 1
          }
        ]
      },
    ]
  },
  {
    text: 'Aborcja jest ok?',
    answers: [
      {
        text: 'Tak',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.pis,
            points: 1
          }
        ]
      },
      {
        text: 'Tak ale nie do końca',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 1
          }
        ]
      },
      {
        text: 'Nie nigdy',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
    ]
  },
  {
    text: 'Polityka klimatyczna.',
    answers: [
      {
        text: 'Nie zamykać rentownych elektrowni i kopalni na węgiel.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.pis,
            points: 1
          }
        ]
      },
      {
        text: 'Powoli zamykać wszystkie elektrownie i kopalnie węglowe.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.po,
            points: 1
          }
        ]
      },
      {
        text: 'W jak najszybszym tempię zamknąć wszystkie kopalnie i elektrownie',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  }
]
