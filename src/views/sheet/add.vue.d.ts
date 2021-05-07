
export interface SheetAddData {
  sheetTitle: string | null;
  sheetDes: string | null;
  sheetUrl: string | null;
  sheetTag: string | null;
  sheetImg: string | null;
  [propName: string]: any;
}

export interface SheetData {
  addData: SheetAddData;
  pagetype: string;
}