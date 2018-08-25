import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project-file.reducer';
import { IProjectFile } from 'app/shared/model/project-file.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectFileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProjectFileDetail extends React.Component<IProjectFileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectFileEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="rowadApp.projectFile.detail.title">ProjectFile</Translate> [<b>{projectFileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="rowadApp.projectFile.name">Name</Translate>
              </span>
            </dt>
            <dd>{projectFileEntity.name}</dd>
            <dt>
              <span id="path">
                <Translate contentKey="rowadApp.projectFile.path">Path</Translate>
              </span>
            </dt>
            <dd>{projectFileEntity.path}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="rowadApp.projectFile.type">Type</Translate>
              </span>
            </dt>
            <dd>{projectFileEntity.type}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="rowadApp.projectFile.content">Content</Translate>
              </span>
            </dt>
            <dd>
              {projectFileEntity.content ? (
                <div>
                  <a onClick={openFile(projectFileEntity.contentContentType, projectFileEntity.content)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {projectFileEntity.contentContentType}, {byteSize(projectFileEntity.content)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="textContent">
                <Translate contentKey="rowadApp.projectFile.textContent">Text Content</Translate>
              </span>
            </dt>
            <dd>{projectFileEntity.textContent}</dd>
            <dt>
              <Translate contentKey="rowadApp.projectFile.project">Project</Translate>
            </dt>
            <dd>{projectFileEntity.project ? projectFileEntity.project.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project-file" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/project-file/${projectFileEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ projectFile }: IRootState) => ({
  projectFileEntity: projectFile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectFileDetail);
