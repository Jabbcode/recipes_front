export interface UnitI {
  _id?: string;
  name: string;
  description: string;
}

export interface UnitResponseI {
  units: UnitI[];
  totalUnits: number;
  totlaPages: number;
}
