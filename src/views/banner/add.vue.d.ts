
export interface BannerAddData {
  bannerTitle: string | null;
  bannerImg: string;
  [propName: string]: any;
}

export interface BannerData {
  addData: BannerAddData;
  pagetype: string;
}