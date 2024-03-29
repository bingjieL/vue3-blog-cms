
export interface BookAddData {
  bookTitle: string | null;
  bookAuthor: string | null;
  bookDes: string | null;
  bookpdfUrl: string | null;
  bookdlUrl: string | null;
  bookPic: string | undefined;
  [propName: string]: any;
}

export interface BookData {
  addData: BookAddData;
  pagetype: string;
}