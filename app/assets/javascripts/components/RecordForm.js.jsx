class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    // initial values for form inputs
    this.state = {
      title: '',
      date: '',
      amount: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      // computed property name (es6), equivalent to:
      //  var partialState = {}
      //  partialState[name] = value
      //  this.setState(partialState) 
      [name]: value 
    });

    e.preventDefault();
  }

  handleSubmit(e) {
    // Post changes to server.
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
      <form className='form-inline RecordForm'
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

