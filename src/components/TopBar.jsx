import { Component } from 'react'

class TopBar extends Component {
  constructor(props){
      super(props);
  }
  render() {
    return (
      <header className='main-padding' style={{display:"flex", flexWrap:"wrap"}}>
        <h1>MyNotes</h1>
        <div>
          <input placeholder='Cari Catatan ...' onChange={this.props.handleSearch} maxLength={50}/>
        </div>
      </header>
    )
  }
}

export default TopBar