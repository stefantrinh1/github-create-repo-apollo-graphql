import React from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';

const githubQuery = gql`
  {
    viewer {
      repositories(first: 40) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

const name = 'github-create-repo-apollo-graphql';
const description = 'test description';
const ownerId = '';
const visibility = 'PRIVATE';

const payload = {
  name,
  description,
  ownerId,
  visibility,
};

// mutation myFirstMutation ($input: CreateRepositoryInput!){
//     createRepository(input: $input) {
//       clientMutationId
//     }
//   }
// const ADD_STAR = gql`
//   mutation AddStar($repositoryId: ID!) {
//     addStar(input: { starrableId: $repositoryId }) {
//       starrable {
//         id
//         viewerHasStarred
//       }
//     }
//   }
// `;

const CREATE_REPO_QUERY = gql`
  # Increments a back-end counter and gets its resulting value
  mutation CreateRepositoryInput(
    $name: String!
    $ownerId: String!
    $description: String!
    $visibility: String!
  ) {
    createRepository(
      input: {
        name: $name
        ownerId: $ownerId
        description: $description
        visibility: $visibility
      }
    ) {
      repository {
        name
        description
        visibility
      }
    }
  }
`;

const Home = () => {
  //   const { loading, error, data } = useQuery(githubQuery);
  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_REPO_QUERY,
    { variables: { name, ownerId, description, visibility } }
  );

  // name: $name,  description:$description, ownerId: $ownerId
  //   const createRepo = () => {
  //     console.log(data);
  //     if (loading) return <p>Loading...</p>;
  //     if (error) return <p>Error, something went wrong...</p>;
  //   };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (data) {
    return <div className='home container'>request made</div>;
  } else {
    return (
      <div className='home container'>
        <h1>Learning Apollo Client</h1>
        <button onClick={() => mutateFunction()}>click me</button>
      </div>
    );
  }
};

export default Home;

// (
//     $name: name
//     $ownerId: ownerId
//     $description: description
//     $visibility: visibility
//   )

// input: {
//     name: $name
//     ownerId: $ownerId
//     description: $description
//     visibility: $visibility
//   }
