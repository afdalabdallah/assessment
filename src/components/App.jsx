import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [rawPosts, setRawPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [postFiltered, setPostFiltered] = useState([])
  const [load, setLoad] = useState(10);
  const postPerPages = 10;
  const [defaultPage,setDefaultPage] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setRawPosts(json.posts);
        setDisplayPosts(json.posts.slice(0, load));
      })
      .catch((err) => console.log(err))
  },[])

  const dispPerPage = (dispPost, end) => {
    setDisplayPosts(dispPost.slice(0, end));
  };

  const postFilter = (category) => {
    setDefaultPage(false);
    const filterPost =  rawPosts.filter((post) => {
      return post.categories.find((cat) => cat.name === category);
    });
    setLoad(10)
    setPostFiltered(filterPost);
    setDisplayPosts(filterPost.slice(0, postPerPages));
  };

  const resetFilter = () => {
    setDefaultPage(true)
    setLoad(10);
    setDisplayPosts(rawPosts);
    dispPerPage(rawPosts, postPerPages);
  };

  const loadMore = (targetPost) => {
    dispPerPage(targetPost, postPerPages + load);
    setLoad(prev => prev + postPerPages)
    
  }
  return (
    <>
      <div className="container py-5">
        <h2>Filter</h2>
        <div className="row text-center">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() =>  postFilter('Ecommerce')}
            >
              Ecommerce
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Digital Marketing')}
            >
              Digital Marketing
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Data Management')}
            >
              Data Management
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Marketing Analytics')}
            >
              Marketing Analytics
            </button>
          </div>
         
        </div>
        <div className="row text-center mt-2 mb-4">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Surveys and Forms')}
            >
              Surveys and Forms
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Tips and Best Practise')}
            >
              Tips and Best Practise
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Platform News and Updates')}
            >
              Platform News and Updates
            </button>
          </div>
        </div>
        <h4>Posts</h4>
        <table className="table table-bordered table-responsive-md">
          <thead>
            <tr className="align-text-center">
              <th>No</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Categories</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {displayPosts.map((post, index) => (
              <tr id={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td width={'500px'}>{post.summary}</td>
                <td width={'500px'}>
                  {post.categories.map((cat) => (
                    <span>{cat.name}, </span>
                  ))}
                </td>
                <td>{post.author.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          {defaultPage ?
          <button className="btn btn-primary" onClick={() => loadMore(rawPosts)}>Load More</button>
          :
          <button className="btn btn-primary" onClick={() => loadMore(postFiltered)}>Load More</button>
          }

            <button className="btn btn-primary" onClick={() => resetFilter()}>
              Home
            </button>
        </div>
      </div>
    </>
  );
}

export default App;
