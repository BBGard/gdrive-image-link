import { useState, useEffect } from 'react'

import './App.css'

function App() {
  // Test link: https://drive.google.com/file/d/1CI5fpbHGAf3t4xKD_ZDAaw8P4GxZjl5n/view?usp=drive_link

  const [modifiedLink, setModifiedLink] = useState("");

  useEffect(() => {
    console.log("modifiedLink: ", modifiedLink);
  } , [modifiedLink]);

  // Handle form submit
  function handleSubmit(event) {
    event.preventDefault();

    const link = event.target[0].value;

    // Check link is valid, then extract image id and construct new link
    if (link !== undefined) {
      const imageId = extractImageId(link);
      setModifiedLink(constructNewLink(imageId));
    }
  }

  // Extract image id from google drive link
  function extractImageId(link) {
    const pattern = /\/d\/(.*?)\/view/; // Regex pattern to extract image id
    const match = link.match(pattern); // Match pattern with link

    // If match found, return image id, else return null
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  // Construct new link with image id
  function constructNewLink(imageId) {
    return `https://drive.google.com/uc?export=view&id=${imageId}`; // Construct new link
  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Google Drive Link:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>



      <img src={modifiedLink} alt="image" />
    </div>

  )
}



export default App
