import { QuestionModel } from 'src/app/models/polls/question.model';

export const QuestionsData: QuestionModel[] = [
  {
    text: 'Czy polacy są dobrym narodem?',
    answers: [
      {
        text: 'Tak',
        isChoosed: false
      },
      {
        text: 'Nie',
        isChoosed: false
      },
      {
        text: 'Może',
        isChoosed: false
      },
      {
        text: 'I tak, i nie',
        isChoosed: false
      },
    ]
  },
  {
    text: 'Aborcja jest ok?',
    answers: [
      {
        text: 'Tak',
        isChoosed: false
      },
      {
        text: 'Nie',
        isChoosed: false
      },
      {
        text: 'Tak ale nie do końca',
        isChoosed: false
      },
      {
        text: 'Nie nigdy',
        isChoosed: false
      },
    ]
  },
  {
    text: 'Polityka klimatyczna.',
    answers: [
      {
        text: 'Nie zamykać rentownych elektrowni i kopalni na węgiel.',
        isChoosed: false
      },
      {
        text: 'Powoli zamykać wszystkie elektrownie i kopalnie węglowe.',
        isChoosed: false
      },
      {
        text: 'W jak najszybszym tempię zamknąć wszystkie kopalnie i elektrownie',
        isChoosed: false
      },
    ]
  }
]
