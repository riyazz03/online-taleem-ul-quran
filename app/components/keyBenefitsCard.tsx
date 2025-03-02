import React from "react";
import "../css/keyBenefitsCard.css";

const KeyBenefitsCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="key-benefits-card">
      <div className="key-benefits-card-icon">
        <img src={icon} alt={title} className="key-benefits-card-icon-image" />
      </div>
      <h2 className="key-benefits-card-title">{title}</h2>
      <p className="key-benefits-card-description">{description}</p>
    </div>
  );
};

export default KeyBenefitsCard;
