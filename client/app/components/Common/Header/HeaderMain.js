import React from 'react';
import Item, { ItemGroup } from '@atlaskit/item';
import DropList from '@atlaskit/droplist';
import Avatar from '@atlaskit/avatar';

const HeaderMain = props => (
  <header className="main-header">
    <div className="container-fluid">
      <div className="row">

        <div className="col-lg-8 col-xs-12">
          <div className="left">
            <img className="logo" src="/assets/img/logo.png" />
          </div>
        </div>

        <div className="col-lg-4 col-xs-8">
          <Avatar size="medium" presence="online" onClick={props.handleClickAvatar} />
          <DropList isOpen={props.isDroplistOpen}>
              <ItemGroup title="Options">
                <Item onClick={props.handleClickLogout}>Logout</Item>
              </ItemGroup>
            </DropList>
        </div>

      </div>
    </div>
  </header>
);

export default HeaderMain;
