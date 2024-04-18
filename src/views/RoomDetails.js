export function RoomDetails(room) {
    const section = document.createElement('section');

    section.innerHTML = `
        <h2>${room.name}</h2>
        <p>Cena: ${room.price.toFixed(2)} PLN</p>
        <p>Łóżka: ${room.beds}x 🛏️</p>
        <p>Max ilość osób: ${room.guests}x 🧒</p>
    `;

    return section;
}