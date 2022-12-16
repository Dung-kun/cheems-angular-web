import { Manufacturer } from './manufacturer.model';


export class Metadata {
  constructor(
    public id: string = "",
    public seriesName: string = "",
    public audio: string = "",
    public battery: string = "",
    public camera: string = "",
    public color: string = "",
    public cPUSeries: string = "",
    public dimensions: string = "",
    public gPUSeries: string = "",
    public hardDrive: string = "",
    public manufacturer: Manufacturer = null,
    public operatingSystem: string = "",
    public ports: string = "",
    public ram: string = "",
    public screenResolution: string = "",
    public weight: string = "",
    public wLAN: string = "",
    public publishedDate: Date = null,
  ){
  }
}
