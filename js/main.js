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
        <ActionButton title={this.state.title} showMenu={this.showMenu} />
        <ActionMenu visible={this.state.visible} hideMenu={this.hideMenu} />
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
        <GlobalRegion title="All Regions (Global)" />
        <GeographicalRegion title="United States" />
        <LocalRegion title="Northern Virginia (IAD)" />
        <LocalRegion title="Chicago (ORD)" />
        <LocalRegion title="Dallas (DFW)" />
        <GeographicalRegion title="Europe" />
        <LocalRegion title="London (LON)" />
        <GeographicalRegion title="Asia-Pacific" />
        <LocalRegion title="Sydney (SYD)" />
        <LocalRegion title="Hong Kong (HKG)" />
      </ul>
    )
  }
});

var GlobalRegion = React.createClass({
  render: function () {
    return (
      <li className="rs-dropdown-item">
        <span className="region-checkbox"></span>
        <span className="region global-region">{this.props.title}</span>
      </li>
    )
  }
});

var GeographicalRegion = React.createClass({
  render: function () {
    return (
      <li className="rs-dropdown-item">
        <span className="region-checkbox"></span>
        <span className="region geographical-region">{this.props.title}</span>
      </li>
    )
  }
});

var LocalRegion = React.createClass({
  render: function () {
    return (
      <li className="rs-dropdown-item">
        <span className="region-checkbox"></span>
        <span className="region local-region">{this.props.title}</span>
      </li>
    )
  }
});

React.renderComponent(
  <ActionMenuButton />,
  document.getElementById('region-selector')
);
