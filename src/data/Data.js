class Data {

    getGigsModel() {
        return {
            datetime: 'datetime'
        }
    }

    getDescriptionModel() {
        return {
            content: 'text'
        }
    }

    getNewsItems() {

        return [
            'Det här är den första nyheten!',
            'Det här är den andra nyheten!',
            'Här är en nyhet till!'
        ];
    }

    getGigs(successCallback, errorCallback) {

        let gigs = [

            {
                ticketlink: 'http://www.hässleholmsfesten.se',
                datetime: '2017-08-25 16:00:00',
                venueName: 'Hässleholms Sommarfest'

            }

        ];

        successCallback(gigs);

    }

    getDescription(successCallback, errorCallback) {
        successCallback('This is the description.');
    }

    getMembers(successCallback, errorCallback) {

        let members = [

            {
                firstname: 'Clara',
                lastname: 'Tesch',
                instrument: 'fiol'
            },
            {
                firstname: 'Mads',
                lastname: 'Kjøller-Henningsen',
                instrument: 'flöjter, vevlira, sång'
            },
            {
                firstname: 'Emma',
                lastname: 'Engström',
                instrument: 'piano'
            },
            {
                firstname: 'Erik',
                lastname: 'Bengtsson',
                instrument: 'bas'
            },
            {
                firstname: 'Troels',
                lastname: 'Strange Lorentzen',
                instrument: 'dragspel'
            },
            {
                firstname: 'Nisse',
                lastname: 'Blomster',
                instrument: 'gitarr, banjo, mandolin, stomp, sång'
            },
            {
                firstname: 'Albin',
                lastname: 'Lagg',
                instrument: 'trumpet'
            },
            {
                firstname: 'Ella',
                lastname: 'Wennerberg',
                instrument: 'trombon'
            },
            {
                firstname: 'Büller',
                lastname: 'Henrik',
                instrument: 'barytonsax, altsax'
            },
            {
                firstname: 'Erik',
                lastname: 'Larsson',
                instrument: 'tenorsax, klarinett'
            }
        ];

        successCallback(members);

    }

    getContactInfo(successCallback, errorCallback) {

        return successCallback({

            email: 'spoketikoket@gmail.com',
            contactPersons: [

                {
                    country: 'SE',
                    phonenumber: '46 (0)73 55 91 230',
                    name: 'Nisse Blomster'

                },
                {
                    country: 'DK',
                    phonenumber: '+45 50 42 18 35',
                    name: 'Mads Kjøller-Henningsen'
                }
            ]
        });
    }
}

export default Data;