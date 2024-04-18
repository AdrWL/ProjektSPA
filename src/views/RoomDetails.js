export function RoomDetails(room) {
    const section = document.createElement('section');

    section.innerHTML = `
        <h2>${room.name}</h2>
        <p>Price: ${room.price.toFixed(2)} PLN</p>
        <p>Beds: ${room.beds}x 🛏️</p>
        <p>Guests: ${room.guests}x 🧒</p>
    `;

    return section;
}