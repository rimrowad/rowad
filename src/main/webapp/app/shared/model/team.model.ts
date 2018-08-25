import { Moment } from 'moment';

export interface ITeam {
  id?: number;
  name?: string;
  creationDate?: Moment;
  shortDescription?: string;
  description?: string;
}

export const defaultValue: Readonly<ITeam> = {};
