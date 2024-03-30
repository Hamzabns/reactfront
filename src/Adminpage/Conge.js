import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Conge = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get('http://localhost:8000/api/admin/alldemande', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setDemandes(response.data.demandes);
      } catch (error) {
        console.error('Error fetching demandes:', error.message);
      }
    };

    fetchDemandes();
  }, []);

  const handleAcceptDemande = async (id) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put(`http://localhost:8000/api/admin/updatedemande/${id}`, { status: 'accepter' }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Update the demande in the local state
      const updatedDemandes = demandes.map(demande => {
        if (demande.id === id) {
          demande.status = 'accepter';
        }
        return demande;
      });
      setDemandes(updatedDemandes);

      console.log(response.data.message);
    } catch (error) {
      console.error('Error accepting demande:', error.message);
    }
  };

  const handleRefuseDemande = async (id) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put(`http://localhost:8000/api/admin/updatedemande/${id}`, { status: 'refuser' }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Update the demande in the local state
      const updatedDemandes = demandes.map(demande => {
        if (demande.id === id) {
          demande.status = 'refuser';
        }
        return demande;
      });
      setDemandes(updatedDemandes);

      console.log(response.data.message);
    } catch (error) {
      console.error('Error refusing demande:', error.message);
    }
  };

  return (
    <div>
      <table border={1} class="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>solde conge</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Motif</th>
            <th>solde demandee</th>
            <th>Status</th>
            <th>Action</th>
            {/* Ajoutez d'autres en-têtes de colonne ici si nécessaire */}
          </tr>
        </thead>
        <tbody>
          {demandes.map(demande => (
            <tr key={demande.id}>
              <td>{demande.user ? `${demande.user.firstname} ${demande.user.lastname}` : ''}</td>
              <td>{demande.user ? `${demande.user.soldecongée}` : ''}</td>
              <td>{demande.date_d}</td>
              <td>{demande.date_f}</td>
              <td>{demande.motif}</td>
              <td>{demande.solde}</td>
              <td>{demande.status}</td>
              <td>
                {demande.status !== 'accepter' && demande.status !== 'refuser' && (
                  <>
                    <button onClick={() => handleAcceptDemande(demande.id)}>Accepter</button>
                    <button onClick={() => handleRefuseDemande(demande.id)}>Refuser</button>
                  </>
                )}
              </td>
              {/* Ajoutez d'autres colonnes de données ici si nécessaire */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Conge;
