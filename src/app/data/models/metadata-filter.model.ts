import { Manufacturer } from "./manufacturer.model";

export class MetadataFilter {
  constructor(
    public ids: string[] = [],
    public seriesNames: string[] = [],
    public audios: string[] = [],
    public batteries: string[] = [],
    public cameras: string[] = [],
    public colors: string[] = [],
    public cPUSeries: string[] = [],
    public dimensions: string[] = [],
    public gPUSeries: string[] = [],
    public hardDrives: string[] = [],
    public manufacturersIds: string[] = [],
    public operatingSystems: string[] = [],
    public ports: string[] = [],
    public rams: string[] = [],
    public screenResolutions: string[] = [],
    public weights: string[] = [],
    public wLANs: string[] = [],
    public publishedFrom: Date = null,
    public publishedTo: Date = null,
  ){}
}
