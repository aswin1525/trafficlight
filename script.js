document.getElementById('generate-button').addEventListener('click', function() {
    // Get user location
    const location = document.getElementById('location').value;

    if (location.trim() === "") {
        alert("Please enter a valid location.");
        return;
    }

    // Generate random durations for red, yellow, and green lights
    const redDuration = Math.floor(Math.random() * 6) + 5; // 5 to 10 seconds
    const yellowDuration = Math.floor(Math.random() * 4) + 3; // 2 to 5 seconds
    const greenDuration = Math.floor(Math.random() * 6) + 4; // 4 to 9 seconds

    // Display the generated timings
    const timingDisplay = document.getElementById('timing-display');
    timingDisplay.innerHTML = `
        <p>Location: <strong>${location}</strong></p>
        <p>Red Light Duration: <strong>${redDuration}</strong> seconds</p>
        <p>Yellow Light Duration: <strong>${yellowDuration}</strong> seconds</p>
        <p>Green Light Duration: <strong>${greenDuration}</strong> seconds</p>
    `;

    // Enable the start button
    document.getElementById('start-button').disabled = false;

    // Save the durations for use in the simulation
    document.getElementById('start-button').dataset.red = redDuration * 1000;
    document.getElementById('start-button').dataset.yellow = yellowDuration * 1000;
    document.getElementById('start-button').dataset.green = greenDuration * 1000;
});

document.getElementById('start-button').addEventListener('click', function() {
    // Retrieve the saved durations
    const redDuration = parseInt(this.dataset.red);
    const yellowDuration = parseInt(this.dataset.yellow);
    const greenDuration = parseInt(this.dataset.green);

    // Function to change the lights
    function changeLights() {
        setTimeout(() => {
            document.querySelector('.red').style.opacity = '1';
            document.querySelector('.yellow').style.opacity = '0.3';
            document.querySelector('.green').style.opacity = '0.3';
        }, 0);

        setTimeout(() => {
            document.querySelector('.red').style.opacity = '0.3';
            document.querySelector('.yellow').style.opacity = '1';
            document.querySelector('.green').style.opacity = '0.3';
        }, redDuration);

        setTimeout(() => {
            document.querySelector('.red').style.opacity = '0.3';
            document.querySelector('.yellow').style.opacity = '0.3';
            document.querySelector('.green').style.opacity = '1';
        }, redDuration + yellowDuration);

        setTimeout(() => {
            changeLights();
        }, redDuration + yellowDuration + greenDuration);
    }

    // Start the traffic light cycle
    changeLights();
});
