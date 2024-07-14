export type ShopItemData = {
    item_quantity: number,
    item_type: string,
    item_used: number,
    item_bought: number,
    purchasable: boolean,
    img: string,
    alt: string,
    hours: number,
    name: string
}
export type ShopBuildingKey = 'unity-link_generator' | 'ticket_generator';
// export type Rule = { type: string, level: number, order: number };

// export type NextLevelData = { type: string, level: number, level_building: number };

// export type BuildingData = {
//     rules: Rule[],
//     is_next_level_buildable: boolean,
//     next_level_data: NextLevelData
// };
// export type ShopBuildingData = Record<ShopBuildingKey, BuildingData> 

// Définition des types pour les éléments du tableau
interface Rule {
    type: string;
    level: number;
    order: number;
  }
  
  interface NextLevelData {
    type: string;
    level: number;
    level_building: number;
  }
  
  interface GeneratorData {
    rules: Rule[];
    is_next_level_buildable: boolean;
    next_level_data: NextLevelData;
  }
  
  // Type pour l'objet principal qui contient une clé et des données
  type Generator = {
    [key: string]: GeneratorData;
  };

//   export type ShopBuildingData = {
//     [key: number]: {[key: string]: GeneratorData};
//   };
  
  // Type pour le tableau qui contient ces objets
  export type ShopBuildingData = Generator[];
  
  
  
    
    
