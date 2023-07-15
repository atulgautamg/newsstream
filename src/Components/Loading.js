import React, { Component } from 'react'
import loading from './Loading_icon.gif'
export class Loading extends Component {
  render() {
    return (
      <div>
          <div className="text-center" >
            <img src={loading} style={{width:'100px'}} alt="loading" />
          </div>
      </div>
    )
  }
}

export default Loading
