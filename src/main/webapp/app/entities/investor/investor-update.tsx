import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './investor.reducer';
import { IInvestor } from 'app/shared/model/investor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvestorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IInvestorUpdateState {
  isNew: boolean;
  userId: number;
}

export class InvestorUpdate extends React.Component<IInvestorUpdateProps, IInvestorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { investorEntity } = this.props;
      const entity = {
        ...investorEntity,
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
    this.props.history.push('/entity/investor');
  };

  render() {
    const { investorEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rowadApp.investor.home.createOrEditLabel">
              <Translate contentKey="rowadApp.investor.home.createOrEditLabel">Create or edit a Investor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : investorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="investor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="rowadApp.investor.address">Address</Translate>
                  </Label>
                  <AvField id="investor-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="rowadApp.investor.phone">Phone</Translate>
                  </Label>
                  <AvField id="investor-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateOfBirthLabel" for="dateOfBirth">
                    <Translate contentKey="rowadApp.investor.dateOfBirth">Date Of Birth</Translate>
                  </Label>
                  <AvField id="investor-dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
                </AvGroup>
                <AvGroup>
                  <Label id="shortDescriptionLabel" for="shortDescription">
                    <Translate contentKey="rowadApp.investor.shortDescription">Short Description</Translate>
                  </Label>
                  <AvField id="investor-shortDescription" type="text" name="shortDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="rowadApp.investor.description">Description</Translate>
                  </Label>
                  <AvField id="investor-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="rowadApp.investor.user">User</Translate>
                  </Label>
                  <AvInput id="investor-user" type="select" className="form-control" name="user.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/investor" replace color="info">
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
  users: storeState.userManagement.users,
  investorEntity: storeState.investor.entity,
  loading: storeState.investor.loading,
  updating: storeState.investor.updating
});

const mapDispatchToProps = {
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
)(InvestorUpdate);
