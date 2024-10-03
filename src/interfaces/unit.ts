export interface UnitI {
  _id?: string;
  name: string;
  description: string;
}

export interface UnitsResponseI {
  units: UnitI[];
  total: number;
  pages: number;
}

export interface UnitResponseI {
  unit: UnitI;
  message: String;
}
