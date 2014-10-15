/** @jsx React.DOM */

var ActionMenuButton = React.createClass({
  getInitialState: function () {
    return {
      title: 'All Regions (Global)',
      visible: false,
      selected: 'ALL'
    };
  },
  showMenu: function (e) {
    this.setState({visible: true});
  },
  hideMenu: function (e) {
    this.setState({visible: false});
  },
  selectItem: function (e) {
    this.setState({
      title: e.currentTarget.getAttribute('title'),
      selected: e.currentTarget.getAttribute('value')
    });
  },
  render: function () {
    return (
      <div className="rs-dropdown">
        <ActionButton title={this.state.title} showMenu={this.showMenu} />
        <ActionMenu visible={this.state.visible} selected={this.state.selected} hideMenu={this.hideMenu} select={this.selectItem}>
          <GlobalRegion title="All Regions (Global)" value="ALL" />
          <GeographicalRegion title="United States" value="US" />
          <LocalRegion title="Northern Virginia (IAD)" value="IAD" />
          <LocalRegion title="Chicago (ORD)" value="ORD" />
          <LocalRegion title="Dallas (DFW)" value="DFW" />
          <GeographicalRegion title="Europe" value="EU" />
          <LocalRegion title="London (LON)" value="LON" />
          <GeographicalRegion title="Asia-Pacific" value="APAC" />
          <LocalRegion title="Sydney (SYD)" value="SYD" />
          <LocalRegion title="Hong Kong (HKG)" value="HKG" />
        </ActionMenu>
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
    $('body').off('click');
  },
  componentDidMount: function () {
    $('body').on('click', this.props.hideMenu);
  },
  render: function () {
    var visible = this.props.visible ? 'visible' : 'hidden';
    var children = React.Children.map(this.props.children, function (child) {
      return React.addons.cloneWithProps(child, {
        selected: (child.props.value === this.props.selected),
        select: this.props.select}
      );
    }, this);

    return (
      <ul className={"rs-dropdown-menu " + visible}>{children}</ul>
    )
  }
});

var GlobalRegion = React.createClass({
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region global-region"
          onClick={this.props.select}
          value={this.props.value}
          title={this.props.title}>{this.props.title}</span>
      </li>
    )
  }
});

var GeographicalRegion = React.createClass({
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region geographical-region"
          onClick={this.props.select}
          value={this.props.value}
          title={this.props.title}>{this.props.title}</span>
      </li>
    )
  }
});

var LocalRegion = React.createClass({
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region local-region"
          onClick={this.props.select}
          value={this.props.value}
          title={this.props.title}>{this.props.title}</span>
      </li>
    )
  }
});

React.renderComponent(
  <ActionMenuButton />,
  document.getElementById('region-selector')
);
