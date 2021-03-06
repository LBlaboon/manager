import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ActionMenu, { Action } from 'src/components/ActionMenu/ActionMenu';

interface Props {
  onEdit: (config: Linode.Config) => void;
  onDelete: (id: number, label: string) => void;
  onBoot: (linodeId: number, configId: number, label: string) => void;
  config: Linode.Config;
  linodeId: number;
}

type CombinedProps = Props & RouteComponentProps<{}>;

class ConfigActionMenu extends React.Component<CombinedProps> {
  handleEdit = () => {
    const { config, onEdit } = this.props;
    onEdit(config);
  };

  handleDelete = () => {
    const {
      config: { id, label },
      onDelete
    } = this.props;
    onDelete(id, label);
  };

  handleBoot = () => {
    const {
      config: { id, label },
      linodeId,
      onBoot
    } = this.props;
    onBoot(linodeId, id, label);
  };

  createConfigActions = () => (closeMenu: Function): Action[] => {
    const actions = [
      {
        title: 'Boot This Config',
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          this.handleBoot();
          closeMenu();
        }
      },
      {
        title: 'Edit',
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          this.handleEdit();
          closeMenu();
        }
      },
      {
        title: 'Delete',
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          this.handleDelete();
          closeMenu();
        }
      }
    ];

    return actions;
  };

  render() {
    return <ActionMenu createActions={this.createConfigActions()} />;
  }
}

export default withRouter(ConfigActionMenu);
