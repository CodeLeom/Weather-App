$(document).ready(function(){
   // $('#weather').hide();
    if (navigator.geolocation){
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
            //set lat and lon
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            //console.log(latitude, longitude);

            var url = 'http://api.weatherstack.com/current?access_key=88a8d4339c4daffc789e50bd0c7fb9e8&q=';
            $.getJSON(url + latitude + ',' + longitude, function(data){
                //JSON.stringify turns a js object into a json text and stores it in a string
                var data = JSON.stringify(data);
                //JSON.parse turns a string of JSON text into a js
                var json = JSON.parse(data);   
                
                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp = json.current.temp_c;
                var temp_f = json.current.temp_f;
                var last_updated = json.current.last_updated.replace('-', ' ');

                var wind = json.current.wind_kph;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;
                //console.log(data);
                $('#weather').html(city + ', ' + state + ', ' + country);

                if (temp < 18) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/01/02/03/trees-2562807_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a pretty cold day today...<hr></h1>");
                } else if (temp > 10 && temp < 28) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/22/17/40/hill-2165759_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a sunny day today...<hr></h1>");
                } else {
                    $('.grey-jumbo').css({
                        backgroundImage:
                            'url(https://cdn.pixabay.com/photo/2015/03/26/10/29/sand-dunes-691431_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a hot day today...<hr></h1>");
                }

                // toggle temp
                $('#info1').html(time);
                $('#info2').html('Wind ' + wind + ' kph');
                $('#info3').html(temp + '&#8451');

                $('.short').show();

                var yes = true;
                $('#switch').on('click', function () {
                    if (yes) {
                        $('#info3').html(temp_f + '&#8457');
                        $('#switch').html('Show in Celsius');
                        yes = false;
                    } else {
                        $('#info3').html(temp + '&#8457');
                        $('#switch').html('Show in Farenheight');
                        yes = true;
                    }
                });
                // showing sky status
                if (cloud <= 30) {
                    $('#info5').html('Clear Sky');
                } else {
                    $('#info5').html('Cloudy Sky');
                }
                $('#info6').html('Humidity ' + humidity + '%');
            });
        });
    }
});