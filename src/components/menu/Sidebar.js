import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { chronasGradient } from '../../styles/chronasColors';
import Responsive from './Responsive';

const getWidth = width => (typeof width === 'number' ? `${width}px` : width);

const getStyles = ({ drawer }) => {
  const width = drawer && drawer.width ? getWidth(drawer.width) : '16em';

  return ({
    sidebarOpen: {
      flex: `0 0 ${width}`,
      marginLeft: 0,
      order: -1,
      zIndex: 10000,
      borderRadius: 0,
      backgroundImage: chronasGradient,
      color: '#fff',
      backgroundColor: '#110617',
      transition: 'margin 350ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
    sidebarClosed: {
      flex: `0 0 ${width}`,
      marginLeft: `-${width}`,
      order: -1,
      zIndex: 10000,
      transition: 'margin 350ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
  });
};

// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object
class Sidebar extends PureComponent {
  handleClose = () => {
    // this.props.setSidebarVisibility(false);
  }

  render() {
    const { open, setSidebarVisibility, children, muiTheme } = this.props;
    const styles = getStyles(muiTheme);

    return (
      <Responsive
        small={
          <Drawer docked={false} open={open} onRequestChange={setSidebarVisibility}>
            {React.cloneElement(children, { onMenuTap: this.handleClose })}
          </Drawer>
        }
        medium={
          <Paper style={open ? styles.sidebarOpen : styles.sidebarClosed}>
            {children}
          </Paper>
        }
      />
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  muiTheme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setSidebarVisibility: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  open: props.open,
  locale: state.locale, // force redraw on locale change
  theme: props.theme, // force redraw on theme changes
});

export default compose(
  muiThemeable(),
  connect(mapStateToProps, { }),
)(Sidebar);
