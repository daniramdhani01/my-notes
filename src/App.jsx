import { Component } from 'react'
import TopBar from './components/TopBar';
import { notes } from './utils/dataDummy';
import Notes from './components/Notes';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      notes: notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      inputTitle: "",
      inputBody: "",
      isError: false,
      openCreateNote: false
    };
  }

  handleSearch = (e)=>{
    const value = e.target.value.toLowerCase()
    if(!value) return this.setState({notes: notes})
    const newCatatan = this.state.notes.filter(item => item.title.toLowerCase()?.includes(value))
    this.setState({notes: newCatatan})
  }

  handleChange = (e)=>{
    const {name,value} = e.target
    if(name === "inputTitle" && value.length > 50) return
    this.setState({[name] : value})
  }

  handleCreate = ()=>{
    if(!this.state.inputTitle || !this.state.inputBody) return this.setState({isError: true})
    const newNote = this.state.notes
    newNote.unshift({
      id: Date.now(),
      title: this.state.inputTitle,
      body: this.state.inputBody,
      archived: false,
      createdAt: new Date().toISOString().toString()
    })
    
    this.setState({
      notes: newNote,
      inputTitle: "",
      inputBody: "",
    })
  }

  handleActivationNote = (id)=>{
    const newNote = this.state.notes.map(item =>{
      if(item.id === id) return ({
        ...item,
        archived: !item.archived
      })

      return item
    })
    this.setState({notes: newNote})
  }

  handleDeleteNote = (id)=>{
    const newNote = this.state.notes.filter(item => item.id !== id)
    this.setState({notes: newNote})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.inputBody !== prevState.inputBody || this.state.inputTitle !== prevState.inputTitle){
      if(this.state.isError && !!this.state.inputBody && !!this.state.inputTitle) this.setState({isError: false})
    }
  }

  render() {
    return (
      <>
        <TopBar handleSearch={this.handleSearch} search={this.state.search}/>
        <div className='main-padding'>
          <div className='container-input'>
            <button type='button' className={`btn ${this.state.openCreateNote ? "btn-danger" : "btn-transparent"}`} style={{marginLeft:"auto"}} onClick={()=>this.setState({openCreateNote: !this.state.openCreateNote})}>
              {this.state.openCreateNote && "Tutup "}Buat Catatan
            </button>
            <section className='note-input' style={{
                        transition: '0.5s ease, opacity 0.5s ease',
                        opacity: this.state.openCreateNote ? '1' : '0',
                        maxHeight: this.state.openCreateNote ? '400px' : '0px',
                        padding: this.state.openCreateNote ? '20px' : '0px',
                        marginTop: this.state.openCreateNote ? '15px' : '0px',
                        overflow: 'hidden',
                      }}>
              {/* <div className='note-input'> */}
                <h2>Buat Catatan</h2>
                <form>
                  <span>Sisa karakter: {50 - this.state.inputTitle.length}</span>
                  <input name='inputTitle' value={this.state.inputTitle} onChange={this.handleChange}/>
                  <textarea name="inputBody" onChange={this.handleChange} value={this.state.inputBody}/>
                  <button type='button' className='btn btn-primary' onClick={this.handleCreate}>Buat</button>
                  {this.state.isError && <span className='note-error'>*Silakan lengkapi kolom input</span>}
                </form>
              {/* </div> */}
            </section>
          </div>
          <main className='container'>
            <section>
              <h2>Catatan Aktif</h2>
              <div className='notes-list'>
                {this.state.notes.filter(item => item.archived === false).length > 0 ? 
                this.state.notes.filter(item => item.archived === false).map(item =>(
                  <Notes item={item} handleActivationNote={this.handleActivationNote} handleDeleteNote={this.handleDeleteNote}/>
                ))
                :
                <>Tidak ada catatan</>
                }
              </div>
            </section>
            <section>
              <h2>Arsip</h2>
              <div className='notes-list'>
                {this.state.notes.filter(item => item.archived === true).length > 0 ? 
                this.state.notes.filter(item => item.archived === true).map(item =>(
                  <Notes item={item} handleActivationNote={this.handleActivationNote} handleDeleteNote={this.handleDeleteNote}/>
                ))
                :
                <>Tidak ada catatan</>
              }
              </div>
            </section>
            </main>
        </div>
      </>
    )
  }
}
