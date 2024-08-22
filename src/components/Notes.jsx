import React, { Component } from 'react'
import { dateFormat } from '../helper/globalHelper';

export default class Notes extends Component {
constructor(props) {
    super(props);
}
  render() {
    const {item, handleActivationNote, handleDeleteNote} = this.props
    return (
      <div key={item.id} className='card'>
        <h3 className='card-title'>{item.title}</h3>
        <span className='card-date'>{dateFormat(item.createdAt)}</span>
        <p className='card-body'>{item.body}</p>
        <div className='card-footer'>
            <button type="button" className='btn btn-transparent' onClick={()=>handleActivationNote(item.id)}>{item.archived ? "Aktifkan" : "Arsipkan"}</button>
            <button type="button" className='btn btn-danger' onClick={()=>handleDeleteNote(item.id)}>Delete</button>
        </div>
    </div>
    )
  }
}
