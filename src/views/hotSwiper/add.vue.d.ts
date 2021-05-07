
export interface HotSwiperAddData {
  hotTitle: string | null;
  hotUrl: string | null;
  hotImg: string | null;
  [propName: string]: any;
}

export interface HotSwiperData {
  addData: HotSwiperAddData;
  pagetype: string;
}