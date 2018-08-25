import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/parameter">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.parameter" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/team">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.team" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/team-member">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.teamMember" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/investor">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.investor" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/project-file">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.projectFile" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/project-event">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.projectEvent" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/project">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.project" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
