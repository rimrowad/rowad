import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProjectDetail extends React.Component<IProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rowadApp.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="rowadApp.project.title">Title</Translate>
              </span>
            </dt>
            <dd>{projectEntity.title}</dd>
            <dt>
              <span id="shortDescription">
                <Translate contentKey="rowadApp.project.shortDescription">Short Description</Translate>
              </span>
            </dt>
            <dd>{projectEntity.shortDescription}</dd>
            <dt>
              <span id="details">
                <Translate contentKey="rowadApp.project.details">Details</Translate>
              </span>
            </dt>
            <dd>{projectEntity.details}</dd>
            <dt>
              <span id="rendement">
                <Translate contentKey="rowadApp.project.rendement">Rendement</Translate>
              </span>
            </dt>
            <dd>{projectEntity.rendement}</dd>
            <dt>
              <span id="budget">
                <Translate contentKey="rowadApp.project.budget">Budget</Translate>
              </span>
            </dt>
            <dd>{projectEntity.budget}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="rowadApp.project.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="estimatedEndDate">
                <Translate contentKey="rowadApp.project.estimatedEndDate">Estimated End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.estimatedEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="rowadApp.project.status">Status</Translate>
              </span>
            </dt>
            <dd>{projectEntity.status}</dd>
            <dt>
              <span id="cible">
                <Translate contentKey="rowadApp.project.cible">Cible</Translate>
              </span>
            </dt>
            <dd>{projectEntity.cible}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="rowadApp.project.type">Type</Translate>
              </span>
            </dt>
            <dd>{projectEntity.type}</dd>
            <dt>
              <Translate contentKey="rowadApp.project.team">Team</Translate>
            </dt>
            <dd>{projectEntity.team ? projectEntity.team.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/project/${projectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
