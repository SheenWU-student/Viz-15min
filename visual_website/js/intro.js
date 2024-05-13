
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var span = document.getElementById("close");
    var modalText = document.getElementById("modalText");

    document.querySelectorAll('.reason img').forEach(item => {
        item.addEventListener('click', function () {
            const imageId = this.id;
            console.log(123);
            // Check the ID of the parent element to determine which text to display
            switch (imageId) {
                case 'climateChange':
                    modalText.innerText = "Allam et al. (2022) points out that cities contribute more than 60% of greenhouse gas emissions and demands a redefinition of urban policies, particularly around mobility. Moreover, the needs for cities to reduce greenhouse gas emissions and manage resource consumption more efficiently are important.";
                    break;
                case 'urbanInequality':
                    modalText.innerText = "Moreno et al. (2021) highlight the negative impacts of car-dependent urban planning on socio-economic fabric, leading to increased traffic congestions and economic losses, as well as lower air quality. The '15-Minute City' concept aims to create more equitable urban spaces where essential services are accessible to all within a short walk or bike ride.";
                    break;
                case 'environmentalDegradation':
                    modalText.innerText = "Allam et al. (2022) mentioned that contemporary urban areas are responsible for significant environmental degradation, including the consumption of 78% of the world's energy primarily in transport, construction, and manufacturing, which are predominantly urban activities. Moreover, urban expansion also caused the destruction of green space and habitats. The '15-Minute City' helps protect the environment and preserve green spaces and supports biodiversity.";
                    break;
                case 'economicShifts':
                    modalText.innerText = "As discussed by Moreno et al. (2021), the pandemic has led to a reevaluation of urban economic structures, with a shift toward more localised economic activities, and this brings the people's needs for localised services. The '15-Minute City' aligns with this shift by promoting local economic activities and accessibility, potentially reducing commute times and enhancing local employment opportunities.";
                    break;
                default:
                    modalText.innerText = "No information available.";
            }
            modal.style.display = "block";
        });
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});




