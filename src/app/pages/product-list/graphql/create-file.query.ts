import { Injectable } from '@angular/core';
import { Mutation, Query, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreateFileMutation extends Mutation {
  override document: DocumentNode | TypedDocumentNode<{}, EmptyObject> = CREATE_FILE;
}

export const CREATE_FILE = gql`
mutation($input: CreateProductTypeInput, $files: [Upload!]) {
  createProductType(input: $input,files: $files) {
    productTypes {
      name
      description
    }
  }
}
`
