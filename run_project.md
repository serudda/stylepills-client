## Run Project

1. Open a terminal tab to run the watcher to listen about sass changes:
    ``npm run watch-css``

2. Open another terminal tab to run client project:
    ``REACT_APP_ENV=local npm start``

   NOTE: **create-react-app** assigns ```development``` when your work locally and does not allow override ```NODE_ENV``` variables, so it's necessary to create a temporal env variable (```REACT_APP_ENV```) in order to know if we're working localy.
