(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Get Date Only
    $(function () {
        $('#checkInDate').datetimepicker({
            format: 'L'
        });
        $('#checkOutDate').datetimepicker({
            format: 'L'
        });
    });

    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Set Off Canvas Body
    const appendPreviousBookingBody = (i, bookId, uName, uEmail, uRoom, uLocation, checkIn, checkOut) => {
        const wrapBody = document.createElement('tr');
        wrapBody.innerHTML = [
            `<th scope="row">${i}</th>`,
            `<td>${bookId}</td>`,
            `<td>${uName}</td>`,
            `<td>${uEmail}</td>`,
            `<td>${uRoom}</td>`,
            `<td>${uLocation}</td>`,
            `<td>${checkIn}</td>`,
            `<td>${checkOut}</td>`,
        ].join('');
        return wrapBody;
    };

    // Modal Video and On Document Load Functionalities
    $(document).ready(function () {
        // Get User (If any,)
        if (sessionStorage.getItem('userToken') && sessionStorage.getItem('user')) {
            var profileLink = $('#profileLink');
            var loginLink = $('#loginLink');
            profileLink.removeAttr('hidden').html('Welcome, ' + sessionStorage.getItem('user'));
            loginLink.attr('hidden', '');
        } else {
            localStorage.clear();
        }

        // Previous Booking Button Function
        $('#previousBookingHeader').on('click', function(){
            // Get Booking Data
            const previousBookingBody = $('.previousBookingBody');
            const url = `/api/bookings/${sessionStorage.getItem('user')}`;
            const table = $('#previousBookingTableBody');
            table.empty();
            axios.get(url)
            .then((res) => {
                const uName = res.data.booking[0].firstName + ' ' + res.data.booking[0].lastName;
                const uEmail = res.data.booking[0].email;
                for (let i = 0; i < res.data.booking[0].bookings.length; i++) {
                    const bookID = res.data.booking[0].bookings[i].bookingID;
                    const checkIn = res.data.booking[0].bookings[i].checkInDate;
                    const checkOut = res.data.booking[0].bookings[i].checkOutDate;                    
                    
                    // Get Room Data
                    const url = `/api/rooms/${res.data.booking[0].bookings[i].roomID}`;
                    axios.get(url)
                    .then((res) => {
                        // Call appendPreviousBookingBody and append the returned element
                        const uRoom = res.data.room.roomName;
                        const uLocation = res.data.room.location;
                        const uLoc = uLocation.split('_')[0];
                        const previousBookingRow = appendPreviousBookingBody(i + 1, bookID, uName, uEmail, uRoom, uLoc, checkIn, checkOut);
                        // console.log(res)
                        table.append(previousBookingRow);
                    });
                }
                previousBookingBody.removeAttr('hidden');
            })
            previousBookingBody.toggle();
        })


        // View Details Button Function
        $('.viewDetailBtn').on('click', function() {
            const roomName = $(this).closest('.room-item').find('#roomName').text();

            const url = '/api/findRoom';
            const formData = {
                uName: roomName
            };

            axios.post(url, formData)
            .then((res) => {
                sessionStorage.setItem('currentRoom', res.data.roomName);
            })
        })

        // Book Now Button Function
        $('.bookNowBtn').on('click', function() {
            const roomName = $(this).closest('.room-item').find('#roomName').text();

            const url = '/api/findRoom';
            const formData = {
                uName: roomName
            };

            axios.post(url, formData)
            .then((res) => {
                sessionStorage.setItem('currentRoom', res.data.roomName);
            })
        })

        // Search Button Function
        $('#searchBtn').on('click', function() {
            const roomLocation = $('#roomLocationSelect').val();
            const guestNums = $('#guestNumSelect').val();
            const checkInDate = $('#checkInDate input').val();
            const checkOutDate = $('#checkOutDate input').val();
        
            const url = '/api/findRooms';
            const formData = {
                date: checkInDate,  
                guestNum: parseInt(guestNums),
                location: roomLocation
            };   
        
            axios.post(url, formData)
            .then((res) => {
                const roomAvail = res.data.rooms.length;
                sessionStorage.setItem('rooms', roomAvail);
                for (let i = 0; i < roomAvail; i++) {
                    sessionStorage.setItem(`room_${i}`, res.data.rooms[i].roomName);
                    sessionStorage.setItem(`room_${i}_location`, res.data.rooms[i].location);
                    sessionStorage.setItem(`room_${i}_desc`, res.data.rooms[i].desc);
                    sessionStorage.setItem(`room_${i}_bed`, (res.data.rooms[i].guestNumMax/2));
                }
            })
            .then(() => {
                window.location.href = "/room.html";
            });
        });

        // Book Button Function
        $('#bookBtn').on('click', function(e) {
            e.preventDefault();
            
            const uEmail = sessionStorage.getItem('user');
            const uLocation = sessionStorage.getItem('currentRoom');
            const checkInDate = $('#checkInDate input').val();
            const checkOutDate = $('#checkOutDate input').val();
            const adultNum = $('#adultSelector').val();
            const childNum = $('#childSelector').val();
        
            const url = '/api/book';
            const formData = {
                email: uEmail,
                location: uLocation,
                adultNum: adultNum,
                childNum: childNum,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate
            };
        
            axios.post(url, formData)
            .then((res) => {
                if (res.data.status == 'Success!'){
                    alert('Booking Success')
                    window.location.href = '/';
                } else {
                    console.error(res.data)
                    alert(`${res.data.status} ${res.data.next}`);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });

        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        // console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

