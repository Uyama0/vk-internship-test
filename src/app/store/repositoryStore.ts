import { makeAutoObservable } from 'mobx';

import { RepositoryProps } from '@/helpers/types';

class RepositoriesStore {
  repositories: RepositoryProps[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setRepositories(data: RepositoryProps[]) {
    this.repositories = data;
  }
}

export const repositoriesStore = new RepositoriesStore();
