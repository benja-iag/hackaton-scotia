import judini
from judini.agent import Agent
import os
import asyncio #pip install flask[async]
from dotenv import load_dotenv

from flask import Flask, request
#asyncio
app = Flask(__name__)

#Judini
api_key= os.getenv("JUDINI_API_KEY")
agent_id= os.getenv("JUDINI_AGENT_ID")

print(api_key, agent_id)

agent = Agent(api_key,agent_id)

load_dotenv()

@app.route("/")
def main():
    prompt = request.args.get('body')
    # prompt = "Buenos dias, necesito saber que informacion tengo que mandar para obtener un credito de consumo"
    asyncio.create_task(
        response_processing(prompt)
    )
    auto_response = "Generando respuesta..."
    return auto_response

async def response_processing(prompt):
    response = agent.completion(prompt=prompt, stream=False)
    print(response)


if __name__ == '__main__':
    app.run()