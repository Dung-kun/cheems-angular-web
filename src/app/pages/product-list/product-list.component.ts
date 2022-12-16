import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { CreateFileMutation } from './graphql/create-file.query';
import { Mutation } from 'apollo-angular';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of, map } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  listTrademark = [
    'Acer',
    'Asus',
    'Dell',
    'HP',
    'Lenovo',
    'Avita',
    'Gigabyte',
    'MSI',
  ];
  minValue: number = 0;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  addPro: Mutation;
  selectedFile: any;
  fileAdded: File[] = [];
  constructor(public createProduct: CreateFileMutation) {
    this.addPro = createProduct;
  }

  ngOnInit(): void {}

  onChangeEvent(event: any) {
    console.log(event);
  }

  addStyle(event: any, title: string) {
    const query = document.getElementById(title);
    if (query.classList.contains('dropdown-button-2')) {
      query.classList.remove('dropdown-button-2');
    } else query.classList.add('dropdown-button-2');
  }

  // addFile() {
  //   let input = {
  //     name: 'vcl name',
  //     description: 'description nhu db',
  //     price: 90009,
  //     categoriesIds: ['1b649630-16c5-4ed8-8b7d-f9a1380d340d'],
  //     metaDatas: {
  //       color: 'Black',
  //       ram: '200GB',
  //       manufacturersId: 'b06a562a-bf01-4754-a413-61f92082b7cf',
  //       seriesName: 'Test series name',
  //     },
  //   };
  //   var MUT_VARS = { input: input, files: this.selectedFile };

  //   let mutationGQL = this.addPro;
  //   let mutation$ = mutationGQL.mutate(MUT_VARS, {
  //     context: {
  //       useMultipart: true,
  //     },
  //   });

  //   let o$ = mutation$;

  //   let p$ = o$
  //     .pipe(
  //       switchMap((_) => {
  //         return of(_);
  //       }),
  //       map((result) => {
  //         const item = <any>result;

  //         let _item = item ? <any>item : null;

  //         return _item;
  //       })
  //     )
  //     .subscribe((item) => {
  //       console.log('ngon', item);
  //     });

  //   return p$;
  // }

  // saveFile(event: any) {
  //   console.log(event.target.files);
  //   this.selectedFile = event.target.files;
  //   for (let i = 0; i < this.selectedFile.length; i++) {
  //     this.fileAdded.push(this.selectedFile[i]);
  //   }
  // }
}
