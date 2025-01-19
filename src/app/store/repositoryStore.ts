import { makeAutoObservable } from 'mobx';

import { RepositoryProps } from '@/helpers';

class RepositoriesStore {
  repositories: RepositoryProps[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setRepositories(data: RepositoryProps[]) {
    this.repositories = data;
  }

  addRepositories(data: RepositoryProps[]) {
    this.repositories = [...this.repositories, ...data];
  }

  deleteRepository(id: number) {
    this.repositories = this.repositories.filter(
      (repository) => repository.id !== id
    );
  }

  editRepository(data: RepositoryProps) {
    const index = this.repositories.findIndex(
      (repository) => repository.id === data.id
    );

    if (index !== -1) {
      this.repositories[index].description = data.description;
      this.repositories[index].login = data.login;
    }
  }
}

export const repositoriesStore = new RepositoriesStore();
