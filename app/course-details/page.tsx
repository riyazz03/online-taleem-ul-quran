import React from 'react'
import CourseDetailsPage from '../sections/CourseDetailsPage/CourseDetailsPageCtc'
import TilawatCourseOverview from '../sections/CourseDetailsPage/TilawatCourseOverview'
import QuranLearningOverview from '../sections/CourseDetailsPage/QuranLearningOverview'
import PropheticHadithSection from '../sections/CourseDetailsPage/PropheticHadithSection'
import OurCoursesLive from '../sections/OurCourses/OurCoursesLive'

const BookYourDemo = () => {
  return (
    <main className='main'>
        <CourseDetailsPage />
        <TilawatCourseOverview />
        <QuranLearningOverview />
        <PropheticHadithSection />
        <OurCoursesLive />
    </main>
  )
}

export default BookYourDemo



