fetch("react-components.jsx")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Unable to load React JSX components: " + response.status);
        }
        return response.text();
    })
    .then(function (jsxSource) {
        const compiled = Babel.transform(jsxSource, {
            presets: [["react", { runtime: "classic" }]],
            sourceType: "script"
        });
        const script = document.createElement("script");
        script.textContent = compiled.code;
        document.body.appendChild(script);
    })
    .catch(function (error) {
        console.error("PawConnect React components failed to load.", error);
    });
