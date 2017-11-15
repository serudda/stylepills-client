## Run Project

1. Open a terminal tab to run the watcher to listen about sass changes:
    ``npm run watch-css``

2. Open another terminal tab to run client project:
    ``REACT_APP_LOCAL_ENV=local npm start``

   NOTE: **create-react-app** assigns ```development``` when your work locally and does not allow override ```NODE_ENV``` variables, so it's necessary to create a temporal env variable (```REACT_APP_LOCAL_ENV```) in order to know if we're working localy.

3. To debug on Visual Code is neccesary to have running the server in the terminal (step 2.). Open de Visual Code Debug, and press 'Launch Chrome against localhost'
