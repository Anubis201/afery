export interface CommentModel {
  articleId?: string
  pollId?: string
  text: string
  date: Date
  isNew: boolean
  isAnswer: boolean
  likes: number
  authorId: string
  dislikes: number
  countAnswers?: number
  avatarSrc: string // pobiera z authoryzacji
  name: string // jest to pobierane z authoryzjacji
  commentId?: string // tylko gdy jest to odpowiedz na jakis komentarz
  id?: string // trzeba to ustawić recznie podczas pobierania komentarza ustawic mu id dokumenu
}
