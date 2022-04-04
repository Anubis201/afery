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
            party: PartiesEnum.pis,
            points: 2
          },
          {
            party: PartiesEnum.konfederacja,
            points: 1
          },
          {
            party: PartiesEnum.psl,
            points: -1
          },
          {
            party: PartiesEnum.polska2050,
            points: -1
          },
          {
            party: PartiesEnum.lewica,
            points: -2
          },
          {
            party: PartiesEnum.po,
            points: -1
          },
        ]
      },
      {
        text: 'Aborcja do 12 tygodnia ciąży.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.lewica,
            points: 1
          },
          {
            party: PartiesEnum.psl,
            points: -1
          },
          {
            party: PartiesEnum.polska2050,
            points: -1
          },
          {
            party: PartiesEnum.po,
            points: 2
          },
          {
            party: PartiesEnum.pis,
            points: -2
          },
          {
            party: PartiesEnum.konfederacja,
            points: -2
          },
        ]
      },
      {
        text: 'Powrót do wcześniejszego kompromisu.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.polska2050,
            points: 2
          },
          {
            party: PartiesEnum.psl,
            points: 2
          },
          {
            party: PartiesEnum.pis,
            points: -1
          },
          {
            party: PartiesEnum.po,
            points: -1
          },
          {
            party: PartiesEnum.konfederacja,
            points: -1
          },
          {
            party: PartiesEnum.lewica,
            points: -2
          },
        ]
      },
      {
        text: 'Zaostrzenie prawa aborcyjnego.',
        isChoosed: false,
        partiesPoints: [
          {
            party: PartiesEnum.po,
            points: -2
          },
          {
            party: PartiesEnum.lewica,
            points: -2
          },
          {
            party: PartiesEnum.polska2050,
            points: -1
          },
          {
            party: PartiesEnum.psl,
            points: -1
          },
          {
            party: PartiesEnum.pis,
            points: 1
          },
          {
            party: PartiesEnum.konfederacja,
            points: 1
          },
        ]
      },
      {
        text: 'Nie mam zdania.',
        isChoosed: false,
        partiesPoints: []
      },
    ]
  },

  // {
  //   text: 'Czy należy zlikwidować fundusz kościelny?',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy konfiskować/nacjonalizować majątki oraz firmy rosyjskie?',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.pis,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy przywrócić refundacje In Vitro?',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy ułatwić dostęp do broni i jeśli tak to w jakim stopniu?',
  //   answers: [
  //     {
  //       text: 'Należy w ograniczonym stopniu ułatwić dostęp do broni.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'W znaczączym stopniu należy ułatwić dostęp do broni.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Zostawić prawo dostępu do broni w aktualnej formie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy podwyższyć podatki dla najlepiej zarabiających?',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Tak, ale jednocześnie obniżyć podatki mniej zarabiającym.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy wydatki na obronność powinny zostać drastycznie zwiększone do 3%, nawet jeśli będzie to związne z większym długiem publicznym.',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy przyjmować uchodźców i w jaki sposób ich traktować?',
  //   answers: [
  //     {
  //       text: 'Należy ich przyjmować i zapewnić im takie sama prawa, jakie ma Polski obywatel, z wyłączeniem możliwości głosowania.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Przyjmować, ale bez dodatków socjalnych.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie należy ich przyjmować.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy zlikwidować izbe dyscyplinarną, aby Polska dostało pieniądze z KPO?',
  //   answers: [
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.pis,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Zgodnie z umową społeczna do 2049 roku Polska ma się rozstać z węglem. Czy należy ją potrzymać?',
  //   answers: [
  //     {
  //       text: 'Tak, ale trzeba przyspieszyć ten termin do 2035 roku.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Trzeba porzucić ten plan w całości.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie mam zdania.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },

  // {
  //   text: 'Czy należy ustanowić obowiązek szczepień na koronowirusa?',
  //   answers: [
  //     {
  //       text: 'Tak, ale wyłącznie dla osób starszych.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Tak, ale od 18 roku życia.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: 1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: 1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Tak.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: 2
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.polska2050,
  //           points: -1
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie.',
  //       isChoosed: false,
  //       partiesPoints: [
  //         {
  //           party: PartiesEnum.lewica,
  //           points: -2
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.psl,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.po,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.pis,
  //           points: -1
  //         },
  //         {
  //           party: PartiesEnum.konfederacja,
  //           points: 2
  //         },
  //       ]
  //     },
  //     {
  //       text: 'Nie wiem.',
  //       isChoosed: false,
  //       partiesPoints: []
  //     },
  //   ]
  // },
]
