window.onload = function () {

    var map = L.map('mapId2').setView([35.260310, -106.597695], 10);

    var storeMarkers = new L.FeatureGroup();

    var USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });


    USGS_USImagery.addTo(map);
   


    /* Parse JSON file, create charts, draw markers on map */

    //  *** start process

    d3.csv('data/stores.csv', function (error, data) {

        // var fullDateFormat = d3.time.format('%a, %d %b %Y %X %Z');
        // var yearFormat = d3.time.format('%Y');
        // var monthFormat = d3.time.format('%b');
        // var dayOfWeekFormat = d3.time.format('%a');

        // normalize/parse data so dc can correctly sort & bin them
        // I like to think of each "d" as a row in a spreadsheet
        // _.each(beerData, function (d) {
        //   d.count = +d.count;
        //   // round to nearest 0.25
        //   // d.rating_score = Math.round(+d.rating_score * 4) / 4;
        //   // d.beer.rating_score = Math.round(+d.beer.rating_score * 4) / 4;
        //   // // round to nearest 0.5
        //   // d.beer.beer_abv = Math.round(+d.beer.beer_abv * 2) / 2;
        //   // // round to nearest 10
        //   // d.beer.beer_ibu = Math.floor(+d.beer.beer_ibu / 10) * 10;

        //   d.first_had_dt = fullDateFormat.parse(d.first_had);
        //   d.first_had_year = +yearFormat(d.first_had_dt);
        //   // d.first_had_month = monthFormat(d.first_had_dt);
        // d.first_had_day = dayOfWeekFormat(d.first_had_dt);
        // });


        // set crossfilter
        var ndx = crossfilter(data);

        // create dimensions (x-axis values)

        // *** altered code to specific field adapted to stores


        var storeDim = ndx.dimension(function (d) { return d["Type_1"]; });
        var countyDim = ndx.dimension(function (d) { return d["county"]; });
        var cityDim = ndx.dimension(function (d) { return d["city"]; });
        // dc.pluck: short-hand for same kind of anon. function we used for yearDim
        // monthDim = ndx.dimension(dc.pluck('first_had_month')),
        // dayOfWeekDim = ndx.dimension(dc.pluck('first_had_day')),
        // ratingDim = ndx.dimension(dc.pluck('rating_score')),
        // commRatingDim = ndx.dimension(function (d) { return d.beer.rating_score; }),
        // abvDim = ndx.dimension(function (d) { return d.beer.beer_abv; }),
        // ibuDim = ndx.dimension(function (d) { return d.beer.beer_ibu; }),
        allDim = ndx.dimension(function (d) { return d; })
            ;

        // create groups (y-axis values)
        var all = ndx.groupAll();
        // var countPerYear = yearDim.group().reduceCount();
        // countPerMonth = monthDim.group().reduceCount(),
        // countPerDay = dayOfWeekDim.group().reduceCount(),
        // countPerRating = ratingDim.group().reduceCount(),
        // countPerCommRating = commRatingDim.group().reduceCount(),
        // countPerABV = abvDim.group().reduceCount(),
        // countPerIBU = ibuDim.group().reduceCount();

        // ***tailored code 

        var storeGroup = storeDim.group().reduceCount();
        var countyGroup = countyDim.group().reduceCount();
        var cityGroup = cityDim.group().reduceCount();

        // specify charts

        var storeChart = dc.pieChart('#chart-ring-store');
        var countyChart = dc.pieChart('#chart-ring-county');
        var cityChart = dc.pieChart('#chart-ring-city');
        // var yearChart = dc.pieChart('#chart-ring-year'),

        // ***tailored to project 



        // monthChart = dc.pieChart('#chart-ring-month'),
        // dayChart = dc.pieChart('#chart-ring-day'),
        // ratingCountChart = dc.barChart('#chart-rating-count'),
        // commRatingCountChart = dc.barChart('#chart-community-rating-count'),
        // abvCountChart = dc.barChart('#chart-abv-count'),
        // ibuCountChart = dc.barChart('#chart-ibu-count'),
        dataCount = dc.dataCount('#data-count'),
            dataTable = dc.dataTable('#data-table');

        // yearChart
        //   .width(150)
        //   .height(150)
        //   .dimension(yearDim)
        //   .group(countPerYear)
        //   .innerRadius(20);

        // *** tailored to project 


        storeChart
            .width(150)
            .height(150)
            .ordinalColors(['#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#0096FF','#40E0D0','#43a2ca','#0868ac','#7bccc4','#bae4bc','#B9C0C3','#f0f9e8'])
            .dimension(storeDim)
            .group(storeGroup)
            .innerRadius(20);

        countyChart
            .width(150)
            .height(150)
            .dimension(countyDim)
            .group(countyGroup)
            .innerRadius(20);
        cityChart
            .width(150)
            .height(150)
            .dimension(cityDim)
            .group(cityGroup)
            .innerRadius(20);

        // monthChart
        //   .width(150)
        //   .height(150)
        //   .dimension(monthDim)
        //   .group(countPerMonth)
        //   .innerRadius(20)
        //   .ordering(function (d) {
        //     var order = {
        //       'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4,
        //       'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8,
        //       'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        //     };
        //     return order[d.key];
        //   });

        // dayChart
        //   .width(150)
        //   .height(150)
        //   .dimension(dayOfWeekDim)
        //   .group(countPerDay)
        //   .innerRadius(20)
        //   .ordering(function (d) {
        //     var order = {
        //       'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3,
        //       'Fri': 4, 'Sat': 5, 'Sun': 6
        //     }
        //     return order[d.key];
        //   }
        //   );

        // ratingCountChart
        //   .width(300)
        //   .height(180)
        //   .dimension(ratingDim)
        //   .group(countPerRating)
        //   .x(d3.scale.linear().domain([0, 5.2]))
        //   .elasticY(true)
        //   .centerBar(true)
        //   .barPadding(5)
        //   .xAxisLabel('My rating')
        //   .yAxisLabel('Count')
        //   .margins({ top: 10, right: 20, bottom: 50, left: 50 });
        // ratingCountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

        // commRatingCountChart
        //   .width(300)
        //   .height(180)
        //   .dimension(commRatingDim)
        //   .group(countPerCommRating)
        //   .x(d3.scale.linear().domain([0, 5.2]))
        //   .elasticY(true)
        //   .centerBar(true)
        //   .barPadding(5)
        //   .xAxisLabel('Community rating')
        //   .yAxisLabel('Count')
        //   .margins({ top: 10, right: 20, bottom: 50, left: 50 });
        // commRatingCountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

        // abvCountChart
        //   .width(300)
        //   .height(180)
        //   .dimension(abvDim)
        //   .group(countPerABV)
        //   .x(d3.scale.linear().domain([-0.2, d3.max(beerData, function (d) { return d.beer.beer_abv; }) + 0.2]))
        //   .elasticY(true)
        //   .centerBar(true)
        //   .barPadding(2)
        //   .xAxisLabel('Alcohol By Volume (%)')
        //   .yAxisLabel('Count')
        //   .margins({ top: 10, right: 20, bottom: 50, left: 50 });

        // ibuCountChart
        //   .width(300)
        //   .height(180)
        //   .dimension(ibuDim)
        //   .group(countPerIBU)
        //   .x(d3.scale.linear().domain([-2, d3.max(beerData, function (d) { return d.beer.beer_ibu; }) + 2]))
        //   .elasticY(true)
        //   .centerBar(true)
        //   .barPadding(5)
        //   .xAxisLabel('International Bitterness Units')
        //   .yAxisLabel('Count')
        //   .xUnits(function (d) { return 5; })
        //   .margins({ top: 10, right: 20, bottom: 50, left: 50 });

        dataCount
            .dimension(ndx)
            .group(all);

        dataTable
            .dimension(allDim)
            .group(function (d) { return 'dc.js insists on putting a row here so I remove it using JS'; })
            .size(100)
            .columns([
                // function (d) { return d.brewery.brewery_name; },
                // function (d) { return d.beer.beer_name; },
                // function (d) { return d.beer.beer_style; },
                // function (d) { return d.rating_score; },
                // function (d) { return d.beer.rating_score; },
                // function (d) { return d.beer.beer_abv; },
                // function (d) { return d.beer.beer_ibu; }
            
            
             //data table column added by Dr. Yang START

                function (d) { return d.Name; }, 
                // function (d) { return d.Score; }, 
                function (d) { return d.FullAddress; }, 
                function (d) { return d.city; }, 
                function (d) { return d.county; }, 
                function (d) { return d.Type_1; }

            //data table column added by Dr. Yang END
        ])

        
            .sortBy(dc.pluck('Type_1'))
            .order(d3.descending)
            .on('renderlet', function (table) {
                // each time table is rendered remove nasty extra row dc.js insists on adding
                table.select('tr.dc-table-group').remove();
               

                storeMarkers.clearLayers();
                _.each(allDim.top(Infinity), function (d) {
                    var latitude = d["Y"];
                    var longitude = d["X"];
                    var FullAddress = d["FullAddress"];
                    var name = d["Name"];
                    var city = d["city"];
                    var county = d["county"];
                    var storeType = d["Type_1"];

                    
                    if (storeType == "Bakery Specialty") {
                        fillColor_Var = "#fb9a99";
                    } else if (storeType == "Combination Grocery/Other") {
                        fillColor_Var = "#e31a1c";
                    } else if (storeType == "Farmers' Market") {
                        fillColor_Var = "#fdbf6f";
                    } else if (storeType == "Food Buying Co-op") {
                        fillColor_Var = "#ff7f00";
                    } else if (storeType == "Fruits/Veg Specialty") {
                        fillColor_Var = "#cab2d6";
                    } else if (storeType == " Large Grocery Store") {
                        fillColor_Var = "#0096FF";
                    } else if (storeType == "Meat/Poultry Specialty") {
                        fillColor_Var = "#40E0D0";
                    }
                    else if (storeType == "Medium Grocery Store") {
                        fillColor_Var = "#43a2ca";
                    } else if (storeType == "Small Grocery Store") {
                        fillColor_Var = "#0868ac";
                    } else if (storeType == "Super Store") {
                        fillColor_Var = "#7bccc4";
                    } else if (storeType == "Supermarket") {
                        fillColor_Var = "#bae4bc";
                    } else if (storeType == "Unknown") {
                        fillColor_Var = "#B9C0C3";
                    } else if (storeType == "Wholesaler") {
                        fillColor_Var = "#f0f9e8";
                    }
                
        
                    var marker = L.circleMarker([latitude, longitude], {
                        radius: 8,
                        fillColor: fillColor_Var,
                        color: "black",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });



                    // *** Modified popup display: start
                    marker.bindPopup(
                        
                        // "<p>" + "Name: " + name + "<br>" + "Address: " + fullAddress + "<br> " + "City: " + city + "<br> " + "County: " + county + "<br> " + "Source Type: " + storeType + "<br> " + "</p>"
                    
                         //commented out by Dr. Yang
                         "<p>" + 
                         "<b> Name: </b>" + name + "<br>" + 
                         "<b> Address: </b>" + FullAddress + "<br> " + 
                         "<b> City: </b>" + city + "<br> " + 
                         "<b> County: </b>" + county + "<br> " + 
                         "<b> Store Type: </b>" + storeType + "<br> " + "</p>");
                         //revised by Dr. Yang for readablity by adding the column name in bold, and also added the Score column.
 
                  
                    storeMarkers.addLayer(marker);
                });

                // *** Modified popup display: end 

                
                map.addLayer(storeMarkers);
                map.fitBounds(storeMarkers.getBounds());
            });

        // register handlers
        d3.selectAll('a#all').on('click', function () {
            dc.filterAll();
            dc.renderAll();
          });
    
          d3.selectAll('a#store').on('click', function () {
            storeChart.filterAll();
            dc.redrawAll();
          });
    
          d3.selectAll('a#county').on('click', function () {
            countyChart.filterAll();
            dc.redrawAll();
          });

        d3.selectAll('a#city').on('click', function () {
            cityChart.filterAll();
            dc.redrawAll();
        });

        // showtime!
        dc.renderAll();

    });

    // } commented out by Dr. Yang
};//added by Dr. Yang