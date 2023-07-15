import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
       static defaultProps={
        pagesize:10,
        category:'general', 
        country:'in'
       }
       static propTypes={
        pagesize:PropTypes.number,
        category: PropTypes.string
       }
       articles= [
        {
          "source": {
            "id": "the-washington-post",
            "name": "The Washington Post"
          },
          "author": "Joel Achenbach",
          "title": "Strange DNA found in the desert offers lessons in the hunt for Mars life - The Washington Post",
          "description": "“In almost half of the cases, the databases could not clearly say what we had in our hands,” said researchers studying rocks from the Atacama Desert in Chile.",
          "url": "https://www.washingtonpost.com/science/2023/02/21/mars-life-atacama-microbiome/",
          "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ZXRCUA22KYNCB5UPIVKVVFIQLQ.jpeg&w=1440",
          "publishedAt": "2023-02-21T16:20:49Z",
          "content": "Comment on this story\r\nThe Atacama Desert is just about the driest place on Earth. In spots, it looks a lot like Mars. But its not lifeless, even in the hyper-arid regions. Using state-of-the-art equ… [+6383 chars]"
        },
        {
          "source": {
            "id": "cnn",
            "name": "CNN"
          },
          "author": "Lauren Fox, Nicky Robertson",
          "title": "Rep. David Cicilline to resign from Congress June 1 to run foundation - CNN",
          "description": "Rep. David Cicilline, a Rhode Island Democrat, will resign from Congress June 1 to run the Rhode Island Foundation.",
          "url": "https://www.cnn.com/2023/02/21/politics/david-cicilline-resign-congress/index.html",
          "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230221092718-file-david-cicilline-2020.jpg?c=16x9&q=w_800,c_fill",
          "publishedAt": "2023-02-21T16:12:00Z",
          "content": "Rep. David Cicilline, a Rhode Island Democrat, will resign from Congress June 1 to run the Rhode Island Foundation. \r\nFor more than a decade, the people of Rhode Island entrusted me with a sacred dut… [+1052 chars]"
        }
      ]  
       capitalize=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
        constructor(props)
        {  super(props);
          this.state={
              articles:this.articles,
              loading:false,
              page:1,
              totalResultS:0
          };
          {this.props.category=='general'? document.title=` News Stream ` :
          document.title=`${ this.capitalize(this.props.category)}- News Stream `}
          console.log("constructor");
        }
       async componentDidMount()
        {
          console.log("cdm");
          this.props.setProgress(10);
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd4013f9d2d348539412a1743cdc82fa&page=1&pageSize=${this.props.pagesize}`;
          this.setState({loading:true});
          let data=await fetch(url);
          this.props.setProgress(30);
          let parseddata=await data.json();
          this.props.setProgress(40);
          console.log(parseddata);
          this.setState({articles:parseddata.articles,totalResults:parseddata.totalResults,loading:false});
            this.props.setProgress(100);
        }
         handlenext= async()=>
        {
          if(Math.ceil(this.state.totalResults/this.props.pagesize)<this.state.page+1)
          {
                    
          }   
          else {
         
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd4013f9d2d348539412a1743cdc82fa&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
          this.setState({loading:true});
          let data=await fetch(url);
          
          let parseddata=await data.json();
          console.log(parseddata);
          
          this.setState({articles:parseddata.articles,page:this.state.page+1, totalResults:parseddata.totalResults, loading:false })
          
          
          }
        }
         handleprev= async()=>                                                   // ciel(totalresults/pagesize>pagno)
        {
           
          console.log("cdm");
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd4013f9d2d348539412a1743cdc82fa&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
          this.setState({loading:true});

          let data=await fetch(url);
          let parseddata=await data.json();
          console.log(parseddata);
          this.setState({articles:parseddata.articles,page:this.state.page-1, totalResults:parseddata.totalResults,loading:false }
            
            );
            
        }
        fetchMoreData =async()=>{
            this.setState({page:this.state.page+1})
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd4013f9d2d348539412a1743cdc82fa&page=${this.state.page}&pageSize=${this.props.pagesize}`;
          
          let data=await fetch(url);
          let parseddata=await data.json();
          console.log(parseddata);
          
          this.setState({articles:this.state.articles.concat(parseddata.articles),
            totalResults:parseddata.totalResults});
            

        }
    render() {
      console.log("render");
    return (
         <>
       {this.props.category==='general'? <h2> Top Headlines of Country news</h2>:<h2> Top Headlines of  {this.capitalize( this.props.category)} news</h2>}
       {this.state.loading && <Loading></Loading>}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResultS}
          loader={ ""}
        >
        <div className="container">
       <div className="row">
        
        {  this.state.articles.map((element)=>{
         return  <div className='col-md-3' key={element.url}>
  <NewsItem Name={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,80):""} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
         </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
        </>
   
    
    
        )
}
}

/*
<div className="d-flex justify-content-between">
<button type="button" className="btn btn-warning" id='prev' disabled={this.state.page===1} onClick={this.handleprev}> &larr; Previous Page</button>
<button type="button" className="btn btn-warning" id='next' disabled={Math.ceil(this.state.totalResults/this.props.pagesize)<this.state.page+1} onClick={this.handlenext}> Next Page  &rarr;</button>

</div> 
*/
  



export default News
