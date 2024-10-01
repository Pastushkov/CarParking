export interface Parking {
  id: string;
  address: string;
  size: number;
  occupied: number;
  tariffId: Tariff;
  floorCount: number;
}

export interface Tariff {
  id: string;
  name: string;
  pricePerHour: number;
  startWorkingHours: string;
  endWorkingHours: string;
  freeTime: string;
}

export namespace Response {
  export interface Parking {
    ok: boolean;
    payload: Parking[];
  }
}
