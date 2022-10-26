class Product {
    constructor(
      public id: string = "",
      public name: string = "",
      public description: string = "",
      public price: string = "",
      public categoryId: string = "",
      public warrantyDate: string = "",
      public metadata: string = "",
      public deletedAt: string = "",
      public manufacture: Manufacture[] = []
    ){

    }
}
