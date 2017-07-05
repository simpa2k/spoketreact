const expect = require('chai').expect;
const sinon = require('sinon');

import GigsService from '../../../src/data/services/GigsService';

const getGig = (gigsService) => {

    gigsService.venues = [{
        address: "Stigbergstorget 8",
        name: "Oceanen",
        city: "Göteborg",
        webpage: ''
    }];

    return {

        ticketlink:	"http://oceanen.com/2015/09/21/16-10-spoket-i-koket",
        info: "Insläpp kl. 19.",
        price: 120,
        datetime: "2015-10-16 01:01:01",
        id: 140,
        venue_name:	"Oceanen",
        address: "Stigbergstorget 8",
        name: "Oceanen",
        city: "Göteborg",
        webpage: ''

    }
};

describe('GigsService', () => {

    let gigsService;

    let putRequest;
    let postRequest;
    let deleteRequest;

    beforeEach(() => {

        gigsService = new GigsService();

        sinon.stub(gigsService.endpoint, 'getRequest').callsFake((successCallback) => {
            successCallback([{"ticketlink":"","info":"","price":null,"datetime":"2015-01-09 01:01:01","id":"160","venue_name":"Folk at Heart","address":null,"name":"Folk at Heart","city":"\u00d6rebro","webpage":null},{"ticketlink":"","info":"","price":null,"datetime":"2015-03-27 01:01:01","id":"138","venue_name":"Teaterh\u00f6gskolan","address":null,"name":"Teaterh\u00f6gskolan","city":"G\u00f6teborg","webpage":null},{"ticketlink":"","info":"","price":null,"datetime":"2015-05-15 01:01:01","id":"139","venue_name":"Stallet","address":null,"name":"Stallet","city":"Stockholm","webpage":null},{"ticketlink":"","info":"","price":null,"datetime":"2015-07-25 01:01:01","id":"161","venue_name":"Festival Decimal","address":"F\u00e5f\u00e4ngan","name":"Festival Decimal","city":"Nyk\u00f6ping","webpage":null},{"ticketlink":"http:\/\/oceanen.com\/2015\/09\/21\/16-10-spoket-i-koket","info":"Insl\u00e4pp kl. 19.","price":null,"datetime":"2015-10-16 01:01:01","id":"140","venue_name":"Oceanen","address":"Stigbergstorget 8","name":"Oceanen","city":"G\u00f6teborg","webpage":null},{"ticketlink":"","info":"(Mer info kommer)","price":null,"datetime":"2016-02-29 01:01:01","id":"141","venue_name":"Koordinaten","address":null,"name":"Koordinaten","city":"Oxel\u00f6sund","webpage":null},{"ticketlink":"http:\/\/huset.enkelbillet.dk\/book\/OnlineBooking.pl?aid=2&sid=ca434014460406b3019271488648af57","info":"","price":null,"datetime":"2016-03-17 01:01:01","id":"142","venue_name":"Huset","address":null,"name":"Huset","city":"Aalborg","webpage":null},{"ticketlink":"http:\/\/konstepidemin.se\/kalender\/internationella-spelmansstamman-2016\/","info":"","price":null,"datetime":"2016-05-28 01:01:01","id":"144","venue_name":"Internationella Spelmansst\u00e4mman","address":"Konstepidemin","name":"Internationella Spelmansst\u00e4mman","city":"G\u00f6teborg","webpage":null},{"ticketlink":"","info":"","price":null,"datetime":"2016-05-29 01:01:01","id":"143","venue_name":"Kulturernas Karneval, Engelska Parken","address":null,"name":"Kulturernas Karneval, Engelska Parken","city":"Uppsala","webpage":null},{"ticketlink":"","info":"Mer info snart!","price":null,"datetime":"2016-06-29 01:01:01","id":"145","venue_name":"Dj\u00e4knescenen","address":null,"name":"Dj\u00e4knescenen","city":"Skara","webpage":null},{"ticketlink":"","info":"Gratis!","price":null,"datetime":"2016-07-01 01:01:01","id":"146","venue_name":"Condis","address":null,"name":"Condis","city":"J\u00e4rvs\u00f6","webpage":null},{"ticketlink":"http:\/\/www.delsbostamman.nu","info":"","price":null,"datetime":"2016-07-02 01:01:01","id":"147","venue_name":"Delsbost\u00e4mman","address":null,"name":"Delsbost\u00e4mman","city":"Delsbo","webpage":null},{"ticketlink":"http:\/\/www.folkodans.se","info":"","price":null,"datetime":"2016-07-04 01:01:01","id":"148","venue_name":"Folk och dans i Svaben","address":null,"name":"Folk och dans i Svaben","city":"Svabensverk","webpage":null},{"ticketlink":"https:\/\/nyfiket.wordpress.com\/konsertprogram-2016\/","info":"","price":null,"datetime":"2016-07-07 01:01:01","id":"149","venue_name":"Nyfiket","address":null,"name":"Nyfiket","city":"R\u00e4ttvik","webpage":null},{"ticketlink":"","info":"Mer info snart!","price":null,"datetime":"2016-07-08 01:01:01","id":"150","venue_name":"Dynamo","address":null,"name":"Dynamo","city":"Norrk\u00f6ping","webpage":null},{"ticketlink":"http:\/\/vtsturotundan.blogspot.se","info":"","price":null,"datetime":"2016-07-09 01:01:01","id":"151","venue_name":"Rotundan","address":null,"name":"Rotundan","city":"Halmstad","webpage":null},{"ticketlink":"","info":"Mer info snart!","price":null,"datetime":"2016-07-12 01:01:01","id":"152","venue_name":"Tran\u00e5s Kyrka","address":null,"name":"Tran\u00e5s Kyrka","city":"Tran\u00e5s","webpage":null},{"ticketlink":"http:\/\/fafangan.com\/program-tictail.php","info":"","price":null,"datetime":"2016-07-13 01:01:01","id":"153","venue_name":"F\u00e5f\u00e4ngan","address":null,"name":"F\u00e5f\u00e4ngan","city":"Nyk\u00f6ping","webpage":null},{"ticketlink":"http:\/\/www.eastwestsushi.com\/event.php?event=2016-07-14-spoket-i-koket","info":"OBS: F\u00f6rk\u00f6p!","price":null,"datetime":"2016-07-14 01:01:01","id":"154","venue_name":"East West Sushi","address":null,"name":"East West Sushi","city":"\u00d6rebro","webpage":null},{"ticketlink":"https:\/\/www.askersund.se\/uppleva-och-gora\/kultur\/musik\/folk-blues-och-jazz-i-askersund\/biljetter-till-musik-i-askersund.html#.VzPD4MdnfZg","info":"","price":null,"datetime":"2016-07-22 01:01:01","id":"155","venue_name":"Folk, jazz och blues","address":null,"name":"Folk, jazz och blues","city":"Askersund","webpage":null},{"ticketlink":"https:\/\/www.askersund.se\/uppleva-och-gora\/kultur\/musik\/folk-blues-och-jazz-i-askersund\/biljetter-till-musik-i-askersund.html#.VzPD4MdnfZg","info":"","price":null,"datetime":"2016-07-23 01:01:01","id":"156","venue_name":"Folk, jazz och blues","address":null,"name":"Folk, jazz och blues","city":"Askersund","webpage":null},{"ticketlink":"http:\/\/www.korrofestivalen.se\/biljetter\/","info":"","price":null,"datetime":"2016-07-30 01:01:01","id":"157","venue_name":"Korr\u00f6festivalen","address":null,"name":"Korr\u00f6festivalen","city":"Korr\u00f6","webpage":null},{"ticketlink":"http:\/\/jamdays.dk","info":"","price":null,"datetime":"2016-08-05 01:01:01","id":"158","venue_name":"Jamdays","address":null,"name":"Jamdays","city":"Odense","webpage":null},{"ticketlink":"http:\/\/folksy.nu\/sp\u00c3\u00b6ket%20i%20k\u00c3\u00b6ket.html","info":"Insl\u00e4pp kl. 21. Fritt intr\u00e4de!","price":null,"datetime":"2016-09-09 01:01:01","id":"162","venue_name":"Folksy, Far i Hatten","address":null,"name":"Folksy, Far i Hatten","city":"Malm\u00f6","webpage":null},{"ticketlink":"https:\/\/www.godtfolk.dk","info":"","price":null,"datetime":"2016-09-10 01:01:01","id":"159","venue_name":"Godtfolk festival","address":null,"name":"Godtfolk festival","city":"Fan\u00f8","webpage":null},{"ticketlink":"http:\/\/www.nefertiti.se\/arrangemang\/spoket-i-koket\/","info":"Releasefest och konsert, debutskivan Den nya spisen","price":null,"datetime":"2017-03-04 01:01:01","id":"163","venue_name":"Nefertiti","address":null,"name":"Nefertiti","city":"G\u00f6teborg","webpage":null},{"ticketlink":"http:\/\/folkgalan.se","info":"Efterfesten!","price":null,"datetime":"2017-03-18 01:01:01","id":"164","venue_name":"Folk- och V\u00e4rldsmusikgalan","address":"Dunkers kulturhus","name":"Folk- och V\u00e4rldsmusikgalan","city":"Helsingborg","webpage":null},{"ticketlink":"","info":"St\u00f6dgala f\u00f6r Tuki Nepal","price":null,"datetime":"2017-05-12 01:01:01","id":"168","venue_name":"Kaf\u00e9 de Luxe","address":null,"name":"Kaf\u00e9 de Luxe","city":"V\u00e4xj\u00f6","webpage":null},{"ticketlink":"https:\/\/www.facebook.com\/Folkamok\/","info":"","price":null,"datetime":"2017-05-13 01:01:01","id":"165","venue_name":"Folkamok","address":null,"name":"Folkamok","city":"K\u00f8benhavn","webpage":null},{"ticketlink":"http:\/\/www.kulturoasen.se\/program\/","info":"","price":null,"datetime":"2017-05-14 01:01:01","id":"166","venue_name":"Kulturoasen","address":null,"name":"Kulturoasen","city":"Uppsala","webpage":null},{"ticketlink":null,"info":null,"price":null,"datetime":"2017-06-15 16:00:00","id":"34","venue_name":"Odense konservatorium","address":null,"name":"Odense konservatorium","city":"Odense","webpage":null},{"ticketlink":"hejsan","info":"hoppsan","price":"120","datetime":"2017-06-25 13:05:30","id":"170","venue_name":"Stallet","address":null,"name":"Stallet","city":"Stockholm","webpage":null},{"ticketlink":"http:\/\/www.h\u00e4ssleholmsfesten.se","info":null,"price":null,"datetime":"2017-08-25 16:00:00","id":"39","venue_name":"H\u00e4ssleholms sommarfest","address":"Djupadalsparken","name":"H\u00e4ssleholms sommarfest","city":"H\u00e4ssleholm","webpage":null},{"ticketlink":"https:\/\/tonderfestival.billetten.dk","info":null,"price":null,"datetime":"2017-08-26 18:30:00","id":"33","venue_name":"Folk Spot T\u00f8nder, Klubscenen","address":"T\u00f8nder festival","name":"Folk Spot T\u00f8nder, Klubscenen","city":"T\u00f8nder","webpage":null},{"ticketlink":"https:\/\/www.facebook.com\/events\/259518624511021\/?acontext=%7B%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22page%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22page_upcoming_events_card%5C%22%2C%5C%22extra_data%5C%22%3A[]%7D]%22%2C%22has_source%22%3Atrue%7D","info":null,"price":null,"datetime":"2017-08-27 16:00:00","id":"40","venue_name":"Edelsminde Musikforening","address":"Edelsminde Bed&Breakfast","name":"Edelsminde Musikforening","city":"Svendborg","webpage":null},{"ticketlink":null,"info":null,"price":null,"datetime":"2017-09-01 18:00:00","id":"35","venue_name":"Sommarens sista dagar","address":"Majorna","name":"Sommarens sista dagar","city":"G\u00f6teborg","webpage":null},{"ticketlink":"http:\/\/felan.se","info":null,"price":null,"datetime":"2017-09-02 18:00:00","id":"36","venue_name":"Wadk\u00f6pingsst\u00e4mman","address":null,"name":"Wadk\u00f6pingsst\u00e4mman","city":"\u00d6rebro","webpage":null},{"ticketlink":"http:\/\/www.pranafestival.org","info":null,"price":null,"datetime":"2017-09-10 13:00:00","id":"32","venue_name":"Prana Festival","address":null,"name":"Prana Festival","city":"G\u00f6teborg","webpage":null},{"ticketlink":"","info":"","price":null,"datetime":"2017-09-11 01:01:01","id":"167","venue_name":"Tivoli","address":"Orangeriet","name":"Tivoli","city":"K\u00f8benhavn","webpage":null},{"ticketlink":"http:\/\/www.tivoli.dk\/da\/musik\/2017\/spoket+i+koket","info":null,"price":null,"datetime":"2017-09-11 19:00:00","id":"31","venue_name":"Tivoli","address":"Orangeriet","name":"Tivoli","city":"K\u00f8benhavn","webpage":null},{"ticketlink":"https:\/\/www.facebook.com\/oviksfolk\/","info":null,"price":null,"datetime":"2017-09-15 18:00:00","id":"37","venue_name":"\u00d6-viks folkmusikf\u00f6rening, \u00d6FF","address":null,"name":"\u00d6-viks folkmusikf\u00f6rening, \u00d6FF","city":"\u00d6rnsk\u00f6ldsvik","webpage":null},{"ticketlink":null,"info":null,"price":null,"datetime":"2017-09-16 18:00:00","id":"38","venue_name":"TBA","address":null,"name":"TBA","city":"Sundsvall","webpage":null}]);
        });

        putRequest = sinon.stub(gigsService.endpoint, 'putRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        postRequest = sinon.stub(gigsService.endpoint, 'postRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        deleteRequest = sinon.stub(gigsService.endpoint, 'deleteRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        sinon.stub(gigsService.venuesEndpoint, 'getRequest').callsFake((successCallback) => {
            successCallback([{"address":"St\u00c3\u00a4llegatan 29","name":"St\u00c3\u00a4llet","city":"Stockholm","webpage":"www.st\u00c3\u00a4llet.st\u00c3\u00a4lle"},{"address":"Orangeriet","name":"Tivoli","city":"K\u00f8benhavn","webpage":null},{"address":null,"name":"Prana Festival","city":"G\u00f6teborg","webpage":null},{"address":"T\u00f8nder Festival","name":"Folk Spot T\u00f8nder","city":"T\u00f8nder","webpage":null},{"address":"T\u00f8nder festival","name":"Folk Spot T\u00f8nder, Klubscenen","city":"T\u00f8nder","webpage":null},{"address":null,"name":"Odense konservatorium","city":"Odense","webpage":null},{"address":"Majorna","name":"Sommarens sista dagar","city":"G\u00f6teborg","webpage":null},{"address":null,"name":"Wadk\u00f6pingsst\u00e4mman","city":"\u00d6rebro","webpage":null},{"address":null,"name":"\u00d6-viks folkmusikf\u00f6rening, \u00d6FF","city":"\u00d6rnsk\u00f6ldsvik","webpage":null},{"address":null,"name":"TBA","city":"Sundsvall","webpage":null},{"address":"Djupadalsparken","name":"H\u00e4ssleholms sommarfest","city":"H\u00e4ssleholm","webpage":null},{"address":"Edelsminde Bed&Breakfast","name":"Edelsminde Musikforening","city":"Svendborg","webpage":null},{"address":null,"name":"Kaf\u00e9 de Luxe","city":"V\u00e4xj\u00f6","webpage":null},{"address":null,"name":"Kulturoasen","city":"Uppsala","webpage":null},{"address":null,"name":"Folk at Heart","city":"\u00d6rebro","webpage":null},{"address":"F\u00e5f\u00e4ngan","name":"Festival Decimal","city":"Nyk\u00f6ping","webpage":null},{"address":null,"name":"Folksy, Far i Hatten","city":"Malm\u00f6","webpage":null},{"address":null,"name":"Nefertiti","city":"G\u00f6teborg","webpage":null},{"address":null,"name":"East West Sushi","city":"\u00d6rebro","webpage":null},{"address":null,"name":"Folk, jazz och blues","city":"Askersund","webpage":null},{"address":null,"name":"Delsbost\u00e4mman","city":"Delsbo","webpage":null},{"address":null,"name":"Folk och dans i Svaben","city":"Svabensverk","webpage":null},{"address":null,"name":"Nyfiket","city":"R\u00e4ttvik","webpage":null},{"address":null,"name":"Dynamo","city":"Norrk\u00f6ping","webpage":null},{"address":null,"name":"Rotundan","city":"Halmstad","webpage":null},{"address":null,"name":"Kulturernas Karneval, Engelska Parken","city":"Uppsala","webpage":null},{"address":null,"name":"Folkamok","city":"K\u00f8benhavn","webpage":null},{"address":"Dunkers kulturhus","name":"Folk- och V\u00e4rldsmusikgalan","city":"Helsingborg","webpage":null},{"address":null,"name":"Godtfolk festival","city":"Fan\u00f8","webpage":null},{"address":null,"name":"Jamdays","city":"Odense","webpage":null},{"address":null,"name":"Korr\u00f6festivalen","city":"Korr\u00f6","webpage":null},{"address":null,"name":"F\u00e5f\u00e4ngan","city":"Nyk\u00f6ping","webpage":null},{"address":null,"name":"Tran\u00e5s Kyrka","city":"Tran\u00e5s","webpage":null},{"address":null,"name":"Dj\u00e4knescenen","city":"Skara","webpage":null},{"address":null,"name":"Condis","city":"J\u00e4rvs\u00f6","webpage":null},{"address":"Konstepidemin","name":"Internationella Spelmansst\u00e4mman","city":"G\u00f6teborg","webpage":null},{"address":null,"name":"Huset","city":"Aalborg","webpage":null},{"address":null,"name":"Koordinaten","city":"Oxel\u00f6sund","webpage":null},{"address":"Stigbergstorget 8","name":"Oceanen","city":"G\u00f6teborg","webpage":null},{"address":null,"name":"Stallet","city":"Stockholm","webpage":null},{"address":null,"name":"Teaterh\u00f6gskolan","city":"G\u00f6teborg","webpage":null}]);
        });
    });

    describe('getGigs', () => {

        it('should get gigs', () => {

            gigsService.getGigs((gigs) => {
                expect(gigs.length).to.equal(42);
            });
        });

        it('should format gig dates', () => {

            gigsService.getGigs((gigs) => {

                gigs.forEach((gig) => {
                    expect(gig.datetime).to.not.include('01:01:01');
                });
            });
        });

        it('should set venues', () => {

            let setVenues = sinon.spy(gigsService, 'setVenues');

            gigsService.getGigs(() => {
                sinon.assert.calledOnce(setVenues);
            });
        });
    });

    describe('putGig', () => {

        it('should prepare gig for modification', () => {

            let prepareGigModification = sinon.spy(gigsService, 'prepareGigModification');

            gigsService.putGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(prepareGigModification);
            }, () => {});
        });

        it('should call endpoint put function', () => {

            gigsService.putGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(putRequest);
            });
        });
    });

    describe('postGig', () => {

        it('should prepare gig for modification', () => {

            let prepareGigModification = sinon.spy(gigsService, 'prepareGigModification');

            gigsService.postGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(prepareGigModification);
            }, () => {});
        });

        it('should call endpoint post function', () => {

            gigsService.postGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(postRequest);
            });
        });
    });

    describe('deleteGig', () => {

        it('should call endpoint delete function', () => {

            gigsService.deleteGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(deleteRequest);
            });
        });
    });

    describe('prepareGigModification', () => {

        it('should send venue', () => {

            let sendVenue = sinon.spy(gigsService, 'sendVenue');
            gigsService.prepareGigModification(getGig(gigsService));

            sinon.assert.calledOnce(sendVenue);

        });

        it('should set venue_name to be equal to name', () => {

            let gigToBeSent = getGig(gigsService);

            let name = gigToBeSent.name;
            gigToBeSent.venue_name = '';

            gigsService.prepareGigModification(gigToBeSent);

            expect(gigToBeSent.venue_name).to.equal(name);

        });

        it('should delete venue related properties', () => {

            let gigToBeSent = getGig(gigsService);

            gigsService.prepareGigModification(gigToBeSent);

            expect(typeof(gigToBeSent.address)).to.equal('undefined');
            expect(typeof(gigToBeSent.name)).to.equal('undefined');
            expect(typeof(gigToBeSent.city)).to.equal('undefined');
            expect(typeof(gigToBeSent.webpage)).to.equal('undefined');

        });
    });
});
