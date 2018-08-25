import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IProjectUpdateState {
  isNew: boolean;
  teamId: number;
}

export class ProjectUpdate extends React.Component<IProjectUpdateProps, IProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      teamId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTeams();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { projectEntity } = this.props;
      const entity = {
        ...projectEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/project');
  };

  render() {
    const { projectEntity, teams, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rowadApp.project.home.createOrEditLabel">
              <Translate contentKey="rowadApp.project.home.createOrEditLabel">Create or edit a Project</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : projectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="rowadApp.project.title">Title</Translate>
                  </Label>
                  <AvField id="project-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="shortDescriptionLabel" for="shortDescription">
                    <Translate contentKey="rowadApp.project.shortDescription">Short Description</Translate>
                  </Label>
                  <AvField id="project-shortDescription" type="text" name="shortDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="details">
                    <Translate contentKey="rowadApp.project.details">Details</Translate>
                  </Label>
                  <AvField id="project-details" type="text" name="details" />
                </AvGroup>
                <AvGroup>
                  <Label id="rendementLabel" for="rendement">
                    <Translate contentKey="rowadApp.project.rendement">Rendement</Translate>
                  </Label>
                  <AvField id="project-rendement" type="number" className="form-control" name="rendement" />
                </AvGroup>
                <AvGroup>
                  <Label id="budgetLabel" for="budget">
                    <Translate contentKey="rowadApp.project.budget">Budget</Translate>
                  </Label>
                  <AvField id="project-budget" type="number" className="form-control" name="budget" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="rowadApp.project.startDate">Start Date</Translate>
                  </Label>
                  <AvField id="project-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="estimatedEndDateLabel" for="estimatedEndDate">
                    <Translate contentKey="rowadApp.project.estimatedEndDate">Estimated End Date</Translate>
                  </Label>
                  <AvField id="project-estimatedEndDate" type="date" className="form-control" name="estimatedEndDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="rowadApp.project.status">Status</Translate>
                  </Label>
                  <AvField id="project-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="cibleLabel" for="cible">
                    <Translate contentKey="rowadApp.project.cible">Cible</Translate>
                  </Label>
                  <AvField id="project-cible" type="text" name="cible" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    <Translate contentKey="rowadApp.project.type">Type</Translate>
                  </Label>
                  <AvField id="project-type" type="text" name="type" />
                </AvGroup>
                <AvGroup>
                  <Label for="team.id">
                    <Translate contentKey="rowadApp.project.team">Team</Translate>
                  </Label>
                  <AvInput id="project-team" type="select" className="form-control" name="team.id">
                    <option value="" key="0" />
                    {teams
                      ? teams.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/project" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  teams: storeState.team.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating
});

const mapDispatchToProps = {
  getTeams,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectUpdate);
