import judini
from judini.agent import Agent


class Agent:

    def __init__(self, api_key, agent_id_classifier, agent_id_response):
        self.agent_classifier = Agent(api_key,agent_id_classifier)
        self.agent_response = Agent(api_key,agent_id_response)

    def Classifier(self, prompt):
        response = self.agent_classifier.completion(prompt=prompt, stream=False)
        return response
    
    def Response(self, prompt):
        response = self.agent_response.completion(prompt=prompt, stream=False)
        return response

