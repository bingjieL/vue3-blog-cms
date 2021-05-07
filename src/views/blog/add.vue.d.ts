
export interface BlogAddData {
  blogTitle: string | null;
  blog_type_id: string | null;
  blogImg: string | null;
  blogDes: string | null;
  blogContent: string;
  [propName: string]: any;
}

export interface TypeOption {
  blogTypeId: Number;
  blogTypeTitle: string;
  [propName: string]: any;
}

export interface BlogData {
  addData: BlogAddData;
  typeOption: TypeOption[];
  pagetype: string;
}