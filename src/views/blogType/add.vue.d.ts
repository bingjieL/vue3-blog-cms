
export interface BlogTypeAddData {
  blogTypeTitle: string | null;
  [propName: string]: any;
}

export interface BlogTypeData {
  addData: BlogTypeAddData;
  pagetype: string;
}