import firebase_admin
from firebase_admin import credentials, firestore

PROJECT_NAME = 'xhosabot'

# initialize firebase sdk
CREDENTIALS = credentials.ApplicationDefault()
firebase_admin.initialize_app(CREDENTIALS, {
                              'projectId': PROJECT_NAME,
                              })

# get firestore client
  FIRESTORE_CLIENT = firestore.client()