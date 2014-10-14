/** @jsx React.DOM */

var ActionMenuButton = React.createClass({
  getInitialState: function () {
    return {
      title: 'Region',
      visible: false
    };
  },
  showMenu: function (e) {
    this.setState({visible: true});
  },
  hideMenu: function (e) {
    this.setState({visible: false});
  },
  render: function () {
    return (
      <div className="rs-dropdown">
        <ActionButton title={this.state.title} showMenu={this.showMenu}/>
        <ActionMenu visible={this.state.visible} hideMenu={this.hideMenu}/>
      </div>
    )
  }
});

var ActionButton = React.createClass({
  render: function () {
    return (
      <button className="rs-btn rs-btn-action rs-dropdown-toggle" onClick={this.props.showMenu}>
        <span className="rs-cog"></span> {this.props.title} <span className="rs-caret"></span>
      </button>
    )
  }
});

var ActionMenu = React.createClass({
  componentWillUnmount: function (e) {
    document.body.removeEventListener('click', this.props.hideMenu, false);
  },
  componentDidMount: function () {
    document.body.addEventListener('click', this.props.hideMenu, false);
  },
  render: function () {
    var visible = this.props.visible ? 'visible' : 'hidden';

    return (
      <ul className={"rs-dropdown-menu " + visible}>
        <li className="rs-dropdown-item"><span className="rs-dropdown-category" id="first">Identify</span></li>
        <li className="rs-dropdown-item"><a className="rs-dropdown-link" href="#">Rename Server...</a></li>
        <li className="rs-dropdown-item"><a className="rs-dropdown-link" href="#">Tag Server...</a></li>
      </ul>
    )
  }
});

React.renderComponent(
  <ActionMenuButton />,
  document.getElementById('region-selector')
);
