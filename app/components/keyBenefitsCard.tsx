import React from "react";
import "../css/keyBenefitsCard.css";
import Image from "next/image";

const KeyBenefitsCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="key-benefits-card">
      <div className="key-benefits-card-icon">
        <Image src={icon} alt="circle" className="circle-icon" width={90} height={90} />
        <Image src={icon} alt={title} className="key-benefits-card-icon-image" width={60} height={60} />

      </div>
      <h2 className="key-benefits-card-title">{title}</h2>
      <p className="key-benefits-card-description">{description}</p>
    </div>
  );
};

export default KeyBenefitsCard;