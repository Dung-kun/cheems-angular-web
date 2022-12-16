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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OGI1NmM2NmVhYmIwZDlhNmJhOGNhMzMwMTU2NGEyMzhlYWZjODciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYWRtaW4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2hlZW0tc3RvcmUiLCJhdWQiOiJjaGVlbS1zdG9yZSIsImF1dGhfdGltZSI6MTY3MDk4NzUxMSwidXNlcl9pZCI6ImZhcXAyZVdIWUdiUmpuaXNQVG83QW1YWG9KTzIiLCJzdWIiOiJmYXFwMmVXSFlHYlJqbmlzUFRvN0FtWFhvSk8yIiwiaWF0IjoxNjcwOTg3NTExLCJleHAiOjE2NzA5OTExMTEsImVtYWlsIjoiMTk1MjA5NzZAZ20udWl0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjE5NTIwOTc2QGdtLnVpdC5lZHUudm4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GhYTFgX_EA3KgH1gdHGgyT4wIBRiAqknAqef-b_HTC8YOQzUsVSt6t174jPfjZ-mg6CsN5mk5Ii52qLCVBrkoBU7kYE6IT7joyTu4FpPqtS5SXN8JqVtUcUz8kFTiO27jN4U5Ex5RzM5DIbdQb7QaomydD1G6Ehn8PaLk64W7P99PxxpNR9DdrAd0qYVOY21CK2vx4QfGKS4b_sdcBIaOoFOis_bX_dE_6xBA1wy_ItZ-2vRJW7bhFybF0SbqkdK4YWSDYUHe0AaueY-IYbzRH_Ykuw-T6oR3pvqbaV3L9WKrayVR55501cbs5VRtUNygWZrX7VQkGFtE5LHqLDKQg';

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
