import { Moment } from 'moment';
import { ITeam } from 'app/shared/model//team.model';
import { IUser } from './user.model';

export interface ITeamMember {
  id?: number;
  address?: string;
  phone?: string;
  dateOfBirth?: Moment;
  diplome?: string;
  resume?: string;
  team?: ITeam;
  user?: IUser;
}

export const defaultValue: Readonly<ITeamMember> = {};
