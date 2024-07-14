export type ResourcesSearch = {
    life: { carbon: number, diamond: number, magic: number, level: number},
    fire: { carbon: number, diamond: number, magic: number, level: number},
    shield: { carbon: number, diamond: number, magic: number, level: number},
    energy: { carbon: number, diamond: number, magic: number,  level: number},
    electricity: { carbon: number, diamond: number, magic: number,  level: number},
    time: { carbon: number, diamond: number, magic: number,  level: number},
  }

// export type SearchLevels = {
//     life_level: number,
//     fire_level: number,
//     shield_level: number,
//     energy_level: number,
//   }

export type SearchData = {
    carbon: number, diamond: number, magic: number, level: number
}