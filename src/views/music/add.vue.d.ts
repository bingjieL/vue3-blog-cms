
export interface MusicAddData {
  musicTitle: string | null;
  musicPic: string | null;
  musicLrc: string | null;
  musicUrl: string | null;
  musicAuthor: string | null;
  [propName: string]: any;
}

export interface MusicData {
  addData: MusicAddData;
  pagetype: string;
}