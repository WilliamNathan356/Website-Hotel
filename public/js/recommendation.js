const recommendContainer = document.getElementById('recommendRooms')
const appendBody = (i, roomName, roomDesc, roomBed, roomLocation) => {
    const wrapBody = document.createElement('div');
    wrapBody.setAttribute('class', 'col-lg-4 col-md-6 wow fadeInUp');
    wrapBody.setAttribute('data-wow-delay', `0.${i+1}s`);
    wrapBody.innerHTML = [
        '<div class="room-item shadow rounded overflow-hidden">', 
            '<div class="position-relative">',
                `<img class="img-fluid object-fit-cover mx-auto d-block" src="../img/${roomLocation}_main.jpg" alt="" style="width: auto; height: 300px;">`,
                '<small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">$100/Night</small>',
            '</div>',
            '<div class="p-4 mt-2">',
                '<div class="d-flex justify-content-between mb-3">',
                    `<h5 class="mb-0" id="roomName">${roomName}</h5>`,
                    '<div class="ps-2">',
                        '<small class="fa fa-star text-primary"></small>',
                        '<small class="fa fa-star text-primary"></small>',
                        '<small class="fa fa-star text-primary"></small>',
                        '<small class="fa fa-star text-primary"></small>',
                        '<small class="fa fa-star text-primary"></small>',
                    '</div>',
                '</div>',
                '<div class="d-flex mb-3">',
                    `<small class="border-end me-3 pe-3"><i class="fa fa-bed text-primary me-2"></i>${roomBed} Bed</small>`,
                    '<small class="border-end me-3 pe-3"><i class="fa fa-bath text-primary me-2"></i>1 Bath</small>',
                    '<small><i class="fa fa-wifi text-primary me-2"></i>Wifi</small>',
                '</div>',
                `<p class="text-body mb-3">${roomDesc}</p>`,
                '<div class="d-flex justify-content-between">',
                    `<a class="btn btn-sm btn-primary rounded py-2 px-4 viewDetailBtn" href="${roomLocation}.html" >View Detail</a>`,
                    `<a class="btn btn-sm btn-dark rounded py-2 px-4 bookNowBtn" href="${roomLocation}.html">Book Now</a>`,
                '</div>',
           '</div>',
       '</div>'
    ].join('');

    recommendContainer.append(wrapBody);
}
document.addEventListener('DOMContentLoaded', (e) => {
    const user = sessionStorage.getItem('user');
    if (user){
        const url = `/api/bookings/${user}`;

        axios.get(url)
        .then((res) => {
            const bookings = [];
            const bookedRooms = {};
            // console.log(res.data.booking[0].bookings)
            for(let i = 0; i < res.data.booking[0].bookings.length; i++){
                let roomID = res.data.booking[0].bookings[i].roomID;
                bookings[i] = roomID;
            }   

            // console.log(bookings)
            
            bookings.forEach(element => {
                if(bookedRooms[element]){
                    bookedRooms[element] += 1
                } else {
                    bookedRooms[element] = 1
                }
            });
            
            const bestRoomIDs = Object.keys(bookedRooms).sort((a, b) => bookedRooms[b] - bookedRooms[a]);     
            
            let counter = 0;

            bestRoomIDs.forEach(roomID => {
                const url = `/api/rooms/${parseInt(roomID)}`;
                axios.get(url)
                .then((res) => {
                    const rooms = res.data.room;
                    // console.log(rooms)

                    const data = {
                        date: moment().format('YYYY-MM-DD'),
                        guestNum: rooms.guestNumMax,
                        location: rooms.location.split('_')[0],

                    };
                    const url = `/api/findRooms`;

                    axios.post(url, data)
                    .then((res) => {
                        const rooms = res.data.rooms;
                        rooms.forEach(room => {
                            const rName = room.roomName;
                            const rDesc = room.desc;
                            const rLoc = room.location;
                            const rBed = room.guestNumMax/2;

                            counter += 1

                            appendBody(counter, rName, rDesc, rBed, rLoc);
                        })
                    })
                
                    if (counter >= 6){
                        return;
                    }
                })

                recommendContainer.parentElement.removeAttribute('hidden'); 
            })
        })

    }
})