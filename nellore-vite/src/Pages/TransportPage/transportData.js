
export const transportData = {
    cities: [
        "Nellore",
        "Gudur",
        "Tirupati",
        "Vijayawada",
        "Chennai",
        "Hyderabad",
        "Kavali",
        "Ongole",
        "Bangalore",
        "Visakhapatnam"
    ],
    buses: [
        {
            id: "b1",
            operator: "APSRTC - Indra",
            type: "AC Seater",
            from: "Nellore",
            to: "Gudur",
            departureTime: "06:00 AM",
            arrivalTime: "07:30 AM",
            duration: "1h 30m",
            price: 135,
            seatsAvailable: 24,
            runningDays: ["Daily"],
            status: "On Time",
            rating: 4.2
        },
        {
            id: "b2",
            operator: "Kaveri Travels",
            type: "AC Sleeper",
            from: "Nellore",
            to: "Gudur",
            departureTime: "08:15 AM",
            arrivalTime: "09:30 AM",
            duration: "1h 15m",
            price: 450,
            seatsAvailable: 12,
            runningDays: ["Daily"],
            status: "Running",
            rating: 4.5
        },
        {
            id: "b3",
            operator: "Orange Tours",
            type: "Non-AC Seater",
            from: "Nellore",
            to: "Gudur",
            departureTime: "10:00 AM",
            arrivalTime: "11:30 AM",
            duration: "1h 30m",
            price: 90,
            seatsAvailable: 35,
            runningDays: ["Daily"],
            status: "Delayed",
            rating: 3.8
        },
        {
            id: "b4",
            operator: "Morning Star",
            type: "AC Sleeper (2+1)",
            from: "Nellore",
            to: "Gudur",
            departureTime: "09:00 PM",
            arrivalTime: "10:15 PM",
            duration: "1h 15m",
            price: 550,
            seatsAvailable: 8,
            runningDays: ["Daily"],
            status: "On Time",
            rating: 4.7
        },
        {
            id: "b5",
            operator: "APSRTC - Super Luxury",
            type: "Non-AC Pushback",
            from: "Nellore",
            to: "Gudur",
            departureTime: "05:00 PM",
            arrivalTime: "06:30 PM",
            duration: "1h 30m",
            price: 110,
            seatsAvailable: 15,
            runningDays: ["Daily"],
            status: "On Time",
            rating: 4.0
        },
        {
            id: "b6",
            operator: "V Kaveri Travels",
            type: "AC Sleeper",
            from: "Nellore",
            to: "Gudur",
            departureTime: "11:00 PM",
            arrivalTime: "12:15 AM",
            duration: "1h 15m",
            price: 600,
            seatsAvailable: 20,
            runningDays: ["Daily"],
            status: "On Time",
            rating: 4.6
        },
        {
            id: "b7",
            operator: "Sri Krishna Travels",
            type: "Non-AC Seater",
            from: "Nellore",
            to: "Gudur",
            departureTime: "07:30 AM",
            arrivalTime: "09:00 AM",
            duration: "1h 30m",
            price: 95,
            seatsAvailable: 40,
            runningDays: ["Mon", "Wed", "Fri"],
            status: "On Time",
            rating: 3.5
        },
        {
            id: "b8",
            operator: "APSRTC - Amaravathi",
            type: "AC Multi Axle",
            from: "Nellore",
            to: "Gudur",
            departureTime: "02:00 PM",
            arrivalTime: "03:15 PM",
            duration: "1h 15m",
            price: 250,
            seatsAvailable: 30,
            runningDays: ["Daily"],
            status: "Delayed",
            rating: 4.3
        },
        {
            id: "b9",
            operator: "Kalyani Travels",
            type: "AC Sleeper",
            from: "Nellore",
            to: "Gudur",
            departureTime: "10:30 PM",
            arrivalTime: "11:45 PM",
            duration: "1h 15m",
            price: 500,
            seatsAvailable: 5,
            runningDays: ["Daily"],
            status: "On Time",
            rating: 4.1
        },
        {
            id: "b10",
            operator: "SRS Travels",
            type: "Non-AC Sleeper",
            from: "Nellore",
            to: "Gudur",
            departureTime: "08:45 PM",
            arrivalTime: "10:00 PM",
            duration: "1h 15m",
            price: 350,
            seatsAvailable: 18,
            runningDays: ["Daily"],
            status: "Running",
            rating: 3.9
        }
    ],
    trains: [
        {
            id: "t1",
            number: "12711",
            name: "Pinakini Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "02:30 PM",
            arrivalTime: "03:10 PM",
            duration: "40m",
            price: {
                SL: 145,
                "3A": 505,
                "2A": 710,
                "1A": 1175
            },
            runningDays: ["Daily"],
            status: "On Time",
            availability: {
                SL: "WL 24",
                "3A": "AVL 12",
                "2A": "AVL 4",
                "1A": "AVL 2"
            }
        },
        {
            id: "t2",
            number: "17209",
            name: "Seshadri Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "08:15 PM",
            arrivalTime: "09:00 PM",
            duration: "45m",
            price: {
                SL: 145,
                "3A": 505
            },
            runningDays: ["Daily"],
            status: "On Time",
            availability: {
                SL: "AVL 100",
                "3A": "AVL 52"
            }
        },
        {
            id: "t3",
            number: "12604",
            name: "Chennai Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "10:45 AM",
            arrivalTime: "11:25 AM",
            duration: "40m",
            price: {
                SL: 175,
                "3A": 555
            },
            runningDays: ["Daily"],
            status: "Delayed (15m)",
            availability: {
                SL: "REGRET",
                "3A": "WL 10"
            }
        },
        {
            id: "t4",
            number: "12840",
            name: "Coromandel Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "12:15 PM",
            arrivalTime: "01:00 PM",
            duration: "45m",
            price: {
                SL: 180,
                "3A": 650,
                "2A": 920
            },
            runningDays: ["Daily"],
            status: "On Time",
            availability: {
                SL: "WL 50",
                "3A": "AVL 20",
                "2A": "WL 5"
            }
        },
        {
            id: "t5",
            number: "12655",
            name: "Navjeevan Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "04:20 PM",
            arrivalTime: "05:00 PM",
            duration: "40m",
            price: {
                SL: 160,
                "3A": 580
            },
            runningDays: ["Daily"],
            status: "On Time",
            availability: {
                SL: "AVL 15",
                "3A": "AVL 5"
            }
        },
        {
            id: "t6",
            number: "17488",
            name: "Tirumala Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "05:45 AM",
            arrivalTime: "06:30 AM",
            duration: "45m",
            price: {
                SL: 140,
                "3A": 490
            },
            runningDays: ["Daily"],
            status: "On Time",
            availability: {
                SL: "AVL 200",
                "3A": "AVL 80"
            }
        },
        {
            id: "t7",
            number: "12626",
            name: "Kerala Express",
            from: "Nellore",
            to: "Gudur",
            departureTime: "09:00 PM",
            arrivalTime: "09:40 PM",
            duration: "40m",
            price: {
                SL: 190,
                "3A": 700,
                "2A": 1000
            },
            runningDays: ["Daily"],
            status: "Delayed (30m)",
            availability: {
                SL: "WL 120",
                "3A": "WL 40",
                "2A": "WL 10"
            }
        }
    ],
    metros: [
        {
            id: "m1",
            route: "Nellore Central - Gudur Plaza",
            stops: 8,
            fare: 45,
            estimatedTime: "35m",
            frequency: "Every 15 mins",
            operatingHours: "06:00 AM - 11:00 PM"
        },
        {
            id: "m2",
            route: "Nellore South - Gudur Junction",
            stops: 6,
            fare: 40,
            estimatedTime: "30m",
            frequency: "Every 20 mins",
            operatingHours: "06:30 AM - 10:30 PM"
        },
        {
            id: "m3",
            route: "Atmakur Bus Stand - Gudur Railway Station",
            stops: 10,
            fare: 55,
            estimatedTime: "45m",
            frequency: "Every 10 mins",
            operatingHours: "05:00 AM - 11:30 PM"
        },
        {
            id: "m4",
            route: "VRC Centre - Gudur Market",
            stops: 5,
            fare: 30,
            estimatedTime: "25m",
            frequency: "Every 12 mins",
            operatingHours: "07:00 AM - 10:00 PM"
        }

    ]
};
