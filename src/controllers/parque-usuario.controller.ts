import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parque,
  Usuario,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueUsuarioController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Parque.prototype.id,
  ): Promise<Usuario> {
    return this.parqueRepository.usuario(id);
  }
}
