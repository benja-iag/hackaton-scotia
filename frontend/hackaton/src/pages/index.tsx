import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Header } from "@/components/Header";
import { MailResponse } from "@/types/types";
import Result from "./result";

export default function Home() {
  const [valueEmail, setValueEmail] = React.useState<String>();
  const [showResults, setShowResults] = React.useState<Boolean>(false);
  const [messageButton, setMessageButton] =
    React.useState<String>("Ver soluciones");
  const mockResults: MailResponse[] = [
    {
      subject: "Actualización de información de cuenta",
      from: "cliente1@scotiabank.com",
      to: "scotiabank@scotiabank.com",
      body: "Estimado Scotiabank, me gustaría actualizar la información de mi cuenta bancaria. Adjunto encontrarás los documentos necesarios. Gracias.",
      generatedResponse:
        "Gracias por proporcionar la información actualizada. Hemos actualizado tu cuenta con éxito.",
      done: "false",
      created_at: "2023-06-30T09:00:00Z",
    },
    {
      subject: "Consulta sobre mi tarjeta de crédito",
      from: "cliente2@scotiabank.com",
      to: "scotiabank@scotiabank.com",
      body: "Hola, tengo una pregunta sobre los beneficios de mi tarjeta de crédito. ¿Podrían proporcionarme más información al respecto? Gracias.",
      generatedResponse:
        "Gracias por tu consulta. Nuestro equipo de servicio al cliente se pondrá en contacto contigo para brindarte la información solicitada.",
      done: "true",
      created_at: "2023-06-29T14:30:00Z",
    },
    {
      subject: "Solicitud de préstamo",
      from: "cliente3@scotiabank.com",
      to: "scotiabank@scotiabank.com",
      body: "Estimados, estoy interesado en solicitar un préstamo personal. ¿Cuáles son los requisitos y cómo puedo proceder? Gracias por su ayuda.",
      generatedResponse:
        "Gracias por tu interés en nuestros préstamos personales. Adjuntamos los requisitos y el formulario de solicitud. Por favor, completa el formulario y envíalo de vuelta para iniciar el proceso.",
      done: "false",
      created_at: "2023-06-28T16:45:00Z",
    },
    {
      subject: "Solicitud de vacaciones",
      from: "empleado1@scotiabank.com",
      to: "rh@scotiabank.com",
      body: "Estimado departamento de Recursos Humanos, me gustaría solicitar unas vacaciones para el próximo mes. Adjunto encontrarás el formulario de solicitud de vacaciones completado. Gracias.",
      generatedResponse:
        "Gracias por tu solicitud. Hemos registrado tus fechas de vacaciones y te enviaremos una confirmación por correo electrónico.",
      done: "true",
      created_at: "2023-06-27T11:20:00Z",
    },
    {
      subject: "Consulta sobre el programa de beneficios",
      from: "empleado2@scotiabank.com",
      to: "beneficios@scotiabank.com",
      body: "Hola, tengo una pregunta sobre los beneficios disponibles para los empleados del banco. ¿Podrían brindarme más detalles al respecto? Gracias.",
      generatedResponse:
        "Gracias por tu consulta. Nuestro equipo de recursos humanos se pondrá en contacto contigo para proporcionarte la información sobre los beneficios disponibles.",
      done: "true",
      created_at: "2023-06-26T08:50:00Z",
    },
  ];

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
          <Result mailResponse={mockResults} />
        ) : (
          <>
            <Card sx={{ minWidth: 650, maxHeight: 300 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Ejemplo de input de correo
                </Typography>
                <Typography variant="body2" sx={{ pl: 1, pr: 1 }}>
                  <TextField
                    disabled
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue={"Example email"}
                    margin="normal"
                  />
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 650, mt: 4 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Ejemplo de input de correo
                </Typography>
                <Typography variant="body2" sx={{ pl: 1, pr: 1 }}>
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
                </Typography>
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
