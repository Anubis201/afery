export interface ArticleModel {
  title: string
  text: string
  type: string
  kind: string
  createDate: Date
  id?: string // Dodaje id do meduly tylko gdy potrzebuje pobrać zdjęcie artykułu
  imageSrc?: string // tylko przy pokazniu zdjęcia trzeba dodać jego zdjęcie
  entity: string
}
