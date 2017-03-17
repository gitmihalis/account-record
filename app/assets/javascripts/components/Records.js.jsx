class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.data
    };

    this.addRecord = this.addRecord.bind(this);
  }

  addRecord(record) {
    const records = this.state.records.slice();
    records.push(record);
    this.setState({ records: records});
  } 

  render() {
    const records = this.state.records;
    return (
      <div className='records container'>
        <h2 className='title'> Records </h2>
        <RecordForm handleNewRecord={this.addRecord} />
        <table className='table-bordered table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map( (record) =>
              <Record key={record.id} record={record} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
