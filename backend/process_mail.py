from agent_wrapper import AgentWrapper
import os
import json

import sys


api_key = os.environ.get('JUDINI_API_KEY')
agent_id_classifier = os.environ.get('JUDINI_AGENT_ID_CLASSIFIER')
agent_id_response = os.environ.get('JUDINI_AGENT_ID_RESPONSE')
agent = AgentWrapper(
    api_key=api_key,
    agent_id_classifier=agent_id_classifier,
    agent_id_response=agent_id_response
)


if sys.argv[1] == "responser":
    # print(sys.argv[2])
    # x = json.loads(sys.argv[2][1:-1])
    # print(x)
    x = json.loads(sys.argv[2])
    print(agent.Response(prompt=f"""
Asunto: {x["subject"]}
Mensaje: {x["body"]}
"""))

else:
    # print(sys.argv[2])
    # x = json.loads(sys.argv[2][1:-1])
    # print(x)
    x = json.loads(sys.argv[2])
    print(agent.Classifier(prompt=f"""
Asunto: {x["subject"]}
Mensaje: {x["body"]}
# """))
