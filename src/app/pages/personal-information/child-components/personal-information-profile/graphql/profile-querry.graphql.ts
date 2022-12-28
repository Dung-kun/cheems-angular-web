import gql from 'graphql-tag';

export const PROFILE_QUERRY = gql`
  query {
	  currentUsers {
      id
      fullname
      email
			phone
			dob
      medias {
        id
        filePath
        fileType,
        fileSize
      }
   }
  }
`
