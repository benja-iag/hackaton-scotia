import judini
from judini.agent import Agent
import os
import asyncio #pip install flask[async]
import uuid
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

@app.route("/process_mail")
async def process_mail():
    subject = request.args.get('subject')
    from_msg = request.args.get('from_msg')
    to_msg = request.args.get('to_msg')
    prompt = request.args.get('body')
    prompt = subject +'\n'+prompt
    uuid_val = uuid.uuid5(uuid.NAMESPACE_DNS,prompt)
    print (uuid_val)
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
    loop = asyncio.get_event_loop()
    loop.create_task(app.run())
    loop.run_forever()