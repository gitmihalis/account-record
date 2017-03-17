class AmountBox extends React.Component {
  render() {
    return (
      <div className="col">
        <div className="card">
          <div className={"card-header alert alert-" + this.props.type}>
            {this.props.text}
          </div>
          <div className="card-block">
            <p className="card-text">{amountFormat(this.props.amount)}</p>
          </div>
        </div>
      </div>
    );
  }
}