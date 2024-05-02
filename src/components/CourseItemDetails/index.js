import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CourseItemDetails = props => {
  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })

  const {match} = props
  const {params} = match
  const {id} = params

  console.log(id)

  useEffect(() => {
    const getCourseDetailsItem = async () => {
      setApiStatus({status: apiStatusConstants.inProgress, data: null})

      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

      const responseData = await response.json()

      if (response.ok) {
        const data = responseData.course_details

        const formattedData = {
          id: data.id,
          name: data.name,
          imageUrl: data.image_url,
          description: data.description,
        }

        setApiStatus({status: apiStatusConstants.success, data: formattedData})
      } else {
        setApiStatus({status: apiStatusConstants.failure, data: null})
      }
    }
    getCourseDetailsItem()
  }, [id])

  const renderLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} weight={50} />
    </div>
  )

  const retryCourseDetailsItem = () => {}

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
        onClick={retryCourseDetailsItem}
      >
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <div className="course-detail-container">
        <img
          className="course-item-image"
          src={data.imageUrl}
          alt={data.name}
        />
        <div className="course-details-subContainer">
          <h1>{data.name}</h1>
          <p className="course-content">{data.description}</p>
        </div>
      </div>
    )
  }

  const renderCourseDetailsItem = () => {
    switch (apiStatus.status) {
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

  return <div>{renderCourseDetailsItem()}</div>
}

export default CourseItemDetails
