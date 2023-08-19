import React, { useState } from 'react';
import './ClothingApplication.css';
import { useNavigate } from 'react-router-dom';

function ClothingApplication() {
  const navigate = useNavigate();
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [clothingType, setClothingType] = useState('shirt');
  const [cost, setCost] = useState('');

  const handleCalculateCost = () => {
    let baseCost = 50; // Base cost for all clothing types

    // Calculate cost based on clothing type and measurements
    if (clothingType === 'shirt') {
      baseCost += chest * 1.5 + waist * 1 + hip * 0.5;
    } else if (clothingType === 'dress') {
      baseCost += chest * 1 + waist * 1.2 + hip * 1.5;
    } else if (clothingType === 'trouser') {
      baseCost += waist * 1.2 + hip * 1.2 + height * 0.8;
    }

    setCost(baseCost.toFixed(2));
  };

  const handleLogout = () => {
    navigate('/logout');
  }

  return (
    <div className="clothing-container">
      <h2>Clothing Kart</h2>
      <form className="clothing-form">
        <div className="form-group">
          <label for="chest">Chest:</label>
          <input type="number" id="chest" className="form-control" value={chest} onChange={(e) => setChest(e.target.value)} placeholder="Enter chest measurement" />
        </div>
        <div className="form-group">
          <label for="waist">Waist:</label>
          <input type="number" id="waist" className="form-control" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="Enter waist measurement" />
        </div>
        <div className="form-group">
          <label for="hip">Hip:</label>
          <input type="number" id="hip" className="form-control" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="Enter hip measurement" />
        </div>
        <div className="form-group">
          <label for="height">Height:</label>
          <input type="number" id="height" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter height measurement" />
        </div>
        <div className="form-group">
          <label for="clothingType">Clothing Type:</label>
          <select id="clothingType" className="form-control" value={clothingType} onChange={(e) => setClothingType(e.target.value)} >
            <option value="shirt">Shirt</option>
            <option value="dress">Dress</option>
            <option value="trouser">Trouser</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCalculateCost}>Calculate Cost</button>
      </form>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      {cost && <p className="estimated-cost">Estimated Cost: MYR{cost}</p>}
      <div className="background-image"></div>
    </div>


  );
}

export default ClothingApplication;
