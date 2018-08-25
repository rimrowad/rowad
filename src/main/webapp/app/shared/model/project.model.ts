import { Moment } from 'moment';
import { ITeam } from 'app/shared/model//team.model';

export interface IProject {
  id?: number;
  title?: string;
  shortDescription?: string;
  details?: string;
  rendement?: number;
  budget?: number;
  startDate?: Moment;
  estimatedEndDate?: Moment;
  status?: string;
  cible?: string;
  type?: string;
  team?: ITeam;
}

export const defaultValue: Readonly<IProject> = {};
