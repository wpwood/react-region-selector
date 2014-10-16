/** @jsx React.DOM */

var RegionDispatcher = function () {
  Dispatcher.call(this);
};
RegionDispatcher.prototype = Object.create(Dispatcher.prototype);

RegionDispatcher.prototype.handleViewAction = function (action) {
  this.dispatch({
    action: action
  });
};

var regionDispatcher = new RegionDispatcher();

var RegionStore = function () {
  EventEmitter.call(this);

  this._state = {
    title: 'All Regions (Global)',
    visible: false,
    region: 'ALL'
  }
};
RegionStore.prototype = Object.create(EventEmitter.prototype);

RegionStore.prototype.emitChange = function () {
  this.emit('change');
};

RegionStore.prototype.addChangeListener = function (callback) {
  this.on('change', callback);
};

RegionStore.prototype.removeChangeListener = function (callback) {
  this.removeListener('change', callback);
};

RegionStore.prototype.setVisibility = function (visible) {
  this._state.visible = visible;
};

RegionStore.prototype.selectRegion = function (title, region) {
  this._state.title = title;
  this._state.region = region;
};

RegionStore.prototype.getState = function () {
  return this._state;
};

RegionStore.prototype.register = regionDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'show menu':
      regionStore.setVisibility(true);
      regionStore.emitChange();
      break;

    case 'hide menu':
      regionStore.setVisibility(false);
      regionStore.emitChange();
      break;

    case 'select':
      regionStore.selectRegion(action.title, action.region);
      regionStore.emitChange();
      break;
  }
});

RegionStore.prototype._state = {};

var regionStore = new RegionStore();

var ActionMenuButton = React.createClass({
  getInitialState: function () {
    return regionStore.getState();
  },
  _onChange: function () {
    console.log('Received a change event');
    console.log('State = ' + regionStore.getState().title);
    this.setState(regionStore.getState());
  },
  componentDidMount: function () {
    regionStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    regionStore.removeChangeListener(this._onChange);
  },
  render: function () {
    return (
      <div className="rs-dropdown">
        <ActionButton title={this.state.title} />
        <ActionMenu visible={this.state.visible} selectedRegion={this.state.region}>
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
  _showMenu: function () {
    regionDispatcher.handleViewAction({
      actionType: 'show menu'
    });
  },
  render: function () {
    return (
      <button className="rs-btn rs-btn-action rs-dropdown-toggle" onClick={this._showMenu}>
        <span className="rs-cog"></span> {this.props.title} <span className="rs-caret"></span>
      </button>
    )
  }
});

var ActionMenu = React.createClass({
  _hideMenu: function () {
    regionDispatcher.handleViewAction({
      actionType: 'hide menu'
    });
  },
  componentWillUnmount: function (e) {
    $('body').off('click');
  },
  componentDidMount: function () {
    $('body').on('click', this._hideMenu);
  },
  render: function () {
    var visible = this.props.visible ? 'visible' : 'hidden';
    var children = React.Children.map(this.props.children, function (child) {
      return React.addons.cloneWithProps(child, {
        selected: (child.props.value === this.props.selectedRegion),
      });
    }, this);

    return (
      <ul className={"rs-dropdown-menu " + visible}>{children}</ul>
    )
  }
});

var GlobalRegion = React.createClass({
  _selectItem: function (e) {
    regionDispatcher.handleViewAction({
      actionType: 'select',
      title: this.props.title,
      region: this.props.value
    });
  },
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region global-region"
          onClick={this._selectItem}
          value={this.props.value}
          title={this.props.title}>{this.props.title}</span>
      </li>
    )
  }
});

var GeographicalRegion = React.createClass({
  _selectItem: function (e) {
    regionDispatcher.handleViewAction({
      actionType: 'select',
      title: this.props.title,
      region: this.props.value
    });
  },
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region geographical-region"
          onClick={this._selectItem}
          value={this.props.value}
          title={this.props.title}>{this.props.title}</span>
      </li>
    )
  }
});

var LocalRegion = React.createClass({
  _selectItem: function (e) {
    regionDispatcher.handleViewAction({
      actionType: 'select',
      title: this.props.title,
      region: this.props.value
    });
  },
  render: function () {
    var selectedClass = this.props.selected ? 'selected' : '';

    return (
      <li className={"rs-dropdown-item " + selectedClass}>
        <span className="region-checkbox"></span>
        <span className="region local-region"
          onClick={this._selectItem}
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
