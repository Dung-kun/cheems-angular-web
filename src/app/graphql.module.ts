import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from './shares/base/services/auth.service';
import { GC_AUTH_TOKEN } from './shares/base/constants/constants';
import { environment } from '../environments/environment';
import { setContext } from '@apollo/client/link/context';


// const authMiddleware = new ApolloLink((operation: any, forward: any) => {
//   operation.setContext({
//     headers: new HttpHeaders().set('Authorization', `Bearer ${token}` || null),
//   });

//   return forward(operation);
// });
const uri = environment.GRAPHQL_URI;

export function createApollo(httpLink: HttpLink, authService: AuthService): ApolloClientOptions<any> {

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));


  const auth = setContext((operation, context) => {
    const token = localStorage.getItem(GC_AUTH_TOKEN);

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
  // return {
  //   link: httpLink.create({
  //     headers: new HttpHeaders().set(
  //       'Authorization',
  //       `Bearer ${token}` || null
  //     ),
  //     uri: environment.GRAPHQL_URI,
  //     extractFiles,
  //   }),
  //   cache: new InMemoryCache(),
  // };
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


