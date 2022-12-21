import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { extractFiles } from 'extract-files';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './shares/base/services/auth.service';
import { GC_AUTH_TOKEN } from './shares/base/constants/constants';

const uri = 'https://cheems-store.onrender.com/graphql'; // <-- add the URL of the GraphQL server here


// const authMiddleware = new ApolloLink((operation: any, forward: any) => {
//   operation.setContext({
//     headers: new HttpHeaders().set('Authorization', `Bearer ${token}` || null),
//   });

//   return forward(operation);
// });

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const token = localStorage.getItem(GC_AUTH_TOKEN);

  return {
    link: httpLink.create({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}` || null
      ),
      uri,
      extractFiles,
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    AuthService
  ],
})
export class GraphQLModule {}

