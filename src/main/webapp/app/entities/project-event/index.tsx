import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProjectEvent from './project-event';
import ProjectEventDetail from './project-event-detail';
import ProjectEventUpdate from './project-event-update';
import ProjectEventDeleteDialog from './project-event-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProjectEventUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProjectEventUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProjectEventDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProjectEvent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProjectEventDeleteDialog} />
  </>
);

export default Routes;
