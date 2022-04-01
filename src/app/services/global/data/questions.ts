import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { QuestionModel } from 'src/app/models/polls/question.model';

export const QuestionsData: QuestionModel[] = [
  {
    text: 'Co zrobić z aborcją?',
    answers: [
      {
        text: 'Zostawić aborcję w aktualnej formie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Aborcja do 12 tygodnia ciąży.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Powrót do wcześniejszego kompromisu.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 1
          }
        ]
      },
      {
        text: 'Zaostrzenie prawa aborcyjnego.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.po,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
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
    text: 'Czy należy zlikwidować fundusz kościelny?',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Należy go zmniejszyć.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 1
          }
        ]
      },
      {
        text: 'Należy go zmniejszyć.',
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
    text: 'Czy należy konfiskować/nacjonalizować majątki i firmy rosyjskie?',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy przywrócić refundacje In Vitro?',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy ułatwić dostęp do broni i jeśli tak to w jakim stopniu?',
    answers: [
      {
        text: 'Należy w ograniczonym stopniu ułatwić dostęp do broni.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'W znaczączym stopniu należy ułatwić dostęp do broni.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Zostawić prawo dostępu do broni w aktualnej formie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy podwyższyć podatki dla najlepiej zarabiających osób?',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Tak, ale jednocześnie obniżyć podatki mniej zarabiającym.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy wydatki na obronność powinny zostać drastycznie zwiększone do 3%, nawet jeśli będzie to związne z większym długiem publicznym.',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy przyjmować uchodźców i w jaki sposób ich traktować?',
    answers: [
      {
        text: 'Trzeba ich przyjmować i zapewnić im takie sama prawa, jakie ma Polski obywatel, z wyłączeniem możliwości głosowania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Przyjmować, ale bez dodatków socjalnych.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie należy ich przyjmować.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy zlikwidować izbe dyscyplinarną, aby Polska dostało pieniądze z KPO?',
    answers: [
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Zgodnie z umową społeczna do 2049 roku Polska ma się rozstać z węglem. Czy należy ją potrzymać?',
    answers: [
      {
        text: 'Tak, ale trzeba przyspieszyć ten termin do 2035 roku.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Trzeba porzucić ten plan i nie rostawać się z węglem.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Zgodnie z umową społeczna do 2049 roku Polska ma się rozstać z węglem. Czy należy ją potrzymać?',
    answers: [
      {
        text: 'Tak, ale trzeba przyspieszyć ten termin do 2035 roku.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Trzeba porzucić ten plan i nie rostawać się z węglem.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },

  {
    text: 'Czy należy ustanowić obowiązek szczepień na koronowirusa?',
    answers: [
      {
        text: 'Tak, ale wyłącznie dla osób starszych.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.konfederacja,
            points: 1
          }
        ]
      },
      {
        text: 'Tak, ale od 18 roku życia.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Tak.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
      {
        text: 'Nie wiem.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          }
        ]
      },
    ]
  },
]
