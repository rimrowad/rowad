import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TeamMember from './team-member';
import TeamMemberDetail from './team-member-detail';
import TeamMemberUpdate from './team-member-update';
import TeamMemberDeleteDialog from './team-member-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TeamMemberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TeamMemberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TeamMemberDetail} />
      <ErrorBoundaryRoute path={match.url} component={TeamMember} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TeamMemberDeleteDialog} />
  </>
);

export default Routes;
