import {Entity, model, property} from '@loopback/repository';

@model()
export class PuestoDeComidas extends Entity {
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
  imagen: string;


  constructor(data?: Partial<PuestoDeComidas>) {
    super(data);
  }
}

export interface PuestoDeComidasRelations {
  // describe navigational properties here
}

export type PuestoDeComidasWithRelations = PuestoDeComidas & PuestoDeComidasRelations;
