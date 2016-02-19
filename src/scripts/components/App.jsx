import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import Toggle from 'material-ui/lib/toggle';
import ViewPort from './ViewPort.jsx';

const styles = {
  menuTitle: {
    fontSize: '1.5rem',
    padding: '1rem'
  },
  toggle: {
    maxWidth: '13rem',
    padding: '1rem'
  }
};

export default class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleMaterial = this.toggleMaterial.bind(this);
    this.handleVertexPick = this.handleVertexPick.bind(this);
    this.handleParametricPick = this.handleParametricPick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      open: false,
      isVertex: true,
      isHeat: false,
      title: '3D Vertex Surface'
    };
  }

  render() {
    return (
      <section>
        <AppBar title={this.state.title} onLeftIconButtonTouchTap={this.handleToggle}/>
        <LeftNav docked={false} width={15 * 16} open={this.state.open} onRequestChange={open => this.setState({open})}>
          <MenuItem style={styles.menuTitle} disabled>Surface types</MenuItem>
          <Divider />
          <MenuItem insetChildren checked={this.state.isVertex} onTouchTap={this.handleVertexPick}>Vertex</MenuItem>
          <MenuItem insetChildren checked={!this.state.isVertex} onTouchTap={this.handleParametricPick}>Parametric</MenuItem>
          <Divider />
          <Toggle toggled={this.state.isHeat} label="Heat map" style={styles.toggle} onToggle={this.toggleMaterial}/>
        </LeftNav>
        <ViewPort type={this.state.isVertex} heat={this.state.isHeat}/>
      </section>
    );
  }

  handleToggle() {
    const title = '3D ' + (this.state.isVertex ? ' Vertex ' : 'Parametric') + ' Surface';
    this.setState({open: !this.state.open, title});
  }

  toggleMaterial() {
    this.setState({isHeat: !this.state.isHeat});
  }

  handleVertexPick() {
    this.setState({isVertex: true});
    this.handleClose();
  }

  handleParametricPick() {
    this.setState({isVertex: false});
    this.handleClose();
  }

  handleClose() {
    this.setState({open: false});
  }
}
