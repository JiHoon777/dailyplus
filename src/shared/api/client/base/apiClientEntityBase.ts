import type { ApiClient } from '../ApiClient'
import type { IServerEntityBase } from '@/shared/types'

export abstract class ApiClientEntityBase<
  TEntity extends IServerEntityBase,
  TCreateInput,
  TUpdateInput,
  _IListableInput,
> {
  constructor(
    protected readonly _apiClient: ApiClient,
    protected readonly basePath: string,
  ) {}

  async getById(id: number): Promise<TEntity> {
    return this._apiClient.fetch.get({
      url: { segments: [this.basePath, id] },
    })
  }

  async create(body: TCreateInput): Promise<TEntity> {
    return this._apiClient.fetch.post({
      url: { segments: [this.basePath] },
      body,
    })
  }

  async update(id: number, body: TUpdateInput): Promise<void> {
    return this._apiClient.fetch.patch({
      url: { segments: [this.basePath, id] },
      body,
    })
  }

  async delete(id: number): Promise<void> {
    return this._apiClient.fetch.delete({
      url: { segments: [this.basePath, id] },
    })
  }
}
