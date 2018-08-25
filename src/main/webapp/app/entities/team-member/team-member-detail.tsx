import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './team-member.reducer';
import { ITeamMember } from 'app/shared/model/team-member.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeamMemberDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TeamMemberDetail extends React.Component<ITeamMemberDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teamMemberEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rowadApp.teamMember.detail.title">TeamMember</Translate> [<b>{teamMemberEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">
                <Translate contentKey="rowadApp.teamMember.address">Address</Translate>
              </span>
            </dt>
            <dd>{teamMemberEntity.address}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="rowadApp.teamMember.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{teamMemberEntity.phone}</dd>
            <dt>
              <span id="dateOfBirth">
                <Translate contentKey="rowadApp.teamMember.dateOfBirth">Date Of Birth</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={teamMemberEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="diplome">
                <Translate contentKey="rowadApp.teamMember.diplome">Diplome</Translate>
              </span>
            </dt>
            <dd>{teamMemberEntity.diplome}</dd>
            <dt>
              <span id="resume">
                <Translate contentKey="rowadApp.teamMember.resume">Resume</Translate>
              </span>
            </dt>
            <dd>{teamMemberEntity.resume}</dd>
            <dt>
              <Translate contentKey="rowadApp.teamMember.team">Team</Translate>
            </dt>
            <dd>{teamMemberEntity.team ? teamMemberEntity.team.id : ''}</dd>
            <dt>
              <Translate contentKey="rowadApp.teamMember.user">User</Translate>
            </dt>
            <dd>{teamMemberEntity.user ? teamMemberEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/team-member" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/team-member/${teamMemberEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ teamMember }: IRootState) => ({
  teamMemberEntity: teamMember.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamMemberDetail);
