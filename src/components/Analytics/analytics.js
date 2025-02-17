function start() {
    // Initializes the client with the API key and the Translate API.
    gapi.client
        .init({
            apiKey: "YOUR_API_KEY",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/translate/v2/rest"
            ]
        })
        .then(function() {
            // Executes an API request, and returns a Promise.
            // The method name `language.translations.list` comes from the API discovery.
            return gapi.client.language.translations.list({
                q: "hello world",
                source: "en",
                target: "de"
            });
        })
        .then(
            function(response) {
                console.log(
                    response.result.data.translations[0].translatedText
                );
            },
            function(reason) {
                console.log("Error: " + reason.result.error.message);
            }
        );
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load("client", start);
