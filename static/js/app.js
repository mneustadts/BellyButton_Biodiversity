function findPlots(id) {
    // read samples.json
    d3.json('../data/samples.json').then(sampledata =>{
        console.log(sampledata)
        
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        

    // get top ten otu ids for the otu plot
        var otuTopTen = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
    
    // get the correct form of otu ids to plot
        var OTU_id = otuTopTen.map(d => 'OTU' + d);
        console.log(`OTU IDS: ${OTU_id}`)
    
    // top ten labels for the chart
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
       
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
    });
}
    //function for necessary data
    function findInfo(id){
    d3.json("../data/samples.json").then((sampledata)=> {
        
    // get the metadata info for the demographic panel
        var metadata = sampledata.metadata;
        
    // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // select demographic panel to put data and empty the demographic info
        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");

    // get the necessary demographic data data for the id
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    findPlots(id);
    findInfo(id);
}

// create the function for the initial data rendering
function init() {
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("../data/samples.json").then((sampledata)=> {

    // get the id data to the dropdwown menu
        sampledata.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

    // call the functions to display plots on page
        findPlots(sampledata.names[0]);
        findInfo(sampledata.names[0]);
    });
}

init();