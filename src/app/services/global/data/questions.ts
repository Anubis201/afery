import { QuestionModel } from 'src/app/models/polls/question.model';

export const QuestionsData: QuestionModel[] = [
  {
    text: 'Czy polacy są dobrym narodem?',
    answers: [
      {
        text: 'Tak'
      },
      {
        text: 'Nie'
      },
      {
        text: 'Może'
      },
      {
        text: 'I tak, i nie'
      },
    ]
  },
  {
    text: 'Aborcja jest ok?',
    answers: [
      {
        text: 'Tak'
      },
      {
        text: 'Nie'
      },
      {
        text: 'Tak ale nie do końca'
      },
      {
        text: 'Nie nigdy'
      },
    ]
  },
  {
    text: 'Polityka klimatyczna.',
    answers: [
      {
        text: 'Nie zamykać rentownych elektrowni i kopalni na węgiel.'
      },
      {
        text: 'Powoli zamykać wszystkie elektrownie i kopalnie węglowe.'
      },
      {
        text: 'W jak najszybszym tempię zamknąć wszystkie kopalnie i elektrownie'
      },
    ]
  }
]
