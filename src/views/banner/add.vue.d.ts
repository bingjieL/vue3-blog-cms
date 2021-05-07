
export interface BannerAddData {
  bannerTitle: string | null;
  bannerImg: string | null;
  [propName: string]: any;
}

export interface BannerData {
  addData: BannerAddData;
  pagetype: string;
}