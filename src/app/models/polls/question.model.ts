import { PartiesPoints } from './parties-points.model'

export interface QuestionModel {
  text: string
  answers: {
    text: string
    isChoosed: boolean
    partiesPoints: PartiesPoints[]
  }[]
}
