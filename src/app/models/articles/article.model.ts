import { ArticlesTypesEnum } from './enums/articles-types.enum';
import { PartiesEnum } from './enums/parties.enum';

export interface ArticleModel {
  title: string
  text: string
  type: ArticlesTypesEnum
  createDate: Date
  id?: string // Dodaje id do meduly tylko gdy potrzebuje pobrać zdjęcie artykułu
  imageSrc: string // tylko przy pokazniu zdjęcia trzeba dodać jego zdjęcie
  entity: PartiesEnum
  imageDesc?: string
  costs: number | null
  customName: string
  tags: string[]
  subtitle?: string
  likes?: number
  dislikes?: number
  viewership: number
  isHide?: boolean
  isFirstArticle?: boolean
}
