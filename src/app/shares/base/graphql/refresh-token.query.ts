import { Injectable } from '@angular/core';
import { Query, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenQuery extends Query {
  override document: DocumentNode | TypedDocumentNode<{}, EmptyObject> =
    REFRESH_TOKEN_QUERY;
}

export const REFRESH_TOKEN_QUERY = gql`
  query ($refreshToken: String) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      status
      expireAt
    }
  }
`;
