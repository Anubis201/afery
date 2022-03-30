export interface QuestionModel {
  text: string
  answers: {
    text: string
    isChoosed: boolean
  }[]
}
