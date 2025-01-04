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
    protected readonly segmentPrefix: string,
  ) {}

  get fetch() {
    return this._apiClient.fetch
  }

  async getById(id: number): Promise<TEntity> {
    return this._apiClient.fetch.get({
      url: { segments: [this.segmentPrefix, id] },
    })
  }

  async create(body: TCreateInput): Promise<TEntity> {
    return this._apiClient.fetch.post({
      url: { segments: [this.segmentPrefix] },
      body,
    })
  }

  async update(id: number, body: TUpdateInput): Promise<void> {
    return this._apiClient.fetch.patch({
      url: { segments: [this.segmentPrefix, id] },
      body,
    })
  }

  async delete(id: number): Promise<void> {
    return this._apiClient.fetch.delete({
      url: { segments: [this.segmentPrefix, id] },
    })
  }
}
