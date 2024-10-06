import { RowData } from '@tanstack/react-table';

export interface Parking {
  _id: string;
  address: string;
  size: number;
  occupied: number;
  tariffId: Tariff;
  floorCount: number;
  possition: {
    lat: number;
    lng: number;
  };
}

export interface Tariff {
  _id: string;
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

export interface Option {
  label: string;
  value: string;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    deleteParking?: (id: string, address: string) => void;
    deleteTariff?: (id: string, name: string) => void;
    [key: string]: any;
  }
}
