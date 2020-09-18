export const login = ({ email, password }: { email: string; password: string }) => /* GraphQL */ `
  mutation 
  {  login(email: "${email}", password: "${password}") {
      user {
        id
        first_name
        last_name
        email
        type
      }
      token
    }}
  
`;

export const signup = ({
  first_name,
  last_name,
  email,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => /* GraphQL */ `
  mutation {
      signup(first_name:"${first_name}", last_name: "${last_name}", email: "${email}", password: "${password}") {
 
      user {
        id
        first_name
        last_name
        email
        type
      }
      token
    }}
  
`;

export const me = /* GraphQL */ `
  query {
    me {
      first_name
      last_name
    }
  }
`;

export const createDraft = ({ title, content }: { title: string; content: string }) => /* GraphQL */ `
  mutation {
    createDraft(data: { title: "${title}", content: "${content}" }) {
      title
      published
    }
  }
`;
