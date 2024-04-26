import {Link} from 'react-router-dom'

import {CourseListItem, CourseImage, CourseName} from './styledComponents'

const CourseData = props => {
  const {courseDetails} = props

  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`}>
      <CourseListItem>
        <CourseImage src={logoUrl} alt={name} />
        <CourseName>{name}</CourseName>
      </CourseListItem>
    </Link>
  )
}

export default CourseData
