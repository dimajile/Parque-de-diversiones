import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parque, ParqueRelations, Usuario, Planes} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PlanesRepository} from './planes.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Parque.prototype.id>;

  public readonly planes: HasOneRepositoryFactory<Planes, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(Parque, dataSource);
    this.planes = this.createHasOneRepositoryFactoryFor('planes', planesRepositoryGetter);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
