
import React, { useState, useEffect } from "react";
import "./style.css";


function App() {
  const [conferences, setConferences] = useState([]);
  const [expandedCardIds, setExpandedCardIds] = useState([]);
  const [bookmarkedConferences, setBookmarkedConferences] = useState([]);


  useEffect(() => {
    fetch("https://gdscdev.vercel.app/api")
      .then((response) => response.json())
      .then((i) => {
        setConferences(i.content.data);
        console.log(i.content.data);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  }, []);

  const toggleBookmark = (conference) => {
    if (bookmarkedConferences.includes(conference)) {
      setBookmarkedConferences(prevBookmarkedConferences => prevBookmarkedConferences.filter(conf => conf !== conference));
    } else {
      setBookmarkedConferences(prevBookmarkedConferences => [...prevBookmarkedConferences, conference]);
    }
  };

  const isBookmarked = (conference) => {
    return bookmarkedConferences.includes(conference);
  };

  const toggleCardExpansion = (cardId) => {
    if (expandedCardIds.includes(cardId)) {
      setExpandedCardIds(expandedCardIds.filter((id) => id !== cardId));
    } else {
      setExpandedCardIds([...expandedCardIds, cardId]);
    }
  };

  return (
    <div className="App">
      <header className="top"> 
      <h1 style={{textAlign: 'center'}} >GDSC DevFest 2023</h1><br/>
      <h1>Conferences Information</h1>
      </header>
      
      <div className="conference-list">

        {conferences.map((conference) => (
          <div key={conference.id} className="conference-card">
           
            <img src={conference.banner_image} alt={conference.title} />
            <h2>{conference.title}</h2>

            <button 
             onClick={() => toggleCardExpansion(conference.id)}
             type="button"
            className= "btn btn-primary" 
            
             >
              For More Details
            </button>

         

            {expandedCardIds.includes(conference.id) && (
              <div>
              
              <div >
                <span className="fw-bold"> Details:</span>
               {conference.description}

              </div>


                <p> <span className="fw-bold">Date & Time: </span>{conference.date_time}</p>

                <p><span className="fw-bold">Organizer: </span>{conference.organiser_name} </p>
                <p>
                  <span className="fw-bold">Venue:</span> {conference.venue_name}, {conference.venue_city},{" "}
                  {conference.venue_country}
              
                </p>
                <button
              className={`text-black font-bold py-2 px-4 rounded ${isBookmarked(conference) ? 'bg-blue-500' : 'bg-gray-400'}`}
              onClick={() => toggleBookmark(conference)}
            >
              {isBookmarked(conference) ? 'Bookmarked' : 'Bookmark'}
            </button>
             
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
