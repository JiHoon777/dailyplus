import type { ApiClientRoot } from '../ApiClient'
import type { IServerEntityBase } from '@/shared/types'

export abstract class ApiClientEntityBase<
  TEntity extends IServerEntityBase,
  TCreateInput,
  TUpdateInput,
  _IListableInput,
> {
  constructor(
    protected readonly _apiClient: ApiClientRoot,
    protected readonly segmentPrefix: string,
  ) {}

  get fetch() {
    return this._apiClient.fetch
  }

  async getById(id: number): Promise<TEntity> {
    return this._apiClient.fetch.get({ segments: [this.segmentPrefix, id] })
  }

  async create(json: TCreateInput): Promise<TEntity> {
    return this._apiClient.fetch.post(
      { segments: [this.segmentPrefix] },
      {
        json,
      },
    )
  }

  async update(id: number, json: TUpdateInput): Promise<void> {
    return this._apiClient.fetch.patch(
      { segments: [this.segmentPrefix, id] },
      {
        json,
      },
    )
  }

  async delete(id: number): Promise<void> {
    return this._apiClient.fetch.delete({
      segments: [this.segmentPrefix, id],
    })
  }
}
