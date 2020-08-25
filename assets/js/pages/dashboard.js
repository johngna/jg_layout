anychart.onDocumentReady(function () {
    // create stage
    var stage = anychart.graphics.create('container');

    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/anydata/bitcoin/result.json
    anychart.data.loadJsonFile(
        'https://cdn.anychart.com/anydata/bitcoin/result.json',
        function (data) {
            // create column chart
            var chart = anychart.column();
            // set chart padding
            chart
                .padding([20, 0, 15, 20])
                // set chart bounds
                .bounds(0, 0, '70%', '100%');

            // set chart title text settings
            var chartTitle = chart.title();
            chartTitle
                .enabled(true)
                .fontSize(15)
                .text(
                    'Bitcoin - Capitalization vs Market Share<br><span style="font-size: 12px; color: #999">(last 12 months)</span>'
                )
                .useHtml(true);
            chartTitle.padding().bottom(15);

            // create data set on our data
            var dataSet = anychart.data.set(data.lineChartData);

            // create ordinal scale
            var linearScale = anychart.scales.linear();
            linearScale.minimum(0);

            // create line series
            var lineSeries = chart.line(
                dataSet.mapAs({
                    value: 'capitalization'
                })
            );
            // set series name
            lineSeries.name('Capitalization');
            lineSeries.markers(true).stroke('1.5 #60727b');
            // set line series labels settings
            lineSeries
                .labels()
                .format(
                    '${%Value}{scale:(1)(1000)(1000)(1000)|( d)( th)( M)( B)}'
                );
            // set line series tooltip settings
            lineSeries
                .tooltip()
                .format(
                    'Capitalization: ${%Value}{scale:(1)(1000)(1000)(1000)|( d)( th)( M)( B)}'
                );

            // create column series
            var columnSeries = chart.column(
                dataSet.mapAs({
                    value: 'dominance'
                })
            );
            // set series name
            columnSeries
                .name('Market Share')
                .fill('#7bc0f7')
                // set y-scale
                .yScale(linearScale);
            // set column series tooltip settings
            columnSeries.tooltip().format('Market Share: {%Value}%');

            // set settings for the first y-axis
            var firstYAxis = chart.yAxis(0);
            firstYAxis.title('Capitalization');
            firstYAxis
                .labels()
                .format(
                    '${%Value}{scale:(1)(1000)(1000)(1000)|( d)( th)( M)( B)}'
                );

            // set settings for the second y-axis
            var secondYAxis = chart.yAxis(1);
            secondYAxis
                .scale(linearScale)
                .orientation('right')
                .title('Market Share');
            secondYAxis.labels().format('{%Value}%');

            // set chart tooltip settings
            chart
                .tooltip()
                .displayMode('union')
                // format title tooltip
                .titleFormat(function () {
                    return this.x + ' ' + this.name.split('.')[0];
                });

            // turn on legend
            chart.legend(true);

            // set hover mode
            chart.interactivity().hoverMode('by-x');

            // set container for the chart
            chart.container(stage);

            // initiate chart drawing
            chart.draw();

            // set output date format
            anychart.format.outputDateFormat('dd MMM yyyy');

            // create pie chart
            var pie = anychart.pie(data.pieData);
            // set pie padding
            pie
                .padding([20, 10, 20, 10])
                // set pie bounds
                .bounds('70%', 0, '30%', '100%')
                // changes palette for this sample
                .palette([
                    '#64b5f6',
                    '#1976d2',
                    '#ef6c00',
                    '#ffd54f',
                    '#455a64',
                    '#dd2c00',
                    '#96a6a6',
                    '#00838f',
                    '#00bfa5',
                    '#ffa000'
                ])
                // create empty area in pie chart
                .innerRadius('30%');

            // set chart title text settings
            var pieTitle = pie.title();
            pieTitle
                .enabled(true)
                .fontSize(15)
                .useHtml(true)
                .text(
                    'Cryptocurrency Market Share<br><span style="font-size: 12px; color: #999">(' +
                    anychart.format.date(data.parseDate) +
                    ')</span>'
                );
            pieTitle.padding().bottom(15);

            // set legend layout
            pie
                .legend()
                .itemsLayout('horizontal-expandable')
                .position('bottom-center');

            // set pie tooltip settings
            pie.tooltip().format('Market Share: {%PercentValue}%');

            // set container for the chart
            pie.container(stage);

            // initiate chart drawing
            pie.draw();
        }
    );
});




