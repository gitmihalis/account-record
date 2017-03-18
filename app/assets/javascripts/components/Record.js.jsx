class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleToggle(e) {
    const edit = this.state.edit
    e.preventDefault();
    this.setState({ edit: !edit });
    console.log(this.state.edit);
  }

  handleDelete(e) {
    const record = this.props.record;
    e.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: '/records/' + record.id,
      dataType: 'JSON',
      success: () =>
        this.props.handleDeletedRecord(record)
    });
  }

  handleEdit(e) {
    const record = this.props.record;
    const data = {
      title: this.refs.title.value,
      date: this.refs.date.value,
      amount: this.refs.amount.value
    }

    $.ajax({
      method: 'PUT',
      url: '/records/' + record.id,
      dataType: 'JSON',
      data: { record: data},
      success: (data) => {
        this.setState({ edit: false });
        this.props.handleEditRecord(record, data);
      },
      error: (err) => console.log(err.responseText) 
    });
    e.preventDefault();
  }

  editRecordRow() {
    const date = this.props.record.date;
    const title = this.props.record.title;
    const amount = this.props.record.amount;

    return (
      <tr>
        <td>
          <input type="text"
                 className="form-control"
                 defaultValue={date}
                 ref="date" />
        </td>
        <td>
          <input type="text"
                 className="form-control"
                 defaultValue={title}
                 ref="title"/>
        </td>
        <td>
          <input type="number"
                 className="form-control"
                 defaultValue={amount}
                 ref="amount"/>
        </td>
        <td>
            <a className="btn btn-seconday"
                    onClick={this.handleToggle} >
              Cancel
            </a>
            <a className="btn btn-success"
                    onClick={this.handleEdit} >
              Update
            </a>
        </td>
      </tr>
    );    
  }

  recordRow() {
    const amount = this.props.record.amount;
    const date = this.props.record.date;
    const title = this.props.record.title;

    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amountFormat(amount)}</td>
        <td>
            <a className="btn btn-secondary"
                    onClick={this.handleToggle} >
              Edit
            </a>
            <a className="btn btn-danger"
                    onClick={this.handleDelete} >
              Delete
            </a>
        </td>
      </tr>
    );
  }

  render() {
    return this.state.edit ? this.editRecordRow() : this.recordRow();
  }
}