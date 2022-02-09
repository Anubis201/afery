export interface CommentModel {
  articleId: string
  name: string
  text: string
  date: Date
  isNew: boolean
  isAnswer: boolean
  likes?: number
  dislikes?: number
  commentId?: string // tylko gdy jest to odpowiedz na jakis komentarz
  id?: string // trzeba to ustawić recznie podczas pobierania komentarza ustawic mu id dokumenu
}
