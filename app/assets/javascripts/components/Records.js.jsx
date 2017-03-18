class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.data,
    };

    this.addRecord = this.addRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.calcBalance = this.calcBalance.bind(this);
    this.calcCredits = this.calcCredits.bind(this);
    this.calcDebits = this.calcDebits.bind(this);
  }

  calcCredits() {
    const records = this.state.records;
    const credits = records.filter((value) => value.amount >= 0);

    return credits.reduce((prev,curr) =>
      prev + parseFloat(curr.amount)
      ,0);
  }

  calcDebits() {
    const records = this.state.records;
    const debits = records.filter((value) => value.amount < 0);
    return debits.reduce((prev, curr) => 
      prev + parseFloat(curr.amount), 0);
  }

  calcBalance() {
    return (this.calcDebits() + this.calcCredits());
  }

  addRecord(record) {
    const records = this.state.records.slice();
    records.push(record);
    this.setState({ records: records});
  }

  updateRecord(record, data) {
    const records = this.state.records;
    const index = this.state.records.indexOf(record);
    records.splice(index, 1, data);
    this.setState({ records: records});
  }

  deleteRecord(record) {
    const records = this.state.records.slice();
    const index = records.indexOf(record);
    records.splice(index, 1);
    this.setState({ records: records});
  }

  render() {
    const records = this.state.records;
    return (
      <div className='records container'>
        <h2 className='title'> Records </h2>
        <div className="row">
          <AmountBox type="success" text="Credit" amount={this.calcCredits()} />
          <AmountBox type="danger" text="Debit" amount={this.calcDebits()} /> 
          <AmountBox type="info" text="Balance" amount={this.calcBalance()} />  
        </div>
        <RecordForm handleNewRecord={this.addRecord} />

        <div className="row">
          <div className="container">
          <table className='table-bordered table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map( (record) =>
                <Record key={record.id} 
                        record={record}
                        handleDeletedRecord={this.deleteRecord}
                        handleEditRecord={this.updateRecord} />
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}
