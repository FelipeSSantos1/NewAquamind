export type DeleteResponse = {
  id: number
  name: string
  born: Date | null
  length: number
  width: number
  height: number
  light: string | null
  substrate: string | null
  co2: number | null
  dayLight: number | null
  filter: string | null
  description: string | null
  avatar: string | null
  public: boolean
  location: string | null
  createdAt: Date
  updatedAt: Date
  profileId: number | null
}
export type CreateParams = {
  name: string
  born?: string
  length: number
  width: number
  height: number
  light?: string
  substrate?: string
  co2?: number
  dayLight?: number
  filter?: string
  description?: string
  avatar?: string
  location?: string
  plants?: {
    plantId: number
  }[]
  ferts?: {
    fertilizerId: number
    amount: number
  }[]
}
