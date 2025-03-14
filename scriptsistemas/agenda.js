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
            
            const dayNumber = i - first_day.getDay() + 1;
            const isoDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayNumber.toString().padStart(2, '0')}`;
            day.dataset.date = isoDate;
            
            day.addEventListener('click', () => {
                const clickedDate = day.dataset.date;
                
                function expandInsert(date) {
                    const insert = document.createElement('div');
                    insert.className = "insert";
                    insert.innerHTML = `
                        <span class="close">&times;</span>
                        <input type="text" class="event-name-input" placeholder="Nome do Evento" />
                        <input type="date" class="event-date-input" value="${date}" readonly/>
                        <input type="time" class="event-time-input" />
                        <textarea class="event-description-input" placeholder="Descrição do Evento"></textarea>
                        <button class="add-event">Adicionar Evento</button>
                    `;
                    
                    const closeButton = insert.querySelector(".close");
                    closeButton.addEventListener("click", () => insert.remove());
                    
                    document.body.appendChild(insert);
                    
                    const addEventButton = insert.querySelector('.add-event');
                    addEventButton.addEventListener('click', () => {
                        const event_name = insert.querySelector('.event-name-input').value;
                        const event_date = insert.querySelector('.event-date-input').value;
                        const event_time = insert.querySelector('.event-time-input').value;
                        const event_description = insert.querySelector('.event-description-input').value;
                        
                        if (event_name && event_date && event_time && event_description) {
                            const eventData = {
                                name: event_name,
                                date: event_date,
                                time: event_time,
                                description: event_description
                            };
                            
                            let events = JSON.parse(localStorage.getItem('events')) || [];
                            events.push(eventData);
                            localStorage.setItem('events', JSON.stringify(events));
                            displayEvents();
                            document.body.removeChild(insert);
                        } else {
                            alert('Por favor, preencha todos os campos.');
                        }
                    });
                }
                
                expandInsert(clickedDate);
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
    curr_month--;
    if (curr_month < 0) {
        curr_month = 11;
        curr_year--;
    }
    generateCalendar(curr_month, curr_year);
};

document.querySelector('#next-year').onclick = () => {
    curr_month++;
    if (curr_month > 11) {
        curr_month = 0;
        curr_year++;
    }
    generateCalendar(curr_month, curr_year);
};

function displayEvents() {
    const eventsDiv = document.querySelector('.events');
    eventsDiv.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach((event, index) => {
        const eventInfo = document.createElement('div');
        eventInfo.className = 'event-info';
        
        // Convertendo a data para DD-MM-YYYY para exibição
        const [year, month, day] = event.date.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        
        eventInfo.innerHTML = `
            <span class="close">&times;</span>
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">Data: ${formattedDate}</p>
            <p class="event-time">Hora: ${event.time}</p>
            <p class="event-description">${event.description}</p>
        `;
        const closeButton = eventInfo.querySelector(".close");
        closeButton.addEventListener("click", () => {
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.splice(index, 1);
            localStorage.setItem('events', JSON.stringify(events));
            displayEvents();
        });
        eventsDiv.appendChild(eventInfo);
    });
}
window.addEventListener('load', displayEvents);