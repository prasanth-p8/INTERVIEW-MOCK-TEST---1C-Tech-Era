import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import CourseData from '../CourseData'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })

  useEffect(() => {
    const getCourseDetails = async () => {
      setApiStatus({status: apiStatusConstants.inProgress, data: null})

      const response = await fetch('https://apis.ccbp.in/te/courses')

      const responseData = await response.json()
      if (response.ok) {
        const data = responseData.courses

        const formattedData = data.map(eachData => ({
          id: eachData.id,
          name: eachData.name,
          logoUrl: eachData.logo_url,
        }))
        setApiStatus({status: apiStatusConstants.success, data: formattedData})
      } else {
        setApiStatus({status: apiStatusConstants.failure, data: null})
      }
    }

    getCourseDetails()
  }, [])

  const renderLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <>
        <h1 className="home-heading">Courses</h1>
        <ul className="course-details-list">
          {data.map(eachCourse => (
            <CourseData key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </>
    )
  }

  const retryCourseDetails = () => {}

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={retryCourseDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderCourseDetails = () => {
    const {status} = apiStatus

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div>{renderCourseDetails()}</div>
}

export default Home
