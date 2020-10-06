function findPlots(id) {
    // read samples.json
    d3.json('samples.json').then ( sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otuIds;
        console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otuLabels.slice(0,10);
        console.log(labels)

    // get top ten otu ids for the otu plot
        var otuTopTen = (sampledata.samples[0].otuIds.slice(0,10)).reverse();
    
    // get the correct form of otu ids to plot
        var otuID = otuTopTen.map(d => 'OTU' + d);
        console.log(`OTU IDS: ${otuID}`)
    
    // top ten labels for the chart
        var labels = sampledata.samples[0]otuLabels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace1 = {
            x: sampleValues,
            y: otuID,
            text: labels,
            marker: { color: 'cyan'},
            type: 'bar',
            oreintation: 'h',
        };
    // data variable
        var data = [trace1];
    })











}