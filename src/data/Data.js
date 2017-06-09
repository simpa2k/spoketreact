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

    getGigs() {

        return [

            {
                ticketlink: 'http://www.hässleholmsfesten.se',
                datetime: '2017-08-25 16:00:00',
                venueName: 'Hässleholms Sommarfest'

            }

        ];
    }

    getDescription() {
        return 'This is the description.';
    }
}

export default Data;