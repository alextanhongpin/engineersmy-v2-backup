PROJECT_NAME=event_project
SOURCE=event.md

QUERY_1=find react workshop in kuala lumpur?
QUERY_2=add this to my calendar

docker:
	docker run -p 5000:5000 rasa/rasa_nlu:latest-spacy

train:
	curl --request POST --data-binary @${SOURCE} --url localhost:5000/train?project=${PROJECT_NAME}


train-json:
	curl --request POST --data-binary @event.json --url localhost:5000/train?project=restaurant_project

test:
	@curl -XPOST localhost:5000/parse -d '{"q":"${QUERY_1}", "project": "${PROJECT_NAME}"}' | python -mjson.tool
	@echo "\n"
	@curl -XPOST localhost:5000/parse -d '{"q":"${QUERY_2}", "project": "${PROJECT_NAME}"}' | python -mjson.tool

status:
	curl localhost:5000/status | python -mjson.tool

config:
	curl localhost:5000/config | python -mjson.tool
#'http://localhost:5000/parse?q=${QUERY}&project=${PROJECT_NAME}'

test-restaurant:
	curl -XPOST localhost:5000/parse -d '{"q":"show me chinese restaurant", "project": "restaurant_project"}'