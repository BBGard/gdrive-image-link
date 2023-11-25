import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  OutlinedInput,
  CardMedia,
} from "@mui/material";

import './App.css'

function App() {

  const [modifiedLink, setModifiedLink] = useState(""); // State to store modified link
  const [showError, setShowError] = useState(false);    // State to show error message
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message


  useEffect(() => {
    console.log("modifiedLink: ", modifiedLink);
  } , [modifiedLink]);

  // Handle form submit
  function handleSubmit(event) {
    event.preventDefault();

    const link = event.target[0].value;

    // Check link is valid, then extract image id and construct new link
    if (link === undefined) {
      throwError("Invalid Link");
      return;
    }
    else {
      constructNewLink(link);
    }
  }

  // Extract image id from google drive link and construct new link
  function constructNewLink(link) {
    const pattern = /\/d\/(.*?)\/view/; // Regex pattern to extract image id
    const match = link.match(pattern); // Match pattern with link

    // If match found, return image id, else return null
    if (match) {
      setModifiedLink(`https://drive.google.com/uc?export=view&id=${match[1]}`);
    } else {
      throwError("Invalid Link");
    }
  }

  // Throw error
  function throwError(message) {
    setShowError(true);
    setErrorMessage("Error: " + message);
  }




  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100svh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Google Drive Image Link Converter
      </Typography>
      <Card sx={{ width: 500, marginBottom: "1rem"}}>
        <form onSubmit={handleSubmit}>
          <CardActions>
            <OutlinedInput
              fullWidth
              placeholder="Enter Google Drive Link"
              inputProps={{ "aria-label": "Google Drive Link" }}
            />
          </CardActions>
          <CardActions>
            <Button fullWidth variant="contained" type="submit">
              Convert
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setModifiedLink("");
                setShowError(false);
                setErrorMessage("");
                document.querySelector("form").reset();
              }}
            >
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
      <Card sx={{ width: 500, marginBottom: "1rem" }}>
        <CardActions>
          <TextField
            fullWidth
            value={modifiedLink}
            label="Converted Link"
            variant="outlined"
          />
        </CardActions>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(modifiedLink);
            }}
            disabled={modifiedLink === ""}
          >
            Copy Link
          </Button>
        </CardActions>
      </Card>

      {modifiedLink && !showError ? (
        <Card sx={{ width: 500 }}>
          <CardMedia component="img" width="300" image={modifiedLink} />
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              href={modifiedLink}
              target="_blank"
            >
              Open Image
            </Button>
          </CardActions>
        </Card>
      ) :  showError ? (
        <Card sx={{ width: 500}}>
          <CardActions sx={{justifyContent: "center"}}>
            <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
              {errorMessage}
            </Typography>
          </CardActions>
        </Card>
      ) : null}

    </Box>


  )
}



export default App
