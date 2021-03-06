export interface ChatTextModel {
  id: string
  name: string
  text: string
  date: Date
  likes: number
  dislikes: number
  parentId?: string
  isAnswer: boolean
  authorId: string
  countAnswers?: number
}
