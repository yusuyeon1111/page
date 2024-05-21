import React, { useEffect, useState } from 'react'
import '../css/car.css'
import Modal from 'react-modal';
import { Cookies, useCookies } from 'react-cookie';
const Car = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([
    { name: '소나타', plate: '160하 5698', available: true },
    { name: '캐스퍼', plate: '201호 4961', available: true },
    { name: '니로', plate: '178허 3292', available: true },
    { name: '코나', plate: '230루 5048', available: true }
  ]);

  const [cookies, setCookie] = useCookies(['savedCars']);

  useEffect(() => {
    const savedCars = cookies.savedCars;
    if(savedCars){
      setCars(savedCars);
    }
  }, [cookies.savedCars]);

  const saveCarsToCookie = (updatedCars) => {
    setCookie('savedCars', updatedCars);
  }

  const modalHandler = (car) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedCar(car);
  };

  const handleUseButtonClick = () => {
    const updatedCars = cars.map((car) =>
      car === selectedCar ? { ...car, available: !car.available } : car
    );
    setModalIsOpen(false); 
    saveCarsToCookie(updatedCars);
    setSelectedCar(null); 
    setCars(updatedCars); 
  };

  return (
    <div className='car-container'>
      {cars.map((car, index) => (
        <div className='car' key={index} onClick={() => modalHandler(car)}
        style={car.available ? {border:'solid 1px #4974FF'} : {backgroundColor:'gainsboro'}}
        > 
          <p>{car.name}</p>
          <p>{car.plate}</p>
          <p>{car.available ? "사용가능" : "사용중"}</p>
        </div>
      ))}
      <div className='modal-container'>
        {modalIsOpen &&
          <Modal
            isOpen={true}
            ariaHideApp={false}
            onRequestClose={() => setModalIsOpen(false)}
            className="custom-modal"
          >
            <h3>차량이용</h3>
            <br/>
            <div className='car-info'>
              <p>{selectedCar && selectedCar.name}</p>
              <p>{selectedCar && selectedCar.plate}</p>
              <p>{selectedCar && selectedCar.available ? "사용가능" : "사용중"}</p>
                <button onClick={handleUseButtonClick}>{selectedCar && selectedCar.available ? "사용":"반납"}</button>
            </div>
          </Modal>
        }
      </div>
    </div>
  );
}

export default Car