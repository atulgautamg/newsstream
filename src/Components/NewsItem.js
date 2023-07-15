import React, { Component } from 'react'
import img1 from "./img2.JPG";

export class NewsItem extends Component {
  render() {
    let {Name,description,url,imageurl,author,date,source}=this.props;
    return (
      <div className='row-container'>
        <div className="card " style={{width:'300px'}}>
  {imageurl?<img src={imageurl} style={{height:'250px',width:'300px'}} className="card-img-top" alt="..."/>
  : <img src={img1} style={{height:'250px',width:'300px'}} className="card-img-top" alt="..."/>
 
  }
  <div className="card-body">
    <h5 className="card-title">{Name}....</h5>
    
    <p className="card-text">{description}...</p>
    <span class="badge1 position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:'1'}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
    <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on <br /> {new Date(date).toGMTString()}</small></p>
    <a href={url}   className="btn btn-primary">Read More</a>
  </div>
     </div>
      </div>
    )
  }
}

export default NewsItem
