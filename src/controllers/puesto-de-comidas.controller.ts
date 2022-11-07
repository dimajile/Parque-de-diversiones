import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PuestoDeComidas} from '../models';
import {PuestoDeComidasRepository} from '../repositories';

export class PuestoDeComidasController {
  constructor(
    @repository(PuestoDeComidasRepository)
    public puestoDeComidasRepository : PuestoDeComidasRepository,
  ) {}

  @post('/puesto-de-comidas')
  @response(200, {
    description: 'PuestoDeComidas model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuestoDeComidas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDeComidas, {
            title: 'NewPuestoDeComidas',
            exclude: ['id'],
          }),
        },
      },
    })
    puestoDeComidas: Omit<PuestoDeComidas, 'id'>,
  ): Promise<PuestoDeComidas> {
    return this.puestoDeComidasRepository.create(puestoDeComidas);
  }

  @get('/puesto-de-comidas/count')
  @response(200, {
    description: 'PuestoDeComidas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuestoDeComidas) where?: Where<PuestoDeComidas>,
  ): Promise<Count> {
    return this.puestoDeComidasRepository.count(where);
  }

  @get('/puesto-de-comidas')
  @response(200, {
    description: 'Array of PuestoDeComidas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuestoDeComidas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuestoDeComidas) filter?: Filter<PuestoDeComidas>,
  ): Promise<PuestoDeComidas[]> {
    return this.puestoDeComidasRepository.find(filter);
  }

  @patch('/puesto-de-comidas')
  @response(200, {
    description: 'PuestoDeComidas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDeComidas, {partial: true}),
        },
      },
    })
    puestoDeComidas: PuestoDeComidas,
    @param.where(PuestoDeComidas) where?: Where<PuestoDeComidas>,
  ): Promise<Count> {
    return this.puestoDeComidasRepository.updateAll(puestoDeComidas, where);
  }

  @get('/puesto-de-comidas/{id}')
  @response(200, {
    description: 'PuestoDeComidas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuestoDeComidas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PuestoDeComidas, {exclude: 'where'}) filter?: FilterExcludingWhere<PuestoDeComidas>
  ): Promise<PuestoDeComidas> {
    return this.puestoDeComidasRepository.findById(id, filter);
  }

  @patch('/puesto-de-comidas/{id}')
  @response(204, {
    description: 'PuestoDeComidas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoDeComidas, {partial: true}),
        },
      },
    })
    puestoDeComidas: PuestoDeComidas,
  ): Promise<void> {
    await this.puestoDeComidasRepository.updateById(id, puestoDeComidas);
  }

  @put('/puesto-de-comidas/{id}')
  @response(204, {
    description: 'PuestoDeComidas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() puestoDeComidas: PuestoDeComidas,
  ): Promise<void> {
    await this.puestoDeComidasRepository.replaceById(id, puestoDeComidas);
  }

  @del('/puesto-de-comidas/{id}')
  @response(204, {
    description: 'PuestoDeComidas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.puestoDeComidasRepository.deleteById(id);
  }
}
