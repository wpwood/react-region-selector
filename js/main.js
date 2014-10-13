/** @jsx React.DOM */

var ActionMenuButton = React.createClass({
  getInitialState: function () {
    return {visible: false};
  },
  showMenu: function () {
    this.setState({visible: !this.state.visible});
  },
  render: function () {
    return (
      <div>
        <ActionButton handleClick={this.showMenu}/>
        <ActionMenu visible={this.state.visible}/>
      </div>
    )
  }
});

var ActionButton = React.createClass({
  render: function () {
    return (
      <button className="rs-btn rs-btn-action" onClick={this.props.handleClick}>
        <span className="rs-cog"></span> Region <span className="rs-caret"></span>
      </button>
    )
  }
});

var ActionMenu = React.createClass({
  render: function () {
    var visible = this.props.visible ? ' visible' : '';

    return (
      <div className="rs-dropdown">
        <ul className={"rs-dropdown-menu" + visible}>
          <li className="rs-dropdown-item"><span className="rs-dropdown-category" id="first">Identify</span></li>
          <li className="rs-dropdown-item"><a className="rs-dropdown-link" href="#">Rename Server...</a></li>
          <li className="rs-dropdown-item"><a className="rs-dropdown-link" href="#">Tag Server...</a></li>
        </ul>
      </div>
    )
  }
});

React.renderComponent(
  <ActionMenuButton />,
  document.getElementById('region-selector')
);
