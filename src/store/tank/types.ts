type Fertilizer = {
  id: number
  name: string
  avatar: string | null
  unit: string
}

type Plant = {
  id: number
  name: string
  avatar: string | null
}

type TankFertilizer = {
  amount: number
  Fertilizer: Fertilizer
}

type TankPlant = {
  Plant: Plant
}

export type Tank = {
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

type Photo = {
  id: number
  url: string
  width: number
  height: number
}

export type TankState = Tank & {
  TankFertilizer: TankFertilizer[]
  TankPlant: TankPlant[]
  Posts: {
    Photos: Photo[]
  }[]
}
