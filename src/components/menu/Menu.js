import React, { PureComponent } from 'react';

import BoardIcon from 'material-ui/svg-icons/communication/forum'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ShareIcon from 'material-ui/svg-icons/social/share'
import HelpIcon from 'material-ui/svg-icons/action/help'
import DiscoverIcon from 'material-ui/svg-icons/action/explore'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import UsersIcon from 'material-ui/svg-icons/social/people'
import StorageIcon from 'material-ui/svg-icons/device/storage'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import DiceIcon from 'material-ui/svg-icons/places/casino'
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new'
import LayersIcon from 'material-ui/svg-icons/maps/layers'
import Avatar from 'material-ui/Avatar'
import SVG from 'react-inlinesvg'
import { Link } from 'react-router-dom'
import pure from 'recompose/pure'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { translate, defaultTheme, userLogout, showNotification } from 'admin-on-rest'
import { selectAreaItem as selectAreaItemAction } from '../map/actionReducers'
import { toggleMenuDrawer as toggleMenuDrawerAction, setActiveMenu as setActiveMenuAction } from './actionReducers'
import { toggleRightDrawer as toggleRightDrawerAction } from '../content/actionReducers'
import { tooltip } from '../../styles/chronasStyleComponents'
import { logout, setToken } from './authentication/actionReducers'
import { themes } from '../../properties'

const styles = {
  mainLogo: {
    marginBottom: '24px',
    width: '50px',
    color: 'rgb(255, 255, 255)',
    marginLeft: '-6px',
    marginTop: '-8px',
    'svg': {
      'g': {
        'fill': 'red'
      }
    }
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    padding: '8px 4px'
  },
  topMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    padding: '8px 4px'
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    padding: '8px 4px'
  }
}

class Menu extends PureComponent {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('chs_token');
    if (token !== null) {
      //  <span>{translate('resources.users.page.delete')} "{username}"</span>
      props.showNotification("Welcome " + localStorage.getItem('chs_username'), 'confirm') // TODO: translate welcome
      props.setToken(token)
    }
  }

  handleLogout = () => {
    const { logout, showNotification } = this.props;
    localStorage.removeItem('chs_token')
    localStorage.removeItem('chs_username')
    localStorage.removeItem('chs_avatar')
    localStorage.removeItem('chs_privilege')
    localStorage.removeItem('chs_id')
    showNotification("aor.auth.logged_out")
    logout()
  }


  render() {
    const { toggleMenuDrawer, toggleRightDrawer, userLogout, userDetails, setActiveMenu, selectAreaItem, hasDashboard, onMenuTap, resources, theme, translate } = this.props;
    const isLoggedIn = userDetails.token !== ''
    const username = localStorage.getItem('chs_username')
    const customAvatar = userDetails.avatar || localStorage.getItem('chs_avatar')

    return <div style={styles.main}>
      <div style={styles.topMenu} className="topMenuItems">
        <IconButton
          key={'info'}
          style={ styles.mainLogo }
          containerElement={<Link to="/info" />}
          tooltipPosition="bottom-right"
          tooltip={translate("pos.about")}
          tooltipStyles={tooltip}
          onClick={() => localStorage.setItem('chs_info_section', 'about')}
          iconStyle={styles.mainLogo}
        >
          <SVG
            className={ ("logoMenuContainer " + themes[theme].className) }
            src="/images/newLogo10.svg"
          >
            CHRONAS
          </SVG>
        </IconButton>
        <IconButton
          style={{ marginTop: '32px', padding: 0 }}
          key={'layers'}
          tooltipPosition="bottom-right"
          tooltip={translate('pos.layers')}
          tooltipStyles={tooltip}
          onClick={() => toggleMenuDrawer()}
          iconStyle={{ color: themes[theme].foreColors[0] }}
        >
          <LayersIcon
            hoverColor={themes[theme].highlightColors[0]}
          />
        </IconButton>
        <IconButton
          key={'discover'}
          containerElement={<Link to="/discover" />}
          tooltipPosition="bottom-right"
          tooltip={translate('pos.discover')}
          tooltipStyles={tooltip}
          onClick={() => setActiveMenu('discover')}
          iconStyle={{color: themes[theme].foreColors[0]}}
        >
          <DiscoverIcon
            hoverColor={themes[theme].highlightColors[0]}/>
        </IconButton>
        <IconButton
          key={'random'}
          tooltipPosition="bottom-right"
          tooltip={translate('pos.random')}
          tooltipStyles={tooltip}
          onClick={() => selectAreaItem("random")}
          iconStyle={{color: themes[theme].foreColors[0]}}
          style={{ padding: 0}}
        >
          <DiceIcon
            hoverColor={themes[theme].highlightColors[0]}/>
        </IconButton>
        <IconButton
          key={'configuration'}
          containerElement={<Link to="/configuration" />}
          tooltipPosition="bottom-right"
          tooltip={translate('pos.configuration')}
          tooltipStyles={tooltip}
          onClick={() => setActiveMenu('configuration')}
          iconStyle={{color: themes[theme].foreColors[0]}}
        >
          <SettingsIcon hoverColor={themes[theme].highlightColors[0]}/>
        </IconButton>
      </div>
      <div style={styles.bottomMenu}>
        <div>
          { isLoggedIn ? (
            <div>
              {/*<IconButton*/}
                {/*key={'mod'}*/}
                {/*containerElement={<Link to="/mod" />}*/}
                {/*tooltipPosition="bottom-right"*/}
                {/*tooltip={translate('pos.mod')}*/}
                {/*tooltipStyles={tooltip}*/}
                {/*onClick={() => toggleRightDrawer()}*/}
                {/*iconStyle={{color: themes[theme].foreColors[0]}}*/}
              {/*>*/}
                {/*<EditIcon*/}
                  {/*hoverColor={themes[theme].highlightColors[0]}/>*/}
              {/*</IconButton>*/}
              {/*<IconButton*/}
                {/*key={'resources'}*/}
                {/*containerElement={<Link to="/resources" />}*/}
                {/*tooltipPosition="bottom-right"*/}
                {/*tooltip={translate('pos.resources')}*/}
                {/*tooltipStyles={tooltip}*/}
                {/*onClick={onMenuTap}*/}
                {/*iconStyle={{color: themes[theme].foreColors[0]}}*/}
              {/*>*/}
                {/*<StorageIcon*/}
                  {/*hoverColor={themes[theme].highlightColors[0]}/>*/}
              {/*</IconButton>*/}
              <IconButton
                key={'community'}
                containerElement={<Link to="/community/general" />}
                tooltipPosition="bottom-right"
                tooltip={translate('pos.community')}
                tooltipStyles={tooltip}
                onClick={onMenuTap}
                iconStyle={{color: themes[theme].foreColors[0]}}
              >
                <BoardIcon
                  hoverColor={themes[theme].highlightColors[0]}/>
              </IconButton>
              <IconButton
              key={'account'}
              containerElement={<Link to={(username) ? ("/community/user/" + username) : "/account"} />}
              tooltipPosition="bottom-right"
              tooltip={translate('pos.account')}
              tooltipStyles={tooltip}
              onClick={onMenuTap}
              iconStyle={{backgroundColor: themes[theme].foreColors[0]}}
              >
                { customAvatar ? <Avatar
                  size={24}
                  hoverColor={themes[theme].highlightColors[0]}
                  src={customAvatar} /> : <Avatar
                  style={{ fontSize: 16 }}
                  size={24}
                  color={{
                    // color: themes[theme].foreColors[0],
                    // backgroundColor: themes[theme].backColors[0]
                  }}
                  hoverColor={themes[theme].highlightColors[0]}
                  src={customAvatar}><span style={{fontWeight: 'bolder', color: themes[theme].backColors[0]}}>{(username || " ").substr(0, 1).toUpperCase()}</span></Avatar>/*  <AccountIcon
              hoverColor={themes[theme].highlightColors[0]}/>*/ }
              </IconButton>
            </div>
            ) : null
          }
          { false && <IconButton
            key={'share'}
            containerElement={<Link to="/share" />}
            tooltipPosition="bottom-right"
            tooltip={translate('pos.share')}
            tooltipStyles={tooltip}
            onClick={() => setActiveMenu('share')}
            iconStyle={{color: themes[theme].foreColors[0]}}
          >
            <ShareIcon hoverColor={themes[theme].highlightColors[0]}/>
          </IconButton> }
          <IconButton
            key={'help'}
            containerElement={<Link to="/info" />}
            tooltipPosition="bottom-right"
            tooltip={translate('pos.help')}
            tooltipStyles={tooltip}
            onClick={() => setActiveMenu('info')}
            iconStyle={{color: themes[theme].foreColors[0]}}
          >
            <HelpIcon hoverColor={themes[theme].highlightColors[0]}/>
          </IconButton>
          <IconButton
            tooltipPosition="bottom-right"
            tooltip={translate(isLoggedIn ? 'aor.auth.logout' : 'aor.auth.login')}
            tooltipStyles={tooltip}
            onClick={isLoggedIn ? this.handleLogout : userLogout }
            className="logout"
            iconStyle={{color: isLoggedIn ? themes[theme].highlightColors[0] : themes[theme].foreColors[0]}}
          > <LogoutIcon hoverColor={themes[theme].highlightColors[0]}/>
          </IconButton>
        </div>
      </div>
    </div>
  }
};


Menu.defaultProps = {
  onMenuTap: () => null,
};

const enhance = compose(
  connect(state => ({
    userDetails: state.userDetails,
    theme: state.theme
  }), {
    toggleRightDrawer: toggleRightDrawerAction,
    toggleMenuDrawer: toggleMenuDrawerAction,
    setActiveMenu: setActiveMenuAction,
    selectAreaItem: selectAreaItemAction,
    userLogout,
    setToken,
    showNotification,
    logout
  }),
  pure,
  translate,
);

export default enhance(Menu);
