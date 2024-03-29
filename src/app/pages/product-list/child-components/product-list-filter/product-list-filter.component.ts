import {
  ChangeContext,
  LabelType,
  Options,
  PointerType,
} from '@angular-slider/ngx-slider';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { ProductListFilterPageViewModel } from './models/product-list-filter-page-view.model';
import { combineLatest, map, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CategoryAndManufacturerListQuery } from './graphql/category-and-manufacturer-list.query';
import { QueryRef } from 'apollo-angular';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forItem } from '../../../../data/mocks/model-filter-mock';
import { tap } from 'rxjs/operators';
import { ProductListFilterViewData } from './models/product-list-filter-view-data.model';
import { FilterProductModel } from '../../models/filer-product.model';
import { ProductTypeFilterInput } from '../../../../data/models/product-type-filter-input.model';
import { MetadataFilter } from '../../../../data/models/metadata-filter.model';

@Component({
  selector: 'app-product-list-filter',
  templateUrl: './product-list-filter.component.html',
  styleUrls: ['./product-list-filter.component.scss'],
})
export class ProductListFilterComponent
  extends PageViewModelBasedComponent<ProductListFilterPageViewModel>
  implements OnInit, AfterViewInit
{
  public styleMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  // set up range slider
  minValue: number = 0;
  maxValue: number = 130000000;
  minValueShow: string = '0';
  maxValueShow: string = this.styleMoney.format(13000000);
  options: Options = {
    floor: 0,
    ceil: 130000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return '';
      }
    },
  };

  // form
  ngForm: FormGroup;

  appDropdownQueryIns: QueryRef<{}, {}>;

  constructor(
    public dropdownQuery: CategoryAndManufacturerListQuery,
    private fb: FormBuilder
  ) {
    super();

    this.ngForm = this.fb.group({ formBody: this.fb.group({}) });
    this.appDropdownQueryIns = this.dropdownQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
  }

  get formBody(): FormArray {
    return this.ngForm.get('formBody') as FormArray;
  }

  getFormArrayNotSelect(index: number): FormArray {
    return this.formBody.controls[index].get('arrayNotSelect') as FormArray;
  }

  getFormArraySelected(index: number): FormArray {
    return this.formBody.controls[index].get('arraySelected') as FormArray;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let _viewData = viewData as ProductListFilterViewData;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          filter$: _viewData.filterInput,
        });
      }),
      switchMap(() => this.appDropdownQuery())
    );

    const onInit = onInit$.subscribe((value) => {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        categories: value?.categories || null,
        manufacturers: value?.manufacturers || null,
      });

      this.ngForm = this.initNgForm(value);
    });

    this.subscriptions$.push(onInit);
  }

  ngAfterViewInit(): void {}

  appDropdownQuery() {
    const vars = {
      input: {
        isDeleted: false,
      },
      input2: {
        isDeleted: false,
      },
    };
    let queryGQL = this.appDropdownQueryIns;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const categories = item ? (<any>item).categories.items : null;
        const manufacturers = item ? (<any>item).manufacturers.items : null;
        return {
          categories,
          manufacturers,
        };
      })
    );

    return p$;
  }

  initNgForm(value: any) {
    let arrBody: FormGroup[] = [];
    arrBody.push(
      this.initFormGroup(
        value?.categories || [],
        'categoriesIds',
        'Loại sản phẩm'
      )
    );
    arrBody.push(
      this.initFormGroup(
        value?.manufacturers || [],
        'manufacturersIds',
        'Thương hiệu'
      )
    );

    forItem.forEach((element) => {
      arrBody.push(
        this.initFormGroup(element.value, element.name, element.title)
      );
    });

    return this.fb.group({
      formBody: this.fb.array(arrBody),
    });
  }

  initFormGroup(data: any, name: string, title: string): FormGroup {
    let arrayNotSelect: FormArray = this.fb.array(
      data.map((item: any) =>
        this.fb.group({
          id: new FormControl(item?.id || null),
          name: new FormControl(item.name ? item.name : item),
          value: new FormControl(false),
        })
      )
    );

    let arraySelected: FormArray = this.fb.array([]);

    // for (let item of data) {
    //   let formBody: FormGroup = this.fb.group({
    //     id: new FormControl(item?.id || null),
    //     name: new FormControl(item.name ? item.name : item),
    //     value: new FormControl(false),
    //   });
    //   arrayNotSelect.push(formBody);
    // }

    return this.fb.group({
      name,
      title,
      arrayNotSelect,
      arraySelected,
    });
  }

  sortArr(indexP: number, indexC: number, selected: boolean, nameP: string) {
    let formBodyValue = this.formBody.controls[indexP].value;
    let arrayNotSelectForm = this.getFormArrayNotSelect(indexP);
    let arraySelectedForm = this.getFormArraySelected(indexP);

    let data = {
      ...this.pageViewModel$.getValue().filter$.getValue()
        .productTypeFilterInput,
    };

    let key = formBodyValue.name;
    let metaDatas = { ...data.metaDatas } as MetadataFilter;
    let categoriesIds = [];

    if (selected) {
      let arrNotSelect = arrayNotSelectForm.value;
      if (!!arrNotSelect[indexC]?.id) {
        if (nameP == 'categoriesIds') {
          categoriesIds.push(arrNotSelect[indexC].id);
        } else {
          (metaDatas[key as keyof typeof metaDatas] as string[])?.push(
            arrNotSelect[indexC].id
          );
        }

      } else
        (metaDatas[key as keyof typeof metaDatas] as string[])?.push(
          arrNotSelect[indexC].name
        );

      arraySelectedForm.push(this.fb.group(arrNotSelect[indexC]));
      arrayNotSelectForm.removeAt(indexC);

      let arrSelected = arraySelectedForm.value;
      arrSelected.sort((a: any, b: any) => a.name.localeCompare(b.name));
      arraySelectedForm.patchValue(arrSelected);
    } else {
      let arrSelected = arraySelectedForm.value;

      if (!!formBodyValue.id)
        (metaDatas[key as keyof typeof metaDatas] as string[]) = (
          metaDatas[key as keyof typeof metaDatas] as string[]
        )?.filter((value) => value != arrSelected[indexC].id);
      else
        (metaDatas[key as keyof typeof metaDatas] as string[]) = (
          metaDatas[key as keyof typeof metaDatas] as string[]
        )?.filter((value) => value != arrSelected[indexC].name);

      arrayNotSelectForm.push(arraySelectedForm.at(indexC));
      arraySelectedForm.removeAt(indexC);

      let arrNotSelect = arrayNotSelectForm.value;
      arrNotSelect.sort((a: any, b: any) => a.name.localeCompare(b.name));
      arrayNotSelectForm.patchValue(arrNotSelect);
    }

    const dataSearch = {
      ...data,
      metaDatas,
      ...{ categoriesIds: categoriesIds },
    };

    this.pageViewModel$
      .getValue()
      .filter$.next(new FilterProductModel(dataSearch));
  }

  addStyle(event: any, index: number) {
    const query = document.getElementsByClassName('dropdown-button');
    if (query[index].classList.contains('dropdown-button-2')) {
      query[index].classList.remove('dropdown-button-2');
    } else query[index].classList.add('dropdown-button-2');
  }

  onUserChange(event: ChangeContext) {
    if (event.pointerType === PointerType.Max)
      this.maxValueShow = this.styleMoney.format(event.highValue);
    else if (event.pointerType == PointerType.Min)
      this.minValueShow = this.styleMoney.format(event.value);
  }

  onUserChangeEnd(event: ChangeContext) {
    let data = {
      ...this.pageViewModel$.getValue().filter$.getValue()
        .productTypeFilterInput,
    };

    data.priceFrom = event.value;
    data.priceTo = event.highValue;

    this.pageViewModel$.getValue().filter$.next(new FilterProductModel(data));
  }
}
