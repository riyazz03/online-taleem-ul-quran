import React from 'react'
import HowWeWork from '../sections/AboutUs/HowWeWork'
import OurCourseTeaching from '../sections/OurCourses/OurCourseTeaching'
import DontEnroll from '../sections/OurCourses/DontEnroll'
import OurJourney from '../sections/OurCourses/OurJourney'
import OurCoursesLive from '../sections/OurCourses/OurCoursesLive'

const OurCourse = () => {
  return (
    <main className='main'>
        <OurCourseTeaching />
        <OurJourney />
        <OurCoursesLive />
        <DontEnroll />
        <HowWeWork />
    </main>
  )
}

export default OurCourse