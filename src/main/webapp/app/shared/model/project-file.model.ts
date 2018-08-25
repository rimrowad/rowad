import { IProject } from 'app/shared/model//project.model';

export interface IProjectFile {
  id?: number;
  name?: string;
  path?: string;
  type?: string;
  contentContentType?: string;
  content?: any;
  textContent?: any;
  project?: IProject;
}

export const defaultValue: Readonly<IProjectFile> = {};
