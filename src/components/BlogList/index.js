// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isSpinnerLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formattedData, isSpinnerLoading: false})
  }

  render() {
    const {blogsData, isSpinnerLoading} = this.state

    return (
      <div className="blogs-list-container">
        {isSpinnerLoading ? (
          <div data-testid="loader">
            <Loader type="tailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachItem => (
              <BlogItem key={eachItem.id} blogDetails={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
