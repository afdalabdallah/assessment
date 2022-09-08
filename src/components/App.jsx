import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [rawPosts, setRawPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [load, setLoad] = useState(10);
  const postPerPages = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setRawPosts(data.posts);
      setDisplayPosts(rawPosts.slice(0, load));
    };
    fetchData();
  }, []);

  const dispPerPage = (dispPost, end) => {
    setDisplayPosts(dispPost.slice(0, end));
  };

  const postFilter = (category) => {
    setLoad(10);
    const filterPost = rawPosts.filter((post) => {
      return post.categories.find((cat) => cat.name === category);
    });
    setFilteredPosts(filterPost);
    setDisplayPosts(filteredPosts.slice(0, load));
  };

  const resetFilter = () => {
    setDisplayPosts(rawPosts);
    dispPerPage(rawPosts, postPerPages);
  };
  return (
    <>
      <div className="container py-5">
        <h2>Filter</h2>
        <div className="row text-center">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Ecommerce')}
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
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Landing Pages')}
            >
              Marketing Analytics
            </button>
          </div>
        </div>
        <div className="row text-center mt-2 mb-4">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => postFilter('Survey and Forms')}
            >
              Survey and Forms
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
        <div className="row">
          <div>
            <button className="btn btn-primary">Load More</button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => resetFilter()}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
