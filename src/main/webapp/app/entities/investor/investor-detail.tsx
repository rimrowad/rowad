import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './investor.reducer';
import { IInvestor } from 'app/shared/model/investor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvestorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class InvestorDetail extends React.Component<IInvestorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { investorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rowadApp.investor.detail.title">Investor</Translate> [<b>{investorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">
                <Translate contentKey="rowadApp.investor.address">Address</Translate>
              </span>
            </dt>
            <dd>{investorEntity.address}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="rowadApp.investor.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{investorEntity.phone}</dd>
            <dt>
              <span id="dateOfBirth">
                <Translate contentKey="rowadApp.investor.dateOfBirth">Date Of Birth</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={investorEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="shortDescription">
                <Translate contentKey="rowadApp.investor.shortDescription">Short Description</Translate>
              </span>
            </dt>
            <dd>{investorEntity.shortDescription}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="rowadApp.investor.description">Description</Translate>
              </span>
            </dt>
            <dd>{investorEntity.description}</dd>
            <dt>
              <Translate contentKey="rowadApp.investor.user">User</Translate>
            </dt>
            <dd>{investorEntity.user ? investorEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/investor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/investor/${investorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ investor }: IRootState) => ({
  investorEntity: investor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorDetail);
