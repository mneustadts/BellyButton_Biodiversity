function findPlots(id) {
    // read samples.json
    d3.json('samples.json').then(sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)

    // get top ten otu ids for the otu plot
        var otuTopTen = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
    
    // get the correct form of otu ids to plot
        var OTU_id = otuTopTen.map(d => 'OTU' + d);
        console.log(`OTU IDS: ${OTU_id}`)
    
    // top ten labels for the chart
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var barTrace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: { color: 'cyan'},
            type: 'bar',
            oreintation: 'h',
        };
    // data variable
        var data = [barTrace];

    //  layout variable for plotting layout
        var barLayout = {
            title: 'Top Ten OTU',
            yaxis:{
                tickmode:"linear",
            },
            margin:{
                top: 100,
                right: 100,
                bottom: 30,
                left: 100
            }
        };

    // create bar chart plot
    Plotly.newPlot('bar', data, barLayout);

    // create variable for bubble trace
    var bubbleTrace ={
        x: sampledata.otu_ids,
        y: sampledata.sample_values,
        mode: 'markers',
        marker:{
            size: sampledata.sample_values,
            color: sampledata.otu_ids
        },
        text: sampledata.otu_labels
    };

    // create layout for bubble chart
    var bubbleLayout ={
        xaxis:{title: 'OTU ID'},
        height: 600,
        width: 1000
    };

    //bubble data variable and plot
    var bubbleData = [bubbleTrace];

    Plotly.newPlot('bubble', bubbleData, bubbleLayout)

    //function for necessary data
    function findInfo(id){}
    })











}