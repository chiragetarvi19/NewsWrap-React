import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function getNews (query, articles){
  const filtereNews=articles.filter((article)=>
    article?.description?.toLowerCase().includes(query.toLowerCase()) || article?.title?.toLowerCase().includes(query.toLowerCase())
  );
  return filtereNews;
}

const News =(props)=> {
  let myStyle = {
    color: props.mode === "dark" ? "white" : "black",
    backgroundColor: props.mode === "light" ? "white" : "black",
    marginTop: '115px',
    marginBottom: '15px'
  };
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;

  const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  

  const updateNews=async() =>{
    props.setProgress(10);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setFilteredArticles(parsedData.articles);
    setTotal(parsedData.total);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title= `${capitaliseFirstLetter(props.category)} - NewsWrap`
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setFilteredArticles(parsedData.articles);
    setTotal(parsedData.total);
  };

  if(!filteredArticles) return <h2>NONE</h2>

  return(
      <>
      <div className="flex"> 

        <h1 className="text-center" style={myStyle}>
          <strong>
            Top{" "}
            {props.category !== "general"
              ? capitaliseFirstLetter(props.category)
              : ""}{" "}
            Headlines
          </strong>
        </h1>
        <div className="align-self-end">

        <input type="search" id="query-search" placeholder={`Search For ${props.category !== "general"
              ? capitaliseFirstLetter(props.category)
              : ""} News`} value={searchText} onChange={(e)=>{
          setSearchText(e.target.value)
          const data=getNews(searchText, articles)
          setFilteredArticles(data)}}/>
        </div>
      </div>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={filteredArticles?.length !== total}
          loader={filteredArticles?.length<total? <Spinner />:<></>}
        >
          <div className="container">
            <div className="row my-2">
              {filteredArticles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.hindustantimes.com/ht-img/img/2024/03/08/1600x900/G_N_Saibaba_1709911788785_1709911789001.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      mode={props.mode}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
