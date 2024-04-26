import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import CourseData from '../CourseData'

import {
  MainContainer,
  HomeHeading,
  LoadingViewContainer,
  CourseDetailsList,
  FailureViewContainer,
  FailureViewImage,
  FailureViewHeading,
  FailureViewDescription,
  FailureViewButton,
} from './styledComponents'

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
    <LoadingViewContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoadingViewContainer>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <>
        <HomeHeading>Courses</HomeHeading>
        <CourseDetailsList>
          {data.map(eachCourse => (
            <CourseData key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </CourseDetailsList>
      </>
    )
  }

  const retryCourseDetails = () => {}

  const renderFailureView = () => (
    <FailureViewContainer>
      <FailureViewImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureViewHeading>Oops! Something Went Wrong</FailureViewHeading>
      <FailureViewDescription>
        We cannot seem to find the page you are looking for.
      </FailureViewDescription>
      <FailureViewButton onClick={retryCourseDetails}>Retry</FailureViewButton>
    </FailureViewContainer>
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

  return <MainContainer>{renderCourseDetails()}</MainContainer>
}

export default Home
