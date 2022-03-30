import { PartiesEnum } from '../articles/enums/parties.enum'

export interface QuestionModel {
  text: string
  answers: {
    text: string
    isChoosed: boolean
    partiesPoints: {
      party: PartiesEnum
      points: number
    }[]
  }[]
}
