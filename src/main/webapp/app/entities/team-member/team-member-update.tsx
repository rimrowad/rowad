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
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './team-member.reducer';
import { ITeamMember } from 'app/shared/model/team-member.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeamMemberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITeamMemberUpdateState {
  isNew: boolean;
  teamId: number;
  userId: number;
}

export class TeamMemberUpdate extends React.Component<ITeamMemberUpdateProps, ITeamMemberUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      teamId: 0,
      userId: 0,
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
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { teamMemberEntity } = this.props;
      const entity = {
        ...teamMemberEntity,
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
    this.props.history.push('/entity/team-member');
  };

  render() {
    const { teamMemberEntity, teams, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rowadApp.teamMember.home.createOrEditLabel">
              <Translate contentKey="rowadApp.teamMember.home.createOrEditLabel">Create or edit a TeamMember</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teamMemberEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="team-member-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="rowadApp.teamMember.address">Address</Translate>
                  </Label>
                  <AvField id="team-member-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="rowadApp.teamMember.phone">Phone</Translate>
                  </Label>
                  <AvField id="team-member-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateOfBirthLabel" for="dateOfBirth">
                    <Translate contentKey="rowadApp.teamMember.dateOfBirth">Date Of Birth</Translate>
                  </Label>
                  <AvField id="team-member-dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
                </AvGroup>
                <AvGroup>
                  <Label id="diplomeLabel" for="diplome">
                    <Translate contentKey="rowadApp.teamMember.diplome">Diplome</Translate>
                  </Label>
                  <AvField id="team-member-diplome" type="text" name="diplome" />
                </AvGroup>
                <AvGroup>
                  <Label id="resumeLabel" for="resume">
                    <Translate contentKey="rowadApp.teamMember.resume">Resume</Translate>
                  </Label>
                  <AvField id="team-member-resume" type="text" name="resume" />
                </AvGroup>
                <AvGroup>
                  <Label for="team.id">
                    <Translate contentKey="rowadApp.teamMember.team">Team</Translate>
                  </Label>
                  <AvInput id="team-member-team" type="select" className="form-control" name="team.id">
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
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="rowadApp.teamMember.user">User</Translate>
                  </Label>
                  <AvInput id="team-member-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/team-member" replace color="info">
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
  users: storeState.userManagement.users,
  teamMemberEntity: storeState.teamMember.entity,
  loading: storeState.teamMember.loading,
  updating: storeState.teamMember.updating
});

const mapDispatchToProps = {
  getTeams,
  getUsers,
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
)(TeamMemberUpdate);
