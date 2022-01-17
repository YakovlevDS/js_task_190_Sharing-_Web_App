/* ----------- BUTTONS START ----------- */
class ButtonGroup extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "btn-group btn-group-sm" },
      this.props.buttons));


  }}


class EditButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", onClick: this.props.onClick, className: "edit btn btn-default" }, /*#__PURE__*/React.createElement("span", { className: "glyphicon glyphicon-pencil" })));

  }}


class DeleteButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", onClick: this.props.onClick, className: "edit btn btn-default" }, /*#__PURE__*/React.createElement("span", { className: "glyphicon glyphicon-trash" })));

  }}


class ConfirmButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", onClick: this.props.onClick, className: "edit btn btn-default btn-success" }, /*#__PURE__*/React.createElement("span", { className: "glyphicon glyphicon-ok" })));

  }}


class CancelButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", onClick: this.props.onClick, className: "edit btn btn-default btn-danger" }, /*#__PURE__*/React.createElement("span", { className: "glyphicon glyphicon-remove" })));

  }}


class FullWidthButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", onClick: this.props.onClick, className: "btn btn-default btn-block" }, this.props.buttontext));

  }}


class FullWidthLinkButton extends React.Component {
  render() {
    if (this.props.disabled) {
      var class_name = "btn btn-default btn-block disabled";
    } else {
      var class_name = "btn btn-default btn-block";
    }
    return /*#__PURE__*/(
      React.createElement("a", { href: this.props.link, className: class_name }, this.props.buttontext));

  }}

/* ----------- BUTTONS END ----------- */

class DisplayField extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("td", { onClick: this.props.onClick }, this.props.field.value));

  }}


class EditField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.field.value };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  handleFieldChange(e) {
    this.setState({
      value: e.target.value });

    // Send value back to row - note: state is too slow
    this.props.sendValueToParent(this.props.field.name, e.target.value);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("td", null, /*#__PURE__*/
      React.createElement("input", {
        className: "form-control input-sm",
        type: "text",
        value: this.state.value,
        placeholder: this.props.field.placeholder,
        onChange: this.handleFieldChange })));



  }}


class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleEditModeClick = this.handleEditModeClick.bind(this);
    this.handleExitEditModeClick = this.handleExitEditModeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleConfirmEditClick = this.handleConfirmEditClick.bind(this);
    this.updateValues = this.updateValues.bind(this);

    var editMode = false;
    var added = false;
    // If no created date then row is a newly added row
    if (!this.props.instance.date_created) {
      editMode = true;
      added = true;
    }
    var instance = {};
    this.props.fielddata.forEach(function (fd) {
      instance[fd.name] = this.props.instance[fd.name];
    }, this);
    instance.id = this.props.instance.id;
    this.state = {
      editMode: editMode,
      instance: instance,
      revised_instance: instance,
      deleted: false,
      added: added,
      selected: false };

  }

  handleSelectRow() {
    // Need a call to parent as only one row may be selected?
    if (!this.state.selected) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
    this.props.setSelectedRow(this.props.instance.id);
  }

  handleEditModeClick() {
    this.setState({ editMode: true });
  }

  handleExitEditModeClick() {
    this.setState({ editMode: false });
    this.setState({
      revised_instance: this.state.instance });

    if (this.state.added) {
      this.setState({ deleted: true });
    }
  }

  handleDeleteClick() {
    this.setState({ deleted: true });
    console.log("AJAX DELETE");
    console.log(this.state.instance.id);
  }

  handleConfirmEditClick() {
    // CONFIRM revised_instance
    this.setState({
      editMode: false,
      instance: this.state.revised_instance });

    if (this.state.added) {
      console.log("AJAX POST");
      console.log(revised_instance);
    } else
    {
      console.log("AJAX PATCH");
      console.log(revised_instance);
      // Reset added flag
      this.setState({ added: false });
    }
  }

  updateValues(key, value) {
    // Method to update values passed from EditField
    var temp_revised_instance = this.state.revised_instance;
    temp_revised_instance[key] = value;
    this.setState({
      revised_instance: temp_revised_instance });

  }

  render() {
    let row = [];
    let buttons = null;
    if (this.state.deleted) {
      return /*#__PURE__*/React.createElement("tr", null);
    }
    if (this.state.editMode) {
      // In edit mode - set buttons for edit 
      buttons = [/*#__PURE__*/React.createElement(ConfirmButton, { onClick: this.handleConfirmEditClick }), /*#__PURE__*/React.createElement(CancelButton, { onClick: this.handleExitEditModeClick })];
      // In edit mode - set field values and placeholders
      this.props.fielddata.forEach(function (fd) {
        var field = {
          name: fd.name,
          placeholder: fd.placeholder,
          value: this.state.instance[fd.name] };

        // In edit mode - add EditFields for editable fields
        if (fd.inputfield) {
          row.push( /*#__PURE__*/React.createElement(EditField, { field: field, key: field.name, sendValueToParent: this.updateValues }));
        } else {
          row.push( /*#__PURE__*/React.createElement(DisplayField, { onClick: "", field: "", key: field.name }));
        }
      }, this);
    } else {
      // In display mode - add edit/delete buttons
      buttons = [/*#__PURE__*/React.createElement(EditButton, { onClick: this.handleEditModeClick }), /*#__PURE__*/React.createElement(DeleteButton, { onClick: this.handleDeleteClick })];
      // In display mode - add DisplayField
      this.props.fielddata.forEach(function (fd) {
        var field = {
          name: fd.name,
          value: this.state.instance[fd.name] };

        row.push( /*#__PURE__*/React.createElement(DisplayField, { onClick: this.handleSelectRow, field: field, key: field.value }));
      }, this);
    }
    // Set selected status
    if (this.props.instance.selected) {
      return /*#__PURE__*/(
        React.createElement("tr", { className: "success" }, row, /*#__PURE__*/React.createElement(ButtonGroup, { buttons: buttons })));

    } else {
      return /*#__PURE__*/(
        React.createElement("tr", null, row, /*#__PURE__*/React.createElement(ButtonGroup, { buttons: buttons })));

    }
  }}



class TableHeader extends React.Component {
  render() {
    var tableheaders = [];
    this.props.fielddata.forEach(function (fd) {
      tableheaders.push( /*#__PURE__*/React.createElement("th", null, fd.header));
    });
    tableheaders.push( /*#__PURE__*/React.createElement("th", { className: "buttoncolumn" }, "Actions"));
    return /*#__PURE__*/(
      React.createElement("tr", null,
      tableheaders));


  }}


class Table extends React.Component {
  constructor(props) {
    super(props);
    // Set state variable for selected row
    this.state = {
      selected: 0 };

    this.setSelectedRow = this.setSelectedRow.bind(this);
  }

  setSelectedRow(id) {
    this.setState({ selected: id });
    console.log(id);
    this.props.data.instances.forEach(function (instance) {
      if (instance.id == id) {
        console.log(instance.childlinks);
        this.props.onSelect(instance.childlinks);
      }
    }, this);
  }

  render() {
    var rows = [];
    const fielddata = this.props.data.fielddata;
    this.props.data.instances.forEach(function (instance) {
      if (instance.id == this.state.selected) {
        instance.selected = true;
      } else {
        instance.selected = false;
      }
      rows.push( /*#__PURE__*/React.createElement(TableRow, { setSelectedRow: this.setSelectedRow, instance: instance, fielddata: fielddata, key: instance.id }));
    }, this);
    return /*#__PURE__*/(
      React.createElement("table", { className: "table table-striped" }, /*#__PURE__*/
      React.createElement("thead", null, /*#__PURE__*/React.createElement(TableHeader, { fielddata: fielddata })), /*#__PURE__*/
      React.createElement("tbody", null, rows)));


  }}


class ChildLinks extends React.Component {
  render() {
    var render_links = [];
    this.props.childlinks.forEach(function (cl) {
      if (cl.uri) {
        render_links.push( /*#__PURE__*/React.createElement(FullWidthLinkButton, { buttontext: cl.name, link: "", disabled: false }));
      } else {
        render_links.push( /*#__PURE__*/React.createElement(FullWidthLinkButton, { buttontext: cl.name, link: cl.uri, disabled: true }));
      }
    }, this);
    return /*#__PURE__*/(
      React.createElement("div", { id: "childLinks", class: "row" },
      render_links));


  }}


class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      childlinks: this.props.data.childlinks };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.setChildlinks = this.setChildlinks.bind(this);
    this.getData();
  }

  handleAddClick() {
    this.setState({ addMode: true });
  }

  getData() {
    console.log("AJAX GET");
  }

  setChildlinks(childlinks) {
    this.setState({ childlinks: childlinks });
    // This is too slow - we need to call
    // a method to update directly on childlinks as passed, which is correct
    console.log(this.state.childlinks);
  }

  render() {
    if (this.state.addMode) {
      var instance = {};
      this.props.data.fielddata.forEach(function (fd) {
        instance[fd.name] = "";
      });
      var dataout = this.props.data;
      dataout.instances.push(instance);
    } else
    {
      dataout = this.props.data;
    }
    if (dataout.instances.length > 0) {

    }
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "table-responsive" }, /*#__PURE__*/
      React.createElement("legend", null, this.props.title), /*#__PURE__*/
      React.createElement(Table, { data: dataout, onSelect: this.setChildlinks }), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement(FullWidthButton, { buttontext: "Add Case", onClick: this.handleAddClick })), /*#__PURE__*/

      React.createElement("hr", null), /*#__PURE__*/
      React.createElement(ChildLinks, { childlinks: this.state.childlinks }), /*#__PURE__*/
      React.createElement("hr", null)));


  }}

// Need to add a class name at level of fieldata / instances
var data = {
  "api_uri": "https://www.benhoyle.co.uk/attass/oar/cases/data/",
  "childlinks": [
  { "name": "Office Actions", "uri": "" },
  { "name": "Application States", "uri": "" },
  { "name": "Cited Art", "uri": "" }],

  "fielddata": [{
    "header": "Case Ref.",
    "inputfield": true,
    "length": 10,
    "name": "caseref",
    "placeholder": "e.g. E1234.EP" },
  {
    "header": "Application No.",
    "inputfield": true,
    "length": 10,
    "name": "appln_no",
    "placeholder": "e.g. XX...X.X" },
  {
    "header": "Country",
    "inputfield": true,
    "length": 7,
    "name": "countrycode",
    "placeholder": "e.g. EP" },
  {
    "header": "Last Modified",
    "inputfield": false,
    "length": 10,
    "name": "date_modified",
    "placeholder": "" }],

  "instances": [{
    "appln_no": "12881603.0",
    "caseref": "R1234.W#",
    "childlinks": [{
      "name": "Office Actions",
      "uri": "https://www.benhoyle.co.uk/attass/oar/officeactions/?parent_id=2" },
    {
      "name": "Application States",
      "uri": "https://www.benhoyle.co.uk/attass/oar/applnstates/?parent_id=2" },
    {
      "name": "Cited Art",
      "uri": "https://www.benhoyle.co.uk/attass/oar/citedart/?parent_id=2" }],

    "countrycode": "EP",
    "date_created": "04 July 2016",
    "date_modified": "04 July 2016",
    "filing_date": null,
    "id": 2,
    "pub_date": "03 June 2015",
    "pub_no": "EP2877953",
    "uri": "https://www.benhoyle.co.uk/attass/oar/cases/data/2" },
  {
    "appln_no": "79300903.6",
    "caseref": "E1234.EP#",
    "childlinks": [{
      "name": "Office Actions",
      "uri": "https://www.benhoyle.co.uk/attass/oar/officeactions/?parent_id=1" },
    {
      "name": "Application States",
      "uri": "https://www.benhoyle.co.uk/attass/oar/applnstates/?parent_id=1" },
    {
      "name": "Cited Art",
      "uri": "https://www.benhoyle.co.uk/attass/oar/citedart/?parent_id=1" }],

    "countrycode": "EP",
    "date_created": "01 June 2016",
    "date_modified": "11 July 2016",
    "filing_date": null,
    "id": 1,
    "pub_date": null,
    "pub_no": null,
    "uri": "https://www.benhoyle.co.uk/attass/oar/cases/data/1" },
  {
    "appln_no": "1324250.1",
    "caseref": "Exxxxx.EP",
    "childlinks": [{
      "name": "Office Actions",
      "uri": "https://www.benhoyle.co.uk/attass/oar/officeactions/?parent_id=3" },
    {
      "name": "Application States",
      "uri": "https://www.benhoyle.co.uk/attass/oar/applnstates/?parent_id=3" },
    {
      "name": "Cited Art",
      "uri": "https://www.benhoyle.co.uk/attass/oar/citedart/?parent_id=3" }],

    "countrycode": "EP",
    "date_created": "11 November 2016",
    "date_modified": "11 November 2016",
    "filing_date": null,
    "id": 3,
    "pub_date": null,
    "pub_no": null,
    "uri": "https://www.benhoyle.co.uk/attass/oar/cases/data/3" }] };



ReactDOM.render( /*#__PURE__*/
React.createElement(TableContainer, { title: "Case View", data: data }),
document.getElementById("container"));