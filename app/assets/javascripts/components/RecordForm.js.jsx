class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      amount: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(e) {
    const record = this.state;
    $.post('', {record}, (data) => {
      this.props.handleNewRecord(data);
      this.setState({
        title: '',
        date: '',
        amount: '' });
    });
    e.preventDefault();
  }

  valid() {
    return Boolean(this.state.title && this.state.date && this.state.amount);
  }

  render() {
    return(
      <form className='form-inline'
            onSubmit={this.handleSubmit} >
        <div className='form-group'>
          <input type="text"
                 className="form-control"
                 placeholder="Date"
                 name="date"
                 value={this.state.date}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 placeholder="Title"
                 name="title"
                 value={this.state.title}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 placeholder="Amount"
                 name="amount"
                 value={this.state.amount}
                 onChange={this.handleChange} />
          <button type="submit"
                  className="btn btn-primary"
                  disabled={!this.valid()}
                  onSubmit={this.handleSubmit} >
                  Create Record</button>
        </div>

      </form>
    );
  }
}

