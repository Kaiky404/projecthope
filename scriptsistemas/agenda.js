let calendar = document.querySelector('.calendar');

const month_names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}
generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days');
    let calendar_header_year = calendar.querySelector('#year');

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendar_days.innerHTML = '';

    let currDate = new Date();
    if (month === undefined) month = currDate.getMonth();
    if (year === undefined) year = currDate.getFullYear();

    let curr_month_name = `${month_names[month]}`;
    month_picker.innerHTML = curr_month_name;
    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1;

            if (
                i - first_day.getDay() + 1 === currDate.getDate() &&
                year === currDate.getFullYear() &&
                month === currDate.getMonth()
            ) {
                day.classList.add('curr-date');
            }

            // Função ao clicar no dia
            day.addEventListener('click', () => {
                function expandInsert() {
                    const insert = document.createElement('div');
                    insert.className = "insert";
                    insert.innerHTML = `
                        <input type="text" class="event-name-input" placeholder="Nome do Evento" />
                        <input type="date" class="event-date-input" />
                        <input type="time" class="event-time-input" />
                        <textarea class="event-description-input" placeholder="Descrição do Evento"></textarea>
                        <button class="add-event">Adicionar Evento</button>
                    `;
            
                    document.body.appendChild(insert); // Exibe o formulário na página
            
                    const addEventButton = insert.querySelector('.add-event');
                    addEventButton.addEventListener('click', () => {
                        const event_name = insert.querySelector('.event-name-input').value;
                        const event_date = insert.querySelector('.event-date-input').value;
                        const event_time = insert.querySelector('.event-time-input').value;
                        const event_description = insert.querySelector('.event-description-input').value;
            
                        if (event_name && event_date && event_time && event_description) { // Só adiciona se todos os dados forem preenchidos
                            const eventsDiv = document.querySelector('.events');
                            
                            const eventInfo = document.createElement('div');
                            eventInfo.className = 'event-info';
                            eventInfo.innerHTML = `
                                <h3 class="event-name">${event_name}</h3>
                                <p class="event-date">Data: ${event_date}</p>
                                <p class="event-time">Hora: ${event_time}</p>
                                <p class="event-description">${event_description}</p>
                            `;
                            
                            eventsDiv.appendChild(eventInfo); // Adiciona o evento na div .events
                            document.body.removeChild(insert); // Remove o formulário após adicionar o evento
                        } else {
                            alert('Por favor, preencha todos os campos.');
                        }
                    });
                }
            
                expandInsert();
            });
            
            
        }
        calendar_days.appendChild(day);
    }
}


let month_list = calendar.querySelector('.month-list');

month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div data-month="${index}">${e}</div>`;
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show');
        curr_month = index;
        generateCalendar(curr_month, curr_year);
    }
    month_list.appendChild(month);
})

let month_picker = calendar.querySelector('#month-picker');

month_picker.onclick = () => {
    month_list.classList.add('show');
}

let currDate = new Date();

let curr_month = currDate.getMonth();
let curr_year = currDate.getFullYear();

generateCalendar(curr_month, curr_year);

document.querySelector('#prev-year').onclick = () => {
    --curr_year;
    generateCalendar(curr_month, curr_year);
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year;
    generateCalendar(curr_month, curr_year);
}