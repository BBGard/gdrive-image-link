import { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  OutlinedInput,
  CardMedia,
} from "@mui/material";
import cardImage from "./assets/undraw_image.svg";

import './App.css'

function App() {

  const [modifiedLink, setModifiedLink] = useState(""); // State to store modified link
  const [showError, setShowError] = useState(false);    // State to show error message
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

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
        justifyContent: "flex-start",
        minHeight: "100svh",
        maxHeight: "fit-content",
        padding: "0 1rem",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ marginTop: "10%" }}>
        Google Drive Image Link Converter
      </Typography>

      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          margin: "1rem auto",
          height: "fit-content",
        }}
      >
        <CardMedia component="img" width="300" image={cardImage} />
        <CardContent
          sx={{
            textAlign: "center",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <Typography variant="primary" fontSize={"1.1rem"} fontWeight={"500"}>
            This app converts Google Drive Image Links to Direct Image Links
            which can be used dynamically in websites.
            <br />
            <br />
          </Typography>
          <Typography variant="primary" fontSize={"1.1rem"}>
            To get the Google Drive Image Link, open an image in Google Drive,
            click &quot;Share&quot;, then click &quot;Get Link&quot;.
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          marginBottom: "1rem",
          height: "fit-content",
        }}
      >
        <form onSubmit={handleSubmit}>
          <CardActions>
            <OutlinedInput
              fullWidth
              placeholder="Enter Google Drive Link"
              inputProps={{ "aria-label": "Google Drive Link" }}
            />
          </CardActions>
          <CardActions>
            <Button
              sx={{
                backgroundColor: "#6c63ff",
                "&:hover": {
                  backgroundColor: "#4c47b3",
                },
              }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Convert
            </Button>
            <Button
              color="error"
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

      {modifiedLink && !showError ? (
        <>

      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          marginBottom: "1rem",
          height: "fit-content",
        }}
      >
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
            sx={{
              backgroundColor: "#6c63ff",
              "&:hover": {
                backgroundColor: "#4c47b3",
              },
            }}
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

        <Card sx={{ maxWidth: 500, width: "100%", height: "fit-content" }}>
          <CardMedia component="img" width="300" image={modifiedLink} />
          <CardActions>
            <Button
              sx={{
                backgroundColor: "#6c63ff",
                "&:hover": {
                  backgroundColor: "#4c47b3",
                },
              }}
              fullWidth
              variant="contained"
              href={modifiedLink}
              target="_blank"
            >
              Open Image
            </Button>
          </CardActions>
        </Card>
        </>
      ) : showError ? (
        <Card sx={{ maxWidth: 500, width: "100%", height: "fit-content" }}>
          <CardContent sx={{ justifyContent: "center" }}>
            <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
              {errorMessage}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
}



export default App
