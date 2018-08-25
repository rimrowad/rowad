import { Moment } from 'moment';
import { IUser } from './user.model';

export interface IInvestor {
  id?: number;
  address?: string;
  phone?: string;
  dateOfBirth?: Moment;
  shortDescription?: string;
  description?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IInvestor> = {};
