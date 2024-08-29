export interface UnitI {
  _id?: string;
  name: string;
  description: string;
}

export interface UnitsResponseI {
  units: UnitI[];
  totalUnits: number;
  totalPages: number;
}

export interface UnitResponseI {
  unit: UnitI;
  message: String;
}
