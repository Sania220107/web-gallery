import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Featurs = () => {

    const [photos, setPhotos ] = useState("");

    useEffect(() => {
        const fetchFeaturs = async () => {
            try {
                const token = localStorage.getItem("accessToken")
                if(!token) {
                    Navigate("/signIn")
                    return
                }

                const FeatursResponse = await fetch(
                  "http://localhost:5000/foto/",
                  {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
            } catch (error) {
                
            }
        }
    })

  return (
    <div>Featurs</div>
  )
}

export default Featurs