// TreatmentDetails.js

export function TreatmentDetails(treatmentId) {
    const section = document.createElement('section');

    section.innerHTML = `
        <h2 class="treatment-name">Zabieg</h2>
        <p class="loading text-danger">Ladowanie szczegolow zabiegu...</p>
    `;

    fetch(`http://localhost:3000/treatments/${treatmentId}`)
        .then(response => response.json())
        .then(treatment => {
            section.innerHTML = `
                <h2>${treatment.name}</h2>
                <p>Cena: ${treatment.price.toFixed(2)} PLN</p>
                <p>Zakres: ${treatment.area}</p>
                <p>Czas: ${treatment.time} minut</p>
            `;
        });

    return section;
}