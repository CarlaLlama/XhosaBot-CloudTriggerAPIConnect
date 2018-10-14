from firebase_service import get_new_message, push_message
from query_model import query_model
from response_generator import find_by_label

# To access args[] passed from Node process import sys
import sys


print("Controller triggered message from user: " + userId)
user_id = sys.argv[1]
message_text = sys.argv[2]
print("Message received: " + message_text)


# On new message received make FAQ matcher request
predicted_label = ""
if message_text is not None:
    api_response = query_model(message_text)
    if api_response is not None:
        predicted_label = api_response[0].label
        print("Predicted label: " + predicted_label)

# On FAQ matcher response use response_generator to get bot response
if predicted_label != "":
    output_text = find_by_label(predicted_label)
    print("Data:" + output_text)
    sys.stdout.flush()
