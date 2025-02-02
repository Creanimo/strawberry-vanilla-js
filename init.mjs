fetch('./config.json')
    .then(response => response.json)
    .then(data => {
        const template_path = data.templatePath;
    })
    .catch(error => console.error('Error loading config for Strawberry Vanilla UI:', error));
