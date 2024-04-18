import { NavButton } from "../navigation/NavButton";

export function RoomList() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2>Room List</h2>
    <p class="loading text-danger">Ladowanie pokoi...</p>
    `;

  const ul = document.createElement("ul");

  fetch('http://localhost:3000/rooms')
    .then((response) => response.json())
    .then((rooms) => {
      const lis = rooms.map((room) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <h4>${room.name}</h4>
        <p>
            <strong>${room.price.toFixed(2)} PLN</strong>
        </p>
        <footer></footer>
        `;

        const roomDetailsComponent = () => RoomDetails(room);
        const readMoreButton = NavButton("Read more", roomDetailsComponent);

        return li;
      });

      ul.append(...lis);
      section.append(ul);
      section.querySelector(".loading").remove();
    });

  return section;
}
