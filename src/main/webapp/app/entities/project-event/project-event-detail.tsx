import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project-event.reducer';
import { IProjectEvent } from 'app/shared/model/project-event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProjectEventDetail extends React.Component<IProjectEventDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEventEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rowadApp.projectEvent.detail.title">ProjectEvent</Translate> [<b>{projectEventEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="rowadApp.projectEvent.type">Type</Translate>
              </span>
            </dt>
            <dd>{projectEventEntity.type}</dd>
            <dt>
              <span id="creationDate">
                <Translate contentKey="rowadApp.projectEvent.creationDate">Creation Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={projectEventEntity.creationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="rowadApp.projectEvent.description">Description</Translate>
              </span>
            </dt>
            <dd>{projectEventEntity.description}</dd>
            <dt>
              <Translate contentKey="rowadApp.projectEvent.project">Project</Translate>
            </dt>
            <dd>{projectEventEntity.project ? projectEventEntity.project.id : ''}</dd>
            <dt>
              <Translate contentKey="rowadApp.projectEvent.user">User</Translate>
            </dt>
            <dd>{projectEventEntity.user ? projectEventEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project-event" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/project-event/${projectEventEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ projectEvent }: IRootState) => ({
  projectEventEntity: projectEvent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEventDetail);
