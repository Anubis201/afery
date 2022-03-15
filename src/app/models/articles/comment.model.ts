export interface CommentModel {
  articleId?: string
  pollId?: string
  name: string
  text: string
  date: Date
  isNew: boolean
  isAnswer: boolean
  likes: number
  authorId: string
  dislikes: number
  avatar?: string
  countAnswers?: number
  commentId?: string // tylko gdy jest to odpowiedz na jakis komentarz
  id?: string // trzeba to ustawić recznie podczas pobierania komentarza ustawic mu id dokumenu
}
