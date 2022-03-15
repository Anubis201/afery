import { RulesEnum } from './enums/rules.enum'

export interface UserDetailsModel {
  userName: string
  avatar: string
  rule: RulesEnum
  revievs: {
    id: string,
    opinion: UserOpinionType
  }[]
}

export type UserOpinionType = 'like' | 'dislike'
