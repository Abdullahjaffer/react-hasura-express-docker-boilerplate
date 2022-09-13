import apolloClient from '@/apolloClient';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { ICreateProjectInput } from './../services/Interfaces/IProject';

const CREATE_PROJECT = gql`
  mutation MyMutation($description: String = "", $isPrivate: Boolean = false, $name: String = "") {
    insert_projects(objects: { name: $name, isPrivate: $isPrivate, description: $description }) {
      affected_rows
    }
  }
`;

const USER_PROJECTS_SUBSCRIPTION = gql`
  subscription USERPROJECTSSUBSCRIPTION {
    projects(order_by: { created_at: desc }) {
      id
      name
      owner
      isPrivate
      description
      updated_at
      created_at
      ownerDetails {
        name
      }
    }
  }
`;

export default function useProjectModel() {
  const userProjects = useSubscription(USER_PROJECTS_SUBSCRIPTION, {
    client: apolloClient,
  });
  const [createProjectCall, createProjectProps] = useMutation(CREATE_PROJECT, {
    client: apolloClient,
  });

  console.log(userProjects);

  const createProject = ({ description, name, isPrivate }: ICreateProjectInput) =>
    createProjectCall({
      variables: {
        description,
        name,
        isPrivate,
      },
    });

  return {
    createProject,
    loading: createProjectProps.loading,
    projects: {
      loading: userProjects?.loading,
      data: userProjects?.data?.projects,
    },
  };
}
