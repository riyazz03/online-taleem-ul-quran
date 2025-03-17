import React from 'react'
import "@/app/css/keyBenefits.css"
import keybenefits from "@/app/data/key-benefits.json"
import KeyBenefitsCard from '@/app/components/keyBenefitsCard'

const keyBenefits = () => {
  return (
    <div className="key-benefits-section">
        <div className="main-container key-benefits-container">
            <h1 className='section-title key-benefits-title'>Key Benefits of <span>Our Program</span></h1>
            <div className='key-benefits-cards'>
                {keybenefits.map((card, index) => (
                    <KeyBenefitsCard key={index} title={card.title} description={card.description} icon={card.icon} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default keyBenefits