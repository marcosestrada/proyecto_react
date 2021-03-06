import React from 'react';
import Collapsible from './Collapsible.js';
import {Component} from "react";


export default class ContactContainer extends Component  {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            display: 'none',
            colorFondo: "white",
        }


    }

  componentDidMount(){ 
    fetch("https://randomuser.me/api/?results=1")
      .then(res => res.json())
      .then(
        (data) => {
        console.log(data)
        var resultadosBusqueda = data.results.length

        for (var i = 0; i < resultadosBusqueda.length; i++) {
          console.log(resultadosBusqueda[i]);
        }
        this.setState({
          isLoaded: true,
          items: data.results
        });    
        },
          
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          }
      )
  }

  MouseEnter = () => {
    if(this.state.colorFondo==="white")
      this.setState({colorFondo:"lightblue"})
  }

  MouseLeave = () => {
    if(this.state.colorFondo==="lightblue")
      this.setState({colorFondo:"white"})
  }


render(){
  const { error, isLoaded } = this.state;
if (error) {
  return <div>Error: {error.message}</div>
} else if (!isLoaded) {
  return <div>Cargando...</div>;
} else { 
  return(
      <React.Fragment>
            <div className='tarjeta'  style={{ backgroundColor: this.state.colorFondo }} onMouseEnter = {this.MouseEnter.bind(this, "lightblue")} onMouseLeave = {this.MouseLeave.bind(this, "white")}>
            <button className="botonBorrar" onClick={this.props.onDelete.bind(this, this.props.id)}><i class="fas fa-trash-alt"></i></button>
              <li className="profile"><img src={this.props.image} alt='profile' className="profilefoto"/></li>
              <li>Nombre: {this.props.name}</li>
              <li>Apellido: {this.props.surname}</li>
              <li>Email:{this.props.email}</li>
              <li>Fecha de Nacimiento: {this.props.birthday}</li>
              <li>(Edad: {this.props.age})</li>
              
              <div className='botones'>    
                <Collapsible className='content' style= {this.state.display} />  
              </div>
            </div>
        
        </React.Fragment>
    )}
}

}
