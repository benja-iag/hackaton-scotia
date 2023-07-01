import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { MailResponse } from "@/types/types";
import Result from "@/components/result";

export default function Home() {
  const [valueEmail, setValueEmail] = React.useState<String>();
  const [showResults, setShowResults] = React.useState<Boolean>(false);
  const [messageButton, setMessageButton] =
    React.useState<String>("Ver soluciones");
  const [results, setResults] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      setResults(
        await fetch("http://localhost:3000/").then((res) => res.json())
      );
    }
    fetchData();
  }, []);

  const handleSubmitButton = () => {
    setMessageButton("Ingresar email");
    changeShowResultsValue();
  };
  const handleChangeButton = () => {
    changeShowResultsValue();
    setMessageButton("Ver soluciones");
  };
  const changeShowResultsValue = () => {
    setShowResults(!showResults);
  };

  return (
    <>
      <Header />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(230, 230, 230)",
        }}
      >
        {showResults ? (
          <Result mailResponse={results} />
        ) : (
          <>
            <Card sx={{ minWidth: 650, mt: 4 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Ejemplo de input de correo
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <CardActions sx={{ mb: -2.3 }}>
                  <Button
                    disabled={valueEmail === "Insert your email here"}
                    variant="contained"
                    sx={{ ml: "auto" }}
                    onClick={handleSubmitButton}
                  >
                    Submit
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </>
        )}
        <Button
          variant="contained"
          onClick={handleChangeButton}
          sx={{ mt: 2.5 }}
        >
          {messageButton}
        </Button>
      </main>
    </>
  );
}
