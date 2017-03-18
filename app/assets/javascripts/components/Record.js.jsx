class Record extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(e) {
    const record = this.props.record;

    $.ajax({
      method: 'DELETE',
      url: '/records/' + record.id,
      dataType: 'JSON',
      success: () =>
        this.props.handleDeletedRecord(record)
    });
  }
  render() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <button className="btn btn-danger"
                  onClick={this.handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}