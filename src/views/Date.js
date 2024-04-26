import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "bootstrap-daterangepicker";
import moment from "moment";
// Ustawienie polskich dat w bibliotece moment
import "moment/locale/pl";

moment.locale('pl');

// Ustawienie dzisiejszej daty i daty maksymalnej
export function Date() {
  const section = document.createElement("section");

  section.innerHTML = `
  <p class="reservation-info">Wybierz daty rezerwacji</p>
  <input class="select-date" type="text" name="daterange" />
`;

  const today = moment();
  const maxDate = moment().add(1, "years");
  const endDate = moment().add(1, "days");

  // Inicjalizacja daterangepicker
  const dateRangeInput = section.querySelector('input[name="daterange"]');
  new DateRangePicker(dateRangeInput, {
    format: "YYYY-MM-DD",
    startDate: today,
    endDate: endDate,
    minDate: today,
    maxDate: maxDate,
    locale: {
      cancelLabel: "Anuluj",
      applyLabel: "Zastosuj",
    },
  });

  return section;
}