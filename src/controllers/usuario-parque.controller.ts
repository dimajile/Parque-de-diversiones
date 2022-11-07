import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Parque,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioParqueController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.usuarioRepository.parques(id).find(filter);
  }

  @post('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) parque: Omit<Parque, 'id'>,
  ): Promise<Parque> {
    return this.usuarioRepository.parques(id).create(parque);
  }

  @patch('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuario.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.usuarioRepository.parques(id).patch(parque, where);
  }

  @del('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuario.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.usuarioRepository.parques(id).delete(where);
  }
}
