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

type emailType = {
  email?: string;
  from?: string;
  subject?: string;
  to?: string;
};
export default function Home() {
  const [valueEmail, setValueEmail] = React.useState<String>();
  const [email, setEmail] = React.useState<emailType>({});
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

  const handleSubmitButton = async () => {
    setMessageButton("Ingresar email");
    changeShowResultsValue();
    const results = await fetch(
      `http://localhost:3000/process_mail?body=${email.email}&from=${email.from}&to=${email.to}&subject=${email.subject}`
    );
  };
  const handleChangeButton = async () => {
    changeShowResultsValue();
    setMessageButton("Ver soluciones");
    setResults(await fetch("http://localhost:3000/").then((res) => res.json()));
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
          height: "100hv",
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
                  variant="outlined"
                  label="Origen"
                  sx={{ p: 1 }}
                  fullWidth
                  onChange={(e) =>
                    setEmail((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="outlined"
                  label="Destino"
                  sx={{ p: 1 }}
                  fullWidth
                  onChange={(e) =>
                    setEmail((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="outlined"
                  label="Asunto"
                  sx={{ p: 1 }}
                  fullWidth
                  onChange={(e) =>
                    setEmail((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Cuerpo del correo"
                  multiline
                  rows={4}
                  value={valueEmail}
                  onChange={(e) =>
                    setEmail((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
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
