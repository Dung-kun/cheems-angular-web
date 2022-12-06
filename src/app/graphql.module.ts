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

const uri = 'https://cheems-store.onrender.com/graphql'; // <-- add the URL of the GraphQL server here
const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRHVuZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGVlbS1zdG9yZSIsImF1ZCI6ImNoZWVtLXN0b3JlIiwiYXV0aF90aW1lIjoxNjcwMDM0MzA2LCJ1c2VyX2lkIjoiMkg3clFCTFFWVVdoRVFkbk5vYW10bHp2aE5NMiIsInN1YiI6IjJIN3JRQkxRVlVXaEVRZG5Ob2FtdGx6dmhOTTIiLCJpYXQiOjE2NzAwMzQzMDYsImV4cCI6MTY3MDAzNzkwNiwiZW1haWwiOiIxOTUyMjMzOUBnbS51aXQuZWR1LnZuIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiMTk1MjIzMzlAZ20udWl0LmVkdS52biJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.okKtZ8-h_RwDGfivf4kSjZXnyaLGark-R-HAc7JpIE935HBpeFUYz4sM73fa4kMjYTqExGm9fApoGePEMKfnFh1nHYA9-rz1Yup4YVGif1iEkSkZuHg9OVnhmxgMjiiWNX2IYoOgh9KIqPqIFgFU9R7TE9IroR2VqiqiWS5zNG8o6WbvaceJ942tAVACbbuQW9BlH7u4QZMJRsPt42t-ZQHJqo5QyB9Gxl_cjIS42IU0oyCxLMA0KEjEV0Z3uYT2OziksU3X4yrEU30bxMdKkoVzzah66CG6-vEsAZ1HpiiDsR0RHULs7nge5uP-x9U7PzJwqnoq2g-zZv_9z_opew';

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  operation.setContext({
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}` || null),
  });

  return forward(operation);
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
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
  ],
})
export class GraphQLModule {}

function setContext(
  _arg0: (operation: any, context: any) => { headers: { Accept: string } }
) {
  throw new Error('Function not implemented.');
}
