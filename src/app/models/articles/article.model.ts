import { ArticlesKindsEnum } from './enums/articles-kinds.enum';
import { ArticlesTypesEnum } from './enums/articles-types.enum';
import { PartiesEnum } from './enums/parties.enum';

export interface ArticleModel {
  title: string
  text: string
  type: ArticlesTypesEnum
  kind: ArticlesKindsEnum
  createDate: Date
  id?: string // Dodaje id do meduly tylko gdy potrzebuje pobrać zdjęcie artykułu
  imageSrc: string // tylko przy pokazniu zdjęcia trzeba dodać jego zdjęcie
  entity: PartiesEnum
  costs: number | null
  customName: string
  likes?: number
  dislikes?: number
  viewership: number
  isHide?: boolean
}
