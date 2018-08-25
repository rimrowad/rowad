import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Parameter from './parameter';
import Team from './team';
import TeamMember from './team-member';
import Investor from './investor';
import ProjectFile from './project-file';
import ProjectEvent from './project-event';
import Project from './project';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/parameter`} component={Parameter} />
      <ErrorBoundaryRoute path={`${match.url}/team`} component={Team} />
      <ErrorBoundaryRoute path={`${match.url}/team-member`} component={TeamMember} />
      <ErrorBoundaryRoute path={`${match.url}/investor`} component={Investor} />
      <ErrorBoundaryRoute path={`${match.url}/project-file`} component={ProjectFile} />
      <ErrorBoundaryRoute path={`${match.url}/project-event`} component={ProjectEvent} />
      <ErrorBoundaryRoute path={`${match.url}/project`} component={Project} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
