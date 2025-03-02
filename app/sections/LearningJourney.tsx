import React from 'react'
import Image from 'next/image'
import '../css/learning-journey.css'

const LearningJourney = () => {
  return (
    <section className='learning-journey'>
        <div className="main-container learning-journey-container">
            <div className="learning-journey-content">
                <h1 className='section-title'>Empowering Your Quran <span>Learning Journey</span></h1>
                <h4 className='learning-journey-description'>At Online Taleem ul Quran, we are committed to making Quran learning accessible, interactive, and enriching for students of all ages. With expert tutors, flexible online classes, and a structured curriculum, we provide a seamless learning experience tailored to your needs. Whether you&apos;re starting your journey, improving Tajweed, or memorizing the Quran, our platform ensures high-quality education from the comfort of your home.</h4>
                <button className='learning-journey-btn'>Know More</button>
            </div>
            <div className="learning-journey-image-div">
                <Image src="/Images/learning-journey-image.png" className='learning-journey-image' alt="Learning Journey" width={477} height={750} />
            </div>
        </div>
    </section>
  )
}

export default LearningJourney