import { Map, FeatureGroup, point } from 'leaflet';

const offsetLengthZoomMap = {
  // 地图缩放等级对应关系
  1: 19,
  2: 18,
  3: 17,
  4: 16,
  5: 15,
  6: 14,
  7: 13,
  8: 12,
  9: 11,
  10: 10,
  11: 9,
  12: 8 + 1.5,
  13: 7 + 1,
  14: 6 + 0.5,
  15: 5,
  16: 4,
  17: 3,
  18: 2,
  19: 1 + 0.5,
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
  lng: number;
  lat: number;
  mmsi: string;
};

type MarkerTag = Pick<Rect, 'lng' | 'lat' | 'mmsi'> & { name: string };

export default class TagCollisionDetection {
  constructor(
    private map: Map,
    private layer: FeatureGroup,
    private maxZoom: keyof typeof offsetLengthZoomMap = 1,
  ) {}

  updateMapMarkerTag = (tags: MarkerTag[]) => {
    this.layer.clearLayers();
    const zoom = this.map.getZoom() as keyof typeof offsetLengthZoomMap;

    // 如果小于最大缩放比例就不标记
    if (zoom <= this.maxZoom || !offsetLengthZoomMap[zoom]) return [];

    // 根据地图缩放比例计算偏移长度
    const offset = Math.pow(offsetLengthZoomMap[zoom], 2) / 10000; //Math.pow(19-zoom+1,2)/10000 0.00045
    // 获取向左上角偏移量
    const [offsetLngL, offsetLatL] = this.getLAIAngle('negative', offset);

    const renderTags: Rect[] = [];
    for (const tag of tags) {
      //声明 将要渲染的数据对象
      const newTagTarget = { ...tag };
      // 设置偏移右上角经纬度
      newTagTarget.lng = tag.lng - offsetLngL;
      newTagTarget.lat = tag.lat - offsetLatL;

      // 宽度算上 padding,border
      const nameWidth = this.getLengthPx(tag.name, 15.636) + 10 + 2;

      //获取无碰撞旋转后的角度点位
      const renderTag = this.getAngleType(newTagTarget, renderTags, nameWidth);

      // 不需要渲染
      if (!renderTag) continue;

      renderTags.push(renderTag);
    }

    return renderTags;
  };
  /**
   * 获取角度（决定是否旋转，以及旋转多少）
   * @param { Objcet } tag
   * @param {字符宽度} nameWidth
   * @returns
   */
  private getAngleType = (tag: Omit<MarkerTag, 'name'>, renderTags: Rect[], nameWidth: number) => {
    //经纬度 转 平面坐标 X = Lng , y = Lat
    const { x, y } = this.map.latLngToContainerPoint(tag);

    const width = nameWidth; // 宽度随字符长度变化
    const height = 18 + 2; // 高度固定不变

    // 将要渲染的检测对象
    const rect1: Rect = {
      left: x,
      top: y,
      width,
      height,
      ...tag,
    };

    // 四个角度检测
    for (let j = 0; j < 4; j++) {
      // 不需要旋转标记
      const noSpin = renderTags.every(renderTag => {
        // 没有碰撞
        if (!this.handleEgdeCollisions(rect1, renderTag)) return true;

        // 旋转角度
        const [spinX, spinY] = this.getOffsetLAI(rect1, j as any);
        rect1.left = spinX; //- width
        rect1.top = spinY; //- height
        return false;
      });

      if (noSpin) {
        const newLatlng = this.map.containerPointToLatLng(point(rect1.left, rect1.top));
        rect1.lat = newLatlng.lat;
        rect1.lng = newLatlng.lng;
        return rect1;
      }
    }
  };

  /**
   * 碰撞检测
   * @param { Rect } rect1
   * @param { Rect } rect2
   * @returns Boolean
   */
  private handleEgdeCollisions = (rect1: Rect, rect2: Rect) => {
    //console.log(rect1,rect2)
    return (
      rect1.left < rect2.left + rect2.width &&
      rect1.left + rect1.width > rect2.left &&
      rect1.top < rect2.top + rect2.height &&
      rect1.height + rect1.top > rect2.top
    );
  };

  /**
   * 获取旋转角度（平面坐标系）
   * @param { Rect } rect
   * @param { Number } num  // 旋转次数
   * @returns 返回旋转后的点位
   */
  private getOffsetLAI = (rect: Rect, num: 0 | 1 | 2 | 3): [number, number] => {
    const map = {
      0: (x: number, y: number, _w: number, h: number) => [x, y + h * 4],
      1: (x: number, y: number, w: number) => [x - w * 1.1, y],
      2: (x: number, y: number, _w: number, h: number) => [x, y - h * 4],
      3: (x: number, y: number) => [x, y],
    };
    return map[num](rect.left, rect.top, rect.width, rect.height) as [number, number]; // [x, y]
  };

  /**
   * 根据字符 决定旋转 角度
   * @param { 'negative' | 'zero' | 'positive' } type
   * @param { Number } offset
   * @returns [lng,lat]
   */
  private getLAIAngle = (type: 'negative' | 'zero' | 'positive', offset: number) => {
    const obj = {
      negative: (num: number) => num - num * 2,
      zero: (num: number) => num * 0,
      positive: (num: number) => num,
    };
    return [obj[type](offset), obj[type](offset)];
  };

  /**
   * 获取字符在屏幕中的像素
   * @param { String } str
   * @param { Number } fontSize
   * @returns 字符宽度
   */
  private getLengthPx = (str: string, fontSize: number) => {
    const strLength = str.replace(/[^\x00-\xff]/gi, 'aa').length;
    return (strLength * fontSize) / 2;
  };
}
