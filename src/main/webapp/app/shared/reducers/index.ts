import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import parameter, {
  ParameterState
} from 'app/entities/parameter/parameter.reducer';
// prettier-ignore
import team, {
  TeamState
} from 'app/entities/team/team.reducer';
// prettier-ignore
import teamMember, {
  TeamMemberState
} from 'app/entities/team-member/team-member.reducer';
// prettier-ignore
import investor, {
  InvestorState
} from 'app/entities/investor/investor.reducer';
// prettier-ignore
import projectFile, {
  ProjectFileState
} from 'app/entities/project-file/project-file.reducer';
// prettier-ignore
import projectEvent, {
  ProjectEventState
} from 'app/entities/project-event/project-event.reducer';
// prettier-ignore
import project, {
  ProjectState
} from 'app/entities/project/project.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly parameter: ParameterState;
  readonly team: TeamState;
  readonly teamMember: TeamMemberState;
  readonly investor: InvestorState;
  readonly projectFile: ProjectFileState;
  readonly projectEvent: ProjectEventState;
  readonly project: ProjectState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  parameter,
  team,
  teamMember,
  investor,
  projectFile,
  projectEvent,
  project,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
