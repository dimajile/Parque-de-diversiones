import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PuestoDeComidas, PuestoDeComidasRelations} from '../models';

export class PuestoDeComidasRepository extends DefaultCrudRepository<
  PuestoDeComidas,
  typeof PuestoDeComidas.prototype.id,
  PuestoDeComidasRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PuestoDeComidas, dataSource);
  }
}
