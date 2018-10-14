
def on_write_trigger(request):
    print("Trigger request contents: " + request.get_json())
    functions.firestore
           .document('/{userId}')
    .onCreate((snap, context) => {
               const newValue = snap.data();

           retrieve_message_triggered(newValue.name);

           // access a particular field as you would any JS property
           const name = newValue.name;

           // perform desired operations ...
           });
