import { NatureKey } from "../types/general-types";

const names: Record<NatureKey, string> = {
  sora: "Sora",
  nano: "Nano",
  altheron: "Althéron",
  sotoc: "Sotoc",
  flumia: "Flumia",
};

export default names;

export const buildingsNames = {
  'carbon': "Synthétiseur de carbone",
  'diamond': "Raffinerie de diamants",
  'magic': "Extracteur de magie",
  'energy': "Génératrice d'énergie",
  'protective_generator': "Dôme protecteur",
  'ticket_generator': "Générateur de tickets",
  'unity-link_generator': "Générateur de Lien-Unités",
}

// pas utilisé
export const resourcesNamesCode = ['carbon', 'diamond', 'magic']

export const resourcesNameFrench = {carbon: 'Carbone', diamond: 'Diamants', magic: 'Magie'}
