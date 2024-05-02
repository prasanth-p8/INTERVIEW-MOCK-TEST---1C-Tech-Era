import {Link} from 'react-router-dom'

const CourseData = props => {
  const {courseDetails} = props

  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`}>
      <li className="course-list-item">
        <img className="course-image" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseData
