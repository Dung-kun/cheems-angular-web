export class ItemBasic {
  constructor(
    public id : string  ="",
    public name: string = "",
    public value: any = null
  ) {
  }
}

export let metaDataTitle = {
    id: "identifier",
    seriesName: "Series Laptop",
    audio: "Âm thanh",
    battery: "Pin",
    camera: "Camera",
    color: "Màu sắc",
    cPUSeries: "CPU",
    dimensions: "Kích thước",
    gPUSeries: "GPU",
    hardDrive: "Lưu trữ",
    manufacturers: "Thương hiệu",
    operatingSystem: "Hệ điều hành",
    ports: "Cổng kết nối",
    ram: "RAM",
    screenResolution: "Độ phân giải",
    weight: "Khối lượng",
    wLAN: "WLAN",
    publishedDate: "Ngày ra mắt"
}
