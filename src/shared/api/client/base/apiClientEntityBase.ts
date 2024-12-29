import type { ApiClient } from '../ApiClient'
import type { Database } from 'database.types'

// Todo: Entity 공용 CRUD 타입 맞추기 빡세다.
// Todo: 일단 type error ignore 하고 시간될 때 연구해보자.
export abstract class ApiClientEntityBase<
  TableName extends keyof Database['public']['Tables'],
  TEntity extends Database['public']['Tables'][TableName]['Row'],
  TCreateInput extends Database['public']['Tables'][TableName]['Insert'],
  TUpdateInput extends Database['public']['Tables'][TableName]['Update'],
  _IListableInput,
> {
  constructor(
    protected readonly _apiClient: ApiClient,
    protected readonly _tableName: TableName,
  ) {}

  protected get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async getById(id: number): Promise<TEntity> {
    const { data, error } = await this.supabaseClient
      .from(this._tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    // @ts-ignore
    return data
  }

  async create(input: TCreateInput): Promise<TEntity> {
    const { data, error } = await this.supabaseClient
      .from(this._tableName)
      // @ts-ignore
      .insert([input])
      .select('*')
      .single()

    if (error) {
      throw error
    }

    // @ts-ignore
    return data
  }

  async update(id: number, input: TUpdateInput): Promise<TEntity> {
    const { data, error } = await this.supabaseClient
      .from(this._tableName)
      // @ts-ignore
      .update(input)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    // @ts-ignore
    return data
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabaseClient
      .from(this._tableName)
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }
  }
}
