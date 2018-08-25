import { Moment } from 'moment';
import { IProject } from 'app/shared/model//project.model';
import { IUser } from './user.model';

export interface IProjectEvent {
  id?: number;
  type?: string;
  creationDate?: Moment;
  description?: string;
  project?: IProject;
  user?: IUser;
}

export const defaultValue: Readonly<IProjectEvent> = {};
