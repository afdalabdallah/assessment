import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableRow from './TableRow';
import DetailPage from './DetailPage';
import { Helmet } from 'react-helmet';

const HTitle = styled.h2`
  font-weight: 700;
`;

const BodyMain = styled.div`
  color: white;
`;

const Grid = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1em;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function App() {
  const [rawPosts, setRawPosts] = useState([]); //To store the raw data from API
  const [displayPosts, setDisplayPosts] = useState([]); //To control the data displayed on the website
  const [postFiltered, setPostFiltered] = useState([]); //To set the filtered data, this is neeeded to store the original filtered data before sliced.
  const [load, setLoad] = useState(10); // To set how many data will be loaded to be displayed
  const postPerPages = 10; //Initial post per page
  const [defaultPage, setDefaultPage] = useState(true); //To control the pagination

  /* Fetches data from API and set it to post */
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setRawPosts(json.posts);
        setDisplayPosts(json.posts.slice(0, load));
      })
      .catch((err) => console.log(err));
  }, []);

  // Determining how many post to be displayed according to 'end' variable
  const dispPerPage = (dispPost, end) => {
    setDisplayPosts(dispPost.slice(0, end));
  };

  // To reset all category button into primary button except the clicked button
  const resetButton = () => {
    const otherBtn = document.getElementsByClassName('btn-cat');
    for (let i = 0; i < otherBtn.length; i++) {
      otherBtn[i].classList.remove('btn-success');
      otherBtn[i].classList.add('btn-primary');
    }
  };

  // To change the category button style when clicked, also run the filter function
  const onClickButton = (btnId, category) => {
    const btn = document.getElementById(btnId);
    resetButton();
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    postFilter(category);
  };

  // Filter the raw posts according to the category passed. The result will be set into filteredPost
  const postFilter = (category) => {
    setDefaultPage(false);
    const filterPost = rawPosts.filter((post) => {
      return post.categories.find((cat) => cat.name === category);
    });
    setLoad(10);
    setPostFiltered(filterPost);
    setDisplayPosts(filterPost.slice(0, postPerPages));
  };

  // Resets the posts displayed into the raw posts
  const resetFilter = () => {
    setDefaultPage(true);
    resetButton();
    setLoad(10);
    setDisplayPosts(rawPosts);
    dispPerPage(rawPosts, postPerPages);
  };

  // Controls load more by setting the load value
  const loadMore = (targetPost) => {
    dispPerPage(targetPost, postPerPages + load);
    setLoad((prev) => prev + postPerPages);
  };

  // To go to the top when the button is clicked
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <BodyMain>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <div className="container py-5">
        <Router>
          <Routes>
            {/* The elements that will show up in the homepage */}
            <Route
              path="/"
              element={
                <>
                  <HTitle>Filter by Category</HTitle>
                  <Grid>
                    {/* Buttons to control filter by category */}
                    <div className="text-center">
                      <button
                        id="ecommerce"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() => onClickButton('ecommerce', 'Ecommerce')}
                      >
                        Ecommerce
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="digital"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() =>
                          onClickButton('digital', 'Digital Marketing')
                        }
                      >
                        Digital Marketing
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="data"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() => onClickButton('data', 'Data Management')}
                      >
                        Data Management
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="marketing"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() =>
                          onClickButton('marketing', 'Marketing Analytics')
                        }
                      >
                        Marketing Analytics
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="surveys"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() =>
                          onClickButton('surveys', 'Surveys and Forms')
                        }
                      >
                        Surveys and Forms
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="tips"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() =>
                          onClickButton('tips', 'Tips and Best Practise')
                        }
                      >
                        Tips and Best Practise
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        id="news"
                        className="btn btn-primary btn-cat w-75 h-100"
                        onClick={() =>
                          onClickButton('news', 'Platform News and Updates')
                        }
                      >
                        Platform News and Updates
                      </button>
                    </div>
                    {/* Button to reset and return to default raw posts */}
                    <div className="text-center">
                      <button
                        className=" btn btn-primary btn-cat w-75 h-100"
                        onClick={() => resetFilter()}
                      >
                        Default
                      </button>
                    </div>
                  </Grid>

                  <h4>Posts</h4>
                  <div className="table-responsive-md">
                    <table
                      className="table table-bordered table-dark table-hover"
                      style={{ color: 'white' }}
                    >
                      <thead>
                        <tr className="align-text-center">
                          <th>No</th>
                          <th colSpan={4}>Title</th>
                          <th colSpan={4}>Summary</th>
                          <th colSpan={2}>Categories</th>
                          <th colSpan={2}>Author</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Iterate the posts to make a row for each post */}
                        {displayPosts.map((post, index) => (
                          <TableRow data={post} index={index} />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between">
                    {/* If the current state is default, the load more button will control
                    the raw posts, otherwise it will control the filtered posts */}
                    {defaultPage ? (
                      <button
                        className="btn btn-info"
                        onClick={() => loadMore(rawPosts)}
                      >
                        Load More
                      </button>
                    ) : (
                      <button
                        className="btn btn-info"
                        onClick={() => loadMore(postFiltered)}
                      >
                        Load More
                      </button>
                    )}
                    <button className="btn btn-info" onClick={() => goToTop()}>
                      To Top
                    </button>
                  </div>
                </>
              }
            ></Route>
            {/* Route for the details of each row */}
            <Route path="/details/:id" element={<DetailPage />}></Route>
          </Routes>
        </Router>
      </div>
    </BodyMain>
  );
}

export default App;
