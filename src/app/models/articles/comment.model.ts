export interface CommentModel {
  articleId: string
  name: string
  text: string
  date: Date
  isNew: boolean
  id?: string // trzeba to ustawić recznie podczas pobierania komentarza ustawic mu id dokumenu
}
