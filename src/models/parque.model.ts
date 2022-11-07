import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Planes} from './planes.model';

@model()
export class Parque extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'number',
    required: true,
  })
  max_visitantes: number;

  @property({
    type: 'string',
    required: true,
  })
  logotipo: string;

  @property({
    type: 'string',
    required: true,
  })
  mapa: string;

  @property({
    type: 'string',
    required: true,
  })
  eslogan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasOne(() => Planes)
  planes: Planes;

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
