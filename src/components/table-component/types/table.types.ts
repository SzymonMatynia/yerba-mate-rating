import React from 'react';

export interface TableRow {
  id: string | number;
  cells: CellData[];
}

export interface CellData {
  id: string | number;
  content: string | number | React.ReactNode;
}

export interface Table {
  headers: string[],
  rows: TableRow[]
}

export interface Sorting {
  header: string,
  state: SortingState;
}

export type SortingState = 'off' | 'asc' | 'desc'
