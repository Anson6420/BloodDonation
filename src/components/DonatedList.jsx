import React, { useEffect, useState } from 'react';
import { getDonationlistApi } from '../Services/allApi';
import { updateDonation,deleteDonation } from '../Services/allApi';

function RegisteredList() {
  const [donation, setDonation] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deleteData, setDeleteregi] = useState([])

  const getAllDetails = async () => {
    const result = await getDonationlistApi();
    setDonation(result.data);
  };

  useEffect(() => {
    getAllDetails();
  }, [deleteData]);

  const handleEditClick = (item) => {
    setEditingRow(item.id); // Set the row to edit mode
    setEditedData(item); // Load the current row data into the edit form
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      
      const response = await updateDonation(editingRow, editedData);
      if (response.status === 200) {
     
        const updatedDonation = donation.map((item) =>
          item.id === editingRow ? { ...item, ...editedData } : item
        );
        setDonation(updatedDonation); 
  
        setEditingRow(null); 
      } else {
        console.error('Failed to update donation details');
       
      }
    } catch (error) {
      console.error('Error updating donation:', error);
      
    }
  };

const handleDelete = async (id) =>{
  try{
  const result = await deleteDonation(id);
  if(result.status>=200 && result.status<300){
    alert("Successfully deleted");
  }else{
    alert("Try again");
  }
  setDeleteregi(result.data)
}catch(error){
  console.error("Error deleting the item",error);
  alert("Error deleting the item")
}
};

  return (
    <>
      <div className="py-5 px-4 " style={{ marginTop: '100px' }}>
        <h1 className="text-danger text-center text-4xl mb-5 px-3 py-5 mt-4">Donated List</h1>
        <table className="w-100 border border-secondary">
          <thead>
            <tr className="text-center">
              <th className="border border-secondary bg-danger text-white">#</th>
              <th className="border border-secondary bg-danger text-white">Name</th>
              <th className="border border-secondary bg-danger text-white">Age</th>
              <th className="border border-secondary bg-danger text-white">Blood Group</th>
              <th className="border border-secondary bg-danger text-white">Location</th>
              <th className="border border-secondary bg-danger text-white">Contact</th>
              <th className="border border-secondary bg-danger text-white">Date of Donation</th>
              <th className="border border-secondary bg-danger text-white">Edit</th>
              <th className="border border-secondary bg-danger text-white">Delete</th>
            </tr>
          </thead>

          <tbody>
            {donation.length > 0 ? (
              donation.map((item, index) => (
                <tr key={item.id || index} className="text-center">
                  <td className="border border-secondary">{index + 1}</td>
                  {editingRow === item.id ? (
                    <>
                      <td className="border border-secondary">
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) => handleInputChange(e, 'name')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <input
                          type="number"
                          value={editedData.age}
                          onChange={(e) => handleInputChange(e, 'age')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <input
                          type="text"
                          value={editedData.bloodGroup}
                          onChange={(e) => handleInputChange(e, 'bloodGroup')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <input
                          type="text"
                          value={editedData.location}
                          onChange={(e) => handleInputChange(e, 'location')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <input
                          type="text"
                          value={editedData.contact}
                          onChange={(e) => handleInputChange(e, 'contact')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <input
                          type="date"
                          value={editedData.donationDate}
                          onChange={(e) => handleInputChange(e, 'donationDate')}
                        />
                      </td>
                      <td className="border border-secondary">
                        <button className="btn btn-success" onClick={saveEdit}>
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-secondary">{item?.name}</td>
                      <td className="border border-secondary">{item?.age}</td>
                      <td className="border border-secondary">{item?.bloodGroup}</td>
                      <td className="border border-secondary">{item?.location}</td>
                      <td className="border border-secondary">{item?.contact}</td>
                      <td className="border border-secondary">{item?.donationDate}</td>
                      <td className="border border-secondary">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="border border-secondary">
                        <button
                          className="btn btn-warning"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RegisteredList; 
