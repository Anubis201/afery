export interface UserDetailsModel {
  revievs: {
    id: string,
    opinion: UserOpinionType
  }[]
}

export type UserOpinionType = 'like' | 'dislike'
