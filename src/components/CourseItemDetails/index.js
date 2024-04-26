import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import {
  CourseDetailsItemContainer,
  LoadingViewContainer,
  FailureViewContainer,
  FailureViewImage,
  FailureViewHeading,
  FailureViewDescription,
  FailureViewButton,
  CourseDetailContainer,
  CourseItemImage,
  CourseDetailsSubContainer,
  CourseTitle,
  CourseContent,
} from './styledComponents'

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
    <LoadingViewContainer>
      <Loader type="TailSpin" color="#00BFFF" height={50} weight={50} />
    </LoadingViewContainer>
  )

  const retryCourseDetailsItem = () => {}

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
      <FailureViewButton onClick={retryCourseDetailsItem}>
        Retry
      </FailureViewButton>
    </FailureViewContainer>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <CourseDetailContainer>
        <CourseItemImage src={data.imageUrl} alt={data.name} />
        <CourseDetailsSubContainer>
          <CourseTitle>{data.name}</CourseTitle>
          <CourseContent>{data.description}</CourseContent>
        </CourseDetailsSubContainer>
      </CourseDetailContainer>
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

  return (
    <CourseDetailsItemContainer>
      {renderCourseDetailsItem()}
    </CourseDetailsItemContainer>
  )
}

export default CourseItemDetails
