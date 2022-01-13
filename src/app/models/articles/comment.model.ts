export interface CommentModel {
  articleId: string
  name: string
  text: string
  date: Date
  id?: string // trzeba to ustawić recznie podczas pobierania komentarza ustawic mu id dokumenu
}
