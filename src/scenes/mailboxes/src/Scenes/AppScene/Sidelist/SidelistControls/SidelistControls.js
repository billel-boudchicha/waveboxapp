import React from 'react'
import { settingsStore } from 'stores/settings'
import SidelistControlWizard from './SidelistControlWizard'
import SidelistControlSupport from './SidelistControlSupport'
import SidelistControlAddMailbox from './SidelistControlAddMailbox'
import SidelistControlSettings from './SidelistControlSettings'
import shallowCompare from 'react-addons-shallow-compare'
import SidelistControlWhatsNew from './SidelistControlWhatsNew'

export default class SidelistControls extends React.Component {
  /* **************************************************************************/
  // Lifecycle
  /* **************************************************************************/

  componentDidMount () {
    settingsStore.listen(this.settingsUpdated)
  }

  componentWillUnmount () {
    settingsStore.unlisten(this.settingsUpdated)
  }

  /* **************************************************************************/
  // Data lifecycle
  /* **************************************************************************/

  state = (() => {
    const settingsState = settingsStore.getState()
    return {
      showWizard: !settingsState.app.hasSeenAppWizard,
      showSupport: settingsState.ui.showSidebarSupport
    }
  })()

  settingsUpdated = (settingsState) => {
    this.setState({
      showWizard: !settingsState.app.hasSeenAppWizard,
      showSupport: settingsState.ui.showSidebarSupport
    })
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const { ...passProps } = this.props
    const { showWizard, showSupport } = this.state

    return (
      <div {...passProps}>
        <SidelistControlWhatsNew />
        {showWizard ? (<SidelistControlWizard />) : undefined}
        {showSupport ? (<SidelistControlSupport />) : undefined}
        <SidelistControlAddMailbox />
        <SidelistControlSettings />
      </div>
    )
  }
}
